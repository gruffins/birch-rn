<p align="center">
<img src="https://user-images.githubusercontent.com/381273/204187386-ec93e173-a6fa-40b1-8b74-c52a0c5048b3.png" />
</p>

# Birch
![Tests](https://github.com/gruffins/birch-rn/actions/workflows/ci.yml/badge.svg)

Simple, lightweight remote logging for React Native.

Sign up for your free account at [Birch](https://birch.ryanfung.com)

BIrch allows you to log to a variety of drains regardless of whether they have a native implementation or not. On top of that, Birch provides the ability to remotely adjust log configurations on any of your apps in production.

Birch can drain to
- New Relic
- Datadog
- Logtail
- Loggly
- Elasticsearch
- Papertrail
- Logz
- CloudWatch
- S3
- Wasabi
- Google Cloud Logging
- A custom webhook

# Installation

```
npm i react-native-birch
```

# Setup

```typescript
import Birch from 'react-native-birch';
import { useEffect, useState } from 'react';

export default function App() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    Birch.init({
      apiKey: '',
      publicKey: '',
    });
    
    Birch.setConsole(true);
  }, []);

  useEffect(() => {
    Birch.setIdentifier(userId);
  }, [userId]);
}
``` 

# Logging
Use the logger as you would with console logs.

```typescript
Birch.t('trace level message');
Birch.d('debug level message');
Birch.i('info level message');
Birch.w('warn level message');
Birch.e('error level message');
```

# Configuration
Device level configuration is left to the server so you can remotely control it. There are a few things you can control on the client side.

### Console
During local development, it is useful to see the logs in the console. These console logs are not useful in production since you cannot read them remotely. The default is `false`. Setting this will affect console logs on iOS and Logcat on Android.

```typescript
Birch.setConsole(true);
```

```typescript
const useConsole = await Birch.getConsole();
```

### Remote
During local development, it's unlikely that you'll need remote logging. You cna optionally turn it off to minimize your usage on Birch. The default is `true`.

```typescript
Birch.setRemote(true);
```

```typescript
const remote = await Birch.getRemote()
```

### Level
During local development, you may want to quickly override the server configuration. The default is `null` which allows teh server to set the remote level. Setting a value will **ALWAYS** override the server and prevent you from being able to remotely adjust the level.

```typescript
Birch.setLevel(Level.Trace)
```

```typescript
const level = await Birch.getLevel();
```

### Synchronous
During local development, you may want logs to print immediately when you're stepping through with a debugger. To do this, you'll need to use synchronous logging. The default value is `false`. Synchronous logging is slower since it has to perform the logging inline.

```typescript
Birch.setSynchronous(true);
```

```typescript
const sync = await Birch.getSynchronous();
```

### Debug
When integrating the library, you may be curioius to see the logger at work. By setting debug to true, Birch will log its operations. The default value is `false`. You should **NOT** set this to true in a production build.

You will only be able to see these logs in the native iOS console logs or Logcat.

```typescript
Birch.setDebug(true);
```

```typescript
const debug = await Birch.getDebug();
```

### Encryption

We **HIGHLY** recommend using encryption to encrypt your logs at rest. If you leave out the public encryption key, Birch will save logs on the device in clear text.

An invalid public key will throw an exception.

### Identification

You should set an identifier so you can identify the source in the dashboard. If you do not set one, you will only be able to find devices by the assigned uuid via `Birch.uuid()`.

You can also set custom properties on the source that will propagate to all drains.


```typescript
Birch.setIdentifier('user_id');
Birch.setCustomProperties({
  country: user.country,
});
```

### Opt Out

To comply with different sets of regulations such as GDPR or CCPA, you may be required to allow users to opt out of log collection.

```typescript
Birch.setOptOut(true);
```

```typescript
const optOut = await Birch.getOptOut();
```

### Log Scrubbing

Birch comes preconfigured with an email and password scrubber to ensure sensitive data is __NOT__ logged. Emails and passwords are replaced with `[FILTERED]` at the logger level so the data never reaches Birch servers.

If you wish to configure additional scrubbers, implement the scrubbing function and initialize the logger with all the scrubbers you want to use.

```typescript
import { emailScrubber, passwordScrubber } from 'react-native-birch';

function customScrubber(input: string): string {
  return input.replaceAll(REGEX, '[FILTERED]');
}

export default function App() {
  useEffect(() => {
    Birch.init({
      apiKey: '',
      publicKey: '',
      options: {
        scrubbers: [customScrubber, emailScrubber, passwordScrubber],
      }
    })
  }, [])
}
```
