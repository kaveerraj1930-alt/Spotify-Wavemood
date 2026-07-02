import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// Mock global Audio class for jsdom testing environment
class AudioMock {
  constructor(url) {
    this.url = url
    this._volume = 0.7
    this._currentTime = 0
    this._duration = 30
    this.listeners = {}
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  removeEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
    }
  }

  get volume() {
    return this._volume
  }

  set volume(val) {
    this._volume = val
  }

  get currentTime() {
    return this._currentTime
  }

  set currentTime(val) {
    this._currentTime = val
    this.trigger('timeupdate')
  }

  get duration() {
    return this._duration
  }

  set duration(val) {
    this._duration = val
    this.trigger('durationchange')
  }

  play() {
    setTimeout(() => {
      this.trigger('play')
    }, 0)
    return Promise.resolve()
  }

  pause() {
    this.trigger('pause')
  }

  trigger(event) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb())
    }
  }
}

global.Audio = AudioMock
global.window.Audio = AudioMock
