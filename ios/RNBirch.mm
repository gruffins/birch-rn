#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNBirch, NSObject)

RCT_EXTERN_METHOD(
  debug: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setDebug: (BOOL)value)

RCT_EXTERN_METHOD(
  optOut: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setOptOut: (BOOL)value)

RCT_EXTERN_METHOD(
  uuid: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  identifier: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setIdentifier: (NSString *)identifer)

RCT_EXTERN_METHOD(
  customProperties: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setCustomProperties: (NSDictionary *)value)

RCT_EXTERN_METHOD(
  console: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setConsole: (BOOL)value)

RCT_EXTERN_METHOD(
  remote: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject

)
RCT_EXTERN_METHOD(setRemote: (BOOL)value)

RCT_EXTERN_METHOD(
  level: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setLevel: (nonnull NSNumber *)value)

RCT_EXTERN_METHOD(
  currentLevel: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  synchronous: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(setSynchronous: (BOOL)value)

RCT_EXTERN_METHOD(
  initialize: (NSString *)apiKey
  publicKey: (NSString *)publicKey
  options: (NSDictionary *)options
)

RCT_EXTERN_METHOD(syncConfiguration)

RCT_EXTERN_METHOD(flush)

RCT_EXTERN_METHOD(t:(NSString *)message)
RCT_EXTERN_METHOD(d:(NSString *)message)
RCT_EXTERN_METHOD(i:(NSString *)message)
RCT_EXTERN_METHOD(w:(NSString *)message)
RCT_EXTERN_METHOD(e:(NSString *)message)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
