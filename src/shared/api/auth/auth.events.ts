const authEventTarget = new EventTarget()

export class AuthEvents {
  static onRefreshTokens = 'onRefreshTokens'
  static onTokensExpired = 'onTokensExpired'

  static dispatchRefreshTokens() {
    authEventTarget.dispatchEvent(new Event(this.onRefreshTokens))
  }

  static dispatchTokensExpired() {
    authEventTarget.dispatchEvent(new Event(this.onTokensExpired))
  }

  static addEventListener(type: string, listener: EventListener) {
    authEventTarget.addEventListener(type, listener)
  }

  static removeEventListener(type: string, listener: EventListener) {
    authEventTarget.removeEventListener(type, listener)
  }
}
