export type Scrubber = (input: string) => string;

const EMAIL_REGEX =
  /[a-zA-Z0-9+._%\-+]{1,256}@[a-zA-Z0-9][a-zA-Z0-9-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9-]{0,25})/gi;
const PASSWORD_KVP_REGEX = /(password)=[^&#]*/gi;
const PASSWORD_JSON_REGEX = /("password":\s?)".*"/gi;

export function emailScrubber(input: string): string {
  return input.replaceAll(EMAIL_REGEX, '[FILTERED]');
}

export function passwordScrubber(input: string): string {
  return input
    .replaceAll(PASSWORD_KVP_REGEX, '$1=[FILTERED]')
    .replaceAll(PASSWORD_JSON_REGEX, '$1"[FILTERED]"');
}
