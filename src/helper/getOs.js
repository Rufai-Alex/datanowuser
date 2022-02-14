export const getOS = () => {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = "WEB";

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Web"; //Mac
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "IOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "WEB"; //Windows
  } else if (/Android/.test(userAgent)) {
    os = "ANDROID";
  } else if (!os && /Linux/.test(platform)) {
    os = "WEB"; //linus
  }

  return os;
};
