export const onBlurValidationOfAllFiled = (name: string, value: string) => {
  switch (name) {
    case "fullName":
      if (!value) return "name field is required";
      break;

    case "email":
      if (!value) return "email field is required";
      break;

    case "password":
    case "currentPassword":
    case "newPassword":
    case "confirmNewPassword":
      if (!value) return "password field is required";
      break;

    case "mobile":
      if (!value) return "phone field is required";
      break;

    default:
      break;
  }

  return "";
};

export const onChangeValidationAllFiled = (
  name: string,
  value: string
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  switch (name) {
    case "fullName":
      if (value.trim().length < 3)
        return "Name must contain at least 3 characters";

      if (value.trim().length > 20)
        return "Name cannot contain more than 20 characters";
      break;

    case "email":
      if (!emailRegex.test(value))
        return "Please enter a valid email address (e.g. john@example.com)";
      break;

    case "password":
    case "currentPassword":
    case "newPassword":
    case "confirmNewPassword":
      if (value.length < 8)
        return "Password must be at least 8 characters";
      if (value.length > 20)
        return "Password cannot be more than 20 characters";
      if (!passwordRegex.test(value))
        return "Password must contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
      break;

    case "mobile":
      if (!mobileRegex.test(value))
        return "Mobile number must be 10 digits and start with 6, 7, 8, or 9";
      break;

    default:
      break;
  }

  return "";
};