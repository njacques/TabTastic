/* global document window chrome */
import parseDomain from "parse-domain";
import "../css/kommander.css";
import { parseUrl } from "./helpers/helpers";

const defaultFavicon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4T2NkoBAwIuuPiIhwwGHegxUrVjzAJodhwIoVKw6gG/r///8fjIyML7AZQpQBL168OCEuLm6AzRCiDAC5ysHBgQObIUQZgO53ZG8SNABdMyigRw0Y/mFATObEmQ6I0YyuBgB6/3gRnZbduwAAAABJRU5ErkJggg==";

window.inbox = [];

const getDomain = url => {
  const parts = parseDomain(url);
  return parts ? `${parts.domain}.${parts.tld}` : "unknown";
};

const renderTab = tab => `
  <div class="card">
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

chrome.storage.local.get(["tabs"], ({ tabs }) => {
  const inbox = tabs
    .map(({ id, favIconUrl, title, url }) => ({
      id,
      favIconUrl,
      title,
      url: parseUrl(url)
    }))
    .map(renderTab)
    .join("\n");

  document.getElementById("inbox-messages").innerHTML = inbox;
});
