type VoidCallback = () => void;

class SessionService {
  sessionCallback?: VoidCallback | null;
  observe(callback: VoidCallback) {
    this.sessionCallback = callback;
  }
  unAuthenticated() {
    this.sessionCallback?.();
  }
  clear() {
    this.sessionCallback = null;
  }
}

export default new SessionService();
