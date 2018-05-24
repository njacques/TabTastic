import Qs from "qs";
import parseDomain from "parse-domain";

export const nonInternalTabs = tab => tab.url.startsWith("chrome://") === false;

export const greatSuspenderRegex = /^chrome-extension:\/\/\w+\/suspended.html/;

export const parseUrl = url =>
	url.match(greatSuspenderRegex) ? Qs.parse(url).uri : url;

export const getDomain = url => {
	const parts = parseDomain(url);
	return parts ? `${parts.domain}.${parts.tld}` : "unknown";
};

export const tabToBookmark = ({ id, favIconUrl, title, url }) => ({
	id,
	favIconUrl,
	title,
	url: parseUrl(url),
	dateAdded: Date.now()
});
