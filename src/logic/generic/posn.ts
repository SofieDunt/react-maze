/**
 * A simple (x, y) coordinate.
 */
export default interface Posn {
  readonly x: number;
  readonly y: number;
}

export function posn(x: number, y: number): Posn {
  return { x, y };
}
