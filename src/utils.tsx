export function isObjectEmpty(obj: {} | null | undefined) {
  if(obj === null || obj === undefined || Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}