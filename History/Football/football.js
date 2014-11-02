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
    'Guqin Player Mouse': 'Sharpen your focus',
    'Cowbell Mouse': 'More cowbell',
    'Football Superstar': 'Attempt to dribble past',
    'Mystic Rook Mouse': 'Limbo under the line of fire',
    'Spud Mouse': 'Header the ball over the defender',
    'Field Mouse': 'Turn the defender by dribbling to the right',
    'Speedy Mouse': 'Fake left, go right',
    'Snooty Mouse': 'Invite to a half-time cup of tea',
    'Falling Carpet Mouse': 'Wait, then dodge just before impact',
    'Tiny Mouse': 'Gently shake the defender off the ball',
	'Breakdancer Mouse': 'Roll the ball underneath',
	'Nugget Mouse':'Give tiny football jersey',
	'Moussile Mouse':'Defuse the situation',
	'Bruticle Mouse':'Sidestep nimbly',
	'Buckethead Mouse':'Tiptoe quietly around',
	'Flutterby Mouse':'Pass low and hard to a teammate',
	'Flying Mouse':'Dribble underneath',
	'Ghost Mouse':'Hold hands with a teammate',
	'Hot Head Mouse':'Douse with cold water',
	'Longtail Mouse':'Keep your head down and dribble around',
	'Master of the Cheese Belt Mouse':'Pass to a teammate',
	'Mystic Bishop Mouse':'Dribble in a squiggly line',
	'Pugilist Mouse':'Sprint away, down the right side',
	'Scout Mouse':'Kick up a cloud of dust',
	'Upper Class Lady Mouse':'Ask politely if you may pass',
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

