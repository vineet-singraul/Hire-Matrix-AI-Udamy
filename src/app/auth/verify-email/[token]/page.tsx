"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, CircularProgress, Button } from "@mui/material";

import { apiGet } from "@/services/api";
import "@/app/styles/SingupOrSingin.css";

type Status = "loading" | "success" | "error";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        const response = await apiGet("/auth/verify-email", { token });
        setMessage(response?.message ?? "Email verified successfully.");
        setStatus("success");
        setTimeout(() => router.push("/auth/Singin"), 3000);
      } catch (err: unknown) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setMessage(
          axiosError?.response?.data?.message ??
            "Verification failed. The link may have expired."
        );
        setStatus("error");
      }
    };

    verify();
  }, [token, router]);

  return (
    <Box className="auth-root" suppressHydrationWarning>
      <Box className="auth-bg" />
      <Box className="auth-card">
        <Box className="auth-card-header">
          <Typography variant="h5" className="auth-title">
            {status === "loading" && "Verifying..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </Typography>
          <Typography className="auth-subtitle">
            {status === "loading" && "Please wait a moment"}
            {status === "success" && "Redirecting to sign in..."}
            {status === "error" && "Something went wrong"}
          </Typography>
        </Box>

        <Box className="auth-card-body" sx={{ textAlign: "center" }}>
          {status === "loading" && (
            <CircularProgress size={40} sx={{ color: "#3b82f6", my: 2 }} />
          )}

          {status === "success" && (
            <>
              <Typography sx={{ fontSize: "0.82rem", color: "#374151", mb: 2 }}>
                {message}
              </Typography>
              <Typography sx={{ fontSize: "0.76rem", color: "#6b7280", mb: 2 }}>
                You will be redirected to the sign in page in 3 seconds.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                className="auth-submit-btn"
                disableElevation
                onClick={() => router.push("/auth/Singin")}
              >
                Go to Sign In
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <Typography sx={{ fontSize: "0.82rem", color: "#ef4444", mb: 2 }}>
                {message}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                className="auth-submit-btn"
                disableElevation
                onClick={() => router.push("/auth/Singup")}
              >
                Back to Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
