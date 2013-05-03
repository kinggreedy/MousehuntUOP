/****************RELOAD on ERROR*******************/
chrome.webRequest.onErrorOccurred.addListener(
	function (details){
		setTimeout(function () {chrome.tabs.reload(details.tabId)},3000);
	},
	{urls: ["*://www.mousehuntgame.com/*", "*://apps.facebook.com/mousehunt/*"],types: ["main_frame", "sub_frame"]}
);

/****************RUN when COMPLETED*******************/
/*
chrome.webRequest.onCompleted.addListener(
	function (details){
		chrome.tabs.executeScript(details.tabId, {file: "content.js",allFrames : true, runAt: "document_start"})
	},
	{urls: ["*://www.mousehuntgame.com/*", "*://apps.facebook.com/mousehunt/*"],types: ["main_frame", "sub_frame"]}
);
*/

/****************REDIRECTION if INCORRECT*******************/
chrome.webRequest.onBeforeRequest.addListener(
	function (details){
		if (details.url.indexOf("/login.php") == -1) return {redirectUrl : "http://www.mousehuntgame.com" + details.url.slice(29)};
	},
	{urls: ["https://www.mousehuntgame.com/*"],types: ["main_frame"]}
	,["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
	function (details){
		return {redirectUrl : "https://apps.facebook.com/mousehunt/" + details.url.slice(35)};
	},
	{urls: ["http://apps.facebook.com/mousehunt/*"],types: ["main_frame"]}
	,["blocking"]
);
