/**
 * @summary
 * Formats a successful API response.
 * @param data The payload to be returned.
 * @returns A standardized success response object.
 */
export function successResponse<T>(data: T) {
  return {
    success: true,
    data,
  };
}

/**
 * @summary
 * Formats an error API response.
 * @param message The error message.
 * @param details Additional error details (e.g., stack trace in development).
 * @returns A standardized error response object.
 */
export function errorResponse(message: string, details?: any) {
  return {
    success: false,
    error: {
      message,
      details,
    },
  };
}
