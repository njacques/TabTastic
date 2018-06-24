/* global describe it expect */

import {
  nonInternalTabs,
  greatSuspenderRegex,
  parseUrl,
  getDomain
} from "../src/js/helpers/helpers";

const greatSuspenderTabURL =
  "chrome-extension://klbibkeccnjlkjkiokjodocebajanakg/suspended.html#ttl=119%3A%20Separation%20of%20Concerns%20-%20Does%20Not%20Compute&uri=https://spec.fm/podcasts/does-not-compute/128427";

describe("nonInternalTabs", () => {
  it("can recognize an internal tab", () => {
    expect(nonInternalTabs({ url: "https://developer.mozilla.org" })).toBe(
      true
    );
  });

  it("can recognize a non internal tab", () => {
    expect(nonInternalTabs({ url: "chrome://extensions/" })).toBe(false);
  });
});

describe("greatSuspenderRegex", () => {
  it("can recognize a Great Suspender tab", () => {
    expect(greatSuspenderTabURL.match(greatSuspenderRegex).index).toBe(0);
  });

  it("can recognize a non Great Suspender tab", () => {
    expect(
      "https://developer.mozilla.org".match(greatSuspenderRegex)
    ).toBeNull();
  });
});

describe("parseUrl", () => {
  it("returns the URL if it doesn't match the greatSuspenderRegex", () => {
    expect(parseUrl("https://developer.mozilla.org")).toBe(
      "https://developer.mozilla.org"
    );
  });

  it("returns the URI query string if it matches the greatSuspenderRegex", () => {
    expect(parseUrl(greatSuspenderTabURL)).toBe(
      "https://spec.fm/podcasts/does-not-compute/128427"
    );
  });
});

describe("getDomain", () => {
  it('returns "localhost" for local URLs', () => {
    expect(getDomain("http://127.0.0.1/")).toBe("localhost");
    expect(getDomain("http://localhost/")).toBe("localhost");
  });
});
