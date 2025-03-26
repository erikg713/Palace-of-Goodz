// Import necessary libraries or modules
import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { validate, IsEmail, MinLength, IsString, IsNumber, IsBoolean } from 'class-validator';

// Example DTO (Data Transfer Object) for validation
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

// Validate input data against a DTO
export const validateDto = async (dtoClass: any, data: any): Promise<ValidationError[]> => {
  const dtoInstance = plainToClass(dtoClass, data);
  const errors = await validate(dtoInstance);
  return errors;
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Validate string length
export const isValidString = (str: string, minLength: number, maxLength: number): boolean => {
  return str.length >= minLength && str.length <= maxLength;
};

// Validate if a value is a number
export const isNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value);
};

// Validate if a value is a boolean
export const isBoolean = (value: any): boolean => {
  return typeof value === 'boolean';
};

// Example usage of validateDto function
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

