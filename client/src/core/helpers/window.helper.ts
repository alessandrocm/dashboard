
const win = window;
const doc = document;

export function getWidth() {
  const body = doc.getElementsByTagName('body')[0];
  return win.innerWidth || doc.documentElement.clientWidth || body.clientWidth;
}

export function getHeight() {
  const body = doc.getElementsByTagName('body')[0];
  return win.innerHeight || doc.documentElement.clientHeight || body.clientHeight;
}

export function windowSize() {
  return {
    height: getHeight(),
    width: getWidth()
  };
}
