package com.birch

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.gruffins.birch.Birch
import com.gruffins.birch.Options
import com.gruffins.birch.Level

class RNBirchModule(val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun debug(promise: Promise) {
    promise.resolve(Birch.debug)
  }

  @ReactMethod
  fun setDebug(value: Boolean) {
    Birch.debug = value
  }

  @ReactMethod
  fun optOut(promise: Promise) {
    promise.resolve(Birch.optOut)
  }

  @ReactMethod
  fun setOptOut(value: Boolean) {
    Birch.optOut = value
  }

  @ReactMethod
  fun uuid(promise: Promise) {
    promise.resolve(Birch.uuid)
  }

  @ReactMethod
  fun identifier(promise: Promise) {
    promise.resolve(Birch.identifier)
  }

  @ReactMethod
  fun setIdentifier(value: String?) {
    Birch.identifier = value
  }

  @ReactMethod
  fun customProperties(promise: Promise) {
    promise.resolve(Birch.customProperties)
  }

  @ReactMethod
  fun setCustomProperties(value: ReadableMap) {
    Birch.customProperties = mutableMapOf<String, String>().also { m ->
      val iterator = value.keySetIterator()

      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        m[key] = value.getString(key)!!
      }
    }
  }

  @ReactMethod
  fun console(promise: Promise) {
    promise.resolve(Birch.console)
  }

  @ReactMethod
  fun setConsole(value: Boolean) {
    Birch.console = value
  }

  @ReactMethod
  fun remote(promise: Promise) {
    promise.resolve(Birch.remote)
  }

  @ReactMethod
  fun setRemote(value: Boolean) {
    Birch.remote = value
  }

  @ReactMethod
  fun level(promise: Promise) {
    promise.resolve(Birch.level?.level)
  }

  @ReactMethod
  fun setLevel(value: Double) {
    val integer = value.toInt()

    if (integer == -1) {
      Birch.level = null
    } else {
      Birch.level = Level.fromInt(integer)
    }
  }

  @ReactMethod
  fun currentLevel(promise: Promise) {
    promise.resolve(Birch.currentLevel?.level)
  }

  @ReactMethod
  fun synchronous(promise: Promise) {
    promise.resolve(Birch.synchronous)
  }

  @ReactMethod
  fun setSynchronous(value: Boolean) {
    Birch.synchronous = value
  }

  @ReactMethod
  fun initialize(apiKey: String, publicKey: String? = null, options: ReadableMap? = null) {
    val opts = Options().also { o ->
      o.scrubbers = emptyList()
      
      options?.getString("host")?.let { o.host = it }
      options?.getString("defaultLevel")?.let { o.defaultLevel = Level.fromInt(it.toInt()) }
    }

    Birch.init(
      reactContext.applicationContext,
      apiKey,
      publicKey, 
      opts
    )
  }

  @ReactMethod
  fun syncConfiguration() {
    Birch.syncConfiguration()
  }

  @ReactMethod
  fun flush() {
    Birch.flush()
  }

  @ReactMethod
  fun t(message: String?) {
    message?.let { Birch.t(it) }
  }

  @ReactMethod
  fun d(message: String?) {
    message?.let { Birch.d(it) }
  }

  @ReactMethod
  fun i(message: String?) {
    message?.let { Birch.i(it) }
  }

  @ReactMethod
  fun w(message: String?) {
    message?.let { Birch.w(it) }
  }

  @ReactMethod
  fun e(message: String?) {
    message?.let { Birch.e(it) }
  }

  companion object {
    const val NAME = "RNBirch"
  }
}
