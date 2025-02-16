"use client";

import "@/styles/globals.css";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="error-container">
      <h1 className="error-title">Something went wrong</h1>
      <p className="error-message">{error.message}</p>
      <button className="error-button" onClick={reset}>Try Again</button>
    </div>
  );
}
