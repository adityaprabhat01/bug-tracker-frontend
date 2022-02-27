export function isObjectEmpty(obj: {} | null | undefined) {
  if(obj === null || obj === undefined || Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

export const MENTION_REGEX = /(?:^|[^a-zA-Z0-9_!@#$%&*])(?:(?:@)(?!\/))([a-zA-Z0-9/_.]{1,40})(?:\b(?!@)|$)/gm;
export const REFERENCE_REGEX = /\B#(\d{1,10})(?:\b)/gm;