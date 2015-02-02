/****************RELOAD on ERROR*******************/
var reloadInAction = false;
chrome.webRequest.onErrorOccurred.addListener(
	function (details){
		if (reloadInAction) return;
		reloadInAction = true;
		setTimeout(function () {chrome.tabs.reload(details.tabId, null, function () {reloadInAction = false;})},10000);
	},
	{urls: ["*://www.mousehuntgame.com/*"],types: ["main_frame"]}
);
/****************REDIRECTION if INCORRECT*******************/
/*chrome.webRequest.onBeforeRequest.addListener(
	function (details){
		if (details.url.indexOf("/login.php") == -1) return {redirectUrl : "http://www.mousehuntgame.com" + details.url.slice(29)};
	},
	{urls: ["https://www.mousehuntgame.com/*"],types: ["main_frame"]},
	["blocking"]
);
*//*
chrome.webRequest.onBeforeRequest.addListener(
	function (details){
		return {redirectUrl : "https://apps.facebook.com/mousehunt/" + details.url.slice(35)};
	},
	{urls: ["http://apps.facebook.com/mousehunt/*"],types: ["main_frame"]},
	["blocking"]
);*/
/*********************LOCAL STORAGE**************************/
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name == "APPStorage")
	port.onMessage.addListener(function(msg) {
		if (msg.send == "Get")
		{
			
		}
	});
});
/***********************SYNC USER****************************/
chrome.webRequest.onCompleted.addListener(
	function (details){
		//console.log(details);
		//x = details;
	},
	{urls: ["*://www.mousehuntgame.com/*"],types: ["main_frame","sub_frame","xmlhttprequest"]}
);
/*********************APP VERSION****************************/
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name == "APPVersion")
	port.onMessage.addListener(function(msg) {
		if (msg.send == "Get")
		{
			port.postMessage({received: "OK", version: chrome.app.getDetails().version, update_url: chrome.app.getDetails().update_url, appid: chrome.app.getDetails().id});
		}
	});
});
/*********************APP SIMULATION****************************/
var appHeader = "";
chrome.runtime.onConnect.addListener(function(port) {
	if (port.name == "APPSimulate")
	port.onMessage.addListener(function(msg) {
		if (msg.send == "HeaderUserAgent")
		{
			appHeader = msg.headerUserAgent;
			port.postMessage({received: "OK"});
		}
	});
});

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			if (details.requestHeaders[i].name === "User-Agent") {
				details.requestHeaders[i].value = "Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; GT-I9500 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
			}
			else if (details.requestHeaders[i].name === "Origin") {
				details.requestHeaders[i].value = "file://";
			}
			else if (details.requestHeaders[i].name === "Referer") {
				details.requestHeaders.splice(i, 1);
			}
			//else if (details.requestHeaders[i].name === "Accept") {
			//	details.requestHeaders[i].value = "application/json, text/javascript, */*; q=0.01";
			//}
			/*
			else if (details.requestHeaders[i].name === "Content-Type") {
				details.requestHeaders[i].value = "application/x-www-form-urIencoded";
			}
			else if (details.requestHeaders[i].name === "Accept-Encoding") {
				details.requestHeaders[i].value = "gzip,deflate";
			}
			else if (details.requestHeaders[i].name === "Accept-Language") {
				details.requestHeaders[i].value = "en-US";
			}
			else if (details.requestHeaders[i].name === "Accept-Charset") {
				details.requestHeaders[i].value = "utf-8, iso-8859-1, utf-16, *;q=0.7";
			}
			else if (details.requestHeaders[i].name === "Cache-Control") {
				details.requestHeaders.splice(i, 1);
			}*/
		}
		return {requestHeaders: details.requestHeaders};
	},
	{urls: ["https://www.mousehuntgame.com/api/*"]},
	["blocking", "requestHeaders"]
);
