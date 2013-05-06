// The public prefix for this script is UOP_ . All of the outside variable and function will have this prefix.
window.addEventListener('DOMContentLoaded',initialization,false);
/**************VARIABLES*****************/
//==========Constants==========
//Setting Constants
var C_version = "3.0";
var C_versionCompatibleCode = "4";
var C_disableExperimental = 0;
var C_SecondInterval = 1;
var C_MinuteInterval = 60;
var C_autoInterval = 1;
var C_solveStage = 2; //maximum stages of process, offline = 2, server = 4
var C_cpcontent,C_cpprefix,C_cpsuffix,C_cpstyle,C_cpmessage,C_tabNum,C_groupNum,C_autopanel,C_scoreboardContent;
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
var C_powertype = {BASE: 'base', PHYSICAL: 'phscl',TACTICAL: 'tctcl', HYDRO: 'hdr', SHADOW: 'shdw', ARCANE: 'arcn',FORGOTTEN: 'frgttn',DRACONIC: 'drcnc',PARENTAL: 'prntl'};
var TRAPSTR = 0,TRAPPOWER = 1, TRAPLUCK = 2, TRAPATTRACTION = 3;
var C_trapprioritytype = {TRAPAUTO: 'str', TRAPPOWER: 'power', TRAPLUCK: 'luck', TRAPATTRACTION: 'attraction'};
//CallbackFunctions

//==========Variables==========
//Setting Variables
var S_skin,S_simple,S_auto,S_schedule,S_solve,S_server;
var S_ads,S_emulateMode,S_aggressive,S_delaymin,S_delaymax,S_alarm,S_alarmSrc,S_alarmNoti,S_alarmStop,S_alarmStopTime,S_trapCheck,S_trapCheckTime,S_trapCheckPriority,S_numScript;
var S_cacheKRstr,S_serverUrl;
var S_settingGroupsLength = [415,415];
var S_channelScoreboard;

//Object Variables
var O_titleBar,O_hornHeader,O_hornButton,O_hgRow,O_baitNum,O_titlePercentage,O_oldHuntTimer;
var O_huntTimer,O_LGSTimer,O_locationTimer,O_simpleHud,O_imageBox,O_imagePhoto;
var O_mode,O_environment;
var O_settingGroup,O_travelTab,O_travelContent,O_shopContent,O_potContent,O_craftContent,O_supplyContent,O_giftContent;
var O_playing, O_autoPanel, O_autoPauseCounter, O_autoSounding, O_autoCounter, O_autoMainCounter, O_autoDelayCounter;
var O_funArea, O_scoreboardDiv, O_scoreboardFetch,O_scoreboard, O_scoreboardUpdateSecond, O_scoreboardinput, O_scoredboardControl, O_scoreboardChannel;

//Auto Variables
var A_soundingCounter, A_soundedCounter, A_hornRetryCounter = 0, A_autoPaused, A_delayTime, A_delayTimestamp, A_solveStage, A_puzzleTimeout, A_puzzleCalled = 0, A_audioDiv, A_audioWin;

//Variables
var data,itemdata,appgameinfo;
var template = new Object;
var registerSoundHornSounding = new Array;
var registerSoundHornSounded = new Array;
var registerSoundHornWaiting = new Array;
var eval_callback;
var nextTurnTimestamp,atCamp = false,nextUpdateScoreboardTimeLeft;
var cssArr, jsArr, cssCustomArr, cssjsSetArr;
var refreshingByError = 0,screenshotSafe = 0;
var puzzleSubmitErrorHash,puzzleSubmitErrorStage = 0,puzzleSubmitErrorStr,puzzleContainer;
var facebookWindow,canvasWindow = null,access_token_loaded = 0,inCanvas = 0,convertibleItem = null;
var currentScoreboardChannel,initScoreboard = 0,scoreboardController = new Array,scoreboardMyTeamID, activeGetSB = 0, scoreboardChannel = new Object;
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
			setTimeout(function () {location.reload();},10000);
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
	var list = [0x51D7E812];
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
	
	if (S_simple == 0) updateMinuteTimer();
	if (S_ads == 2) startUpdateFunArea();
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
		window.localStorage.UOP_ads = 2;
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
		window.localStorage.UOP_alarmStopTime = 20;
		window.localStorage.UOP_trapCheck = 1;
		window.localStorage.UOP_trapCheckTime = -1;
		window.localStorage.UOP_trapCheckPriority = 1;
		window.localStorage.UOP_emulateMode = 0;
		window.localStorage.UOP_access_token = "";
		
		window.localStorage.UOP_channelScoreboard = 1;
		window.localStorage.UOP_tourID = 0;
		window.localStorage.UOP_tourStatus = "pending";
		
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

	S_channelScoreboard = Number(window.localStorage.UOP_channelScoreboard);
	
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
	
	if ((newscript == 0) && (mode == PAUSE)) shChangeScriptState(PAUSE,sid);
	else
	{
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
	window.postMessage({name: "UOP_userHash", data: data.user.unique_hash},location.origin);
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
					newbutton[j].addEventListener('click',updateSpecial,false);
				}
				
				newbutton = holder.getElementsByTagName('input')[0].cloneNode(true);
				newbutton.className = "button";
				newbutton.type = "submit";
				newbutton.value = "Custom";
				newbutton.removeAttribute("data-item-quantity");
				newbutton.setAttribute("onclick","UOP_useCustomConvertible(this);");
				newbutton.addEventListener('click',updateSpecial,false);
				
				newinput = document.createElement('input');
				newinput.type = "text";
				newinput.className = "num";
				
				holder.appendChild(document.createElement('br'));
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
	var itemtype = obj.getAttribute('data-item-type');
	var i;

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
			O_funArea = document.createElement("div");
			O_funArea.id = "UOP_funArea";
			rightCol.appendChild(O_funArea);
			addThings();
		}
	}
}
function addThings() {
	addScoreboard();
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
	button.addEventListener('click',function () {O_scoredboardControl.style.height = "0px";localStorage.UOP_channelScoreboard = S_channelScoreboard = 0;switchChannel();},false);
	scoreboardController.push(button);
	scoreboardControl.appendChild(button);
	button = document.createElement("button");
	button.className = "UOP_buttonSB";
	button.textContent = "Team";
	button.addEventListener('click',function () {O_scoredboardControl.style.height = "0px";localStorage.UOP_channelScoreboard = S_channelScoreboard = 1;switchChannel();},false);
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
}
function searchTournament() {
	localStorage.UOP_channelScoreboard = S_channelScoreboard = 2;
	localStorage.UOP_currentScoreboardChannel = currentScoreboardChannel = O_scoreboardinput.value;
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
	getChannelList();
	O_scoreboardChannel.innerHTML = "";
	var button,counter = 0;
	for (var tour in scoreboardChannel)
	{
		if (scoreboardChannel.hasOwnProperty(tour))
		{
			++counter;
			button = document.createElement("button");
			button.className = "UOP_buttonSB channel";
			button.className += (scoreboardChannel[tour].status == "active") ? " active" : " completed";
			button.setAttribute('tourid',tour);
			button.textContent = tour;
			button.disabled = (scoreboardChannel[tour].status == "pending") ? true : false;
			button.addEventListener('click',getChannel,false);
			O_scoreboardChannel.appendChild(button);
		}
	}
	O_scoredboardControl.style.height = (28 + Math.ceil(counter / 4) * 20) + "px";
}
function getChannel(e) {
	if (activeGetSB == 1) return;
	activeGetSB = 1;
	window.localStorage.UOP_currentScoreboardChannel = e.target.getAttribute('tourid');
	window.localStorage.UOP_channelScoreboard = S_channelScoreboard = 2;
	switchChannel();
	activeGetSB = 0;
}
function getChannelList() {
	if (S_server == 1) return;
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
				}
				catch (e) {}
			}
			else
			{
				getChannelList();
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
	var param = "team=" + scoreboardMyTeamID + "&tour=" + data.user.viewing_atts.tournament.tournament_id + "&status=" + data.user.viewing_atts.tournament.status + "&timeleft=" + data.user.viewing_atts.tournament.tournament_id;
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
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
			if (data.user.viewing_atts.tournament != null)// && (data.user.viewing_atts.tournament.status == "active")) 
			{
				currentScoreboardChannel = data.user.viewing_atts.tournament.tournament_id;
			}
			else currentScoreboardChannel = 0;
			break;
		case 2:currentScoreboardChannel = Number(window.localStorage.UOP_currentScoreboardChannel);break;
	}
	updateScoreboard();
}
function updateChannel() {
	getChannelList();
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
	for (var i = 0;i < O_scoreboard.length;++i)
	{
		O_scoreboard[i].setAttribute("teamtype","transit");
	}
	if (currentScoreboardChannel == 0) 
	{
		O_scoreboardDiv.className = "off";
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
					location.reload(); //KR
					return;
				}
				else if (HTMLstr.indexOf('<span id="info">Complete</span>') != -1)
				{
					status = 1;
				}
				HTMLstr = HTMLstr.substring(HTMLstr.indexOf('<div class="FD-content clear-block dialogBox-TournamentWhite"><div class="clear-block">'),HTMLstr.indexOf('Full Scoreboard</a></div>') + 25);
				O_scoreboardFetch.innerHTML = HTMLstr;
				var rawSBTeamName = O_scoreboardFetch.getElementsByClassName('tournamentTeamName');
				var rawSBTeamScore = O_scoreboardFetch.getElementsByClassName('tournamentScore');
				var i,j;
				for (i = 0;i < rawSBTeamName.length;++i)
				{
					HTMLstr = rawSBTeamName[i].firstElementChild.href;
					HTMLstr = HTMLstr.slice(HTMLstr.indexOf("team_id=") + 8);
					HTMLstr = Number(HTMLstr);
					if (HTMLstr == scoreboardMyTeamID) O_scoreboard[i].setAttribute("teamtype","my"); else
					{
						O_scoreboard[i].setAttribute("teamtype","none");
						if (scoreboardChannel[currentScoreboardChannel] != null)
							for (j = 0;j < scoreboardChannel[currentScoreboardChannel].team.length;++j)
								if (scoreboardChannel[currentScoreboardChannel].team[j] == HTMLstr)
								{
									O_scoreboard[i].setAttribute("teamtype","ally");
									break;
								}
					}
					
					O_scoreboard[i].setAttribute('teamid',HTMLstr);
					O_scoreboard[i].firstElementChild.firstElementChild.textContent = rawSBTeamName[i].firstElementChild.textContent;
					O_scoreboard[i].lastElementChild.textContent = rawSBTeamScore[i].textContent;
				}
				for (;i < O_scoreboard.length;++i)
				{
					O_scoreboard[i].setAttribute('teamid','-');
					O_scoreboard[i].setAttribute("teamtype","none");
					O_scoreboard[i].firstElementChild.firstElementChild.textContent = "----------";
					O_scoreboard[i].lastElementChild.textContent = "-----";
				}
				setTimeout(function () {if (currentScoreboardChannel == 0) return;O_scoreboardDiv.className = "";},800);
				switch (status)
				{
					case 0:nextUpdateScoreboardTimeLeft = 60;setTimeout(secondScoreboardUpdate,0);break;
					case 1:O_scoreboardUpdateSecond.textContent = "Ended";currentScoreboardChannel = 0;break;
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
		if (refreshingByError == 1) return;
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
	alert("locked feature");
	return;
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
	KR_initKR();
	KRSolverOCRCore();
}
function submitPuzzle(str) {
	var url = C_canvasMode[inCanvas] + "/managers/ajax/users/solvePuzzle.php";
	var param = "puzzle_answer=" + str + "&uh=" + data.user.unique_hash;
	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
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
var KR_sampleimgData;
var KR_sampleimgData2;
var KR_nsample = 62;
var KR_i;
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
function KR_initKR() {
	KR_canvas = document.createElement('canvas');
	KR_canvas.width = 200;
	KR_canvas.height = 200;
	KR_context = KR_canvas.getContext('2d');
	KR_canvas2 = document.createElement('canvas');
	KR_canvas2.width = 200;
	KR_canvas2.height = 200;
	KR_context2 = KR_canvas2.getContext('2d');
	KR_i = 0;
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