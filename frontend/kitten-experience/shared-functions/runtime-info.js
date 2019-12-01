export function getScreenWidth() {
  try {
    return window.screen.width;
  } catch (e) {
    return undefined;
  }
}
export function getScreenHeight() {
  try {
    return window.screen.height;
  } catch (e) {
    return undefined;
  }
}
