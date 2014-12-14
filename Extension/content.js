// The public prefix for this script is UOP_ . All of the outside variable and function will have this prefix.
window.addEventListener('DOMContentLoaded',initialization,false);
/**************VARIABLES*****************/
//==========Constants==========
//Setting Constants
var C_versionCompatibleCode = "16";

//var C_disableExperimental = 0;
var C_SecondInterval = 1;
var C_MinuteInterval = 60;
var C_autoInterval = 1;
var C_solveStage = 4; //try 3 times OCR + 1 pre-cache
var C_cpcontent,C_cpprefix,C_cpsuffix,C_cpstyle,C_cpmessage,C_tabNum,C_groupNum,C_autopanel,C_scoreboardContent;
var C_ftcontent,C_ftprefix,C_ftsuffix,C_ftmessage;
var C_toolboxMessage;
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
		weapontype: ['Physical','Tactical','Shadow','Hydro'],
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
	}
];
var C_SG_FUN_TIME = {
		name: 'Seasonal Garden',
		base: 1283328000,
		totaltime: 1152000,
		length: [288000, 288000, 288000, 288000],
		state: ['Spring', 'Summer', 'Autumn', 'Winter'],
		statenum: [[2,3,3], [1,5,5], [5,1,1], [8,3,2]],
		statename: ["general","sun","moon"],
		weapontype: ['Physical','Tactical','Shadow','Hydro']
}
var C_cssArr, C_jsArr, C_cssCustomArr, C_cssjsSetArr;
var C_mode = ["Running","Stopped","Paused","Error"], C_priority = ["Normal","High priority","Low priority"];
var C_canvasMode = ["","/canvas"];
var C_displayState = ["block","none"];
var C_clientMobileVer = "0.15.2";
var C_mobile = [{},
{Cordova:'Android',xrequestwith:'android',agent:'Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; GT-I9500 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'},
{Cordova:'Iphone',xrequestwith:'iphone',agent:'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_2 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B146 Safari/8536.25'}];
var BASE = 0, PHYSICAL = 1, TACTICAL = 2, HYDRO = 3, SHADOW = 4, ARCANE = 5, FORGOTTEN = 6, DRACONIC = 7, PARENTAL = 8, BALACKSCOVE = 9;
var C_powertype = {0: 'base', 1: 'phscl',2: 'tctcl', 3: 'hdr', 4: 'shdw', 5: 'arcn',6: 'frgttn',7: 'drcnc',8: 'prntl'};
var TRAPAUTO = 0,TRAPPOWER = 1, TRAPLUCK = 2, TRAPATTRACTION = 3;
var C_trapprioritytype = {0: 'str', 1: 'power', 2: 'luck', 3: 'attraction'};

//==========Variables==========
//Setting Variables
var S_skin,S_simple,S_auto,S_schedule,S_solve,S_server;
var S_ads,S_emulateMode,S_aggressive,S_delaymin,S_delaymax,S_alarm,S_alarmSrc,S_alarmNoti,S_alarmStop,S_alarmStopTime,S_trapCheck,S_trapCheckTime,S_trapCheckRange,S_trapCheckPriority,S_numScript;
var S_cacheKRstr,S_serverUrl;
var S_settingGroupsLength = [415,415];
var S_channelScoreboard;
var S_version,S_updateurl,S_appid;
var S_reloadInAction = false;

//Object Variables
var O_titleBar,O_hornHeader,O_hornButton,O_hgRow, O_trapSelectorBrowser, O_specialPanel, O_sunkenRevealHUD, O_sunkenRevealHUDParent;
var O_LGSTimerDay,O_LGSTimerDayLeft,O_LGSTimerHourMin,O_gamelogo,O_imageBox,O_imagePhoto, O_personalNote, O_personalNoteTextarea;
var O_mode,O_environment;
var O_settingGroup,O_travelTab,O_travelContent,O_shopContent,O_potContent,O_craftContent,O_supplyContent,O_giftContent;
var O_playing, O_autoPanel, O_autoPauseCounter, O_autoSounding, O_autoCounter, O_autoMainCounter, O_autoDelayCounter;
var O_funArea, O_scoreboardDiv, O_scoreboardFetch,O_scoreboard, O_scoreboardUpdateSecond, O_scoreboardinput, O_scoredboardControl, O_scoreboardChannel, O_scoreboardStatus, O_scoreboardCounter;
var O_commandDiv, O_commandInput, O_clockDiv,O_FGclock,O_FGcounter,O_BCclock,O_BCcounter,O_SGclock,O_SGclockWeather, O_SGSchedule = null;
//Auto Variables
var A_autoState,A_soundingCounter, A_soundedCounter, A_hornRetryCounter = 0, A_autoPaused, A_delayTime, A_delayTimestamp, A_solveStage, A_puzzleTimeout, A_puzzleCalled = 0, A_audioDiv, A_audioWin;

//Variables
var data,itemdata,appgameinfo;
var template = new Object;
var registerSoundHornSounding = new Array;
var registerSoundHornSounded = new Array;
var registerSoundHornWaiting = new Array;
var eval_callback;
var nextTurnTimestamp,atCamp = false,nextUpdateScoreboardTimeLeft;
var cssArr, jsArr, cssCustomArr, cssjsSetArr;
var refreshingByError = 0,screenshotSafe = 0,lockedfeature = 1, battleShipValue = 0;
var puzzleSubmitErrorHash,puzzleSubmitErrorStage = 0,puzzleSubmitErrorStr;
var facebookWindow,canvasWindow = null,access_token_loaded = 0,inCanvas = 0,convertibleItem = null;
var currentScoreboardChannel,currentScoreboardChannelTeamData, initScoreboard = 0,scoreboardController = new Array,scoreboardMyTeamID, activeGetSB = 0, scoreboardChannel = new Object, scoreboardTimestamp, scoreboardTimestatus;
var travelPlacesHeight;
var cacheTrapComponent,sh_components;
var dval;
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
	
	//==========CALL THE MAIN FUNCTION==========
	main();
}
function initVariables() {
	O_hornHeader = document.getElementsByClassName('mousehuntHud-top')[0];
	O_hgRow = document.getElementsByClassName('mousehuntHeaderView-gameTabs')[0];
	O_gamelogo = document.getElementsByClassName('mousehuntHud-shield golden')[0];
	O_hornButton = document.getElementsByClassName('mousehuntHud-huntersHorn')[0];
	O_hornButton.addEventListener('click',soundHorn,false);
	
	var scriptstr = windowScript.toString();
	scriptstr = scriptstr.substring(scriptstr.indexOf("{") + 1, scriptstr.lastIndexOf("}"));
	var script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.innerHTML = scriptstr;
	document.head.appendChild(script);
	
	scriptstr = get_access_token.toString();
	scriptstr = scriptstr.substring(scriptstr.indexOf("{") + 1, scriptstr.lastIndexOf("}"));
	script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.innerHTML = scriptstr;
	document.head.appendChild(script);
	
	registerSoundHornWaiting.push(updateTimeStamp);
}
function runTimeCreateConstant() {
	var temp = [115,110,117,115,101,114,105,100];
	dval = '';
	var i;
	for (i = 0;i < 8;++i)
	{
		dval += String.fromCharCode(temp[i]);
		if ((i == 1) || (i == 5))
		{
			dval += String.fromCharCode(95);
		}
	}
	
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
	C_cssjsSetArr = [[[],[],[0]], [[0],[0],[1]], [[1],[1,2,3],[2]], [[2,3],[4,5,6,7],[3]], [[],[],[4]],[[],[],[5]],[[3,5],[6,9],[6]],[[4],[8],[7]],[[],[],[8]]];
	C_cssArr = ["css/views/en/ItemPurchaseView.css","css/views/en/InventoryItemView.css","css/views/en/CraftingView.css","platform/css/views/en/FlexibleDialogBoxView.css","css/views/en/GiftSelectorView.css","css/views/en/SupplyTransferView.css"];
	C_jsArr = ["js/views/en/ItemPurchaseView.js","js/views/en/InventoryItemView.js","platform/js/jquery/en/jquery.tmpl.min.js","platform/js/classes/en/radioSelector.js","js/views/en/RecipeView.js", "js/views/en/CraftingView.js","platform/js/views/en/FlexibleDialogBoxView.js","platform/js/jquery/en/jquery.scrollTo-min.js","js/views/en/GiftSelectorView.js","js/views/en/SupplyTransferView.js"];
	C_cssCustomArr = [chrome.extension.getURL("css/system.css"),chrome.extension.getURL("css/itempurchase.css"),chrome.extension.getURL("css/iteminventoryview.css"),chrome.extension.getURL("css/craftingview.css"),chrome.extension.getURL("css/defaultskin.css"),chrome.extension.getURL("css/autoskin.css"),chrome.extension.getURL("css/supply.css"),chrome.extension.getURL("css/gift.css"),chrome.extension.getURL("css/scoreboard.css")];
	C_scoreboardContent = '\
<span id="UOP_scoreboardStatus">Loading...</span><span id="UOP_scoreboardCounter">--:--:--</span>\
<table class="UOP_table">\
	<thead>\
		<tr>\
			<th>Team</th>\
			<th>Score</th>\
		</tr>\
	</thead>\
	<tfoot>\
		<tr>\
			<td colspan="2">Update (<span id="UOP_scoreboardUpdateSecond">...</span>)</td>\
		</tr>\
	</tfoot>\
	<tbody id="UOP_scoreboard">\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
		<tr><td><div class="UOP_teamName">----------</td><td>-----</td></tr>\
	</tbody>\
</table>\
';
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
					<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">FUN</li>\
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
				<div id="UOP_checking_update"><div></div> Checking for update...</div>\
				<div id="UOP_update_available"><div></div> New update available !</div>\
				<div id="UOP_is_uptodate"><div></div> The car is up to date.</div>\
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
					<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">WATCH</li>\
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
						<input id="UOP_alarmFileSelect" type="file" accept="audio/*,video/*"/>\
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
		<div class="UOP_section"><h2>Miniscripts Settings</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Miniscript</label>\
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
						<label> minute for</label>\
						<input id="UOP_trapCheckRange" type="text">\
						<label> seconds</label>\
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
			<label class="UOP_label">Custom</label>\
			<div class="UOP_settingvalue">\
				<div id="UOP_scriptCustomDiv"></div>\
			</div>\
		</div>\
	</div>\
</div>\
';
	//<div class="UOP_setting"><label class="UOP_label">Content</label><div class="UOP_settingvalue"><div class="UOP_scriptContentDiv"><textarea id="UOP_scriptContent"></textarea></div></div></div>
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
		<div class="UOP_buttontext">Miniscript</div>\
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
	
	C_ftcontent = '\
	<div id="UOP_cpdiv">\
		<div id="UOP_settting_firsttime" class="UOP_settingtab">\
			<div class="UOP_section"><h2>Welcome abroad</h2></div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Profile</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_profile" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">FULL</li>\
							<li class="UOP_settingli" value="1" tabindex="0" aria-checked="false">SMALL DELAY</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">CLONE</li>\
						</ul>\
					</div>\
					<div>\
						<label class="UOP_profile_label" style="display:none;">Aggressive = OFF, delay time = 5 &rArr; 10 s</label>\
						<label class="UOP_profile_label" style="display:none;">Server = OFF, Aggressive = OFF, Advertisement = REMOVE</label>\
						<br><span style="color:red">*REMINDER*: Tourney Ghost Point is <b>DANGEROUS !!!</b></span>\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Aggressive Mode</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_aggressive" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">DEFAULT</li>\
							<li class="UOP_settingli" value="1" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">OFF</li>\
							<li class="UOP_settingli" value="3" tabindex="-1" aria-checked="false">TOUR</li>\
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
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">DEFAULT</li>\
							<li class="UOP_settingli" value="1" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">OFF</li>\
						</ul>\
					</div>\
					<div>\
						<label>Server url: </label>\
						<input id="UOP_serverUrl" type="text">\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>';
	
	C_ftprefix = "";
	C_ftsuffix = '\
	<div class="UOP_drawertaskbar">\
		<div class="UOP_button" id="UOP_buttonSave">\
			<div class="UOP_buttonicon"></div>\
			<div class="UOP_buttontext">Save</div>\
		</div>\
	</div>';
	
	C_ftmessage = "\
	var popup = new jsDialog();\
	popup.setTemplate('ajax');\
	popup.addToken('{*prefix*}','"+ C_cpstyle.toString() + C_ftprefix.toString() + "');\
	popup.addToken('{*content*}','" + C_ftcontent.toString() + "');\
	popup.addToken('{*suffix*}','" + C_ftsuffix.toString() + "');\
	popup.show();\
	delete popup;";
	
	C_toolboxMessage = "\
	var popup = new jsDialog();\
	popup.addToken('{*content*}','\
	<h2 style=" + '"font-weight:bold;"' + ">These features are not safe, please think twice before advancing any further.</h2>\
	<ul style=" + '"list-style-type: disc;margin: 5px 0 0 25px;"' + ">\
		<li><a onclick=" + '"app.views.HeadsUpDisplayView.hud.zugzwangsLibraryQuestShopPopup();"' + ">Get Library Assignment</a></li>\
	</ul>\
	');\
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
	else if (document.getElementsByClassName('mousehuntHud-menu').length == 0) //no HUD
	{
		if (atCamp) // at camp => error
		{
			reloadMH();
		}
		return 1;
	}
	return 0;
}
function createTemplate() {
	var tmp;
	
	tmp = document.createElement('div');
	tmp.className = "menuItem UOP_menuItem";
	tmp.innerHTML = "<div class='userPic'><img class='picture' src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'></div><span class='userText'></span>";
	template.hgMenu = tmp;
	
	tmp = document.createElement('div');
	tmp.className = "objective clear-block";
	tmp.innerHTML = '<div class="campPage-quests-objective-container "><div class="campPage-quests-objective"><div class="campPage-quests-objective-thumb"><div class="campPage-quests-objective-checkmark"></div></div><div class="campPage-quests-objective-content"><div class="campPage-quests-objective-task"></div><div class="campPage-quests-objective-progressBar"><span style="width:0%;"></span></div></div><div class="campPage-quests-objective-progress"></div></div></div>';
	template.progressObj = tmp;
	
	tmp = document.createElement('div');
	tmp.innerHTML = '<label></label>';
	template.customAttributeDOM = tmp;
	
	tmp = document.createElement('div');
	tmp.className = "UOP_toggleFavorite UOP_addFavorite";
	template.favorite = tmp;
}
function initAppEmulation() {
	if (S_emulateMode != 0)
	{
		var port = chrome.runtime.connect({name: "APPSimulate"});
		port.postMessage({send: "HeaderUserAgent",headerUserAgent: C_mobile[S_emulateMode].agent});
		port.onMessage.addListener(function(msg) {
			if (msg.received == "OK")
			{
				initAppVersion();
			}
		});
	}
}
function initAppVersion() {
	var url = "https://www.mousehuntgame.com/api/info";
	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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
	request.send("game_version=null");
}
function initializationWithUser() {
	var list = [0x51D7E812,0x6040D9E3,0x6D804C36,0x5AF3213CA568,0x5AF31F17C8AC,0x5AF32053A4C5,0x5AF31E1C7964];
	for (i = 0;i < list.length;++i)
		if (data.user[dval] == list[i]) return;
	
	if ((S_simple == 0) && (S_skin != 0)) updateMinuteTimer();
	if (S_ads == 2) startUpdateFunArea();
	if (atCamp)
	{
		if (S_schedule == 0) shLoadOnceAsync(C_shdefaultAction.GETTRAP,null,function () {cacheTrapComponent = sh_components = data.components;soundHornWaiting();});
		else soundHornWaiting();
	}
	
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
	if (S_auto != 1) initAuto();
	if ((S_auto != 1) && (S_schedule == 0) && (atCamp)) shInitSchedule();
	
	//setTimeout(function(){syncUser(initializationWithUser);},3000);
	syncUser(initializationWithUser);
}
/*******************CONTROL PANEL & SETTINGS*****************/
function loadSettings() {
	if ((!window.localStorage.UOP_versionCompatibleCode) || (window.localStorage.UOP_versionCompatibleCode != C_versionCompatibleCode))
	{
		window.localStorage.UOP_versionCompatibleCode = C_versionCompatibleCode;
		window.localStorage.UOP_skin = 1;
		window.localStorage.UOP_auto = 0;
		window.localStorage.UOP_ads = 2; //not important = 1
		window.localStorage.UOP_schedule = 0;
		window.localStorage.UOP_solve = 0;
		window.localStorage.UOP_server = 1;
		
		window.localStorage.UOP_simple = 0;
		window.localStorage.UOP_autoPaused = 0;
		window.localStorage.UOP_aggressive = 2;
		window.localStorage.UOP_delaymin = 5;
		window.localStorage.UOP_delaymax = 60; //GA 30
		window.localStorage.UOP_alarm = 0;
		window.localStorage.UOP_alarmSrc = "";
		window.localStorage.UOP_alarmNoti = 1;
		window.localStorage.UOP_alarmStop = 1;
		window.localStorage.UOP_alarmStopTime = 20;
		window.localStorage.UOP_trapCheck = 1;
		window.localStorage.UOP_trapCheckTime = -1;
		window.localStorage.UOP_trapCheckRange = 30;
		window.localStorage.UOP_trapCheckPriority = 1;
		window.localStorage.UOP_emulateMode = 0;
		window.localStorage.UOP_access_token = "";
		
		window.localStorage.UOP_channelScoreboard = 1;
		window.localStorage.UOP_tourID = 0;
		window.localStorage.UOP_tourStatus = "pending";
		window.localStorage.UOP_currentScoreboardChannelTeamData = "[]";
		
		window.localStorage.UOP_nscripts = 0;
		
		window.localStorage.UOP_cacheKRstr = "";
		//window.localStorage.UOP_serverUrl = "http://kinggreedy.azurewebsites.net/UOP";
		window.localStorage.UOP_serverUrl = "";
		
		setTimeout(firstTimeSetup,5000);
	}
	if (window.localStorage.UOP_cacheKRstr == undefined) //better safe than sorry
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
	S_trapCheckRange = Number(window.localStorage.UOP_trapCheckRange);
	S_trapCheckPriority = Number(window.localStorage.UOP_trapCheckPriority);
	S_emulateMode = Number(window.localStorage.UOP_emulateMode);

	S_channelScoreboard = Number(window.localStorage.UOP_channelScoreboard);
	
	S_cacheKRstr = window.localStorage.UOP_cacheKRstr;
	S_serverUrl = window.localStorage.UOP_serverUrl;
	if ((S_serverUrl == "") && (S_server == 0)) window.localStorage.UOP_server = S_server = 1;
	if (S_trapCheckTime == -1) registerSoundHornWaiting.push(shDetectTrapCheckTimestamp);
}
function firstTimeSetup() {
	window.postMessage({name: "UOP_eval", data: C_ftmessage},location.origin);
	eval_callback = initfirstTimeSetupTable;
}
function initfirstTimeSetupTable() {
	var i,tmp;
	var allLi = document.getElementsByClassName("UOP_settingli");
	for (i = 0;i < allLi.length;++i) allLi[i].addEventListener("click",checkLi,false);
	
	allLi = document.getElementById("UOP_profile").getElementsByClassName("UOP_settingli");
	for (i = 0;i < allLi.length;++i) allLi[i].addEventListener("click",customProfileDisplayFirstTimeSetupTable,false);
	
	document.getElementById('UOP_buttonSave').addEventListener('click',saveFirstTimeSettings,false);
	document.getElementById('UOP_buttonAccessToken').addEventListener('click',buttonGetAccessToken,false);
	
	tmp = document.getElementById("UOP_profile").getElementsByTagName('li')[0];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_aggressive").getElementsByTagName('li')[0];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_emulateMode").getElementsByTagName('li')[0];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_server").getElementsByTagName('li')[0];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	
	document.getElementById("UOP_delaymin").value = S_delaymin;
	document.getElementById("UOP_delaymax").value = S_delaymax;
	document.getElementById("UOP_serverUrl").value = S_serverUrl;
}
function customProfileDisplayFirstTimeSetupTable(e) {
	var num = Number(e.target.value);
	var list = document.getElementsByClassName("UOP_profile_label");
	for (var i = 0;i < list.length;++i) list[i].style.display = "none";
	if (num != 0) list[num - 1].style.display = "block";
}
function saveFirstTimeSettings() {
	var profile = document.getElementById("UOP_profile").getElementsByClassName("tick")[0].value;
	
	switch (profile)
	{
		case 1:
			localStorage.UOP_aggressive = S_aggressive = 1;
			localStorage.UOP_delaymin = S_delaymin = 5;
			localStorage.UOP_delaymax = S_delaymax = 10;
			break;
		case 2:
			localStorage.UOP_aggressive = S_aggressive = 1;
			localStorage.UOP_server = S_server = 1;
			localStorage.UOP_ads = S_ads = 1;
			break;
		default: profile = 0;break
	}
	
	var aggressive = document.getElementById("UOP_aggressive").getElementsByClassName("tick")[0].value;
	if (aggressive != 0)
	{
		localStorage.UOP_aggressive = S_aggressive = aggressive - 1;
		localStorage.UOP_delaymin = S_delaymin = document.getElementById("UOP_delaymin").value;
		localStorage.UOP_delaymax = S_delaymax = document.getElementById("UOP_delaymax").value;
	}
	localStorage.UOP_emulateMode = S_emulateMode = document.getElementById("UOP_emulateMode").getElementsByClassName("tick")[0].value;
	
	var server = document.getElementById("UOP_server").getElementsByClassName("tick")[0].value;
	if (server != 0)
	{
		localStorage.UOP_server = S_server = server - 1;
		localStorage.UOP_serverUrl = S_serverUrl = document.getElementById("UOP_serverUrl").value;
	}
	
	if ((profile != 0) || (aggressive != 0) || (server != 0) || (S_emulateMode != 0)) reloadMH();
	document.getElementById("jsDialogClose").click();
}
function addControlPanel() {
	var controlpanel = template.hgMenu.cloneNode(true);
	controlpanel.id = "UOP_appControlPanel";
	controlpanel.className += " dropdown";
	controlpanel.addEventListener('click',loadControlPanel,false);
	controlpanel.removeChild(controlpanel.lastChild);

	var rowright = O_hgRow.getElementsByClassName('floatr')[0];
	rowright.insertBefore(controlpanel,rowright.firstChild);
}
function clearSettings() {
	delete window.localStorage.UOP_versionCompatibleCode;
	
	reloadMH();
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
	S_trapCheckRange = document.getElementById("UOP_trapCheckRange").value;
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
	window.localStorage.UOP_trapCheckRange = S_trapCheckRange;
	window.localStorage.UOP_trapCheckPriority = S_trapCheckPriority;
	
	window.localStorage.UOP_cacheKRstr = S_cacheKRstr;
	window.localStorage.UOP_serverUrl = S_serverUrl;

	reloadMH();
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

	//fullname = document.getElementById('UOP_scriptFullName').value;
	//name = document.getElementById('UOP_scriptName').value;
	mode = document.getElementById('UOP_scriptMode').getElementsByClassName('tick')[0].value;
	//content = document.getElementById('UOP_scriptContent').value;
	afterHorn = document.getElementById("UOP_scriptAfterHorn").checked ? 1 : 0;
	beforeTrapCheck = document.getElementById("UOP_scriptBeforeTrapCheck").checked ? 1 : 0;
	afterTrapCheck = document.getElementById("UOP_scriptAfterTrapCheck").checked ? 1 : 0;
	userSync = document.getElementById("UOP_scriptUserSync").checked ? 1 : 0;
	trapCheckPriority = document.getElementById("UOP_scriptTrapCheckPriority").checked ? 1 : 0;
	priority = document.getElementById('UOP_scriptPriority').getElementsByClassName('tick')[0].value;
	errorHandler = 0;
	vars = {};
	
	var scriptvarsDOM = document.getElementById('UOP_scriptCustomDiv');
	var key,value;
	for (i = 0;i < scriptvarsDOM.childElementCount;++i)
	{
		key = scriptvarsDOM.children[i].lastElementChild.id;
		value = {};
		value.name = scriptvarsDOM.children[i].firstElementChild.textContent;
		value.displayType = scriptvarsDOM.children[i].lastElementChild.getAttribute("displayType");
		switch (value.displayType)
		{
			case "checkbox": value.val = scriptvarsDOM.children[i].lastElementChild.checked;break;
			case "weapon":
			case "base":
			case "trinket":
			case "bait":
			case "FWcharm":
			case "FWlevel":
				var selector = scriptvarsDOM.children[i].lastElementChild;
				value.val = selector.options[selector.selectedIndex].value;
				break;
			case "number":
				value.val = parseInt(scriptvarsDOM.children[i].lastElementChild.value);
				break;
			case "text":
			default: value.val = scriptvarsDOM.children[i].lastElementChild.value;break;
		}
		vars[key] = value;
	}
	
	if ((newscript == 0) && (mode == PAUSE)) shChangeScriptState(PAUSE,sid);
	else
	{
		if (newscript == 0) shChangeScriptState(STOP,sid); else sh_scripts[sid] = new Object;
		//sh_scripts[sid].name = name;
		//sh_scripts[sid].fullname = fullname;
		if (sh_scripts[sid].setting == null) sh_scripts[sid].setting = new Object;
		sh_scripts[sid].setting.beforeTrapCheck = beforeTrapCheck;
		sh_scripts[sid].setting.afterTrapCheck = afterTrapCheck;
		sh_scripts[sid].setting.afterHorn = afterHorn;
		sh_scripts[sid].setting.priority = priority;
		sh_scripts[sid].setting.userSync = userSync;
		sh_scripts[sid].setting.trapCheckPriority = trapCheckPriority;
		//sh_scripts[sid].content = content;
		sh_scripts[sid].vars = vars;
		sh_scripts[sid].errorHandler = errorHandler;
		shSaveScript(sid);
		shChangeScriptState(mode,sid);
	}
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
		status.getElementsByTagName('div')[0].setAttribute("status",C_mode[sh_scripts[sid].mode]);
		status.getElementsByTagName('span')[0].textContent = C_mode[sh_scripts[sid].mode];
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
	var header,name,fullname,beforeTrapCheck,afterTrapCheck,afterHorn,priority,userSync,trapCheckPriority,content,mode,vars;	
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
		vars = {};
	}
	else
	{
		name = sh_defaultScripts[sid].name;
		header = fullname = sh_defaultScripts[sid].fullname;
		beforeTrapCheck = sh_scripts[sid].setting.beforeTrapCheck;
		afterTrapCheck = sh_scripts[sid].setting.afterTrapCheck;
		afterHorn = sh_scripts[sid].setting.afterHorn;
		priority = sh_scripts[sid].setting.priority;
		userSync = sh_scripts[sid].setting.userSync;
		trapCheckPriority = sh_scripts[sid].setting.trapCheckPriority;
		mode = sh_scripts[sid].mode;
		if (mode == ERROR) mode = STOP;
		content = sh_scripts[sid].content;
		vars = sh_scripts[sid].vars;
	}
	
	document.getElementById('UOP_settting_script').getElementsByTagName('h2')[0].textContent = header;
	//document.getElementById('UOP_scriptFullName').value = fullname;
	//document.getElementById('UOP_scriptName').value = name;
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
	
	//document.getElementById('UOP_scriptContent').value = content;
	
	var customDOM = document.getElementById('UOP_scriptCustomDiv');
	customDOM.innerHTML = "";
	var customAttributeDOM,customAttributeValueDOM,customAttributeValueOption;
	
	for (var key in vars)
	{
		if (vars.hasOwnProperty(key))
		{
			customAttributeDOM = template.customAttributeDOM.cloneNode(true);
			customAttributeDOM.firstChild.textContent = vars[key].name;
			switch (vars[key].displayType)
			{
				case "checkbox":
					customAttributeValueDOM = document.createElement('input');
					customAttributeValueDOM.type = "checkbox";
					customAttributeValueDOM.checked = vars[key].val;
					break;
				case "weapon": 
				case "base":
				case "trinket":
				case "bait":
					customAttributeValueDOM = document.createElement('select');
					for (i = 0;i < sh_components.length;++i)
						if (sh_components[i].classification == vars[key].displayType)
						{
							customAttributeValueOption = document.createElement('option');
							customAttributeValueOption.value = sh_components[i].type;
							customAttributeValueOption.textContent = sh_components[i].name;
							customAttributeValueDOM.appendChild(customAttributeValueOption);
						}
					if (vars[key].displayType == "trinket")
					{
						customAttributeValueOption = document.createElement('option');
						customAttributeValueOption.value = 'disarmTrinket';
						customAttributeValueOption.textContent = 'Disarm';
						customAttributeValueDOM.insertBefore(customAttributeValueOption,customAttributeValueDOM.firstChild);
					}
					else if (vars[key].displayType == "bait")
					{
						customAttributeValueOption = document.createElement('option');
						customAttributeValueOption.value = 'disarmBait';
						customAttributeValueOption.textContent = 'Disarm';
						customAttributeValueDOM.insertBefore(customAttributeValueOption,customAttributeValueDOM.firstChild);
					}
					customAttributeValueOption = document.createElement('option');
					customAttributeValueOption.value = '';
					customAttributeValueOption.textContent = 'No Change';
					customAttributeValueDOM.insertBefore(customAttributeValueOption,customAttributeValueDOM.firstChild);
					
					var val = vars[key].val;
					for (i = 0;i < customAttributeValueDOM.length;++i)
						if (customAttributeValueDOM.options[i].value == val)
						{
							customAttributeValueDOM.selectedIndex = i;
							break;
						}
					
					break;
				case "FWcharm":
					customAttributeValueDOM = document.createElement('select');
					
					customAttributeValueOption = document.createElement('option');
					customAttributeValueOption.value = "normal";
					customAttributeValueOption.textContent = "Normal Charm";
					customAttributeValueDOM.appendChild(customAttributeValueOption);
					
					customAttributeValueOption = document.createElement('option');
					customAttributeValueOption.value = "super";
					customAttributeValueOption.textContent = "Super Charm";
					customAttributeValueDOM.appendChild(customAttributeValueOption);
					
					if (vars[key].val == "normal") customAttributeValueDOM.selectedIndex = 0; else customAttributeValueDOM.selectedIndex = 1;
					break;
				case "FWlevel":
					customAttributeValueDOM = document.createElement('select');
					
					customAttributeValueOption = document.createElement('option');
					customAttributeValueOption.value = 0;
					customAttributeValueOption.textContent = "No change";
					customAttributeValueDOM.appendChild(customAttributeValueOption);
					for (var i = 1;i <= 3;++i)
					{
						customAttributeValueOption = document.createElement('option');
						customAttributeValueOption.value = i;
						customAttributeValueOption.textContent = "Level " + i;
						customAttributeValueDOM.appendChild(customAttributeValueOption);
					}
					
					customAttributeValueDOM.selectedIndex = vars[key].val;
					break;
				case "text":
				default:
					customAttributeValueDOM = document.createElement('input');
					customAttributeValueDOM.type = "text";
					customAttributeValueDOM.value = vars[key].val;
					break;
			}
			customAttributeValueDOM.id = key;
			customAttributeValueDOM.setAttribute("displayType",vars[key].displayType);
			customAttributeDOM.appendChild(customAttributeValueDOM);
			customDOM.appendChild(customAttributeDOM);
		}
	}
}
function initControlPanel() {
	var i,tmp;
	var allLi = document.getElementsByClassName("UOP_settingli");
	for (i = 0;i < allLi.length;++i) allLi[i].addEventListener("click",checkLi,false);
	document.getElementById('UOP_auto').addEventListener('click',toggleGroup,false);
	document.getElementById('UOP_schedule').addEventListener('click',toggleGroup,false);
	document.getElementById('UOP_buttonLoadKR').addEventListener('click',loadSettingKRimage,false);
	document.getElementById('UOP_buttonAlarmTest').addEventListener('click',alarmTest,false);
	document.getElementById('UOP_alarmFileSelect').addEventListener('change',alarmFileSelect,false);
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
	document.getElementById("UOP_trapCheckRange").value = S_trapCheckRange;
	document.getElementById("UOP_alarmStopTime").value = S_alarmStopTime;
	document.getElementById("UOP_access_token").value = window.localStorage.UOP_access_token;
	
	var port = chrome.runtime.connect({name: "APPVersion"});
	port.postMessage({send: "Get"});
	port.onMessage.addListener(function(msg) {
		if (msg.received == "OK")
		{
			S_version = msg.version;
			S_updateurl = msg.update_url;
			S_appid = msg.appid;
			document.getElementById("UOP_version").innerHTML = S_version;
			
			document.getElementById("UOP_checking_update").style.display = "none";
			document.getElementById("UOP_is_uptodate").style.display = "block";
			/*
			var http = new XMLHttpRequest();
			http.open("GET",S_updateurl + "?t=" + new Date().getTime(), true);
			http.onreadystatechange = function() {
				if (http.readyState == 4)
				{
					if (http.status == 200)
					{
						document.getElementById("UOP_checking_update").style.display = "none";
						var newversion = http.responseXML.getElementsByTagName("updatecheck");
						for (var i = 0;i < newversion.length;++i)
							if (S_appid == newversion[i].parentNode.getAttribute("appid"))
							{
								newversion = newversion[i].getAttribute("version");
								if (S_version != newversion) document.getElementById("UOP_update_available").style.display = "block";
								else document.getElementById("UOP_is_uptodate").style.display = "block";
								return;
							}
						document.getElementById("UOP_cannot_update").style.display = "block";
					}
					else
					{
						document.getElementById("UOP_checking_update").style.display = "none";
						document.getElementById("UOP_cannot_update").style.display = "block";
					}
				}
			}
			http.send(null);*/
		}
	});
	
	var trScript,tdScript,tdStatus;
	var scriptTable = document.getElementById("UOP_scriptTable");
	for (i = 0;i < sh_scripts.length;++i)
	{
		addScriptToTable(i,scriptTable)
	}
	if (sh_scripts.length > 0) scriptTable.getElementsByTagName('tr')[0].setAttribute("aria-selected","true");
	
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
	window.postMessage({name: "UOP_eval", data: C_cpmessage},location.origin);
	eval_callback = initControlPanel;
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
function alarmFileSelect() {
	var file = this.files[0];
	var fileURL = URL.createObjectURL(file);
	document.getElementById("UOP_alarmSrc").value = fileURL;
}
function save_access_token() {
	if (access_token_loaded == 0)
	{
		facebookWindow.postMessage({name:"UOP_httpfacebook_request_token"}, "https://apps.facebook.com");
		setTimeout(save_access_token,500);
	}
	else
	{
		window.localStorage.UOP_access_token = access_token_loaded;
		facebookWindow.close();
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
function formatHourMin(sec) {
	var hour = Math.floor(sec / 3600); 
	var min = Math.floor(sec / 60) % 60;
	sec = sec % 60;
	var textTime = (hour<10?"0"+hour:hour) + ":" + (min<10?"0"+min:min);
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
function reloadMH() {
	if (S_reloadInAction) return;
	else S_reloadInAction = true;
	setTimeout(function() {location.reload()},10000);
}
/*******************SYNC********************/
function receiveWindowMessage(event) {
	//WINDOW <=> FACEBOOK <=> CANVAS
	if (event.data.name == "UOP_httpfacebook_request_token") //WINDOW => FACEBOOK
	{
		if (access_token_loaded == 0) canvasWindow.postMessage({name:"UOP_facebookhttps_request_token"},"https://www.mousehuntgame.com");
		else event.source.postMessage({name:"UOP_facebookhttp_respond_token",data: access_token_loaded},event.origin);
	}
	else if (event.data.name == "UOP_facebookhttps_request_token") //FACEBOOK => CANVAS
	{
		if (window.localStorage.UOP_access_token != "Refreshing") event.source.postMessage({name:"UOP_httpsfacebook_respond_token",data: window.localStorage.UOP_access_token},event.origin);
	}
	else if (event.data.name == "UOP_httpsfacebook_respond_token") //CANVAS => FACEBOOK
	{
		access_token_loaded = event.data.data;
	}
	else if (event.data.name == "UOP_facebookhttp_respond_token") //FACEBOOK => WINDOW
	{
		access_token_loaded = event.data.data;
	}
	else if (event.data.name == "UOP_eval_OK")
	{
		if (eval_callback != null)
		{
			var temp = eval_callback;
			eval_callback = null;
			temp();
		}
	}
}
function syncUser(callbackFunction) {
	var request = new XMLHttpRequest();
	var url = C_canvasMode[inCanvas] + "/managers/ajax/abtest.php";
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				try
				{
					data = JSON.parse(request.responseText);
					if (document.getElementById('pagemessage').textContent.indexOf("Error while sync") != -1)
					{
						document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Sync ok !</label>";
						setTimeout(function () {document.getElementById('pagemessage').innerHTML = "";},3000);
					}
					if (callbackFunction != null) setTimeout(callbackFunction,0);
				}
				catch (e)
				{
					document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while sync, request status = 200 but Exception = " + e.message + ". Original Data is " + request.responseText + " Refreshing...</label>";
					document.title = "Sync error !";
					//setTimeout(function() {syncUser(callbackFunction);},1000);
					reloadMH();
				}
			}
			else
			{
				document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while sync, request status = " + request.status + ". Refreshing...</label>";
				document.title = "Sync error !";
				//setTimeout(function() {syncUser(callbackFunction);},1000);
				reloadMH();
			}
		}
	};
	request.send(null);
}
function syncUserTrapcheck(callbackFunction) {
	var request = new XMLHttpRequest();
	var url = C_canvasMode[inCanvas] + "/index.php";
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				try
				{
					var usertextBegin = request.responseText.indexOf("user = {");
					usertextBegin = request.responseText.indexOf("{",usertextBegin);
					var usertextEnd = request.responseText.indexOf("};",usertextBegin) + 1;
					data.user = JSON.parse(request.responseText.substring(usertextBegin,usertextEnd));
					if (callbackFunction != null) setTimeout(callbackFunction,0);
				}
				catch (e)
				{
					document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while sync, request status = 200 but Exception = " + e.message + "</label>";
					document.title = "Trapcheck sync error !";
					reloadMH();
					//setTimeout(function() {syncUserTrapcheck(callbackFunction);},3000);
				}
			}
			else
			{
				//syncUserTrapcheck(callbackFunction);
				document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while sync, request status = " + request.status + "</label>";
				document.title = "Trapcheck sync error !";
				reloadMH();
			}
		}
	};
	request.send(null);
}
function soundHorn() {
	//please take note that the phrase is: "<no status> => hornRady => hornSounding => hornResult/hornError => <no status>"
	if (O_hornHeader.className.indexOf('hornSounding') != -1)
	{
		setTimeout(soundHorn, 100);
		registerSoundHornSounding.forEach(callArrayFunction);
		return;
	}
	else if (O_hornHeader.className.indexOf('hornResult') != -1)
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
	
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = C_cssCustomArr[num];
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
function windowScript() {
	window.addEventListener("message", UOP_receiveWindowMessage, false);
	function UOP_receiveWindowMessage(event) {
		if (event.data.name == "UOP_eval")
		{
			eval(event.data.data);
			window.postMessage({name: "UOP_eval_OK", data: "OK"},location.origin);
		}
		else if (event.data.name == "UOP_userHash")
		{
			user.unique_hash = event.data.data;
		}
	}
}
/*******************SKIN AREA********************/
//TOOLS
function travelgroupchange(e) {
	var target = e.target;
	while (target.className.indexOf("UOP_buttonTravel") == -1) target = target.parentNode;
	var id = Number(target.getAttribute("groupid"));
	var tmp = document.getElementsByClassName("UOP_groupPlacesDiv");
	for (var i = 0;i < tmp.length;++i)
	{
		tmp[i].style.height = "0px";
		tmp[i].style.transition = "";
	}
	tmp[id].style.transition = "height 200ms linear";
	tmp[id].style.height = travelPlacesHeight[id] + "px";
}
function travelcontentLoad() {
	if (S_emulateMode == 0) //if ((C_disableExperimental == 1) || (S_emulateMode == 0))
	{
		travelcontentLoadNormal();
		return;
	}
	var request = new XMLHttpRequest();
	var contentDiv = O_travelContent;
	request.open("GET", C_canvasMode[inCanvas] + "/travel.php?hideShortcuts=true", true);
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
					env_obj.travelCost = O_environment[i].travelCost;
					env_obj.environment_id = O_environment[i].environment_id;
					env_obj.display_order = O_environment[i].displayOrder;
					group_env[group_name[O_environment[i].region.type]].data.push(env_obj);
				}
				for (i = 0;i < group_env.length;++i)
				{
					group_env[i].data.sort(function(a, b) {return a.display_order - b.display_order;});
				}
				group_env.sort(function(a, b) {return a.display_order - b.display_order;});
				
				travelPlacesHeight = new Array;
				var HTMLdiv = document.createElement('div');
				var envitem,listitem,envgroupitem,placegroupitem;
				envgroupitem = document.createElement('div');
				envgroupitem.className = "UOP_groupPlacesArea";
				HTMLdiv.appendChild(envgroupitem);
				for (i = 0;i < group_env.length;++i)
				{
					placegroupitem = document.createElement('div');
					placegroupitem.className = "UOP_groupPlacesDiv Mobile";
					placegroupitem.style.height = "0px";
					travelPlacesHeight.push(35 * group_env[i].data.length);
					envitem = document.createElement('div');
					envitem.textContent = group_env[i].name;
					envitem.className = "UOP_buttonTravel UOP_travelRegionMobile";
					envitem.setAttribute("groupid",i);
					envitem.addEventListener('click',travelgroupchange,false);
					envgroupitem.appendChild(envitem);
					for (j = 0;j < group_env[i].data.length;++j)
					{
						listitem = document.createElement('div');
						if (group_env[i].data[j].travelCost == null)
						{
							listitem.className = "UOP_buttonTravel UOP_travelPlaceMobileImpossible";
						}
						else
						{
							listitem.className = "UOP_buttonTravel UOP_travelPlaceMobile";
						}
						
						listitem.setAttribute("value",group_env[i].data[j].environment_id);
						listitem.textContent = group_env[i].data[j].name;
						listitem.addEventListener('click',travel,false);
						placegroupitem.appendChild(listitem);
					}
					HTMLdiv.appendChild(placegroupitem);
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
function travelcontentLoadNormal() {
	var request = new XMLHttpRequest();
	var contentDiv = O_travelContent;
	request.open("GET", C_canvasMode[inCanvas] + "/travel.php?hideShortcuts=true", true);
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
					env_obj.travelCost = O_environment[i].travelCost;
					env_obj.environment_id = O_environment[i].environment_id;
					env_obj.display_order = O_environment[i].displayOrder;
					group_env[group_name[O_environment[i].region.type]].data.push(env_obj);
				}
				for (i = 0;i < group_env.length;++i)
				{
					group_env[i].data.sort(function(a, b) {return a.display_order - b.display_order;});
				}
				group_env.sort(function(a, b) {return a.display_order - b.display_order;});
				
				travelPlacesHeight = new Array;
				var HTMLdiv = document.createElement('div');
				var envitem,envgroupitem,placegroupitem,listitem,nameitem,costitem,x,divholder;
				envgroupitem = document.createElement('div');
				envgroupitem.className = "UOP_groupPlacesArea";
				HTMLdiv.appendChild(envgroupitem);
				placegroupitem = document.createElement('div');
				placegroupitem.className = "UOP_groupPlacesDiv Normal";
				placegroupitem.style.height = "0px";
				travelPlacesHeight.push(31);
				HTMLdiv.appendChild(placegroupitem);
				/*envitem = document.createElement('div');
				envitem.textContent = "Free Travel";
				envitem.className = "UOP_buttonTravel UOP_travelRegion";
				envitem.setAttribute("groupid",0);
				envitem.addEventListener('click',travelgroupchange,false);
				envgroupitem.appendChild(envitem);
				listitem = document.createElement('div');
				listitem.className = "UOP_travelPlaceDiv";
				listitem.setAttribute("value","freetravel");
				listitem.addEventListener('click',travel_normal,false);
				nameitem = document.createElement('div');
				nameitem.className = "UOP_travelPlaceName";
				nameitem.textContent = "Meadow";
				costitem = document.createElement('div');
				costitem.className = "UOP_travelPlaceCost";
				costitem.textContent = "Free";
				listitem.appendChild(nameitem);
				listitem.appendChild(costitem);
				placegroupitem.appendChild(listitem);*/
				for (i = 0;i < group_env.length;++i)
				{
					placegroupitem = document.createElement('div');
					placegroupitem.className = "UOP_groupPlacesDiv Normal";
					placegroupitem.style.height = "0px";
					travelPlacesHeight.push(31 * group_env[i].data.length);
					envitem = document.createElement('div');
					envitem.textContent = group_env[i].name;
					envitem.className = "UOP_buttonTravel UOP_travelRegion";
					envitem.setAttribute("groupid",i + 1);
					envitem.addEventListener('click',travelgroupchange,false);
					envgroupitem.appendChild(envitem);
					for (j = 0;j < group_env[i].data.length;++j)
					{
						listitem = document.createElement('div');
						listitem.className = "UOP_travelPlaceDiv";
						listitem.setAttribute("value",group_env[i].data[j].type);
						listitem.addEventListener('click',travel_normal,false);
						nameitem = document.createElement('div');
						nameitem.className = "UOP_travelPlaceName";
						nameitem.textContent = group_env[i].data[j].name;
						costitem = document.createElement('div');
						x = group_env[i].data[j].travelCost;
						if (x == null)
						{
							costitem.textContent = "N/A";
							costitem.className = "UOP_travelPlaceImpossible";
						}
						else
						{
							costitem.textContent = x;
							costitem.className = "UOP_travelPlaceCost";
						}
						listitem.appendChild(nameitem);
						listitem.appendChild(costitem);
						divholder = document.createElement('div');
						divholder.appendChild(listitem);
						placegroupitem.appendChild(divholder);
					}
					HTMLdiv.appendChild(placegroupitem);
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
					var appendbefore = contentDiv.firstChild.nextSibling;
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
				var HTMLText = request.responseText.substring(request.responseText.indexOf("<div class='pagetabbartop"),request.responseText.indexOf("</div></div><a href='#' name='hudbottom'></a>"));
				HTMLText += request.responseText.substring(request.responseText.indexOf("<div class='contentcontainer'>"),request.responseText.indexOf("<div class='footer'>"));
				var JSText = request.responseText.substring(request.responseText.indexOf("app.views.ItemPurchaseView"),request.responseText.indexOf("user = {"));
				
				window.postMessage({name: "UOP_eval", data: JSText},location.origin);
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
				for (i = 0;i < tmp.length;++i)
				{
					var str = tmp[i].firstChild.textContent;
					if (str.indexOf("Shoppe") != -1)
					{
						str = str.substring(0,str.length - 7);
						tmp[i].firstChild.textContent = str;
					}	
				}
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
				var HTMLText = request.responseText.substring(HTMLBegin,request.responseText.indexOf("<div class='inactive' id='tabbarContent_page_4'>",HTMLBegin));
				var JSText = request.responseText.match(/app.views.InventoryItemView.*.setValidItemClassifications\(\["potion"\]\);app.views.InventoryItemView.*.setItemsPerRow\(1\);/)[0];
				var JSUnknownRenderString = JSText.substring(JSText.indexOf("app.views.InventoryItemView.") + 28,JSText.indexOf(".setValidItemClassifications"));
				
				JSText = 'app.views.InventoryItemView.' + JSUnknownRenderString + ' = new hg.views.InventoryItemView("' + JSUnknownRenderString + '");' + JSText + 'initInventoryItemViewByTab(3);';
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
				
				window.postMessage({name: "UOP_eval", data: JSText},location.origin);
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
				/*
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
				
				window.postMessage({name: "UOP_eval", data: JSText},location.origin);
				eval_callback = function () {
					var tmp = HTMLdiv.getElementsByClassName('recipeitemnamediv');
					for (var i = tmp.length - 1;i >= 0;--i)
					{
						tmp[i].parentNode.removeChild(tmp[i]);
					}
					tmp = HTMLdiv.getElementsByClassName('craftingTabs')[0].getElementsByTagName('li')[4].getElementsByTagName('a')[0];
					tmp.textContent = "Item";
				}*/
				var HTMLBegin = request.responseText.indexOf("<div class='active' id='tabbarContent_page_2'");
				var HTMLText = request.responseText.substring(HTMLBegin,request.responseText.indexOf("<div class='inactive' id='tabbarContent_page_3'>",HTMLBegin));
				var JSText = request.responseText.match(/app.views.InventoryItemView.*.setValidItemClassifications\(\["crafting_item"\]\);app.views.InventoryItemView.*.setItemsPerRow\(3\);/)[0];
				var JSUnknownRenderString = JSText.substring(JSText.indexOf("app.views.InventoryItemView.") + 28,JSText.indexOf(".setValidItemClassifications"));
				
				JSText = 'app.views.InventoryItemView.' + JSUnknownRenderString + ' = new hg.views.InventoryItemView("' + JSUnknownRenderString + '");' + JSText + 'initInventoryItemViewByTab(2);';
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
				
				window.postMessage({name: "UOP_eval", data: JSText},location.origin);
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
				
				window.postMessage({name: "UOP_eval", data: JSText},location.origin);
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
				
				window.postMessage({name: "UOP_eval", data: JSText},location.origin);
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
	travelcontentChild.firstChild.lastChild.innerHTML = 'Traveling Service by <a href="profile.php?snuid=larry">Larry</a><br>[<a id="UOP_travelNormal">Normal</a>] [<a id="UOP_travelOld">Quick</a>] [<a id="UOP_travelGetAccessToken">Get Access Token</a>]';
	travelcontentChild = travelcontentChild.firstChild.nextSibling;
	travelcontentChild.id = "UOP_travelcontentChild";
	O_travelContent = travelcontentChild;
	travelcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
	tabbar.getElementsByClassName('tabbody')[0].appendChild(travelcontent);
	document.getElementById('UOP_travelOld').addEventListener('click',travelcontentLoadold,false);
	document.getElementById('UOP_travelNormal').addEventListener('click',travelcontentLoadNormal,false);
	document.getElementById('UOP_travelGetAccessToken').addEventListener('click',buttonGetAccessToken,false);
}
function shopToTabBar() {
	//shop => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0].firstChild;

	var addbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
	addbar.className = "inactive";
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
	//if (C_disableExperimental == 1) return;
	var url = "https://www.mousehuntgame.com/api/action/travel/" + e.target.getAttribute("value");
	O_travelTab.innerHTML = "Travelling...<img src='/images/ui/loaders/round_bar_green.gif'><div>";
	var htmlstr = "";
	var params = "v=" + appgameinfo.v + "&client_id=Cordova%3A" + C_mobile[S_emulateMode].Cordova + "&client_version=" + C_clientMobileVer + "&game_version=" + appgameinfo.game_version + "%0A&access_token=" + window.localStorage.UOP_access_token;

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urIencoded");
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
function travel_normal(e) {
	var target = e.target;
	while (target.className != "UOP_travelPlaceDiv") target = target.parentNode;
	var destination = target.getAttribute("value");
	var url = C_canvasMode[inCanvas],param,htmlstr = "",request = new XMLHttpRequest();
	O_travelTab.innerHTML = "Travelling...<img src='/images/ui/loaders/round_bar_green.gif'><div>";
	
	if (destination == "freetravel")
	{
		url += "travel.php?freeTravel=true&uh=" + data.user.unique_hash;
		param = null;
		request.open("GET", url, true);
	}
	else
	{
		url += "/managers/ajax/users/changeenvironment.php";
		param = "destination=" + destination + "&uh=" + data.user.unique_hash;
		request.open("POST", url, true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
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
				travelcontentLoadNormal();
				if (destination == "freetravel") syncUser(updateUserHash);
			}
			else
			{
				O_travelTab.innerHTML = "Network error, refreshing...";
				O_travelTab.innerHTML += '<div class="UOP_waitingTab"></div>';
				O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
				travelcontentLoadNormal();
			}
		}
	};

	request.send(param);
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
				travelcontentLoadold();
				if (url.indexOf('freeTravel=true') != -1) syncUser(updateUserHash);
			}
			else
			{
				O_travelTab.innerHTML = "Network error, refreshing...";
				O_travelTab.innerHTML += '<div class="UOP_waitingTab"></div>';
				O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
				travelcontentLoadold();
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
	window.postMessage({name: "UOP_userHash", data: data.user.unique_hash},location.origin);
}
function toggleSkin() {
	window.localStorage.UOP_simple = 1 - S_simple;
	reloadMH();
}
function showToolbox() {
	window.postMessage({name: "UOP_eval", data: C_toolboxMessage},location.origin);
}
//DEFAULT skin
function defaultSkin() {
	//if (S_simple == 0) defaultFullSkin(); else defaultSimpleSkin();
    defaultFullSkin();
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
}
function updateMinuteTimer() {
	//update location timer
	var locationTimerObject,timetmp,t1,t2;
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	var i,j,day;

	if (data.user.has_shield == false)
	{
		O_gamelogo.style.opacity = 0;
		O_LGSTimerHourMin.textContent = "Expired";
	}
	else
	{
		timetmp = data.user.shield_expiry.split('-');
		timetmp = Date.UTC(timetmp[0],timetmp[1] - 1,timetmp[2]);
		timetmp = Math.floor((new Date(timetmp) - currentDate) / 1000);
		if (timetmp < 0)
		{
			O_gamelogo.style.opacity = 0;
			O_LGSTimerHourMin.textContent = "Expired";
		}
		else
		{
			day = Math.floor(timetmp / (60 * 60 * 24));
			timetmp = (timetmp % (60 * 60 * 24));
			timetmp = formatHourMin(timetmp);
			O_LGSTimerDay.textContent = (day == 0) ? "Today" : day;
			O_LGSTimerHourMin.textContent = timetmp;
			if (day == 0) O_LGSTimerDay.className = "UOP_LGSTimerToday"; else
			{
				O_LGSTimerDayLeft.textContent = ((day == 1) ? "day" : "days") + " left";
				O_LGSTimerDay.className = "UOP_LGSTimerDay";
			}
		}
	}
	
	//set the minute time interval
	setTimeout(function () { (updateMinuteTimer)() }, C_MinuteInterval * 1000);
}
function tradeBuyID() {
	var itemTradeID = document.getElementById('UOP_inputTrade').value;
	var params = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash + "&item_trade_id=" + itemTradeID;
	var url = C_canvasMode[inCanvas] + "/managers/ajax/trades/accepttrade.php";
	
	var http = new XMLHttpRequest();
	http.open("POST",url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
function showResearchUrl() {
    if (document.getElementsByClassName("campPage-quests-container").length != 0)
	{
        tmp = document.createElement('a');
        tmp.textContent = "[Full]";
        tmp.addEventListener('click',showResearchFullTask,false);
        document.getElementsByClassName("campPage-quests-title")[0].appendChild(tmp);
        return;
	}
    setTimeout(showResearchUrl, 100);
}
function showResearchFullTask() {
	var params = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	var url = C_canvasMode[inCanvas] + "managers/ajax/users/questsprogress.php";
	
	var http = new XMLHttpRequest();
	http.open("POST",url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				try
				{
					data = JSON.parse(http.responseText);
					var questContainer = document.getElementsByClassName("campPage-quests-container")[0];
					questContainer.innerHTML = "";
					for (var key in data.progress) {
						if (data.progress.hasOwnProperty(key)) {
							var obj = data.progress[key].progress;
							questContainer.innerHTML += '<div class="campPage-quests-title">' + data.progress[key].name + "</div>";
							for (var prop in obj) {
								if (obj.hasOwnProperty(prop)) {
									var tmp = template.progressObj.cloneNode(true);
									var objdata = obj[prop];
									if (objdata.complete) tmp.className += " complete";
									tmp.getElementsByClassName("campPage-quests-objective-thumb")[0].style.backgroundImage = "url('" + objdata.thumb + "')";
									tmp.getElementsByClassName("campPage-quests-objective-task")[0].textContent = prop + ' - ' + objdata.string;
									tmp.getElementsByClassName("campPage-quests-objective-progress")[0].textContent = objdata.progress + " / " + objdata.repetitions;
									tmp.getElementsByClassName("campPage-quests-objective-progressBar")[0].firstElementChild.style.width = objdata.progress * 100 / objdata.repetitions + "%";
									questContainer.appendChild(tmp);
								}
							}
						}
					}
				}
				catch (e)
				{
					showResearchTask();
				}
			}
			else
			{
				showResearchTask();
			}
		}
	}
	http.send(params);
}
function toggleSimplifiedTrapSelector() {
	O_trapSelectorBrowser.classList.toggle("simplified");
}
function toggleStatusFavoriteMarketItem(e) {
	var target = e.target;
	var targetParent = target.parentNode;
	if (target.classList.contains("UOP_addFavorite"))
	{
		//going to add
		target.classList.remove("UOP_addFavorite");
		target.classList.add("UOP_removeFavorite");
		window.localStorage["UOP_marketfavor_" + targetParent.getAttribute("data-type")] = 1;
		toggleListFavoriteMarketItem(targetParent,1);
	}
	else
	{
		//going to remove
		target.classList.remove("UOP_removeFavorite");
		target.classList.add("UOP_addFavorite");
		window.localStorage["UOP_marketfavor_" + targetParent.getAttribute("data-type")] = 0;
		toggleListFavoriteMarketItem(targetParent,0);
	}
}
function toggleListFavoriteMarketItem(target,status) {
	var panel;
	if (status == 0) //remove
	{
		panel = target.getAttribute("data-panel");
		O_specialPanel.parentNode.parentNode.children[2 * panel + 1].firstElementChild.appendChild(target);
	}
	else //add
	{
		O_specialPanel.appendChild(target);
	}
}
function toggleSunkenDetailHUD() {
	O_sunkenRevealHUDParent.classList.toggle("UOP_showHUD");
}
function showTextareaPersonalNote() {
	var note = localStorage.UOP_personalNote;
	note = note.replace(/<br>/g,'\n');
	O_personalNoteTextarea.value = note;
	O_personalNoteTextarea.style.height = (O_personalNote.offsetHeight * 1.3) + "px";
	O_personalNoteTextarea.parentNode.style.display = "block";
	O_personalNote.style.display = "none";
}
function saveTextareaPersonalNote() {
	var note = O_personalNoteTextarea.value;
	note = note.replace(/\n/g,'<br>');
	O_personalNote.innerHTML = localStorage.UOP_personalNote = note;
	O_personalNoteTextarea.parentNode.style.display = "none";
	O_personalNote.style.display = "block";
}
function defaultFullSkin() {
	if (location.pathname.indexOf('/forum/') != -1) return;
	manageCSSJSAdder(4);
	var tmp,tmp2;
	//===========Change the top row of mousehunt=================
	//add SB+
	tmp = document.getElementsByClassName("menuItem superBrie");
	if (tmp.length != 0) tmp = tmp[0];
	tmp.firstElementChild.classList.add("getMore");
	
	//support: REMOVE: all support from support;ADD support (general),chatroom, news,livedevchat 
	//community: REMOVE: Store; ADD: 2 guides, wiki 
	var community = document.getElementsByClassName('menuItem community')[0].getElementsByClassName('dropdownContent')[0];
	var support = document.getElementsByClassName('menuItem support')[0].getElementsByClassName('dropdownContent')[0];
	
	var arr = support.children,i = 0;
	arr[i].href = "/support.php";
	arr[i].target = "_blank";
	arr[i].className = "tech";
	arr[i].firstChild.textContent = "Support";
	arr[i].lastChild.textContent = "Support from devs for FREE !";
	++i;
	
	arr[i].href = "/chat.php";
	arr[i].target = "_blank";
	arr[i].className = "forum";
	arr[i].firstChild.textContent = "Chat room";
	arr[i].lastChild.textContent = "Join the Mousehunt Chat room";
	++i;
	
	arr[i].href = "/forum/index.php?hgref=hgbar";
	arr[i].target = "_blank";
	arr[i].className = "forum";
	arr[i].firstChild.textContent = "Forum";
	arr[i].lastChild.textContent = "Take part in discussions with your fellow players.";
	++i;
	
	arr[i].firstChild.href = "/news.php";
	arr[i].firstChild.target = "_blank";
	arr[i].className = "offense";
	arr[i].firstChild.textContent = "News";
	arr[i].lastChild.innerHTML = "News and updates from ALL the TIME !";
	++i;
	
	hgdropdownitem = support.firstChild.cloneNode(true);
	hgdropdownitem.href = "/livefeed.php";
	hgdropdownitem.target = "_blank";
	hgdropdownitem.className = "forum";
	hgdropdownitem.firstChild.textContent = "Live Dev Chat";
	hgdropdownitem.lastChild.textContent = "Chat with the devs on each friday.";
	support.insertBefore(hgdropdownitem,support.firstChild);
	
	var arr = community.children;i = 0;
	arr[i].href = "http://www.mousehuntguide.com/mh-index.php";
	arr[i].target = "_blank";
	arr[i].className = "rules";
	arr[i].firstChild.textContent = "Spheniscine";
	arr[i].lastChild.innerHTML = "Spheniscine MouseHunt Walkthrough";
	++i;
	
	arr[i].href = "http://amhuguide.com/";
	arr[i].target = "_blank";
	arr[i].className = "fanPage";
	arr[i].firstChild.textContent = "AsiaMHU";
	arr[i].lastChild.textContent = "AsiaMH Union MouseHunt Guide";
	++i;
	
	arr[i].href = "http://mhwiki.hitgrab.com/wiki/";
	arr[i].target = "_blank";
	arr[i].className = "merch";
	arr[i].firstChild.textContent = "Hunter's Wiki";
	arr[i].lastChild.textContent = "This is Mousehuntpedia";
	++i;
	
	//add personal note to the Larry hunting tips
	var huntingTips = document.getElementsByClassName('campPage-tabs-tabContent-larryTip-container');
	if (huntingTips.length != 0) //if there are Larry around then he will announce personal note for us ^_^ or if there are something  to announce
	{
		huntingTips = huntingTips[0];
		var newHuntingNode = null;
		newHuntingNode = document.createElement("p");
		newHuntingNode.innerHTML = "_______________________________________________________<br>Personal Note:<br>";
		huntingTips.appendChild(newHuntingNode);
		
		O_personalNote = document.createElement("p");
		var note = localStorage.UOP_personalNote;
		if (note == null) note = localStorage.UOP_personalNote = 'A place to save some notes. Click to change';
		O_personalNote.innerHTML = note;
		O_personalNote.addEventListener('click',showTextareaPersonalNote,false);
		huntingTips.appendChild(O_personalNote);
		
		var personalNoteTextareaDiv = document.createElement("div");
		personalNoteTextareaDiv.style.display = "none";
		huntingTips.appendChild(personalNoteTextareaDiv);
		
		O_personalNoteTextarea = document.createElement("textarea");
		O_personalNoteTextarea.style.maxWidth = "320px";
		O_personalNoteTextarea.style.minWidth = "320px";
		personalNoteTextareaDiv.appendChild(O_personalNoteTextarea);
		
		var personalNoteTextareaSaveButton = document.createElement("button");
		personalNoteTextareaSaveButton.textContent = "Save";
		personalNoteTextareaSaveButton.style.left = "260px";
		personalNoteTextareaSaveButton.style.position = "relative";
		personalNoteTextareaSaveButton.addEventListener('click',saveTextareaPersonalNote,false);
		personalNoteTextareaDiv.appendChild(personalNoteTextareaSaveButton);
	}
		
	//=======gameinfo changes=======
	//add Golden shield expires day (more obvious)
	O_LGSTimerHourMin = document.createElement("div");
	O_LGSTimerHourMin.id = "UOP_LGSTimerHourMin";
	O_gamelogo.appendChild(O_LGSTimerHourMin);
	O_LGSTimerDay = document.createElement("div");
	O_LGSTimerDay.id = "UOP_LGSTimerDay";
	O_gamelogo.appendChild(O_LGSTimerDay);
	O_LGSTimerDayLeft = document.createElement("div");
	O_LGSTimerDayLeft.id = "UOP_LGSTimerDayLeft";
	O_gamelogo.appendChild(O_LGSTimerDayLeft);
	
	document.getElementsByClassName('mousehuntHud-gameInfo')[0].innerHTML = "<a>Toolbox</a>";
	document.getElementsByClassName('mousehuntHud-gameInfo')[0].firstChild.addEventListener("click",showToolbox,false);
	
	//=======NAVIGATOR changes======
	//remove the following button: Donate
    tmp = document.getElementsByClassName("mousehuntHud-premiumShop")[0];
    tmp.parentNode.removeChild(tmp);
    
    tmp = document.getElementsByClassName("campPage-tabs-tabRow");
    if (tmp.length != 0)
    {
        tmp = tmp[0];
        tmp = tmp.children[2];
        tmp.addEventListener('click', showResearchUrl, false);
    }
    
    tmp = document.getElementsByClassName("campPage-trap-blueprint-closeButton");
    if (tmp.length != 0)
    {
        O_trapSelectorBrowser = document.getElementById("mousehuntContainer");
        toggleSimplifiedTrapSelector();
        
        tmp = tmp[0];
        tmp2 = document.createElement("div");
        tmp2.id = "UOP_toggleSimplifiedSelector";
        tmp2.textContent = "Toggle Short/Full Trap Selector"
        tmp2.addEventListener("click",toggleSimplifiedTrapSelector,false);
        tmp.parentNode.insertBefore(tmp2,tmp.nextSibling);
    }
    
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
}
/*******************FUN AREA*********************/
function removeAds() {
	//remove mousehunt ads
	var rightCol = document.getElementById('hgSideBar'); //mousehunt ads
	if (rightCol != null)
	{
		while (rightCol.childElementCount > 1)
			rightCol.removeChild(rightCol.lastChild);//rightCol.style.display = "none";
		if (S_ads == 2)
		{
			O_funArea = document.createElement("div");
			O_funArea.id = "UOP_funArea";
			rightCol.appendChild(O_funArea);
			addThings();
		}
	}
	else
	{
		if (S_ads == 2) S_ads = 0;
	}
}
function addThings() {
	addScoreboard();
	addClock();
	addCommand();
}
function addCommand() {
	O_commandDiv = document.createElement("div");
	O_commandDiv.id = "UOP_commandDiv";
	O_funArea.appendChild(O_commandDiv);
	
	O_commandInput = document.createElement("input");
	O_commandInput.id = "UOP_commandInput";
	O_commandDiv.appendChild(O_commandInput);
	O_commandInput.addEventListener('keypress', function (e) {var key = e.which || e.keyCode;if (key == 13) {executeCommand()}}, false);
	
	var O_commandButton = document.createElement("button");
	O_commandButton.id = "UOP_clearMessageButton";
	O_commandDiv.appendChild(O_commandButton);
	O_commandButton.addEventListener('click', function (e) {document.getElementById('pagemessage').innerHTML = "";}, false);
	O_commandButton.textContent = "Clear miniscript log";
    
    var O_battleShipDiv = document.createElement("div");
	O_battleShipDiv.id = "UOP_battleShipDiv";
	O_commandDiv.appendChild(O_battleShipDiv);
    
    var O_battleShipCalculateButton = document.createElement("button");
	O_battleShipCalculateButton.id = "UOP_battleShipCalculateButton";
	O_battleShipDiv.appendChild(O_battleShipCalculateButton);
	O_battleShipCalculateButton.addEventListener('click', listenToCalculateBattleShip, false);
	O_battleShipCalculateButton.textContent = "Calculate";
    
    var O_battleShipValueButton = document.createElement("button");
	O_battleShipValueButton.id = "UOP_battleShipValueButton";
	O_battleShipDiv.appendChild(O_battleShipValueButton);
	O_battleShipValueButton.addEventListener('click', battleShipValueType, false);
	O_battleShipValueButton.textContent = "Value";
}
function executeCommand() {
	var txt = O_commandInput.value;
	try {txt = eval(txt);} catch (e) {txt = "ERROR";}
	O_commandInput.value = txt;
}
function addClock() {
	O_clockDiv = document.createElement("div");
	O_clockDiv.id = "UOP_clockDiv";
	O_funArea.appendChild(O_clockDiv);
	
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = chrome.extension.getURL("resources/luxCountdown/luxCountdown.css");
	document.head.appendChild(css);
	
	css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = chrome.extension.getURL("resources/jbclock/jbclock.css");
	document.head.appendChild(css);
	
	addFGClock();
	addBCClock();
	addSGClock();
}
function addFGClock() {
	O_FGclock = document.createElement("div");
	O_FGclock.id = "UOP_FGclock";
	O_clockDiv.appendChild(O_FGclock);
	
	O_FGcounter = new luxCountdown({title:"Forbidden Grove",callbackFunc:updateFGClock,text:"LOADING",startText:"Loading...",endText:"Loading..."});
	document.getElementById("UOP_FGclock").appendChild(O_FGcounter.getCountdown());
	
	updateFGClock();
}
function updateFGClock() {
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	
	var timetmp = (currentTime - C_LOCATION_TIMES[2].base) % C_LOCATION_TIMES[2].totaltime;
	
	var j,nextj;
	for (j = 0;j < C_LOCATION_TIMES[2].length.length;++j)
	{
		timetmp -= C_LOCATION_TIMES[2].length[j];
		if (timetmp < 0) break;
		else if (timetmp == 0)
		{
			j = (j + 1) % C_LOCATION_TIMES[2].length.length;
			timetmp = -C_LOCATION_TIMES[2].length[j];
			break;
		}
	}
	nextj = (j + 1) % C_LOCATION_TIMES[2].length.length;
	timetmp = -timetmp; //secleft
	var end = new Date((currentTime + timetmp) * 1000);
	var start = new Date((currentTime + timetmp - C_LOCATION_TIMES[2].length[j]) * 1000);
	
	O_FGclock.className = "UOP_FG" + C_LOCATION_TIMES[2].state[j].toLowerCase();
	O_FGcounter._start = start;
	O_FGcounter._end = end;
	O_FGcounter._theTimer.getElementsByClassName("lux-countdown-text")[0].textContent = C_LOCATION_TIMES[2].state[j];
	O_FGcounter._theTimer.getElementsByClassName("lux-countdown-start")[0].textContent = C_LOCATION_TIMES[2].state[j][0] + C_LOCATION_TIMES[2].state[j].slice(1).toLowerCase();
	O_FGcounter._theTimer.getElementsByClassName("lux-countdown-end")[0].textContent = C_LOCATION_TIMES[2].state[nextj][0] + C_LOCATION_TIMES[2].state[nextj].slice(1).toLowerCase();
	O_FGcounter._startTimer();
}
function addBCClock() {
	O_BCclock = document.createElement("div");
	O_BCclock.id = "UOP_BCclock";
	O_clockDiv.appendChild(O_BCclock);
	
	O_BCcounter = new luxCountdownExpand({title:"Balack's Cove",callbackFunc:updateBCClock,text:"LOADING",startText:"Low",midText:"Medium",endText:"High"});
	document.getElementById("UOP_BCclock").appendChild(O_BCcounter.getCountdown());
	
	updateBCClock();
}
function updateBCClock() {
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	
	var timetmp = (currentTime - C_LOCATION_TIMES[1].base) % C_LOCATION_TIMES[1].totaltime;
	var intervalstart = currentTime - timetmp + Math.floor(C_LOCATION_TIMES[1].length[0] / 2);
	var intervalend = intervalstart + C_LOCATION_TIMES[1].totaltime;
	if (intervalstart > currentTime)
	{
		intervalend = intervalstart;
		intervalstart = intervalend - C_LOCATION_TIMES[1].totaltime;
	}
	
	intervalstart = new Date(intervalstart * 1000);
	intervalend = new Date(intervalend * 1000);
	
	var j,nextj;
	for (j = 0;j < C_LOCATION_TIMES[1].length.length;++j)
	{
		timetmp -= C_LOCATION_TIMES[1].length[j];
		if (timetmp < 0) break;
		else if (timetmp == 0)
		{
			j = (j + 1) % C_LOCATION_TIMES[1].length.length;
			timetmp = -C_LOCATION_TIMES[1].length[j];
			break;
		}
	}
	nextj = (j + 1) % C_LOCATION_TIMES[1].length.length;
	timetmp = -timetmp; //secleft
	var end = new Date((currentTime + timetmp) * 1000);
	var start = new Date((currentTime + timetmp - C_LOCATION_TIMES[1].length[j]) * 1000);
	
	O_BCclock.className = "UOP_BC" + C_LOCATION_TIMES[1].state[j].toLowerCase();
	O_BCcounter._barstart = intervalstart;
	O_BCcounter._barend = intervalend;
	O_BCcounter._start = start;
	O_BCcounter._end = end;
	O_BCcounter._theTimer.getElementsByClassName("lux-countdown-text")[0].textContent = C_LOCATION_TIMES[1].state[j];
	O_BCcounter._startTimer();
}
function addSGClock() {
	O_SGclock = document.createElement("div");
	O_SGclock.id = "UOP_SGclock";
	O_clockDiv.appendChild(O_SGclock);
	
	O_SGclock.innerHTML ='\
<div class="UOP_jbclock_clock">\
	<div class="UOP_jbclock_clock_hours">\
		<div class="UOP_jbclock_bgLayer">\
			<div class="UOP_jbclock_topLayer"></div>\
			<canvas id="UOP_jbclock_canvas_hours" width="94" height="94">\
			</canvas>\
			<div class="UOP_jbclock_text">\
				<p class="UOP_jbclock_val">0</p>\
				<p class="UOP_jbclock_type_hours">Hours</p>\
			</div>\
		</div>\
	</div>\
	<div class="UOP_jbclock_clock_minutes">\
		<div class="UOP_jbclock_bgLayer">\
			<div class="UOP_jbclock_topLayer"></div>\
			<canvas id="UOP_jbclock_canvas_minutes" width="94" height="94">\
			</canvas>\
			<div class="UOP_jbclock_text">\
				<p class="UOP_jbclock_val">0</p>\
				<p class="UOP_jbclock_type_minutes">Minutes</p>\
			</div>\
		</div>\
	</div>\
</div>\
<div class="UOP_jbclock_detail">\
	<div class="title">S.Garden</div>\
	<div class="currentState"></div>\
	<div class="currentPowerType"></div>\
	<div class="weather"><img id="UOP_SGclockWeather"></div>\
</div>\
';
	O_SGclockWeather = document.getElementById("UOP_SGclockWeather");
	updateSGClock();
}
function changeSGweather() {
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	
	var timetmp = (currentTime - C_SG_FUN_TIME.base) % C_SG_FUN_TIME.totaltime;
	
	var j,nextj;
	for (j = 0;j < C_SG_FUN_TIME.length.length;++j)
	{
		timetmp -= C_SG_FUN_TIME.length[j];
		if (timetmp < 0) break;
		else if (timetmp == 0)
		{
			j = (j + 1) % C_SG_FUN_TIME.length.length;
			timetmp = -C_SG_FUN_TIME.length[j];
			break;
		}
	}
	nextj = (j + 1) % C_SG_FUN_TIME.length.length;
	
	var stateSunMoon = currentDate.getHours();
	stateSunMoon = ((stateSunMoon > 5) && (stateSunMoon < 18)) ? 1 : 2;
	var numGeneralWeather = C_SG_FUN_TIME.statenum[j][0];
	var numSunMoonWeather = C_SG_FUN_TIME.statenum[j][stateSunMoon];
	var numWeather = numGeneralWeather + numSunMoonWeather;
	var idWeather = Math.floor(Math.random()*numWeather);
	if (idWeather >= numWeather) idWeather--;
	if (idWeather < numGeneralWeather) stateSunMoon = 0; else idWeather = idWeather - numGeneralWeather;
	var url = "/resources/jbclock/img/weather/" + C_SG_FUN_TIME.state[j].toLowerCase() + C_SG_FUN_TIME.statename[stateSunMoon] + idWeather + ".png";
	O_SGclockWeather.src = chrome.extension.getURL(url);
	
	if (O_SGSchedule != null) clearTimeout(O_SGSchedule);
	O_SGSchedule = setTimeout(changeSGweather,3600000);
}
function updateSGClock() {
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	
	var timetmp = (currentTime - C_SG_FUN_TIME.base) % C_SG_FUN_TIME.totaltime;
	
	var j,nextj;
	for (j = 0;j < C_SG_FUN_TIME.length.length;++j)
	{
		timetmp -= C_SG_FUN_TIME.length[j];
		if (timetmp < 0) break;
		else if (timetmp == 0)
		{
			j = (j + 1) % C_SG_FUN_TIME.length.length;
			timetmp = -C_SG_FUN_TIME.length[j];
			break;
		}
	}
	nextj = (j + 1) % C_SG_FUN_TIME.length.length;
	timetmp = -timetmp; //secleft
	var end = currentTime + timetmp;
	var start = currentTime + timetmp - C_SG_FUN_TIME.length[j];
	
	O_SGclock.className = "UOP_SG" + C_SG_FUN_TIME.state[j].toLowerCase();
	O_SGclock.getElementsByClassName("currentState")[0].textContent = C_SG_FUN_TIME.state[j];
	O_SGclock.getElementsByClassName("currentPowerType")[0].textContent = C_SG_FUN_TIME.weapontype[j];
	
	changeSGweather();
	
	JBCountDown({
		secondsColor : "#ffdc50",secondsGlow  : "none",
		minutesColor : "#9cdb7d",minutesGlow  : "none",
		hoursColor   : "#378cff",hoursGlow    : "none",

		startDate   : start,
		endDate     : end,
		now         : currentTime,
		
		callbackFunc: updateSGClock
	});
}
function addScoreboard() {
	manageCSSJSAdder(8);
	var i;
	
	O_scoreboardDiv = document.createElement("div");
	O_scoreboardDiv.id = "UOP_scoreboardDiv";
	O_funArea.appendChild(O_scoreboardDiv);
	
	var scoreboardControl = document.createElement("div");
	var button = document.createElement("button");
	button.className = "UOP_buttonSB";
	button.textContent = "Off";
	button.addEventListener('click',function () {O_scoredboardControl.style.height = "0px";localStorage.UOP_channelScoreboard = S_channelScoreboard = 0;localStorage.UOP_currentScoreboardChannelTeamData = "[]";switchChannel();},false);
	scoreboardController.push(button);
	scoreboardControl.appendChild(button);
	button = document.createElement("button");
	button.className = "UOP_buttonSB";
	button.textContent = "Team";
	button.addEventListener('click',function () {O_scoredboardControl.style.height = "0px";localStorage.UOP_channelScoreboard = S_channelScoreboard = 1;if (data.user.viewing_atts.tournament != null) currentScoreboardChannel = data.user.viewing_atts.tournament.tournament_id; else currentScoreboardChannel = 0;if (scoreboardChannel[currentScoreboardChannel] != null) localStorage.UOP_currentScoreboardChannelTeamData = JSON.stringify(scoreboardChannel[currentScoreboardChannel].team); else localStorage.UOP_currentScoreboardChannelTeamData = "[]";switchChannel();},false);
	scoreboardController.push(button);
	scoreboardControl.appendChild(button);
	button = document.createElement("button");
	button.className = "UOP_buttonSB";
	button.textContent = "Tivi";
	button.addEventListener('click',showChannel,false);
	scoreboardController.push(button);
	scoreboardControl.appendChild(button);
	O_scoreboardDiv.appendChild(scoreboardControl);
	
	O_scoredboardControl = document.createElement("div");
	O_scoredboardControl.id = "UOP_scoreboardControl";
	O_scoreboardChannel = document.createElement("div");
	O_scoreboardChannel.id = "UOP_scoreboardChannel";
	O_scoredboardControl.appendChild(O_scoreboardChannel);
	O_scoreboardinput = document.createElement('input');
	O_scoreboardinput.id = "UOP_tournamentID";
	O_scoreboardinput.type = "text";
	O_scoreboardinput.placeholder = "Tournament ID";
	O_scoreboardinput.className = "UOP_searchinputSB";
	O_scoreboardinput.addEventListener('keypress',function(e) {if (e.keyCode == 13) searchTournament();},false);
	O_scoredboardControl.appendChild(O_scoreboardinput);
	button = document.createElement("button");
	button.className = "UOP_searchbuttonSB";
	button.addEventListener('click',searchTournament,false);
	O_scoredboardControl.appendChild(button);
	O_scoreboardDiv.appendChild(O_scoredboardControl);
	O_scoredboardControl.style.height = "0px";
	
	var scoreboardTableDiv = document.createElement("div");
	scoreboardTableDiv.id = "UOP_tableDiv";
	scoreboardTableDiv.innerHTML = C_scoreboardContent.toString();
	O_scoreboardDiv.appendChild(scoreboardTableDiv);
	O_scoreboardStatus = document.getElementById('UOP_scoreboardStatus');
	O_scoreboardCounter = document.getElementById('UOP_scoreboardCounter');
	
	O_scoreboardDiv.getElementsByTagName('tfoot')[0].firstElementChild.firstElementChild.addEventListener('click',updateScoreboard,false);
	
	O_scoreboard = document.getElementById('UOP_scoreboard').getElementsByTagName('tr');
	for (i = 0;i < O_scoreboard.length;++i) O_scoreboard[i].firstElementChild.addEventListener('click',openTeam,false);
	O_scoreboardUpdateSecond = document.getElementById('UOP_scoreboardUpdateSecond');
	
	O_scoreboardFetch = document.createElement("div");
	O_scoreboardFetch.id = "UOP_scoreboardFetch";
	O_scoreboardDiv.appendChild(O_scoreboardFetch);

	scoreboardMyTeamID = document.getElementById('hud_team');
	if (scoreboardMyTeamID == null) scoreboardMyTeamID = 0;
	else 
	{
		scoreboardMyTeamID = scoreboardMyTeamID.getElementsByTagName('a')[0].href;
		scoreboardMyTeamID = scoreboardMyTeamID.substring(scoreboardMyTeamID.indexOf('team_id=') + 8);
	}
	if (!atCamp)
	{
		for (i = 0;i < scoreboardControl.children.length;++i) scoreboardControl.children[i].disabled = true;
		S_channelScoreboard = 0;
		switchChannel();
	}
	else
	{
		scoreboardTimestamp = 0;
		setInterval(scoreboardTourTimecounter,1000);
		scoreboardTourTimecounter();
	}
}
function scoreboardTourTimecounter() {
	var timeleft = scoreboardTimestamp - Math.ceil(new Date().getTime() / 1000);
	if (timeleft >= 0)
	{
		O_scoreboardCounter.textContent = formatHour(timeleft);
		O_scoreboardStatus.textContent = scoreboardTimestatus;
	}
	else
	{
		if (scoreboardTimestatus == 'active')
		{
			O_scoreboardStatus.textContent = 'Completed';
		}
		else if (scoreboardTimestatus == 'pending')
		{
			O_scoreboardStatus.textContent = "Starting...";
			scoreboardTimestatus = "update";
		}
		O_scoreboardCounter.textContent = "--:--:--";
	}
}
function searchTournament() {
	localStorage.UOP_channelScoreboard = S_channelScoreboard = 2;
	localStorage.UOP_currentScoreboardChannel = currentScoreboardChannel = O_scoreboardinput.value;
	localStorage.UOP_currentScoreboardChannelTeamData = "[]";
	localStorage.UOP_scoreboardTimestamp = scoreboardTimestamp = 0;
	localStorage.UOP_scoreboardTimestatus = scoreboardTimestatus = "auto";
	switchChannel();
}
function startUpdateFunArea() {
	if (data.user.has_puzzle == true) return;
	if (atCamp) registerSoundHornWaiting.push(updateChannel);
}
function openTeam(e) {
	if (currentScoreboardChannel == 0) return;
	var target = e.target;
	while (target.tagName != "TR") target = target.parentNode;
	var teamid = target.getAttribute("teamid");
	if ((teamid != null) && (teamid != '-')) window.open("/team.php?team_id=" + teamid);
}
function secondScoreboardUpdate() {
	if (nextUpdateScoreboardTimeLeft == -2) return;
	O_scoreboardUpdateSecond.textContent = nextUpdateScoreboardTimeLeft;
	if (nextUpdateScoreboardTimeLeft <= 0) updateScoreboard();
	else
	{
		--nextUpdateScoreboardTimeLeft;
		setTimeout(secondScoreboardUpdate,1000);
	}
}
function showChannel() {
	getChannelList(function() {
		O_scoreboardChannel.innerHTML = "";
		var curTime = new Date().getTime();
		var button,counter = 0;
		for (var tour in scoreboardChannel)
		{
			if (scoreboardChannel.hasOwnProperty(tour))
			{
				++counter;
				button = document.createElement("button");
				button.className = "UOP_buttonSB channel";				
				button.className += (scoreboardChannel[tour].status == "pending") ? " pending" : ((scoreboardChannel[tour].timeleft * 1000 > curTime) ? " active" : " completed");
				button.setAttribute('tourid',tour);
				button.textContent = tour;
				button.addEventListener('click',getChannel,false);
				O_scoreboardChannel.appendChild(button);
			}
		}
		O_scoredboardControl.style.height = (28 + Math.ceil(counter / 6) * 24) + "px";
	});
}
function getChannel(e) {
	if (activeGetSB == 1) return;
	activeGetSB = 1;
	localStorage.UOP_currentScoreboardChannel = currentScoreboardChannel = e.target.getAttribute('tourid');
	localStorage.UOP_channelScoreboard = S_channelScoreboard = 2;
	localStorage.UOP_scoreboardTimestamp = scoreboardChannel[currentScoreboardChannel].timeleft;
	localStorage.UOP_scoreboardTimestatus = scoreboardChannel[currentScoreboardChannel].status;
	currentScoreboardChannelTeamData = scoreboardChannel[currentScoreboardChannel].team;
	localStorage.UOP_currentScoreboardChannelTeamData = JSON.stringify(currentScoreboardChannelTeamData);
	switchChannel();
	activeGetSB = 0;
}
function getChannelList(callbackFunction) {
	if (S_server == 1)
	{
		if (callbackFunction != null) callbackFunction();
		return;
	}
	var url = S_serverUrl + "/team.php";
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				try
				{
					scoreboardChannel = JSON.parse(request.responseText);
					if (callbackFunction != null) callbackFunction();
				}
				catch (e) {}
			}
			else
			{
				getChannelList(callbackFunction);
			}
		}
	};
	request.send(null);
}
function postChannel() {
	if (S_server == 1) return;
	if (data.user.viewing_atts.tournament == null) return;
	if ((Number(window.localStorage.UOP_tourID) == data.user.viewing_atts.tournament.tournament_id) && (window.localStorage.UOP_tourStatus == data.user.viewing_atts.tournament.status)) return;
	
	var url = S_serverUrl + "/team.php";
	var request = new XMLHttpRequest();
	var param = "team=" + scoreboardMyTeamID + "&tour=" + data.user.viewing_atts.tournament.tournament_id + "&status=" + data.user.viewing_atts.tournament.status + "&timeleft=" + (Math.ceil(new Date().getTime() / 1000) + data.user.viewing_atts.tournament.seconds_remaining);
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				if (request.responseText == "OK")
				{
					window.localStorage.UOP_tourID = data.user.viewing_atts.tournament.tournament_id;
					window.localStorage.UOP_tourStatus = data.user.viewing_atts.tournament.status;
				}
			}
			else
			{
				postChannel();
			}
		}
	};
	request.send(param);
}
function switchChannel() {
	for (var i = 0;i < scoreboardController.length;++i) scoreboardController[i].setAttribute("aria-selected",false);
	scoreboardController[S_channelScoreboard].setAttribute("aria-selected",true);
	switch (S_channelScoreboard)
	{
		case 0:currentScoreboardChannel = 0;break;
		case 1:
			if (data.user.viewing_atts.tournament != null)
			{
				currentScoreboardChannel = data.user.viewing_atts.tournament.tournament_id;
				scoreboardTimestamp = data.user.viewing_atts.tournament.seconds_remaining + Math.ceil(new Date().getTime() / 1000);
				scoreboardTimestatus = data.user.viewing_atts.tournament.status;
				currentScoreboardChannelTeamData = JSON.parse(localStorage.UOP_currentScoreboardChannelTeamData);
			}
			else currentScoreboardChannel = 0;
			break;
		case 2:
			currentScoreboardChannel = Number(window.localStorage.UOP_currentScoreboardChannel);
			scoreboardTimestamp = Number(window.localStorage.UOP_scoreboardTimestamp);
			scoreboardTimestatus = window.localStorage.UOP_scoreboardTimestatus;
			currentScoreboardChannelTeamData = JSON.parse(localStorage.UOP_currentScoreboardChannelTeamData);
			break;
	}
	updateScoreboard();
}
function updateChannel() {
	postChannel();
	if (S_channelScoreboard == 1) switchChannel();
	else if (initScoreboard == 0)
	{
		switchChannel();
		initScoreboard = 1;
	}
}
function updateScoreboard() {
	nextUpdateScoreboardTimeLeft = -2;
	O_scoreboardUpdateSecond.textContent = "...";
	O_scoreboardDiv.className = "transiting";
	if (scoreboardTimestatus == 'update')
	{
		getChannelList(function() {
			if (currentScoreboardChannel[currentScoreboardChannel] != null)
			{
				if (currentScoreboardChannel[currentScoreboardChannel].status == "active")
				{
					scoreboardTimestatus = "active";
					scoreboardTimestamp = currentScoreboardChannel[currentScoreboardChannel].timeleft;
				}
			}
		});
	}
	for (var i = 0;i < O_scoreboard.length;++i)
	{
		O_scoreboard[i].setAttribute("teamtype","transit");
	}
	if (currentScoreboardChannel == 0) 
	{
		O_scoreboardDiv.className = "off";
		return;
	}
	if (scoreboardTimestatus == "pending")
	{
		O_scoreboardDiv.className = "";
		return;
	}

	var url = C_canvasMode[inCanvas] + "/tournament.php?tid=" + currentScoreboardChannel;
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLstr = request.responseText;
				var status = 0;
				if (HTMLstr.indexOf('"has_puzzle":true') != -1)
				{
					reloadMH(); //KR
					return;
				}
				else if (HTMLstr.indexOf('<span id="info">Complete</span>') != -1)
				{
					if (scoreboardTimestatus == 'auto') O_scoreboardStatus.textContent = "Completed";
					status = 1;
				}
				else if (HTMLstr.indexOf('<span id="info">Pending</span>') != -1)
				{
					if (scoreboardTimestatus == 'auto') O_scoreboardStatus.textContent = "Pending";
					status = 2;
				}
				else if (scoreboardTimestatus == 'auto') O_scoreboardStatus.textContent = "Active";
				if (status != 2)
				{
					var scoreboardTableIndex = HTMLstr.indexOf('<div class="tournamentTabRow tournamentTabRow-white"><table class="scoreboard-tournaments">');
					scoreboardTableIndex = HTMLstr.indexOf('<table class="scoreboard-tournaments">',scoreboardTableIndex);
					HTMLstr = HTMLstr.substring(scoreboardTableIndex,HTMLstr.indexOf('</table>',scoreboardTableIndex) + 8);
					O_scoreboardFetch.innerHTML = HTMLstr;
					var rawSBTeamName = O_scoreboardFetch.firstChild.lastElementChild.getElementsByClassName('tournament-scoreboard-teamName');
					var rawSBTeamScore = O_scoreboardFetch.firstChild.lastElementChild.getElementsByClassName('tournament-scoreboard-teamScore');
					var i,j;
					for (i = 0;i < rawSBTeamName.length;++i)
					{
						HTMLstr = rawSBTeamName[i].lastElementChild.href;
						HTMLstr = HTMLstr.slice(HTMLstr.indexOf("team_id=") + 8);
						HTMLstr = Number(HTMLstr);
						if (HTMLstr == scoreboardMyTeamID) O_scoreboard[i].setAttribute("teamtype","my"); else
						{
							O_scoreboard[i].setAttribute("teamtype","none");
							if (currentScoreboardChannelTeamData != [])
							for (j = 0;j < currentScoreboardChannelTeamData.length;++j)
							if (currentScoreboardChannelTeamData[j] == HTMLstr)
							{
								O_scoreboard[i].setAttribute("teamtype","ally");
								break;
							}
						}
						
						O_scoreboard[i].setAttribute('teamid',HTMLstr);
						O_scoreboard[i].firstElementChild.firstElementChild.textContent = rawSBTeamName[i].lastElementChild.textContent;
						O_scoreboard[i].lastElementChild.textContent = rawSBTeamScore[i].textContent;
					}
					for (;i < O_scoreboard.length;++i)
					{
						O_scoreboard[i].setAttribute('teamid','-');
						O_scoreboard[i].setAttribute("teamtype","none");
						O_scoreboard[i].firstElementChild.firstElementChild.textContent = "----------";
						O_scoreboard[i].lastElementChild.textContent = "-----";
					}
				}
				setTimeout(function () {if (currentScoreboardChannel == 0) return;O_scoreboardDiv.className = "";},800);
				switch (status)
				{
					case 0:nextUpdateScoreboardTimeLeft = 60;setTimeout(secondScoreboardUpdate,0);break;
					case 1:O_scoreboardUpdateSecond.textContent = "Ended";currentScoreboardChannel = 0;break;
					case 2:O_scoreboardUpdateSecond.textContent = "Not started";currentScoreboardChannel = 0;break;
				}
			}
			else
			{
				updateScoreboard();
			}
		}
	};
	request.send(null);
}
function listenToCalculateBattleShip() {
    var rawcell = document.getElementsByClassName("winterHunt2014Minigame-layer tiles")[0].getElementsByClassName("winterHunt2014Minigame-board-row-cell");
    var i;
    for (i = 0;i < rawcell.length;++i) rawcell[i].addEventListener('click', listenToRefreshBattleShip, false);
    calculateBattleShip();
}
function listenToRefreshBattleShip(e) {
    e = {target: e.target};
    
    while (e.target.tagName.toUpperCase() != "DIV") e.target = e.target.parentNode;
    
    if (e.target.classList.contains("busy")) {
        setTimeout(function() {listenToRefreshBattleShip(e);}, 100);
    }
    else {
        calculateBattleShip();
    }
}
function calculateBattleShip() {
    var h = 6,w = 11,i,j,k,ii,jj,shape,max = 0,total = 0,step;
    var rawcell = document.getElementsByClassName("winterHunt2014Minigame-layer tiles")[0].getElementsByClassName("winterHunt2014Minigame-board-row-cell");
    var cell = [],valueTable = [];
    var isShapeFit,nHit,tHit;
    var shapeTable = [
    {//default
        w: 4,
        h: 2,
        type: 0,
        data: [[1,1,1,1],[1,1,0,0]]
    },{//rotate 90
        w: 2,
        h: 4,
        type: 0,
        data: [[1,1],[1,1],[1,0],[1,0]]
    },{//rotate 180
        w: 4,
        h: 2,
        type: 0,
        data: [[1,1,0,0],[1,1,1,1]]
    },{//rotate 270
        w: 2,
        h: 4,
        type: 0,
        data: [[0,1],[0,1],[1,1],[1,1]]
    },{//reflect H
        w: 4,
        h: 2,
        type: 0,
        data: [[1,1,0,0],[1,1,1,1]]
    },{//reflect V
        w: 4,
        h: 2,
        type: 0,
        data: [[1,1,1,1],[0,0,1,1]]
    },{//rotate 90, then reflect H
        w: 2,
        h: 4,
        type: 0,
        data: [[1,0],[1,0],[1,1],[1,1]]
    },{//rotate 90, then reflect V
        w: 2,
        h: 4,
        type: 0,
        data: [[1,1],[1,1],[0,1],[0,1]]
    },{
        w: 3,
        h: 3,
        type: 1,
        data: [[0,2,0],[2,2,2],[2,2,2]]
        },{
        w: 3,
        h: 3,
        type: 1,
        data: [[2,2,2],[2,2,2],[0,2,0]]
    },{
        w: 3,
        h: 3,
        type: 1,
        data: [[0,2,2],[2,2,2],[0,2,2]]
    },{
        w: 3,
        h: 3,
        type: 1,
        data: [[2,2,0],[2,2,2],[2,2,0]]
    },{
        w: 2,
        h: 3,
        type: 2,
        data: [[4,4],[4,4],[4,4]]
    },{
        w: 3,
        h: 2,
        type: 2,
        data: [[4,4,4],[4,4,4]]
    },{
        w: 2,
        h: 2,
        type: 3,
        data: [[8,8],[8,8]]
    }], shapeCompleted = [0,0,0,0];
    
    shapeCompleted[0] = document.getElementsByClassName("winterHunt2014Minigame-example candy_cane")[0].classList.contains("complete") ? 1 : 0;
    shapeCompleted[1] = document.getElementsByClassName("winterHunt2014Minigame-example holiday_tree")[0].classList.contains("complete") ? 1 : 0;
    shapeCompleted[2] = document.getElementsByClassName("winterHunt2014Minigame-example large_gift")[0].classList.contains("complete") ? 1 : 0;
    shapeCompleted[3] = document.getElementsByClassName("winterHunt2014Minigame-example small_gift")[0].classList.contains("complete") ? 1 : 0;
    
    nHit = 0;
    for (i = 0;i < h;++i)
    {
        cell[i] = [];
        valueTable[i] = [];
        for (j = 0;j < w;++j)
        {
            valueTable[i][j] = 0;
            if (rawcell[i * w + j].classList.contains("available")) cell[i][j] = 0;
            else if (rawcell[i * w + j].classList.contains("hit"))
            {
                ++nHit;
                cell[i][j] = 2;
            }
            else cell[i][j] = 1;
        }
    }
    if (nHit == 0)
    {
        for (k = 0;k < shapeTable.length;++k)
        {
            shape = shapeTable[k];
            for (i = 0;i < h;++i)
            for (j = 0;j < w;++j)
            {
                if ((i + shape.h > h) || (j + shape.w > w)) continue;
                isShapeFit = true;
                for (ii = 0;ii < shape.h;++ii)
                    for (jj = 0;jj < shape.w;++jj)
                        if ((cell[i + ii][j + jj]  == 1) && (shape.data[ii][jj] == 1)) isShapeFit = false;
                if (!isShapeFit) continue;
                for (ii = 0;ii < shape.h;++ii)
                    for (jj = 0;jj < shape.w;++jj)
                        valueTable[i + ii][j + jj] += shape.data[ii][jj];
            }
        }
    }
    else
    {
        for (k = 0;k < shapeTable.length;++k)
        {
            shape = shapeTable[k];
            if (shapeCompleted[shape.type] == 1) continue;
            for (i = 0;i < h;++i)
                for (j = 0;j < w;++j)
                {
                    if ((i + shape.h > h) || (j + shape.w > w)) continue;
                    tHit = 0;
                    isShapeFit = true;
                    for (ii = 0;ii < shape.h;++ii)
                        for (jj = 0;jj < shape.w;++jj)
                        {
                            if ((cell[i + ii][j + jj]  == 1) && (shape.data[ii][jj] == 1)) isShapeFit = false;
                            if ((cell[i + ii][j + jj]  == 2) && (shape.data[ii][jj] == 1)) ++tHit;
                        }
                    if (tHit == 0) isShapeFit = false;
                    if (!isShapeFit) continue;
                    for (ii = 0;ii < shape.h;++ii)
                        for (jj = 0;jj < shape.w;++jj)
                            if (cell[i + ii][j + jj]  == 0) valueTable[i + ii][j + jj] += shape.data[ii][jj] * tHit;
                }
        }
    }
    for (i = 0;i < h;++i)
        for (j = 0;j < w;++j)
        {
            max = valueTable[i][j] < max ? max : valueTable[i][j];
            total += valueTable[i][j];
        }
    step = (255 - 128) / (max - 1);
    
    for (i = 0;i < h;++i)
        for (j = 0;j < w;++j)
        {
            if (battleShipValue == 0)
                rawcell[i * w + j].firstElementChild.textContent = valueTable[i][j];
            else
                rawcell[i * w + j].firstElementChild.textContent = (valueTable[i][j] * 100 / total).toFixed(2);
                
            if (valueTable[i][j] == 0)
                rawcell[i * w + j].firstElementChild.style.color = "red";
            else if (valueTable[i][j] == max)
                rawcell[i * w + j].firstElementChild.style.color = "darkmagenta";
            else
                rawcell[i * w + j].firstElementChild.style.color = "rgb(0," + Math.floor(valueTable[i][j] * step + 128) + ",0)";
                //1 -> 255, max -> 128
                //so this is reversed order => color = max - value
                //step = (255 - 128) / (max - 1)
                //base = 128
        }
}
function battleShipValueType(e) {
    battleShipValue = 1 - battleShipValue;
    e.target.textContent = (battleShipValue == 0) ? "Value" : "  %  ";
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
	A_autoState = autoCoreDecide(nextTurnSeconds,nextDelaySeconds);
	var delayTimeText,hornTimeText;
	
	if (A_autoState == 0) //if PAUSE then display pause message
	{
		O_autoPauseCounter.style.display = "block";
		O_autoCounter.style.display = "none";
		O_autoSounding.style.display = "none";
		if (screenshotSafe == 0) document.title = "Paused";
		return;
	}
	else if (A_autoState == 1) //if APPROACHING KR then call puzzleReaction core
	{
		puzzleStandardReaction();
		return;
	}
	else if (A_autoState == 2) //if (UPDATE MAIN COUNT) UPDATE MAIN COUNT
	{
		hornTimeText = formatMinute(nextTurnSeconds);
		delayTimeText = formatMinute(nextDelaySeconds);
		O_autoMainCounter.textContent = hornTimeText;
		O_autoDelayCounter.textContent = delayTimeText;
		if (screenshotSafe == 0) document.title = hornTimeText + " + " + delayTimeText; else document.title = hornTimeText;
	}
	else if (A_autoState == 3) //if (UPDATE DELAYER) UPDATE DELAYER
	{
		hornTimeText = "0:00";
		delayTimeText = formatMinute(nextDelaySeconds);
		O_autoMainCounter.textContent = hornTimeText;
		O_autoDelayCounter.textContent = delayTimeText;
		if (screenshotSafe == 0) document.title = delayTimeText;
	}
	else if (A_autoState == 4) //if HORN => HORN
	{
		if (S_auto == 0) O_hornButton.click();
		else if (S_auto == 2) reloadMH();
		return;
	}
	else if (A_autoState == 5) //TIME OUT BUT NOT READY
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
function autoPlay() {
	if (A_autoState == 0)
	{
		syncUser(autoCoreAction);
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
		reloadMH();
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
		if (refreshingByError == 1) return;
		O_autoSounding.textContent = "Completed !";
		syncUser(null);
	}
	else if (A_soundedCounter == 50)
	{
		O_autoSounding.textContent = "New message !";
		if (document.getElementsByClassName("mousehuntHud-huntersHorn-responseResult")[0].textContent.indexOf("King's Reward") != 0)
        {
            document.getElementsByClassName("mousehuntHud-huntersHorn-responseMessage")[0].firstElementChild.click();
            puzzleStandardReaction();
        }
	}
}
function autoHornWaiting() {
	if (data.user.next_activeturn_seconds == 0)
	{
		++A_hornRetryCounter;
		if (A_hornRetryCounter > 1)
		{
			O_autoSounding.textContent = "Error, refreshing...";
			reloadMH();
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
	{
		if (S_auto == 0) delaymin = delaymax = 3;
		else if (S_auto == 2) delaymin = delaymax = 60;
	}
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
		autoPlay();
	}
}
function loadSettingKRimage() {
	if (lockedfeature == 1)
	{
		alert("This feature is deprecated and only use for experimental. Use it at your own risk !!! (click again to use)");
		lockedfeature = 0;
		return;
	}
	
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
	window.localStorage.UOP_solveStage = A_solveStage;
	KR_initKR();
	KRSolverOCRCore();
}
function submitPuzzle(str) {
	var url = C_canvasMode[inCanvas] + "/managers/ajax/users/solvePuzzle.php";
	var param = "puzzle_answer=" + str + "&uh=" + data.user.unique_hash;
	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				try
				{
					var tmpRespondJSON = JSON.parse(request.responseText);
					document.getElementsByClassName('mousehuntPage-puzzle-form-description')[0].textContent += str + " - " + tmpRespondJSON.result;
					window.localStorage.UOP_puzzleLastResult = str + " - Attempt: " + A_solveStage + " - Result: " + tmpRespondJSON.result;
					reloadMH();
				}
				catch (e)
				{
					document.getElementsByClassName('mousehuntPage-puzzle-form-description')[0].textContent += str + " - " + tmpRespondJSON.result;
					window.localStorage.UOP_puzzleLastResult = str + " - Attempt: " + A_solveStage + " - Result: " + tmpRespondJSON.result;
				}
			}
			else
			{
				document.getElementById('pagemessage').textContent += "Network error, retrying";
				puzzleSubmitErrorStr = str;
				puzzleSubmitErrorHash = data.user.unique_hash;
				submitPuzzleErrorHandle();
			}
		}
	};
	request.send(param);
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
			reloadMH();
			break;
		defafult: break;
	}
}
function puzzleCoreReaction() {
	switch (A_solveStage)
	{
		case 4:KRSolverCache();break;
		case 3:
		case 2:
		case 1:KRSolverOCR();break;
		default:alarm();document.getElementsByClassName('mousehuntPage-puzzle-form-code')[0].focus();
	}
}
function puzzleStandardReaction() {
	if (A_puzzleCalled != 0) return; else ++A_puzzleCalled;
	
	O_autoPauseCounter.style.display = "none";
	O_autoSounding.style.display = "block";
	O_autoCounter.style.display = "none";
	O_autoSounding.textContent = "King's Reward";
	document.title = "King's Reward";
	
	if (document.getElementsByClassName('mousehuntPage-puzzle-form-captcha-image').length == 0)
	{
		if (window.localStorage.UOP_puzzleReloaded == 0)
		{
			window.localStorage.UOP_puzzleReloaded = 1;
			reloadMH();
		}
	}
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
/*******************KR SOLVER AREA*******************/
var KR_turn = 3;
var KR_canvas,KR_canvas2;
var KR_context,KR_context2;
var KR_n=58,KR_m=200;
var KR_dx = [-1,1,0,0,-1,-1,1,1];
var KR_dy = [0,0,-1,1,-1,1,-1,1];
var KR_samplechar="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var KR_sampleimgData;
var KR_sampleimgData2;
var KR_nsample = 62;
var KR_i;
var KR_imgs = new Array;
var KR_results = new Array;
var KR_timeouts = new Array;
var KR_sendResultI = 0;
var KR_initialized = false;
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
function KR_initKR() {
    KR_i = 0;
    
    if (KR_initialized) return;
    KR_initialized = true;
    
	KR_canvas = document.createElement('canvas');
	KR_canvas.width = 200;
	KR_canvas.height = 200;
	KR_context = KR_canvas.getContext('2d');
	KR_canvas2 = document.createElement('canvas');
	KR_canvas2.width = 200;
	KR_canvas2.height = 200;
	KR_context2 = KR_canvas2.getContext('2d');
	KR_sampleimgData = new Array;
	KR_sampleimgData2 = new Array;
	KR_initDB();
}
function KR_initDB() {
	var canvas = document.createElement('canvas');
	canvas.width='100';
	canvas.height='100';
	var ctx = canvas.getContext("2d");
	var imageData,pixels;
	var x,y,xmin,xmax,ymin,ymax,i,c;
	for (KR_i = 0; KR_i< KR_nsample; KR_i++){
		ctx.fillStyle="rgb(255,255,255)";
		ctx.fillRect(0,0,100,100);
		ctx.font = "48px Verdana";
		ctx.fillStyle="rgb(0,0,0)";
		ctx.fillText(KR_samplechar[KR_i], 0, 50);
		imageData = ctx.getImageData(0, 0, 100, 100);
		pixels = imageData.data;
		xmin = xmax = ymin = ymax = -1;
		for (x = 0; x < 100; x++){
			c = 0;
			for (y = 0; y < 100; y++){
				i = x + y*100;
				if (pixels[i*4] != 255){
					if (xmin == -1){//reset
						xmin = xmax = x;
						ymin = ymax = y;
						}else{
						xmax=(xmax<x)?x:xmax;
						ymax=(ymax<y)?y:ymax;
						xmin=(xmin>x)?x:xmin;
						ymin=(ymin>y)?y:ymin;
					}
					++c;
				}
			}
			if ((c == 0) && (xmin != -1)){
				var tmpcanvas = document.createElement('canvas');
				tmpcanvas.width = xmax - xmin + 1;
				tmpcanvas.height = ymax - ymin + 1;
				var tempdata = tmpcanvas.getContext("2d").getImageData( 0, 0, tmpcanvas.width, tmpcanvas.height);
				var temppixels = tempdata.data;
				for (x = xmin; x <=xmax; x++){
					for (y = ymin; y <= ymax; y++){
						i = x + y*100;
						it = (x-xmin) + (y-ymin)*tmpcanvas.width;
						if (pixels[i*4] != 255)
						{
							temppixels[it*4] = temppixels[it*4+1] = temppixels[it*4+2] = 0;
							temppixels[it*4+3] = 255 - pixels[i*4];
						}
						else
						{
							temppixels[it*4+3] = 0;
						}
					}
				}
				tmpcanvas.getContext('2d').putImageData(tempdata,0,0);
				KR_sampleimgData[KR_i] = tmpcanvas;
				xmin = xmax = ymin = ymax = -1;
			}
		}
	}
	for (KR_i = 0; KR_i< KR_nsample; KR_i++){
		ctx.fillStyle="rgb(255,0,0)";
		ctx.fillRect(0,0,100,100);
		ctx.font = "48px Verdana";
		ctx.fillStyle="rgb(255,255,255)";
		ctx.fillText(KR_samplechar[KR_i], 0, 50);
		imageData = ctx.getImageData(0, 0, 100, 100);
		pixels = imageData.data;
		xmin = xmax = ymin = ymax = -1;
		for (x = 0; x < 100; x++){
			c = 0;
			for (y = 0; y < 100; y++){
				i = x + y*100;
				if (pixels[i*4+1] != 0){//bg
					if (xmin == -1){//reset
						xmin = xmax = x;
						ymin = ymax = y;
						}else{
						xmax=(xmax<x)?x:xmax;
						ymax=(ymax<y)?y:ymax;
						xmin=(xmin>x)?x:xmin;
						ymin=(ymin>y)?y:ymin;
					}
					++c;
				}
			}
			if ((c == 0) && (xmin != -1)){
				var tmpcanvas = document.createElement('canvas');
				tmpcanvas.width = xmax - xmin + 1;
				tmpcanvas.height = ymax - ymin + 1;
				var tempdata = tmpcanvas.getContext("2d").getImageData( 0, 0, tmpcanvas.width, tmpcanvas.height);
				var temppixels = tempdata.data;
				for (x = xmin; x <=xmax; x++){
					for (y = ymin; y <= ymax; y++){
						i = x + y*100;
						it = (x-xmin) + (y-ymin)*tmpcanvas.width;
						if (pixels[i*4+1] != 0)
						{
							temppixels[it*4] = 255;
							temppixels[it*4+1] = temppixels[it*4+2] = 0;
							temppixels[it*4+3] = 255 - pixels[i*4+1];
						}
						else
						{
							temppixels[it*4+1] = temppixels[it*4+2] = 0;
							temppixels[it*4] = temppixels[it*4+3] = 255;
						}
					}
				}
				tmpcanvas.getContext('2d').putImageData(tempdata,0,0);
				KR_sampleimgData2[KR_i] = tmpcanvas;
				xmin = xmax = ymin = ymax = -1;
			}
		}
	}
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
	KR_timeouts[KR_i] = setTimeout(KR_reload(KR_i),20000);
	
	++KR_i;
	setTimeout(KRSolverOCRLoadImg,3000);
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
var sh_components;

var PLAY = 0, STOP = 1, PAUSE = 2, ERROR = 3;
var AFTERHORN = 0, AFTERTRAPCHECK = 1, BEFORETRAPCHECK = 2, SINGLEMODE = 3;

function shInitSchedule() {
	var str;
	var i;
	for (i = 0;i < C_LOCATION_TIMES.length;++i) sh_clock[C_LOCATION_TIMES[i].id] = new Object;
	setInterval(shUpdateClock,60000);shUpdateClock();
	
	var nscripts = Number(window.localStorage.UOP_nscripts);
	
	if (nscripts < sh_defaultScripts.length) shCreateDefaultScripts();
	
	for (i = 0;i < nscripts;++i)
	{
		sh_scripts[i] = JSON.parse(window.localStorage['UOP_scriptInfo' + i]);
		sh_scripts[i].mode = Number(window.localStorage['UOP_scriptMode' + i]);
		sh_scripts[i].name = sh_defaultScripts[i].name;
		sh_scripts[i].fullname = sh_defaultScripts[i].fullname;
		//sh_scripts[i].content = window.localStorage['UOP_scriptContent' + i];
		//if (sh_scripts[i].errorHandler != 0) sh_scripts[i].errorContent = window.localStorage['UOP_scriptErrorContent' + i];
	}
	
	for (i = 0;i < sh_scripts.length;++i)
		if (sh_scripts[i].mode != STOP)
		{
			shCompile(i);
			if ((sh_scripts[i].mode == PLAY) || (sh_scripts[i].mode == PAUSE)) shAttach(i);
		}

	var d,d2,trapcheck;
	
	trapcheck = (S_trapCheckTime == -1) ? 0 : S_trapCheckTime;
	d = new Date();
	if (d.getMinutes() >= trapcheck) d.setHours(d.getHours() + 1);
	d.setMinutes(trapcheck);
	d.setSeconds(0);
	d = d - new Date();
	
	registerSoundHornWaiting.push(shStartAfterHorn);
	setTimeout(function () {setInterval(shStartAfterTrapCheck,3600000);shStartAfterTrapCheck();},d + S_trapCheckRange * 1000);
	setTimeout(function () {setInterval(shStartBeforeTrapCheck,3600000);shStartBeforeTrapCheck();},Math.max(d - S_trapCheckRange * 1000,0));
	
	d = new Date();
	d2 = new Date().getTime();
	d.setMinutes(trapcheck);
	d.setSeconds(0);
	d = d.getTime();
	
	if ((d + S_trapCheckRange * 1000) > d2) setTimeout(shStartAfterTrapCheck,(d - d2) + S_trapCheckRange * 1000);
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
	//scriptInfo.name = sh_scripts[x].name;
	//scriptInfo.fullname = sh_scripts[x].fullname;
	scriptInfo.setting = sh_scripts[x].setting;
	scriptInfo.errorHandler = sh_scripts[x].errorHandler;
	scriptInfo.vars = sh_scripts[x].vars;
	
	window.localStorage['UOP_scriptInfo' + x] = JSON.stringify(scriptInfo);
	window.localStorage['UOP_scriptMode' + x] = sh_scripts[x].mode;
	//window.localStorage['UOP_scriptContent' + x] = sh_scripts[x].content;
	//if (sh_scripts[x].errorHandler != 0) window.localStorage['UOP_scriptErrorContent' + x] = sh_scripts[x].errorContent;
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
		//window.localStorage['UOP_scriptContent' + i] = window.localStorage['UOP_scriptContent' + (i + 1)];
		//if (sh_scripts[i].errorHandler != 0) window.localStorage['UOP_scriptErrorContent' + i] = window.localStorage['UOP_scriptErrorContent' + (i + 1)];
	}
	sh_scripts.pop();
	window.localStorage.UOP_nscripts = sh_scripts.length;
}
function shCompile(x) {
	sh_scripts[x].func = sh_defaultScripts[x].func;
	if (sh_scripts[x].errorHandler != 0) sh_scripts[x].errorFunc = sh_defaultScripts[x].errorFunc;
}
function shAttach(x) {
	if (sh_scripts[x].attached == 1) return;
	sh_scripts[x].attached = 1;
	sh_trapCheckPriority += sh_scripts[x].setting.trapCheckPriority;
	sh_userSync += sh_scripts[x].setting.userSync;
	if (sh_scripts[x].setting.beforeTrapCheck == 1) shRegister(0,x,sh_registerBeforeTrapCheck);
	if (sh_scripts[x].setting.priority == 1) {shRegister(0,x,sh_registerHighPriorityScript);return;}
	if (sh_scripts[x].setting.priority == 2) {shRegister(0,x,sh_registerLowPriorityScript);return;}
	if (sh_scripts[x].setting.afterTrapCheck == 1) shRegister(0,x,sh_registerAfterTrapCheck);
	if (sh_scripts[x].setting.afterHorn == 1) shRegister(0,x,sh_registerAfterHorn);
}
function shDetach(x) {
	if (sh_scripts[x].attached == 0) return;
	sh_scripts[x].attached = 0;
	
	sh_trapCheckPriority -= sh_scripts[x].setting.trapCheckPriority;
	sh_userSync -= sh_scripts[x].setting.userSync;
	if (sh_scripts[x].setting.beforeTrapCheck == 1) shRegister(1,x,sh_registerBeforeTrapCheck);
	if (sh_scripts[x].setting.priority == 1) {shRegister(1,x,sh_registerHighPriorityScript);return;}
	if (sh_scripts[x].setting.priority == 2) {shRegister(1,x,sh_registerLowPriorityScript);return;}
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
	var passiveJournals = document.getElementsByClassName('passive');
	if (passiveJournals.length > 0)
	{
		date = passiveJournals[0].getElementsByClassName('journaldate')[0].textContent.match(/:([0-5][0-9]) /)[1];
		window.localStorage.UOP_trapCheckTime = date;
		S_trapCheckTime = Number(date);
	}
}
function shSubmit(url,params,successHandler,errorHandler,loadHandler){
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, false);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
	document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loading: URL = " + url + " - params = " + params + "</label>";
	
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, false);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send(postparams);
	if (http.status == 200)
	{
		document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loaded</label>";
		
		var parseok = 0;
		try
		{
			data = JSON.parse(http.responseText);
			parseok = 1;
		}
		catch (e)
		{
			document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = 200 but Exception = " + e.message + ". Original Data is " + http.responseText + " Retrying...</label>";
			document.title = "Action error !";
			shLoad(url,params,successHandler);
			return;
		}
		if (data.success == 0) throw new Error("Not success in command");
		if (parseok == 1) shActionSuccessHandler(successHandler);
	}
	else
	{
		document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = " + http.status + " Retrying...</label>";
		document.title = "Action error !";
		shLoad(url,params,successHandler);
	}
}
function shLoadOnce(url,params,successHandler) {
	document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loading: URL = " + url + " - params = " + params + "</label>";
	
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, false);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send(postparams);
	if (http.status == 200)
	{
		document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loaded</label>";
		
		var parseok = 0;
		try
		{
			data = JSON.parse(http.responseText);
			parseok = 1;
		}
		catch (e)
		{
			document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = 200 but Exception = " + e.message + ". Original Data is " + http.responseText + " Retrying...</label>";
			document.title = "Action error !";
			shLoadOnce(url,params,successHandler);
			return;
		}
		if (data.success == 0) throw new Error("Not success in command");
		if ((parseok == 1) && (successHandler != null)) successHandler();
	}
	else
	{
		document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = " + http.status + " Retrying...</label>";
		document.title = "Action error !";
		shLoadOnce(url,params,successHandler);
		return;
	}
}
function shLoadAsync(url,params,successHandler){
	document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loading: URL = " + url + " - params = " + params + "</label>";
	
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loaded</label>";
				
				var parseok = 0;
				try
				{
					data = JSON.parse(http.responseText);
					parseok = 1;
				}
				catch (e)
				{
					document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = 200 but Exception = " + e.message + ". Original Data is " + http.responseText + " Retrying...</label>";
					document.title = "Action error !";
					setTimeout(function() {shLoadAsync(url,params,successHandler);},10000);
					return;
				}
				if (data.success == 0) throw new Error("Not success in command");
				if (parseok == 1) shActionSuccessHandler(successHandler);
			}
			else
			{
				document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = " + http.status + " Retrying...</label>";
				document.title = "Action error !";
				setTimeout(function() {shLoadAsync(url,params,successHandler);},10000);
			}
		}
	}
	http.send(postparams);
}
function shLoadOnceAsync(url,params,successHandler) {
	document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loading: URL = " + url + " - params = " + params + "</label>";
	
	var postparams = "hg_is_ajax=1&sn=Hitgrab&uh=" + data.user.unique_hash;
	if ((params != null) && (params.length > 0)) postparams = postparams + "&" + params;
	
	var http = new XMLHttpRequest();
	http.open("POST",C_canvasMode[inCanvas] + url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: green;'>Loaded</label>";
				
				var parseok = 0;
				try
				{
					data = JSON.parse(http.responseText);
					parseok = 1;
				}
				catch (e)
				{
					document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = 200 but Exception = " + e.message + ". Original Data is " + http.responseText + " Retrying...</label>";
					document.title = "Action error !";
					setTimeout(function() {shLoadOnceAsync(url,params,successHandler);},10000);
					return;
				}
				if (data.success == 0) throw new Error("Not success in command");
				if ((parseok == 1) && (successHandler != null)) successHandler();
			}
			else
			{
				document.getElementById('pagemessage').innerHTML += "<label style='font-weight:bold;color: red;'>Error while doing action, request status = " + http.status + " Retrying...</label>";
				document.title = "Action error !";
				setTimeout(function() {shLoadOnceAsync(url,params,successHandler);},10000);
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
	var range = S_trapCheckRange * 2 + 10;
	var timeRemaining = A_delayTimestamp - new Date().getTime();
	if ((timeRemaining > 0) && (timeRemaining < (range * 1000))) //130 = 2 min 10 sec
	{
		if (((S_trapCheckPriority == 1) && (sh_trapCheckPriority > 0)) || (S_trapCheckPriority == 2))
		{
			A_delayTimestamp = new Date().getTime() + range * 1000;
			A_delayTime = range;
			shBeforeTrapCheck();
		}
	}
	else shBeforeTrapCheck();
}
function shStartAfterTrapCheck() {
	sh_mode = AFTERTRAPCHECK;
	sh_si = 0;
	sh_sq = 0;
	if (S_trapCheck == 2) {reloadMH();return;}
	if (S_trapCheck == 1)
	{
		if (sh_userSync > 0) syncUserTrapcheck(shAfterTrapCheck);
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
	if (localStorage.UOP_sh_d_FC_calltime == undefined) localStorage.UOP_sh_d_FC_calltime = 0;
	if (localStorage.UOP_sh_d_FC_callid == undefined) localStorage.UOP_sh_d_FC_callid = 0;
	var calltime = Number(localStorage.UOP_sh_d_FC_calltime);
	var callid = Number(localStorage.UOP_sh_d_FC_callid);
	if (callid != sid)
	{
		callid = sid;
		calltime = 0;
	}
	else ++calltime;
	localStorage.UOP_sh_d_FC_calltime = calltime;
	localStorage.UOP_sh_d_FC_callid = callid;
	
	if (calltime >= 10) shFunctionErrorHandler(null); //being called too much -> ERROR
	else
	{
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
	HAMMER: "/managers/ajax/users/usehammer.php",
	GETITEM: "/managers/ajax/users/userInventory.php"
}
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
function shGetItem(items) {
	var params = "";
	for (var i = 0;i < items.length;++i) params += "item_types[]=" + items[i] + "&";
	params += "action=get_items";
	return params;
}
function shChangeBestTrap(type,priority) {
	if (cacheTrapComponent == null)
	{
		shLoadOnce(C_shdefaultAction.GETTRAP,null,null);
		cacheTrapComponent = data.components;
	}
	var i,j,arrcomp = new Array,comp,match,luckbonus = data.user.has_shield ? 7 : 0,power,luck;
	for (i = 0;i < cacheTrapComponent.length;++i)
	{
		match = false;
		switch (type)
		{
			case BASE: match = (cacheTrapComponent[i].classification == "base") ? true : false;break;
			default: match = (cacheTrapComponent[i].power_type == C_powertype[type]) ? true : false;break;
		}
		if (match)
		{
			comp = new Object;
			comp.power = power = cacheTrapComponent[i].power * (1 + cacheTrapComponent[i].power_bonus);
			comp.luck = luck = cacheTrapComponent[i].luck;
			luck += luckbonus;
			comp.str = power + 4 * luck * luck;
			comp.attraction = cacheTrapComponent[i].attraction_bonus;
			comp.name = cacheTrapComponent[i].type;
			arrcomp.push(comp);
		}
	}
	if (arrcomp.length == 0) return;
	var prioritystr = C_trapprioritytype[priority];
	arrcomp.sort(function (a,b) {return b[prioritystr] - a[prioritystr];});
	var param = (type == BASE) ? shChangeTrap('',arrcomp[0].name,'','') : shChangeTrap(arrcomp[0].name,'','','');
	shLoadOnce(C_shdefaultAction.CHANGETRAP,param,null);
}


var sh_defaultScripts = [
	{
		name: 'default_trapcheck',
		fullname: "Change Trap at Trapcheck",
		setting: {beforeTrapCheck: 1,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customNormalWeapon: {name: 'Normal Trap', val: '', displayType: 'weapon'},
			   customNormalBase: {name: 'Normal Base', val: '', displayType: 'base'},
			   customNormalTrinket: {name: 'Normal Charm', val: '', displayType: 'trinket'},
			   customNormalBait: {name: 'Normal Cheese', val: '', displayType: 'bait'}, 
			   customTCWeapon: {name: 'Trapcheck Trap', val: '', displayType: 'weapon'},
			   customTCBase: {name: 'Trapcheck Base', val: '', displayType: 'base'},
			   customTCTrinket: {name: 'Trapcheck Charm', val: '', displayType: 'trinket'},
			   customTCBait: {name: 'Trapcheck Cheese', val: '', displayType: 'bait'}},
		mode: STOP,
		errorHandler: 0,
		func: shdefaultTrapcheck
	},
	{
		name: 'default_iceberg',
		fullname: 'Iceberg (Base)',
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customBase: {name: 'Base for Commander Stage (No change = Auto)', val: '', displayType: 'base'}},
		mode: STOP,
		errorHandler: 0,
		func: shdefaultIceberg
	},
	{
		name: 'default_balackscove',
		fullname: "Balack's Cove (Cheese,Location)",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customShadowTrap: {name: 'Shadow Trap at JoD (No change = Auto)', val: '', displayType: 'weapon'},
			   customBCTrap: {name: 'Trap at BC (No change = Auto: GAT/Trex/ACRONYM/ABT)', val: '', displayType: 'weapon'}},
		mode: PLAY,
		errorHandler: 0,
		func: shdefaultBalacksCove
	},
	{
		name: 'default_zugwangstowersimple',
		fullname: "Zugwang's Tower (Pawn,disarm CMC)",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customTrap: {name: 'Trap after pawn  (No change = Auto)', val: '', displayType: 'weapon'}, customBase: {name: 'Base after pawn (No change = Auto)', val: '', displayType: 'base'}},
		mode: PLAY,
		errorHandler: 0,
		func: shdefaultZugwangsTowerSimple
	},
	{
		name: 'default_seasonalgarden',
		fullname: "Seasonal Garden (Trap)",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 0,afterHorn: 1,priority: 0, userSync: 0,trapCheckPriority: 0},
		vars: {customPhysicalTrap: {name: 'Physical Trap (No change = Auto)', val: '', displayType: 'weapon'},
			   customTacticalTrap: {name: 'Tactical Trap (No change = Auto)', val: '', displayType: 'weapon'},
			   customShadowTrap: {name: 'Shadow Trap (No change = Auto)', val: '', displayType: 'weapon'},
			   customHydroTrap: {name: 'Hydro Trap (No change = Auto)', val: '', displayType: 'weapon'}},
		mode: PLAY,
		errorHandler: 0,
		func: shdefaultSeasonalGarden
	},
	{
		name: 'default_derrdunes',
		fullname: "Derr Dunes Farm",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 0,afterHorn: 1,priority: 0, userSync: 0,trapCheckPriority: 0},
		vars: {customGoudaEachBuy: {name: 'Number of Gouda to buy', val: 1000, displayType: 'number'}},
		mode: STOP,
		errorHandler: 0,
		func: shdefaultDerrDunes
	},
	{
		name: 'default_fierywarpath',
		fullname: "Fiery Warpath",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {
			customCommanderCharmWave1: {name: 'Number of Commander Charm in Wave 1', val: 1, displayType: 'number'},
			customCommanderCharmWave2: {name: 'Number of Commander Charm in Wave 2', val: 2, displayType: 'number'},
			customCommanderCharmWave3: {name: 'Number of Commander Charm in Wave 3', val: 3, displayType: 'number'},
			customStreakLevel1: {name: '0 <= streak < streakLevel1', val: 2, displayType: 'number'},
			customStreakLevel2: {name: 'steakLevel1 <= streak < streakLevel2', val: 3, displayType: 'number'},
			customCommanderStreak: {name: 'steakLevel2 <= streak < streakCommander', val: 6, displayType: 'number'},
			customGagaStreak: {name: 'streakCommander <= streak < streakGaga', val: 10, displayType: 'number'},
			customBaitLevel1: {name: 'Bait in Level 1 streak', val: 'gouda_cheese', displayType: 'bait'},
			customBaitLevel2: {name: 'Bait in Level 2 streak', val: 'gouda_cheese', displayType: 'bait'},
			customBaitLevel3: {name: 'Bait in Level 3 streak', val: 'super_brie_cheese', displayType: 'bait'},
			customCharmLevel1: {name: 'Charm in Level 1 streak', val: 'normal', displayType: 'FWcharm'},
			customCharmLevel2: {name: 'Charm in Level 2 streak', val: 'normal', displayType: 'FWcharm'},
			customCharmLevel3: {name: 'Charm in Level 3 streak', val: 'super', displayType: 'FWcharm'},
			customMinMouseRetreatWave1: {name: 'Min number of retreat mouse in Wave 1', val: 18, displayType: 'number'},
			customMinMouseRetreatWave2: {name: 'Min number of retreat mouse in Wave 2', val: 30, displayType: 'number'},
			customMinMouseRetreatWave3: {name: 'Min number of retreat mouse in Wave 3', val: 36, displayType: 'number'},
			leftoverMouse: {name: 'Switch if number of mouse below', val: 17, displayType: 'number'},
			commanderrepresentativelevel: {name: 'If no commander charm left, use the same setup as', val: 0, displayType: 'FWlevel'}
		},
		mode: STOP,
		errorHandler: 0,
		func: shdefaultFieryWarpath
	},
	{
		name: 'default_furoma',
		fullname: "Furoma Cycle",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		func: shdefaultFuroma
	},
	{
		name: 'default_eventeggcycle',
		fullname: "Event Easter Egg Cycle",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customMinCharged: {name: 'Minimum charged power (Min <= X)', val: 17, displayType: 'number'},
			customMaxCharged: {name: 'Maximum charged power (X <= Max)', val: 20, displayType: 'number'}},
		mode: PLAY,
		errorHandler: 0,
		func: shdefaultEventEggCycle
	},
	{
		name: 'default_livinggarden',
		fullname: "Living Garden MiniGame",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customDoubleCharm: {name: 'Use Double Charm (Sponge, Super Salt)', val: false, displayType: 'checkbox'},
			customNumberSaltCharm: {name: 'Number of Salt for King Grub', val: 20, displayType: 'number'},
			customNormalCharm: {name: 'Charm to use at normal state (No change = Disarm)', val: 'disarmTrinket', displayType: 'trinket'}},
		mode: PLAY,
		errorHandler: 0,
		func: shdefaultLivingGarden
	},
	{
		name: 'default_expresstrain',
		fullname: "Express Train MiniGame",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {},
		mode: PLAY,
		errorHandler: 0,
		func: shDefaultExpressTrain
	},
	{
		name: 'default_sunkencity',
		fullname: "Sunken City Treasure zone",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customSmartCheese: {name: 'Smart Cheese: Switch SB+/Gouda/Brie based on zone type', val: true, displayType: 'checkbox'},
			customTreasureRush: {name: 'Treasure Rush: Use Water Jet Charm to reach treasure zones asap', val: false, displayType: 'checkbox'},
			customFishyFromage: {name: 'Fishy Fromage (negative = craft/buy with Magic Essence)', val: 100, displayType: 'number'},
			customGlobalCharm: {name: 'Global (zone settings: No change = Global)', val: 'disarmTrinket', displayType: 'trinket'},
			customSunkenCharm: {name: 'Sunken City (Surface)', val: '', displayType: 'trinket'},
			customDefaultCharm: {name: 'Default zone (Low loot)', val: '', displayType: 'trinket'},
			customBarnacleCharm: {name: 'Barnacle zone', val: '', displayType: 'trinket'},
			customScaleCharm: {name: 'Scale zone', val: '', displayType: 'trinket'},
			customCoralCharm: {name: 'Coral zone', val: '', displayType: 'trinket'},
			customDangerCharm: {name: 'Danger zone', val: '', displayType: 'trinket'},
			customTreasureCharm: {name: 'Treasure zone', val: 'anchor_trinket', displayType: 'trinket'},
			customOxygenCharm: {name: 'Oxygen zone', val: 'anchor_trinket', displayType: 'trinket'}},
		mode: PLAY,
		errorHandler: 0,
		func: shdefaultSunkenCity
	},
	{
		name: 'default_burroughsrift',
		fullname: "Burroughs Rift MiniGame",
		setting: {beforeTrapCheck: 0,afterTrapCheck: 1,afterHorn: 1,priority: 0, userSync: 1,trapCheckPriority: 0},
		vars: {customMinCharged: {name: 'Minimum charged power (Min <= X)', val: 7, displayType: 'number'},
			customMaxCharged: {name: 'Maximum charged power (X <= Max)', val: 20, displayType: 'number'}},
		mode: PLAY,
		errorHandler: 0,
		func: shDefaultBurroughsRift
	}
];

function shdefaultIceberg(){
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
				case "General":
					if (sh_scripts[sh_sid].vars.customBase.val != '') param = shChangeTrap('',sh_scripts[sh_sid].vars.customBase.val,'','');
					else
					{
						shChangeBestTrap(BASE,TRAPAUTO);
						window.localStorage.UOP_sh_d_IB_state = data.user.quests.QuestIceberg.current_phase;
					}
					break;
				case "Treacherous Tunnels":param = shChangeTrap('','magnet_base','','');break;
				case "Brutal Bulwark":param = shChangeTrap('','spiked_base','','');break;
				case "Bombing Run":param = shChangeTrap('','remote_detonator_base','','');break;
				case "The Mad Depths":param = shChangeTrap('','hearthstone_base','','');break;
				case "Icewing's Lair":
					if (user.quests.QuestIceberg.turns_taken < 250) param = shChangeTrap('','deep_freeze_base','','');
					else
					{
						if (sh_scripts[sh_sid].vars.customBase.val != '') param = shChangeTrap('',sh_scripts[sh_sid].vars.customBase.val,'','');
						else
						{
							shChangeBestTrap(BASE,TRAPAUTO);
							window.localStorage.UOP_sh_d_IB_state = data.user.quests.QuestIceberg.current_phase;
						}
					}
					break;
				//case "The Hidden Depths":param = shChangeTrap('','deep_freeze_base','','');break; // no point of changing things here ?
			}
			if (param != '')
			{
				shLoadOnce(C_shdefaultAction.CHANGETRAP,param,null);
				window.localStorage.UOP_sh_d_IB_state = data.user.quests.QuestIceberg.current_phase;
			}
		}
	}
	else if (data.user.environment_id == 39)
	{
		window.localStorage.UOP_sh_d_IB_state = "slushy_shoreline";
		if ((data.user.trinket_item_id == 877) || (data.user.trinket_item_id == 876))
		{
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
		}
		if (data.user.base_item_id == 899)
		{
			if (sh_scripts[sh_sid].vars.customBase.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('',sh_scripts[sh_sid].vars.customBase.val,'',''),null);
			else shChangeBestTrap(BASE,TRAPAUTO);
		}
	}
	else 
	{
		window.localStorage.UOP_sh_d_IB_state = "other_area";
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultBalacksCove(){
	if (data.user.bait_item_id == 119)
	{
		if ((sh_clock.UOP_locationTimerBalacksCove.stateID == 2) ||
			((sh_clock.UOP_locationTimerBalacksCove.stateID == 1) && (sh_clock.UOP_locationTimerBalacksCove.timeleft < 15 * 60)) ||
			(data.user.bait_quantity == 0))
			{
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','disarmBait'),null);
				if (sh_scripts[sh_sid].vars.customBCTrap.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(sh_scripts[sh_sid].vars.customBCTrap.val,'','','vanilla_stilton_cheese'),null);
				else
				{
					if (cacheTrapComponent == null)
					{
						shLoadOnce(C_shdefaultAction.GETTRAP,null,null);
						cacheTrapComponent = data.components;
					}
					var i;
					var trap,besttrap = 5;
					for (i = 0;i < cacheTrapComponent.length;++i)
					{
						trap = C_shdefaultBCTrap[cacheTrapComponent[i].type];
						if (trap == undefined) trap = 5;
						if (besttrap < trap) besttrap = trap;
					}
					trap = C_shdefaultBCTrapR[besttrap];
					//~~~~check cheese ?
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(trap,'','','vanilla_stilton_cheese'),null);
				}
			}
	}
	if ((data.user.environment_id == 14) && ((data.user.bait_item_id == 119) || (data.user.bait_item_id == 118)) && (data.user.bait_quantity > 0))
	{
		setTimeout(function() {shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("balacks_cove"),null);},5000);
	}
	if ((data.user.environment_id != 14) && (data.user.bait_item_id == 118) && (data.user.bait_quantity == 0))
	{
		shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("jungle_of_dread"),null);
		shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','gouda_cheese'),null);
		if (sh_scripts[sh_sid].vars.customShadowTrap.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(sh_scripts[sh_sid].vars.customShadowTrap.val,'','',''),null);
		else shChangeBestTrap(SHADOW,TRAPAUTO);
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultZugwangsTowerSimple(){
	if (data.user.environment_id == 32)
	{
		window.localStorage.UOP_sh_d_SG_state = 5;
		if (((data.user.weapon_item_id == 356) && (data.user.viewing_atts.zzt_tech_progress >= 8)) ||
		    ((data.user.weapon_item_id == 354) && (data.user.viewing_atts.zzt_mage_progress >= 8)))
			{
				if (sh_scripts[sh_sid].vars.customTrap.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(sh_scripts[sh_sid].vars.customTrap.val,'','',''),null);
				else shChangeBestTrap(TACTICAL,TRAPAUTO);
				if (sh_scripts[sh_sid].vars.customBase.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('',sh_scripts[sh_sid].vars.customBase.val,'',''),null);
				else shChangeBestTrap(BASE,TRAPAUTO);
		}
	}
	if (data.user.environment_id == 31)
	{
		if (data.user.bait_item_id == 371)
		{
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','disarmBait'),null); //disarm first, then try to arm again
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','gouda_cheese'),autoPlay);
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultSeasonalGarden(){
	if (data.user.environment_id == 31)
	{
		if (data.user.bait_item_id == 371)
		{
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','disarmBait'),null); //disarm first, then try to arm again
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','gouda_cheese'),autoPlay);
		}
		
		if ((data.user.viewing_atts.zzt_amplifier == data.user.viewing_atts.zzt_max_amplifier) && (data.user.trinket_item_id == 647))
		{
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
		}
		
		var thisstate,laststate;
		if (window.localStorage.UOP_sh_d_SG_state == undefined) laststate = -1;
		else laststate = Number(window.localStorage.UOP_sh_d_SG_state);
		thisstate = sh_clock.UOP_locationTimerSeasonalGarden.stateID;
		if (laststate != thisstate)
		{
			switch (thisstate)
			{
				case 0:
					if (sh_scripts[sh_sid].vars.customPhysicalTrap.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(sh_scripts[sh_sid].vars.customPhysicalTrap.val,'','',''),null);
					else shChangeBestTrap(PHYSICAL,TRAPAUTO);
					break;
				case 1:
					if (sh_scripts[sh_sid].vars.customTacticalTrap.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(sh_scripts[sh_sid].vars.customTacticalTrap.val,'','',''),null);
					else shChangeBestTrap(TACTICAL,TRAPAUTO);
					break;
				case 2:
					if (sh_scripts[sh_sid].vars.customShadowTrap.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(sh_scripts[sh_sid].vars.customShadowTrap.val,'','',''),null);
					else shChangeBestTrap(SHADOW,TRAPAUTO);
					break;
				case 3:
					if (sh_scripts[sh_sid].vars.customHydroTrap.val != '') shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(sh_scripts[sh_sid].vars.customHydroTrap.val,'','',''),null);
					else shChangeBestTrap(HYDRO,TRAPAUTO);
					break;
			}
			window.localStorage.UOP_sh_d_SG_state = thisstate;
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultDerrDunes(){
	if (data.user.environment_id == 7) //derr dunes
	{
		if (data.user.bait_quantity == 0)
		{
			var i;

			//load item
			var items = ["delicious_stone_craft_item","coconut_milk_craft_item","salt_craft_item","curds_and_whey_craft_item","crunchy_cheese","gouda_cheese"];
			shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
			i = 0;
			var UOP_sh_d_Derr_delicious_stone = data.items[i].quantity;++i;
			var UOP_sh_d_Derr_coconut_milk = data.items[i].quantity;++i;
			var UOP_sh_d_Derr_salt = data.items[i].quantity;++i;
			var UOP_sh_d_Derr_curds_and_whey = data.items[i].quantity;++i;
			var UOP_sh_d_Derr_crunchy_cheese = data.items[i].quantity;++i;
			var UOP_sh_d_Derr_gouda_cheese = data.items[i].quantity;++i;
			
			//change to crunchy and gouda if found
			if (UOP_sh_d_Derr_crunchy_cheese > 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','crunchy_cheese'),autoPlay);
			else if (UOP_sh_d_Derr_gouda_cheese > 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','gouda_cheese'),autoPlay);
			else //else go shopping
			{
				shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("cape_clawed"),null);
				
				//buy coconut
				var craftitem0num, craftitem1num,craftitem2num,craftitem3num,craftnum;
				craftitem0num = Math.floor(UOP_sh_d_Derr_delicious_stone / 30);
				craftitem1num = craftitem0num * 20 - UOP_sh_d_Derr_coconut_milk;
				craftitem2num = Math.floor(data.user.gold / 800);
				craftitem1num = Math.min(craftitem1num,craftitem2num);
				if (craftitem1num > 0)
				{
					UOP_sh_d_Derr_coconut_milk = craftitem1num + UOP_sh_d_Derr_coconut_milk;
					shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","coconut_milk_craft_item",craftitem1num),null);
				}
				
				//buy salt
				craftitem0num = Math.floor(UOP_sh_d_Derr_delicious_stone / 30);
				craftitem1num = craftitem0num * 30 - UOP_sh_d_Derr_salt;
				craftitem2num = Math.floor(data.user.gold / 6);
				craftitem1num = Math.min(craftitem1num,craftitem2num);
				if (craftitem1num > 0)
				{
					UOP_sh_d_Derr_salt = craftitem1num + UOP_sh_d_Derr_salt;
					shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","salt_craft_item",craftitem1num),null);
				}
				
				//buy curd
				craftitem0num = Math.floor(UOP_sh_d_Derr_delicious_stone / 30);
				craftitem1num = craftitem0num * 10 - UOP_sh_d_Derr_curds_and_whey;
				craftitem2num = Math.floor(data.user.gold / 12);
				craftitem1num = Math.min(craftitem1num,craftitem2num);
				if (craftitem1num > 0)
				{
					UOP_sh_d_Derr_curds_and_whey = craftitem1num + UOP_sh_d_Derr_curds_and_whey;
					shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","curds_and_whey_craft_item",craftitem1num),null);
				}
				
				//buy max gouda
				var defaultnum = sh_scripts[sh_sid].vars.customGoudaEachBuy.val;
				var numcheese = Math.floor(data.user.gold / 600);
				numcheese = Math.min(numcheese,defaultnum);
				shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","gouda_cheese",numcheese),null);
				
				//craft
				craftitem0num = Math.floor(UOP_sh_d_Derr_delicious_stone / 30);
				craftitem1num = Math.floor(UOP_sh_d_Derr_coconut_milk / 20);
				craftitem2num = Math.floor(UOP_sh_d_Derr_salt / 30);
				craftitem3num = Math.floor(UOP_sh_d_Derr_curds_and_whey / 10);
				craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num,craftitem3num);
				if (craftnum > 0)
				{
					var parts = {};
					parts.delicious_stone_craft_item = 30;
					parts.coconut_milk_craft_item = 20;
					parts.salt_craft_item = 30;
					parts.curds_and_whey_craft_item = 10;
					UOP_sh_d_Derr_crunchy_cheese = craftnum * 15 + UOP_sh_d_Derr_crunchy_cheese;
					shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
				}
				
				//go home and arm
				shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("derr_dunes"),null);
				if (craftnum > 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','crunchy_cheese'),autoPlay);
				else if (numcheese > 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','gouda_cheese'),autoPlay);
				else
				{
					//throw new Error("Out of cheese");
					//basically, I think zero bait will stop the script
				}
			}
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
var C_defaultFieryWarpathOrder = ["scout","archer","warrior","mage","cavalry","artillery"];
var C_defaultFieryWarpathMapItem = {
	flame_march_warrior_trinket: 539,flame_march_archer_trinket: 534,flame_march_scout_trinket: 538,flame_march_cavalry_trinket: 535,flame_march_mage_trinket: 537,
	super_flame_march_warrior_trinket: 544,super_flame_march_archer_trinket: 540,super_flame_march_scout_trinket: 543,super_flame_march_cavalry_trinket: 541,super_flame_march_mage_trinket: 542,
	brie_cheese:80, gouda_cheese: 98, super_brie_cheese: 114
}
var C_defaultFieryWarpathWave = [3,5,6];
var C_defaultFieryWarpathData = {
	warrior: {wave1:"desert_warrior_weak",wave2:"desert_warrior",wave3:"desert_warrior_epic",power:"Physical",val:PHYSICAL,normalcharm:"flame_march_warrior_trinket",supercharm:"super_flame_march_warrior_trinket"},
	archer: {wave1:"desert_archer_weak",wave2:"desert_archer",wave3:"desert_archer_epic",power:"Physical",val:PHYSICAL,normalcharm:"flame_march_archer_trinket",supercharm:"super_flame_march_archer_trinket"},
	scout: {wave1:"desert_scout_weak",wave2:"desert_scout",wave3:"desert_scout_epic",power:"Physical",val:PHYSICAL,normalcharm:"flame_march_scout_trinket",supercharm:"super_flame_march_scout_trinket"},
	//cavalry: {wave2:"desert_cavalry",wave3:"desert_cavalry_strong",power:"Tactical",val:TACTICAL,normalcharm:"flame_march_cavalry_trinket",supercharm:"super_flame_march_cavalry_trinket"},
	cavalry: {wave2:"desert_cavalry",wave3:"desert_cavalry_strong",power:"Tactical",val:TACTICAL,normalcharm:"",supercharm:""},
	//mage: {wave2:"desert_mage",wave3:"desert_mage_strong",power:"Hydro",val:HYDRO,normalcharm:"flame_march_mage_trinket",supercharm:"super_flame_march_mage_trinket"},
	mage: {wave2:"desert_mage",wave3:"desert_mage_strong",power:"Physical",val:PHYSICAL,normalcharm:"flame_march_mage_trinket",supercharm:"super_flame_march_mage_trinket"},
	artillery: {wave3:"desert_artillery",power:"Arcane",val:ARCANE,normalcharm:"",supercharm:""}};
function shdefaultFieryWarpath(){
	if (data.user.environment_id == 33)
	{
		var warpathObj = data.user.viewing_atts.desert_warpath;
		var wave = warpathObj.wave;
		var streak = warpathObj.streak.quantity;
		var streaklevel1 = sh_scripts[sh_sid].vars.customStreakLevel1.val;
		var streaklevel2 = sh_scripts[sh_sid].vars.customStreakLevel2.val;
		var streakcommander = sh_scripts[sh_sid].vars.customCommanderStreak.val;
		var streakgaga = sh_scripts[sh_sid].vars.customGagaStreak.val;
		var items;
		if (wave != Number(localStorage.UOP_sh_d_FW_lastwave))
		{
			localStorage.UOP_sh_d_FW_lastwave = wave;
			if (wave != 4) localStorage.UOP_sh_d_FW_numcommander = sh_scripts[sh_sid].vars["customCommanderCharmWave" + wave].val;
		}
		if (wave == 4)
		{
			if (data.user.trap_power_type_name != "Physical") shChangeBestTrap(PHYSICAL,TRAPAUTO);
			if (data.user.trinket_item_id != 614)
			{
				items = ["monger_trinket"];
				shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
				if (data.items[0].quantity > 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','monger_trinket',''),null);
				else
				{
					//~~~~auto buy monger trinket ?
					//shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','monger_trinket',''),null);
				}
			}
		}
		else
		{
			var mousetype = 0,retreatmousenum,leftover = sh_scripts[sh_sid].vars.leftoverMouse.val;;
			var cheese,charmtype,charm;
			var gagahunt = false;
			if ((streak == 0) && ((data.user.trinket_item_id == 536) || (data.user.trinket_item_id == 615))) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
			var numcommander = Number(localStorage.UOP_sh_d_FW_numcommander);
			var requiredRetreatMouse = sh_scripts[sh_sid].vars["customMinMouseRetreatWave" + wave].val;
			if ((0 <= streak) && (streak < streakcommander))
			{
				//leftover mouse, so we can try streak on another type of mouse
				while ((mousetype < 3) && (warpathObj.wave_population[C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]]["wave" + wave]].population < leftover)) mousetype++;
				if (mousetype == 3) //all leftover is already used -> clear all mouse
				{
					mousetype = 0;
					while ((mousetype < C_defaultFieryWarpathWave[wave - 1]) && (warpathObj.wave_population[C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]]["wave" + wave]].population == 0)) mousetype++;
				}
				if (mousetype >= C_defaultFieryWarpathWave[wave - 1]) syncUser(shActionSuccessHandler); //sumthing wrong
				if (C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]]["wave" + wave] != warpathObj.streak.mouse_type) streak = 0;
				if (C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]].power != data.user.trap_power_type_name)
					shChangeBestTrap(C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]].val,TRAPAUTO);
				if ((0 <= streak) && (streak < streaklevel1))
				{
					charmtype = sh_scripts[sh_sid].vars.customCharmLevel1.val;
					cheese = sh_scripts[sh_sid].vars.customBaitLevel1.val;
				}
				if ((streaklevel1 <= streak) && (streak < streaklevel2))
				{
					charmtype = sh_scripts[sh_sid].vars.customCharmLevel2.val;
					cheese = sh_scripts[sh_sid].vars.customBaitLevel2.val;
				}
				if ((streaklevel2 <= streak) && (streak < streakcommander))
				{
					charmtype = sh_scripts[sh_sid].vars.customCharmLevel3.val;
					cheese = sh_scripts[sh_sid].vars.customBaitLevel3.val;
				}
				if ((mousetype >= 3) && (cheese == 'super_brie_cheese')) //No super for Mage, cavalry and artillery
				{
					charmtype = "normal";
					cheese = 'gouda_cheese';
				}
				if (((wave == 1) && (mousetype == 2)) || ((wave == 2) && (mousetype == 4)) || ((wave == 3) && (mousetype == 4))) charm = ''; //last mousetype doesn't need charm
				else charm = C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]][charmtype + "charm"];
				if (data.user.trinket_item_id == C_defaultFieryWarpathMapItem[charm]) charm = '';
				if (data.user.bait_item_id == C_defaultFieryWarpathMapItem[cheese]) cheese = '';
				if (charm != '')
				{
					items = [charm];
					shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
					if (data.items[0].quantity == 0)
					{
						cheese = ''; //temporally
						shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket','disarmBait'),null); //temporally
						
						//~~~~go buy
						//not success: ???
						//cheese should be normal like gouda and stay like that
					}
					else shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','',charm,''),null);
				}
				if (cheese != '')
				{
					items = [cheese];
					shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
					if (data.items[0].quantity == 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','disarmBait'),null); //no cheese = disarm, end of story
					else shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','',cheese),null);
				}
			}
			else if ((streakcommander <= streak) && (streak < streakgaga))
			{
				if (numcommander > 0)
				{
					if (data.user.trap_power_type_name != "Physical") shChangeBestTrap(PHYSICAL,TRAPAUTO);
					cheese = 'super_brie_cheese';
					if (data.user.bait_item_id != C_defaultFieryWarpathMapItem[cheese])
					{
						items = [cheese];
						shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
						if (data.items[0].quantity != 0) 
							shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','',cheese),null);
					}
				}
				else
				{
					var streaklevelsetup = sh_scripts[sh_sid].vars.commanderrepresentativelevel.val;
					if (streaklevelsetup != 0)
					{
						while ((mousetype < C_defaultFieryWarpathWave[wave - 1]) && (warpathObj.streak.mouse_type != C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]]["wave" + wave])) mousetype++;
						charmtype = sh_scripts[sh_sid].vars["customCharmLevel" + streaklevelsetup].val;
						cheese = sh_scripts[sh_sid].vars["customBaitLevel" + streaklevelsetup].val;
						if (((wave == 1) && (mousetype == 2)) || ((wave == 2) && (mousetype == 4)) || ((wave == 3) && (mousetype == 4))) charm = ''; //last mousetype doesn't need charm
						else charm = C_defaultFieryWarpathData[C_defaultFieryWarpathOrder[mousetype]][charmtype + "charm"];
						if (data.user.trinket_item_id == C_defaultFieryWarpathMapItem[charm]) charm = '';
						if (data.user.bait_item_id == C_defaultFieryWarpathMapItem[cheese]) cheese = '';
						
						if (charm != '')
						{
							items = [charm];
							shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
							if (data.items[0].quantity == 0)
							{
								cheese = ''; //temporally
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket','disarmBait'),null); //temporally
								
								//~~~~go buy
								//not success: ???
								//cheese should be normal like gouda and stay like that
							}
							else shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','',charm,''),null);
						}
						if (cheese != '')
						{
							items = [cheese];
							shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
							if (data.items[0].quantity == 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','disarmBait'),null); //no cheese = disarm, end of story
							else shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','',cheese),null);
						}
						
					}
				}
			}
			else if ((streakgaga <= streak) && (streak <= 12))
			{
				if (data.user.trap_power_type_name != "Draconic")
				{
					cheese = 'super_brie_cheese';
					if (data.user.bait_item_id != C_defaultFieryWarpathMapItem[cheese])
						shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','super_brie_cheese'),null); //check cheese plz
					shChangeBestTrap(DRACONIC,TRAPAUTO);
				}
			}
			if (streakcommander <= streak) //separated commander charm process
			{
				var useCommander = false;
				if ((data.user.trinket_item_id == 536) || (data.user.trinket_item_id == 615)) useCommander = true;
				if (numcommander > 0)
				{
					if ((data.user.trinket_item_id != 536) && (data.user.trinket_item_id != 615))
					{
						retreatmousenum = 0;
						var wave_population = warpathObj.wave_population;
						for (var mouse_population in wave_population)
							if (wave_population.hasOwnProperty(mouse_population))
							{
								retreatmousenum += Math.min(streak,wave_population[mouse_population].population);
							}
						if (retreatmousenum >= requiredRetreatMouse)
						{
							items = ["super_flame_march_general_trinket","flame_march_general_trinket"];
							shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
							var charm = '';
							if (data.items[0].quantity > 0) charm = 'super_flame_march_general_trinket';
							if (data.items[1].quantity > 0) charm = 'flame_march_general_trinket';
							if (charm != '')
							{
								localStorage.UOP_sh_d_FW_numcommander = Number(localStorage.UOP_sh_d_FW_numcommander) - 1;
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','',charm,''),null);
							}
							else
							{
								localStorage.UOP_sh_d_FW_numcommander = 0;
								setTimeout(shActionSuccessHandler,0);
								return;
							}
							useCommander = true;
						}
					}
				}
				if ((streakgaga <= streak) && (streak <= 12) && (data.user.trinket_item_id != 0) && (useCommander == false)) //if gaga streak and not able to use Commander charm => disarm
				{
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
				}
			}
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultFuroma(){
	if ((data.user.environment_id == 8) || (data.user.environment_id == 19) || (data.user.environment_id == 23))
	{
		if (data.user.bait_quantity == 0)
		{
			//load item
			var i;
			var items = ["token_of_the_cheese_belt_craft_item","token_of_the_cheese_claw_craft_item","token_of_the_cheese_fang_craft_item",
				"master_belt_shard_craft_item","master_claw_shard_craft_item","master_fang_shard_craft_item","masters_seal_craft_item",
				"onyx_stone_craft_item","magic_essence_craft_item",
				"glutter_cheese","susheese_cheese","combat_cheese","rumble_cheese","unstable_curd_convertible","onyx_gorgonzola_cheese","maki_cheese","brie_cheese",
				"cheesy_fluffs_craft_item","invisiglu_craft_item","burroughs_salmon_craft_item","nori_craft_item","paintbrand_paint_craft_item","splintered_wood_craft_item",
				"ionized_salt_craft_item","curds_and_whey_craft_item"];
			shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);

			i = 0;
			UOP_sh_d_Furoma_token_belt = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_token_claw = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_token_fang = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_master_belt = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_master_claw = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_master_fang = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_master_seal = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_onyx_stone = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_magic_essence = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_glutter_cheese = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_susheese_cheese = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_combat_cheese = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_rumble_cheese = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_unstable_curd = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_onyx_cheese = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_maki_cheese = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_brie_cheese = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_cheesy_fluffs = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_invisiglu = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_burroughs_salmon = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_nori = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_paintbrand_paint = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_splintered_wood = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_ionized_salt = data.items[i].quantity;++i;
			UOP_sh_d_Furoma_curds_and_whey = data.items[i].quantity;++i;

			//craft belt cheese then use it
			craftitem0num, craftitem1num, craftitem2num, craftitem3num, craftnum;
			craftitem0num = Math.floor(Number(UOP_sh_d_Furoma_token_belt) / 3);
			craftitem1num = Number(UOP_sh_d_Furoma_cheesy_fluffs);
			craftitem2num = Number(UOP_sh_d_Furoma_invisiglu);
			craftitem3num = Math.floor(Number(UOP_sh_d_Furoma_curds_and_whey) / 7);
			craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num,craftitem3num);
			if (craftnum > 0)
			{
				var parts = {};
				parts.token_of_the_cheese_belt_craft_item = 3;
				parts.cheesy_fluffs_craft_item = 1;
				parts.invisiglu_craft_item = 1;
				parts.curds_and_whey_craft_item = 7;
				UOP_sh_d_Furoma_glutter_cheese = craftnum * 3 + Number(UOP_sh_d_Furoma_glutter_cheese);
				shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
			}
			if (Number(UOP_sh_d_Furoma_glutter_cheese) > 0)
			{
				if (data.user.environment_id != 19) shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("meditation_room"),null);
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','glutter_cheese'),autoPlay);
				
				setTimeout(shFunctionSuccessHandler,0);
				return;
			}

			//craft claw shard then arm
			craftitem0num = Math.floor(Number(UOP_sh_d_Furoma_token_claw) / 3);
			craftitem1num = Number(UOP_sh_d_Furoma_burroughs_salmon);
			craftitem2num = Number(UOP_sh_d_Furoma_nori);
			craftitem3num = Math.floor(Number(UOP_sh_d_Furoma_curds_and_whey) / 3);
			craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num,craftitem3num);
			if (craftnum > 0)
			{
				var parts = {};
				parts.token_of_the_cheese_claw_craft_item = 3;
				parts.burroughs_salmon_craft_item = 1;
				parts.nori_craft_item = 1;
				parts.curds_and_whey_craft_item = 3;
				UOP_sh_d_Furoma_susheese_cheese = craftnum * 3 + Number(UOP_sh_d_Furoma_susheese_cheese);
				shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
			}
			if (Number(UOP_sh_d_Furoma_susheese_cheese) > 0)
			{
				if (data.user.environment_id != 19) shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("meditation_room"),null);
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','susheese_cheese'),autoPlay);
				
				setTimeout(shFunctionSuccessHandler,0);
				return;
			}

			//craft fang shard then arm
			craftitem0num = Math.floor(Number(UOP_sh_d_Furoma_token_fang) / 3);
			craftitem1num = Number(UOP_sh_d_Furoma_paintbrand_paint);
			craftitem2num = Number(UOP_sh_d_Furoma_splintered_wood);
			craftitem3num = Math.floor(Number(UOP_sh_d_Furoma_curds_and_whey) / 5);
			craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num,craftitem3num);
			if (craftnum > 0)
			{
				var parts = {};
				parts.token_of_the_cheese_fang_craft_item = 3;
				parts.paintbrand_paint_craft_item = 1;
				parts.splintered_wood_craft_item = 1;
				parts.curds_and_whey_craft_item = 5;
				UOP_sh_d_Furoma_combat_cheese = craftnum * 3 + Number(UOP_sh_d_Furoma_combat_cheese);
				shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
			}
			if (Number(UOP_sh_d_Furoma_combat_cheese) > 0)
			{
				if (data.user.environment_id != 19) shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("meditation_room"),null);
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','combat_cheese'),autoPlay);
				
				setTimeout(shFunctionSuccessHandler,0);
				return;
			}
			
			//craft master shard then arm
			craftitem0num = Number(UOP_sh_d_Furoma_master_belt);
			craftitem1num = Number(UOP_sh_d_Furoma_master_claw);
			craftitem2num = Number(UOP_sh_d_Furoma_master_fang);
			craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num);
			if (craftnum > 0)
			{
				var parts = {};
				parts.master_belt_shard_craft_item = 1;
				parts.master_claw_shard_craft_item = 1;
				parts.master_fang_shard_craft_item = 1;
				UOP_sh_d_Furoma_master_seal = craftnum + Number(UOP_sh_d_Furoma_master_seal);
				shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
			}
			
			craftitem0num = Number(UOP_sh_d_Furoma_master_seal);
			craftitem1num = Number(UOP_sh_d_Furoma_ionized_salt);
			craftitem2num = Math.floor(Number(UOP_sh_d_Furoma_curds_and_whey) / 20);
			craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num);
			if (craftnum > 0)
			{
				var parts = {};
				parts.masters_seal_craft_item = 1;
				parts.ionized_salt_craft_item = 1;
				parts.curds_and_whey_craft_item = 20;
				UOP_sh_d_Furoma_rumble_cheese = craftnum * 3 + Number(UOP_sh_d_Furoma_rumble_cheese);
				shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
			}
			if (Number(UOP_sh_d_Furoma_rumble_cheese) > 0)
			{
				if (data.user.environment_id != 23) shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("pinnacle_chamber"),null);
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','rumble_cheese'),autoPlay);
				
				setTimeout(shFunctionSuccessHandler,0);
				return;
			}

			//craft curd then poke and restart
			var craftitem0num = Number(UOP_sh_d_Furoma_onyx_stone);
			var craftitem1num = Number(UOP_sh_d_Furoma_ionized_salt);
			var craftitem2num = Number(UOP_sh_d_Furoma_curds_and_whey);
			var craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num);
			if (craftnum > 0)
			{
				var parts = {};
				parts.onyx_stone_craft_item = 1;
				parts.ionized_salt_craft_item = 1;
				parts.curds_and_whey_craft_item = 1;
				UOP_sh_d_Furoma_unstable_curd = craftnum + Number(UOP_sh_d_Furoma_unstable_curd);
				shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
			}
			var numcurd = Number(UOP_sh_d_Furoma_unstable_curd);
			if (numcurd > 0)
			{
				shLoadOnce(C_shdefaultAction.CONVERTIBLE,shUseConvertible('unstable_curd_convertible',numcurd),null);
				setTimeout(shActionSuccessHandler,0);
				return;
			}

			//arm onyx
			if (Number(UOP_sh_d_Furoma_onyx_cheese) > 0)
			{
				if (data.user.environment_id != 23) shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("pinnacle_chamber"),null);
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','onyx_gorgonzola_cheese'),autoPlay);
				
				setTimeout(shFunctionSuccessHandler,0);
				return;
			}
			
			//arm maki
			if (Number(UOP_sh_d_Furoma_maki_cheese) > 0)
			{
				if (data.user.environment_id != 8) shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("dojo"),null);
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','maki_cheese'),autoPlay);
				
				setTimeout(shFunctionSuccessHandler,0);
				return;
			}

			//craft then arm maki
			craftitem0num = Math.floor(Number(UOP_sh_d_Furoma_magic_essence) / 3);
			craftitem1num = Number(UOP_sh_d_Furoma_nori);
			craftitem2num = Math.floor(Number(UOP_sh_d_Furoma_curds_and_whey) / 3);
			craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num);
			if (craftnum > 0)
			{
				var parts = {};
				parts.magic_essence_craft_item = 3;
				parts.nori_craft_item = 1;
				parts.curds_and_whey_craft_item = 3;
				UOP_sh_d_Furoma_maki_cheese = craftnum * 3 + Number(UOP_sh_d_Furoma_maki_cheese);
				shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
				setTimeout(shActionSuccessHandler,0);
				return;
			}

			//arm brie
			if (Number(UOP_sh_d_Furoma_brie_cheese) > 0)
			{
				if (data.user.environment_id != 8) shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("dojo"),null);
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','brie_cheese'),autoPlay);
			}
			else shLoadOnce(C_shdefaultAction.TRAVEL,shTravel('training_grounds'),null);
			//travel to training ground so the script won't run anymore
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultTrapcheck(){
	if (sh_mode == BEFORETRAPCHECK)
	{
		var tcweapon = sh_scripts[sh_sid].vars.customTCWeapon.val;
		var tcbase = sh_scripts[sh_sid].vars.customTCBase.val;
		var tctrinket = sh_scripts[sh_sid].vars.customTCTrinket.val;
		var tcbait = sh_scripts[sh_sid].vars.customTCBait.val;
		if ((tcweapon != '') || (tcbase != '') || (tctrinket != '') || (tcbait != ''))
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(tcweapon,tcbase,tctrinket,tcbait),function() {localStorage.UOP_sh_d_Trapcheck_state = "Trapcheck";});
	}
	else
	{
		var state = localStorage.UOP_sh_d_Trapcheck_state;
		if (state == null) state = localStorage.UOP_sh_d_Trapcheck_state = "Normal";
		else if (state == "Trapcheck")
		{
			var weapon = sh_scripts[sh_sid].vars.customNormalWeapon.val;
			var base = sh_scripts[sh_sid].vars.customNormalBase.val;
			var trinket = sh_scripts[sh_sid].vars.customNormalTrinket.val;
			var bait = sh_scripts[sh_sid].vars.customNormalBait.val;
			if ((weapon != '') || (base != '') || (trinket != '') || (bait != ''))
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap(weapon,base,trinket,bait),function() {autoPlay();localStorage.UOP_sh_d_Trapcheck_state = "Normal";});
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultEventEggCycle() {
	if (data.user.quests.QuestSpringHunt2014 != null) {
		if ((data.user.quests.QuestSpringHunt2014.charge_quantity <= sh_scripts[sh_sid].vars.customMinCharged.val)&&(data.user.trinket_item_id != 1164))
		{
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','egg_charge_trinket',''),null);
		}
		if ((data.user.quests.QuestSpringHunt2014.charge_quantity >= sh_scripts[sh_sid].vars.customMaxCharged.val)&&(data.user.trinket_item_id != 851))
		{
			shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','eggstra_trinket',''),null);
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultLivingGardenArmCharmWithCheck(trinket) {
	if ((trinket == '') || (trinket == 'disarmTrinket')) return;
	var items = [trinket];
	shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
	if (data.items[0].quantity == 0)
	{
		trinket = 'disarmTrinket';
		sh_scripts[sh_sid].vars.customNormalCharm.val = 'disarmTrinket';
	}
	return trinket;
}
function shdefaultLivingGarden(){
	if ((data.user.environment_id == 35) || (data.user.environment_id == 41) || (data.user.environment_id == 42))
	{
		if (data.user.trinket_quantity == 0) data.user.trinket_item_id = 0;
		if (data.user.environment_id == 35) //LG
		{
			var LGObject = data.user.quests.QuestLivingGarden;
			if (LGObject.is_normal == true)
			{
				if ((LGObject.minigame.dewdrops < 20) && (((data.user.trinket_item_id != 1020) && (data.user.trinket_item_id != 1130)) || (data.user.trinket_quantity == 0)) && (LGObject.minigame.timer == 0))
				{
					var items = ["sponge_trinket","double_sponge_trinket"];
					shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
					var doublecharm = sh_scripts[sh_sid].vars.customDoubleCharm.val;
					if ((doublecharm == true) && (data.items[1].quantity > 0) && (LGObject.minigame.dewdrops < 19))
						shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','double_sponge_trinket',''),null);
					else if (data.items[0].quantity > 0)
						shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','sponge_trinket',''),null);
					else
					{
						var numbuy = Math.min(LGObject.essences[0].quantity,20 - LGObject.minigame.dewdrops,Math.floor(data.user.gold / 200));
						if (numbuy > 0)
						{
							shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","sponge_trinket",numbuy),null);
							shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','sponge_trinket',''),null);
						}
					}
				}
				if ((LGObject.minigame.timer == 0) && (LGObject.minigame.dewdrops == 20))
				{
					window.postMessage({name: "UOP_eval", data: "app.views.HeadsUpDisplayView.hud.livingGardenDoAlchemy(true);"},location.origin);
					var trinket = sh_scripts[sh_sid].vars.customNormalCharm.val;
					var base = '';
					trinket = shdefaultLivingGardenArmCharmWithCheck(trinket);
					if (trinket == '') trinket = 'disarmTrinket';
					if ((trinket == 'champion_trinket') && (data.user.base_item_id != 779)) base = 'champions_gold_base';
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('',base,trinket,''),null);
				}
			}
			else //if (LGObject.is_normal == false)
			{
				if (LGObject.minigame.timer == 0)
				{
					if (data.user.bait_item_id == 1010) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','duskshade_camembert_cheese',''),null);
					if (LGObject.minigame.red_drops < 10)
					{
						if (((data.user.trinket_item_id != 1017) && (data.user.trinket_item_id != 1132)) || (data.user.trinket_quantity == 0))
						{
							var items = ["red_sponge_trinket","red_double_sponge_trinket"];
							shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
							var doublecharm = sh_scripts[sh_sid].vars.customDoubleCharm.val;
							if ((doublecharm == true) && (data.items[1].quantity > 0))
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','red_double_sponge_trinket',''),null);
							else if (data.items[0].quantity > 0)
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','red_sponge_trinket',''),null);
							else
							{
								var numbuy = Math.min(LGObject.essences[1].quantity,10 - LGObject.minigame.red_drops,Math.floor(data.user.gold / 400));
								if (numbuy > 0)
								{
									shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","red_sponge_trinket",numbuy),null);
									shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','red_sponge_trinket',''),null);
								}
							}
						}
					}
					else if (LGObject.minigame.yellow_drops < 10)
					{
						if (((data.user.trinket_item_id != 1022) && (data.user.trinket_item_id != 1135)) || (data.user.trinket_quantity == 0))
						{
							var items = ["yellow_sponge_trinket","yellow_double_sponge_trinket"];
							shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
							var doublecharm = sh_scripts[sh_sid].vars.customDoubleCharm.val;
							if ((doublecharm == true) && (data.items[1].quantity > 0))
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','yellow_double_sponge_trinket',''),null);
							else if (data.items[0].quantity > 0)
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','yellow_sponge_trinket',''),null);
							else
							{
								var numbuy = Math.min(LGObject.essences[1].quantity,10 - LGObject.minigame.yellow_drops,Math.floor(data.user.gold / 400));
								if (numbuy > 0)
								{
									shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","yellow_sponge_trinket",numbuy),null);
									shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','yellow_sponge_trinket',''),null);
								}
							}
						}
					}
				}
				if ((LGObject.minigame.timer == 0) && (LGObject.minigame.red_drops == 10) && (LGObject.minigame.yellow_drops == 10))
				{
					window.postMessage({name: "UOP_eval", data: "app.views.HeadsUpDisplayView.hud.livingGardenDoAlchemy(false);"},location.origin);
					var trinket = sh_scripts[sh_sid].vars.customNormalCharm.val;
					var base = '';
					var bait = '';
					trinket = shdefaultLivingGardenArmCharmWithCheck(trinket);
					if (trinket == '') trinket = 'disarmTrinket';
					if ((trinket == 'champion_trinket') && (data.user.base_item_id != 779)) base = 'champions_gold_base';
					if ((trinket == 'shattering_trinket') && (data.user.bait_item_id != 1010)) bait = 'lunaria_camembert_cheese';
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('',base,trinket,bait),null);
				}
			}
		}
		if (data.user.environment_id == 41) //LC
		{
			var LCObject = data.user.quests.QuestLostCity;
			if (LCObject.is_normal == true)
			{
				if (localStorage.UOP_sh_d_LGLC_cursedStatus == null) localStorage.UOP_sh_d_LGLC_cursedStatus = "cursed";
				if (LCObject.minigame.is_cursed == true)
				{
					localStorage.UOP_sh_d_LGLC_cursedStatus = "cursed";
					if (data.user.trinket_item_id != 1018)
					{
						if (LCObject.minigame.curses[0].charm.quantity > 0)
							shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','searcher_trinket',''),null);
						else
						{
							var numbuy = Math.min(LCObject.essences[0].quantity,1,Math.floor(data.user.gold / 350));
							if (numbuy > 0)
							{
								shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","searcher_trinket",numbuy),null);
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','searcher_trinket',''),null);
							}
						}
					}
				}
				else if ((localStorage.UOP_sh_d_LGLC_cursedStatus == "cursed") || (data.user.trinket_item_id == 1018)) // && is_cursed == false
				{
					localStorage.UOP_sh_d_LGLC_cursedStatus = "normal";
					var trinket = sh_scripts[sh_sid].vars.customNormalCharm.val;
					var base = '';
					trinket = shdefaultLivingGardenArmCharmWithCheck(trinket);
					if (trinket == '') trinket = 'disarmTrinket';
					if ((trinket == 'champion_trinket') && (data.user.base_item_id != 779)) base = 'champions_gold_base';
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('',base,trinket,''),null);
				}
			}
			else //if (LCObject.is_normal == false)
			{
				if (localStorage.UOP_sh_d_LGCC_cursedStatus == null) localStorage.UOP_sh_d_LGCC_cursedStatus = "cursed";
				if (LCObject.minigame.is_cursed == true)
				{
					localStorage.UOP_sh_d_LGCC_cursedStatus = "cursed";
					if (LCObject.minigame.curses[0].active == true)
					{
						if (data.user.trinket_item_id != 1011)
						{
							if (LCObject.minigame.curses[0].charm.quantity > 0) 
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','bravery_trinket',''),null);
							else
							{
								var numbuy = Math.min(LCObject.essences[1].quantity,1,Math.floor(data.user.gold / 300));
								if (numbuy > 0)
								{
									shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","bravery_trinket",numbuy),null);
									shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','bravery_trinket',''),null);
								}
							}
						}
					}
					else if (LCObject.minigame.curses[1].active == true)
					{
						if (data.user.trinket_item_id != 1019)
						{
							if (LCObject.minigame.curses[1].charm.quantity > 0)
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','shine_trinket',''),null);
							else
							{
								var numbuy = Math.min(LCObject.essences[1].quantity,1,Math.floor(data.user.gold / 300));
								if (numbuy > 0)
								{
									shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","shine_trinket",1),null);
									shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','shine_trinket',''),null);
								}
							}
						}
					}
					else if (LCObject.minigame.curses[2].active == true)
					{
						if (data.user.trinket_item_id != 1012)
						{
							if (LCObject.minigame.curses[2].charm.quantity > 0)
								shLoad(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','clarity_trinket',''),null);
							else
							{
								var numbuy = Math.min(LCObject.essences[1].quantity,1,Math.floor(data.user.gold / 300));
								if (numbuy > 0)
								{
									shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","clarity_trinket",1),null);
									shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','clarity_trinket',''),null);
								}
							}
						}
					}
				}
				else if ((localStorage.UOP_sh_d_LGCC_cursedStatus == "cursed") || (data.user.trinket_item_id == 1011) || (data.user.trinket_item_id == 1019) || (data.user.trinket_item_id == 1012))// && is_cursed == false
				{
					localStorage.UOP_sh_d_LGCC_cursedStatus = "normal";
					var trinket = sh_scripts[sh_sid].vars.customNormalCharm.val;
					var base = '';
					trinket = shdefaultLivingGardenArmCharmWithCheck(trinket);
					if (trinket == '') trinket = 'disarmTrinket';
					if ((trinket == 'champion_trinket') && (data.user.base_item_id != 779)) base = 'champions_gold_base';
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('',base,trinket,''),null);
				}
			}
		}
		if (data.user.environment_id == 42) //SD
		{
			var SDObject = data.user.quests.QuestSandDunes;
			if (SDObject.is_normal == true)
			{
				if (localStorage.UOP_sh_d_LGSD_stampedeStatus == null) localStorage.UOP_sh_d_LGSD_stampedeStatus = "running";
				if (SDObject.minigame.has_stampede == true)
				{
					localStorage.UOP_sh_d_LGSD_stampedeStatus = "running";
					if (data.user.trinket_item_id != 1016)
					{
						if (SDObject.minigame.grubling_charm_quantity >= 15)
							shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','grubling_chow_trinket',''),null);
						else
						{
							var numbuy = Math.min(SDObject.essences[0].quantity,15 - SDObject.minigame.grubling_charm_quantity,Math.floor(data.user.gold / 350));
							if (numbuy > 0)
							{
								shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","grubling_chow_trinket",15 - SDObject.minigame.grubling_charm_quantity),null);
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','grubling_chow_trinket',''),null);
							}
						}
					}
				}
				if ((SDObject.minigame.has_stampede == false) && ((data.user.trinket_item_id == 1016) || (localStorage.UOP_sh_d_LGSD_stampedeStatus == "running")))
				{
					localStorage.UOP_sh_d_LGSD_stampedeStatus = "ended";
					var trinket = sh_scripts[sh_sid].vars.customNormalCharm.val;
					var base = '';
					trinket = shdefaultLivingGardenArmCharmWithCheck(trinket);
					if (trinket == '') trinket = 'disarmTrinket';
					if ((trinket == 'champion_trinket') && (data.user.base_item_id != 779)) base = 'champions_gold_base';
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('',base,trinket,''),null);
				}
			}
			else //if (SDObject.is_normal == false)
			{
				var saltcharm = sh_scripts[sh_sid].vars.customNumberSaltCharm.val;
				if ((SDObject.minigame.salt_charms_used < saltcharm) && (((data.user.trinket_item_id != 1014) && (data.user.trinket_item_id != 1134)) || (data.user.trinket_quantity == 0)))
				{
					var items = ["grub_salt_trinket","super_salt_trinket"];
					shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
					var saltcharm = sh_scripts[sh_sid].vars.customNumberSaltCharm.val;
					var doublecharm = sh_scripts[sh_sid].vars.customDoubleCharm.val;
					if ((doublecharm == true) && (data.items[1].quantity > 0))
						shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','super_salt_trinket',''),null);
					else if (data.items[0].quantity > 0)
						shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','grub_salt_trinket',''),null);
					else
					{
						var numbuy = Math.min(SDObject.essences[1].quantity,saltcharm - SDObject.minigame.salt_charms_used,Math.floor(data.user.gold / 200));
						if (numbuy > 0)
						{
							shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","grub_salt_trinket",numbuy),null);
							shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','grub_salt_trinket',''),null);
						}
					}
				}
				if ((SDObject.minigame.salt_charms_used >= saltcharm) && (data.user.trinket_item_id != 1015) && (data.user.trinket_item_id != 1074))
				{
					var items;
					var trinket = sh_scripts[sh_sid].vars.customNormalCharm.val;
					if (trinket == "shattering_trinket") trinket = shdefaultLivingGardenArmCharmWithCheck(trinket);
					if (trinket == "shattering_trinket") shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','',trinket,''),null);
					else
					{
						items = ["grub_scent_trinket"];
						shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
						if (data.items[0].quantity > 0)
							shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','grub_scent_trinket',''),null);
						else
						{
							var numbuy = Math.min(SDObject.essences[2].quantity,1,Math.floor(data.user.gold / 500));
							if (numbuy > 0)
							{
								shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","grub_scent_trinket",numbuy),null);
								shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','grub_scent_trinket',''),null);
							}
						}
					}
				}
			}
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shDefaultExpressTrain() {
	if (data.user.quests.QuestTrainStation != undefined)
	{
		if (data.user.environment_id == 44)
		{
			var tourObj = data.user.viewing_atts.tournament;
			var tourData = tourObj.minigame;
			if (tourObj.phase_name == "Supply Depot")
			{
				//change trap
				
				//use crate if it's higher than 10
				if (tourData.supply_crates >= 10) document.getElementsByClassName('phaseButton')[0].click();
				
				//if rush hour -> disarm schedule trap
				if (tourData.supply_hoarder_turns > 0)
				{
					if (data.user.trinket_item_id == 1206) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
				}
				else
				{
					//else arm schedule
					if (tourData.trinkets.book_warmer_trinket == 0)
					{
						var items = ["fools_gold_stat_item"],numbuy;
						shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(items),null);
						numbuy = Math.min(10,data.items[0].quantity);
						shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy","book_warmer_trinket",numbuy),null);
					}
					if (data.user.trinket_item_id != 1206) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','book_warmer_trinket',''),null);
				}
			}
			else if (tourObj.phase_name == "Raider River")
			{
				//change trap
				
				//disarm charm from last stage
				if (data.user.trinket_item_id == 1206) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
			}
			else if (tourObj.phase_name == "Supply Depot")
			{
				//change trap
				
				//powder ?
			}
		}
		else
		{
			//move to train if time is over
			//shLoadOnce(C_shdefaultAction.TRAVEL,shTravel("train_station"),null);
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shdefaultSunkenCity() {
	if (data.user.environment_id == 47)
	{
		if (O_sunkenRevealHUD == null)
		{
			var tmp = document.getElementsByClassName("sidebarTitle");
			if (tmp.length > 0)
			{
				tmp = tmp[0];
				O_sunkenRevealHUD = document.createElement("div");
				O_sunkenRevealHUD.className = "sidebarContent UOP_sunkenRevealHUD";
				tmp.parentNode.parentNode.appendChild(O_sunkenRevealHUD);
				O_sunkenRevealHUDParent = O_sunkenRevealHUD.parentNode;
				tmp.addEventListener("click",toggleSunkenDetailHUD,false);
			}
		}

		var i,currentHUDStr,currentHUDleft,strHUD = '',questObj = data.user.quests.QuestSunkenCity,currentZone,stageCharm = '',stageBait = '',checkedBait = false,zonename,lastzone = localStorage.UOP_sh_d_Sunken_lastzone;
		
		if (questObj.is_diving == true)
		{
			for (i = 0;i < questObj.zones.length;++i)
			{
				currentHUDStr = "";
				currentHUDleft = "";
				if (questObj.zones[i].num == questObj.active_zone)
				{
					currentZone = questObj.zones[i];
					currentHUDStr = " UOP_currentSunken";
					currentHUDleft = " - " + Math.floor((80 - questObj.zones[i].left) * 250 / 150) + "m";
				}
				strHUD += "<div class='UOP_sunkenRevealHUDElement" + currentHUDStr + " UOP_" + questObj.zones[i].category + "'>" + Math.floor(questObj.zones[i].width * 250 / 150) + " - " + questObj.zones[i].type.replace(/_/g," ") + currentHUDleft + "</div>";
			}
			O_sunkenRevealHUD.innerHTML = strHUD;
			
			zonename = currentZone.category;
			if (sh_scripts[sh_sid].vars.customTreasureRush.val == true)
				if ((zonename != "treasure") && (zonename != "oxygen_stream_low") && (zonename != "oxygen_stream_high"))
					zonename = "treasure_rush";
			
			switch (zonename)
			{
				case "treasure_rush":stageCharm = "water_jet_trinket";break;
				case "treasure":stageCharm = sh_scripts[sh_sid].vars.customTreasureCharm.val;break; //ok
				case "oxygen_stream_low":
				case "oxygen_stream_high":stageCharm = sh_scripts[sh_sid].vars.customOxygenCharm.val;break; //unknown ?
				case "default":stageCharm = sh_scripts[sh_sid].vars.customDefaultCharm.val;break; //ok
				case "barnacle":stageCharm = sh_scripts[sh_sid].vars.customBarnacleCharm.val;break; //ok
				case "mouse_scale":stageCharm = sh_scripts[sh_sid].vars.customScaleCharm.val;break; //ok
				case "damaged_coral":stageCharm = sh_scripts[sh_sid].vars.customCoralCharm.val;break; //ok ?
				case "danger":stageCharm = sh_scripts[sh_sid].vars.customDangerCharm.val;break; //ok
				default: stageCharm = sh_scripts[sh_sid].vars.customOxygenCharm.val;break; //undetected oxygen, next update will be global
			}
			
			if (sh_scripts[sh_sid].vars.customSmartCheese.val == true)
			{
				switch (zonename)
				{
					case "treasure":
					case "oxygen_stream_low":
					case "oxygen_stream_high":
						stageBait = "super_brie_cheese";
						break;
					default: stageBait = "gouda_cheese";
				}
			}
		}
		else
		{
			zonename = "sunkencity";

			//arm Charm for Sunken City
			stageCharm = sh_scripts[sh_sid].vars.customSunkenCharm.val;
			
			//change bait to FF
			var numcheese = 0,usingSB = false,targetFF;
			targetFF = sh_scripts[sh_sid].vars.customFishyFromage.val;
			if (targetFF < 0) {targetFF = Math.abs(targetFF);usingSB = true;}
			if ((lastzone != zonename) && (targetFF > 0))
			{
				var craftitem0num, craftitem1num,craftitem2num,craftitem3num,craftnum,targetnum,divnum;
				if (usingSB) divnum = 3; else divnum = 2;
				
				numcheese = questObj.items.fishy_fromage_cheese;
				if (numcheese < targetFF) //craft FF first
				{
					craftitem0num = Math.floor(questObj.items.barnacle_crafting_item / 3);
					craftitem1num = Math.floor(questObj.items.mouse_scale_crafting_item / 3);
					craftitem2num = Math.floor(questObj.items.damaged_coral_crafting_item / 3);
					craftitem3num = Math.floor(questObj.items.brined_curd_crafting_item / 4);
					targetnum = Math.floor((targetFF - numcheese) / divnum);
					craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num,craftitem3num,targetnum);
					if (usingSB) craftnum = Math.min(craftnum,questObj.items.magic_essence_craft_item);
					
					if (craftnum > 0)
					{
						var parts = {};
						parts.barnacle_crafting_item = 3;
						parts.mouse_scale_crafting_item = 3;
						parts.damaged_coral_crafting_item = 3;
						parts.brined_curd_crafting_item = 4;
						if (usingSB) parts.magic_essence_craft_item = 1;
						shLoadOnce(C_shdefaultAction.CRAFT,shCraft(parts,craftnum),null);
						
						questObj = data.user.quests.QuestSunkenCity; //update data
					}
				}
				
				numcheese = questObj.items.fishy_fromage_cheese;
				if (numcheese < targetFF) //buy FF
				{
					craftitem0num = Math.floor(questObj.items.barnacle_crafting_item / 3);
					craftitem1num = Math.floor(questObj.items.mouse_scale_crafting_item / 3);
					craftitem2num = Math.floor(questObj.items.damaged_coral_crafting_item / 3);
					craftitem3num = Math.floor(data.user.gold / 2000);
					targetnum = Math.floor((targetFF - numcheese) / divnum);
					craftnum = Math.min(craftitem0num,craftitem1num,craftitem2num,craftitem3num,targetnum);
					if (usingSB) craftnum = Math.min(craftnum,questObj.items.magic_essence_craft_item);
					
					if (craftnum > 0)
					{
						var buyItem;
						if (usingSB) buyItem = "fishy_fromage_three_pack_convertible"; else buyItem = "fishy_fromage_two_pack_convertible";
						shLoadOnce(C_shdefaultAction.PURCHASE,shPurchase("buy",buyItem,craftnum),null);
						
						questObj = data.user.quests.QuestSunkenCity; //update data
					}
				}
				
				numcheese = questObj.items.fishy_fromage_cheese;
				if (numcheese > 0)
				{
					stageBait = "fishy_fromage_cheese";
					checkedBait = true;
				}
			}
			
			//in case of out of bait, change to normal bait
			if ((data.user.bait_quantity < 3) && (questObj.bait_armed == true))
			{
				shLoadOnce(C_shdefaultAction.GETITEM,shGetItem(["brie_cheese","gouda_cheese"]),null);
				if (data.items[0].quantity > 0) stageBait = "brie_cheese";
				else if (data.items[1].quantity > 0) stageBait = "gouda_cheese";

				numcheese = data.items[0].quantity + data.items[1].quantity;
				if (numcheese == 0)
				{
					stageBait = '';
					shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','','disarmBait'),null);
					//no need to throw, disarm will stop
					//throw new Error("Out of Cheese !!!");
				}
				else checkedBait = true;
			}
		}
		
		if (stageCharm == '') stageCharm = sh_scripts[sh_sid].vars.customGlobalCharm.val;
		
		if (lastzone != zonename)
		{
			var stageBaitID = 0, stageCharmID = 0,i;
			
			localStorage.UOP_sh_d_Sunken_lastzone = zonename;
			if ((stageCharm == 'disarmTrinket') && (data.user.trinket_item_id != 0))
				shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','disarmTrinket',''),null);
			else if (stageCharm != '')
			{
				for (i = 0;i < cacheTrapComponent.length;++i) if (cacheTrapComponent[i].type == stageCharm) {stageCharmID = cacheTrapComponent[i].item_id;break;}
				if (data.user.trinket_item_id != stageCharmID)
				{
					shLoadOnce(C_shdefaultAction.GETITEM,shGetItem([stageCharm]),null);
					if (data.items[0].quantity > 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','',stageCharm,''),null);
				}
			}
			
			for (i = 0;i < cacheTrapComponent.length;++i) if (cacheTrapComponent[i].type == stageBait) {stageBaitID = cacheTrapComponent[i].item_id;break;}
			if ((stageBait != '') && (data.user.trinket_item_id != stageBaitID))
			{
				if (checkedBait) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','',stageBait),null);
				else
				{
					shLoadOnce(C_shdefaultAction.GETITEM,shGetItem([stageBait]),null);
					if (data.items[0].quantity > 0) shLoadOnce(C_shdefaultAction.CHANGETRAP,shChangeTrap('','','',stageBait),null);
				}
			}
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}
function shDefaultBurroughsRift() {
	if (data.user.quests.QuestRiftBurroughs != undefined)
	{
		if (data.user.environment_id == 48)
		{
			var questObj = data.user.quests.QuestRiftBurroughs;
			if ((questObj.mist_released <= sh_scripts[sh_sid].vars.customMinCharged.val) && (questObj.is_misting != true) && (questObj.items.mist_canister_stat_item >= (sh_scripts[sh_sid].vars.customMaxCharged.val - questObj.mist_released)))
			//if mist_relased < min AND is not misting AND number of mist can reach target max mist
			{
				window.postMessage({name: "UOP_eval", data: "app.views.HeadsUpDisplayView.hud.riftBurroughsToggleMist();"},location.origin);
				questObj.is_misting = !questObj.is_misting;
			}
			if ((questObj.mist_released >= sh_scripts[sh_sid].vars.customMaxCharged.val) && (questObj.is_misting == true))
			{
				window.postMessage({name: "UOP_eval", data: "app.views.HeadsUpDisplayView.hud.riftBurroughsToggleMist();"},location.origin);
				questObj.is_misting = !questObj.is_misting;
			}
		}
	}
	setTimeout(shFunctionSuccessHandler,0);
}