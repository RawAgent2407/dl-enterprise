import { strapiFetch } from "../strapi";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await strapiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log("Contact Form Response:", response);

    return {
      success: true,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while submitting the form';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export function validateContactForm(data: ContactFormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validate name
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate phone
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number';
  } else if (data.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Phone number must be at least 10 digits';
  }

  // Validate message
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
