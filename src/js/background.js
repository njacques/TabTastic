/* global chrome */

// See: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/screenshot/

import "../img/icon-128.png";
import "../img/icon-34.png";
import { nonInternalTabs, tabToBookmark } from "./helpers/helpers";

const kommanderUrl = chrome.runtime.getURL("kommander.html");

const openKommanderTab = tabs => {
  const kommanderTab = tabs.find(tab => tab.url === kommanderUrl);

  if (kommanderTab) {
    chrome.tabs.update(kommanderTab.id, {
      active: true,
      url: kommanderUrl
    });
  } else {
    chrome.tabs.create({ url: kommanderUrl });
  }
};

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({}, tabs => {
    const newBookmarks = tabs
      .filter(tab => tab.url !== kommanderUrl)
      .filter(nonInternalTabs)
      .map(tabToBookmark);

    if (newBookmarks) {
      chrome.storage.local.get(["bookmarks"], ({ bookmarks = {} }) => {
        newBookmarks.forEach(newBookmark => {
          if (!bookmarks[newBookmark.url]) {
            bookmarks[newBookmark.url] = newBookmark;
          }
        });

        chrome.storage.local.set({ bookmarks }, () => openKommanderTab(tabs));
      });
    }
  });
});
