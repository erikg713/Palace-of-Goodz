// Improved email validation using a more comprehensive regex
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Function to validate URLs
export const validateURL = (url: string): boolean => {
  const re = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return re.test(url);
};

// Function to validate phone numbers
export const validatePhoneNumber = (phone: string): boolean => {
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(phone);
};
