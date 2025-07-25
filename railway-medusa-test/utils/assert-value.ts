/**
 * Assert that a value is not undefined. If it is, throw an error with the provided message.
 * @param v - Value to assert
 * @param errorMessage - Error message to throw if value is undefined
 */
export function assertValue<T extends string | undefined>(
  v: T | undefined,
  errorMessage: string,
): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}


export const safeEnv = (key: string, fallback?: string): string => {
  const value = process.env[key]
  if (value !== undefined) return value
  if (fallback !== undefined) return fallback
  return '' // fallback por defecto si no se define nada
}