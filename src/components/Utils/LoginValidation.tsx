export const loginValidation = (values: {email: string; password: string}) => {
  let errors: {email: string; password: string} = {
    email: '',
    password: '',
  };
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};
