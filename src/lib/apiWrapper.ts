// Global Error Handling Wrapper
export async function handleApi<T>(
  fn: () => Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await fn();
    return { data };
  } catch (error: any) {
    console.error("[API ERROR]:", error);
    return { error: "Server error. Please try again." };
  }
}
