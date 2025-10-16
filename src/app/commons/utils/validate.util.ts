export function isEmail(value: string): boolean {
  return !!RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  ).exec(String(value).toLowerCase());
}

export function isArray(value: string): boolean {
  return Array.isArray(value);
}

export function isDate(value: string | number): boolean {
  return (
    value &&
    Object.prototype.toString.call(value) === '[object Date]' &&
    !(typeof value == 'number' ? isNaN(value) : value)
  );
}
