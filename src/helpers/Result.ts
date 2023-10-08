export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function err<T, E>(e: E): Result<T, E> {
  return { ok: false, error: e }
}

export function ok<T, E>(t: T): Result<T, E> {
  return { ok: true, value: t }
}