export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}

export const isMobile = (() => {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return !flag;
})();

export const copy = o => JSON.parse(JSON.stringify(o));

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const debounce = (fn, time = 100) => {
  let timer = null;
  return function() {
    const context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};
