
export interface SKRouterGuardOptions {
  /**
   * The path where the hook script is located
   * @default src/utils/router-guard.skrg.(ts/js)
   */
  hookPath?: string
  /**
   * Hook script content,
   * it will be directly executed as a global routing guard
   * @default src/utils/router-guard.skrg.(ts/js)
   */
  hookContent?: string
}
