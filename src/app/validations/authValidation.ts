export const onBlurValidationOfAllFiled = (name: string, value: string) => {
  switch (name) {
    case "fullName":
      if (!value) return "name field is required";
      break;

    case "email":
      if (!value) return "email field is required";
      break;

    case "password":
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