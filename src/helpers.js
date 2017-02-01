export function isPrimitiveType(value) {
  return Object(value) !== value;
}