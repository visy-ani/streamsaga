"use client";

import { useEffect } from "react";
import { logError } from "@/utils/logging";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
    useEffect(() => {
      logError(error);
    }, [error]);
  
    const handleReset = () => {
      reset();
    };
  
    return (
      <div className="error-page-container">
        <h2 className="error-message-header">Oops! Something went wrong.</h2>
        <p className="error-message-details">{error.message || "An unexpected error occurred."}</p>
        <button className="error-reset-button" onClick={handleReset}>
          Try Again
        </button>
      </div>
    );
  };
  
  export default ErrorPage;