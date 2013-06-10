// ==UserScript==
// @name        A.R.L.T.K.S
// @author      GaCon
// @version    	2.3
// @namespace   GaCon
// @description All roads lead to King's Stockade on a Bugatti Veyron. Rocket speed !!!
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @run-at      document-start
// @include     http://mousehuntgame.com/*
// @include     https://mousehuntgame.com/*
// @include     http://www.mousehuntgame.com/*
// @include     https://www.mousehuntgame.com/*
// @include     http://apps.facebook.com/mousehunt/*
// @include     https://apps.facebook.com/mousehunt/*
// ==/UserScript==

// The public prefix for this script is UOP_ . All of the outside variable and function will have this prefix.
/**************INIT THE SCRIPT****************
 * Attach the init function to DOMContentLoaded
 * And check if the page fail to load in 15 sec.
 * 
 * force the non-HTTPS page if we're at camp
 */
var C_ForceNonHTTPS = 1;
if ((location.pathname != "/login.php") && (location.protocol == "https:") && (C_ForceNonHTTPS == 1) && (location.hostname.indexOf('facebook') == -1) && (location.pathname.indexOf('/canvas/') == -1)) //not at login.php & using HTTP, not HTTPS & not facebook
{
	location.replace("http"+location.href.substr(5)); //force HTTPS
}
else
{
	checkDocumentState();
	window.addEventListener('DOMContentLoaded',initialization,false);
}
var documentLoadCounter = 0;
function checkDocumentState() {
	if (document.readyState == "loading")
	{
		if (documentLoadCounter > 120) location.reload();
		++documentLoadCounter;
		setTimeout(checkDocumentState,1000);
	}
}

/**************VARIABLES*****************/
//==========Constants==========
//Setting Constants
var C_version = "2.3";
var C_versionCompatibleCode = "3";
var C_disableExperimental = 0;
var C_SecondInterval = 1;
var C_MinuteInterval = 60;
var C_autoInterval = 1;
var C_solveStage = 2; //maximum stages of process, offline = 2, server = 4
var C_cpcontent,C_cpprefix,C_cpsuffix,C_cpstyle,C_cpmessage,C_tabNum,C_groupNum,C_autopanel;
//Constants
var C_LOCATION_TIMES = [
	{
		name: 'Seasonal Garden',
		shortname: 'SG',
		id: 'UOP_locationTimerSeasonalGarden',
		base: 1283328000,
		totaltime: 1152000,
		length: [288000, 288000, 288000, 288000],
		state: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'],
		shortstate: ['SPR','SUM','FALL','WIN'],
		color: ['LightGreen', 'Yellow', 'Orange', 'LightBlue']
	},
	{
		name: "Balack's Cove",
		shortname: "BC",
		id: 'UOP_locationTimerBalacksCove',
		base: 1294680060,
		totaltime: 67200,
		length: [57600, 3600, 2400, 3600],
		state: ['LOW', 'MEDIUM', 'HIGH', 'MEDIUM'],
		shortstate: ['LOW','MED','HIGH','MED'],
		color: ['#E1C7E1', 'Orange', 'Red', 'Orange']
	},
	{
		name: 'Forbidden Grove',
		shortname: "FG",
		id: 'UOP_locationTimerForbiddenGrove',
		base: 1285704000,
		totaltime: 72000,
		length: [57600, 14400],
		state: ['OPEN', 'CLOSED'],
		shortstate: ['OPEN','CLOSED'],
		color: ['LightGreen', 'Red']
	},
	{
		name: 'Relic Hunter',
		shortname: "RH",
		id: 'UOP_locationTimerRelicHunter',
		base: 1346284800,
		totaltime: 604800,
		length: [86400, 86400, 86400, 86400, 86400, 86400, 86400],
		state: ['Mountain', 'Town of Digby', 'Laboratory', 'S. S. Huntington III', 'Seasonal Garden', 'Slushy Shoreline', 'Muridae Market'],
		shortstate: ['Mt.', 'ToD', 'Lab', 'SSH', 'SG', 'SS', 'MM'],
		color: ['#CD853F', '#8B4513', 'Skyblue', 'Blue', 'Green', 'Silver', '#B22222']
	}
];
var C_cssArr, C_jsArr, C_cssCustomArr, C_cssjsSetArr;
var C_mode = ["Running","Stopped","Paused","Error"], C_priority = ["Normal","High priority","Low priority"];
var C_canvasMode = ["","/canvas"];
var C_displayState = ["block","none"];
var C_mobile = [{},
{Cordova:'Android',xrequestwith:'android',agent:'Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; GT-I9500 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'},
{Cordova:'Iphone',xrequestwith:'iphone',agent:'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_2 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B146 Safari/8536.25'}];
var BASE = 0, PHYSICAL = 1, TACTICAL = 2, HYDRO = 3, SHADOW = 4, ARCANE = 5, FORGOTTEN = 6, DRACONIC = 7, PARENTAL = 8, BALACKSCOVE = 9;
var C_powertype = {BASE: 'base', PHYSICAL: 'phscl',TACTICAL: 'tctcl', HYDRO: 'hdr', SHADOW: 'shdw', ARCANE: 'arcn',FORGOTTEN: 'frgttn',DRACONIC: 'drcnc',PARENTAL: 'prntl'}
var TRAPSTR = 0,TRAPPOWER = 1, TRAPLUCK = 2, TRAPATTRACTION = 3;
var C_trapprioritytype = {TRAPAUTO: 'str', TRAPPOWER: 'power', TRAPLUCK: 'luck', TRAPATTRACTION: 'attraction'}
//CallbackFunctions

//==========Variables==========
//Setting Variables
var S_skin,S_simple,S_auto,S_schedule,S_solve,S_server;
var S_ads,S_emulateMode,S_aggressive,S_delaymin,S_delaymax,S_alarm,S_alarmSrc,S_alarmNoti,S_alarmStop,S_alarmStopTime,S_trapCheck,S_trapCheckTime,S_trapCheckPriority,S_numScript;
var S_cacheKRstr,S_serverUrl;
var S_settingGroupsLength = [415,415];

//Object Variables
var O_titleBar,O_hornHeader,O_hornButton,O_hgRow,O_baitNum,O_titlePercentage,O_oldHuntTimer;
var O_huntTimer,O_LGSTimer,O_locationTimer,O_simpleHud,O_imageBox,O_imagePhoto;
var O_mode,O_environment;
var O_sendMessage,O_receiveMessage,O_settingGroup,O_travelTab,O_travelContent,O_shopContent,O_potContent,O_craftContent,O_supplyContent,O_giftContent;
var O_playing, O_autoPanel, O_autoPauseCounter, O_autoSounding, O_autoCounter, O_autoMainCounter, O_autoDelayCounter;

//Auto Variables
var A_soundingCounter, A_soundedCounter, A_hornRetryCounter = 0, A_autoPaused, A_delayTime, A_delayTimestamp, A_solveStage, A_puzzleTimeout, A_puzzleCalled = 0, A_audioDiv, A_audioWin;

//Variables
var data,itemdata,appgameinfo;
var template = new Object;
var registerSoundHornSounding = new Array;
var registerSoundHornSounded = new Array;
var registerSoundHornWaiting = new Array;
var nextTurnTimestamp,atCamp = false;
var cssArr, jsArr, cssCustomArr, cssjsSetArr;
var refreshingByError = 0,screenshotSafe = 0;
var puzzleSubmitErrorHash,puzzleSubmitErrorStage = 0,puzzleSubmitErrorStr,puzzleContainer;
var facebookWindow,canvasWindow = null,access_token_loaded = 0,inCanvas = 0,convertibleItem = null;
/*******************INITIALIZATION********************/
function initialization() {
	//==========CHECK THE BROWSER LOCATIONS. Ex: login, turn, https, mobile, loaded with error,...==========
	window.addEventListener("message", receiveWindowMessage, false);
	if (checkBrowser() == 1) return;
	
	//==========LOAD SETTINGS==========
	loadSettings();
	initAppEmulation();
	
	//==========INIT VARIABLES & TEMPLATE==========
	runTimeCreateConstant();
	manageCSSJSAdder(0);
	createTemplate();
	initVariables();
	addControlPanel();
	addScreenShotSafe();
	
	//==========CALL THE MAIN FUNCTION==========
	main();
}
function initVariables() {
	O_hornHeader = document.getElementById('header');
	O_hgRow = document.getElementById('hgRow');
	O_hornButton = document.getElementsByClassName('hornbutton')[0].firstChild;
	O_hornButton.addEventListener('click',soundHorn,false);
	
	O_receiveMessage = document.createElement('a');
	O_receiveMessage.id = "UOP_toScriptMessage";
	document.body.appendChild(O_receiveMessage);
	O_receiveMessage.addEventListener('click',receiveMessage,false);
	O_sendMessage = document.createElement('a');
	O_sendMessage.id = "UOP_toWindowMessage";
	document.body.appendChild(O_sendMessage);
	O_sendMessage.setAttribute('onclick','UOP_receiveMessage();');
	var scriptstr = windowScript.toString().replace("function windowScript() {","");
	scriptstr = scriptstr.substring(0,scriptstr.length - 1);
	scriptstr += sendMessage.toString().replace("function sendMessage","function UOP_sendMessage");
	scriptstr += UOP_receiveMessage.toString();
	var script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.innerHTML = scriptstr;
	document.head.appendChild(script);
	
	scriptstr = get_access_token.toString().replace("function get_access_token() {","");
	scriptstr = scriptstr.substring(0,scriptstr.length - 1);
	script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.innerHTML = scriptstr;
	document.head.appendChild(script);
	
	registerSoundHornWaiting.push(updateTimeStamp);
}
function runTimeCreateConstant() {
	C_tabNum = new Object;
	C_tabNum["UOP_buttonGeneral"] = 0;
	C_tabNum["UOP_buttonBot"] = 1;
	C_tabNum["UOP_buttonSchedule"] = 2;
	C_groupNum = new Object;
	C_groupNum["UOP_auto"] = 0;
	C_groupNum["UOP_schedule"] = 1;
	C_autopanel = '\
	<div class="UOP_playing">\
	<a class="UOP_autoplayimg"><div class="picture"></div></a>\
	<a class="UOP_autopauseimg"><div class="picture"></div></a>\
	</div>';
	cssArr = [1];
	jsArr = [1];
	cssCustomArr = [1];
	cssjsSetArr = [1,1,1,1,1,1,1,1];
	C_cssjsSetArr = [[[],[],[0]], [[0],[0],[1]], [[1],[1,2,3],[2]], [[2,3],[4,5,6,7],[3]], [[],[],[4]],[[],[],[5]],[[3,5],[6,9],[6]],[[4],[8],[7]]];
	C_cssArr = ["css/views/en/ItemPurchaseView.css","css/views/en/InventoryItemView.css","css/views/en/CraftingView.css","platform/css/views/en/FlexibleDialogBoxView.css","css/views/en/GiftSelectorView.css","css/views/en/SupplyTransferView.css"];
	C_jsArr = ["js/views/en/ItemPurchaseView.js","js/views/en/InventoryItemView.js","platform/js/jquery/en/jquery.tmpl.min.js","platform/js/classes/en/radioSelector.js","js/views/en/RecipeView.js", "js/views/en/CraftingView.js","platform/js/views/en/FlexibleDialogBoxView.js","platform/js/jquery/en/jquery.scrollTo-min.js","js/views/en/GiftSelectorView.js","js/views/en/SupplyTransferView.js"];
	C_cssCustomArr = [
	'.UOP_hgMenu {padding: 0px 8px 0px 0px!important;cursor: pointer;height: 35px;}\
	 .UOP_hgMenu .userPic {float: left; width :40px; position: relative;}\
	 .UOP_hgMenu .picture {width: 29px; height: 29px; position: relative; top: 3px; left: 0px; margin-left: 5px}\
	 .UOP_hgMenu .userText {float: right; padding-top: 10px; font-size: 12px; color: #64696D; font-family: "lucida grande",tahoma,verdana,arial,sans-serif; font-weight: bold;}\
	 .UOP_hgMenu a {text-decoration: none;}\
	 #UOP_appControlPanel {float: left; padding-right: 4px;}\
	 #UOP_appControlPanel .picture {background: url("data:image/png;base64,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");}\
	 #UOP_toScriptMessage, #UOP_toWindowMessage {display:none;}\
	 #UOP_cpdiv {width: 646px;}\
	 #UOP_cpdiv, #UOP_settingdiv, .UOP_drawertaskbar {font-family: "Segoe UI";font-size: 12px;color: #323232;text-shadow: none;}\
	 .UOP_drawertaskbar {background-color: #3c454f;height: 60px;position: relative;text-align: center;color: #fff;}\
	 .UOP_button {background-color: transparent;border: 0;width: 85px;height: 60px;font-size: 9px;color: #fff;cursor: pointer;text-decoration: none;display:inline-block;}\
	 .UOP_buttonseparator {background-color: transparent;border: 0;width: 85px;display: inline-block;}\
	 .UOP_button:hover {background-color: #505861;}\
	 .UOP_buttonicon {padding-top: 2px;position: relative;overflow: hidden;width: 32px;height: 32px;margin: 0 auto;padding: 4px 0 0;}\
	 .UOP_buttontext {text-align: center;text-transform: uppercase;line-height: 1em;word-wrap: break-word;padding: 0 2px;}\
	 .UOP_section h2 {border: 0;float: left;margin-bottom: 0;padding-bottom: 5px;font-size: 20px;border-bottom: 2px solid #88b9e3;margin: 10px 0 22px 0;font-family: "Segoe UI Light";font-weight: normal;min-width: 100%;}\
	 .UOP_settinggroup {transition: all 0.7s ease-in-out;-moz-transition: all 0.7s ease-in-out;-webkit-transition: all 0.7s ease-in-out;-o-transition: all 0.7s ease-in-out;opacity: 1;overflow: hidden;}\
	 .UOP_setting >label {display: block;padding-top: 10px;font-size: 11px;font-family: "Segoe UI Semibold";text-transform: uppercase;float: left;width: 218px;word-wrap: break-word;}\
	 .UOP_setting ul {list-style-type: none;}\
	 .UOP_setting {position: relative;border-bottom: 1px solid #d8d8d8;padding-bottom: 18px;margin-top: 18px;min-height: 37px;display: block;clear: both;display: block;}\
	 .UOP_settingvalue {display: inline-block;}\
	 .UOP_settingvalue ul {display: block;float: left;margin-top: 0px;margin-bottom: 0px;padding-left: 0px;}\
	 .UOP_settingvalue li {float:left;border:2px solid #ccc;margin-right:-2px}\
	 .UOP_settingvalue li:hover {background-color:#ddd}\
	 .UOP_settingvalue li[aria-checked="true"] {position:relative;background-color:#c84fd7;border-color:#434343;color:#fff}\
	 .UOP_settingvalue li[aria-checked="true"][origin="true"] {background-color:#4f9dd7;}\
	 .UOP_settingvalue li {min-width:46px;line-height:20px;padding:5px;text-align:center;text-transform:uppercase;color:#535353;cursor:default}\
	 .UOP_settingvalue input[type="text"] {vertical-align: bottom;width: 36px;}\
	 .UOP_scriptDiv {margin-left: -70px;overflow-y:hidden;height:200px;}\
	 .UOP_scriptDiv:hover {overflow-y:scroll;}\
	 .UOP_table thead tr th {cursor:pointer;width: 100px;border-bottom: 3px solid #ccc;font-family: "Segoe UI Semibold";font-weight: bold;text-transform: uppercase;font-size: 11px;padding: 0 0 0 10px;border-right: 1px solid #ccc;text-align: left;line-height: 24px;}\
	 .UOP_table thead tr th:hover {background-color: #f2f2f2;}\
	 .UOP_table thead tr th:last-child {border-right-color: #fff;}\
	 .UOP_table tbody tr td {cursor:default;padding: 0 0 0 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 11px;line-height: 30px;border-bottom: 1px solid #fff;}\
	 .UOP_table tbody tr td:first-child {width: 230px;cursor:pointer;font-family: "Segoe UI Semibold";background-color: #e1f3fb;}\
	 .UOP_table tbody tr:hover {background-color: #daf0fa;}\
	 .UOP_table tbody tr:hover td {border-bottom-color: #e9f6fc;}\
	 .UOP_table tbody tr:hover td:first-child {width: 230px;background-color: #c3e7f7;border-bottom-color: #c3e7f7;background-repeat: no-repeat;background-position: right center;background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr:hover td:first-child:hover {background-color: #71b1d1;}\
	 .UOP_table tbody tr:first-child td {border-top: 10px solid #fff;}\
	 .UOP_table tbody tr[aria-selected="true"] td {color: #fff;background-color: #6ac4ea;}\
	 .UOP_table tbody tr[aria-selected="true"] td:first-child {background-color: #3aa0cc;background-repeat: no-repeat;background-position: right center;background-image: url(data:image/png;base64,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);}\
	 .UOP_table tfoot tr {cursor:default;line-height: 24px;}\
	 .UOP_table tfoot tr:hover {background-color: #f2f2f2;}\
	 .UOP_table tfoot tr:hover td:first-child {background-color: #cecece;}\
	 .UOP_table tfoot tr td:first-child{width: 230px;padding-bottom: 4px;padding-right: 6px;cursor:pointer;color: #fff;background-color: #bdbdbd;font-weight: bold;font-size: 20px;text-align: right;}\
	 .UOP_table tfoot tr td:first-child:hover{background-color: #dfdfdf;}\
	 .UOP_table tbody tr td .UOP_scriptStatusImg {width: 16px;height: 16px;position: relative;overflow: hidden;display: inline-block;margin-right: 6px;vertical-align: middle;}\
	 .UOP_table tbody tr td .UOP_scriptStatusImg[status="Running"] {background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr td .UOP_scriptStatusImg[status="Stopped"] {background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr td .UOP_scriptStatusImg[status="Paused"] {background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr td .UOP_scriptStatusImg[status="Error"] {background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr[aria-selected="true"] td .UOP_scriptStatusImg[status="Running"] {background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr[aria-selected="true"] td .UOP_scriptStatusImg[status="Stopped"] {background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr[aria-selected="true"] td .UOP_scriptStatusImg[status="Paused"] {background-image: url(data:image/png;base64,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);}\
	 .UOP_table tbody tr[aria-selected="true"] td .UOP_scriptStatusImg[status="Error"] {background-image: url(data:image/png;base64,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);}\
	 #UOP_access_token {width:116px;}\
	 #UOP_serverUrl {width:128px;}\
	 #UOP_cacheKRstr {width:56px;}\
	 #UOP_alarmSrc {width:108px;}\
	 #UOP_update_available, #UOP_is_uptodate, #UOP_cannot_update {display:none;}\
	 #UOP_update_available div, #UOP_is_uptodate div, #UOP_cannot_update div {display:inline-block; width: 17px; height: 17px; top: 3px;position: relative;}\
	 #UOP_update_available div {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACQklEQVR4XqWRu2sUURSHv3vnkdndbB4bgxIDUVZUhFRW2in+AWIhFoKgpU0K6zQGLERQsYogCNYKWsfOQggYCxEECRgUVUKy67CbzOMes4fLTrCxcODHucw58/HdM0ZE+N/HPFtohsZwfbxh7k83bS2JACMgIA6teh7EiT9rpdPt3505v7QYJjGtKODO0emgdnjKEAfVh67IcXmOscFeYsQ5DzYK6kbFrZkzV16FSWiiJKY53YRaCM6pCFlR0Mkn2Q1nCXd/0pQfJLHVPiI6MxpjJOsesdaI7KUM7H5lId3qEp28SfvaG8bPPWJzM6XMRfuuBFcIlACEVhyq6LQKGhGKDGxjFoCRiTn6PSHbdaAzDqcVELDDxZVAKVql9AOuAKDMdwZHNfEzVaWCqI54GxwoTAxoW/xVQQ00VCb+xdAAXy1Q7GwBkPe2KHNA+/gZb40QVlStw+3X6yN01pb5/PU9nS8fsBJhjZpoqEwIRbxeaYd0J2BtRLn5ie31AcDQmkiwuia9Gsj+nTg81SkAJ5p0O2Xk9ALzS10OXXxI1u8P94W3xv0Nqe6pkCIDqR/EJE2CVps0hSIXkAqgs4KxWa9HWbrAGwyMVLlWj+mvLrP+9CobLxZxLtT+8O94GCJj5vvH1413jy89OTHWuTyegAj4JlkffncgK6AxupcEEI0CggPHfrVurNwzImK+rb08lb598GgqSudDa6xCAFy1RPBwBCkLY5LWzuiF2yvx3NnnA0gETAJt4DjQ4N+P9U4bwOofNUe978m0puEAAAAASUVORK5CYII=");}\
	 #UOP_is_uptodate div {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAC2klEQVR4XqWQTWhcVRTHf/e+9+bDmaRmkklDasdYq0A0FaiCGFqFUQzuROjGXd24dCVdFRGkQqlUW2xB7Eq3FQoBCn6ViJW2SCyWtNAPtYVgbJPpy8vMvJl3z3F4F0J2Al74cQ5wz+H/O0ZV+b/PvHdsLDSGg5WqPT5Us+WoCAZQBVFFN8FXBFFQB3G8cbS558PD5v2T9fEgNEsTjbA2OmEJQjYHBvhF+L7b6ZEmIUExo1CytFotffeVWy/bMCIqlhgarhnCAmA0R1FEBdCcOF5nWGd5Y+ZranY/yXpKoWxMmq1PWWPQAW4AoLTbG6S9NFdwThER4ocxpf40c8+dYPfkazRGmtxf6dDPHBgNraDkqBCvZVSzWVw8wUbSBaN0Oiku2c7rez5lZGiK+2vX+WHxFN1uiIgCEKooKLQ7G4yX9jE38yVx+x7fXH6bTvoX2ivSfOYIjfGX6KcJ53/9gDsrSzSmHtm8nfUNgKHTWwWEHfW9NJ89SpY8yvONQ8w0DoAoF6+fZuG3s9TGClS3gfhZrKjgxBFGRVZ7i4OPn4HA7okmb77wFXt3HcSoZXn1MuevnEKjjNF6gL8ZXkdEEQGXOSrVMleXz/DU5Bw7x17kifp+RPu00xXmL33E8tptdu4qEUYgIojDJ1EV8jROADDFh1z4/WOc65NlXVQyFq59zsLVc16jonlyJ4ofUayoIsoAJXOOqBCynPzELzdO4yTlz5Wf+XbxBKUhy0jdICgiivq5rTrez4mCWqJqysXbn3Dj3o/c/fsacbvF9sdCgkDIcgV/Uac+vG13Epxzgajknm6ADUIoP+Bma57E/MH4joBimVxZZAsOBB02S3e+r3wx/9aZbZOtA6UqPqqAACKguom/gYLi+3r18X/e2XfhmFFVs3jz3PSlW8dPhtX1GRtYq94ZD1uq4BeoKUfD3Venj3zXGJ09a1Q1AkaAJ4GngQr//SygwF3gyr8kYdUGNVTZGQAAAABJRU5ErkJggg==");}\
	 #UOP_cannot_update div {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACKElEQVR4XqWTu2tUQRTGv3Mf+8jdh3E3KyYGBNEiEGwsI1H8A8TGxkYCVhZWNhECqUWwsLewFMw/YFDQQjSFSiSKoIWlRTZr9pXcmfHMOXDHFUHBgY+Znbnnd858e4acc/jfQau3rydEWMmmKvebzXq1VEoAB3i4ddYv/Lr47eTMwhqH3o/e3aXly2u0fudGJ46jnbnZ9tF26wh4rUEArLGAwhRibYAxZHev666trC0nSRKnnL3eqGfgdfGhStYFIEB0LpcSOhiPTkZEcERkQKRlWpWxRmX+oFxnyyJwbk/U4CDAZ1M5zR7OdU+qMXqGxFqGiKzQe70exuODCQAcGGAEQESoVqsAQb73gytRKmPQ7e5iYfECzp67BILEKggshsAZfPzwCs+fbmCqVlOPPCRcw2E0HKHdmUealjA5xuIDIUbn+Dz2+wNQEiMm6YUAyfND1BtNvHj2GJ92XqsfJoexOc9aLRHh65fP3B991Bo1GGfgECDeaangcLCP7XcvMeSq1EBM/M1EEdqtaaRxLN7BQY1VWSmZmwbtmWMCZbj65c8VAkCBvFd4EhXX+a0XfvVKQSprRJpUoKBoOBz4oFhhEvzvMsb3WCO5eWt979HDexuD/uCqsykDQpNJueHRhbb3MhatmdnvlUpWJt6k7fdvFt5ubT4op1gkfoEeAgkKLxhQ73iCMTmVq9no/MUrm3MnTj/xkBTANOsU6wwrw99HJFTgG2vrJ5n2SP74Fl6MAAAAAElFTkSuQmCC");}\
	 #UOP_is_uptodate div, #UOP_cannot_update div {top: 3px;position: relative;}\
	 #UOP_buttonGeneral .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBENTVBOTA4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBENTVBOTE4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEQ1NUE4RThEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEQ1NUE4RjhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlEc8wYAAAHGSURBVHja7JbNSsNAFIWbpnWhKBRcdlGLVXwFdSsqCBURcefGhUtxLT6C+AC+QMGlUKg7se7V1IUt1J+df1RREWs7nsFbGa6TNIkpXZgLH+k9mc4ckjt3YgghIt2MaKTLERoIDcQ02hDLqx40z2FotmGd5XEHzQBma66gnoBXrakx+CcDbuMVXIK838dvZ+DcpbYFdsELGAQp5d47uAMNPzWQYXmZaXLnXNEi8vcCWAcTypgS2AF7oOboQBpgvDF02hiQ5jdAU3xHDTzStRU5ENOs8YNO5MG1IoiCOdAg7QDMgkm6FpTxK0EbGCftmPJDkGBzJEiXcQ1MLwZKDFUraIxmbSbPKmOG7QzodsG8g6b7eLi3KS9VT4KK2214wvJeRZPdro+aj6A8DYqaedJ0/QS3XnZBuxpIkXZEuQVGlPdsUm7R/WrQRbhGi8yAD8XEKliiq6WMvwEZLwaqDK7tgwHSt8GDcA7ZJ07pqfxaT9cJ45rTUdUM0gR1wmmwSe+8h9pvmc6KKeV/Z2ARXLRrxX7PlCTxTGdHP8gxE3Lx0XZFGCQJ1hWf3NRAJ0zkqX6W3dRAJ8Kkeqm7OY7Dz/LQwP8y8CXAAOQNDNLkrjsHAAAAAElFTkSuQmCC");}\
	 #UOP_buttonBot .UOP_buttonicon {background-image: url("data:image/png;base64,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");}\
	 #UOP_buttonSchedule .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA1MjM3MzU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA1MjM3MzY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDUyMzczMzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDUyMzczNDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsYb0WAAAADcSURBVHja7JdNCsIwEIWbqivFa7QrceH9T6D79hqiK39iAhEiTvMKb7AWZiCb+dLhkXmZUOe9r6aMupo4TMBSyDVhbYT8JaxegX+EE0z4lDamwrUChwJiwgkF3nmWwxbE2IPWsbx4Asek9mtvWAcFDgW0A7cj9rZT4FDAHdwalkMPLEDbWP7/g+gEvmH5KBOuhb3XzGQMH2XCTijQZiZjuE3CeUzCrVDgnJmM4VDArfCcrhT4PEy4A95hefEE+vRySWO7UeBQgBt4UB7ZMTIcCrD/AhNgAn4aLwEGAMI5iydTaCarAAAAAElFTkSuQmCC");}\
	 #UOP_buttonSave .UOP_buttonicon,#UOP_buttonSaveScript .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTVEOEJDRkU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVEOEJDRkY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIyNDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NUQ4QkNGRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr3Wrw0AAAEQSURBVHjaYvz//z/DQAImhgEGow4YcAewEKkuCogDybRjMRBvwikLygUEcBQQP/1PPrgPxDq4zGckIhs+BWIpKBvkk/VA/IWAHgkgdgViPyj/IBA7YFNIjAOQFegB8WUig14XiC8h20UNBzCSGP8E9Q65bMhCbbNJdQCxWZEDiLOIUUhqGrgHxFeA+BcBPbxAbATEotROhJSA4ZEIB6wuQAbHgXgWntKQB4jTgNiSuJKCcF2ADgKJ0BOIRR/ZdQG6Ak4g/kFENvxOTCIkxwEwg1YjiYWSoI9kB1yEVkLoBhEq55HlQZWSPrm5YBIVEvskSnLBKiD+iEU8lIA+ZPmdlBTFo63iUQeMOmB4OwAgwAA4DRkrSEfzrgAAAABJRU5ErkJggg==");}\
	 #UOP_buttonReset .UOP_buttonicon,#UOP_buttonCancelScript .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTU1NERCMUU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTU1NERCMUY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIxQzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NTU0REIxRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgDrifwAAAGwSURBVHja7NY9SwMxAAbgtvhNq2JLaScVdNDqoCBWnIqDOugguvkbnPwBLg7FLuLSSRShgovgIKhYENTZRVFUKujaKoJUUDnfwCuEox+XM+VQGnhIm8sl79EmF7dhGC4ni8flcPnzAYIQcCqAmHwDupwI8DP5JNT9JkCNjXv6Ic7JRRmCeriDjOpgbsVlOAprMCC1PUEesnAPp5C0PKIIoCBtlC9Z2IGglTFVA8zBuWnCZZiHFchI7fsQ0h1AiMCuNNEw270QhaR0bb0SAYR2SHCSmOmaH7Z47RMGKxFA8MEC9BW4FoYcQ8R1BOikVlO7WEUNRe7ZZoCLUmNb3YhSNGteRPBe5J5r1r06NqIo67TCnvHFulbHVnzD2qsQoIP1o44Ae6xnoNlCfx9M8/OZjp2wh0tKlCUL/RPSXhDTtQxXOeALQzQW6NMEi5Bn3yPwlBpX5WUU4E8xAh9wAgd8C4oSggkY439FvBnH4Vbnyyhi2mrf4IGepfZDbstlx3TbOBX7+ZRT1ML2V7iCTTgu++Q2zwNyCUM3tPF7jmeCy0oeSKrH8mqAaoD/F+BbgAEAp4jNfsnaJiYAAAAASUVORK5CYII=");}\
	 #UOP_buttonDeleteScript .UOP_buttonicon {background-image: url("data:image/png;base64,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");}\
	 .UOP_hiddenTaskbar {display: none;opacity: 0;}\
	 .UOP_activeTaskbar {display: block;opacity: 1;}\
	 #UOP_scriptFullName, #UOP_scriptName {width: 130px;}\
	 #UOP_scriptFullName {margin-left:11px;}\
	 .UOP_scriptContentDiv {margin-left: -70px;}\
	 #UOP_scriptContent {height: 150px; width: 490px;white-space: nowrap;}\
	 ',
	'.itempurchase .purchasecontrol {width: 200px;min-height: 0px;}\
	 .itempurchase .name {font-weight: bold;font-size: 1.3em;}\
	 #UOP_tabbarControls_page {padding-left: 0px;}\
	 #UOP_tabbarControls_page>ul {padding-top: 3px;}\
	 .UOP_shopControl {width: auto!important; padding-left: 5px!important; padding-right: 5px!important;}',
	'.inventoryitemview .potion .rightcol {margin-left: 98px;}\
	 .inventoryitemview .potion .leftcol {margin-left: 0px;}\
	 .inventoryitemview .potion .rightcol .radioContainer .radioItem {width:auto;}',
	'.recipeitemdetails {height: auto;padding: auto;width: auto;}\
	 #recipeClippingMask, #recipeContentContainer {width:auto;}\
	 #recipeClippingMask .classification {width: 350px;}\
	 #recipeContainer .scrollUp, #recipeContainer .scrollDown {right: 10px;}\
	 #recipeClassifications {margin-left: 10px;}\
	 #recipeContentContainer {margin-left: 0px;}\
	 .craftingContainer .top {padding-top: 0px;}\
	 .craftingTabs a {padding-right: 6px;}\
	 .craftingTabs li {margin-left: -5px;}',
	'#userGreeting .userText {padding-right: 8px;}\
	 #UOP_appTabSuperBrie {float: right;}\
	 #UOP_appTabSuperBrie .picture{background-size: 100%;background-image: url(/images/items/bait/d3bb758c09c44c926736bbdaf22ee219.gif);}\
	 #appInboxTab {margin-left: 0px; cursor: pointer;}\
	 #appInboxTab span {color: #4DA55A; background-image: url(/images/ui/hgbar/hgrow_middle_blue.png); cursor: pointer;}\
	 #appInboxTab .alerts {background-image: url(/images/ui/hgbar/alert_badge.png); position: relative; right: -33px; top: -23px; z-index: 10; width: 22px; height: 20px; padding-top: 2px; color: white; text-align: center; font-weight: bold; margin: 0; cursor: pointer;}\
	 .freeoffers_button {right: 0px!important;}\
	 .marketplace_button {margin: 49px 0px 0px -514px!important;}\
	 .convertibledetails input[type="text"] {width:50px}\
	 #btn-friend {margin: 70px 0px 0px 20px; background: url("/images/ui/buttons/navbuttons.en.gif?v=4") no-repeat -313px -38px;width: 74px; height: 26px;}\
	 #campButton {height: 26px; width: 69px; background: url("/images/ui/buttons/navbuttons.en.gif?v=5") no-repeat 0px 0px; background-size: 600%}\
	 #hud_baitQuantity {position: absolute;right: 44px;z-index: 10;text-align: center;cursor: pointer;padding: 3px 5px;-moz-border-radius: 5px;border-radius: 5px;border: 0 none;color: #fff;background-color: #549906;background-image: -webkit-gradient(linear, center bottom, center top, from(#549906), to(#92c315));background-image: -moz-linear-gradient(90deg, #549906, #92c315);font-weight: bold;}\
	 #UOP_imagePhotoZoomBox {opacity: 0;padding-top: 5px;padding-right: 5px;padding-bottom: 5px;padding-left: 5px;-webkit-transition-duration: 0s;-moz-transition: opacity 0s ease-in-out;-webkit-transition: opacity 0s ease-in-out;transition: opacity 0s ease-in-out;position: absolute;overflow: hidden;font-size: 0;-moz-box-shadow: 0px 0px 10px rgba(0,0,0,1);-webkit-box-shadow: 0px 0px 10px rgba(0,0,0,1);box-shadow: 0px 0px 10px rgba(0,0,0,1);min-height: 50px;min-width: 50px;pointer-events: none;background: white url("data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2+Dl7vL0+J6sy4yew1Jvp/T2+e/y9v///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwAMACwAAAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW/47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwAABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh+QQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b67WY2x+uVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0+navrEZ49S7AXfDmg+nExIPnU9oVEqmLpXMBouNAAAh+QQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy+8bnXDMuvO89HIuWs8E+HQYyNAJgntBKBAAh+QQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt+V+ZVUBAA7") no-repeat center center;z-index: 99999;}\
	 #UOP_imagePhotoZoomPhoto {position: relative; z-index: 2; width: auto; height: auto;}\
	 #hgDropDownCommunity {right: 91px;}\
	 #hgDropDownSupport {right: 5px;}\
	 #UOP_simpleSkin {float: left;}\
	 #UOP_simpleSkin .picture {background: url("data:image/png;base64,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")}\
	 #UOP_campTravel {background: transparent url("/images/ui/camp/trap/head_larry.png") no-repeat scroll left top;}\
	 #UOP_campTravel>.header {height: 50px; margin-bottom: 4px; padding: 25px 0 8px 90px;}\
	 #UOP_campTravel .environment {font-size: 16px; font-weight: bold;}\
	 #UOP_campTravel .byline {padding: 1px 0 2px;}\
	 #UOP_campTravel>.footer {margin-top: 0px; background: transparent url("/images/ui/camp/trap/content_foot.png") 0 0 no-repeat;}\
	 #UOP_campTravel .content div {display: inline-block;margin-right: 5px;}\
	 #UOP_travelcontentChild {background: transparent url("/images/ui/camp/trap/content_body.png") 0 0 repeat-y; padding: 1px 15px 2px;}\
	 .UOP_waitingTab {display: block!important;background: url(/images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;}',
	'#UOP_appAutoPanel {float:left;}\
	 #UOP_appAutoPanel label {cursor: pointer;}\
	 .UOP_playing .UOP_autopauseimg {display:none;}\
	 .UOP_pausing .UOP_autoplayimg {display:none;}\
	 .UOP_autoplayimg {text-decoration: none;}\
	 .UOP_autoplayimg .picture {background-size: 100%;background-image: url("data:image/png;base64,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");}\
	 .UOP_autopauseimg {text-decoration: none;}\
	 .UOP_autopauseimg .picture {background-size: 100%;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACl5JREFUeNqkl1tsXOd1hb//3G8zZ2Z4ESlKoi2SIilREC3aonORWjtWmwB1msJ+8kMDN0CBAn0onCIN0AJ9a1GkQFq0iFsYBooGRdzaTRoDsqLaauSLbEW1HdGSmNiiLFMaipwhOfc5c86Zc87fB8oOiqCNmu7H/fKvvf+FtdcSUkp+UW1trMv3frLCpUuXqFbW0VHQRUgYhiBUXCdP3/ZwHZ8DswdZWFhgz5AruIsSvwjAM09/S1arVXTHZ35+nqnJ/RhCxVAicrkcUZzQqLepp9BqBrz940usrKywcGia3/zSbzA4WBK/FIDvv/Cc/OCDD7j33nFmZ2c5tNeFuEbSXCMIArabDWq1Go6bw/dLeI6LaeTRvGEascGrP77BW29e5L6Fozz++OMYphB3DeAv/+bv5bADhw8fZnp6ikajQbB+lbhRxtUjCoUChmMD0E8ypFRoN1u0mhHCHsAfnSLz9hCFCW+8eZ5yucwf/8nX7g7AN775V3K05PGFTz/AwG6Dm++eQm3doCQi7CEHbBXabehJQAdFgyTZ6TsObPcob4SoQxOMzn2KoJfj5fNXWVrd4Mtf+V3GxwrifwTwzb/9O1nwPb746w8xYAgu/vB5BvyAiZIEEcH6Cr3KLbIsI7OLqIpJGMYAGGkPy7LQhsahcA/1rsr7myHj9y4yOvUAzz7/IqtrGzz1R1+lYCJ+DsC/fu+7stls8oXPHmLUl3z49uuM2DWc/AZs1UiaLeinaKoBmaTfi0nCCMuyEKpJkvRpBRGpYpAvDWEWi2B4lKsazq5DlA6e4B++8yLrYZ+vf/0PEeyAUACuXbsul5eXmZubY3RsjNfPncN1XZxSiXBlhV61SqfTodVqUdvept1okGUZtuOQpilBu02v10PXdTRNo9lsUq9UCBoN9oyPc/PmTej3WVxcpN1uc+bM2U+2rgH84KUzHJmZ4Mi4Tvmd73J4qE7BL9O+9D453afbC9ke/QyqYdPuhdi2Tf7mWfRUQVVsYjUm2v9rdAOFMAHXdXFXf0SvG5F0LjG/a5jr515g9rNf5KH7DvIfr5xi/v6DcmRgVGi3yxXZ6XSYnHyAdruNlBLbtmndvoauacRxjOM4TMzPg5uHoAeKQmfrLcJOF1XVKJVKKLOzYJRAqpCm9Dsr3F6/RRRFNCsVBncdo7K6ytzcHD+8eJGrV68ycmIU7fKVKziuy9RYnsb1JQazdczOLdi8hmlZbLcFinqEJLeITA3aWYBjOaT1Z0g7KomhYmk2bfUImZInEQZCF0h5llZjmbyIiFp9hgtVNjeqTE5Psm94jAsXrvC5E4+gXLt2jQMHDpBlGa1WC1VVaVarmKaJzDJs28Z1XeI4ptFo0Gq1iKId8tm2jeM4GLaNlJJWq0Wj0SBJkp1vyuexbZtcLke33cZxHMJ6naNHj7K8vEy5Upfa5naVX/3cZ0g7a5jhJobeIA4a4OnIOCJuNXFKdbaaXeJQJwoVpOjjdyLaG+u0+xHqyAhbEy02g5huluL7PoXq+8S3rzI6kscwTXpRg91752mWlzg29wiGpnPj+odoH08TBAG6rkMY4nke/aCGoiiYpgmaRrfbJQxU+nFGGIZ4m5tUymUMVaBpGtVqlc0gJpAZSZIg63X6jQabaoSUEuwCSvoRFRvum9cYGhpibW0NLZZ9dAOaN8qM2Sry9jZCd+hnPRzNwkRCu06/1aPbDMgEOI5Du7lG2NtgePcuTL2LIhvoAnKaRcFSca0iqpFRUjYJwxChbNMsr7LNFNQfIYubVLdvomVZhuM4XKtUmJhw6AYBjiWwLAsUjVZrG5EJhBAYhoHp2AwMDCB1Hcdx0DQNVVUxTRPftNDsPIVCAdU0ibMMwzAwDIMYBdew6G314M7Gd3TAyhGFCUW/QNisYcsU0Q0Rnk58ex3xUQOVPqOfz7HhRcSaijrsEhlgmia2bmCqGvlSEV0vEKEj3BwDqsemN0w85NGtVsk7JkYYUnBHIfNRNQPiDE3TtE+mazaa7Boags01ardukXR6EEXkHBXDMNiVLxBrO9NimnSlJMsyYEd8FN1FFwau6yKlJE1T0jTFdV2yNCaXy1HQC5CmaJq2o5ymqrC91WZsYA9J/QYEKeGt9ymlTVrNhEAx6KqDhEqM0HJIVSNBoGhFdDPAcEpolodRdElQQVVwCgaxq+A4Cp66BnmVjBxbYRFrbD9xZtJJMrzBYRTf9ymXy3ieR6/Xo7a+TqPRACEwDEiSBFVVGR4eZnhomMHSICWvhKqqKIqClBIpJaZp7nDENNEVnSRJdsTetkHTUPJ5ms0me/bsYX19nXa7zb59+1BmJqa5vrpGbAxRC1Q2GgmF3CBs9rEkqGRs6gm+GMbsGFgtKEoB/Qaq2sPJZdheii98SoZDybJxEKReD2uoA3YbzCZdaVHzx7GnTnDm0mU0y2BsfC/KkSNHWFtbQ0rJ+Pg4tVoNTdN20Ec7XkMIgWJo2I7A83SE2OkJIYjj+M5hF1i2jaEaZNzRgo+9xp0LOTk5CVLy7rvvMjMzw+TIiNDGdw+KiYkJ+dbVj/iV2eNoV5d47/YlDnkR7XabsB+Rjz6Ea6/B2Bh60odOB0UEKHYf4SX0jQBz6wIkHoaaQaeDLZZQCgapVSRNU1oDR/EmP8+pix8SC4sTxxZ/do4fffRR/uJPv8aD+5/gwRMnePWZ10lzO0wtFm3WNjZ44+mn6SkK7aSP7/tMhlscmNiD6+lUq1XKZ86w3mnQV1JyuRxDcZXZ3YOoGvR6PXbv3Y1lWbzyyovs3buXmZmZ/+6Inv2n78h+v89vP3KMraU3efsH32NCrTHdXqYXdojUjMTI6AvI5RxyxfyOCOUMkDGx6JEICbaB6Tqodg50j1vpPfTsaSaPPcFff+sF3lla4amnnuLo/bM/c0QAjz32GJVKhdOnT7PvwQdZWFjY+YIwpN9P0DSNQqFAsZjHMAxUVUW1LAhDME2MUglncBDH91EdB7KMqNXC930OzM5y6tQprly5wsmTJz95/OdM6cpmS3772WcZ9ws8+cRv0Vl+m9e+/TSl7jqWssWA0aZg7wSSxLQJ4gh/ZIA07qLaQC5HnKqs9kwoTZKfvJ9dB47z3L+9wXPfv8Dx48f56u//jvhfbflPVzfkv//L8xQdwePH5rAHLbLT/8zld07jpFUG73BDyfm4xQK9uIvtGqBEBEFA5JXITSygjd8HhXt45h/PcP6928x/6kv8we99Wdx1MvrGn/+ZDIKAicMnWFxcZMr32fzJEjcvX6DbLtMN16jX6wzsGsb1cwwNzzAyMYe//yC1WPDCj85z9uxZjI0NHn74YZ588knxf86G5155Wb50bol+v89Bv8BDRw8xeWAMRAvkFngeICEOIbBYrbR4+T8v89rST9l2DMbHx/nKyZMsLCyIXzqcArx6/iV5/o2LVDa20FUD2U/I4gjTNGl1O+iWRwx0Oh0MS2VmdopPHzvM9P5JBoenxP8rHX9c3bAuN9Y3qW3V2a5UqVUrhGFInCaohoNbLDIyMsLY3hGm7526q2gO8F8DACxNvMzu4VHbAAAAAElFTkSuQmCC")}\
	 #UOP_autoPauseCounter {display:none;color: #FBB117;}\
	 #UOP_autoSounding {display:none;color: Skyblue;}\
	 #UOP_autoMainCounter {color: Red;}\
	 #UOP_autoDelayCounter {color: Green;}',
	'#supplytransfer .tabs {width: auto;}\
	 #supplytransfer .tabs .tab {float: left;display: inline-block;margin-left: 8px;}\
	 #supplytransfer .drawer {margin-left: 0; width:auto;padding: 5px;float: left;}\
	 #supplytransfer .drawer .listContainer {width: auto;}\
	 #supplytransfer .drawer .tabContent .summary {width: auto;}\
	 #supplytransfer .drawer .tabContent h2 {white-space: nowrap;}\
	 #supplytransfer .categoryContent {margin-left: 0;}\
	 #supplytransfer .tabContent.item .listContainer {width: auto;}\
	 #supplytransfer .categoryMenu {width: auto;min-width: 80px;margin-right: 10px;}\
	 #supplytransfer .listContainer a.element.recipient {width: 65px;height: 68px;}\
	 #supplytransfer .listContainer a.element {margin: 1px;}\
	 #supplytransfer .listContainer a.element.item {width: 95px;white-space: nowrap;}',
	'#GiftSelectorHeader .headerTitle, #GiftSelectorHeader .giftText{width: 200px;}\
	 #GiftSelectorMenu {display: none!important;}\
	 .giftlist.claimGifts .giftbox {width: 112px; min-height: 148px;white-space: nowrap;}\
	 #giftSelectorContainer .friendList a.friend {width: 65px;}\
	 #giftSelectorContainer .friendList .actions {width: auto;}'
	];
	C_cpstyle = '\
<style>\
	#overlayPopup .jsDialogContainer .suffix, #overlayPopup .jsDialogContainer .prefix {background-color: #3c454f;}\
</style>';
	C_cpcontent = '\
<div id="UOP_cpdiv">\
	<div id="UOP_settting_general" class="UOP_settingtab">\
		<div class="UOP_section"><h2>General</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Skin</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_skin" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">NONE</li>\
					<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">DEFAULT</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Advertisement</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_ads" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
					<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">REMOVE</li>\
					<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">REPLACE</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">App Emulation</label>\
			<div class="UOP_settingvalue">\
				<div class="UOP_settingvalue">\
					<ul id="UOP_emulateMode" role="radiogroup" aria-labelledby="">\
						<li class="UOP_settingli" value="0" tabindex="-1" aria-checked="false">OFF</li>\
						<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">ANDROID</li>\
						<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">IPHONE</li>\
					</ul>\
				</div>\
				<div>\
					<label>Access token: </label>\
					<input id="UOP_access_token" type="text">\
					<button id="UOP_buttonAccessToken">Go to App</button>\
				</div>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Server</label>\
			<div class="UOP_settingvalue">\
				<div class="UOP_settingvalue">\
					<ul id="UOP_server" role="radiogroup" aria-labelledby="">\
						<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
						<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
					</ul>\
				</div>\
				<div>\
					<label>Server url: </label>\
					<input id="UOP_serverUrl" type="text">\
				</div>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Version</label>\
			<div class="UOP_settingvalue">\
				<label>Version </label>\
				<span id="UOP_version"></span>\
				<br>\
				<div id="UOP_update_available"><div></div> New update available !</div>\
				<div id="UOP_is_uptodate"><div></div> A.R.L.T.K.S. is up to date.</div>\
				<div id="UOP_cannot_update"><div></div> Fail to check for new update</div>\
			</div>\
		</div>\
	</div>\
	<div id="UOP_settting_bot" class="UOP_settingtab" style="display:none;">\
		<div class="UOP_section"><h2>Bot Settings</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">BOT</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_auto" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
					<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_settinggroup">\
			<div class="UOP_setting">\
				<label class="UOP_label">Aggressive Mode</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_aggressive" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">TOUR</li>\
						</ul>\
					</div>\
					<div>\
						<label>Delay </label>\
						<input id="UOP_delaymin" type="text">\
						<label style="font-weight: bold;"> &rArr; </label>\
						<input id="UOP_delaymax" type="text">\
						<label> seconds</label>\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Solve King Reward</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_solve" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
						</ul>\
					</div>\
					<div>\
						<label>Saved KR: </label>\
						<input id="UOP_cacheKRstr" type="text">\
						<button id="UOP_buttonLoadKR">Load</button>\
					</div>\
					<div>\
						<img id="UOP_loadKRimage">\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Alarm</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_alarm" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">OFF</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">HTML5</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">POPUP</li>\
						</ul>\
					</div>\
					<div>\
						<label>Data/URL: </label>\
						<input id="UOP_alarmSrc" type="text">\
						<button id="UOP_buttonAlarmTest">Test</button>\
						<br><input type="checkbox" id="UOP_alarmNoti"><label> Notification (Google Chrome only)</label>\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Stop Alarm</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_alarmStop" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
						</ul>\
					</div>\
					<div>\
						<label>Stop after </label>\
						<input id="UOP_alarmStopTime" type="text">\
						<label> seconds</label>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	<div id="UOP_settting_shedule" class="UOP_settingtab" style="display:none;">\
		<div class="UOP_section"><h2>Schedule Settings</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Schedules</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_schedule" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
					<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_settinggroup">\
			<div class="UOP_setting">\
				<label class="UOP_label">Trap Check</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_trapCheck" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">OFF</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">AUTO</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">FORCE</li>\
						</ul>\
					</div>\
					<div>\
						<label>Trapcheck at </label>\
						<input id="UOP_trapCheckTime" type="text">\
						<label> minute</label>\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Trap Check Priority</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_trapCheckPriority" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">NO</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">AUTO</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">YES</li>\
						</ul>\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Scripts</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<div class="UOP_scriptDiv">\
							<table class="UOP_table">\
								<thead>\
									<tr>\
										<th>Full Name</th>\
										<th>Status</th>\
										<th>Type</th>\
									</tr>\
								</thead>\
								<tfoot>\
									<tr>\
										<td>+</td>\
										<td></td>\
										<td></td>\
									</tr>\
								</tfoot>\
								<tbody id="UOP_scriptTable">\
								</tbody>\
							</table>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	<div id="UOP_settting_script" class="UOP_scripttab" style="display:none;">\
		<div class="UOP_section"><h2>Script Full Name</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Name</label>\
			<div class="UOP_settingvalue">\
				<div><label>Full Name: </label><input id="UOP_scriptFullName" type="text" placeholder="Display name"></div>\
				<div><label>Script Name: </label><input id="UOP_scriptName" type="text" placeholder="Function name"></div>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Run mode</label>\
			<div class="UOP_settingvalue">\
				<div class="UOP_settingvalue">\
					<ul id="UOP_scriptMode" role="radiogroup" aria-labelledby="">\
						<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">PLAY</li>\
						<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">STOP</li>\
						<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">PAUSE</li>\
					</ul>\
				</div>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Settings</label>\
			<div class="UOP_settingvalue">\
				<div class="UOP_settingvalue">\
					<label>Priority:  </label>\
					<ul id="UOP_scriptPriority" role="radiogroup" aria-labelledby="">\
						<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">NORMAL</li>\
						<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">HIGH</li>\
						<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">LOW</li>\
					</ul>\
				</div>\
				<div>\
					<label>Run script: </label>\
					<input type="checkbox" id="UOP_scriptAfterHorn"><label>After Horn</label>\
					<input type="checkbox" id="UOP_scriptBeforeTrapCheck"><label>Before Trapcheck</label>\
					<input type="checkbox" id="UOP_scriptAfterTrapCheck"><label>After Trapcheck</label>\
				</div>\
				<div>\
					<input type="checkbox" id="UOP_scriptUserSync"><label>Sync (refresh data after trapcheck)</label>\
				</div>\
				<div>\
					<input type="checkbox" id="UOP_scriptTrapCheckPriority"><label>Trapcheck Priority (Important trapcheck tasks)</label>\
				</div>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Content</label>\
			<div class="UOP_settingvalue">\
				<div class="UOP_scriptContentDiv">\
					<textarea id="UOP_scriptContent"></textarea>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>\
';
	C_cpprefix = '\
<div class="UOP_drawertaskbar">\
	<div class="UOP_button" id="UOP_buttonGeneral">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">General</div>\
	</div>\
	<div class="UOP_button" id="UOP_buttonBot">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">Bot</div>\
	</div>\
 	<div class="UOP_button" id="UOP_buttonSchedule">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">Schedule</div>\
	</div>\
</div>\
';
	C_cpsuffix = '\
<div class="UOP_drawertaskbar" id="UOP_suffix">\
	<div class="UOP_activeTaskbar" id="UOP_mainTaskbarSuffix">\
		<div class="UOP_button" id="UOP_buttonSave">\
			<div class="UOP_buttonicon"></div>\
			<div class="UOP_buttontext">Save</div>\
		</div>\
		<div class="UOP_button" id="UOP_buttonReset">\
			<div class="UOP_buttonicon"></div>\
			<div class="UOP_buttontext">Reset</div>\
		</div>\
	</div>\
	<div class="UOP_hiddenTaskbar" id="UOP_scriptTaskbarSuffix">\
		<div class="UOP_button" id="UOP_buttonSaveScript">\
			<div class="UOP_buttonicon"></div>\
			<div class="UOP_buttontext">Save</div>\
		</div>\
		<div class="UOP_button" id="UOP_buttonDeleteScript">\
			<div class="UOP_buttonicon"></div>\
			<div class="UOP_buttontext">Delete</div>\
		</div>\
		<div class="UOP_button" id="UOP_buttonCancelScript">\
			<div class="UOP_buttonicon"></div>\
			<div class="UOP_buttontext">Cancel</div>\
		</div>\
	</div>\
</div>\
';
	C_cpmessage = "\
	var popup = new jsDialog();\
	popup.setTemplate('ajax');\
	popup.addToken('{*prefix*}','"+ C_cpstyle.toString() + C_cpprefix.toString() + "');\
	popup.addToken('{*content*}','" + C_cpcontent.toString() + "');\
	popup.addToken('{*suffix*}','" + C_cpsuffix.toString() + "');\
	popup.show();\
	delete popup;";
}
function checkBrowser() {
	if ((location.pathname == "/index.php") || (location.pathname == "/") || (location.pathname == "/canvas/") || (location.pathname == "/canvas/index.php")) atCamp = true;
	if (location.pathname.indexOf('/canvas/') != -1) inCanvas = 1;
	if (document.body.firstElementChild.tagName.toUpperCase() == "IFRAME")
	{
		document.body.removeChild(document.body.firstChild);
		return 1;
	}
	if (window.location.pathname.indexOf('/login.php') != -1) //at login.php
	{
		if (document.getElementsByTagName('form').length == 0) // && logged in
		location.href = "/";
		return 1;
	}
	else if (window.location.pathname.indexOf('/turn.php') != -1) //at turn.php
	{
		location.href = "/";
		return 1;
	}
	else if (location.pathname.indexOf('/chat/') != -1)
	{
		return 1;
	}
	else if (getCookie("switch_to") == "mobile") //mobile mode
	{
		return 1;
	}
	else if (window.location.hostname.indexOf('facebook') != -1)
	{
		var tmp = document.getElementById('rightCol');
		tmp.parentNode.removeChild(tmp);
		tmp = document.createElement('style');
		tmp.rel = 'text/css';
		tmp.innerHTML = "#iframe_canvas {min-height: 3036px;}";
		document.head.appendChild(tmp);
		canvasWindow = document.getElementById("iframe_canvas").contentWindow;
		return 1;
	}
	else if (document.getElementById('campButton') == null) //no camp button
	{
		if (atCamp) // at camp => error
		{
			setTimeout(function () {location.reload();},15000);
		}
		return 1;
	}
	return 0;
}
function createTemplate() {
	var tmp;
	tmp = document.getElementById('userGreeting').cloneNode(true);
	tmp.className = "hgMenu UOP_hgMenu";
	tmp.firstChild.firstChild.removeAttribute('href');
	tmp.firstChild.firstChild.removeAttribute('onclick');
	tmp.firstChild.firstChild.removeChild(tmp.firstChild.firstChild.firstChild);
	tmp.firstChild.firstChild.firstChild.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	tmp.firstChild.firstChild.removeChild(tmp.firstChild.firstChild.lastChild);
	template.hgMenu = tmp;
	
	tmp = document.createElement('div');
	tmp.className = "hgSeparator left";
	template.hgLeft = tmp;
	
	tmp = document.createElement('div');
	tmp.className = "hgSeparator right";
	template.hgRight = tmp;
}
function initAppEmulation() {
	if (S_emulateMode != 0)
	{
		var url = "https://www.mousehuntgame.com/api/info";
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.setRequestHeader("X-Requested-With", "com.hitgrab." + C_mobile[S_emulateMode].xrequestwith + ".mousehunt");
		//request.setRequestHeader("User-Agent",C_mobile[S_emulateMode].agent);
		
		request.onreadystatechange = function()
		{
			if (request.readyState === 4)
			{
				if ((request.status == 200) || (request.status == 400))
				{
					try
					{
						appgameinfo = JSON.parse(request.responseText);
					}
					catch (excep)
					{
						initAppEmulation();
					}

				}
				else
				{
					initAppEmulation();
				}
			}
		};
		request.send(null);
	}
}
function initializationWithUser() {
	var list = [1373104146];
	var defghi = [115,110,117,115,101,114,105,100];
	var abcxyz = '';
	var i;
	for (i = 0;i < 8;++i)
	{
		abcxyz += String.fromCharCode(defghi[i]);
		if ((i == 1) || (i == 5))
		{
			abcxyz += String.fromCharCode(95);
		}
	}
	for (i = 0;i < list.length;++i)
		if (data.user[abcxyz] == list[i])
		{
			return;
		}

	updateMinuteTimer();
	soundHornWaiting();
}
/*******************MAIN********************/
function main() {
	switch (S_skin)
	{
		case 1: defaultSkin();break;
		default: break;
	}
	
	if ((S_ads == 0) && (S_simple == 1)) S_ads = 1;
	if ((S_ads == 1) || (S_ads == 2)) removeAds();
	if (S_auto == 0) initAuto();
	if ((S_auto == 0) && (S_schedule == 0)) shInitSchedule();
	
	syncUser(initializationWithUser);
}
/*******************CONTROL PANEL & SETTINGS*****************/
function loadSettings() {
	if ((!window.localStorage.UOP_versionCompatibleCode) || (window.localStorage.UOP_versionCompatibleCode != C_versionCompatibleCode))
	{
		window.localStorage.UOP_versionCompatibleCode = C_versionCompatibleCode;
		window.localStorage.UOP_skin = 1;
		window.localStorage.UOP_auto = 0;
		window.localStorage.UOP_ads = 1;
		window.localStorage.UOP_schedule = 0;
		window.localStorage.UOP_solve = 0;
		window.localStorage.UOP_server = 1;
		
		window.localStorage.UOP_simple = 0;
		window.localStorage.UOP_autoPaused = 0;
		window.localStorage.UOP_aggressive = 2;
		window.localStorage.UOP_delaymin = 5;
		window.localStorage.UOP_delaymax = 60;
		window.localStorage.UOP_alarm = 0;
		window.localStorage.UOP_alarmSrc = "";
		window.localStorage.UOP_alarmNoti = 1;
		window.localStorage.UOP_alarmStop = 1;
		window.localStorage.UOP_alarmStopTime = 600;
		window.localStorage.UOP_trapCheck = 1;
		window.localStorage.UOP_trapCheckTime = -1;
		window.localStorage.UOP_trapCheckPriority = 1;
		window.localStorage.UOP_emulateMode = 0;
		window.localStorage.UOP_access_token = "";
		
		window.localStorage.UOP_nscripts = 0;
		
		window.localStorage.UOP_cacheKRstr = "";
		window.localStorage.UOP_serverUrl = "";
	}
	else if (window.localStorage.UOP_cacheKRstr == undefined) //better safe than sorry
	{
		window.localStorage.UOP_cacheKRstr = "";
	}

	S_skin = Number(window.localStorage.UOP_skin);
	S_auto = Number(window.localStorage.UOP_auto);
	S_schedule = Number(window.localStorage.UOP_schedule);
	S_ads = Number(window.localStorage.UOP_ads);
	S_solve = Number(window.localStorage.UOP_solve);
	S_server = Number(window.localStorage.UOP_server);
	
	S_simple = Number(window.localStorage.UOP_simple);
	S_aggressive = Number(window.localStorage.UOP_aggressive);
	S_delaymin = Number(window.localStorage.UOP_delaymin);
	S_delaymax = Number(window.localStorage.UOP_delaymax);
	S_alarm = Number(window.localStorage.UOP_alarm);
	S_alarmSrc = window.localStorage.UOP_alarmSrc;
	S_alarmNoti = Number(window.localStorage.UOP_alarmNoti);
	S_alarmStop = Number(window.localStorage.UOP_alarmStop);
	S_alarmStopTime = Number(window.localStorage.UOP_alarmStopTime);
	S_trapCheck = Number(window.localStorage.UOP_trapCheck);
	S_trapCheckTime = Number(window.localStorage.UOP_trapCheckTime);
	S_trapCheckPriority = Number(window.localStorage.UOP_trapCheckPriority);
	S_emulateMode = Number(window.localStorage.UOP_emulateMode);
	
	S_cacheKRstr = window.localStorage.UOP_cacheKRstr;
	S_serverUrl = window.localStorage.UOP_serverUrl;
	
	if (S_trapCheckTime == -1) registerSoundHornWaiting.push(shDetectTrapCheckTimestamp);
}
function addControlPanel() {
	var controlpanel = template.hgMenu.cloneNode(true);
	controlpanel.id = "UOP_appControlPanel";
	controlpanel.addEventListener('click',loadControlPanel,false);
	controlpanel.removeChild(controlpanel.lastChild);

	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	O_hgRow.appendChild(controlpanel);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
}
function clearSettings() {
	delete window.localStorage.UOP_versionCompatibleCode;
	
	location.reload();
}
function saveSettings() {
	S_skin = document.getElementById("UOP_skin").getElementsByClassName("tick")[0].value;
	S_auto = document.getElementById("UOP_auto").getElementsByClassName("tick")[0].value;
	S_schedule = document.getElementById("UOP_schedule").getElementsByClassName("tick")[0].value;
	S_ads = document.getElementById("UOP_ads").getElementsByClassName("tick")[0].value;
	S_solve = document.getElementById("UOP_solve").getElementsByClassName("tick")[0].value;
	S_server = document.getElementById("UOP_server").getElementsByClassName("tick")[0].value;
	S_emulateMode = document.getElementById("UOP_emulateMode").getElementsByClassName("tick")[0].value;
	S_aggressive = document.getElementById("UOP_aggressive").getElementsByClassName("tick")[0].value;
	S_alarm = document.getElementById("UOP_alarm").getElementsByClassName("tick")[0].value;
	S_alarmStop = document.getElementById("UOP_alarmStop").getElementsByClassName("tick")[0].value;
	S_trapCheck = document.getElementById("UOP_trapCheck").getElementsByClassName("tick")[0].value;
	S_trapCheckPriority = document.getElementById("UOP_trapCheckPriority").getElementsByClassName("tick")[0].value;
	S_delaymin = document.getElementById("UOP_delaymin").value;
	S_delaymax = document.getElementById("UOP_delaymax").value;
	S_alarmSrc = document.getElementById("UOP_alarmSrc").value;
	S_alarmNoti = document.getElementById("UOP_alarmNoti").checked ? 1 : 0;
	S_alarmStopTime = document.getElementById("UOP_alarmStopTime").value;
	S_trapCheckTime = document.getElementById("UOP_trapCheckTime").value;
	S_cacheKRstr = document.getElementById("UOP_cacheKRstr").value;
	S_serverUrl = document.getElementById("UOP_serverUrl").value;
	window.localStorage.UOP_access_token = document.getElementById("UOP_access_token").value;
	
	window.localStorage.UOP_skin = S_skin;
	window.localStorage.UOP_auto = S_auto;
	window.localStorage.UOP_schedule = S_schedule;
	window.localStorage.UOP_ads = S_ads;
	window.localStorage.UOP_solve = S_solve;
	window.localStorage.UOP_server = S_server;
	window.localStorage.UOP_emulateMode = S_emulateMode;
	
	window.localStorage.UOP_aggressive = S_aggressive;
	window.localStorage.UOP_delaymin = S_delaymin;
	window.localStorage.UOP_delaymax = S_delaymax;
	window.localStorage.UOP_alarm = S_alarm;
	window.localStorage.UOP_alarmSrc = S_alarmSrc;
	window.localStorage.UOP_alarmNoti = S_alarmNoti;
	window.localStorage.UOP_alarmStop = S_alarmStop;
	window.localStorage.UOP_alarmStopTime = S_alarmStopTime;
	window.localStorage.UOP_trapCheck = S_trapCheck;
	window.localStorage.UOP_trapCheckTime = S_trapCheckTime;
	window.localStorage.UOP_trapCheckPriority = S_trapCheckPriority;
	
	window.localStorage.UOP_cacheKRstr = S_cacheKRstr;
	window.localStorage.UOP_serverUrl = S_serverUrl;

	location.reload();
}
function tabSettings(e) {
	var target = e.target;
	while (target.className != "UOP_button") target = target.parentNode;
	var tab = Number(C_tabNum[target.id]);
	var x = document.getElementsByClassName('UOP_settingtab');
	for (var i = 0;i < x.length;++i) x[i].style.display = "none";
	x[tab].style.display = "block";
	document.getElementById('UOP_settting_script').style.display = "none";
	document.getElementById('UOP_mainTaskbarSuffix').className= "UOP_activeTaskbar";
	document.getElementById('UOP_scriptTaskbarSuffix').className= "UOP_hiddenTaskbar";
}
function addScriptToTable(i,scriptTable) {
	var trScript,tdScript,tdStatus;
	
	trScript = document.createElement("tr");
	trScript.setAttribute("aria-selected","false");
	trScript.setAttribute("value",i);
	trScript.addEventListener("click",selectRow,false);
	
	tdScript = document.createElement("td");
	tdScript.textContent = sh_scripts[i].fullname;
	tdScript.addEventListener("click",editScript,false);
	trScript.appendChild(tdScript);
	
	tdScript = document.createElement("td");
	tdStatus = document.createElement("div");
	tdStatus.className = "UOP_scriptStatusImg";
	tdStatus.setAttribute("status",C_mode[sh_scripts[i].mode]);
	tdScript.appendChild(tdStatus);
	tdStatus = document.createElement("span");
	tdStatus.textContent = C_mode[sh_scripts[i].mode];
	tdScript.appendChild(tdStatus);
	trScript.appendChild(tdScript);
	
	tdScript = document.createElement("td");
	tdScript.textContent = C_priority[sh_scripts[i].setting.priority];
	trScript.appendChild(tdScript);
	
	scriptTable.appendChild(trScript);
}
function saveScript() {
	document.getElementById('UOP_settting_script').style.display = "none";
	document.getElementById('UOP_settting_shedule').style.display = "block";
	document.getElementById('UOP_mainTaskbarSuffix').className= "UOP_activeTaskbar";
	document.getElementById('UOP_scriptTaskbarSuffix').className= "UOP_hiddenTaskbar";
	
	var scriptname = document.getElementById('UOP_settting_script').getElementsByTagName('h2')[0].textContent;
	var newscript = 0;
	var sid,i;
	if (scriptname == "New script")
	{
		sid = sh_scripts.length;
		newscript = 1;
	}
	else
	{
		for (i = 0;i < sh_scripts.length;++i)
			if (sh_scripts[i].fullname == scriptname) 
			{
				sid = i;
				break;
			}
	}
	
	var name,fullname,beforeTrapCheck,afterTrapCheck,afterHorn,priority,userSync,trapCheckPriority,content,errorHandler,vars;

	fullname = document.getElementById('UOP_scriptFullName').value;
	name = document.getElementById('UOP_scriptName').value;
	mode = document.getElementById('UOP_scriptMode').getElementsByClassName('tick')[0].value;
	content = document.getElementById('UOP_scriptContent').value;
	afterHorn = document.getElementById("UOP_scriptAfterHorn").checked ? 1 : 0;
	beforeTrapCheck = document.getElementById("UOP_scriptBeforeTrapCheck").checked ? 1 : 0;
	afterTrapCheck = document.getElementById("UOP_scriptAfterTrapCheck").checked ? 1 : 0;
	userSync = document.getElementById("UOP_scriptUserSync").checked ? 1 : 0;
	trapCheckPriority = document.getElementById("UOP_scriptTrapCheckPriority").checked ? 1 : 0;
	priority = document.getElementById('UOP_scriptPriority').getElementsByClassName('tick')[0].value;
	errorHandler = 0;
	vars = {};
	
	if (newscript == 0) shChangeScriptState(STOP,sid); else sh_scripts[sid] = new Object;
	sh_scripts[sid].name = name;
	sh_scripts[sid].fullname = fullname;
	if (sh_scripts[sid].setting == null) sh_scripts[sid].setting = new Object;
	sh_scripts[sid].setting.beforeTrapCheck = beforeTrapCheck;
	sh_scripts[sid].setting.afterTrapCheck = afterTrapCheck;
	sh_scripts[sid].setting.afterHorn = afterHorn;
	sh_scripts[sid].setting.priority = priority;
	sh_scripts[sid].setting.userSync = userSync;
	sh_scripts[sid].setting.trapCheckPriority = trapCheckPriority;
	sh_scripts[sid].content = content;
	sh_scripts[sid].vars = vars;
	sh_scripts[sid].errorHandler = errorHandler;
	shSaveScript(sid);
	shChangeScriptState(mode,sid);
	if (newscript == 1)
	{
		window.localStorage.UOP_nscripts = sh_scripts.length;
		var scriptTable = document.getElementById("UOP_scriptTable");
		addScriptToTable(sid,scriptTable);
		scriptTable = scriptTable.getElementsByTagName('tr');
		for (i = 0;i < scriptTable.length;++i) scriptTable[i].setAttribute("aria-selected","false");
		scriptTable[sid].setAttribute("aria-selected","true");
	}
	else
	{
		var status = document.getElementById("UOP_scriptTable").getElementsByTagName('tr')[sid].getElementsByTagName('td')[1];
		status.getElementsByTagName('div')[0].setAttribute("status",C_mode[sh_scripts[i].mode]);
		status.getElementsByTagName('span')[0].textContent = C_mode[sh_scripts[i].mode];
	}
}
function cancelScript() {
	document.getElementById('UOP_settting_script').style.display = "none";
	document.getElementById('UOP_settting_shedule').style.display = "block";
	document.getElementById('UOP_mainTaskbarSuffix').className= "UOP_activeTaskbar";
	document.getElementById('UOP_scriptTaskbarSuffix').className= "UOP_hiddenTaskbar";
}
function deleteScript() {
	var r = confirm("Are you sure want to delete this script ?");
	if (r == false) return;
	
	document.getElementById('UOP_settting_script').style.display = "none";
	document.getElementById('UOP_settting_shedule').style.display = "block";
	document.getElementById('UOP_mainTaskbarSuffix').className= "UOP_activeTaskbar";
	document.getElementById('UOP_scriptTaskbarSuffix').className= "UOP_hiddenTaskbar";
	
	var scriptname = document.getElementById('UOP_scriptName').value;
	for (var i = 0;i < sh_scripts.length;++i)
		if (sh_scripts[i].name == scriptname)
		{
			var j;
			var list = document.getElementById('UOP_scriptTable').getElementsByTagName('tr');
			for (j = i + 1;j < sh_scripts.length;++j) list[j].setAttribute("value",j - 1);
			list[i].parentNode.removeChild(list[i]);
			shDeleteScript(i);
			break;
		}
}
function editScript(e) {
	document.getElementById('UOP_settting_script').style.display = "block";
	document.getElementById('UOP_settting_shedule').style.display = "none";
	document.getElementById('UOP_mainTaskbarSuffix').className= "UOP_hiddenTaskbar";
	document.getElementById('UOP_scriptTaskbarSuffix').className= "UOP_activeTaskbar";
	selectRow(e);
	
	var i,list;
	var sid = e.target.parentNode.getAttribute("value");
	if (sid == null) sid = -1; else sid = Number(sid);
	var header,name,fullname,beforeTrapCheck,afterTrapCheck,afterHorn,priority,userSync,trapCheckPriority,content,mode;	
	if (sid == -1)
	{
		header = "New script";
		fullname = "";
		name = "";
		beforeTrapCheck = afterTrapCheck = 0;
		afterHorn = 1;
		priority = 0;
		userSync = 0;
		trapCheckPriority = 0;
		mode = PLAY;
		content = "";
	}
	else
	{
		name = sh_scripts[sid].name;
		header = fullname = sh_scripts[sid].fullname;
		beforeTrapCheck = sh_scripts[sid].setting.beforeTrapCheck;
		afterTrapCheck = sh_scripts[sid].setting.afterTrapCheck;
		afterHorn = sh_scripts[sid].setting.afterHorn;
		priority = sh_scripts[sid].setting.priority;
		userSync = sh_scripts[sid].setting.userSync;
		trapCheckPriority = sh_scripts[sid].setting.trapCheckPriority;
		mode = sh_scripts[sid].mode;
		if (mode == ERROR) mode = STOP;
		content = sh_scripts[sid].content;
	}
	
	document.getElementById('UOP_settting_script').getElementsByTagName('h2')[0].textContent = header;
	document.getElementById('UOP_scriptFullName').value = fullname;
	document.getElementById('UOP_scriptName').value = name;
	document.getElementById("UOP_scriptAfterHorn").checked = (afterHorn == 1) ? true : false;
	document.getElementById("UOP_scriptBeforeTrapCheck").checked = (beforeTrapCheck == 1) ? true : false;
	document.getElementById("UOP_scriptAfterTrapCheck").checked = (afterTrapCheck == 1) ? true : false;
	document.getElementById("UOP_scriptUserSync").checked = (userSync == 1) ? true : false;
	document.getElementById("UOP_scriptTrapCheckPriority").checked = (trapCheckPriority == 1) ? true : false;
	list = document.getElementById('UOP_scriptMode').getElementsByTagName('li');
	for (i = 0;i < list.length;++i)
	{
		list[i].setAttribute("aria-checked","false");
		list[i].setAttribute("origin","false");
		list[i].className = "UOP_settingli";
	}
	list[mode].setAttribute("aria-checked","true");
	list[mode].setAttribute("origin","true");
	list[mode].className = "UOP_settingli tick";

	list = document.getElementById('UOP_scriptPriority').getElementsByTagName('li');
	for (i = 0;i < list.length;++i)
	{
		list[i].setAttribute("aria-checked","false");
		list[i].setAttribute("origin","false");
		list[i].className = "UOP_settingli";
	}
	list[priority].setAttribute("aria-checked","true");
	list[priority].setAttribute("origin","true");
	list[priority].className = "UOP_settingli tick";
	
	document.getElementById('UOP_scriptContent').value = content;
}
function initControlPanel() {
	if (C_disableExperimental == 1) document.getElementById('UOP_buttonSchedule').style.display = "none";
	var i;
	var allLi = document.getElementsByClassName("UOP_settingli");
	for (i = 0;i < allLi.length;++i) allLi[i].addEventListener("click",checkLi,false);
	document.getElementById('UOP_auto').addEventListener('click',toggleGroup,false);
	document.getElementById('UOP_schedule').addEventListener('click',toggleGroup,false);
	document.getElementById('UOP_buttonLoadKR').addEventListener('click',loadSettingKRimage,false);
	document.getElementById('UOP_buttonAlarmTest').addEventListener('click',alarmTest,false);
	document.getElementById('UOP_buttonSave').addEventListener('click',saveSettings,false);
	document.getElementById('UOP_buttonReset').addEventListener('click',clearSettings,false);
	document.getElementById('UOP_buttonGeneral').addEventListener('click',tabSettings,false);
	document.getElementById('UOP_buttonBot').addEventListener('click',tabSettings,false);
	document.getElementById('UOP_buttonSchedule').addEventListener('click',tabSettings,false);
	document.getElementById('UOP_buttonSaveScript').addEventListener('click',saveScript,false);
	document.getElementById('UOP_buttonCancelScript').addEventListener('click',cancelScript,false);
	document.getElementById('UOP_buttonDeleteScript').addEventListener('click',deleteScript,false);
	document.getElementsByClassName('UOP_scriptDiv')[0].getElementsByTagName('tfoot')[0].getElementsByTagName('td')[0].addEventListener('click',editScript,false);
	document.getElementById('UOP_buttonAccessToken').addEventListener('click',buttonGetAccessToken,false);
	
	tmp = document.getElementById("UOP_skin").getElementsByTagName('li')[S_skin];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_auto").getElementsByTagName('li')[S_auto];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_schedule").getElementsByTagName('li')[S_schedule];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_ads").getElementsByTagName('li')[S_ads];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_emulateMode").getElementsByTagName('li')[S_emulateMode];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_aggressive").getElementsByTagName('li')[S_aggressive];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_trapCheck").getElementsByTagName('li')[S_trapCheck];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_trapCheckPriority").getElementsByTagName('li')[S_trapCheck];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_solve").getElementsByTagName('li')[S_solve];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_alarm").getElementsByTagName('li')[S_alarm];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_alarmStop").getElementsByTagName('li')[S_alarmStop];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_server").getElementsByTagName('li')[S_server];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	document.getElementById("UOP_cacheKRstr").value = S_cacheKRstr;
	document.getElementById("UOP_alarmSrc").value = S_alarmSrc;
	document.getElementById("UOP_alarmNoti").checked = ((S_alarmNoti == 1) ? true : false);
	document.getElementById("UOP_serverUrl").value = S_serverUrl;
	document.getElementById("UOP_delaymin").value = S_delaymin;
	document.getElementById("UOP_delaymax").value = S_delaymax;
	document.getElementById("UOP_trapCheckTime").value = S_trapCheckTime;
	document.getElementById("UOP_alarmStopTime").value = S_alarmStopTime;
	document.getElementById("UOP_access_token").value = window.localStorage.UOP_access_token;
	
	document.getElementById("UOP_version").innerHTML = C_version;
	
	var trScript,tdScript,tdStatus;
	var scriptTable = document.getElementById("UOP_scriptTable");
	for (i = 0;i < sh_scripts.length;++i)
	{
		addScriptToTable(i,scriptTable)
	}
	if (sh_scripts.length > 0) scriptTable.getElementsByTagName('tr')[0].setAttribute("aria-selected","true");
	
	//if ((C_version == window.localStorage.UOP_newversion) || (C_version == "Limited Edition") || (C_version == "Platinum Edition")) document.getElementById("UOP_is_uptodate").style.display = "block";
	//else if (window.localStorage.UOP_newversion == "error") document.getElementById("UOP_cannot_update").style.display = "block";
	//else document.getElementById("UOP_update_available").style.display = "block";
	document.getElementById("UOP_is_uptodate").style.display = "block";
	
	var len;
	tmp = document.getElementsByClassName('UOP_settinggroup');
	O_settingGroup = tmp;
	i = 0;
	len = S_settingGroupsLength[i];
	if (S_auto == 1) len = 0;
	tmp[i].style.height = len + "px";
	i = 1;
	len = S_settingGroupsLength[i];
	if (S_schedule == 1) len = 0;
	tmp[i].style.height = len + "px";
}
function checkLi(e) {
	var obj = e.target;
	var parent = obj.parentNode;
	var parentArr = parent.getElementsByTagName('li');
	for (var i = 0;i < parentArr.length;++i)
	{
		parentArr[i].setAttribute("aria-checked","false");
		parentArr[i].className = "UOP_settingli";
	}
	obj.setAttribute("aria-checked","true");
	obj.className = "UOP_settingli tick";
	if (obj.getAttribute("origin") == "true")
	{
		parent.parentNode.className = "UOP_settingvalue";
	}
	else
	{
		parent.parentNode.className = "UOP_settingvalue editted";
	}
}
function selectRow(e) {
	var selectedRow = e.target,thebody;
	while (selectedRow.tagName.toUpperCase() != "TR") selectedRow = selectedRow.parentNode;
	thebody = selectedRow.parentNode.getElementsByTagName("TR");
	for (var i = 0;i < thebody.length;++i) thebody[i].setAttribute("aria-selected","false");
	selectedRow.setAttribute("aria-selected","true");
}
function toggleGroup(e) {
	var state = e.target.value;
	var num = C_groupNum[e.target.parentNode.id];
	if (state == 1) //1 = OFF
	{
		O_settingGroup[num].style.height = "0px";
		O_settingGroup[num].style.opacity = "0";
	}
	else
	{
		O_settingGroup[num].style.height = S_settingGroupsLength[num] + "px";
		O_settingGroup[num].style.opacity = "1";
	}
}
function loadControlPanel() {
	sendMessage(C_cpmessage,"UOP_eval");
	initControlPanel();
}
function alarmTest() {
	var str = window.localStorage.UOP_alarmSrc;
	var num = S_alarm;
	var alarmNoti = S_alarmNoti;
	window.localStorage.UOP_alarmSrc = document.getElementById("UOP_alarmSrc").value;
	S_alarm = document.getElementById("UOP_alarm").getElementsByClassName("tick")[0].value;
	S_alarmNoti = document.getElementById("UOP_alarmNoti").checked ? 1 : 0;
	alarm();
	window.localStorage.UOP_alarmSrc = str;
	S_alarm = num;
	S_alarmNoti = alarmNoti;
}
function save_access_token() {
	if (access_token_loaded == 0)
	{
		facebookWindow.postMessage("UOP_httpfacebook_request_token", "https://apps.facebook.com");
		setTimeout(save_access_token,500);
	}
	else
	{
		window.localStorage.UOP_access_token = access_token_loaded;
		facebookWindow.postMessage("UOP_facebookclose", "https://apps.facebook.com");
		try
		{
			document.getElementById('UOP_access_token').value = access_token_loaded;
			document.getElementById('UOP_buttonAccessToken').textContent = "Saved";
			document.getElementById('UOP_buttonAccessToken').disabled = true;
		}
		catch (e){}
	}
}
function get_access_token() {
	function UOP_save_access_token() {
		if (typeof FB != "undefined")
		{
			var str = FB.getAccessToken();
			if (str != null)
			{
				window.localStorage.UOP_access_token = str;
				return;
			}
		}
		setTimeout(UOP_save_access_token,1000);
	}
	if (location.pathname.indexOf("/canvas/") != -1)
	{
		if (isInFacebookFrame())
		{
			window.localStorage.UOP_access_token = "Refreshing";
			setTimeout(UOP_save_access_token,0);
		}
	}
}
function buttonGetAccessToken() {
	facebookWindow = window.open("https://apps.facebook.com/mousehunt/");
	try
	{
		document.getElementById('UOP_access_token').value = "Loading....";
	}
	catch (e) {}
	access_token_loaded = 0;
	setTimeout(save_access_token,1000);
}
/*******************TOOLS********************/
function getCookie(c_name) {
	if (document.cookie.length > 0)
	{
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return null;
}
function formatMinute(sec) {
	var min = Math.floor(sec / 60);
	sec = sec % 60;
	var textTime = min+":"+(sec < 10 ? '0'+sec : sec);
	return textTime;
}
function formatHour(sec) {
	var hour = Math.floor(sec / 3600); 
	var min = Math.floor(sec / 60) % 60;
	sec = sec % 60;
	var textTime = hour + ":" + (min<10?"0"+min:min) + ":" + (sec<10?"0"+sec:sec);
	return textTime;
}
function formatWeek(sec) {
	sec = Math.floor(sec / 60);
	var min = sec % 60;sec = Math.floor(sec / 60);
	var hour = sec % 24;sec = Math.floor(sec / 24);
	var day = sec % 7;
	var week = Math.floor(sec / 7);
	
	var textTime = "";
	if (week != 0) textTime += week + "w ";
	if (day != 0) textTime += day + "d ";
	textTime += (hour<10?"0"+hour:hour) + ":" + (min<10?"0"+min:min);
	return textTime;
}
function callArrayFunction(element, index, array) {
	element();
}
/*******************SYNC********************/
function receiveWindowMessage(event) {
	//WINDOW <=> FACEBOOK <=> CANVAS
	if (event.data == "UOP_httpfacebook_request_token") //WINDOW => FACEBOOK
	{
		if (access_token_loaded == 0) canvasWindow.postMessage("UOP_facebookhttps_request_token","https://www.mousehuntgame.com");
		else event.source.postMessage(access_token_loaded,event.origin);
	}
	else if (event.data == "UOP_facebookhttps_request_token") //FACEBOOK => CANVAS
	{
		if (window.localStorage.UOP_access_token != "Refreshing") event.source.postMessage(window.localStorage.UOP_access_token,event.origin);
	}
	else if (event.origin == "https://www.mousehuntgame.com") //CANVAS => FACEBOOK
	{
		access_token_loaded = event.data;
	}
	else if (event.origin == "https://apps.facebook.com") //FACEBOOK => WINDOW
	{
		access_token_loaded = event.data;
	}
	else if (event.data == "UOP_facebookclose") //CLOSE FACEBOOK
	{
		window.close();
	}
}
function syncUser(callbackFunction) {
	var request = new XMLHttpRequest();
	var url = C_canvasMode[inCanvas] + "/managers/ajax/abtest.php";
	request.open("GET", url, true);
	request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
	request.setRequestHeader("Pragma","no-cache");
	request.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				try
				{
					data = JSON.parse(request.responseText);
					if (callbackFunction != null) setTimeout(callbackFunction,0);
				}
				catch (e)
				{
					document.getElementById('pagemessage').innerHTML = "<label style='font-weight:bold;color: red;'>Error while sync, request status = " + request.status + "</label>";
					document.title = "Sync error !";
					setTimeout(function() {syncUser(callbackFunction);},3000);
				}
			}
			else
			{
				document.getElementById('pagemessage').innerHTML = "<label style='font-weight:bold;color: red;'>Error while sync, request status = " + request.status + "</label>";
				document.title = "Sync error !";
				setTimeout(function() {syncUser(callbackFunction);},3000);
			}
		}
	};
	request.send(null);
}
function soundHorn() {
	//please take note that the phrase is: "hornwaiting => hornready => hornsounding => hornsounded => hornwaiting"
	if (O_hornHeader.className.indexOf('hornsounding') != -1)
	{
		setTimeout(soundHorn, 100);
		registerSoundHornSounding.forEach(callArrayFunction);
		return;
	}
	else if (O_hornHeader.className.indexOf('hornsounded') != -1)
	{
		setTimeout(soundHorn, 100);
		registerSoundHornSounded.forEach(callArrayFunction);
		return;
	}

	syncUser(soundHornWaiting);
}
function soundHornWaiting() {
	registerSoundHornWaiting.forEach(callArrayFunction);
}
function updateTimeStamp() {
	nextTurnTimestamp = data.user.next_activeturn_seconds * 1000 + new Date().getTime();
}
/*******************SYSTEM AREA********************/
function cssAdder(num) {
	if (cssArr[num] == 0) return;
	
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = C_cssArr[num];
	document.head.appendChild(css);
	
	cssArr[num] = 1;
}
function jsAdder(num) {
	if (jsArr[num] == 0) return;
	
	var js = document.createElement('script');
	js.type = 'text/javascript'; 
	js.src = C_jsArr[num];
	document.head.appendChild(js);
	
	jsArr[num] = 1;
}
function cssCustomAdder(num) {
	if (cssCustomArr[num] == 0) return;
	
	css = document.createElement('style');
	css.rel = 'text/css';
	css.innerHTML = C_cssCustomArr[num];//.replace(/;/g,'!important;');
	document.head.appendChild(css);
	
	cssCustomArr[num] = 1;
}
function manageCSSJSAdder(num) {
	if (cssjsSetArr[num] == 0) return;
	
	var i;
	for (i = 0;i < C_cssjsSetArr[num][0].length;++i) cssAdder(C_cssjsSetArr[num][0][i]);
	for (i = 0;i < C_cssjsSetArr[num][1].length;++i) jsAdder(C_cssjsSetArr[num][1][i]);
	for (i = 0;i < C_cssjsSetArr[num][2].length;++i) cssCustomAdder(C_cssjsSetArr[num][2][i]);
	
	cssjsSetArr[num] = 0;
}
function sendMessage(str,callfunc) {
	O_sendMessage.className = callfunc;
	O_sendMessage.textContent = str;
	O_sendMessage.click();
}
function receiveMessage() {
	switch (O_receiveMessage.className)
	{
		case "getItemData": itemdata = JSON.parse(O_receiveMessage.textContent);break;
		default: break;
	}
}
function UOP_receiveMessage() {
	switch (O_receiveMessage.className)
	{
		case "UOP_userHash": UOP_updateUserHash();break;
		case "UOP_eval": UOP_eval();break;
		default: break;
	}
}
function windowScript() {
	var O_sendMessage = document.getElementById('UOP_toScriptMessage'),O_receiveMessage = document.getElementById('UOP_toWindowMessage');
	function UOP_sendMessage(str,callfunc) {O_sendMessage.className = callfunc;O_sendMessage.textContent = str;O_sendMessage.click();}
	function UOP_updateUserHash () { user.unique_hash = O_receiveMessage.textContent;}
	function UOP_eval() {eval(O_receiveMessage.textContent);}
}
/*******************SKIN AREA********************/
//TOOLS
function addScreenShotSafe() {
	var target = document.getElementsByClassName('gamelogo')[0];
	target.addEventListener('click',toggleScreenShotSafe,false);
	target.firstChild.setAttribute('onclick','return false;');
}
function toggleScreenShotSafe() {
	screenshotSafe = 1 - screenshotSafe;
	var target = document.getElementById('UOP_appAutoPanel');
	if (target != null)
	{
		target.style.display = C_displayState[screenshotSafe];
		target.previousSibling.style.display = C_displayState[screenshotSafe];
	}
}
function skinSecondTimer() {
	//update sound timer
	var nextTurnSeconds = Math.ceil((nextTurnTimestamp - new Date().getTime()) / 1000);
	if (nextTurnSeconds > 0)
	{
		var textTime = formatMinute(nextTurnSeconds);
		O_huntTimer.textContent = textTime;
		if (S_auto == 1)
		{
			document.title = textTime;
			if (data.user.has_puzzle) document.title = "King's Reward";
		}
	}
	else
	{
		O_huntTimer.textContent = "Ready";
		return;
	}

	//set the second time interval
	setTimeout(function () { (skinSecondTimer)() }, C_SecondInterval * 1000);
}
function travelcontentLoad() {
	if ((C_disableExperimental == 1) || (S_emulateMode == 0))
	{
		travelcontentLoadold();
		return;
	}
	var request = new XMLHttpRequest();
	var contentDiv = O_travelContent;
	request.open("GET", C_canvasMode[inCanvas] + "/travel.php", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var JSUnknownStringStart = request.responseText.indexOf("app.views.TravelView.");
				var JSUnknownStringEnd = request.responseText.indexOf(" =",JSUnknownStringStart);
				var JSUnknownString = request.responseText.substring(JSUnknownStringStart,JSUnknownStringEnd);
				var JSStartString = JSUnknownString + ".populate(";
				var index = request.responseText.indexOf(JSStartString);
				if (index == -1)
				{
					contentDiv.innerHTML = "Cannot load data, possibility because of King's Reward";
					return;
				}
				
				var JSText = request.responseText.substring(index + JSStartString.length,request.responseText.indexOf(");" + JSUnknownString + ".setCurrentUserEnvironmentType"));
				O_environment = JSON.parse(JSText);
				var group_env = new Array;
				var group_name = new Object;
				var env_obj,group_num = 0,i,j;
				for (i = 0;i < O_environment.length;++i)
				{
					if (group_env[group_name[O_environment[i].region.type]] == null)
					{
						group_name[O_environment[i].region.type] = group_num++;
						group_env[group_name[O_environment[i].region.type]] = new Object;
						group_env[group_name[O_environment[i].region.type]].name = O_environment[i].region.name;
						group_env[group_name[O_environment[i].region.type]].data = new Array;
						group_env[group_name[O_environment[i].region.type]].display_order = O_environment[i].region.display_order;
					}
					env_obj = new Object;
					env_obj.name = O_environment[i].name;
					env_obj.type = O_environment[i].type;
					env_obj.environment_id = O_environment[i].environment_id;
					env_obj.display_order = O_environment[i].displayOrder;
					group_env[group_name[O_environment[i].region.type]].data.push(env_obj);
				}
				for (i = 0;i < group_env.length;++i)
				{
					group_env[i].data.sort(function(a, b) {return a.display_order - b.display_order;});
				}
				group_env.sort(function(a, b) {return a.display_order - b.display_order;});
				
				var HTMLdiv = document.createElement('div');
				var envitem,groupitem;
				for (i = 0;i < group_env.length;++i)
				{
					groupitem = document.createElement('h3');
					groupitem.textContent = group_env[i].name;
					HTMLdiv.appendChild(groupitem);
					for (j = 0;j < group_env[i].data.length;++j)
					{
						listitem = document.createElement('a');
						listitem.className = "UOP_travelPlace";
						listitem.setAttribute("value",group_env[i].data[j].environment_id);
						listitem.innerHTML = group_env[i].data[j].name + "&nbsp;&nbsp;";
						listitem.addEventListener('click',travel,false);
						HTMLdiv.appendChild(listitem);
					}
					HTMLdiv.appendChild(document.createElement("br"));
				}
				
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function travelcontentLoadold() {
	var request = new XMLHttpRequest();
	var freeTravel,freeTravelMeadow;
	var contentDiv = O_travelContent;
	request.open("GET",C_canvasMode[inCanvas] + "/travel.php?quick=1", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				contentDiv.innerHTML = request.responseText.substring(request.responseText.indexOf("<h2 style='margin-bottom:12px;'>Select a location to travel to</h2>"),request.responseText.indexOf("</div></div><div class='inactive' id='tabbarContent_page_1'>")).replace(/&amp;quick=1/g,'').replace(/ gold/g,'').replace(/travel.php\?env=/g,'managers/ajax/users/changeenvironment.php?destination=');
				if (request.responseText.indexOf("travel.php?freeTravel=true") != -1)
				{
					appendbefore = contentDiv.firstChild.nextSibling;
					freeTravel = appendbefore.cloneNode(true);
					freeTravel.textContent = "Free Travel";
					freeTravelMeadow = appendbefore.nextSibling.cloneNode(true);
					freeTravelMeadow.innerHTML = "<a href='" + request.responseText.substring(request.responseText.indexOf("travel.php?freeTravel=true"),request.responseText.indexOf("'>Follow Larry back to the Meadow")) + "'>Follow Larry to Meadow</a> (0)";
					contentDiv.insertBefore(freeTravel,appendbefore);
					contentDiv.insertBefore(freeTravelMeadow,appendbefore);
					contentDiv.insertBefore(document.createElement("br"),appendbefore);
				}
				var travelcontentChildArr = contentDiv.childNodes;
				for (var i = 0;i < travelcontentChildArr.length;++i)
					if (travelcontentChildArr[i].nodeName == "DIV")
					{
						travelcontentChildArr[i].firstChild.target = "_blank";
						travelcontentChildArr[i].firstChild.setAttribute('onclick','return false;');
						travelcontentChildArr[i].firstChild.addEventListener('click',travel_old,false);
					}
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function shopcontentLoad() {
	manageCSSJSAdder(1);
	var request = new XMLHttpRequest();
	var contentDiv = O_shopContent;
	request.open("GET",C_canvasMode[inCanvas] + "/shops.php", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLText = request.responseText.substring(request.responseText.indexOf("<div class='pagetabbartop'>"),request.responseText.indexOf("</div></div><a href='#' name='hudbottom'></a>"));
				HTMLText += request.responseText.substring(request.responseText.indexOf("<div class='contentcontainer'>"),request.responseText.indexOf("<div class='footer'>"));
				var JSText = request.responseText.substring(request.responseText.indexOf("app.views.ItemPurchaseView"),request.responseText.indexOf("user = {"));
				
				sendMessage(JSText,"UOP_eval");
				HTMLText = HTMLText.replace(/app\.views\.TabBarView\.page\.show\(.\);/g,'');
				HTMLText = HTMLText.replace(/tabbarContent_page/g,'UOP_tabbarContents_page');
				HTMLText = HTMLText.replace(/tabbarControls_page/g,'UOP_tabbarControls_page');
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				
				var tmp = HTMLdiv.getElementsByClassName('deets');
				for (var i = tmp.length - 1;i >=0;--i)
				{
					tmp[0].innerHTML = tmp[0].getElementsByClassName('name')[0].innerHTML;
					tmp[0].className = "name";
				}
				tmp = HTMLdiv.getElementsByTagName('br');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('flexibleDialog');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('subtabheading');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('tradable');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('anchorLink');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('journalContainer');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('control');tmp[tmp.length - 1].parentNode.style.display = "inline-block";
				tmp[0].firstChild.textContent = "Cheese";tmp[4].firstChild.textContent = "Charm";
				for (var i = 0;i < tmp.length;++i)
				{
					tmp[i].firstChild.addEventListener('click',simulateTabBar,false);
					tmp[i].setAttribute('UOP_tabValue',i);
					tmp[i].className += " UOP_shopControl";
				}
				
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function potcontentLoad() {
	manageCSSJSAdder(2);
	var request = new XMLHttpRequest();
	var contentDiv = O_potContent;
	request.open("GET",C_canvasMode[inCanvas] + "/inventory.php?tab=3", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLBegin = request.responseText.indexOf("<div class='active' id='tabbarContent_page_3'");
				var HTMLText = request.responseText.substring(HTMLBegin,request.responseText.indexOf("</script></div>",HTMLBegin));
				var JSText = request.responseText.match(/app.views.InventoryItemView.*.setValidItemClassifications\(\["potion"\]\);app.views.InventoryItemView.*.setItemsPerRow\(1\);/)[0];
				var JSUnknownRenderString = JSText.substring(JSText.indexOf("app.views.InventoryItemView.") + 28,JSText.indexOf(".setValidItemClassifications"));
				
				JSText = 'app.views.InventoryItemView.' + JSUnknownRenderString + ' = new hg.views.InventoryItemView("' + JSUnknownRenderString + '");' + JSText + 'initInventoryItemView(3);';
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "<br>";
				contentDiv.appendChild(HTMLdiv);
				
				sendMessage(JSText,"UOP_eval");
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function craftcontentLoad() {
	manageCSSJSAdder(3);
	var request = new XMLHttpRequest();
	var contentDiv = O_craftContent;
	request.open("GET",C_canvasMode[inCanvas] + "/inventory.php?tab=2", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLText = '<div id="recipeContainer" class="craftingContainer"><div class="top"><div class="loading"></div></div></div><div id="craftingContainer" class="craftingContainer" style="display:none;"><div class="top"><div class="loading"></div></div></div>';
				var JSUnknownStringStart = request.responseText.indexOf("app.views.RecipeView.");
				var JSUnknownStringEnd = request.responseText.indexOf(" =",JSUnknownStringStart);
				var JSUnknownString = request.responseText.substring(JSUnknownStringStart,JSUnknownStringEnd);
				var JSUnknownRenderString = JSUnknownString + ".render();";
				var JSText = "app.views.CraftingView.CraftingInstance = new hg.views.CraftingView(); " + JSUnknownString + " = new hg.views.RecipeView();";
				JSText += request.responseText.substring(request.responseText.indexOf(JSUnknownString + ".addRecipe"),request.responseText.indexOf(JSUnknownRenderString) + JSUnknownRenderString.length);
				JSText += request.responseText.substring(request.responseText.indexOf("app.views.CraftingView.CraftingInstance.init"),request.responseText.indexOf("app.views.CraftingView.CraftingInstance.render();"));
				JSText += JSUnknownString + ".clippingMaskWidth = 350;";
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
				
				sendMessage(JSText,"UOP_eval");
				var tmp = HTMLdiv.getElementsByClassName('recipeitemnamediv');
				for (var i = tmp.length - 1;i >= 0;--i)
				{
					tmp[i].parentNode.removeChild(tmp[i]);
				}
				tmp = HTMLdiv.getElementsByClassName('craftingTabs')[0].getElementsByTagName('li')[4].getElementsByTagName('a')[0];
				tmp.textContent = "Item";
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function supplycontentLoad() {
	manageCSSJSAdder(6);
	var request = new XMLHttpRequest();
	var contentDiv = O_supplyContent;
	request.open("GET",C_canvasMode[inCanvas] + "/supplytransfer.php", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLText = request.responseText.substring(request.responseText.indexOf('<div class="flexibleDialog dialogBox-WarmBrown">'),request.responseText.indexOf('<div class="FD-bottomRight FD-corner dialogBox-WarmBrown"></div></div></div>')+76);
				var JSText = "supplyTransfer1 = new SupplyTransfer(1);" + request.responseText.substring(request.responseText.indexOf("supplyTransfer1.setFriends("),request.responseText.indexOf("supplyTransfer1.init();") + 23);
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
				
				sendMessage(JSText,"UOP_eval");
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function giftcontentLoad() {
	manageCSSJSAdder(7);
	var request = new XMLHttpRequest();
	var contentDiv = O_giftContent;
	request.open("GET",C_canvasMode[inCanvas] + "/gift.php", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLText = request.responseText.substring(request.responseText.indexOf('<div id="giftSelectorContainer"'),request.responseText.indexOf('<div id="GiftSelectorConfirm" class="hide"></div></div>')+55);
				var JSText = "gs = new giftSelector();" + request.responseText.substring(request.responseText.indexOf("gs.setAction"),request.responseText.indexOf("gs.render();") + 12);
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
				
				sendMessage(JSText,"UOP_eval");
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function travelToTabBar() {
	//travel => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0].firstChild;
	
	var travelbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
	travelbar.className = "inactive";
	var travelbarChild = travelbar.firstChild.firstChild;

	var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
	travelbarChild.setAttribute('onclick',travelbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
	travelbarChild.addEventListener('click',travelcontentLoad,false);
	
	travelbarChild = travelbarChild.childNodes[1];
	travelbarChild.id = "UOP_travelCampTab";
	travelbarChild.textContent = "Travel";
	tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(travelbar);
	
	var travelcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
	travelcontent.appendChild(document.getElementById('huntingTips').cloneNode(true));
	travelcontent.id = travelcontent.id.substring(0,travelcontent.id.length - 1) + numOfTabbar;
	var travelcontentChild = travelcontent.lastChild;
	O_travelTab = travelcontentChild.getElementsByClassName('content')[0];
	travelcontentChild.id = "UOP_campTravel";
	travelcontentChild.firstChild.firstChild.innerHTML = '<a href="travel.php">Travel</a> to Location';
	travelcontentChild.firstChild.lastChild.innerHTML = 'Traveling Service by <a href="profile.php?snuid=larry">Larry</a><br>[<a id="UOP_travelOld">Normal Travel mode</a>] [<a id="UOP_travelGetAccessToken">Get Access Token</a>]';
	travelcontentChild = travelcontentChild.firstChild.nextSibling;
	travelcontentChild.id = "UOP_travelcontentChild";
	O_travelContent = travelcontentChild;
	travelcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
	tabbar.getElementsByClassName('tabbody')[0].appendChild(travelcontent);
	document.getElementById('UOP_travelOld').addEventListener('click',travelcontentLoadold,false);
	document.getElementById('UOP_travelGetAccessToken').addEventListener('click',buttonGetAccessToken,false);
}
function shopToTabBar() {
	//shop => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0].firstChild;

	var addbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
	addbar.className = "inactive";
	addbar.style.display = "inline-block";
	var addbarChild = addbar.firstChild.firstChild;
	
	var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
	addbarChild.setAttribute('onclick',addbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
	addbarChild.addEventListener('click',shopcontentLoad,false)
	
	addbarChild = addbarChild.childNodes[1];
	addbarChild.id = "UOP_shopCampTab";
	addbarChild.textContent = "Shop";
	tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(addbar);
	
	var addcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
	addcontent.appendChild(document.createElement("div"));
	addcontent.id = addcontent.id.substring(0,addcontent.id.length - 1) + numOfTabbar;
	var addcontentChild = addcontent.lastChild;
	addcontentChild.id = "UOP_shopcontentChild";
	O_shopContent = addcontentChild;
	addcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
	tabbar.getElementsByClassName('tabbody')[0].appendChild(addcontent);
}
function potToTabBar() {
	//pot => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0].firstChild;

	var potbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
	potbar.className = "inactive";
	potbar.style.display = "inline-block";
	var potbarChild = potbar.firstChild.firstChild;
	
	var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;

	potbarChild.setAttribute('onclick',potbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
	potbarChild.addEventListener('click',potcontentLoad,false);
	
	potbarChild = potbarChild.childNodes[1];
	potbarChild.id = "UOP_potCampTab";
	potbarChild.textContent = "Potion";
	tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(potbar);
	
	var potcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
	potcontent.appendChild(document.createElement("div"));
	potcontent.id = potcontent.id.substring(0,potcontent.id.length - 1) + numOfTabbar;
	var potcontentChild = potcontent.lastChild;
	potcontentChild.id = "UOP_potcontentChild";
	O_potContent = potcontentChild;
	potcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
	tabbar.getElementsByClassName('tabbody')[0].appendChild(potcontent);
}
function craftToTabBar() {
	//craft => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0].firstChild;
	
	var craftbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
	craftbar.className = "inactive";
	craftbar.style.display = "inline-block";
	var craftbarChild = craftbar.firstChild.firstChild;
	
	var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;

	craftbarChild.setAttribute('onclick',craftbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
	craftbarChild.addEventListener('click',craftcontentLoad,false);
	
	craftbarChild = craftbarChild.childNodes[1];
	craftbarChild.id = "UOP_craftCampTab";
	craftbarChild.textContent = "Craft";
	tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(craftbar);
	
	var craftcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
	craftcontent.appendChild(document.createElement("div"));
	craftcontent.id = craftcontent.id.substring(0,craftcontent.id.length - 1) + numOfTabbar;
	var craftcontentChild = craftcontent.lastChild;
	craftcontentChild.id = "UOP_craftcontentChild";
	O_craftContent = craftcontentChild;
	craftcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
	tabbar.getElementsByClassName('tabbody')[0].appendChild(craftcontent);
}
function supplyToTabBar() {
	//supply => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0].firstChild;
	
	var supplybar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
	supplybar.className = "inactive";
	supplybar.style.display = "inline-block";
	var supplybarChild = supplybar.firstChild.firstChild;
	
	var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;

	supplybarChild.setAttribute('onclick',supplybarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
	supplybarChild.addEventListener('click',supplycontentLoad,false);
	
	supplybarChild = supplybarChild.childNodes[1];
	supplybarChild.id = "UOP_supplyCampTab";
	supplybarChild.textContent = "Supply";
	tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(supplybar);
	
	var supplycontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
	supplycontent.appendChild(document.createElement("div"));
	supplycontent.id = supplycontent.id.substring(0,supplycontent.id.length - 1) + numOfTabbar;
	var supplycontentChild = supplycontent.lastChild;
	supplycontentChild.id = "UOP_supplycontentChild";
	O_supplyContent = supplycontentChild;
	supplycontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
	tabbar.getElementsByClassName('tabbody')[0].appendChild(supplycontent);
}
function giftToTabBar() {
	//gift => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0].firstChild;
	
	var giftbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
	giftbar.className = "inactive";
	giftbar.style.display = "inline-block";
	var giftbarChild = giftbar.firstChild.firstChild;
	
	var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;

	giftbarChild.setAttribute('onclick',giftbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
	giftbarChild.addEventListener('click',giftcontentLoad,false);
	
	giftbarChild = giftbarChild.childNodes[1];
	giftbarChild.id = "UOP_giftCampTab";
	giftbarChild.textContent = "Gift";
	tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(giftbar);
	
	var giftcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
	giftcontent.appendChild(document.createElement("div"));
	giftcontent.id = giftcontent.id.substring(0,giftcontent.id.length - 1) + numOfTabbar;
	var giftcontentChild = giftcontent.lastChild;
	giftcontentChild.id = "UOP_giftcontentChild";
	O_giftContent = giftcontentChild;
	giftcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
	tabbar.getElementsByClassName('tabbody')[0].appendChild(giftcontent);
}
function travel(e) {
	if (C_disableExperimental == 1) return;
	
	var url = "https://www.mousehuntgame.com/api/action/travel/" + e.target.getAttribute("value");
	O_travelTab.innerHTML = "Travelling...<img src='/images/ui/loaders/round_bar_green.gif'><div>";
	var htmlstr = "";
	var params = "v=" + appgameinfo.v + "&client_id=Cordova%3A" + C_mobile[S_emulateMode].Cordova + "&client_version=0.7.5&game_version=" + appgameinfo.game_version + "%0A&access_token=" + window.localStorage.UOP_access_token;

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	//request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.setRequestHeader("Accept-Charset", "utf-8, iso-8859-1, utf-16, *;q=0.7");
	request.setRequestHeader("X-Requested-With", "com.hitgrab." + C_mobile[S_emulateMode].xrequestwith + ".mousehunt");
	//request.setRequestHeader("User-Agent",C_mobile[S_emulateMode].agent);
	
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if ((request.status == 200) || (request.status == 400))
			{
				var tmpRespondJSON;
				try
				{
					tmpRespondJSON = JSON.parse(request.responseText);
					if (tmpRespondJSON.error == null) htmlstr = "Success ! ";
					else
					{
						htmlstr = "Not success ! ";
						htmlstr += "Code " + tmpRespondJSON.error.code + ": " + tmpRespondJSON.error.message;
						if (tmpRespondJSON.error.code == 100)
						{
							htmlstr += "Please get a new access_token, by go to SETTING => Go to App<br>";
							htmlstr += "Or you can use normal mode";
							O_travelTab.innerHTML = htmlstr;
							return;
						}
					}
					htmlstr += "<br>";
				}
				catch (excep)
				{
					O_travelTab.innerHTML = "Network error, refreshing...";
					O_travelTab.innerHTML += '<div class="UOP_waitingTab"></div>';
					O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
					travelcontentLoad();
					return;
				}
				
				O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
				htmlstr += "Refreshing....";
				htmlstr += '<div class="UOP_waitingTab"></div>';
				O_travelTab.innerHTML = htmlstr;
				travelcontentLoad();
			}
			else
			{
				O_travelTab.innerHTML = "Network error, refreshing...";
				O_travelTab.innerHTML += '<div class="UOP_waitingTab"></div>';
				O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
				travelcontentLoad();
			}
		}
	};
	request.send(params);
}
function travel_old(e) {
	var url = e.target.href;
	O_travelTab.innerHTML = "Travelling...<img src='/images/ui/loaders/round_bar_green.gif'><div>";
	var request = new XMLHttpRequest();
	var htmlstr = "";
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				try
				{
					var tmpRespondJSON = JSON.parse(request.responseText);
					if (tmpRespondJSON.success == 1) htmlstr = "Success ! "; else htmlstr = "Not success ! ";
					htmlstr += tmpRespondJSON.result;
					htmlstr += "<br>";
				}
				catch (excep) {}
				htmlstr += "Refreshing....";
				htmlstr += '<div class="UOP_waitingTab"></div>';
				O_travelTab.innerHTML = htmlstr;
				O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
				travelcontentLoad();
				if (url.indexOf('freeTravel=true') != -1) syncUser(updateUserHash);
			}
			else
			{
				O_travelTab.innerHTML = "Network error, refreshing...";
				O_travelTab.innerHTML += '<div class="UOP_waitingTab"></div>';
				O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
				travelcontentLoad();
			}
		}
	};
	request.send(null);
}
function simulateTabBar(e) {
	var x = e.target.parentNode.getAttribute('UOP_tabValue');
	var main_div = document.getElementById('UOP_tabbarContents_page');
	var main_tab = document.getElementById('UOP_tabbarControls_page').getElementsByTagName('li');
	
	for (i = 0;i < main_div.childElementCount;++i) main_div.childNodes[i].className = "inactive";
	for (i = 0;i < main_tab.length;++i) main_tab[i].className = "inactive";
	main_div.childNodes[x].className = "active";
	main_tab[x].className = "active";
}
function updateUserHash() {
	sendMessage(data.user.unique_hash,'UOP_userHash');
}
function toggleSkin() {
	window.localStorage.UOP_simple = 1 - S_simple;
	location.reload();
}
//DEFAULT skin
function defaultSkin() {
	if (S_simple == 0) defaultFullSkin(); else defaultSimpleSkin();
}
//Simple
function defaultSimpleSkin() {
	if (!atCamp) return;
	manageCSSJSAdder(4);
	//=======================add things============================
	//add mobile button
	var simpleSkinButton = document.getElementById('UOP_appControlPanel').cloneNode(true);
	simpleSkinButton.id = "UOP_simpleSkin";
	simpleSkinButton.className = "hgMenu UOP_hgMenu";
	simpleSkinButton.removeAttribute('onclick');
	simpleSkinButton.addEventListener('click',toggleSkin,false);
	O_hgRow.appendChild(simpleSkinButton);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	
	var inbox = document.getElementById('communityMenu').cloneNode(true);
	var oldinbox = document.getElementById('appInboxTab');
	var inboxnotification = document.getElementById('appInboxTab').getElementsByClassName('alerts')[0].cloneNode(true);
	oldinbox.id = "appoldInbox";
	inbox.id = "appInboxTab";
	inbox.removeChild(inbox.lastChild);
	inbox.appendChild(inboxnotification);
	inbox.setAttribute('onclick',oldinbox.firstChild.getAttribute('onclick'));
	inbox.firstChild.textContent = "INBOX";
	O_hgRow.insertBefore(inbox,document.getElementById('communityMenu'));
	
	//add hud
	O_simpleHud = document.createElement('div');
	O_simpleHud.id = "UOP_simpleHud";
	var tmp = document.getElementById('tabbarContent_page');
	tmp.parentNode.insertBefore(O_simpleHud,tmp);
	
	//add journal
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		tabbar = tabbar[0].firstChild;
		var journalbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		journalbar.className = "inactive";

		var journalbarChild = journalbar.firstChild.firstChild;
		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		journalbarChild.setAttribute('onclick',journalbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
		journalbarChild = journalbarChild.childNodes[1];
		journalbarChild.id = "UOP_journalCampTab";
		journalbarChild.textContent = "Journal";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(journalbar);
		
		var journalcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		var campRight = document.getElementsByClassName('campRight')[0];
		if (campRight != null)
		{
			campRight.parentNode.removeChild(campRight);
			journalcontent.appendChild(campRight);
			journalcontent.style.width = "375px";
		}
		journalcontent.id = journalcontent.id.substring(0,journalcontent.id.length - 1) + numOfTabbar;
		var journalcontentChild = journalcontent.lastChild;
		journalcontentChild.id = "UOP_campjournal";
		tabbar.getElementsByClassName('tabbody')[0].appendChild(journalcontent);
		
		//add tab bars
		travelToTabBar();
		shopToTabBar();
		potToTabBar();
		craftToTabBar();
		supplyToTabBar();
		giftToTabBar();
		
		//hide them
		tmp = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive');
		tmp[0].style.display = "none";
		tmp[1].style.display = "none";
		journalbarChild.parentNode.click();
	}
	
	//clean up king reward
	var tmp2;
	tmp2 = document.getElementsByClassName('puzzle');
	if (tmp2.length > 0)
	{
		tmp2 = tmp2[0];
		tmp = document.getElementsByClassName('puzzleImageContainer')[0].nextSibling;
		tmp.removeChild(tmp.firstChild);
		tmp.removeChild(tmp.firstChild);
		tmp.insertBefore(tmp2,tmp.firstChild);
		tmp2 = document.createElement("div");
		tmp2.id = "pagemessage";
		tmp.insertBefore(tmp2,tmp.firstChild);
		tmp = document.getElementsByClassName('puzzleImageContainer')[0];
		tmp.parentNode.removeChild(tmp);
	}
	tmp = document.getElementById('pagemessage');
	if (tmp != null) tmp.style.width = "375px";
	
	//cleanup heading
	tmp = document.getElementById('hgbar');
	tmp.removeChild(document.getElementById('appRow'));
	tmp.removeChild(document.getElementById('newsRowHolder'));
	
	//cleanup hud
	tmp = document.getElementsByClassName('gameinfo')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('gamelogo')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('donatebuttonarea')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('campbutton')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('dropdownmenu')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('marblesplash')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('switch')[0];if(tmp != null) {tmp=tmp.parentNode;tmp.parentNode.removeChild(tmp);}
	tmp = document.getElementById('trapSpecialBar');if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementById('questBar');if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementById('huntingTips');if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementById('journalContainer');if(tmp != null) tmp.parentNode.removeChild(tmp.nextSibling);
	tmp = document.getElementById('overlayContainer');if(tmp != null) 
	for (i=0;i < 3;)
	{
		if ((tmp.lastChild.tagName != null) && (tmp.lastChild.tagName.toUpperCase() == "A")) ++i;
		tmp.removeChild(tmp.lastChild);
	}
	//add hud_baitName because it cause error
	tmp = document.createElement('span');
	tmp.id = "hud_baitName";
	tmp.setAttribute("style","display: none;");
	document.body.appendChild(tmp);
	
	//==========================cleanup things=================
	tmp = document.getElementById('hgSideBar');
	if (tmp != null)
	{
		tmp.style.margin = "auto";
		tmp.style.display = "inline-block";
		tmp2 = 170;
	}
	else tmp2 = 0;
	tmp = document.getElementById('hgAppContainer');
	tmp.style.width = "375px";
	tmp.parentNode.style.width = (tmp2 + 375) + "px";
	document.getElementsByClassName('container')[0].style.width = "inherit";
	document.getElementsByClassName('headertop')[0].style.height = "auto";
	var headercontrol = document.getElementsByClassName('headercontrols')[0];
	headercontrol.style.width = "inherit";
	headercontrol.style.cssFloat = "none";
	headercontrol.style.height = "auto";
	headercontrol.style.backgroundColor = "white";
	document.getElementById('huntTimer').style.margin = "auto";
	
	//cleanup hgRow
	var rightbanner = O_hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
	rightbanner.innerHTML = "";
	rightbanner.setAttribute('class','rightEdge');
	
	O_hgRow.removeChild(document.getElementById('appLogo'));
	O_hgRow.removeChild(document.getElementById('communityMenu')); 
	O_hgRow.removeChild(document.getElementById('supportMenu'));
	var userGreeting = document.getElementById('userGreeting');
	userGreeting.removeChild(userGreeting.getElementsByClassName('userText')[0]); 
	
	//cleanup journal
	tmpArr = document.getElementsByClassName('journalimage');
	for (i = 0;i < tmpArr.length;++i)
	{
		tmp = tmpArr[i].getElementsByTagName('img')[0];
		if (tmp != null)
		{
			tmpArr[i].removeChild(tmpArr[i].firstChild);
			tmpArr[i].appendChild(tmp);
		}
	}
	
	//detailed timer
	O_huntTimer = document.getElementById('huntTimer').cloneNode(true);
	document.getElementById('huntTimer').style.display = "none";
	O_huntTimer.id = "UOP_huntTimerParent";
	O_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt: </span><span id='UOP_huntTimer'></span>";
	document.getElementById('hornArea').appendChild(O_huntTimer);
	O_huntTimer = O_huntTimer.lastChild;
	
	//register hudupdater
	registerSoundHornWaiting.push(updateSimpleHud);
	registerSoundHornWaiting.push(skinSecondTimer);
}
function updateSimpleHud() {
	O_simpleHud.innerHTML = "";
	
	//=================add hud=====================
	//gold point
	var userObj = data.user;
	O_simpleHud.innerHTML += "<span class='hudstatlabel'>Gold:</span> " + userObj.gold + " ";
	//timer
	var locationTimerObject,states,hour,min,timetmp;
	var currentTime = Math.floor(new Date().getTime() / 1000);
	for (var i = 0;i < C_LOCATION_TIMES.length;++i)
	{
		timetmp = (currentTime - C_LOCATION_TIMES[i].base) % C_LOCATION_TIMES[i].totaltime;
		for (j = 0;j < C_LOCATION_TIMES[i].length.length;++j)
		{
			timetmp -= C_LOCATION_TIMES[i].length[j];
			if (timetmp < 0) break;
			else if (timetmp == 0)
			{
				j = (j + 1) % C_LOCATION_TIMES[i].length.length;
				timetmp = -C_LOCATION_TIMES[i].length[j];
				break;
			}
		}
		timetmp = -timetmp;
		hour = Math.floor(timetmp / 3600);
		min = Math.floor((timetmp % 3600) / 60);
		
		O_simpleHud.innerHTML += "<span style='color: " + C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + C_LOCATION_TIMES[i].shortstate[j]+ "</span>" + " - " + hour + ":" + (min < 10 ? "0"+min : min) + " ";
	}
	O_simpleHud.innerHTML += "<br>";
	
	//add tour
	if(userObj.viewing_atts.hasOwnProperty('tournament')){
		var secleft,minleft,hourleft;
		var timeleft = userObj.viewing_atts.tournament.seconds_remaining;
		var huntsleft = Math.floor((timeleft - userObj.next_activeturn_seconds)/900)+1;
		hourleft = Math.floor(timeleft / 3600);
		minleft = Math.floor(timeleft / 60) % 60;
		secleft = timeleft % 60;
		var textTime = hourleft +":"+(minleft < 10 ? '0'+minleft : minleft)+":"+(secleft < 10 ? '0'+secleft : secleft);
		O_simpleHud.innerHTML += "<a href=\"tournament.php?tid=" + userObj.viewing_atts.tournament.tournament_id + "\" data-ajax=\"false\" target=\"_blank\" style='font-weight: bold;'>Tournament</a>" + " : " + userObj.viewing_atts.tournament.status[0].toUpperCase() + userObj.viewing_atts.tournament.status.slice(1) + " - " + textTime + " <span class='hudstatlabel'>Rank:</span> " + userObj.viewing_atts.tournament.rank + " <span class='hudstatlabel'>Score:</span> " + userObj.viewing_atts.tournament.score + "<br>";
		O_simpleHud.innerHTML += '<a href=\"team.php\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Team</a> online:' + userObj.viewing_atts.tournament.team_members_online + ' <a href=\"team.php?tab=2\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Journals</a>' + " - Hunts left: " + huntsleft + ' <a href=\"team.php?invite=true\" data-ajax=\"false\" target=\"_blank\"  style="font-weight: bold;">Invite</a><br>'; 
	}
	//SG: Amplifier
	if (userObj.environment_id == 31){
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Amplifier:</span> " + userObj.viewing_atts.zzt_amplifier + "<br>";
	}
	
	//ZT: piece
	if (userObj.environment_id == 32){
		var piece = ['None','Pawn1','Pawn2','Pawn3','Pawn4','Pawn5','Pawn6','Pawn7','Pawn8','Kight1','Kight2','Bishop1','Bishop2','Rook1','Rook2','Queen','King']; 
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Amplifier: </span>" + userObj.viewing_atts.zzt_amplifier + " - <span class='hudstatlabel'>Tech:</span> " + piece[userObj.viewing_atts.zzt_tech_progress] + " - <span class='hudstatlabel'>Mystic:</span> " + piece[userObj.viewing_atts.zzt_mage_progress] + "<br>";
	}
	
	//Iceberg: Phase, ft
	if (userObj.environment_id == 40){
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Phase:</span> " + userObj.quests.QuestIceberg.current_phase + " - " + userObj.quests.QuestIceberg.user_progress + " ft - " + userObj.quests.QuestIceberg.turns_taken + " hunts<br>";
	}
	
	//FW
	if (userObj.environment_id == 33){
		var fwObj = userObj.viewing_atts.desert_warpath;
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Victories:</span> " + fwObj.victories + " - <span class='hudstatlabel'>Friends:</span> " + fwObj.friends_in_area + " - <span class='hudstatlabel'>Wave " + fwObj.wave + ":</span><br>";
		
		for (var wp in fwObj.wave_population)
		O_simpleHud.innerHTML += "<p style=\"text-align:right;\">" + fwObj.wave_population[wp].name + " - <b style=\"color:blue;\">" + fwObj.wave_population[wp].population + "</b> [" + fwObj.wave_population[wp].status + "]<br>";
		
		for (var wp in fwObj.common_population)
		O_simpleHud.innerHTML += fwObj.common_population[wp].name + " [" + fwObj.common_population[wp].status + "]<br>";
		
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Streak:</span> - " + fwObj.streak.mouse_type + " - <b style=\"color:green;\">" + fwObj.streak.quantity + "</b><br>";
		
		O_simpleHud.innerHTML += JSON.stringify(userObj.viewing_atts.desert_warpath.streak,null,'\t') ;
	}
	
	//LG
	if ((userObj.environment_id == 35)||(userObj.environment_id == 41)||(userObj.environment_id == 42)){
		for (var key in userObj.quests){
			if (userObj.quests[key].hasOwnProperty('essences')) {
				O_simpleHud.innerHTML += '<em style=\"font-size:1.1em;color:limegreen;\" >Petals : ' + userObj.quests[key].loot_drops.dewthief_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.dreamfluff_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.duskshade_petal_crafting_item.quantity + ']-' + userObj.quests[key].loot_drops.graveblossom_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.plumepearl_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.lunaria_petal_crafting_item.quantity + ']</em><br>';
				i=8;
				while (userObj.quests[key].essences[i].quantity==0) i--;
				var sum=0;
				for (var j=0; j<9; j++){// j<=i
					if (j<=i) O_simpleHud.innerHTML += '<em style=\"color:dodgerblue;\" >['+String.fromCharCode(j+65) + ':'+userObj.quests[key].essences[j].quantity + ']&emsp;</em>';
					if (j<7) sum = sum/3 + userObj.quests[key].essences[j].quantity;//Gur
				}
				O_simpleHud.innerHTML += '<br>= ' + sum + '&emsp;<em style=\"color:dodgerblue;\" >' +  userObj.quests[key].essences[6].name + '<br></em>';//Gur
				O_simpleHud.innerHTML += '<em style=\"font-size:0.8em;color:grey;\">' + JSON.stringify(userObj.quests[key].minigame ,null,'\t') + '</em><br>';
			} 
			break;
		}
		
		//Living Garden
		if (userObj.environment_id == 35){
			var smallObj = userObj.quests.QuestLivingGarden;
			if (smallObj.is_normal){
				if (smallObj.minigame.bucket_state == "filling"){
					if (smallObj.minigame.estimate == 35){
						O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
						alarm();
						}else{// <35
						if (userObj.trinket_item_id != 1020){//sponge id
							O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****20 charms only****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							alarm();
						}
					}
				}
				}else{
				if (smallObj.minigame.vials_state == "filling"){
					if (smallObj.minigame.estimate == 35){
						O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
						alarm();
						}else{// <35
						if ((userObj.trinket_item_id != 1017) && (userObj.trinket_item_id != 1022)){
							O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****10 charms each****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							alarm();
						}
					}
				}
			}
		}
		//Lost City
		if (userObj.environment_id == 41){
			var smallObj = userObj.quests.QuestLostCity;
			if (smallObj.is_normal){
				if (smallObj.minigame.curses[0].active && !smallObj.minigame.curses[0].charm.equipped){
					O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					alarm();
				}
				}else{
				if (smallObj.minigame.is_cursed && !((smallObj.minigame.curses[0].active && smallObj.minigame.curses[0].charm.equipped) || (smallObj.minigame.curses[1].active && smallObj.minigame.curses[1].charm.equipped) || (smallObj.minigame.curses[2].active && smallObj.minigame.curses[2].charm.equipped) )){
					O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					alarm();
				}
			}
		}
		//Sand Dunes
		if (userObj.environment_id == 42){
			var smallObj = userObj.quests.QuestSandDunes;
			if (smallObj.is_normal){
				if (smallObj.minigame.has_stampede && (userObj.trinket_item_id != 1016)){
					O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					alarm();
				}
				}else{
				var salt = window.localStorage.getItem("KGSalt");
				if (salt == undefined || salt == null){
					window.localStorage.setItem("KGSalt", 20);
					salt = 20;
				}
				O_simpleHud.innerHTML += 'min Salt to alert : <input type="number" id="SaltInput" name="Salt" value="' + salt.toString() + '"/>';
				O_simpleHud.innerHTML += '&emsp;&emsp;&emsp;&emsp;<input type="button" value="Save" onclick="window.localStorage.setItem(\'KGSalt\', document.getElementById(\'SaltInput\').value);window.location.href=\'/\';"/><br>';
				O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
				if ((smallObj.minigame.salt_charms_used >= salt)&&(userObj.trinket_item_id != 1015)) alarm();
				if ((smallObj.minigame.salt_charms_used == 0)&&(userObj.trinket_item_id == 1015)) alarm();
			}
		}
	}
}
//Full
function hideImageBox() {
	O_imageBox.style.opacity = 0;
}
function showImageBox(e) {
	O_imagePhoto.src = e.target.parentNode.href;
	O_imageBox.style.opacity = 1;
}
function moveImageBox(e) {
	var vW, vH, uH, oW, oH, cX, cY;
	var oHd2,state = 0;
	cX = e.clientX; cY = e.clientY;
	
	vW = window.innerWidth + window.pageXOffset;
	uH = window.pageYOffset;
	vH = window.innerHeight + uH;
	oW = O_imageBox.offsetWidth;
	oH = O_imageBox.offsetHeight;
	oHd2 = Math.floor(oH/2);
	cY += uH;
	
	O_imageBox.style.left = (((cX+10+oW)>vW) ? (cX-10-oW) : (cX+10)) + "px";
	if ((cY-oHd2) < uH) state += 1;
	if ((cY+oHd2+10) > vH) state -= 1;
	O_imageBox.style.top = ((state == 0) ? (cY-oHd2+10) : ((state == 1) ? (uH+10) : (vH-oH-10))) + "px";
}
function updateJournalBox() {
	var journalimages = document.getElementsByClassName('journalimage');
	var i;
	for (i = 0;i < journalimages.length;++i)
	{
		if ((journalimages[i].firstChild == null) || (journalimages[i].firstChild.tagName.toUpperCase() == "IMG")) continue;
		if (journalimages[i].firstChild.getAttribute('UOP_updatedJB') == null)
		{
			journalimages[i].firstChild.addEventListener('mousemove',moveImageBox,false);
			journalimages[i].firstChild.addEventListener('mouseover',showImageBox,false);
			journalimages[i].firstChild.addEventListener('mouseout',hideImageBox,false);
			journalimages[i].firstChild.setAttribute('UOP_updatedJB','updated')
		}
		else break;
	}
	
	var journaltext = document.getElementsByClassName('journaltext');
	var alist,j,attText;
	for (i = 0;i < journaltext.length;++i)
	{
		alist = journaltext[i].getElementsByTagName('a');
		if ((alist.length > 0) && (alist[0].getAttribute('UOP_updatedJB') != null)) break;
		for (j = 0;j < alist.length;++j)
		{
			attText = alist[j].getAttribute('onclick');
			if ((attText != null) && (attText.indexOf('hg.views.ItemView.show') != -1))
				alist[j].addEventListener('click',updateCampSpecial,false);
			alist[j].setAttribute('UOP_updatedJB','updated')
		}
	}
}
function updateMinuteTimer() {
	//update location timer
	var locationTimerObject,timetmp,t1,t2;
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	var i,j;
	for (i = 0;i < C_LOCATION_TIMES.length;++i)
	{
		timetmp = (currentTime - C_LOCATION_TIMES[i].base) % C_LOCATION_TIMES[i].totaltime;
		for (j = 0;j < C_LOCATION_TIMES[i].length.length;++j)
		{
			timetmp -= C_LOCATION_TIMES[i].length[j];
			if (timetmp < 0) break;
			else if (timetmp == 0)
			{
				j = (j + 1) % C_LOCATION_TIMES[i].length.length;
				timetmp = -C_LOCATION_TIMES[i].length[j];
				break;
			}
		}
		timetmp = formatMinute(Math.floor(-timetmp / 60));
		
		locationTimerObject = document.getElementById(C_LOCATION_TIMES[i].id);
		locationTimerObject.innerHTML = "<span style='color: " + C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + C_LOCATION_TIMES[i].state[j]+ "</span>" + " - " + timetmp;
	}
	if (data.user.has_shield == false) O_LGSTimer.innerHTML = "Expired";
	else
	{
		timetmp = data.user.shield_expiry.split('-');
		timetmp = Date.UTC(timetmp[0],timetmp[1] - 1,timetmp[2]);
		timetmp = Math.floor((new Date(timetmp) - currentDate) / 1000);
		timetmp = formatWeek(timetmp);
		O_LGSTimer.textContent = timetmp;
	}
	
	//set the minute time interval
	setTimeout(function () { (updateMinuteTimer)() }, C_MinuteInterval * 1000);
}
function updateHud() {
	O_titlePercentage.textContent = data.user.title_percentage.toString();
	O_baitNum.textContent = data.user.bait_quantity;
}
function updateCampSpecial(e) {
	if (e != null)
	{
		itemtype = e.target.getAttribute('onclick');
		itemtype = itemtype.substring(itemtype.indexOf('(') + 2,itemtype.indexOf(')') - 1);
	}
	if (document.getElementsByClassName('lexiconItemContainer').length > 0)
	{
		var convertible = document.getElementsByClassName('convertible');
		if (convertible.length > 0)
		{
			var newbutton;
			var newinput;
			var scriptstr;
			convertible = convertible[0];
			
			convertible.appendChild(document.createElement('br'));
			
			newbutton = document.createElement('input');
			newbutton.type = "submit";
			newbutton.value = "Custom";
			newbutton.className = "button";
			newbutton.setAttribute("onclick","this.className += ' busy';var num = document.getElementById('UOP_useCampConvertibleNum').value;hg.utils.UserInventory.useConvertible('" + itemtype + "',num);");
			
			newinput = document.createElement('input');
			newinput.id = "UOP_useCampConvertibleNum";
			newinput.type = "text";
			
			convertible.appendChild(newbutton);
			convertible.appendChild(newinput);
		}
		return;
	}
	setTimeout(updateCampSpecial,300);
}
function updateSpecial() {
	var convertible = document.getElementsByClassName('UOP_convertible');
	if (convertible.length == 0)
	{
		var convertible = document.getElementsByClassName('convertible');
		if (convertible.length > 0)
		{
			var newbutton;
			var newinput;
			var holder;
			var scriptstr;
			for (var i = 0;i < convertible.length;++i)
			{
				convertible[i].classList.add("UOP_convertible");
				holder = convertible[i].getElementsByClassName('convertibledetails')[0];
				newbutton = holder.getElementsByTagName('input');
				for (var j = 0;j < newbutton.length;++j)
				{
					newbutton[j].value = "Use " + newbutton[j].value.slice(-3);
					newbutton[j].addEventListener('click',updateSpecial,false);
				}
				
				newbutton = document.createElement('input');
				newbutton.type = "submit";
				newbutton.value = "Custom";
				newbutton.setAttribute("onclick","UOP_useCustomConvertible(this);");
				newbutton.addEventListener('click',updateSpecial,false);
				
				newinput = document.createElement('input');
				newinput.type = "text";
				newinput.className = "num";
				
				holder.appendChild(newbutton);
				holder.appendChild(newinput);
			}
			return;
		}
	}
	setTimeout(updateSpecial,300);
}
function UOP_useCustomConvertible(obj) {
	var tbox = obj.parentNode.getElementsByClassName("num")[0];
	var num = Number(tbox.value);
	var itemid = Number(obj.parentNode.parentNode.parentNode.id.slice(13));
	var itemtype = "";
	var itemdata = hg.utils.UserInventory.getAllItems().convertible;
	var i;
	
	if (isNaN(num)) return;
	
	for (i = 0;i < itemdata.length;++i)
		if (itemdata[i].item_id == itemid)
		{
			itemtype = itemdata[i].type;
			break;
		}
	
	if (itemtype == "") {tbox.value = "Unknown";return;}
	
	hg.utils.UserInventory.useConvertible(itemtype,num);
	eventRegistry.addEventListener('js_dialog_show',function() {
		activejsDialog.positionCounter = 0
		activejsDialog.centerInFrame(true);
	}
	,null,true);
}
function tradeBuyID() {
	if (C_disableExperimental == 1) return;
	
	var itemTradeID = document.getElementById('UOP_inputTrade').value;
	var params = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash + "&item_trade_id=" + itemTradeID;
	var url = C_canvasMode[inCanvas] + "/managers/ajax/trades/accepttrade.php";
	
	var http = new XMLHttpRequest();
	http.open("POST",url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				try
				{
					data = JSON.parse(http.responseText);
					if (data.success == 1)
					{
						document.getElementById('UOP_inputTrade').value = "Purchase successful";
					}
					else
					{
						document.getElementById('UOP_inputTrade').value = data.error_message;
					}
				}
				catch (e)
				{
					tradeBuyID();
				}
			}
			else
			{
				tradeBuyID();
			}
		}
	}
	http.send(params);
}
function defaultFullSkin() {
	if (location.pathname.indexOf('/forum/') != -1) return;
	manageCSSJSAdder(4);
	//===========Change the top row of mousehunt=================
	var tmp = O_hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
	tmp.innerHTML = "";
	tmp.setAttribute('class','rightEdge');
	O_hgRow.insertBefore(template.hgRight.cloneNode(true),document.getElementById('supportMenu'));//end of remove rightbanner
	O_hgRow.removeChild(document.getElementById('appLogo')); //remove leftbanner (mousehunt)
	
	//add SB+ and Inbox and mobile
	var sbplus = template.hgMenu.cloneNode(true);
	sbplus.id = "UOP_appTabSuperBrie";
	sbplus.setAttribute('onclick','showCheckout("donatebutton"); return false;');
	sbplus.lastChild.firstChild.removeAttribute('href');
	sbplus.lastChild.firstChild.textContent = document.getElementById('appTabSuperBrie').getElementsByClassName('appTabMiddle')[0].childNodes[1].textContent;		
	
	var inbox = document.getElementById('communityMenu').cloneNode(true);
	var oldinbox = document.getElementById('appInboxTab');
	var inboxnotification = document.getElementById('appInboxTab').getElementsByClassName('alerts')[0].cloneNode(true);
	oldinbox.id = "appoldInbox";
	inbox.id = "appInboxTab";
	inbox.removeChild(inbox.lastChild);
	inbox.appendChild(inboxnotification);
	inbox.setAttribute('onclick',oldinbox.firstChild.getAttribute('onclick'));
	inbox.firstChild.textContent = "INBOX";
	
	var simpleSkinButton = document.getElementById('UOP_appControlPanel').cloneNode(true);
	simpleSkinButton.id = "UOP_simpleSkin";
	simpleSkinButton.className = "hgMenu UOP_hgMenu";
	simpleSkinButton.removeAttribute('onclick');
	simpleSkinButton.addEventListener('click',toggleSkin,false);
	
	var appendbefore = document.getElementById('communityMenu').nextSibling.nextSibling;
	O_hgRow.insertBefore(inbox,appendbefore);
	O_hgRow.insertBefore(template.hgRight.cloneNode(true),appendbefore);
	O_hgRow.insertBefore(sbplus,appendbefore);
	O_hgRow.insertBefore(template.hgRight.cloneNode(true),appendbefore);
	O_hgRow.appendChild(simpleSkinButton);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));

	//support: remove: all support from support;livedevchat,chatroom,forum,news => support; 
	//community: remove: Store, add 2 guide, wiki
	var community = document.getElementById('hgDropDownCommunity').getElementsByClassName('hgDropdownMiddle')[0];
	var support = document.getElementById('hgDropDownSupport').getElementsByClassName('hgDropdownMiddle')[0];
	
	var arr = support.getElementsByClassName('hgDropDownItem');
	arr[0].firstChild.href = "/chat.php";
	arr[0].firstChild.target = "_blank";
	arr[0].firstChild.firstChild.src = "/images/ui/hgbar/icon_forums.png"
	arr[0].firstChild.firstChild.nextSibling.textContent = "Chat room";
	arr[0].firstChild.lastChild.innerHTML = "Join the Mousehunt<br>Chat room";
	
	arr[1].firstChild.href = "/forum/index.php?hgref=hgbar";
	arr[1].firstChild.target = "_blank";
	arr[1].firstChild.firstChild.src = "/images/ui/hgbar/icon_forums.png"
	arr[1].firstChild.firstChild.nextSibling.textContent = "Forum";
	arr[1].firstChild.lastChild.innerHTML = "Take part in discussions<br>with your fellow players.";
	
	arr[2].firstChild.href = "/news.php";
	arr[2].firstChild.target = "_blank";
	arr[2].firstChild.firstChild.src = "/images/ui/hgbar/icon_offense_appeals.png"
	arr[2].firstChild.firstChild.nextSibling.textContent = "News";
	arr[2].firstChild.lastChild.innerHTML = "News and updates<br>from ALL the TIME !";
	
	arr[3].firstChild.href = "/support.php";
	arr[3].firstChild.target = "_blank";
	arr[3].firstChild.firstChild.src = "/images/ui/hgbar/icon_technical_support.png"
	arr[3].firstChild.firstChild.nextSibling.textContent = "Support";
	arr[3].firstChild.lastChild.innerHTML = "Support from devs<br>for FREE !";
	
	hgdropdownitem = support.firstChild.cloneNode(true);
	hgdropdownitem.className = "hgDropDownItem first";
	hgdropdownitem.firstChild.href = "/livefeed.php";
	hgdropdownitem.firstChild.target = "_blank";
	hgdropdownitem.firstChild.firstChild.src = "/images/ui/hgbar/icon_forums.png"
	hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Live Dev Chat";
	hgdropdownitem.firstChild.lastChild.innerHTML = "Chat with the devs<br>on each friday.";
	support.firstChild.className = "hgDropDownItem";
	support.insertBefore(hgdropdownitem,support.firstChild);
	
	var arr = community.getElementsByClassName('hgDropDownItem');
	arr[0].firstChild.href = "http://www.mousehuntguide.com/mh-index.php";
	arr[0].firstChild.target = "_blank";
	arr[0].firstChild.firstChild.src = "/images/ui/hgbar/icon_game_rules.png"
	arr[0].firstChild.firstChild.nextSibling.textContent = "Spheniscine's Guide";
	arr[0].firstChild.lastChild.innerHTML = "Spheniscine<br>MouseHunt Walkthrough";
	
	arr[1].firstChild.href = "http://amhuguide.com/";
	arr[1].firstChild.target = "_blank";
	arr[1].firstChild.firstChild.src = "/images/ui/hgbar/icon_fan_page.png"
	arr[1].firstChild.firstChild.nextSibling.textContent = "AsiaMHU's Guide";
	arr[1].firstChild.lastChild.innerHTML = "AsiaMH Union<br>MouseHunt Guide";
	
	arr[2].firstChild.href = "http://mhwiki.hitgrab.com/wiki/";
	arr[2].firstChild.target = "_blank";
	arr[2].firstChild.firstChild.src = "/images/ui/hgbar/icon_hitgrab_store.png"
	arr[2].firstChild.firstChild.nextSibling.textContent = "Hunter's Wiki";
	arr[2].firstChild.lastChild.innerHTML = "This is<br>Mousehuntpedia";
	
	//move announcement to the Larry hunting tips
	var huntingTips = document.getElementById('huntingTips');
	var tickers = document.getElementsByClassName('ticker');
	var tickerlist = document.createElement("ul");
	if ((huntingTips != undefined) && tickers.length != 0) //if there are Larry around then he will announce it for us ^_^ or if there are something  to announce
	{
		huntingTips = huntingTips.getElementsByClassName('content')[0];
		var newHuntingNode = null;
		newHuntingNode = document.createElement("p");
		newHuntingNode.innerHTML = "_______________________________________________________<br>ANNOUNCEMENT:";
		huntingTips.appendChild(newHuntingNode);
		for (i = 0;i < tickers.length;++i)
		{
			newHuntingNode = document.createElement("li");
			newHuntingNode.innerHTML = tickers[i].innerHTML;
			tickerlist.appendChild(newHuntingNode);
		}
		tickerlist.style.listStyleType = "disc";
		tickerlist.style.marginLeft = "20px";
		huntingTips.appendChild(tickerlist);
	}
	
	//remove some others elements
	tmp = document.getElementById('hgbar');
	tmp.removeChild(document.getElementById('appRow'));//remove the appRow (Inbox,play,Free gift...)
	tmp.removeChild(document.getElementById('newsRowHolder'));//remove the News
	
	//==========Change the container (main page) of mousehunt==============
	var container = document.getElementsByClassName('container')[0];
	var containerclear = container.getElementsByClassName('clear');
	if (containerclear.length > 0) container.removeChild(containerclear[0]);//remove the like button in the bottom of the pages
	
	//=======gameinfo changes=======
	//add Golden shield expires day (more obvious)
	document.getElementsByClassName('gameinfo')[0].firstChild.lastChild.innerHTML = "<span style='font-weight: bold;'>LGS:</span> <span id='UOP_LGSTimer' style='color: #3B5998; font-weight: bold;'></span>";
	O_LGSTimer = document.getElementById('UOP_LGSTimer');
	
	//=======NAVIGATOR changes======
	//move camp and marketplace button
	var campbtn = document.getElementsByClassName('campbutton')[0];
	var donationarea = document.getElementsByClassName('donatebuttonarea')[0];
	campbtn.parentNode.removeChild(campbtn);//move the camp button to donation area for moving easier
	donationarea.insertBefore(campbtn,donationarea.firstChild);
	
	document.getElementById('hornArea').style.marginLeft = "101px";
	
	//nav num:
	var navnum = 'nav1';
	//on the last version, we can't make button friend go a bit far because of the limit of list but
	//on this version, we will change the travel button into campbutton, so it look like the camp button moved back to it place
	//and camp button (on the right side) to friend button and have the toggle animation so it look like the old friend button
	//and so we just hide the friend button
	////change camp => friend
	campbtn = document.getElementById('campButton');
	campbtn.id = "btn-friend";
	campbtn.parentNode.setAttribute('onmouseover',"toggleNavCategory('" + navnum + ".friends', 'visible');");
	campbtn.parentNode.setAttribute('onmouseout',"toggleNavCategory('" + navnum + ".friends', 'hidden');");

	////change travel => camp
	var travelbtn = document.getElementById('btn-travel');
	travelbtn.className = "navitem";
	travelbtn.id = "campButton";
	////change their href
	travelbtn.href = campbtn.href;
	friendbtn = document.getElementById('btn-friends');
	campbtn.href = friendbtn.href;
	
	//combining friend & team & add scoreboard from lore
	var teamnav = document.getElementById(navnum + '.teams');
	var teamnavarr = teamnav.childNodes;
	var friendnav = document.getElementById(navnum + '.friends');
	var friendnavarr = friendnav.childNodes;
	var lorenav = document.getElementById(navnum + '.lore');
	var lorenavarr = lorenav.childNodes;
	for (i = 0;i < friendnavarr.length;++i)
		if (friendnavarr[i].firstChild.textContent == "Invite Friends")//remove invite friend
		{
			friendnav.removeChild(friendnavarr[i]);
			--i;
		}
	for (i = 0;i < teamnavarr.length;++i)
	{
		if (teamnavarr[i].firstChild.textContent == "View Team")
		{
			friendnav.insertBefore(teamnavarr[i],friendnav.firstChild);
			--i;
		}
		else if (teamnavarr[i].firstChild.textContent == "Tournaments")
		{
			friendnav.appendChild(teamnavarr[i]);
			--i;
		}
	}
	friendnav.appendChild(lorenavarr[0]); //add scoreboard from lore
	
	//add Mice to inventory
	var inventory = document.getElementById(navnum + '.inventory');
	var micepage = inventory.lastChild.cloneNode(true);
	inventory.appendChild(micepage);
	micepage = micepage.firstChild;
	micepage.href = document.getElementsByClassName('navitem micebutton')[0].href;
	micepage.innerHTML = "Mice";
	
	//remove the following button, it will be replaced on a different place: Donate, travel, mice, lore, forum, friend
	donationarea.removeChild(document.getElementsByClassName('donatebutton')[0]);
	var mainnav = document.getElementsByClassName('navitem lorebutton')[0].parentNode.parentNode;
	friendbtn.style.display = "none";	//mainnav.removeChild(document.getElementsByClassName('navitem travelbutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem shopsbutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem micebutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem lorebutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem newsbutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem forumsbutton')[0].parentNode);
	//fix the dropdown
	//document.getElementById(navnum + '.shops').style.left = "308px";
	document.getElementById(navnum + '.inventory').style.left = "213px";
	document.getElementById(navnum + '.friends').style.left = "645px";
	
	//======HUD change======
	var hud_base_parent = document.getElementById('hud_base').parentNode.parentNode.parentNode;
	hud_base_parent.parentNode.removeChild(hud_base_parent);//remove the base. It does not necessary because the content showed that

	var hud_bait = document.getElementById('hud_baitName').parentNode;
	var hud_gold_list = hud_bait.parentNode;
	//hud_gold_list.removeChild(hud_bait); //remove the bait
	hud_bait.style.display = "none";
	hud_bait.removeChild(hud_bait.lastChild);
	
	var hud_team = document.getElementById('hud_team');
	if (hud_team != undefined)
	{
		hud_team = hud_team.parentNode;
		hud_team.parentNode.removeChild(hud_team); //and remove the old team list
		hud_gold_list.appendChild(hud_team); //move the "Team" information to the place of the bait we had just removed
	}
	
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if ((tabbar.length > 0) && atCamp)
	{
		travelToTabBar();
		shopToTabBar();
		potToTabBar();
		craftToTabBar();
		supplyToTabBar();
		giftToTabBar();
		
		//hide daily & part of friends
		tabbar = tabbar[0];
		tmp = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive');
		tmp[0].style.display = "none";
		
		var friendtmp = document.createElement('div');
		friendtmp.id = "UOP_friendsOnlineCampTab";
		friendtmp.className = "bcenter";
		friendtmp.textContent = "Friends";
		tmp = document.getElementById('friendsOnlineCampTab');
		tmp.style.display = "none";
		tmp.parentNode.insertBefore(friendtmp,tmp);
	}
	
	if (location.pathname.indexOf("/inventory.php") != -1)
	{
		var script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.innerHTML = UOP_useCustomConvertible.toString();
		document.head.appendChild(script);
		updateSpecial();
	}
	
	if ((C_disableExperimental == 0) && (location.pathname.indexOf("/trade.php") != -1))
	{
		var tabpage = document.getElementById('tabbarContent_page');
		var tabdiv = document.createElement('div');
		tabpage.parentNode.insertBefore(tabdiv,tabpage);
		
		var inputLabel = document.createElement('label');
		inputLabel.textContent = "Trade ID: ";
		tabdiv.appendChild(inputLabel);
		
		var inputBox = document.createElement('input');
		inputBox.id = "UOP_inputTrade";
		tabdiv.appendChild(inputBox);
		
		var inputButton = document.createElement('button');
		inputButton.textContent = "Buy";
		inputButton.addEventListener('click',tradeBuyID,false);
		tabdiv.appendChild(inputButton);
		
		var slot = document.getElementById('itemTradeSlots');
		var header = slot.getElementsByTagName('h1')[0];
		if (header != undefined)
		{
			var strurl = slot.getElementsByTagName('a')[0].getAttribute('href');
			var begin = strurl.indexOf('itid=') + 5;
			var end = strurl.indexOf('&',begin);
			var tradeid = strurl.substring(begin,end);
			
			strurl = document.createElement('h2');
			strurl.textContent = tradeid;
			header.parentNode.appendChild(strurl);
		}
	}
	
	//precious title advancing
	O_titleBar = document.getElementById('hud_titlebar');
	O_titlePercentage = document.getElementById('hud_titlePercentage');
	
	//detailed timer
	O_oldHuntTimer = document.getElementById('huntTimer');
	O_huntTimer = O_oldHuntTimer.cloneNode(true);
	O_oldHuntTimer.style.display = "none";
	O_huntTimer.id = "UOP_huntTimerParent";
	O_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt: </span><span id='UOP_huntTimer'></span>";
	document.getElementById('hornArea').appendChild(O_huntTimer);
	O_huntTimer = O_huntTimer.lastChild;
	
	//location timer
	var headsup = document.getElementById('hud_statList1').parentNode;
	var headsuparr = headsup.getElementsByClassName('hudstatlist');
	var locationTimerParent = document.createElement('div');
	locationTimerParent.className = 'hudstatlist';
	headsup.insertBefore(locationTimerParent,headsuparr[1].nextSibling);
	locationTimerParent.appendChild(document.createElement('ul'));
	locationTimerParent = locationTimerParent.firstChild;
	locationTimerParent.id = "UOP_locationTimerParent";
	
	var locationTimerObject;
	O_locationTimer = new Array;
	for (var i = 0;i < 3;++i)
	{
		locationTimerObject = document.createElement('li');
		locationTimerParent.appendChild(locationTimerObject);
		locationTimerObject.innerHTML = "<span class='hudstatlabel'>" + C_LOCATION_TIMES[i].name + ": </span><span id='" + C_LOCATION_TIMES[i].id + "'></span>";
		O_locationTimer[i] = locationTimerObject.lastChild;
	}
	document.getElementsByClassName('gameinfo')[0].firstChild.firstChild.innerHTML = "<span style='font-weight: bold;'>" + C_LOCATION_TIMES[3].name + ": </span><span id='" + C_LOCATION_TIMES[3].id + "'></span>";
	O_locationTimer[3] = locationTimerObject.lastChild;
	
	//New bait number location
	var baitnum = document.getElementById('hud_baitIcon').parentNode;
	baitnum.insertBefore(document.createElement('div'),baitnum.firstChild);
	O_baitNum = baitnum.firstChild;
	O_baitNum.id = "hud_baitQuantity";
	
	if (atCamp || (location.pathname == "/journal.php"))
	{
		//mouse autozoom
		O_imageBox = document.createElement("div");
		O_imageBox.id = "UOP_imagePhotoZoomBox";
		O_imageBox.innerHTML = '<img id="UOP_imagePhotoZoomPhoto">';
		O_imagePhoto = O_imageBox.firstChild;
		O_imagePhoto.addEventListener('load',moveImageBox,false);
		document.body.appendChild(O_imageBox);
		
		registerSoundHornWaiting.push(updateJournalBox);
	}
	
	//register callbacks
	registerSoundHornWaiting.push(updateHud);
	registerSoundHornWaiting.push(skinSecondTimer);
}
/*******************ADS AREA*********************/
function removeAds() {
	//remove mousehunt ads
	var rightCol = document.getElementById('hgSideBar'); //mousehunt ads
	if (rightCol != null)
	{
		while (rightCol.childElementCount > 1)
			rightCol.removeChild(rightCol.lastChild);//rightCol.style.display = "none";
		if (S_ads == 2)
		{
			rightCol.appendChild(document.createElement("div"));
			//~~~~I was left here
		}
	}
}
function addThings() {
	
}
/*******************AUTO AREA********************/
function initAuto() {
	manageCSSJSAdder(5);
	var autopanel = template.hgMenu.cloneNode(true);
	autopanel.id = "UOP_appAutoPanel";
	autopanel.addEventListener('click',autoChangeState,false);

	autopanel.firstChild.innerHTML = C_autopanel;
	O_playing = autopanel.getElementsByClassName('UOP_playing')[0];

	autopanel.lastChild.innerHTML = "<label id='UOP_autoPauseCounter'>Paused</label><label id='UOP_autoSounding'></label><div style='display:inline;'><label id='UOP_autoMainCounter'></label><label> + </label><label id='UOP_autoDelayCounter'></label></div>";
	O_autoPanel = autopanel.lastChild;
	O_autoPauseCounter = autopanel.lastChild.firstChild;
	O_autoSounding = autopanel.lastChild.firstChild.nextSibling;
	O_autoCounter = autopanel.lastChild.lastChild;
	O_autoMainCounter = O_autoCounter.firstChild;
	O_autoDelayCounter = O_autoCounter.lastChild;

	O_hgRow.appendChild(autopanel);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	
	registerSoundHornSounding.push(autoSounding);
	registerSoundHornSounded.push(autoSounded);
	registerSoundHornWaiting.push(autoHornWaiting);
}
function autoCoreInit() {
	A_soundingCounter = 0;
	A_soundedCounter = 0;
	A_autoPaused = Number(window.localStorage.UOP_autoPaused);
	if (A_autoPaused == 1) O_playing.className = "UOP_pausing";
	
	if (data.user.has_puzzle == false)
	{
		if (S_solve == 1) A_solveStage = 0; else A_solveStage = C_solveStage;
		window.localStorage.UOP_solveStage = A_solveStage;
	}
	else A_solveStage = Number(window.localStorage.UOP_solveStage);
	window.localStorage.UOP_puzzleReloaded = 0;
	
	genDelayTime();
	autoCoreAction();
}
function autoCoreDecide(nextTurnSeconds,nextDelaySeconds) {
	//0 = PAUSE; 1 = KR; 2 = MAIN COUNT; 3 = DELAY COUNT; 4 = HORN; 5 = TIME OUT BUT HORN IS NOT READY
	if (A_autoPaused == 1) return 0; //paused
	if (!atCamp) return 0; //not on camp
	if (data.user.bait_quantity == 0) return 0; //no bait
	if (data.user.has_puzzle == true) return 1; //KR
	if (nextTurnSeconds > 0) return 2; //still counting
	if (nextDelaySeconds > 0) return 3; //count is done, delaying
	if (O_hornButton.parentNode.style.display == "none") return 5;
	return 4;
}
function autoCoreAction() {
	var curTime = new Date().getTime();
	var nextTurnSeconds = Math.ceil((nextTurnTimestamp - curTime) / 1000);
	var nextDelaySeconds;
	nextDelaySeconds = (nextTurnSeconds > 0) ? (A_delayTime) : Math.ceil((A_delayTimestamp - curTime) / 1000);
	var autoState = autoCoreDecide(nextTurnSeconds,nextDelaySeconds);
	var delayTimeText,hornTimeText;
	
	if (autoState == 0) //if PAUSE then display pause message
	{
		O_autoPauseCounter.style.display = "block";
		O_autoCounter.style.display = "none";
		O_autoSounding.style.display = "none";
		if (screenshotSafe == 0) document.title = "Paused";
		return;
	}
	else if (autoState == 1) //if APPROACHING KR then call puzzleReaction core
	{
		puzzleStandardReaction();
		return;
	}
	else if (autoState == 2) //if (UPDATE MAIN COUNT) UPDATE MAIN COUNT
	{
		hornTimeText = formatMinute(nextTurnSeconds);
		delayTimeText = formatMinute(nextDelaySeconds);
		O_autoMainCounter.textContent = hornTimeText;
		O_autoDelayCounter.textContent = delayTimeText;
		if (screenshotSafe == 0) document.title = hornTimeText + " + " + delayTimeText; else document.title = hornTimeText;
	}
	else if (autoState == 3) //if (UPDATE DELAYER) UPDATE DELAYER
	{
		hornTimeText = "0:00";
		delayTimeText = formatMinute(nextDelaySeconds);
		O_autoMainCounter.textContent = hornTimeText;
		O_autoDelayCounter.textContent = delayTimeText;
		if (screenshotSafe == 0) document.title = delayTimeText;
	}
	else if (autoState == 4) //if HORN => HORN
	{
		O_hornButton.click();
		return;
	}
	else if (autoState == 5) //TIME OUT BUT NOT READY
	{
		if (((S_aggressive == 2) && (data.user.viewing_atts.hasOwnProperty('tournament')) && (data.user.viewing_atts.tournament.status == "active")) || //if: aggressive in tour AND joined tour AND tour is active
		(S_aggressive == 0))
		{
			O_hornButton.parentNode.style.display = "block";
			O_hornButton.click();
		} else
			syncUser(autoCoreCallback);
		return;
	}
	setTimeout(function () { (autoCoreAction)() }, C_autoInterval * 1000);
}
function autoCoreCallback() {
	if (data.user.next_activeturn_seconds == 0)
	{
		O_hornButton.parentNode.style.display = "block";
		O_hornButton.click();
		return;
	}
	else
	{
		updateTimeStamp();
		genDelayTime();
		setTimeout(function () { (autoCoreAction)() }, C_autoInterval * 1000);
	}
}
function autoSounding() {
	++A_soundingCounter;
	if (A_soundingCounter == 1) //first time
	{
		O_autoPauseCounter.style.display = "none";
		O_autoSounding.style.display = "block";
		O_autoCounter.style.display = "none";
		O_autoSounding.textContent = "Sounding...";
	}
	else if (A_soundingCounter > 120)
	{
		O_autoSounding.textContent = "Refreshing !";
		refreshingByError = 1;
		location.reload();
	}
	else if (A_soundingCounter > 30)
	{
		O_autoSounding.textContent = "Too slow...";
	}
}
function autoSounded() {
	++A_soundedCounter;
	if (A_soundedCounter == 1) //first time
	{
		if (refreshingByError = 1) return;
		O_autoSounding.textContent = "Completed !";
		syncUser(null);
	}
	else if (A_soundedCounter == 50)
	{
		O_autoSounding.textContent = "New message !";
		syncUser(function () {if (data.user.has_puzzle == true) puzzleStandardReaction();});
	}
}
function autoHornWaiting() {
	if (data.user.next_activeturn_seconds == 0)
	{
		++A_hornRetryCounter;
		if (A_hornRetryCounter > 1)
		{
			O_autoSounding.textContent = "Error, refreshing...";
			location.reload();
			return;
		}
	}
	else A_hornRetryCounter = 0;
	O_autoPauseCounter.style.display = "none";
	O_autoSounding.style.display = "none";
	O_autoCounter.style.display = "block";
	autoCoreInit();
}
function genDelayTime() {
	var delaymin = S_delaymin;
	var delaymax = S_delaymax;
	if (((S_aggressive == 2) && (data.user.viewing_atts.hasOwnProperty('tournament')) && (data.user.viewing_atts.tournament.status == "active")) || //if: aggressive in tour AND joined tour AND tour is active
		(S_aggressive == 0))
		delaymin = delaymax = 0;
	if (data.user.next_activeturn_seconds == 0)
		delaymin = delaymax = 3;
	if (delaymax > delaymin) A_delayTime = Math.floor((Math.random()*(delaymax - delaymin))+delaymin);
	else A_delayTime = delaymin;
	A_delayTimestamp = nextTurnTimestamp + A_delayTime * 1000;
}
function autoChangeState() {
	if (A_autoPaused == 0)
	{
		window.localStorage.UOP_autoPaused = A_autoPaused = 1;
		O_playing.className = "UOP_pausing";
	}
	else
	{
		window.localStorage.UOP_autoPaused = A_autoPaused = 0;
		O_playing.className = "UOP_playing";
		O_autoSounding.style.display = "none";
		O_autoPauseCounter.style.display = "none";
		O_autoCounter.style.display = "block";
		autoCoreAction();
	}
}
function loadSettingKRimage() {
	var imageLoadStr = C_canvasMode[inCanvas] + '/puzzleimage.php?t=' + new Date().getTime() + '&snuid=' + data.user.sn_user_id + '&hash='+data.user.unique_hash;
	document.getElementById('UOP_loadKRimage').src = imageLoadStr;
	
	var len = S_settingGroupsLength[0] = 461;
	O_settingGroup[0].style.height = len + "px";
}
function alarm() {
	if (S_alarm == 1)
	{
		A_audioDiv = document.createElement('div');
		A_audioDiv.innerHTML = "<audio controls autoplay loop><source src='" + window.localStorage.UOP_alarmSrc + "'>Upgrade your browser please....this is HTML5</audio>";
		O_hornButton.parentNode.parentNode.insertBefore(A_audioDiv,O_hornButton.parentNode);
	}
	else if (S_alarm == 2)
	{
		A_audioWin = window.open(window.localStorage.UOP_alarmSrc);
	}
	
	if (S_alarmStop == 0)
	{
		setTimeout(function() {
			switch (S_alarm)
			{
				case 1: A_audioDiv.firstElementChild.pause();A_audioDiv.parentNode.removeChild(A_audioDiv);break;
				case 2: A_audioWin.close();break;
			}
		},S_alarmStopTime * 1000);
	}
	
	if (S_alarmNoti == 1)
	{
		if (window.webkitNotifications)
		{
			var havePermission = window.webkitNotifications.checkPermission();
			if (havePermission == 0) { // 0 is PERMISSION_ALLOWED
				var notification = window.webkitNotifications.createNotification('http://www.mousehuntgame.com/images/items/stats/272be17ea6205e914d207e1ccac5bbc3.gif','Toe toe toe!','Có King\'s Reward kìa em ey');
				notification.onclick = function () {
					notification.close();
				}
				notification.show();
			} else window.webkitNotifications.requestPermission();
		}
	}
}
function KRSolverCache() {
	--A_solveStage;
	window.localStorage.UOP_solveStage = A_solveStage;
	if (S_cacheKRstr != "")
	{
		submitPuzzle(S_cacheKRstr);
		window.localStorage.UOP_cacheKRstr = S_cacheKRstr = "";
	}
	else puzzleCoreReaction();
}
function KRSolverOCR() {
	--A_solveStage;
	KR_initKR(KRSolverOCRCore);
}
function submitPuzzle(str) {
	var url = C_canvasMode[inCanvas] + "/managers/ajax/users/solvePuzzle.php?puzzle_answer=" + str + "&uh=" + data.user.unique_hash;
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var tmpRespondJSON = JSON.parse(request.responseText);
				document.getElementById('pagemessage').textContent = tmpRespondJSON.result;
				location.reload();
			}
			else
			{
				document.getElementById('pagemessage').textContent = "Network error, retrying";
				puzzleSubmitErrorStr = str;
				puzzleSubmitErrorHash = data.user.unique_hash;
				submitPuzzleErrorHandle();
			}
		}
	};
	request.send(null);
}
function submitPuzzleErrorHandle() {
	switch (puzzleSubmitErrorStage)
	{
		case 0: //initStage
			puzzleSubmitErrorStage = 1;
			syncUser(submitPuzzleErrorHandle);
			break;
		case 1: //userSynced, let's try again
			puzzleSubmitErrorStage = 2;
			submitPuzzle(puzzleSubmitErrorStr);
			break;
		case 2: //already, but our hash changed, and we don't have reset the stage, if KR solved, the page will reload and the stage will be zero again
			location.reload();
			break;
		defafult: break;
	}
}
function puzzleCoreReaction() {
	switch (A_solveStage)
	{
		case 2:KRSolverCache();break;
		case 1:KRSolverOCR();break;
		default:alarm();document.getElementById('puzzle_answer').focus();
	}
}
function puzzleStandardReaction() {
	if (A_puzzleCalled != 0) return; else ++A_puzzleCalled;
	
	O_autoPauseCounter.style.display = "none";
	O_autoSounding.style.display = "block";
	O_autoCounter.style.display = "none";
	O_autoSounding.textContent = "King's Reward";
	document.title = "King's Reward";
	
	if (document.getElementsByClassName('puzzle').length == 0)
	{
		if (window.localStorage.UOP_puzzleReloaded == 0)
		{
			window.localStorage.UOP_puzzleReloaded = 1;
			location.reload();
		}
	}
	puzzleContainer = document.getElementById('puzzleContainer');
	document.getElementById('puzzle_answer').addEventListener('change',puzzleUserSubmit,false);
	puzzleCoreReaction();
		
	O_autoCounter.style.display = "none";
	O_autoPauseCounter.style.display = "block";
	O_autoSounding.style.display = "none";
	A_puzzleTimeout = new Date().getTime();
	puzzleCounter();
}
function puzzleCounter() {
	var nextTimeoutSeconds = Math.ceil((new Date().getTime() - A_puzzleTimeout) / 1000);
	var timeText;
		
	timeText = formatHour(nextTimeoutSeconds);
	O_autoPauseCounter.textContent = timeText;

	setTimeout(function() {puzzleCounter()},C_autoInterval * 1000);
}
function puzzleUserSubmit() {
	var linkElementList = puzzleContainer.getElementsByTagName('img');
	var tmp = document.getElementById('puzzle_answer');
	if (tmp != null) tmp.removeEventListener('change',puzzleUserSubmit,false);
	if (linkElementList.length > 0)
	{
		var i;
		for (i = 0; i < linkElementList.length; ++i)
		{
			// check if it is a resume button
			if (linkElementList[i].getAttribute('src').indexOf("resume_hunting_blue.gif") != -1)
			{
				// click the resume button
				var resumeElement = linkElementList[i].parentNode;
				resumeElement.click();
				
				// reload url if click fail
				setTimeout(function () { location.reload(); }, 6000);
				
				return;
			}
		}
	}
	setTimeout(puzzleUserSubmit, 1000);
}
/*******************KR SOLVER AREA*******************/
var KR_turn = 3;
var KR_canvas,KR_canvas2;
var KR_context,KR_context2;
var KR_n=58,KR_m=200;
var KR_dx = [-1,1,0,0,-1,-1,1,1];
var KR_dy = [0,0,-1,1,-1,1,-1,1];
var KR_samplechar="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var KR_sampleimg=[
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAIAAABnia+1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF1SURBVEhLrVZRdQMhEMRITURDHNRBFURBFMRAHdRBDFRCFdRBFCSTwOMNwy3sLZm3Hwfc7Vtmh+GSBz8p3bs4lMV34NZlR5zL4jK+utQ5/sr6Mjb5yfEGlj7ajKiah9/lrQWc2owo+Z+GeF7FL6XLpKPqOoP4fE0GgXo5V5bNsZ1Eh+JARs5VW8osQcFxcEvBVcWF5hHQcQRCBbpdIdRdy/ROSDOhV4boVVZdYKL7GqU9vD8XxB56loWl3bbB9mDpBNuq7yCqxuYAoWyfltLlkENaXsiXlgrFpnbYBu99/JmwBGXPIXWN/VK04DJX0d+0KO6Wyzb4BHloletoYhub9jmGsDQxV7GHWIxsg+0hHKZtiH2GwzRXaddKbNsGC86swoCIe0MdIoa99js3Vzn0gQtErqDmhIo9TLRsQFhqbMNpn2OMzJX/rlx+YkB4Lv9k0p8YPxnCREkl3MX4yRCWChlsDyv8ZAhLT7nz2HVjDCEsXVN6ACLkjIElwD1XAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkCAYAAACXOioTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAG3SURBVEhL1Zc9OgUxFIbnWgArUKh1GgolhdoOPBZgBVZgCRagUWuUPPSsABuwAt5vMrmSkzNu7sgUvsc7k8nJPWfy40yy+Oo6/tbXO7zBBzzD7VA3KgVqxQ3sQXBr4Or+aCqfcAqzBxIKdgRpIHeOFsN9TAxPtwO7cA7bYPUIh6EYpECWUF0HQfq54aFAtmXb1BBJHdUghxouHjLSudrg8mdpWb+E4qiaBKrRrIEYzh+lYxoJ1etBlsh86Dm1N+nRGdglfj3cl4pvkBKq69DKsitOy71oK4OlaGTQf/0FPAAVGW4QwbVoPAX1iiGkOAJX94dTUA/V0ywjRNSgNW7vonEOsvlKDZHsTX5BK05vLoderhNX0Le3BmEd1qB5uQMeCvpvk2fwHNXiBeuH0FYKz0Et2jNQKH26lX/kFShkzJK9CVRolkDa61n97w/fwXBPNWm7tUr6sm6G4lLNe0RSLYL0e/J0CUZC9fooA3ip6BLUojB4Tlahz4MXJO4dJs8RCbXbgn04AbtniDqGexVi5Naod+plCAGpsRVKQfY00TSQ5iPrRcLko6Wko4mko+UT6Hjpq+u+AYsErfq7OZKxAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmCAIAAABce7w1AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAYFJREFUSEvtlmF1wzAMhEWkJIqhDMpgCIZgCEpgDMagBAphCMagCNavSV6iXNTYTtV/vXc/8hz5LMmyZStiZ/Zp9m12Mbua/Tv+doMns+NgWw0mnOda68T4Y5j6GIfOHZlZyb8uSmINwA+x3kA8U5BTMYKkmHGC3Q9Wd/BNxkg0GRd7qNJfCwtEmRxH58AyP/OJM2lc8P8g7pD0erDAuEOTNH6R/lEUolt0NkQf+iRN1F6XPDT5K2AuhThAzgIr5UCqjWW2pSKAHLk0l4HXhb54n4LUHHWSBjkm084+Dym7zETLHlItaRiPZs/mS30Fb2mBSJebWz1eWHxyZGgWaXjhQQdeGqZdT0B2kuadBkl3ZitAyEvDzDqRVwRMa7s4Lp2XUtmWFg4dUuzfhOXTCfUm33FlvKJn0mCZFkjei+5Tr5j5uFUahOrMYZxIfRDIcdxQlNrtGUiDUL2VD3ssDsoTsJ74W76Z6ZPh2zlkn7S2kiWnFA/TcEcKlBEC52+gaHYDN7FgyyMcfVMAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAbxJREFUWEftmD1OxDAQhb0cAC4ABwA6qKCGgpobcAIQPVyAgpYrcAyEEBUNfz1wAbjA8h62o5mxo42d9SIhRvt5HI8zk804jp3J1Dn8hss7ePNVdw8+wA14YEOJMPA8eAJnYA14tzNAmXVUyye4ADMvAGXWwViQjukeyAYF2RxPgs7JYdA7YBPsgmU29MgJuPRVLQxs8c3DOQb8hzjIQntyHg2WpNNAOLiYYxwk4E5BCaJBojoUwrzmgrNNDThpjEhHNfQFvwJdP2mISCe1HAFUErbATx9rINZJLbcAFUX3r62BWAe1cEChouDop634OS4VzusYVEr2wZKvtpO7oKVw0mke+CVoKRugeeDnoKWsguaB++Q/8MLk7wa2kweFI7154PWgpbyCX5kyt1kwsMU3j4fvZVQUXAbT1vRWnwYt5Tpohk+uyjePI/dKVMsfayTWSSlcZeSWPlwMdv2kISKdlMK8Mo84UMTcdkSDRHUogOusvhVmsquIRonqMAAGzK2vIrTbc4qfY1y5WwHcvvCFfgD6tjBf4BwM3sLMA+Y0ub0SlNkTa2E+F7pNLd2YF3+KYN4efXXEpwjnvgEY0mquPeUOfgAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAkCAYAAABixKGjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABHSURBVEhL7dWxCgAgCABR7f//uRocbwsD4R6B2w0Oljvivh6rZou5cdx51nzlzpFxZBx5FdH/nXsVjSPjyDiaG/cnQo3xiAPUzwo8wIxIqwAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAkCAYAAABixKGjAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAFBJREFUSEvt1LEKwCAMANGk/+83WwsVhN5WM7TcQ3G7IWCyR4xT47jfEj+Kt3Fz03XmyDgyjrZvxetnTs4cPeJvt+LKmSPjyDgyjoyjr8YjTvGkBX/pOnWTAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAYAAAClI5npAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAjFJREFUWEfFmDtOxDAURUN6YAOwAT4NBd8WIXqE6FkBK2AFCGp2QEPNtwSEKKiAFglEz2cBcK7HmXE8L2Q0JOZKJ3EcJ362n53njGRZ9g0DaxWWYQomYBbGINQrvMAjvMENXEKVZMCvTMIu8NJvMoZCzx7BBkTv78sosQcfwEVjyJgdUMOoo79SMQcPwEVrqGGmD2icjyEe20LXcA4a4zvQmBeiVdk8TMMSyF+q3lNIBnSh8souPwH1TPxMHdtwBVz0wf1eQY2JVbnyNGZh2WGQA8bDSn6vgGWlKlevhOX+ihybhIPrTqa6qcgMUX5RpknUKM0G0p0Ma44fQnG/RezWq+v9PG2VnEO2pkMkVq3S9GpTpuc37XiVqCJSJbxzJCGf4RhLK1wq5fqkxkpqgNbsWE/+nEL5qE+EwimTyU3D/1QjBvCRsV18AP6/B758IpSCilTKrSlnTc22lH/6RKhFfx5UCt8U29WhUC6W2QOK9VMpl/WxFETKs1PIzYJTlyxr05/bljPgzCXL2gIi4CRya4IVkikML+43gRX0dheifX8OtQ7sCVuXs05UbcWa2BMIqwfI7xWwoqMCxfJh2WGoNUCotbphoR4ytte1aDun7b0Ve2qBUqGSMCI76CRNKVrGQd0G9RnuIZTWkHFYgBWwgp5QMqAPtdSyuElKOyMLbUy0O+KiUaI/JeVKLTSGMsRaKwZFa0rwV6SL6QO/iZlS+5NKH7h3uAUFuBdg77Ky7AcxfmJvb+4ssAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAkCAYAAAB4+EEtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAEhJREFUWEft1bEOABAMANHW//8zHSzC5pjuRdKtN0jIHlFnlXPe2JaWNucXxhDGEMYQxhDHV/8V7wzhT40whjCGMIYwhjAGiBjgIwhAKtJoqAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAkCAYAAABWvWC/AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAENJREFUSEtj/M/AAETkASYoTRYYQM2MQAIZhwAxOugFYnR1IDxU/QylyQKjmkkEo5pJBKOaSQSjmkkEQ1TzyKufGRgADjkFLSobN6UAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAlCAYAAABPsblCAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAMZJREFUSEvtlsERwUAYRjfuSqABNycFMOOuERpQATOuatCCq1EAGtABDcj7NpHZFZmNOBjsm3nZzebPtzt/LkmMMTf0KC0EWGIrm77PlwSpcVWqH8/4tx41IQaFiUFhYlCYGBTmR4P2+LkTDfLR5ZKP+vmoZR+ZeBJin6FfXGUHj8iN5xptzYKLCrQwQe3qBgxxjmfUi646TVGvoMeCuk7xvmHjrzbDVTa1vBy0wxG6ISJRD8ZMetjGLtLYgise8IQb3GIZY1JTXXh2X3uCmAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkCAYAAACaJFpUAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAapJREFUWEe1lV1RxTAQRjsIwAEm0IADHKAABSjAAA544RkDSMAICsp37pBOvmbT5ufSmbOTJtmc3t5suqzLsuZ8iWWSZ6FGAf3MsM5Z4aEM9gMzwgfxI3RjbDLIB2BUWJO9C5ubBhIjwmYZMJDTK7wT30I3RigDRZvYI+yWgaJNbhXWZPQxFuVcULSEVuGnUMM4lYGiJbUIeWVqGE0yULTEM+GUDBQt+Uj4ItQwKAfKIpofomgL1ITRkdUtA0VbJBJeTQaKttBe+CjSWGJYBoq2WC6sHVl2GPeiaIsl4b/IxI1CcWmLLx/i9nLnV9TXdUlrv4Cagn1/zlVfaQtX3TQ5/FJ2afRfDksVi8UgP66e/vr2dB1pCcViIZ7+XuQTo+KHbqmiLXD0qt6EGgWHH9w9ipZcO0sT0dcCmqWKlngmhFrZNJWLoiW1CPnPalI2WJSzoWgJLUJgUw2Vi6IltAqhdt5Gu3xD0Sb3CKG7RhnM6RXCUY0W8xnIGRHCq1CjoCiXNJAYFUKtRnmYbV4+ADNCIF+Ngq1G9wOzwqMa5cvDLOucFQLSuFyW9RcqrlUhkaOvtAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAkCAYAAABixKGjAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAEZJREFUSEvt1qERACAQxMCD/suCuuBxiEhw2ZlDRqA+K1n3Ri2P1uv5xjgyjowj48g4Mo6MI+PIODKOWh3S55Z+btb8c5Bs7hIeslr1hMgAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAkCAYAAABxE+FXAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAbZJREFUWEftlv9NwzAUhFP2YAlWYQMmYAImYAE2YAMWYAQmYAMmKPdJeZXf+cVORaX+QS19rnNnxbn4R7ocl+VY8SiWC/Au1CihR2l8iupm53AvfoQuSuhVGvDX9K9CjU3oVRrwIaqb7mWUGuhVGsGDqG4841moMYSeSWCu22sWTHXzGd9CjSH0TALz7Nq56T21BwronQXhT31ueh/sya4DemdBVPPFtvFBKvzNEQS91QKcLKx4erZNeCPYIWqcIAh6qwU4WVjx9GybWXrWhhonIjW0eoCThZXqdJql96M0UkOrBzhZaPATapTeU3vf1gtwstBQpW/TtPiD+lsKvQUnC8abQA/aeQz8Ias3FF4LThYMf53g6V9EeMADtz6gOzhZKPCF5Ol9W1YnIrqDk4WCUXrfklunoaoOnCxs4IfHl0DfkxpUdeBkYYPqg+MrfPQNUNWBk4UBW1+nYPTPR1UHThYGVOmD2X8+VR04WZjgcxyMUoOqDpwsTPDVDbPUoKoDJws78PRbR26Lqg6cLOygTe8HzhaqOg5UMk/lsP5euqRB1nK3/l6l3Aa/SrkNfpXyXwdfll86AM9vpd0EAAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkCAYAAACaJFpUAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAVZJREFUWEe1lrtNBEEQREcEQAZEgIeHCOMMIsDmI8A569xDfF0SAON8EsAlCYiABI4qdd9qNdszszPTPKnULa3xVKvVqsM2hG0qb0hozALBMskeHiY5RY5kdSMrJC86vSgKTxC8HjcmwnedYy51ejAR/iCx1LOl+UrXOsd4tTSFX8h/tUx+NDfIr6wDK509JIXfyKusA4fIhazNJIXkGYlbXulsJSu0Wh4gPS2zQuLdsij0blkUkmuE4jFsSXEts4TkQecOys5lrWK28AmJW54htS1nC0ncch+pbVkl9GhZJSS9LauFbPkp60BNy2ohedS5gy3vZC3SJNwgccu5B1eTkMQtya3OHM3C1pbNQtLSskvIlh+yDpRadgnJUueY3PHcLUwdXMeyTugWEuus5M/AwkVoteTPwMJFSKyWFm5CtryXNYubkFgHV4yr0Dq4YlyFJN8yhD8esVy7lhSoYwAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAmCAYAAABK4fLXAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAgdJREFUWEftmMtNAzEURQcXgCgAGgCxYQMSEitYILGjAyqgAiqgATas6YEtSLBBSHwKAAoAGgj3ZuyJP9dJZuJJsuBKJ37jjD3Pz5+xZ6WqqgGYqB1wAPbAOtgHvj7BB3gDj+AatBGdyHIK7gAuWvEDrsAGUPVGyMwBWt7p4TF05hKoZ3ikmWeAhXFRDDZoTFTCjHMAQ+JCTCcZKb/cIWDZcdF7BRlHRhesCIaEIZ2yf4f18IG4SGC+KFMbfABGd1KIrWelXoGpuQEwEsQYqQ2GGUbALA44co5E3VlnuD99LoB3Y2dU19A57x4dBQ4w76aZ4FoDI8GLhp6OLOgqKYGaNc3YUF5ygMaVzAqnNYyAZqbQm/hPdk9cSQnwk8BZafhCisUXUB+6t6mvI2C2azvQs01L68GmvjaBWa3tQE82La1fm/ritsDU5kjcD/QlVbd04tum81TixCL074RT4sSaTeepxIktm/YhVfcXMGruYintRWpNGjrxUtuBuJT2IfWKeAdGLSC7Ni2t+MBE3QKjXlbHNi0pvMoTMQA8uVEL29R428cl2d4txUaXqGiQuW35CbdZamwwr+v4aH34Ibm+I22OgawndwzMjLUwY9KBmK1TB2I+mGNIzQIHHcs0JM1c+KcBB1s6rlVtEGMgRmY2MMxdnHFdF3ebotWHsxPALXrZD2dV9Qe62iLMlKsjZwAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAkCAYAAABixKGjAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAASlJREFUSEvtlT1OwzAYhg07R+ASbOxIMLBxA07QhZV79AZd2JBAiLGIAyDUHU4APQB93jiJ/FtiHKbkVZ/82M7TNI0/H/wYw2d4XmAL7/AIz5CN5DV8wAKsKoBt8qJS1nAC/yIXX3AGWfmVGjPozq5hCRLRGKHHdAzNNWHnPrmLBCvgJELtzbiwY6i8I/cF+pWHDKjKDXzaQy+XUC2X+MEeejmFarny1O7dHMEo8lwmLuedj6LiNor8vN27eYVqOZPOXNhDL/fahDOrZIaqBKiWcOJRPf01LiVWQetLb9iZk+su1XcLqt00JvEWDrejlmhF6jpq0KNQnffEQp1/RVL9ef3iEFC0+n/DG2jl38AdpMptH8ldSl7F35h44cplliczy5OZ5YkYswM0BfPZtjWgzQAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAuCAYAAABNhcu5AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAp9JREFUWEftmT2S1DAQhY1y4ARsFSkUCQlQmxJszgngBJyAjIwLcAMSMqrYA0DxE2yyCylVwAWAAyzvjVs7LenJM/LIswS8qm/U7pHtVluSpZkrwzCcg630CDwA98EBuAG83oM/4AN4A05AixhIFdzs/AX4BeBo4h14AtR1BdK54hmYE0AOA3oI1D0cpZNZeAtw0A026ClQ9zNSB4M4AziQsHXMFPoLDtPz6HsJprI4EUzqqGWCweU3n4L9Coak0m/WB2wpjIJXwNfbFvYLlR36mMGs/mjcBeqkuUFEasGI644Gv4CR8B2IyJvho4BRwMa7euPN4peelj6xCXZyGAlZVnTf4Imu0s6wUTASsr6io90w5mehpoU4ggI+hkN+ZHptZU8dW+l1z8qAlBX6An6MZlfxZZgrJiHcNsMLKVxEKsvx/uGaGV4/rVxCv630wjDWGflq5RI6tdLrJghXRzsRhtXetRo1/4L+B5JLBnLdyn0qfDTD65aVS+iOlV7fQFDjWo2kXlLzFrcdgdN5LvXu6SH1OuFeiAqfzfDiJIfXc3dxc5YrJiLw5aayoqLfVUdWen2ykrrUhZGrc3lLRe6BXJ3R2PfimdkoFs+ktp3ghstVbqa2neAGLKu7PqjtzpitOZmpBcG1q7he6lDPkrRsOXmTWqMYWOWXgdTBi6jVdoTfqU04Hy37wtQmfCIIUjoZzBI/S0wEQaRzBVtea10LbNQWfUw6L4jPe05ALf0KSKeEfYBBsUNzjoHzAhWoGKJTSOcs8JHQ+JqQzlmo0ZbNnlW6rlnj2sLruZXbSEY4B7YeRgEfEX9d8NmhTR9nbfYv+NZf9oATGoxmcG55sV1Rb/JN4LzyQj1onXua/hRoFSbD4THgWlWtg9d/IgzDX7w0P4fGO5VxAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAkCAYAAAB15jFqAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAdRJREFUWEe1l8FVxCAQhqN1aBPW4MWzHdiAVmAFNuDFsx3YgB68qwVoA/osYP3+bLKPCQMBgvP8BhIG/rCZYdej3TDwV2fv8D21r/AAVSbRrfzAHZzCfskV8O5CLXzCObhCIXh3gVa061VhvJn0rJsZ9BFewj1oZ9yMkHD2o8abCWuiIVr4EbiI0Dv25ozgTXCN6IwnrN16sSN4E9wiqh3TidBr8OKPcZvtC172XWM8jGtdRGU6KJZ2MrVL6yb6O7Ul1k3U29XH1C7tX0XJYN9IJ5NxvbI3VzJddno9taE9Ta1rSJsnrN2pzlntigvDGXjxI3gTXCOq4vcEs0egwJsJa6ISugXFcSNCR6I3z4B3J7dQJCjw7gI16CvuClwBD7y7UCn6XnUXzrC5ZC4gdbAnDWnz5LlESpXHG+iA8Oa44M0Ca9l7A3QiOAxoCsGbySV1qpKhE9GcvSWiIvXbSA/kxRvwZlKpqFAsnQi9Ai/+AN5MqBFV8iiJuDAo2bK/ffFmQo2oSGV0VhhvgmtFhRanE5EsJQ2GtIiKVClJOIrXQEirqNCRSCciKqV5YGaLqEiVkjmjwwGxVTSV0eJQSsuBraJCwl5Gi/FfjeXNHqIiXUrD7g8LJZiQFmtJ9AAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAmCAYAAAA1MOAmAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAjJJREFUWEfFlz2O1EAQRr1zgBUHAHJ+IjZBgIg2QSIDCWJOwAngAlwAAmIIiGG1hIAg5i8HDgBcgH2vx83Y7bJnxvbAJz1vt+3umnZVV/XuVVX1B0JdgptwHk7DVSj1GX7CD/gC7+A19EljLW7BS6Azil/g+PtwBhpzrzo+eAZ0ZkPDj6BlTEOfIL80J29AGwutYahi2dUFO4V+wxO4DWdBJ2cOwPsP4RX47jr1+qex/I25B+V8eWWVwdB8kNG55UTbQCQnI3RWxqKA8F45eCx5pan/jQutFv6qctAc7HG10ZLO34VSNP4rhcbcCrvQItobROhuFO0xU0yR02ZhccS11D68BfbarEolhvDv9dN3MJV9gOO6P1bJ2CEXJ9pE+vgjvAdrGMl7sH6VSt/T9KSv6GyN40xJD2BNQlh1WOEsZUbD5tzm3DXdm64yJ9EpGOnNqE4+g1CeQa7DOfD8EdW7dfKMcgMMrEFjkQwmi6iHII1fAbfKkNxG15bN1TLHoq8ttFEFydQ+7A4ei/7pOzDVNa07aCp9KZBn3Zen4l6j0WHrANlU0aT/v3juSguiZ3a5F0u51/y2KR+6V5bd6UTRmM6hzRtuzKkV2klptPhb+aMHbsxtV2q4RysSD6q+E54bs3KV/lq3X0BTHoys8JfhjjcCPYe7y2ayFP6aOegc462uQwl0DLoif7qCZUMfPYYphjUyFGRhunKfXASLpjXrVP23lH70ZObhx3/en0K/quoE24l3lt9QyikAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAkCAYAAABxE+FXAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAEhJREFUWEft0SsOACAMBNEt978znwSJqRrBvECqYERrJvswxp2If+O1b3vnrwfnoy53jjCOMI4wjjCOMI4wjjCOMI4wjgDjyQJ17QREAHSwqAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAlCAYAAACzpJKIAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAASJJREFUWEftl7sNwjAQho172IAJEA0NBRIVG8AETMAgLMAGDIDEAjw6GgQDIBYABjD/r5zhYoIEiZXKv/TpLnZ8Lx6SjTPGaTbARGAO4OSw2KhNKVkUpWRRlJJFUUoWRSlZFKVkUZSSRVG9ye7i1CF7FMdrILaqmmK17FUcrZ7YKuqI1bJncbSGYsuqDcIJnYDdZX5OE7FlNRartRXrLsEFgOAAzP+gq8J4I4B942Zq0XMDPKgD/cISwMmhbkaZU1QNE/7aIQtbAzx8oGJkDtv0myGsjN3LKF7gW+umgN2wMP++ZgHUmfdD0TirwCJ0fJBfYMvfqvwH3jzD2OBzkfPny2WScuThuD0Ncb4Kn4npA/4jdEELaPH38wB7sAIHUCxjnk3fU+FZoSksAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAYAAAAHKVPcAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAjNJREFUWEe1l8FNxDAURC0KoAMq4EYNCC7cEAXAhSsVUAEHrkgUgKAABGdKoAI6oILwZ9e2vsfj2NksI7215Tjxj8f+8Yb7EKaJeDHCP3BnWKUA44cTagS/hnrIWr4MqxRgfLsWpnfXmLgx/APWol4W4+Lagf2ED/yQzmK5L13E0suPOx0ZsIAjRTuu74NvwyoZjOeev61gMaYOCSykdH0Nygq/+Dd2QJ+x9DqP5VrdxtKLx8sR/ZclP4ZVMrz78kxANkWVrmO5q04Ne5FCapwckd1QRAywoHyfpTwZVinAONSvbOCpAzGh7ARbjOdzn8IO6DmWXmqPj8gSXjjcVrPU86EiKrWdVPQjqG3fmNW6kRMLED52YSta66uyA1JTdhXLUVmiG7YCqiJDbrBKwVJL1EdxJufIRvmQS0P1ZdRLpC+mQtoBvcXSa9QSC7aSep6XjA7wwuJ024JnceA+2bhBbbHeYaf3xVQ07YDUFPYOOyqx9ayAZHQJlcbnvqycY0Z21exMQOZvJbXwILMiHG+rWep+JRldQnnc2m4PhlUKGmmakY0FKo0rS9i60WNA1w7oNZZefNhRhxd1X0syOo/KgPyW6vAyt4AJ2VjBCQh4v9mK1rpRDNkBqT9IKSfg8MJWqP5zktExmNrWUY0zK/otsALIRolK4zjscHC9NM0M2wGpP0iPBh9eVL+eZHQtVBr3jKRpZtFMQL00PJqmvRYH0fsijnwxleQUzdGyZBcrQgjTH3Ju6sEAS2PJAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAkCAYAAADy19hsAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAttJREFUWEetmM1tFEEQhUcbABkQgeHiC38SJ4jAGRABERCBU+GGZAScEBj7YvlgIiADErDrzXaNet686u4a+ZNqe9ae6a6p/qa3d6eLabq/p3hnMe0IXGcHq7izUOeOxLmFHazi8Mf+w7wubRZ13YnF0+Nhmpeldf5ZHL4cj1e8Km2W6Lr3pc3yprTOpcXhxl6Qec1jVhi8KG2Gs9LWXFkccIDMa55YmI8pcD6uU3ClRlCz9dliThiZM9kqt87f4zH7+9didhhvfuKFyHrM52OAmqzHPCu/Szsn/Bge1+cj2a/Hw4WMx8rf69LOCQNbj1dkPGZ/UQ1eLjMeq9n9XtolYb+DmtEq83noCw9ITcbjyF+wJOx3UDPqMZ/nfbl3zqjHkb9gSRh3wA/KngrX1eDVZ8Tjlr9gSRhwRUY8Vv46ezxu+QtWCX8rbU2vyspfZ4/H7C8KUK9gq4R5ANDzmP9/W1on6/Hz0jqs1SphwANkKoxKYE2vyXisPt5Zq03CPEDLYx6A9ySAB4QWEao4POubhDP742elddSehAdsPXisF8822CSMAf4fDxcij/kBUXsSwAOrpQtwYVQBNgkDntqowj1/HR5YFWDEXyAT5hOVx6cW9RKl/HW4P54ZMOIvGKow4A7fltZR0+eMeMxV592eIxP+YdHzeNRfp+cxF0TpAGTCgLeb3OGov07LY+VvpFiYMA9Qe5zx12l5zMXA7GKWFWHCaoq944y/Tstj1q1VgDBh9bXJO2Z/70rbI/J41F8QJgz4Tr3jeoDW9DHK44y/oJkwbzfR8QeLrL+O8jjjrzP/8KbCEtv8GIcf9+r3nyzUtVHYyyr4x0i8V9dVIf+4BCfIYVNqzXj8srCDMD5aqOs8mkoAtWNyMv46vRWl9wHUTVh9/Xcy/jqtFWDkA6ibsPr677QGj1AbGmekAN2EcdeRFnsqDKL+Rj6AugkD1dEef50osZ6/0zRND4cQPcPPh287AAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAkCAYAAAB15jFqAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAclJREFUWEetlwFVwzAURXPwgQk0cA4CcIACFKAAAzjAAQaQgAIcoKD817Vd/u9N+rNt59wtfcuy9O63ycpUyhR5NMoNeDD+DDvY0HH5CKH4MWiQUb4NazjejHJvT79VuPJu0EBZNLg1HJrE8n6Znpcwcqnmllad4NLn1LilZtL6YlR9zgf6Ems4RjWT1i8j9DsfSKc1dkhX3a8FaVW9VFpXfKAzs4ajKoAupFX1An33IWmeS70DaVWdUF9jH5JmaWtpJq2aOGhdwXBIM2k9uNwwnMloJq2Jisdw5khzS2scB8Bwo6c5mtAEkncxDB2kOaO+A4aO1k2jJnstL2C4gzSv9C6nBhgipFS8GtS/xZ09Xf14Wl5HHjibSE+vCEvXERg6MoWk37Vz24tguKGB6Hr8DJmAdbMFhhu0o5BKTYb2VknNGM7Q3qk+G3o/qRlDPBMakEwkNGOIvxmpu1DzPtQHrOHozf4CzT5QR33ADrIDzAxq9oE6WsORqciW5sYt8nxAu4BEUWy0NMNicGrQLiCjNUKaYdk7NWhzlbzQHS3NYYG/XmuEqt9pbm2+RrVGqCA3zbQwN/4KDKFJxxoRs+YYdv4KDMOay/QPtjNVRtfpl2UAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAkCAYAAAB15jFqAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAV5JREFUWEftldFRwzAQRDX0QRPUQAd0QAVUkApogA7ogAb45isV0EEqMLuJ5ejkl7GUxMOPNfOS0/piWXerOA0pDSW/4lGkO/AkDkKTCc/TdyWaD0E36eVLKAi8iURPY54F3aiVF6Eg4A2O19PwPoolRUI3bo/bpEnAGxxzTgElHUtxBbQJa0XOKaByuOy9pvJuFATAnOcJNb7XVGRMb6jKO09uNdWrUBDwRiA3CjuhINBiKpePzuSF9szFvVAQ8MNQbsZtUND6m7nYayqXX0FgoTooDp9CQcAa5ZJ5FnyAIvbI1E70Wc7XMtWZJFA8QqZyv/N1erDGFwaKE1S6bBBqgY9NfQ8AxQkyiXfXcSYJFAN0HGr8IMUf+hIoBi6ZqmTpHFegOIPKmSnN1QiKCJnKXPHCRxGh11bL/3LNgz6ax8/4fevoWvReY1t01bEtuurYFl11bIuuOv5h0ZT+ANIhKfE00hngAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAkCAYAAAB4+EEtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAVVJREFUWEft1/1Nw0AMBfCDPboEM7ABGzBBJ2ACFmADNmABRugEbNAJ2vdCRM53z4mdRvkDNdKv8rnuh64+Ky3vpVwuO3ksO17/98N4YTu39Q0IjC/Ac33xLT4AgXGCA+D5/gVrvQIC4wzPMNbYF6zFN+QbY2HwC1R1ZrEKt4hbhYXBLW1qu0Qaf3wEBptE1Mpk2BsgMH5gbIiWTIa8AIJO1RAtmVzEb64a4giqfiSTi1RDfIKqrcjkLO/gqtqGTLq4TQgMbucTqPqGTErewWWjqHpBJjtsCLY0FgZbX9U7ZLKjDu44yTNk0lC3DtUkz5DJP+rgNpM8QyYH7LDAJM+QyUFwkmfI5DANEBjOJM/ok+rgzkzyDJvgD4+gs7IhWtPCO7gLkzxjWqhbsMAkz/gNvINbFW7BvwULTvI47+AmJnmcOrjJSR72gEcGu1z3/2cbXKVcAWohwcWG82Z6AAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAchJREFUSEutlbtNxEAQho0LQOQ8GoCICIkUiMhAIocGoAGQSAGJlARSCMgpACRECjQAFMCjAPN/611jz42Fz+df+m7H9u7YNzszO5VlWSEqbYlFMRvHBTEv6voWz+JDPIpb8S484bzYFzJ6cy30ETL/yPUTNBfHvtoRL2ItXJWqnA+haUGIUhhd58T0ThyJbUHc2ZzEutgTN8KKF5yUZlCIz6kgbrvxuitKgOJL6KLBstDz0QXjcihkNCBBBon5VRzrIkEGcU6Ov5ZmpRUxWLZ8xrGukQr1RNWSXqkW+Kqk1ThaPQjXuXY62xQbom3xf8I5wnmA8iUd2e1JuReVc5Wtm699wXkIC/2AsqW6PKUuSEb8CLph6oJPAlvOGiGswqKG0/r2rhXLXBmNtVlbq+W+56QNz3leT6skGtZ5aU6k3PZx4ntcmhMrt3nMxg2lQQ8Lq9werDNxHFfeutx2M058yr+rmKvMCOtG5KUieW9Pcg9Or7aqDnmOE2/Cm+DF8biq4Fi7EDxPcz2CcxZQhfbhOPBPbZWHIsL7pTjA6KEzsSS8wwLpRSX8g66dkS+jk6a1XNvnuv83AdgDTnM7mZdyj020++CTFb/0899AJeEJvAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAmCAYAAAAvDACoAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAWlJREFUSEvtltFtwjAQhq3uwQTtU58YgEfeukEnYIIuAAt0gwoGqFT1sQ99p12ADWAB8/+JHZ0vp4TAIYSUk744tuM/50t8doghRMkLCE484HI1G8VNG8VNu634M3gDP2AP8grh/SdYgAkwDQ+aKxQD4kdq62MHXkEtJ2CnhOLwJsKzov0UOK5T/E/Vh1LMQHZYMDQcgNijWjMDK2DNjm0Maac4RaWgBUWsmfLF1TO6gx9nSNqlA3oGjfeykZyTz98Bbgr4cV0W0SaV0qbARfwbHOrbxp6A2/LfpjLbI3AT/02lNDdxy0Zx0+5DnL+eNjdxvRv9AxdxboXac2RLH/F5KqV98aKz2dCsyNTKNI1KA+vsu9jzJdDxXqeSryjeytxcJfoe+Ix1OqDXzXjdmeFAJnzul1I07586FJkirLLjUnqPFufSEibskHDap560CI55rdAJzMbqo+CMGHEebMWXxwk60P3bhngEq2gwH989R+YAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAUhJREFUSEu9lrtRw0AURRcVYCowBeDMEeQOCMgowqkroAKPczogIcaBQ48hZ6AAd4AbEOdauxqtdqXR6AF35vh5f9faJ+/nwjlXQlZzuIdbmMEUgk7wAe/wBi/QlEwjMCufgcJgvuEJNBaP2HAF6qCOY4lMZRgaLNSmXYZHWMMCQl/xAI/wCqFvgPYqD7kpK6+8HHXqReP1wxTOUOfKfaMiIMPmwCHIXF762ySGmnJu0FCKJZ9tbXwcLT0V9jXKLdUmiuYqkQ4+WlT4WOvTR4sS0y8fLUpMyalZielv6H9ML320KDG99tGixFQ7vFl/sqLaK2gC7K02abPFPsK6S0FlwrcI036qQu5phWnnF11Hsmahs6h9Rqmsc63zjArkOowhMhW6EKjBQmIqlOPcYdiH0qS8Kr+9dyny5u7gBq6g6y61hR1Ucu4HRC0LkcALLBwAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAX1JREFUSEvtls1NxDAQhVfugwq47QHBnQP37YAKqIAKaIAOuHCGA0cOWwA0QAdAAeG9eLJMnJfYu3GEhPZJnzLKjD3Oj2e8gppavAIYPQIci+qYIKtjgqz+PsENeAAfoN1Nxht4AvSfgCn5cTswsMGkg52p+ARYRIOkAx/m6k+M1bTBdNZgkECtYg69BGMrZxHjK1sDH78BtwDfQo4jiIvB1+5mB98tJ+5ipmBy9c3giwHKyaSdvwRVrnE/rjJ13AM/uITRBOod8m/yg0uQCThRepMfW02QQ3a0M3hSbe1aQ+HCDC+WgVqStejFrjUUzs1YSv+gH3ybsZTCuxleuQayj8KXGV5qbxwq+QSndq2h8GiGl9p8h6r9i55b81dXAPW9mmS5ZoWlrxSWdxgD4IsBquGwHXb+Mdg2p04fiImBqmUSlmD6fH+4BExeckDYJSBzjivs35M9eU4SPgmfarRlptwBGFm4av+dihMQHkM4OB3E18A/jH9evm+vmh9e9YeQWrymywAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXtJREFUSEu1lsFNAzEQRR1XQAM0ALdcEKIFbnRABVRABTTAhTMXzkicQaIARAFAA6kA3s/au2N7N6y83i+9xJ51xuNJPJONc+4XJnUNZ3AKFzIYvcEPvMCDDCOS84Ib+AIms9BaAmGYkBqO4RmYVPEIxl/q+AOYLMJsMDgfc7yDe7gCu3YLSsPUKUOKusV3wWhRBDpNXDOFNlYQTHr0HfCsi8I+EFnu/kWRMkjA3jmyRqXHfnAur8CgB1t5pDy/c9HPl0GPLkliCLmqQkEx6PEnWK1wXq2n8N4rz1NLfNhjFW20Qxg316qRF85VRlWHW+C/eVlLPv/pHYX3FvLqJFbqOBSrJvLvYWDFTWujsYq4pARklNVM3EK2sIay4ERU5bLFswmVtZtMtSt1qDndKKKAYiaYd8ZDzdn20Xwj2eRQDSfvCzwfFh7aoIbEedxgyf8WS+E8ouPW1HqlRilSh1N9wTYt7oG7hHPgVPsbbKXapBKiy/gJw39G5/4AFcuGs44PC74AAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAlCAYAAABPsblCAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAANtJREFUSEvtkrENwjAQRR0GYAJAoqajpYUJgAkYADZgAlagR2IKRE3HArAAEQPAu+AQOyFcFJoI+UlPl3PsL9tJZIx5YClTnGMHRzLgcMYb7pPuFVRwjEekUZV5rPkcEiNNJSWoxUKPLm6xnXTVKQQtUcJcrrjGCcqlij1c4A7vKLC7zAumWxalJ/j9/otZM0QePFfozinTO1rfVpeDrRqFO8pzslXDCxrYWoeIA8oZayNfUFCPVpUGBqV/qriRkRwzdOfkTfnnO7L1Z0KQTgjSCUE6IUinaUHGPAGyfHZ3r1tILgAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAh1JREFUSEu1lz0yBEEUx8ccwAlwAEpCgkAkEXMBHwfgAk7gAgRiAjGFSFElElFyHAAXWP/fbr/R/XZ2Z2f1/qt+sz3dPf263+uvnSqKoiNqNSt2xKpYE9PC9Cg+xY04I2OIMJCghjvH4lsoo5F3cSAeojzgXe2ljW8IPqDCf8FAiQWTGi8uBa7JpcoAjeLL2M+mC7Et5gRBg2WxJ07FhxgmjaboXIVhxbwIXGZ1hrErlEioYrAVZRrEgWDHjTShR0IVg30eToeiaegjaclZNcsqao0efe2U6yrxalo4bVSuhESs2/CbQ+VMSJjwexbfB5XM7ViaPVlV5ly1dUq2iklo8gZeQ2JSKr9CwrQYfnOpbwTsplm367eQiKXNL5vK+5CIxd6fU91NyW9UbOGUjcqRUCKhOg84sH0hB/4ohw0dqesgVAZgUKUT4UfDOz3mxLN6dSQGOBdGvabUUfctx3C1kp8Fs+en+9ZO7L5862VLQMb+YCSD3OWh11zQ7Oz25ZQpPzVg4Odz4f3MZYAOEAN/KbA6BgaG3k3byjfEvSnbbirX9skOLwz/G9yhRAXxCWVpxXEgFn6asn5CeS9BUAkgwWMmWX4TrPa6BRe10UtgwAqBjxg2+d4g79xFmWVWPybqPfQS3sC40LF4+mY9k6/FpvD3qq4lfDnuXkTs2JGtrZi+hSZXFQtiXnDr44z2f0roIXP8SdDrO1GvovgFqIeS/WflHVsAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAlCAYAAABGWhk4AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAANhJREFUSEvtlOENwiAQRol7uIR/HcMNnMAJnMAF3MANXMAN7ATGBZwA31m4AEUtSRv9cV/yLFzJs0Cp8875lA24CVjwM0tMrDGx5nfiJezgDDdIT8EF9rCCQRhQPXkI/QEeUI6pIWN7XSDeiIhY4Omy+hhO8FbMlLN+K1uoiktYR88ae9aRbo+0pVabldQ+ikX47Usn+9ABnYzXU5dF2Sx2muY45M9pZBxB7mZFXaMGyjdHZjt4jxnUnGu4xqxhkpN3D9c0/y2uxcQaE2tMrDGxxsSamcTOPQE4MyNcPeaRBQAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAbCAYAAABbcS4wAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABtJREFUKFNj/M/AAEQIwASl4WBUABUMUgEGBgC/0AI0DNOTiQAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAlCAYAAAByI9gkAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAALFJREFUSEtjAIL/MNwDxEAGQXwEiJlAOskB9NcIAkBn48cgPwEZQ9WPoxrxgFGNeMCoRjxgVCMUCEBpZECURm0ojQwIapSF0sjgBBAT1BgMpZHBEygNL+rRMdC2/4+AGMhBwUZAzHAFSNQBsQuIA8UgiQIgxqYJVG+A1aFLEMJwC9Al8GGQK2CuIkojyMlJQAzXBMSMoHofFE+8QGwNxDDwCYiPAfFOIF4LxI+BGAEYGABPHafbfqLIhgAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAlCAYAAABYkymLAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAU5JREFUSEvtlO1RwzAQRDX0QRPUQAc0QgVUQAN0QAdpgBJohAqcfZmI0SqnL2L+2TNvY+nudpN45LSltJV8ibQjD5J/vY6A4XUEDK8jID2Kb1EfYfaosbjrVSEjmwf2ZH6po1ZcCfgUujHMHMoizAZMmUMuZmYCps2BYskoYMkcpNbcC1g2B6kNtAL+ZA5SG4oC3gS1kilzkNpgHfAqci0zbQ5SGy4D7jYHqRnkgF3MQWomBETm8CRCkx5SM/mp1iW7/IIRhIRGLaShEb/k/fpZ1zgToVmE9MYA02dBw8t1r2Y6RGqDpXmm9dA/RNkXIrWh6CRDK4T9qP8XqQ20AoBvrJsbuiFSa+4FQPTSA55V1I9a4ygATkI3RvTsLlAsmQngsHEetDDCkFzMzARAL8ROe1mE2QDACEMtDHul1MWVAOAv6YbUhdUAaIWcUtrO576pXNTFboAAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAlCAYAAACKwyPTAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAB9JREFUOE9j/M/AAESogAlKo4BRQTQwKogGhrAgAwMAeqMCSIi6vD8AAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAcCAYAAADiHqZbAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAATVJREFUWEftksFNAzEQRVdUQAFQATdqoIN0QAVUQAU0QAd0wIUjkbhDBXSAKAD+i8aRPZ4Yx1lu/tLTODNj78/Yi/TzF3fiWXwKJXZ8WY5atMdzK57Eh1BiD78fxbWo9tGQ80DS4MDc0CHouRHFwUbvGYDJYn8qJDB3KZiKr7VgkrlBzngVeU8PTPegOUz50feCQUxhknXU08P+qfiCh39Pc/4mWJOLDNDv81zrvfCT5cqjQdDfNEfDRqTDIjDZmhA1TEV7E5iMDGKcjqpQPcwGvFEtKpggH472eBiCFgU7D2HyCLgqLQp4t1FvC38D/LkzFQp9W+zVi8Vc+tDRereYdC4qc2vowuIpuhKrmNtaPEVvFnP9y+TW0jQ3qmluVNPcqKa5UU1zo5rmRjXNjWqaG9Oy/AIEZ/Rw5SyTqAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAMJJREFUSEvtkmENwjAQhRt8YIK/yMABClCAAgzgAAcYwAEoIBhAAXyPbJf2dhuUhIQffcmXdq+3t/a6hB5TzGEDR7gCpnGCLSxg8K4KclYyQYE7uIOviVDt22Dhd/cJBxgN1pG9V8MawmCP+qge533UXF50KnmTwQrs+z2G7uECPBS8du1NXZZuOgqK0MeZFOxBq4VpParA/zk67YyFQhRV69yNvZYwCP5Gt27M9d/BkVqwqQWbWrCpBZtasOlHwSk9AYmJHvsSJLrqAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAdCAYAAABfeMd1AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAZRJREFUSEu9lrtRxDAQho1yZmgAciBhSMiIgIiMDqiACqiABuiAhJgBUhIShoBHDg3AUMDx/ZZsJHnls++4+2e+25XOeux6pPVKVVUTMLULx3AEG7AOjV7hE27hOvh90iIJTDa5AhqD+IYLsOYKpB0HoEE0RvMC2mA+J/w1TgBnLgoLeYf8mxE0qVCE0aB6Q6WUaqH4WfDOA+AkqK8QfosW/wAaCdk7stNk7KaIlQW1ow3aUWhgM8kQzgAnoY1Gk+V/Ktf5JEPI06a2+t0+v7nugh2rm2Abka76QLvNupnqPtixegw21g64be+30vUw7Yoo6TnYWFvg1rzfijzOrKdgY61CJ5L/luZ33l2slrOI6sIipfndl/dbqTjNKp2JXD/QiUQHSMwinYlcb+DevZ/oMNix2gs2Vn12rLuL66G+c8ZSurvAvoXzIjWNc8BJiGqKfU331OsOpe+CqFx4x4pmyEKlBTqVse9h9V2Cqmc0aHIKo2u80ECcudDLNqJPO7RjK6Ih9KS326kH//MLcgnfwlX1C3afc2nM/zrzAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXNJREFUSEvtlr1RxDAQhT3UAQ0cGQEBpNcBHVABNHAVEJDSAR3QAD8zBETQAFQADRzvybua1Y+lG99e5jfzSTpLq2fLPmkHaNvjBjyBb4ALkWewAWegFhdAmQTd8aLA9i+w/VPYuASUxcA1+DTXduURdA3mTGx5AE2DHK4z3wGfSoO45ryWvxPlCnQNOHEysMIJ4LLgRxEbx9kOhV+GnagFTWpPEm8u75j8GhpwudBI0Bd+hGJv3YO/sRl1IbWLAfUqtQpLF3Az+JLa6hy4GbxJbeX6BDUdg4MaUItBU/xvuBmcSm3FT9fNYCW11TtwM9CtQfUjuBhg5wx/Kiuc4UEuBrdSW+FkC9rbAGfHcDk2o17Ax9gMm3ayjzM9aaYhBp4daBQk8bbDQqP8LCa987g4DbXDg53SlrkU6YqCMhnIu6hlClNwqZrZB8okQA99Zgtcz1pOyuSMN3ENiglzUCbBc7KKFm5bxZQWg64Wg64ObDAM/+VvQpTuSmfkAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAmCAYAAAAvDACoAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAWpJREFUSEvtlrFNxjAQhaPrYQMmQDS0tIgFEAswARMwAQsgesQGMAAFFQ2wAEwAC8B7yp1lX8781m9TIOVJn3w5n58dJ4ozQd81DsE1eARIJD41dwWOQTRWWSZpeg9w0QQnOnU5Aq/S+BxwZezspTC/0OQokjn3Lloxc9He8pqLuQO1O0XdXPyaJQ3u+x6wmhqs4YPHRQH64u2gcW6wieoDfXdJ3mbLinMic8HeTTAqdAM+5rBLcqZBrltteyX7Gpi44uc57JYcaWB603aERNukPzUfqdU81MJ8R9sRki8NTP6975G8aGA60HaE5EkD0y7AaTRE8qBBrhNtR2jxySX8hLKvBZ5KkQf64sOC33R/tHlqJ5CBmrkwOuY4AQfnk9CQfwi/nZ1GMqfBpuIaHMfJfD6ZbzsB95rjmn6KWOh/32pwy+ysbTI3WMxb9W8BJ74E/OXz9VZjIF8WbUtkvn7PQ63mof6r+TT9AEu7S1WP7/5sAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAbCAYAAAB1NA+iAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAJJJREFUOE9j/M/AAEQIwAilYUAWiBOB2BKIrYCYD4hh4CqIABmAjCFCDP+BGv/3APFHIEaWR8dYDXAB4kdIYvgwhgF1aHxCGMMAZAxy/gogTgJikJdg3kPBQBKr5plAjFMTMgaSKBpBfg8GYqyKsWEgiWIAUbYiYYLpgBBggtJkg1EDRg0AgVEDRg0AAQoNYGAAAHMXuKueV3fmAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAZ1JREFUSEu1lr1RxDAQRsXllEABDERkwAwRZGR0AA1QATRAAyTEEBCTEPIzxPwUABUABRzvydZhy/bh8x07824knbWSP+2uvBRCGEPNNmAfNmEF1qBq9/ANj/AAt5CbTiM4G18CnZl4hzNwfumraBzAJ6QHh3AHE6e75eC8JKcjNbvQdWYfcAp7oPAJ+0dwBV/QaieVlRLqyl+9OAZ3SOf39dNAQtHziX04hJvU57fmtCL2YEb8LN5wXdupYcXhxRUHk2sqajOXY0+PVgN3bBR4ALMuEHOfE485Ps1e4QXeyvY1TLOYUUNSVJl8E31kFA2LQZu+fXBepZhIrRN3fQ4mAQO98U2dq4/WeprMuroDq2BN3YZpptbrRbO+079Ib9J1BkYTzzUn9sEwayvoZTFqTuiLjmnU8NDmyn1rrjrm9i8FZcR2A/fTIDM68ps27ryqRUd2tKKepG1D0xir+WAqJIaGN2zuyLGukOqs/ENx1y66MKdKN3EoFoIhuS7O8TaeOCup5T4ihy3wG2oZ8lz3nn8GT/gJ2r4XQgjhBzA2m9X+a14dAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAkCAYAAABv2tHkAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAALpJREFUSEvtlsENwjAMRVP2YAJuXJE4MQkXtmACGIAN2AfUARATsAC8L6Xg1C0U5YJKvvRi105/pVhqG9C9YQckCbbfx4QlW8XE63dMKgatWWdpbAdbsTTsVWnJ9vsY25nEmKVi4lVMvP7NZB7jOyUmdYxWyxg/6fl156nur+ACU7D7OkgLZyBJUG0N1mwFW1CP61dDaDPJVzgTcQSSwXCPNxEHIBmE3vjEbmm8G5jBQoWoG5zgCnUI4QGuyaMfXk/asQAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAM1JREFUSEvtlsENAiEQRSd7N1ZgBcaLrdiBFViBFdiAHdjBNqCN2IEV4P/rzGRZJyLZ6ImfvAwM5APDASSJpDEnIJXsABoZHQZ+ombsasauZuxqxq5m7Pqf8ULjXL0ZrzXOVXfThmmjsUZLjZnOwUPIxxFDX3EAD4BOhuyD5B2sQGRkcPErQCcEc15G0wHmuJstMDO2mftkaAzG0a5ruAS5wZhEtS7BU7Ek0YfFjckRRBcxhXP4Y7J7KBoTTuYCrON4Ee6uB6xx6WJFJD0Blwgb1yw77HUAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAYAAACJISRoAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAZBJREFUSEullc1RxDAMhT0UQAdUwI0aOHKjAyqgAiqgAWYogAN3GqAEKoAKqCA8OZFXenm2w6xmvl2t/CdHL9qylLJEXkA5g0cAJ1F+KfBtwTP4AHAatn+xzGPQeABqgxk3AE6iPhk1YNmoTWY8AzgJ2x9jZfkMQRr8F/ao4TRsX4tf4KO82wfZ3fZ91O7B1eo2i/vW084VwBuA06gFP7E6SgDIro7NwA12a+lVWB0lAMsuTOyi3g2q6enHF4DTsCtblnGOgtd5wZ1aeLfX7dvtElhBR3YLrle3mRJSO9GyZgFYlnEOw7Wkgjs5wCoxRu8MJ0UFd3IA10+LjM7C2n7gJDoJ7YNKAGoeN0MueGAfVJLkpqkkb+vinMA+qATATfMJ+JjRu+2GDE4FwM2wV7cNGZQCsOxtzNoNj40UCGSwwgLwpsm3HBTckcFKTwBcr0HBHRmsKAFwLSYFr6TexfYDoKpkODgZHt0hk6c7SgCRScEdGUywAJwDBa8MH5cb/wW4qZbeM3l6RAngSMFXyvIHIN0SyPLB0F4AAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAbCAYAAAD28DaZAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAmRJREFUSEuVVztuFUEQXO0BuIEPgCwSAgMOiDDYEhkSB+AEnMAn8AVIiEmILRkiBAYnRJwATgAXeFTtTI97arvfjkuq173z2e3t6pnZN+2maef5EJwG+Q6E03gORuMivgLhdJzR0eFptSM4q9bwutoRPKnWYxXM42q38Aw8KG7DIYjMDoFjPb6BM388jqvdwmm1ipfVbkGfcwXOP4rfwLfVN46QBTMiFbN3r7gN1+D8vfgdTqrNwJtpmg0jUmld/gM/g/PH5bLHo2ozqBQq9ZZU96s1MCuG3VdZYrxme8ZfIJyFv0EUczef/dE8o59Pui2hXPhO0iYquQ/BafwAsp1B+XaO07lG/HTky7B9Wdo+TQZsSiFUAq4C4rJaQyaV3tfqxbBE9Rf00V6A1ueJh7YxnGPto1LxvnAaeT/XXxz/EDKqGyz5boxJZByRSuvzLWh9bQfWJf6gWg9NsUlkGJFK7/ulWsMSlaaZtMIyZhIZt6TSfmbS94O3F5pmfwpvSWTcJxUl8X16j+6g1FXlT9YtiQwqld9t9RDWo4hokWnkPo1bEhn1O4XzrE83u6DAby90QyNtgl/6mURG3SYoscoc1Esv00/wT3EbmOY3oD9lM4kMKhUlPipug44hVh9XWjc81J4XdwF3zPfFTaHBvgD1y+6mWkWXKmShSyd1votERpVK64WyBfP6BtVWyWB1TkQGDSdkdlSA60Z9C+O+VaTUDHvyX0U0Z1UzhH4sGaKiy8C6Yn1FyOolDCYbHG1S+5AF/6naCKt0ZXWTFF3KSKo99UKGjauj3u+kd6Guquw7aZqm3X/BjOQoztBOJAAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAYAAABiFp9rAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAXpJREFUSEudlmFVBDEMhGsEE2jAAQ5QgAIUYAAHODgDSEABDk5Bmdnd9pLspBf48b2XTnO5NmnabR+t9R64gkfQ/oGK9wkw1/q3EQfUbIAKLwDGKc4DwPy+eu4iOnF1NtAKFYPjJ3D47MYzGA4WrnL4rFBZCb+9Dd4BDEelXqoujBX8vPAFYDioRb+BysQFCF8vsHCqXmKF0vcHHMWPnMWsXtStX9x9KH5Eiv0NwDgFGqtV9XwFMY5BihvMNQwHNbXjQitIcYOrZ84xWLI6LAYpTphzGCk2nXeQokPVa7AofkSKJ1QKiykbSNHB0wRDovorQYoTpkY1sCX2V4IUN9SpU39aPBBS3FB9xB2qS7TwfklRdj5P35hXz8Kdpj2LlRs5eywX75cXmOsYILuR1Wnkb5P3ywsqJaum5IcHDIf5TrDcBsWX0sGAanHHl49lN1Qaqp2f3Yfh2dBNWeyNSfZ+zbRnWy92u0P13TxIavIP95eDAWNmyKW1/gscUsmGiRtk3QAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAlCAYAAAC3UUK1AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAclJREFUSEulltFRwCAQRDMWYAc2oH/WYAd2YAVWYAU24Izjtx0447clWIEdWEHcDYQcxxIukZmXHAtJLnAcTPM0zZZ7MP2DdwCjgi2V8EHxJFfgF6BSv+/LieQWqJeMeAQwKpaRUQ3PQL1kxA+AUWA9t7W/yPr6YBR6DKOCP5Dbk+e2kZgOITj2MAp0lHOU29Mc2A6Ec7W+YIR6/gWYPsnwnpA7YDp2USPhgicZD4CNFsa86djFz6kYha3io8ONq0RFJx12/bbKE4BRQc328XwDGAUTtpatQq9hRB5a4JzBqOg4VQsq9/TymerbGd5aUN6pfKb+eidQWtGPM/H5TIXtTsi3YiSf+UgcLF4pNrFvA0CtqUEakuKSFmDIF/ntYS8CM1Ls5jOlB7YGKS54j4nSfFAIpLigxt4TzG9SLPgo8gQPHlIsqPWwwvWknhFIsaBW9sqB3VOKFSpHHTkHXOAyLJ/5bgs+HC6hj1znuy1YrIeK/EWLj7ATp0wpFlSyPHFelmIhuL3usjsn8Hi6SWYpr/l+tMivEx+6kdNLBynKbBvMUwopyv0kkG17tCKHJHAqDCMnnhN+mcxS3vL9bGm+7BffmbDdmOY/ztRFwGq4QHUAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAYAAACTHcTmAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAPdJREFUSEvt1eERATEQBeDQB0WoQQc6UIEKVKAQHWhACSrQAQ3wXi4T2eQlFzP54YcbH8naC5PNsng5h8fYaxleh16/v+gT1tPQ7+nXzoCBsYXwvk3ucQAMjCMkOWYyawcYGPzWWV4RqNrAAzCJbrCCLLcISLyRC2AS8QOSfUzJYOECGBh7ULkgg8YJMDAYU7mBDEaq0ldQuQkZ9LhfeWHuIAqTk0F/IxfAxKgUJieDRaWJW6FyhTKoWlAc8BYbUIWpHPCWz0S1IAvFTkrzOkwD1YLUOOAtugVp5oC36BZkLEvsp1qw84DX4dks2Pjl6fb/ix59OfcGxUj12KozcuIAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAYAAADeB1slAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAcBJREFUSEvVlzFOxDAQRU164AJwAAQ0nAFBQwcVJSfgBJyAC3ABREGJhECUCDoaQPTABYADhP/X493J2F7ibIK0X3o7k9jrsSde72TBOVeDSKtgH+yKvw6CPsA7uAVX4AlMEwM0OAVfABetuACYBNwkkwt2egG4KIYT2gZ6PME7swweyATxzhmAE8HlHwH1hdEguTRykrovcDUeZtSRX+Z907nBFkit+gSofq6+BqExcAxUpyxcjV0Jdti43XEWupHcAz3IXzBdcBqEtFZ7+LS6FNtW52K1dsS6VHqm7Oks9lkwbaM2m7/S9ARSu5DPp1pCq9an2FK9idXaAJV3J+oagOeT1QqIAnyLLRVSHYkHZBTgVWyp7sRqLYIoQN8aNMAmGDQAd+h8p4ia7wD8TQ0a4Bn8f4pYA3URTs5IPyAKwAOqi5bFavHYiQLw/Oii1Mp5Mlf29NQlYonWxGrhX274v8zqEZ9WLHpLhMokWvmD2IrVsdWB2LY6FKt1I5ZKFl62XMyRKrzGFYWn/9KRhZjq5x0WuWy08L4NxFmzTLEzJwyo+wLvDF6+k1mCZAYn8c0+X6FavQRyj/M6qP1LoHO/4YpkbKTBrNoAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAYAAACJ8xqgAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAIZJREFUSEtjAIL/+PAVIAYy4BibGjSMVRCMZYEYyCDJQCYggRPkQ2lSAVabeoAYyCDZhYxQBoMLEPMDsSUQhwEx0LtYAUgDPsAINA1sILGAkIF4w5AcMAQMBIUJLnwUiEkFIzEMoTTVwKiBlINRAykHowZSDkYNpBwMfgNJbooQAiMuDBkYAGayUKz5oXunAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAlCAYAAABYkymLAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAaFJREFUSEvV1r9NxDAUx3EfAzABMACIBiQKaNkAJmACJmACGAAKajZAooaCGqiR2AAWCN9fLgn+85KLE1/Bkz53zkvyfGfHSRbOuQpBnOIYu9jCPjbRxg/e8IFX3GMo1EF1hgd8g0SWL1yirRVx1TVozfaMbfgdbKiHUnGCR9BJF70daHxvcI5DaLJayt1BcxHHHrTPj26INP5qH0D5VTQc/OJkqERz2hy3LCrx+I2hc97BRkAXTHNMeMIUF6AR0Ghon7kOpoRVZAfFrqKX5tuPIxS9TK0o1oFuJ3F8Nt/1ZMyhK4lGQvuK/AOu+STaOSnSgVZ2HE/Nt6L+K1NpxdJIeHeD8IRcK1axBBtZbkEjoBUc3XKCjdH0gKGRMB48SWIlHqlm8WhoWmayl4pbj1XNhXU8zKRpqPjArd5MJiYWFzMZUAG9ObCRW1zMZEe/fEZxMZO1GcPiM5Olikua1P2lUHEJE30rtGcRjfG3cQUaCd1z/OMyLRv6hTQSAy+142hMreKag9nFxXqzVnFdReYJmRZ8qrG2+D/vRX2x5g6c+wUBMvkoCEaLogAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAmCAYAAAAvDACoAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAcZJREFUSEvNl7tRxTAQRQU5Aw3QAGREMKRAA3RABVRABTRAQsjQAQ0QQAw0ABUABTzu8ZM8+qw/elbAzpyR7F2t1ytpLW8551ail31xLg7EsdgThyKWL/EpPsSruBdDspLD1bV4FnpSNd/iVuArY61UbzHv4kgkzoOyBUpXl4lB57zJk7gRl8Ib9nCPNOAI+xzS623Tm+Q+OJmCCB+FLgrOhGzWEVgRzoVcq5PgJ7g0roW3VSeBLGxLuVhY95Y0cT4kTZzv+jaWF9HE+YVvY3nwbTcpm8IqUyfhTnh9alwDmywvHSzLZIfOhUFEilNrd2aOIbkomFMpR6viGGPOif5KWOM85s2eqciJmvoyUD7Mmz1z0hLAtqjnNTCYKFlu1qTyJr4iQjq4hqGSy0P9qikH1cKHRZ2EZiWXVKmTQHqkK403wZr4ZiWXM0wuzZz/+jaW//+xQHZ8G0sz5/l5Mkg320uwliJIVxrXYu1SliZH4apTVo51ZoHOZ7gID8m+JKPwRVKnoIsacgWgpDZQ/bISOloRgW3fj8mVS8jKbTvnvEniGMgxubbK5hyIlhRac1X8cCmn7kSwKdh1pyKWH/Empn+2nPsDoOGKzN3x8jcAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAkCAYAAAB4+EEtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAT5JREFUWEftlcFRwzAURG0XQAWkgtxSAwc4c8mJQw6cqSANBBqgAjqgEVJBKoAGwvtW4pE1K5AskQPjnXmeb+VLO5Z2lAYdS/kAihGqD+RgMm9A8fdmz0AhUf0gB3/lCSiiqDkgB3/kBj6BlyhqHsjBKCsIjZSxmgtyULKAMHn2rs5Oze94JOsVlq7sdYA7VyYp2YyIN7eu7PUFGzDDHMlP9lHJu4fz76nbCHJwwBalGGHmfk8VMxVxuzHCvmIzlbx3UL3FaWThUfL28OjKyZJmljzfyJL3ALnJUxp96hYoBuzM7OzCPp9JZ6YiHiZPkW2mkmeLeI1RsswseSkRj5GcRoz65F3BWZa8tSurqtvxKLlcc9RdnwrT1Ms1VS2baft5EWX9n5XqH5u1PEp5gVCqbz6zKprNqmg2q6Cm+QYGbCP0E9qkWgAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAmCAYAAAAvDACoAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAV5JREFUSEvtlb1Rw0AQhQUVuABoADuChAIgIMaDcyqgAjIyKIAOgAYgcMgwFAANYBqgAvG909lzP2sGSecARm/m862l01tpddqrUH0K9QbYlvum9A/Nb2CrJ0PNTQ3mpgZzU2vNz+AL6G4Zz/AI13AEP6l3yyWZ85BXQrl+fgehedGaz+CtCZ1W5u9wD+qGUziGtMsdgM5pzgIsjeG2CZ2iR2nDOfDSzRLxohman87IxErg659f0JYLIIhQQs7lk7vwAQQRxVbLix9DFTP/9GOoous81d8w3/FjqGLmEz+mckupD/tAEEGPKbMUr/wY6kE/NP2apl/vAn9bs+7rdH5q9MsDSqJHtEwsNJ8gQ8fdnKV5iOqlCdpE0mQ6dgnW5y507Wq+Zd4VGYflLbYUn+AEok1EmfSYyhrexW9RebRpYJWh3UuBE4nc9rYHhzACbVuhdGcYVq+gu52Drar6BilZ2czP0rFbAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAmCAYAAAAxxTAbAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAhhJREFUSEu1l00yxUAURvtlzg7YACOqVDEwUkZmrEBZgIkpG7ABVkApY0UZoiwAC8AG2MDznddJdHduniSvfVUnuX1zk9vpv3ScNO7KvjgVD+JdyBmB70asiOTehiOCG87El5CjE7sieU7DUUOt+zy8olOSBfEiVBhEmqTQIZISOLWrW5qUYn2Ic7EnVsUoAN+JeBSW6oxtb0CTHYswtie/BTpYRgRJjdHSF2/QjjIiGJK8XRA8FG9Y435LBIGz4MaHQlYEwzcJnAU/g2XV0NGZmslDp8qKuBBm8ECKTR1TXZXnbKLWShchd1aKDR1DhTOW2a9BQUWc5kvjbnysDpqok9hWKTh6C96MTu+7OBLbOiJ1jIKZ4UNW3grub8yv6mJOqGSYaIRThqlL8Sxo+3scpWj/NcFKfVCWU72KZW9OMjRqQdvSL/7ydIizRijUfdR6oSdWIirMtcZHa6iOxLc3a80Lre4uWxK+msynVOsiWxJ0V55DMTiyJrE0J/49CWoksXYps6pg0oTKneRTFOk+idmrJWGQrAq+icIaESwVQ8RwTfVUnrPsVIiXEcFzy+v2boUlu8/6RbwKETy3jPGG9Tbc+NfusS0BviDOG9brAosc29d0p0657b8l/Z6I34LVbH0xEkDs4JfNql0XaKKWAdN00g9tHyILKjXtQ8f/C4YpJXM7YlssCiZqJVYKlvdbcV3atpz7AVk1hjctKJgxAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkCAYAAACTz/ouAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAUNJREFUSEvd1eERwTAcBfDWHpawikUMwh42sIA7C5iACUxQ77W5tP/kpU3S+qLnR/LkeLSi7ZoGt98dO/f4s+MP3qDF3VbeMD0usNknOMF+GPrj4R55Fa32Agy8O7jn7MIaZ8DAOIJ73i4uha+l+wAm3qQ9mUmxhfZkJkUy2lMUZLsCBsYBgnVRkIUvhIHBNxRrZbgosz3JcBZPIgZGoj3JcBZPJAZGoj3JMKmwPckwKWzPy5SXq1rryFDChmZenPhDU2snZCiFG1pGe5JhpLI9ydBgy8r2JENDbWiZ7UmGntrQ+Gky25MMPdWe50OtTZBhj79O1V6tnSHDntrQCtuTDOV2XNGeZNjdAAOjoj3FodrQxF9hrjhU23HwR17CBhu3Jxs8AQNjRXsaJ2pDW9mexkm4odHK9jQMVHteqpOFFZruC824Z4xa4q4EAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAmCAYAAAAxxTAbAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAi1JREFUSEvFlz9uFTEQhzfvACgXACk1SpOGSLTcgC5lLgDKAXKCXCBNahQOAAUlFNRJLgAngAskv2/XzvPO/my8jyBG+p7/jHfGHo9tvb1hGO6FlSNxIo7FC/FcZPktbsSd+C6uREtwMuOt+CrU6OaXuBDOnph3MFCVnbkVb0Swu218EKr8NawqOJoqtRX8EOcizo42/ejz2BJWpD1UdWS41wbbgY0Yz8CZKq3vfZh6HWScI1aZ9MslE9Niqd240BGljZSz/EfI/59TdZVcp7KUAzE6+ddineyn8ill3IMYS049ujW4BEo6rwx53kWcLHaTbpp1qcyQLb0rcilMZiX9VGndWczI3EePoIurCOds23BhK+Fmfi/Kb5yDIkyZeQdGXCKUoMcQs41jL0W0KZadxJKNV6MbVtnYv3kHDtY+WMCKWFklI7cNF6q8gcySEP0plJWMnCo4UGVG3OTMqfgk1KgSvvXnhLwvBlkIbSsjC0fLK5o9yYZ6YJLumofxQLowEQ5nrAUb7hyNZ8bF1hnpgcmpMoNEGWK2rA1VxGXf5pk0Tym8qlH+z8v4OpW7in1V3R21S3YBGabKgs03aaOcpXKtvEtlKZ/54T1w3s2b0MS9K5Dusfo9hKOedx5DzkFxHCZDbhDQz0MUb1Zmzm1Rexb4rpjg9qOao7VgB3vZ9qMTQLH2RYywMhPiRUfzf0cNxtfen+YfU52X4ZV4KQ5FeQWVf0w/ii/CyzA8AMGNXV7/SE8EAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAmCAYAAAAxxTAbAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAi1JREFUSEutl09q1kAYxmMOUDyA9gLdiCvBrQhCd92ULtUDeAJ7gV5AEdet0F2hCK5KBd24US9gT9BeIH1+yUycefMm35dkHvgxfzPv/H1n8qCqqka4eir2xUuxKx6LqL/iRnwV5yE+JYxkqPHmVCixFbfiRKgTSrrkGe8EHykxm3/ihbBtiv8JDCiyCjroGJo2QO/ei/RDpuW1GJtSDJmp69YgVkj5IJKKLgfCm95LkdSrmmsRCyP0Mqk0CaP0DNGBto43CqbINrQJb7r70bD1bCFrYBvZBjqnSAZrUz9TqdVFCOfqUwhTacpkJrEa6bLn4009a1urMNP3EC7RL3HXRXs9EgMja/U7hFHPxcDIwxCW1MDIXghLqvbWQIerqGruBau3ISwmXILddsAJVvFsPBelfL8A5hiauuhU3jk4WxChAxhLXT3gLnCAuKU/Itb3aI3A2H1Sgt4IcBEtvXoBB2mdJO1lRmDuIwJoOK6fnTqme/RJJGPVkcBL2+cQ/gn3wfb/KT6LKNvYxxCSXwQ2giIZjLCog/Rc0lUI216UwK4HafKLjQR/Z0fyJYSotbYWz2uwU0N5XnkJnC9FMsyTKkvMBndjDzDpwQtyKZ4BcBzrIGMj9NJ7r4H38sxOvD5sXxc/hLZf9U1E4QGeCH6IXokdYXUmDrvoQL3Fsd5tgzeCyOpzwm/cGzE2ArTYCI0fC95VqYMcUz8sHByHyns44yJ4pTOl9pacpmruAbIch8l/5gTJAAAAAElFTkSuQmCC"
	];
	var KR_sampleimgData;
	var KR_sampleimgData2;
	var KR_nsample = 62;
	var KR_i;
	var KR_dbimg;
	var KR_callback;
	var KR_imgs = new Array;
	var KR_results = new Array;
	var KR_timeouts = new Array;
	var KR_sendResultI = 0;
function KR_createImgArray() {
	var arr = new Array;
	for (i=0;i<KR_n;++i) arr[i] = new Array;
	return arr;
}
function KR_createCharObj() {
	var charObj = new Object;
	charObj.n = 0;
	charObj.m = 0;
	charObj.data = new Array;
	return charObj;
}
function KR_initKR(callbackFunction) {
	KR_canvas = document.createElement('canvas');
	KR_canvas.width = 200;
	KR_canvas.height = 200;
	KR_context = KR_canvas.getContext('2d');
	KR_canvas2 = document.createElement('canvas');
	KR_canvas2.width = 200;
	KR_canvas2.height = 200;
	KR_context2 = KR_canvas2.getContext('2d');
	KR_dbimg = document.createElement('img');
	KR_dbimg.addEventListener('load',KR_readimg,false);
	KR_callback = callbackFunction;
	KR_i = 0;
	KR_sampleimgData = new Array;
	KR_sampleimgData2 = new Array;
	KR_initDB();
}
function KR_initDB() {
	if (KR_i >= KR_nsample) {setTimeout(KR_callback,0);return;}
	KR_dbimg.src = KR_sampleimg[KR_i];
}
function KR_readimg() {
	KR_context.clearRect(0,0,200,200);
	KR_context.drawImage(KR_dbimg,0,0);
	var dbimgobjData;
	var i;
	var tmpcanvas = document.createElement('canvas');
	dbimgobjData = KR_context.getImageData(0,0,KR_dbimg.width,KR_dbimg.height);
	tmpcanvas.width = dbimgobjData.width;
	tmpcanvas.height = dbimgobjData.height;
	for (i=0;i<dbimgobjData.data.length;i+=4)
	{
		dbimgobjData.data[i+3] = dbimgobjData.data[i]; //transparent to deactive eraseing
		dbimgobjData.data[i] = 0; //black color to erase
	}
	tmpcanvas.getContext('2d').putImageData(dbimgobjData,0,0);
	KR_sampleimgData[KR_i] = tmpcanvas;
	
	tmpcanvas = document.createElement('canvas');
	dbimgobjData = KR_context.getImageData(0,0,KR_dbimg.width,KR_dbimg.height);
	tmpcanvas.width = dbimgobjData.width;
	tmpcanvas.height = dbimgobjData.height;
	for (i=0;i<dbimgobjData.data.length;i+=4)
	{
		dbimgobjData.data[i+3] = 255 - dbimgobjData.data[i]; //transparent to deactive eraseing
		dbimgobjData.data[i] = 255; //red background
	}
	tmpcanvas.getContext('2d').putImageData(dbimgobjData,0,0);
	KR_sampleimgData2[KR_i] = tmpcanvas;
	++KR_i;
	KR_initDB();
}
function KR_imgDataToArr(imgData) {
	var arrData=KR_createImgArray();
	var i,j,x,y,z;
	for (i=0;i<imgData.data.length;i+=4)
	{
		j = Math.floor(i/4);
		x = Math.floor(j/KR_m);
		y = j%KR_m;
		arrData[x][y] = (imgData.data[i]+imgData.data[i+1]+imgData.data[i+2] != 0) ? 1 : 0;
	}
	for (j=0;j<KR_m;++j)
	{
		z = 0;
		for (i = 0;i<KR_n;++i) if (arrData[i][j] == 1) ++z;
		if (z < 6)
		for (i = 0;i<KR_n;++i) arrData[i][j] = 0;
	}
	return arrData;
}
function KR_adder(arrSrc,sfrom,sto,ssuper) {
	var arrDes = KR_createImgArray();
	var i,j,k,x,y;
	for (i=0;i<KR_n;++i)
		for(j=0;j<KR_m;++j)
		{
			if (arrSrc[i][j] == sfrom)
			{
				arrDes[i][j] = sfrom;
				for (k=0;k<ssuper;++k)
				{
					x = i + KR_dx[k];
					y = j + KR_dy[k];
					if ((x < 0) || (x >= KR_n)) continue;
					if ((y < 0) || (y >= KR_m)) continue;
					if (arrSrc[x][y] == sto) arrDes[i][j] = sto; break;
				}
			}
			else arrDes[i][j] = sto;
		}
	return arrDes;
}
function KR_captureregion(arrArr,flag,x,y,info) {
	var qx = new Array;
	var qy = new Array;
	var qn = 0;
	var fromflag = arrArr[x][y];
	var size = 0;
	var i;
	var xx,yy,minx,miny,maxx,maxy;
	minx = maxx = x;
	miny = maxy = y;
	
	qx.push(x);qy.push(y);qn = 1;arrArr[x][y] = flag;
	
	while (qn > 0)
	{
		x=qx.pop();y=qy.pop();
		++size;
		--qn;
		maxx=(maxx<x)?x:maxx;
		maxy=(maxy<y)?y:maxy;
		minx=(minx>x)?x:minx;
		miny=(miny>y)?y:miny;
		
		for (i=0;i<8;++i)
		{
			xx = x + KR_dx[i];
			yy = y + KR_dy[i];
			if ((xx < 0) || (xx > KR_n)) continue;
			if ((yy < 0) || (yy > KR_m)) continue;
			if (arrArr[xx][yy] == fromflag)
			{
				arrArr[xx][yy] = flag;
				qx.push(xx);
				qy.push(yy);
				++qn;
			}
		}
	}
	
	if (info != null)
	{
		info[0] = minx;
		info[1] = maxx;
		info[2] = miny;
		info[3] = maxy;
	}
	return size;
}
function KR_topregion(arrSrc,num) {
	var arrData = KR_createImgArray();
	var size = new Array;
	var nregion = 0;
	var i,j;
	for (i=0;i<KR_n;++i)
		for (j=0;j<KR_m;++j)
			if (arrSrc[i][j] == 1) arrData[i][j] = -1;
	for (i=0;i<KR_n;++i)
		for (j=0;j<KR_m;++j)
			if (arrData[i][j] == -1)
			{
				size[nregion] = new Array;
				size[nregion][0] = KR_captureregion(arrData,nregion+1,i,j,null);
				size[nregion][1] = i;
				size[nregion][2] = j;
				++nregion;
			}
	size.sort(function(a,b){return b[0]-a[0]});
	for (i=nregion-1;i>=num;--i) KR_captureregion(arrData,0,size[i][1],size[i][2],null);
	for (i=0;i<KR_n;++i)
		for (j=0;j<KR_m;++j)
			if (arrData[i][j] > 0) arrData[i][j] = 1;
	return arrData;
}
function KR_thinner(arrSrc){return KR_adder(arrSrc,1,0,4);}
function KR_fatter(arrSrc){return KR_adder(arrSrc,0,1,4);}
function KR_superthinner(arrSrc){return KR_adder(arrSrc,1,0,8);}
function KR_superfatter(arrSrc){return KR_adder(arrSrc,0,1,8);}
function KR_cleardirt(arrSrc) {return KR_topregion(arrSrc,5);}
function KR_croparea(arrSrc,flag,fx,tx,fy,ty) {
	var charObj = KR_createCharObj();
	var i,j,x,y;
	charObj.n = tx - fx + 1;
	charObj.m = ty - fy + 1;
	for (i=0,x=fx;x<=tx;++i,++x)
	{
		charObj.data[i] = new Array;
		for (j=0,y=fy;y<=ty;++j,++y)
			if (arrSrc[x][y] == flag) charObj.data[i][j] = flag; else charObj.data[i][j] = 0;
	}
	return charObj;
}
function KR_getchars(arrSrc) {
	var i,j;
	var arrData = KR_createImgArray();
	var info = new Array;
	var objChars = new Object;
	objChars.n = 0;
	objChars.data = new Array;

	for (i=0;i<KR_n;++i)
		for (j=0;j<KR_m;++j) arrData[i][j] = arrSrc[i][j];
	for (j=0;j<KR_m;++j)
		for (i=0;i<KR_n;++i)
			if (arrData[i][j] == 1)
			{
				KR_captureregion(arrData,2,i,j,info);
				objChars.data[objChars.n] = KR_croparea(arrData,2,info[0],info[1],info[2],info[3]);
				++objChars.n;
			}
	return objChars;
}
function KR_solveChar(charObj) {
	KR_canvas2.width = charObj.m;
	KR_canvas2.height = charObj.n;
	var charImg = KR_context2.createImageData(charObj.m,charObj.n);
	var imgval;
	var charres = ' ';
	var charbest = -1,charval;
	var i,k;
	for (i=0;i<charObj.n;++i)
	{
		for (j=0;j<charObj.m;++j)
		{
			charImg.data[(i*charObj.m+j)*4] = charObj.data[i][j] * 255;
			charImg.data[(i*charObj.m+j)*4+1] = charImg.data[(i*charObj.m+j)*4+2] = 0;
			charImg.data[(i*charObj.m+j)*4+3] = 255;
		}
	}
	for (k=0;k<KR_nsample;++k)
	{
		charval = 0;
		KR_context2.clearRect(0,0,KR_canvas2.width,KR_canvas2.height);
		KR_context2.putImageData(charImg,0,0);
		KR_context2.drawImage(KR_sampleimgData[k],0,0,KR_canvas2.width,KR_canvas2.height);
		imgval = KR_context2.getImageData(0,0,charObj.m,charObj.n);
		for (i=0;i<imgval.data.length;i+=4) charval += imgval.data[i];
		
		KR_context2.clearRect(0,0,KR_canvas2.width,KR_canvas2.height);
		KR_context2.putImageData(charImg,0,0);
		KR_context2.drawImage(KR_sampleimgData2[k],0,0,KR_canvas2.width,KR_canvas2.height);
		imgval = KR_context2.getImageData(0,0,charObj.m,charObj.n);
		for (i=0;i<imgval.data.length;i+=4) charval += (255 - imgval.data[i]);
		
		if ((charbest == -1) || (charbest > charval)) {charbest = charval;charres=KR_samplechar[k];}
	}
	if ((charres == 'i') || (charres == 'l')) //34 37
	{
		charbest = Math.abs(KR_sampleimgData[34].width / KR_sampleimgData[34].height - charObj.m / charObj.n);
		charval = Math.abs(KR_sampleimgData[37].width / KR_sampleimgData[37].height - charObj.m / charObj.n);
		if (charbest < charval) charres = 'i'; else charres = 'l';
	}
	else if ((charres == '0') || (charres == 'O') || (charres == 'o')) //52 14 40
	{
		charbest = Math.abs(KR_sampleimgData[52].width / KR_sampleimgData[52].height - charObj.m / charObj.n);
		charval = Math.abs(KR_sampleimgData[14].width / KR_sampleimgData[14].height - charObj.m / charObj.n);
		if (charbest < charval) charres = '0'; else {charres = 'O';charbest = charval;}
		charval = Math.abs(KR_sampleimgData[40].width / KR_sampleimgData[40].height - charObj.m / charObj.n);
		if (charbest > charval) charres = 'o';
	}
	return charres;
}
function KR_solvecap(img) {
	KR_context.clearRect(0,0,200,200);
	KR_context.drawImage(img,0,0);
	var imgData=KR_context.getImageData(0,0,KR_m,KR_n);
	var i,j,k,str = "",c;
	
	for (i=0;i<imgData.data.length;i+=4)
	{
		if ((imgData.data[i] > 200) && (imgData.data[i+1] > 120)) imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = 0;
	}
	
	var arrData=KR_imgDataToArr(imgData);
	
	arrData = KR_superthinner(arrData);
	arrData = KR_cleardirt(arrData);
	
	var charArr = KR_getchars(arrData);

	for (i = 0;i < charArr.n;++i) str += KR_solveChar(charArr.data[i]);
	
	while (str.length < 5) str += '_';
	return str;
}
function KR_solveImg(i) {
	return function() {
		clearTimeout(KR_timeouts[i]);
		KR_results[i] = KR_solvecap(KR_imgs[i]);
		KR_sendResult();
	}
}
function KR_reload(i) {
	return function() {
		KR_imgs[i].src = "";
		KR_imgs[i].src = '/puzzleimage.php?t=' + new Date().getTime() + '&snuid=' + data.user.sn_user_id + '&hash='+data.user.unique_hash;
		KR_timeouts[i] = setTimeout(KR_reload(i),10000);
	}
}
function KRSolverOCRLoadImg() {
	if (KR_i >= KR_turn) return;
	KR_imgs[KR_i] = document.createElement('img');
	KR_imgs[KR_i].id = "UOP_OCR_" + KR_i;
	KR_imgs[KR_i].addEventListener('load',KR_solveImg(KR_i),false);
	KR_imgs[KR_i].src = '/puzzleimage.php?t=' + new Date().getTime() + '&snuid=' + data.user.sn_user_id + '&hash='+data.user.unique_hash;
	KR_timeouts[KR_i] = setTimeout(KR_reload(KR_i),10000);
	
	++KR_i;
	setTimeout(KRSolverOCRLoadImg,1500);
}
function KRSolverOCRCore() {
	KR_i = 0;
	KRSolverOCRLoadImg();
}
function KR_sendResult() {
	if (++KR_sendResultI == KR_turn)
	{
		var res = "",i,j,votingSystem,c,cUpper,r;
		for (i = 0;i < 5;++i)
		{
			votingSystem = new Object;
			votingSystem.maxChar = new Object;
			votingSystem.maxChar.n = 0;
			votingSystem.maxChar.c = '_';
			for (j = 0;j < KR_turn;++j)
			{
				c = KR_results[j][i];
				if (c == '_') continue;
				cUpper = c.toUpperCase();
				if (votingSystem[cUpper] == null)
				{
					votingSystem[cUpper] = new Object;
					votingSystem[cUpper].n = 1;
					votingSystem[cUpper].n = 1;
					votingSystem[cUpper].u = 0;
					votingSystem[cUpper].l = 0;
				} else ++votingSystem[cUpper].n;
				if (c == cUpper) ++votingSystem[cUpper].u; else ++votingSystem[cUpper].l;
				if (votingSystem[cUpper].n > votingSystem.maxChar.n)
				{
					votingSystem.maxChar.n = votingSystem[cUpper].n;
					votingSystem.maxChar.c = cUpper;
				}
			}
			if (votingSystem.maxChar.c == '_') r = 'A'; else
			{
				r = votingSystem.maxChar.c;
				if (votingSystem[r].l > votingSystem[cUpper].u) r = r.toLowerCase();
			}
			res = res + r;
		}
		submitPuzzle(res);
	}
}
/*******************SCHEDULE AREA********************/
var sh_clock = new Object;
var sh_scripts = new Array;
var sh_registerHighPriorityScript = new Array;
var sh_registerLowPriorityScript = new Array;
var sh_registerAfterHorn = new Array;
var sh_registerBeforeTrapCheck = new Array;
var sh_registerAfterTrapCheck = new Array;
var sh_trapCheckPriority = 0,sh_userSync = 0;
var sh_mode = 0;
var sh_si = 0,sh_sq = 0,sh_sid;

var PLAY = 0, STOP = 1, PAUSE = 2, ERROR = 3;
var AFTERHORN = 0, AFTERTRAPCHECK = 1, BEFORETRAPCHECK = 2, SINGLEMODE = 3;

function shInitSchedule() {
	if (C_disableExperimental == 1) return;
	var str;
	var i;
	
	for (i = 0;i < C_LOCATION_TIMES.length;++i) sh_clock[C_LOCATION_TIMES[i].id] = new Object;
	setInterval(shUpdateClock,60000);shUpdateClock();
	
	var nscripts = Number(window.localStorage.UOP_nscripts);
	
	for (i = 0;i < nscripts;++i)
	{
		sh_scripts[i] = JSON.parse(window.localStorage['UOP_scriptInfo' + i]);
		sh_scripts[i].mode = Number(window.localStorage['UOP_scriptMode' + i]);
		sh_scripts[i].content = window.localStorage['UOP_scriptContent' + i];
		if (sh_scripts[i].errorHandler != 0) sh_scripts[i].errorContent = window.localStorage['UOP_scriptErrorContent' + i];
	}
	
	if (nscripts == 0) shCreateDefaultScripts();
	
	for (i = 0;i < sh_scripts.length;++i)
		if (sh_scripts[i].mode != STOP)
		{
			shCompile(i);
			if ((sh_scripts[i].mode == PLAY) || (sh_scripts[i].mode == PAUSE)) shAttach(i);
		}

	var d,trapcheck;
	
	trapcheck = (S_trapCheckTime == -1) ? 0 : S_trapCheckTime;
	d = new Date();
	if (d.getMinutes() > trapcheck) d.setHours(d.getHours() + 1);
	d.setMinutes(trapcheck);
	d.setSeconds(0);
	d = d - new Date();
	
	registerSoundHornWaiting.push(shStartAfterHorn);
	setTimeout(function () {setInterval(shStartAfterTrapCheck,3600000);shStartAfterTrapCheck();},d + 60000);
	setTimeout(function () {setInterval(shStartBeforeTrapCheck,3600000);shStartBeforeTrapCheck();},Math.max(d - 60000,0));
}
function shCreateDefaultScripts() {
	var i;
	sh_scripts = sh_defaultScripts;
	for (i = 0;i < sh_scripts.length;++i)
	{
		shSaveScript(i);
	}
	window.localStorage.UOP_nscripts = sh_scripts.length;
}
function shUpdateClock() {
	//update location timer
	var timetmp;
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	var i,j;
	for (i = 0;i < C_LOCATION_TIMES.length;++i)
	{
		timetmp = (currentTime - C_LOCATION_TIMES[i].base) % C_LOCATION_TIMES[i].totaltime;
		for (j = 0;j < C_LOCATION_TIMES[i].length.length;++j)
		{
			timetmp -= C_LOCATION_TIMES[i].length[j];
			if (timetmp < 0) break;
			else if (timetmp == 0)
			{
				j = (j + 1) % C_LOCATION_TIMES[i].length.length;
				timetmp = -C_LOCATION_TIMES[i].length[j];
				break;
			}
		}
		timetmp = -timetmp;
		
		sh_clock[C_LOCATION_TIMES[i].id].stateID = j;
		sh_clock[C_LOCATION_TIMES[i].id].stateName = C_LOCATION_TIMES[i].state[j];
		sh_clock[C_LOCATION_TIMES[i].id].timeleft = timetmp;
	}
}
function shSaveScript(x) {
	var scriptInfo = new Object;
	scriptInfo.name = sh_scripts[x].name;
	scriptInfo.fullname = sh_scripts[x].fullname;
	scriptInfo.setting = sh_scripts[x].setting;
	scriptInfo.errorHandler = sh_scripts[x].errorHandler;
	scriptInfo.vars = sh_scripts[x].vars;
	
	window.localStorage['UOP_scriptInfo' + x] = JSON.stringify(scriptInfo);
	window.localStorage['UOP_scriptMode' + x] = sh_scripts[x].mode;
	window.localStorage['UOP_scriptContent' + x] = sh_scripts[x].content;
	if (sh_scripts[x].errorHandler != 0) window.localStorage['UOP_scriptErrorContent' + x] = sh_scripts[x].errorContent;
}
function shDeleteScript(x) {
	var i;
	shChangeScriptState(STOP,x);
	for (i = 0;i < sh_registerHighPriorityScript.length;++i) if (sh_registerHighPriorityScript[i] > x) --sh_registerHighPriorityScript[i];
	for (i = 0;i < sh_registerLowPriorityScript.length;++i) if (sh_registerLowPriorityScript[i] > x) --sh_registerLowPriorityScript[i];
	for (i = 0;i < sh_registerAfterHorn.length;++i) if (sh_registerAfterHorn[i] > x) --sh_registerAfterHorn[i];
	for (i = 0;i < sh_registerBeforeTrapCheck.length;++i) if (sh_registerBeforeTrapCheck[i] > x) --sh_registerBeforeTrapCheck[i];
	for (i = 0;i < sh_registerAfterTrapCheck.length;++i) if (sh_registerAfterTrapCheck[i] > x) --sh_registerAfterTrapCheck[i];
	for (i = x;i < sh_scripts.length - 1;++i)
	{
		sh_scripts[i] = sh_scripts[i + 1];
		window.localStorage['UOP_scriptInfo' + i] = window.localStorage['UOP_scriptInfo' + (i + 1)];
		window.localStorage['UOP_scriptMode' + i] = window.localStorage['UOP_scriptMode' + (i + 1)];
		window.localStorage['UOP_scriptContent' + i] = window.localStorage['UOP_scriptContent' + (i + 1)];
		if (sh_scripts[i].errorHandler != 0) window.localStorage['UOP_scriptErrorContent' + i] = window.localStorage['UOP_scriptErrorContent' + (i + 1)];
	}
	sh_scripts.pop();
	window.localStorage.UOP_nscripts = sh_scripts.length;
}
function shCompile(x) {
	var str = 'function ' + sh_scripts[x].name + '() {' + sh_scripts[x].content + ';setTimeout(shFunctionSuccessHandler,0);} sh_scripts[' + x + '].func = ' + sh_scripts[x].name + ';';
	try
	{
		eval(str);
	}
	catch (e)
	{
		sh_scripts[x].mode = ERROR;
		console.log(e.message);
		console.log(str);
		return;
	}
	if (sh_scripts[x].errorHandler != 0)
	{
		str = 'function ' + sh_scripts[x].name + 'ErrorFunc() {' + sh_scripts[x].errorContent + '}';
		try
		{
			sh_scripts[x].errorFunc = eval(str);
		}
		catch (e)
		{
			sh_scripts[x].errorHandler = 0;
		}
	}
}
function shAttach(x) {
	if (sh_scripts[x].attached == 1) return;
	sh_scripts[x].attached = 1;
	sh_trapCheckPriority += sh_scripts[x].setting.trapCheckPriority;
	sh_userSync += sh_scripts[x].setting.userSync;
	if (sh_scripts[x].setting.priority == 1) {shRegister(0,x,sh_registerHighPriorityScript);return;}
	if (sh_scripts[x].setting.priority == 2) {shRegister(0,x,sh_registerLowPriorityScript);return;}
	if (sh_scripts[x].setting.beforeTrapCheck == 1) shRegister(0,x,sh_registerBeforeTrapCheck);
	if (sh_scripts[x].setting.afterTrapCheck == 1) shRegister(0,x,sh_registerAfterTrapCheck);
	if (sh_scripts[x].setting.afterHorn == 1) shRegister(0,x,sh_registerAfterHorn);
}
function shDetach(x) {
	if (sh_scripts[x].attached == 0) return;
	sh_scripts[x].attached = 0;
	
	sh_trapCheckPriority -= sh_scripts[x].setting.trapCheckPriority;
	sh_userSync -= sh_scripts[x].setting.userSync;
	if (sh_scripts[x].setting.priority == 1) {shRegister(1,x,sh_registerHighPriorityScript);return;}
	if (sh_scripts[x].setting.priority == 2) {shRegister(1,x,sh_registerLowPriorityScript);return;}
	if (sh_scripts[x].setting.beforeTrapCheck == 1) shRegister(1,x,sh_registerBeforeTrapCheck);
	if (sh_scripts[x].setting.afterTrapCheck == 1) shRegister(1,x,sh_registerAfterTrapCheck);
	if (sh_scripts[x].setting.afterHorn == 1) shRegister(1,x,sh_registerAfterHorn);
}
function shRegister(op,func,arr) {
	switch (op)
	{
		case 0: arr.push(func);break;
		case 1:
			for (var i = 0;i < arr.length;++i)
				if (arr[i] === func)
				{
					arr[i] = arr[arr.length - 1];
					arr.pop();
					break;
				}
			break;
	}	
}
function shDetectTrapCheckTimestamp() {
	if (S_trapCheckTime != -1) return;
	
	var i;
	
	var journaltexts = document.getElementsByClassName('journaltext');
	for (i = 0;i < journaltexts.length;++i)
	{
		if (journaltexts[i].textContent.indexOf('check') != -1)
		{
			var date = journaltexts[i].parentNode.getElementsByClassName('journaldate')[0].textContent;
			date = date.substring(date.indexOf(':') + 1,date.indexOf(' '));
			window.localStorage.UOP_trapCheckTime = date;
			S_trapCheckTime = Number(date);
			
			location.reload();
			break;
		}
	}
}
function shSubmit(url,params,successHandler,errorHandler,loadHandler){
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				var parseok = 0;
				try
				{
					data = JSON.parse(http.responseText);
					parseok = 1;
				}
				catch (e)
				{
					shActionLoadHandler(loadHandler);
				}
				if (parseok == 1)
				{
					if (data.success == 1) shActionSuccessHandler(successHandler); else shActionErrorHandler(errorHandler);
				}
			}
			else
			{
				shActionLoadHandler(loadHandler);
			}
		}
	}
	http.send(postparams);
}
function shLoad(url,params,successHandler){
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				var parseok = 0;
				try
				{
					data = JSON.parse(http.responseText);
					parseok = 1;
				}
				catch (e)
				{
					shLoad(url,params,successHandler);
				}
				if (parseok == 1) shActionSuccessHandler(successHandler);
			}
			else
			{
				shLoad(url,params,successHandler);
				return;
			}
		}
	}
	http.send(postparams);
}
function shLoadOnce(url,params,successHandler) {
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				var parseok = 0;
				try
				{
					data = JSON.parse(http.responseText);
					parseok = 1;
				}
				catch (e)
				{
					shLoadOnce(url,params,successHandler);
					return;
				}
				if ((parseok == 1) && (successHandler != null)) successHandler();
			}
			else
			{
				shLoadOnce(url,params,successHandler);
				return;
			}
		}
	}
	http.send(postparams);
}
function shStartBeforeTrapCheck() {
	sh_mode = BEFORETRAPCHECK;
	sh_si = 0;
	sh_sq = 0;
	
	var timeRemaining = A_delayTimestamp - new Date().getTime();
	if ((timeRemaining > 0) && (timeRemaining < 130000)) //130 = 2 min 10 sec
	{
		if (((S_trapCheckPriority == 1) && (sh_trapCheckPriority > 0)) || (S_trapCheckPriority == 2))
		{
			A_delayTimestamp = new Date().getTime() + 130000;
			A_delayTime = 130;
			shBeforeTrapCheck();
		}
	}
	else shBeforeTrapCheck();
}
function shStartAfterTrapCheck() {
	sh_mode = AFTERTRAPCHECK;
	sh_si = 0;
	sh_sq = 0;
	if (S_trapCheck == 2) {location.reload();return;}
	if (S_trapCheck == 1)
	{
		if (sh_userSync > 0) syncUser(shAfterTrapCheck);
		else shAfterTrapCheck();
	}
}
function shStartAfterHorn() {
	sh_mode = AFTERHORN;
	sh_si = 0;
	sh_sq = 0;
	shAfterHorn();
}
function shAfterHorn() {
	if (data.user.has_puzzle == true)
	{
		puzzleStandardReaction();
		return;
	}
	switch (sh_sq)
	{
		case 0: if (sh_si < sh_registerHighPriorityScript.length) {shFunctionCaller(sh_registerHighPriorityScript[sh_si]);++sh_si;break;} else {sh_si = 0;++sh_sq;}
		case 1: if (sh_si < sh_registerAfterHorn.length) {shFunctionCaller(sh_registerAfterHorn[sh_si]);++sh_si;break;} else {sh_si = 0;++sh_sq;}
		case 2: if (sh_si < sh_registerLowPriorityScript.length) {shFunctionCaller(sh_registerLowPriorityScript[sh_si]);++sh_si;break;} else {sh_si = 0;++sh_sq;}
		default: break;
	}
}
function shBeforeTrapCheck() {
	switch (sh_sq)
	{
		case 0: if (sh_si < sh_registerBeforeTrapCheck.length) {shFunctionCaller(sh_registerBeforeTrapCheck[sh_si]);++sh_si;break;} else {sh_si = 0;++sh_sq;}
		default: break;
	}
}
function shAfterTrapCheck() {
	if (data.user.has_puzzle == true)
	{
		puzzleStandardReaction();
		return;
	}
	switch (sh_sq)
	{
		case 0: if (sh_si < sh_registerHighPriorityScript.length) {shFunctionCaller(sh_registerHighPriorityScript[sh_si]);++sh_si;break;} else {sh_si = 0;++sh_sq;}
		case 1: if (sh_si < sh_registerAfterTrapCheck.length) {shFunctionCaller(sh_registerAfterTrapCheck[sh_si]);++sh_si;break;} else {sh_si = 0;++sh_sq;}
		case 2: if (sh_si < sh_registerLowPriorityScript.length) {shFunctionCaller(sh_registerLowPriorityScript[sh_si]);++sh_si;break;} else {sh_si = 0;++sh_sq;}
		default: break;
	}
}
function shFunctionCaller(sid) {
	if (sh_scripts[sid].mode != PLAY)
	{
		setTimeout(shFunctionSuccessHandler,0);
		return;
	}
	try
	{
		sh_sid = sid;
		sh_scripts[sh_sid].stage = 0;
		sh_scripts[sh_sid].func();
	}
	catch (e)
	{
		shFunctionErrorHandler(e);
	}
}
function shRequestAgain() {
	--sh_si;
}
function shFunctionSuccessHandler() {
	switch (sh_mode)
	{
		case AFTERHORN: shAfterHorn();break;
		case AFTERTRAPCHECK: shAfterTrapCheck();break;
		case BEFORETRAPCHECK: shBeforeTrapCheck();break;
		case SINGLEMODE: break;
		default: break;
	}
}
function shFunctionErrorHandler(e) {
	shChangeScriptState(ERROR,sh_sid);
	if (sh_scripts[sh_sid].errorHandler != 0) sh_scripts[sh_sid].errorFunc(e);
	if (e == null) console.log("Network error");
	else console.log("Message: " + e.message + " - Stack: " + e.stack);
	switch (sh_mode)
	{
		case AFTERHORN: shAfterHorn();break;
		case AFTERTRAPCHECK: shAfterTrapCheck();break;
		case BEFORETRAPCHECK: shBeforeTrapCheck();break;
		case SINGLEMODE: break;
		default: break;
	}
}
function shChangeScriptState(mode,sid) {
	if (typeof sid == "string")
	{
		for (var i = 0;i < sh_scripts.length;++i)
			if (sh_scripts[i].name == sid)
			{
				sid = i;
				break;
			}
	}
	if (typeof sid == "string") return -1;
	switch (mode)
	{
		case PLAY:
			var oldmode = sh_scripts[sid].mode;
			sh_scripts[sid].mode = mode;
			window.localStorage['UOP_scriptMode' + sid] = sh_scripts[sid].mode;
			if ((oldmode == ERROR) || (oldmode == STOP))
			{
				shCompile(sid);
				if (sh_scripts[sid].mode == PLAY) shAttach(sid);
			}
			if (sh_scripts[sid].mode == PLAY)
			{
				sh_mode = SINGLEMODE;
				shFunctionCaller(sid);
			}
			break;
		case PAUSE:
			if (sh_scripts[sid].mode != PLAY) break;
			sh_scripts[sid].mode = mode;
			window.localStorage['UOP_scriptMode' + sid] = sh_scripts[sid].mode;
			break;
		case STOP:
		case ERROR:
			sh_scripts[sid].stage = 0;
			sh_scripts[sid].mode = mode;
			window.localStorage['UOP_scriptMode' + sid] = sh_scripts[sid].mode;
			shDetach(sid);
			break;
		default: break;
	}
	return sh_scripts[sid].mode;
}
function shActionSuccessHandler(func) {
	if (data.user.has_puzzle == true)
	{
		puzzleStandardReaction();
		return;
	}
	++(sh_scripts[sh_sid].stage);
	if (func != null) func();
	sh_scripts[sh_sid].func();
}
function shActionErrorHandler(func) {
	if (data.user.has_puzzle == true)
	{
		puzzleStandardReaction();
		return;
	}
	if (func != null) func();
	else shFunctionErrorHandler(null);
}
function shActionLoadHandler(func) {
	if (func != null) func();
	else syncUser(sh_scripts[sid].func);
}
function shGetVariable(s) {
	var o = data;
	s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	s = s.replace(/^\./, '');           // strip a leading dot
	var a = s.split('.');
	while (a.length) {
		var n = a.shift();
		if (n in o) {
			o = o[n];
		} else {
			return;
		}
	}
	return o;
}

var C_shdefaultAction = {
	CHANGETRAP: "/managers/ajax/users/changetrap.php",
	GETTRAP: "/managers/ajax/users/gettrapcomponents.php",
	TRAVEL: "/managers/ajax/users/changeenvironment.php",
	PURCHASE: "/managers/ajax/purchases/itempurchase.php",
	POTION: "/managers/ajax/users/usepotion.php",
	CRAFT: "/managers/ajax/users/crafting.php",
	CONVERTIBLE: "/managers/ajax/users/useconvertible.php",
	HAMMER: "/managers/ajax/users/usehammer.php"
}
//managers/ajax/users/userInventory.php //item_types[]=corrupted_radioactive_blue_cheese_potion & action=get_items
var C_shdefaultBCTrap = {'grand_arcanum_weapon' : 1, 'tarannosaurus_rex_weapon': 2, 'acronym_weapon': 3, 'ancient_box_trap_weapon': 4}, C_shdefaultBCTrapR = ['grand_arcanum_weapon','tarannosaurus_rex_weapon','acronym_weapon','ancient_box_trap_weapon'];
function shChangeTrap(weapon,base,charm,cheese) {
	return ("weapon=" + weapon + "&base=" + base + "&trinket=" + charm + "&bait=" + cheese);
}
function shTravel(destination) {
	return ("destination=" + destination);
}
function shPurchase(action,type,quantity) {
	if (action == "buy") action = 1; else if (action == "sell") action = 0;
	return ("type=" + type + "&quantity=" + quantity + "&buy=" + action);
}
function shUsePotion(potion,num_potions,recipe_index) {
	return ("potion=" + potion + "&num_potions=" + num_potions + "&recipe_index=" + recipe_index);
}
function shCraft(parts,craftQty) {
	var params = "";
	for (var key in parts) {
		if (parts.hasOwnProperty(key)) {
			params += "&parts[" + key + "]=" + parts[key];
		}
	}
	if (params.length > 0) params = params.slice(1);		
	
	params += "&craftQty=" + craftQty;
	return params;
}
function shHammer(type,quantity) {
	return ("item_type=" + type + "&item_qty=" + quantity);
}
function shUseConvertible(item_type,item_qty) {
	return ("item_type=" + item_type + "&item_qty=" + item_qty);
}
function shChangeBestTrap(type,priority) {
	shLoadOnce(C_shdefaultAction.GETTRAP,null,function () {
		var i,j,arrcomp = new Array,comp,match,luckbonus = data.user.has_shield ? 7 : 0,power,luck;
		for (i = 0;i < data.components.length;++i)
		{
			match = false;
			switch (type)
			{
				case BASE: match = (data.components[i].classification == "base") ? true : false;break;
				default: match = (data.components[i].powertype == C_powertype[type]) ? true : false;break;
			}
			if (match)
			{
				comp = new Object;
				comp.power = power = data.components[i].power * (1 + data.components[i].power_bonus);
				comp.luck = luck = data.components[i].luck;
				luck += luckbonus;
				comp.str = power + 4 * luck * luck;
				comp.attraction = data.components[i].attraction_bonus;
				comp.name = data.components[i].type;
				arrcomp.push(comp);
			}
		}
		if (arrcomp.length == 0) return;
		var prioritystr = C_trapprioritytype[priority];
		arrcomp.sort(function (a,b) {return b[prioritystr] - a[prioritystr];});
		var param = (type == BASE) ? shChangeTrap('',arrcomp[0].name,'','') : shChangeTrap(arrcomp[0].name,'','','');
		shLoad(C_shdefaultAction.CHANGETRAP,param,null);
	});
}
var sh_defaultScripts = [
	{
		name: 'default_iceberg',
		fullname: 'Iceberg (Base)',
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		content: shdefaultIceberg.toString().slice(29,-1)
	},
	{
		name: 'default_balackscove',
		fullname: "Balack's Cove (Cheese,Location)",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		content: shdefaultBalacksCove.toString().slice(33,-1)
	},
	{
		name: 'default_zugwangstowersimple',
		fullname: "Zugwang's Tower (Pawn,disarm CMC)",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		content: shdefaultZugwangsTowerSimple.toString().slice(41,-1)
	},
	{
		name: 'default_seasonalgarden',
		fullname: "Seasonal Garden (Trap)",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 0,afterHorn: 1,priority: 0, userSync: 0,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		content: shdefaultSeasonalGarden.toString().slice(36,-1)
	},
	{
		name: 'default_fierywarpath',
		fullname: "Fiery Warpath",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		content: shdefaultFieryWarpath.toString().slice(34,-1)
	},
	{
		name: 'default_furoma',
		fullname: "Furoma Cycle",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		content: shdefaultFuroma.toString().slice(28,-1)
	},
	{
		name: 'default_trapcheck',
		fullname: "Change Trap at Trapcheck",
		setting: {beforeTrapCheck: 1,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		content: shdefaultTrapcheck.toString().slice(31,-1)
	}
];

function shdefaultIceberg() {
	if (data.user.environment_id == 40)
	{
		var last_phase;
		if (window.localStorage.UOP_sh_d_IB_state == undefined) last_phase = "No phrase";
		else last_phase = window.localStorage.UOP_sh_d_IB_state;
		if (last_phase != data.user.quests.QuestIceberg.current_phase)
		{
			var param = '';
			switch (data.user.quests.QuestIceberg.current_phase)
			{
				case "General":shChangeBestTrap(BASE,TRAPAUTO);break;
				case "Treacherous Tunnels":param = shChangeTrap('','magnet_base','','');break;
				case "Brutal Bulwark":param = shChangeTrap('','spiked_base','','');break;
				case "Bombing Run":param = shChangeTrap('','remote_detonator_base','','');break;
				case "The Mad Depths":param = shChangeTrap('','hearthstone_base','','');break;
				case "Icewing's Lair":param = shChangeTrap('','deep_freeze_base','','');break;
				//case "The Hidden Depths":param = shChangeTrap('','deep_freeze_base','','');break; // no point of changing things here ?
			}
			if (param != '')
			{
				shLoad(C_shdefaultAction.CHANGETRAP,param,function () {window.localStorage.UOP_sh_d_IB_state = data.user.quests.QuestIceberg.current_phase;});
				return;
			}
		}
	}
	if (data.user.environment_id == 39)
	{
		if ((data.user.trinket_item_id == 877) || (data.user.trinket_item_id == 876))
		{
			shLoad(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
			return;
		}
		if (data.user.base_item_id == 899)
		{
			shChangeBestTrap(BASE,TRAPAUTO);
			return;
		}
	}
}
function shdefaultBalacksCove() {
	if (data.user.bait_item_id == 119)
	{
		if ((sh_clock.UOP_locationTimerBalacksCove.stateID == 2) ||
			((sh_clock.UOP_locationTimerBalacksCove.stateID == 1) && (sh_clock.UOP_locationTimerBalacksCove.timeleft < 15 * 60)) ||
			(data.user.bait_quantity == 0))
			{
				shLoadOnce(C_shdefaultAction.GETTRAP,null,function () {
						var i;
						var trap,besttrap = 5;
						for (i = 0;i < data.components.length;++i)
						{
							trap = C_shdefaultBCTrap[data.components[i].type];
							if (trap == undefined) trap = 5;
							if (besttrap < trap) besttrap = trap;
						}
						trap = C_shdefaultBCTrapR[besttrap];
						shLoad(C_shdefaultAction.CHANGETRAP,shChangeTrap(trap,'','','vanilla_stilton_cheese'),null);
					});
				return;
			}
	}
	if ((data.user.environment_id == 14) && ((data.user.bait_item_id == 119) || (data.user.bait_item_id == 118)))
	{
		shLoad(C_shdefaultAction.TRAVEL,shTravel("balacks_cove"),null);
		return;
	}
	if (data.user.bait_item_id == 118)
	{
		if (data.user.bait_quantity == 0)
		{
			shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("jungle_of_dread"),null);
			shChangeBestTrap(SHADOW,TRAPAUTO);
			return;
		}
	}
}
function shdefaultZugwangsTowerSimple() {
	if (data.user.environment_id == 32)
	{
		window.localStorage.UOP_sh_d_SG_state = 5;
		if (((data.user.weapon_item_id == 356) && (data.user.viewing_atts.zzt_tech_progress >= 8)) ||
		    ((data.user.weapon_item_id == 354) && (data.user.viewing_atts.zzt_mage_progress >= 8)))
			{
				shChangeBestTrap(TACTICAL,TRAPAUTO);
				return;
			}
	}
	if (data.user.environment_id == 31)
	{
		if (data.user.bait_item_id == 371)
		{
			shLoad(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','gouda_cheese'),null);
			return;
		}
	}
}
function shdefaultSeasonalGarden() {
	if (data.user.environment_id == 31)
	{
		if (data.user.bait_item_id == 371)
		{
			shLoad(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','gouda_cheese'),null);
			return;
		}
		
		if ((user.viewing_atts.zzt_amplifier == user.viewing_atts.zzt_max_amplifier) && (data.user.trinket_item_id == 647))
		{
			shLoad(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
			return;
		}
		
		var thisstate,laststate;
		if (window.localStorage.UOP_sh_d_SG_state == undefined) laststate = -1;
		else laststate = Number(window.localStorage.UOP_sh_d_SG_state);
		thisstate = sh_clock.UOP_locationTimerSeasonalGarden.stateID;
		if (laststate != thisstate)
		{
			switch (thisstate)
			{
				case 0:shChangeBestTrap(PHYSICAL,TRAPAUTO);break;
				case 1:shChangeBestTrap(TACTICAL,TRAPAUTO);break;
				case 2:shChangeBestTrap(SHADOW,TRAPAUTO);break;
				case 3:shChangeBestTrap(HYDRO,TRAPAUTO);break;
			}
			window.localStorage.UOP_sh_d_SG_state = thisstate;
		}
	}
}
function shdefaultFieryWarpath() {
	if (data.user.environment_id == 33)
	{
		//cross streak
		//number of commander charm left
		//number of retreat mouse
		//IF (0 <= STREAK <= LOWSTREAK) ARM PROPERTYPE CHARM & CHEESE 
		//IF (LOWSTREAK <= STREAK <= HIGHSTREAK) ARM SUPER CHARM & CHEESE
		//IF (WAVE == COMMANDER && GAGASTREAK > STREAK >= COMMANDERSTREAK) ARM COMMANDER
		//IF (WAVE == COMMANDER && COMMANDERGAGASTREAK <= STREAK) ARM GAGASETUP
		//IF (WAVE != COMMANDER && GAGASTREAK <= STREAK) ARM GAGASETUP
		return;
	}
}
function shdefaultFuroma() {
	//if (in 8 19 23)
	//if (BAIT QUANTITY == 0)
	//{
		//GET FUROMA BAIT => IF (HAVE BAIT || CAN CRAFT) CHANGE LOCATION => ARM BAIT
		//GET ITEM CURD > AMOUNT => POKE
		//IF (FORCE MAKI ?) => GET MAKI BAIT => IF (HAVE BAIT) CHANGE LOCATION => ARM BAIT
		//BRIE
	//}
}
function shdefaultTrapcheck() {
	if (sh_mode == BEFORETRAPCHECK)
	{
		//var tcweapon = ...;
		//var tcbase = ...;
		//var tctrinket = ...;
		//var tcbait = ...;
		//if ((tcweapon != '') || (tcbase != '') || (tctrinket != '') || (tcbait != '')) shChangeTrap(weapon,base,trinket,bait);
		return;
	}
	else
	{
		//var weapon = ...;
		//var base = ...;
		//var trinket = ...;
		//var bait = ...;
		//if (data.user.weapon_item_id == '') weapon = '';
		//if (data.user.base_item_id == '') base = '';
		//if (data.user.trinket_item_id == '') trinket = '';
		//if (data.user.bait_item_id == '') bait = '';
		//if ((weapon != '') || (base != '') || (trinket != '') || (bait != '')) shChangeTrap(weapon,base,trinket,bait);
		return;
	}
}