import Birch

@objc(RNBirch)
class RNBirch: NSObject {

  @objc
  func debug(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.debug)
  }

  @objc
  func setDebug(_ value: Bool) {
    Birch.debug = value
  }

  @objc
  func optOut(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.optOut)
  }

  @objc
  func setOptOut(_ value: Bool) {
    Birch.optOut = value
  }

  @objc
  func uuid(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.uuid)
  }

  @objc
  func identifier(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.identifier)
  }

  @objc
  func setIdentifier(_ value: String?) {
    Birch.identifier = value
  }

  @objc
  func customProperties(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.customProperties)
  }

  @objc
  func setCustomProperties(_ value: [String: String]) {
    Birch.customProperties = value
  }

  @objc
  func console(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.console)
  }

  @objc
  func setConsole(_ value: Bool) {
    Birch.console = value
  }

  @objc
  func remote(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.remote)
  }

  @objc
  func setRemote(_ value: Bool) {
    Birch.remote = value
  }

  @objc
  func level(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if let level = Birch.level {
      resolve(level.rawValue)
    } else {
      resolve(nil)
    }
  }

  @objc
  func setLevel(_ level: NSNumber) {
    let val = Int(level)
    
    if val == -1 {
      Birch.level = nil
    } else {
      Birch.level = Level(rawValue: val)
    }
  }

  @objc
  func currentLevel(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if let level = Birch.currentLevel {
      resolve(level.rawValue)
    } else {
      resolve(nil)
    }
  }

  @objc
  func synchronous(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(Birch.synchronous)
  }

  @objc
  func setSynchronous(_ value: Bool) {
    Birch.synchronous = value
  }

  @objc
  func initialize(_ apiKey: String?, publicKey: String?, options: [String: String]?) {
    if let apiKey {
      let opts = Options()
      opts.scrubbers = []
      
      if let host = options?["host"] {
        opts.host = host
      }

      if let str = options?["defaultLevel"], let rawValue = Int(str), let level = Level(rawValue: rawValue) {
          opts.defaultLevel = level
      }

      Birch.initialize(apiKey, publicKey: publicKey, options: opts)
    }
  }

  @objc
  func syncConfiguration() {
    Birch.syncConfiguration()
  }

  @objc
  func flush() {
    Birch.flush()
  }

  @objc
  func t(_ message: String?) {
    if let message {
      Birch.t(message)
    }
  }

  @objc
  func d(_ message: String?) {
    if let message {
      Birch.d(message)
    }
  }

  @objc
  func i(_ message: String?) {
    if let message {
      Birch.i(message)
    }
  }

  @objc
  func w(_ message: String?) {
    if let message {
      Birch.w(message)
    }
  }

  @objc
  func e(_ message: String?) {
    if let message {
      Birch.e(message)
    }
  }
}
