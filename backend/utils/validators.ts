// backend/utils/validators.ts

import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { 
  validate, 
  IsEmail, 
  MinLength, 
  IsString, 
  IsNumber, 
  IsBoolean 
} from 'class-validator';

/**
 * Example DTO (Data Transfer Object) for validation
 */
class ExampleDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsBoolean()
  isActive: boolean;
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
  // Convert plain data into a class instance for class-validator
  const dtoInstance = plainToClass(dtoClass, data);
  // Validate and return any errors
  const errors = await validate(dtoInstance);
  return errors;
};

// --------------------------------------------
// Standalone validation helper functions
// --------------------------------------------

/**
 * Validate email format using a regex.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength:
 *   - at least 8 characters
 *   - at least 1 letter
 *   - at least 1 number
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate if a string’s length is within a specified range
 */
export const isValidString = (
  str: string, 
  minLength: number, 
  maxLength: number
): boolean => {
  return str.length >= minLength && str.length <= maxLength;
};

/**
 * Validate if a value is a number
 */
export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Validate if a value is a boolean
 */
export const isBoolean = (value: unknown): boolean => {
  return typeof value === 'boolean';
};

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
    console.log('Validation errors:', errors);
  } else {
    console.log('Validation passed.');
  }
})();
