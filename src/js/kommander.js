/* global document chrome */
import Sortable from "sortablejs";
import "../css/kommander.css";
import { getDomain } from "./helpers/helpers";

const defaultFavicon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4T2NkoBAwIuuPiIhwwGHegxUrVjzAJodhwIoVKw6gG/r///8fjIyML7AZQpQBL168OCEuLm6AzRCiDAC5ysHBgQObIUQZgO53ZG8SNABdMyigRw0Y/mFATObEmQ6I0YyuBgB6/3gRnZbduwAAAABJRU5ErkJggg==";

const renderBookmark = bookmark => `
  <div class="card" data-id="${bookmark.id}">
    <div class="card-content-modified">
      <div class="msg-subject ">
        <span class="msg-subject ">
          <img src="${bookmark.favIconUrl ||
            defaultFavicon}" height="16" width="16" />
          ${bookmark.title} (${getDomain(bookmark.url)})
        </span>
      </div>
    </div>
  </div>
`;

chrome.storage.local.get(["bookmarks"], ({ bookmarks = [] }) => {
  const inbox = bookmarks
    .filter(bookmark => bookmark.folder === "inbox")
    .map(renderBookmark)
    .join("\n");

  const inboxList = document.getElementById("inbox-messages");
  inboxList.innerHTML = inbox;

  Sortable.create(inboxList, {
    group: "shared"
  });

  Sortable.create(document.getElementsByClassName("droppable")[0], {
    group: "shared",
    onAdd: evt => {
      const el = evt.item;
      const bookmarkId = Number(el.dataset.id);

      el.parentNode.removeChild(el);

      const bookmark = bookmarks.find(bm => bm.id === bookmarkId);
      bookmark.folder = "tutorials";
      chrome.storage.local.set({ bookmarks });
    }
  });
});
