// See: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/screenshot/

let kommanderID;

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const kommanderUrl = chrome.runtime.getURL('kommander.html');
    const tabList = tabs
      .filter(tab => tab.url !== kommanderUrl)
      .filter(nonInternalTabs)
      .map(tab => `<li>${tab.title}: ${parseUrl(tab.url)}</li>`)
      .join('\n');

    const urls = tabs.map(tab => tab.url);
    const komanderIsOpen = urls.includes(kommanderUrl);
    let targetId;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      if (tabId != targetId || changedProps.status != "complete") return;

      chrome.tabs.onUpdated.removeListener(listener);

      const views = chrome.extension.getViews();
      for (let i = 0; i < views.length; i++) {
        const view = views[i];
        if (view.location.href === kommanderUrl) {
          view.update(tabList);
          break;
        }
      }
    });

    if(komanderIsOpen){
      chrome.tabs.update(kommanderId, { "active": true, url: kommanderUrl }, (tab) => { targetId = tab.id; });
    } else {
      chrome.tabs.create({url: kommanderUrl}, (tab) => { targetId = tab.id; kommanderId = tab.id; });
    }
  })
});

const nonInternalTabs = tab => tab.url.startsWith('chrome://') === false;

const greatSuspenderRegex = /^chrome-extension:\/\/\w+\/suspended.html/;
const parseUrl = url => {
  if (url.match(greatSuspenderRegex)) {
    return Qs.parse(url).uri;
  }

  return url;
}