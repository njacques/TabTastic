/* global document chrome */
import Sortable from "sortablejs";
import "../css/kommander.css";
import { getDomain } from "./helpers/helpers";

const defaultFavicon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4T2NkoBAwIuuPiIhwwGHegxUrVjzAJodhwIoVKw6gG/r///8fjIyML7AZQpQBL168OCEuLm6AzRCiDAC5ysHBgQObIUQZgO53ZG8SNABdMyigRw0Y/mFATObEmQ6I0YyuBgB6/3gRnZbduwAAAABJRU5ErkJggg==";

const moveTab = (id, from, to) => {
  chrome.storage.local.get([from, to], data => {
    if (typeof data[from] === "undefined") return;
    const source = data[from];

    const destination = data[to] || [];

    const selectedTab = source.find(tab => tab.id === id);

    if (selectedTab) {
      const idx = source.indexOf(selectedTab);
      source.splice(idx, 1);
      destination.push(selectedTab);

      chrome.storage.local.set({ [from]: source, [to]: destination }, () =>
        console.log(`tab moved from ${from} to ${to}`)
      );
    }
  });
};

const renderTab = tab => `
  <div class="card" data-id="${tab.id}">
    <div class="card-content-modified">
      <div class="msg-subject ">
        <span class="msg-subject ">
          <img src="${tab.favIconUrl ||
            defaultFavicon}" height="16" width="16" />
          ${tab.title} (${getDomain(tab.url)})
        </span>
      </div>
    </div>
  </div>
`;

chrome.storage.local.get(["inbox"], ({ inbox: tabs = [] }) => {
  const inbox = tabs
    .map(renderTab)
    .join("\n");

  const tabList = document.getElementById("inbox-messages");
  tabList.innerHTML = inbox;

  Sortable.create(tabList, {
    group: "shared"
  });
});

Sortable.create(document.getElementsByClassName("droppable")[0], {
  group: "shared",
  onAdd: evt => {
    const el = evt.item;
    el.parentNode.removeChild(el);
    moveTab(Number(el.dataset.id), "inbox", "tutorials");
  }
});
