/* global document window */

import { parseUrl } from './helpers/helpers';

chrome.storage.local.get(['tabs'], ({ tabs }) => {
  const tabHTML = tabs
    .map(tab => `<li><a href="${parseUrl(tab.url)}" target="blank">${tab.title}</a></li>`)
    .join('\n');

  document.getElementById('tab-count').innerHTML = tabs.length;
  document.getElementById('target').innerHTML = tabHTML;
});
