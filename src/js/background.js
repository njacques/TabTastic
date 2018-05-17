/* global chrome */

// See: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/screenshot/

import '../img/icon-128.png';
import '../img/icon-34.png';
import { nonInternalTabs, parseUrl } from './helpers/helpers';

let kommanderID = null;

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const kommanderUrl = chrome.runtime.getURL('kommander.html');
    const tabList = tabs
      .filter(tab => tab.url !== kommanderUrl)
      .filter(nonInternalTabs);




    const urls = tabs.map(tab => tab.url);
    const komanderIsOpen = urls.includes(kommanderUrl);

    if (komanderIsOpen && kommanderID === null) {
      const kommanderTab = tabs.filter(tab => tab.url === kommanderUrl)[0];
      kommanderID = kommanderTab.id;
    }

    chrome.storage.local.set({ tabs: tabList }, () => {
      if (komanderIsOpen) {
        chrome.tabs
          .update(kommanderID, { active: true, url: kommanderUrl }, (tab) => { targetId = tab.id; });
      } else {
        chrome.tabs
          .create({ url: kommanderUrl }, (tab) => { targetId = tab.id; });
      }
    });
  });
});
