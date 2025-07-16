// Global Error Handling Wrapper
export async function handleApi<T>(
  fn: () => Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await fn();
    return { data };
  } catch (error: unknown) {
    // Log detailed error information if it's an instance of Error
    if (error instanceof Error) {
      console.error("[API ERROR]:", error.message);
      return { error: error.message }; // Return a more informative error message
    }

    // For unknown errors, log them as is
    console.error("[API ERROR]: An unknown error occurred", error);
    return { error: "An unknown error occurred, please try again." };
  }
}
