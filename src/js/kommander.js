/* global document window */

function update() {
  document.getElementById('target').innerHTML = window.tabs;
}

function setTabs(tabList) {
  window.tabs = tabList;
}

window.tabs = 'pageload';
window.setTabs = setTabs;

setTimeout(() => { update(); }, 25);
