// ─── Pure field validators ────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (value: string): string => {
  if (!value.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(value)) return 'Enter a valid email address';
  return '';
};

export const validatePassword = (value: string): string => {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  return '';
};

export const validateFullName = (value: string): string => {
  if (!value.trim()) return 'Full name is required';
  if (value.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
};

export const validateMobileNO = (value: string): string => {
  if (!value.trim()) return 'Mobile number is required';
  if (!/^\d{10}$/.test(value)) return 'Enter a valid 10-digit mobile number';
  return '';
};

// ─── Sign In — validate a single field by name ────────────────

export const validateSignInField = (name: string, value: string): string => {
  switch (name) {
    case 'email':    return validateEmail(value);
    case 'password': return validatePassword(value);
    default:         return '';
  }
};

// ─── Sign Up — validate a single field by name ────────────────

export const validateSignUpField = (name: string, value: string): string => {
  switch (name) {
    case 'fullName':  return validateFullName(value);
    case 'email':     return validateEmail(value);
    case 'password':  return validatePassword(value);
    case 'mobileNO':  return validateMobileNO(value);
    default:          return '';
  }
};

