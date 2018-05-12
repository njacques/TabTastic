const Qs = require('qs');

export const nonInternalTabs = tab => tab.url.startsWith('chrome://') === false;
export const greatSuspenderRegex = /^chrome-extension:\/\/\w+\/suspended.html/;
export const parseUrl = url => ((url.match(greatSuspenderRegex)) ? Qs.parse(url).uri : url);
