import { NativeModules, Platform } from 'react-native';
import { emailScrubber, passwordScrubber, type Scrubber } from './scrubber';

export { emailScrubber, passwordScrubber, type Scrubber } from './scrubber';

const LINKING_ERROR =
  `The package 'react-native-birch' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RNBirch = NativeModules.RNBirch
  ? NativeModules.RNBirch
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type Options = {
  scrubbers?: Array<Scrubber>;
  host?: string;
  defaultLevel?: Level;
};

type InitOptions = {
  apiKey: string;
  publicKey?: string;
  options?: Options;
};

export enum Level {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  None = 5,
}

function Birch() {
  let scrubbers: Array<Scrubber> = [];

  const obj = {
    getDebug: async (): Promise<boolean> => {
      return await RNBirch.debug();
    },
    setDebug: (value: boolean) => {
      RNBirch.setDebug(value);
    },
    getOptOut: async (): Promise<boolean> => {
      return await RNBirch.optOut();
    },
    setOptOut: (value: boolean) => {
      RNBirch.setOptOut(value);
    },
    getUuid: async (): Promise<string> => {
      return await RNBirch.uuid();
    },
    getIdentifier: async (): Promise<string> => {
      return await RNBirch.identifier();
    },
    setIdentifier: (value?: string) => {
      RNBirch.setIdentifier(value);
    },
    getCustomProperties: async (): Promise<Record<string, string>> => {
      return await RNBirch.customProperties();
    },
    setCustomProperties: (value: Record<string, string>) => {
      RNBirch.setCustomProperties(value);
    },
    getConsole: async (): Promise<boolean> => {
      return await RNBirch.console();
    },
    setConsole: (value: boolean) => {
      RNBirch.setConsole(value);
    },
    getRemote: async (): Promise<boolean> => {
      return await RNBirch.remote();
    },
    setRemote: (value: boolean) => {
      RNBirch.setRemote(value);
    },
    getLevel: async (): Promise<Level | undefined> => {
      const level = await RNBirch.level();
      return level !== undefined ? (level as Level) : undefined;
    },
    setLevel: (value: Level | undefined) => {
      if (value === undefined) {
        RNBirch.setLevel(-1);
      } else {
        RNBirch.setLevel(value as number);
      }
    },
    getCurrentLevel: async (): Promise<Level | undefined> => {
      const level = await RNBirch.currentLevel();
      return level !== undefined ? (level as Level) : undefined;
    },
    getSynchronous: async (): Promise<boolean> => {
      return await RNBirch.synchronous();
    },
    setSynchronous: (value: boolean) => {
      RNBirch.setSynchronous(value);
    },
    init: ({ apiKey, publicKey, options }: InitOptions) => {
      scrubbers = options?.scrubbers || [emailScrubber, passwordScrubber];

      let opts: Record<string, string> = {};
      if (options?.host) {
        opts.host = options.host;
      }

      if (options?.defaultLevel !== undefined) {
        opts.defaultLevel = options.defaultLevel.toString();
      }

      RNBirch.initialize(apiKey, publicKey, opts);
    },
    syncConfiguration: () => {
      RNBirch.syncConfiguration();
    },
    flush: () => {
      RNBirch.flush();
    },
    t: (message: string) => {
      sanitize(message, (clean) => {
        RNBirch.t(clean);
        log(Level.Trace, clean);
      });
    },
    d: (message: string) => {
      sanitize(message, (clean) => {
        RNBirch.d(clean);
        log(Level.Debug, clean);
      });
    },
    i: (message: string) => {
      sanitize(message, (clean) => {
        RNBirch.i(clean);
        log(Level.Info, clean);
      });
    },
    w: (message: string) => {
      sanitize(message, (clean) => {
        RNBirch.w(clean);
        log(Level.Warn, clean);
      });
    },
    e: (message: string) => {
      sanitize(message, (clean) => {
        RNBirch.e(clean);
        log(Level.Error, clean);
      });
    },
  };

  const sanitize = (input: string, callback: (clean: string) => void) => {
    const clean = scrubbers.reduce((acc, fn): string => fn(acc), input);
    callback(clean);
  };

  const log = async (level: Level, message: string) => {
    const current = await obj.getCurrentLevel();
    const allowConsole = await obj.getConsole();

    if (allowConsole && current !== undefined && level >= current) {
      switch (level) {
        case Level.Trace:
        case Level.Debug:
          console.log(message);
          break;
        case Level.Info:
          console.info(message);
          break;
        case Level.Warn:
          console.warn(message);
          break;
        case Level.Error:
          console.error(message);
          break;
        default:
          break;
      }
    }
  };

  return obj;
}

export default Birch();
