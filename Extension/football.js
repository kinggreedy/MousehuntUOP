// ==UserScript==
// @name        MouseHunt Football Challenge
// @namespace   huynvt.mh
// @include     https://www.mousehuntgame.com/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var mouseLibObj = {
	'Breakdancer Mouse': 'Roll the ball underneath',
	'Bruticle Mouse':'Sidestep nimbly',
	'Buckethead Mouse':'Tiptoe quietly around',
	'Cowbell Mouse': 'More cowbell',
	'Falling Carpet Mouse': 'Wait, then dodge just before impact',
	'Field Mouse': 'Turn the defender by dribbling to the right',
	'Flutterby Mouse':'Pass low and hard to a teammate',
	'Flying Mouse':'Dribble underneath',
	'Football Superstar': 'Attempt to dribble past',
	'Ghost Mouse':'Hold hands with a teammate',
    'Guqin Player Mouse': 'Sharpen your focus',
    'Hot Head Mouse':'Douse with cold water',
	'Itty-Bitty Burroughs Mouse':'Chip the ball overhead',
	'Longtail Mouse':'Keep your head down and dribble around',
	'Master of the Cheese Belt Mouse':'Pass to a teammate',
	'Mouse of Winter Past':'Hold hands with a teammate',
    'Moussile Mouse':'Defuse the situation',
	'Mystic Bishop Mouse':'Dribble in a squiggly line',
    'Mystic Rook Mouse': 'Limbo under the line of fire',
	'Nugget Mouse':'Give tiny football jersey',
	'Pugilist Mouse':'Sprint away, down the right side',
	'Scout Mouse':'Kick up a cloud of dust',
	'Speedy Mouse': 'Fake left, go right',
	'Snooty Mouse': 'Invite to a half-time cup of tea',
    'Spud Mouse': 'Header the ball over the defender',
    'Tiny Mouse': 'Gently shake the defender off the ball',
	'Upper Class Lady Mouse':'Ask politely if you may pass',
	'Vanguard Mouse':'Kick up a cloud of dust',
};

if (window.location.href.indexOf('football.php') > -1)
{

var text = document.createElement("input");
text.type = "button";
text.value = "Blow me";
text.addEventListener ("click", function() {mainScript();}, false);
var child = document.getElementById('tabbarContent_page');
child.parentNode.insertBefore(text, child);

}
function mainScript()
{

	var loading = $('.loadingBar');
	if (loading.is(":visible"))
	{
		setTimeout(function () { mainScript();  },5000);
		return;
	}

	var play = $('.splashContainer .entryBlock');
	if (play != undefined)
	{
		if  (play.is(":visible"))
			play.click();
		else 
		{
			var gold =  $('.rewardBlock .actionButton.small'); 
			if (gold.is(":visible") && gold.html().indexOf('Shoot'))
			{
				gold.click();
				setTimeout(function () { mainScript(); },5000);
				return;
			}
			 
			var target =  $('.target');  
			if (target.length > 0 && target.get(4))
			{
				target.get(4).click();
				setTimeout(function () { mainScript(); },5000);
				return;
			}
		
			var boss = $('.rewardBlock.rival'); 
			if (boss.is(":visible"))
			{
				boss.click();
			
			}
			else
			{
				var leftPanel = $('.leftPane');
				if (leftPanel.is(":visible"))
				{
				var mouseName = leftPanel.find('.title').html();
				
				var text = mouseLibObj[mouseName];
				var anw_button = $('.actionText:contains("'+text+'")');
				anw_button.click();
				
				}
			}			
		}
	}

	setTimeout(function () { mainScript(); },5000);
}

