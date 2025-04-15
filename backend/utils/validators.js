import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  validate,
  IsEmail,
  MinLength,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

/**
 * Example DTO (Data Transfer Object) for validation
 */
class ExampleDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsString()
  name!: string;

  @IsNumber()
  age!: number;

  @IsBoolean()
  isActive!: boolean;
}

/**
 * Validate input data against a DTO using class-validator.
 * Returns an array of ValidationError objects if validation fails.
 *
 * @param dtoClass - The DTO class definition
 * @param data - The plain data object to validate
 */
export const validateDto = async (
  dtoClass: new (...args: any[]) => any,
  data: unknown
): Promise<ValidationError[]> => {
  const dtoInstance = plainToClass(dtoClass, data);
  try {
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      console.error('Validation errors:', errors);
    }
    return errors;
  } catch (err) {
    console.error('Error during validation:', err);
    throw err;
  }
};

// --------------------------------------------
// Standalone validation helper functions
// --------------------------------------------

/**
 * Validate email format using a regex.
 *
 * @param email - The email string to validate
 * @returns boolean - True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validate password strength:
 *   - At least 8 characters
 *   - At least 1 letter
 *   - At least 1 number
 *
 * @param password - The password string to validate
 * @returns boolean - True if valid, false otherwise
 */
export const isValidPassword = (password: string): boolean =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

/**
 * Validate if a string's length is within a specified range.
 *
 * @param str - The string to validate
 * @param minLength - The minimum length of the string
 * @param maxLength - The maximum length of the string
 * @returns boolean - True if valid, false otherwise
 */
export const isValidString = (
  str: string,
  minLength: number,
  maxLength: number
): boolean => str.length >= minLength && str.length <= maxLength;

/**
 * Validate if a value is a number.
 *
 * @param value - The value to validate
 * @returns boolean - True if valid, false otherwise
 */
export const isNumber = (value: unknown): boolean =>
  typeof value === 'number' && !isNaN(value);

/**
 * Validate if a value is a boolean.
 *
 * @param value - The value to validate
 * @returns boolean - True if valid, false otherwise
 */
export const isBoolean = (value: unknown): boolean =>
  typeof value === 'boolean';

// --------------------------------------------
// Example usage of validateDto function
// --------------------------------------------

(async () => {
  const data = {
    email: 'test@example.com',
    password: 'password123',
    name: 'John Doe',
    age: 30,
    isActive: true,
  };

  const errors = await validateDto(ExampleDto, data);
  if (errors.length > 0) {
    console.error('Validation errors:', errors);
  } else {
    console.log('Validation passed.');
  }
})();
