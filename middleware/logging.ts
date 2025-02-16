export const logError = (error: Error) => {
    if (process.env.NODE_ENV === "production") {
      console.error("Logged to Sentry (or other service):", error);
    } else {
      console.error("Development Mode Error Log:", error);
    }
  };
  