const tokenEvent = {
  on(callback: () => void) {
    window.addEventListener('tokenExpired', callback);
  },
  dispatch() {
    window.dispatchEvent(new CustomEvent('tokenExpired'));
  },
  remove(callback: () => void) {
    window.removeEventListener('tokenExpired', callback);
  },
};

export default tokenEvent;
