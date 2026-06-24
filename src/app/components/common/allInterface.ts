export interface Errors {
  "fullName":string,
  "email":string,
  "password":string,
  "mobile":string
}


export interface ApiResponseAlertProps {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
}


