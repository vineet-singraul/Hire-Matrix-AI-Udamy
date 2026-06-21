// ─── Request Types ────────────────────────────────────────────

export interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
  mobileNO: string;
  isAgree: boolean;
}

export interface SignInRequest {
  email: string;
  password: string;
}

// ─── Shared Models ────────────────────────────────────────────

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  mobileNO: string;
  role: string;
  createdAt: string;
}

// ─── Response Types ───────────────────────────────────────────

export interface SignUpResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

export interface SignInResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

export interface SignOutResponse {
  success: boolean;
  message: string;
}
