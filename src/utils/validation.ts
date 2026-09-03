/**
 * validation.ts — Generic form validation utilities
 *
 * All validators are intentionally region-neutral.
 * Adjust the regexes here to tighten validation for your specific locale
 * without touching any component code.
 */

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Permissive phone validator: accepts any E.164-style string (+ followed by
 * 7–15 digits) or a local format starting with 0 followed by 8–10 digits.
 * Replace the regex here to enforce a stricter locale-specific format.
 */
export const validatePhone = (phone: string): ValidationResult => {
    if (!phone) return { isValid: false, error: 'Phone number is required' };
    const phoneRegex = /^(\+[1-9]\d{6,14}|0\d{8,10})$/;
    if (!phoneRegex.test(phone.replace(/[\s\-().]/g, ''))) {
        return {
            isValid: false,
            error: 'Invalid phone number format',
        };
    }
    return { isValid: true };
};

/**
 * OTP validator: expects exactly 6 numeric digits.
 */
export const validateOtp = (otp: string): ValidationResult => {
    if (!otp) return { isValid: false, error: 'OTP is required' };
    if (!/^[0-9]{6}$/.test(otp)) {
        return { isValid: false, error: 'OTP must be 6 digits' };
    }
    return { isValid: true };
};

/**
 * Generic government-issued ID validator.
 * Accepts 4–20 alphanumeric characters (letters + digits only).
 * Adjust the regex to match your jurisdiction's ID document format.
 */
export const validateId = (id: string, label = 'ID'): ValidationResult => {
    if (!id) return { isValid: false, error: `${label} is required` };
    if (!/^[A-Z0-9]{4,20}$/i.test(id)) {
        return {
            isValid: false,
            error: `Invalid ${label} format`,
        };
    }
    return { isValid: true };
};

/**
 * File upload validator: checks type (jpg/jpeg/png) and size (≤ 5 MB).
 */
export const validateFile = (
    file: File | null,
    label: string,
): ValidationResult => {
    if (!file) return { isValid: false, error: `${label} is required` };

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        return { isValid: false, error: 'File must be an image (jpg, jpeg, png)' };
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return { isValid: false, error: 'File size must be less than 5MB' };
    }

    return { isValid: true };
};
