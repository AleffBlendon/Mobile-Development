export interface LoginFields {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginFields(fields: LoginFields): LoginErrors {
  const errors: LoginErrors = {};

  if (!fields.email.trim()) {
    errors.email = 'O e-mail é obrigatório.';
  } else if (!EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!fields.password) {
    errors.password = 'A senha é obrigatória.';
  } else if (fields.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  }

  return errors;
}

export function hasErrors(errors: LoginErrors): boolean {
  return Object.keys(errors).length > 0;
}
