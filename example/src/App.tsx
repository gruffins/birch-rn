import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from 'react-native';
import Birch, { Level } from 'react-native-birch';

const ButtonWrapper = ({
  style,
  title,
  onPress,
}: {
  style: any;
  title: string;
  onPress: (e: GestureResponderEvent) => void;
}) => (
  <View style={style}>
    <Button title={title} onPress={onPress} />
  </View>
);

export default function App() {
  const [debug, setDebug] = useState(false);
  const [level, setLevel] = useState<Level | undefined>(undefined);
  const [consoleLog, setConsoleLog] = useState(false);
  const [remote, setRemote] = useState(true);
  const [synchronous, setSynchronous] = useState(false);

  useEffect(() => {
    Birch.init({
      apiKey: '',
    });

    (async () => {
      setDebug(await Birch.debug());
      setLevel(await Birch.level());
      setConsoleLog(await Birch.console());
      setRemote(await Birch.remote());
      setSynchronous(await Birch.synchronous());
    })();
  }, [setDebug, setLevel, setConsoleLog, setRemote, setSynchronous]);

  const toggleDebug = useCallback(
    async (_e: GestureResponderEvent) => {
      const value = await Birch.debug();
      Birch.setDebug(!value);
      setDebug(!value);
    },
    [setDebug]
  );

  const toggleLevel = useCallback(
    async (_e: GestureResponderEvent) => {
      const value = await Birch.level();
      switch (value) {
        case Level.Trace:
          Birch.setLevel(Level.Debug);
          setLevel(Level.Debug);
          break;
        case Level.Debug:
          Birch.setLevel(Level.Info);
          setLevel(Level.Info);
          break;
        case Level.Info:
          Birch.setLevel(Level.Warn);
          setLevel(Level.Warn);
          break;
        case Level.Warn:
          Birch.setLevel(Level.Error);
          setLevel(Level.Error);
          break;
        case Level.Error:
          Birch.setLevel(Level.None);
          setLevel(Level.None);
          break;
        case Level.None:
          Birch.setLevel(undefined);
          setLevel(undefined);
          break;
        default:
          Birch.setLevel(Level.Trace);
          setLevel(Level.Trace);
          break;
      }
    },
    [setLevel]
  );

  const toggleConsole = useCallback(
    async (_e: GestureResponderEvent) => {
      const value = await Birch.console();
      Birch.setConsole(!value);
      setConsoleLog(!value);
    },
    [setConsoleLog]
  );

  const toggleRemote = useCallback(
    async (_e: GestureResponderEvent) => {
      const value = await Birch.remote();
      Birch.setRemote(!value);
      setRemote(!value);
    },
    [setRemote]
  );

  const toggleSynchronous = useCallback(
    async (_e: GestureResponderEvent) => {
      const value = await Birch.synchronous();
      Birch.setSynchronous(!value);
      setSynchronous(!value);
    },
    [setSynchronous]
  );

  const t = useCallback((_e: GestureResponderEvent) => {
    Birch.t('trace');
  }, []);

  const d = useCallback((_e: GestureResponderEvent) => {
    Birch.d('debug');
  }, []);

  const i = useCallback((_e: GestureResponderEvent) => {
    Birch.i('info');
  }, []);

  const w = useCallback((_e: GestureResponderEvent) => {
    Birch.w('warn');
  }, []);

  const e = useCallback((_e: GestureResponderEvent) => {
    Birch.e('error');
  }, []);

  const printCurrentLevel = useCallback(async (_e: GestureResponderEvent) => {
    console.log(await Birch.currentLevel());
  }, []);

  return (
    <View style={styles.container}>
      <ButtonWrapper
        title={`Debug ${debug}`}
        onPress={toggleDebug}
        style={styles.button}
      />
      <ButtonWrapper
        title={`Level ${level}`}
        onPress={toggleLevel}
        style={styles.button}
      />
      <ButtonWrapper
        title={`Console ${consoleLog}`}
        onPress={toggleConsole}
        style={styles.button}
      />
      <ButtonWrapper
        title={`Remote ${remote}`}
        onPress={toggleRemote}
        style={styles.button}
      />
      <ButtonWrapper
        title={`Synchronous ${synchronous}`}
        onPress={toggleSynchronous}
        style={styles.button}
      />
      <ButtonWrapper
        title="Print current level"
        onPress={printCurrentLevel}
        style={styles.button}
      />
      <ButtonWrapper title="Trace" onPress={t} style={styles.button} />
      <ButtonWrapper title="Debug" onPress={d} style={styles.button} />
      <ButtonWrapper title="Info" onPress={i} style={styles.button} />
      <ButtonWrapper title="Warn" onPress={w} style={styles.button} />
      <ButtonWrapper title="Error" onPress={e} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 8,
  },
});
