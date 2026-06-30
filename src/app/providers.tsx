"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LoaderProvider } from "@/context/LoaderContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <LoaderProvider>{children}</LoaderProvider>
    </AppRouterCacheProvider>
  );
}
