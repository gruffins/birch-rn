import { emailScrubber, passwordScrubber } from '../scrubber';

describe('Scrubbers', () => {
  describe('emailScrubber', () => {
    it('scrubs emails', () => {
      const input = 'abcd@domain.com';
      expect(emailScrubber(input)).toEqual('[FILTERED]');
    });

    it('scrubs emails from urls', () => {
      const input =
        'https://birch.ryanfung.com/user?email=valid+email@domain.com';
      expect(emailScrubber(input)).toEqual(
        'https://birch.ryanfung.com/user?email=[FILTERED]'
      );
    });

    it('scrubs from json', () => {
      const input = JSON.stringify({ email: 'abcd@domain.com' });
      expect(emailScrubber(input)).toEqual(
        JSON.stringify({ email: '[FILTERED]' })
      );
    });

    it('scrubs multiple emails', () => {
      const input = 'abcd@domain.com asdf@domain.com';
      expect(emailScrubber(input)).toEqual('[FILTERED] [FILTERED]');
    });
  });

  describe('passwordScrubber', () => {
    it('scrubs passwords', () => {
      const input = 'password=@BcopBT4nSDRuDL!';
      expect(passwordScrubber(input)).toEqual('password=[FILTERED]');
    });

    it('scrubs case insensitive', () => {
      const input = 'PASSWORD=@BcopBT4nSDRuDL!';
      expect(passwordScrubber(input)).toEqual('PASSWORD=[FILTERED]');
    });

    it('scrubs for url params', () => {
      const input =
        'https://birch.ryanfung.com/auth?username=test123&password=password123';
      expect(passwordScrubber(input)).toEqual(
        'https://birch.ryanfung.com/auth?username=test123&password=[FILTERED]'
      );
    });

    it('scrubs json', () => {
      const input = JSON.stringify({ password: 'password123' });
      expect(passwordScrubber(input)).toEqual(
        JSON.stringify({ password: '[FILTERED]' })
      );
    });
  });
});
