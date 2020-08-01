const SignupValidation = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  }
  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.userType) {
    errors.userType = 'User type is required';
  }
  if (!values.phone) {
    errors.phone = 'Phone is required';
  }
  if (values.phone && values.phone.length != 10) {
    errors.phone = 'Phone No. should be 10 digit';
  }

  return errors;
};

export default SignupValidation;
