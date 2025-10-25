/**
 * Generic interface defining a controller contract in the Clean Architecture context.
 *
 * A controller coordinates data between the external world (HTTP, CLI, etc.)
 * and the application's use cases. It should not depend on any framework.
 */
export interface IController<TInput, TOutput> {
  /**
   * Handles an incoming request and returns a structured output.
   *
   * @param request - Input data (DTO or any validated object).
   * @returns The output data, usually another DTO or object.
   */
  handle(request: TInput): Promise<TOutput>;
}
