
export const emailValidator = email => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = password => {
  if (!password) {
    return "Password is required";
  } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/).test(password)) {
    return "Password must have a minimum 8 characters and Add at least one special char ,capital,number";
  }
  
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/).test(confirmPassword)) {
    return "Password must have a minimum 8 characters and Add at least one special char ,capital,number";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};
export const lastNameValidator = lastName => {
  if (!lastName) {
    return "lastName is required";
  } else if (lastName.length < 6) {
    return "Usename must have a minimum 6 characters";
  }
  else if (!new RegExp(/^[a-zA-Z\-]+$/).test(lastName)) {
    return "Your lastName is not valid. Only characters A-Z, a-z and '-' are  acceptable.";
  }
  return "";
};
// export const phoneValidator = phone => {
//   if (!phone) {
//     return "phone is required";
//   }
//   else if (!new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g).test(phone)) {
//     return "Your phone number is not valid.";
//   }
//   return "";
// };