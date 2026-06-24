/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState } from "react";
import Loader from "@/services/Loader";

const LoaderContext = createContext<any>(null);

export const LoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        showLoader: () => setLoading(true),
        hideLoader: () => setLoading(false),
      }}
    >
      {children}

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.88)",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);