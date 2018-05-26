/* global chrome */

// See: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/screenshot/

import "../img/icon-128.png";
import "../img/icon-34.png";
import { nonInternalTabs, tabToBookmark } from "./helpers/helpers";

const kommanderUrl = chrome.runtime.getURL("kommander.html");

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({}, tabs => {
    const bookmarks = tabs
      .filter(tab => tab.url !== kommanderUrl)
      .filter(nonInternalTabs)
      .map(tabToBookmark);

    const urls = tabs.map(tab => tab.url);
    const komanderIsOpen = urls.includes(kommanderUrl);

    chrome.storage.local.set({ bookmarks }, () => {
      if (komanderIsOpen) {
        const kommanderTab = tabs.filter(tab => tab.url === kommanderUrl)[0];
        chrome.tabs.update(kommanderTab.id, {
          active: true,
          url: kommanderUrl
        });
      } else {
        chrome.tabs.create({ url: kommanderUrl });
      }
    });
  });
});
