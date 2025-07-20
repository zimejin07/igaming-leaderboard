/**
 * A utility function to handle API calls with standardized response formatting.
 *
 * @template T - The type of the result returned by the promise.
 * @param fn - An asynchronous callback function that returns a promise.
 * @returns A promise that resolves to a standard HTTP response object.
 */
export async function handleApi<T>(fn: () => Promise<T>): Promise<Response> {
  try {
    // Execute the passed asynchronous function and await its result
    const result = await fn();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[API ERROR]", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
