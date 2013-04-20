// ==UserScript==
// @name           MH
// @version        1.14
// @namespace      Ewez
// @include        https://www.mousehuntgame.com/turn.php
// @include        http://www.mousehuntgame.com/turn.php
// @include        https://www.mousehuntgame.com/
// @include        http://www.mousehuntgame.com/
// @include        https://www.mousehuntgame.com/index.php*
// @include        http://www.mousehuntgame.com/index.php*
// @include        https://www.mousehuntgame.com/?switch_to=*
// @include        http://www.mousehuntgame.com/?switch_to=*
// @include        https://www.mousehuntgame.com/login.php
// @include        http://www.mousehuntgame.com/login.php
// ==/UserScript==
if (!document.body.innerHTML.match("Login to MouseHunt")){
	if (document.body.innerHTML.match("Leave mobile site")){
		if (!document.getElementById('mobilePuzzle')){
			document.body.innerHTML = document.body.innerHTML.replace(/https/g, 'http');
			var soundmode = 0; // x900
			//load preference from Storage
			var PrefTemp = window.localStorage.getItem("SoundMode");
			if (PrefTemp == undefined || PrefTemp == null){
				window.localStorage.setItem("SoundMode", soundmode);
			}else{
				soundmode = parseInt(PrefTemp);
			}
			//anchor
			var prefElement = document.getElementById('mobileJournal');
			//Clear Button
			var clearbutton = document.createElement("input");
			clearbutton.type = "button";
			clearbutton.value = "Clear";
			clearbutton.onclick = function(){window.localStorage.clear(); window.location='http://www.mousehuntgame.com';}
			prefElement.appendChild(clearbutton);
			if (soundmode == -1){//script disabled
				var LinksDiv = document.createElement('div');
				LinksDiv.setAttribute('id','LinksDiv');
				LinksDiv.setAttribute('style','display:block; width:375px; margin:10px auto 10px auto; text-align:left; font-size:0.9em');
				LinksDiv.innerHTML += '<input type="button" id="PreferenceToggleInput" value="Enable" onclick="	\
					window.localStorage.setItem(\'SoundMode\', 0);	\
					window.location.href=\'http://www.mousehuntgame.com\';"/><br>';
				prefElement.parentNode.appendChild(LinksDiv);
				prefElement = undefined;
			}else{
				var delaybase = 5;
				var delayrange = 5;
				var alerttext = 'minialert';
				 PrefTemp = window.localStorage.getItem("DelayBase");
				if (PrefTemp == undefined || PrefTemp == null){
					window.localStorage.setItem("DelayBase", delaybase);
				}else{
					delaybase = parseInt(PrefTemp);
				}
				PrefTemp = window.localStorage.getItem("DelayRange");
				if (PrefTemp == undefined || PrefTemp == null){
					window.localStorage.setItem("DelayRange", delayrange);
				}else{
					delayrange = parseInt(PrefTemp);
				}
				PrefTemp = window.localStorage.getItem("AlertText");
				if (PrefTemp == undefined || PrefTemp == null){
					window.localStorage.setItem("AlertText", alerttext); //''
				}else{
					alerttext = PrefTemp;
				}
				PrefTemp = undefined;
				//date obj
				var d = new Date();
				//----get object from json
				var i;
				var jsonObj = JSON.parse(document.documentElement.innerHTML.match(/user = (.+?)};/)[1] + "}");
				//----add more Info
				//-----Status above Journal-prefElement
				var StatusDiv = document.createElement('div');
					StatusDiv.setAttribute('id','StatusDiv');
					StatusDiv.setAttribute('style','display:block; width:375px; margin:10px auto 10px auto; text-align:left; font-size:0.9em');
					//if in Tournaments
					if(jsonObj.viewing_atts.hasOwnProperty('tournament')){
						//if (jsonObj.viewing_atts.tournament.team_members_online < 4){soundalert();}
						var delayleft = jsonObj.viewing_atts.tournament.seconds_remaining - jsonObj.next_activeturn_seconds;
						var huntsleft = Math.floor(delayleft/900)+1;
						delayleft = delayleft%900;
						StatusDiv.innerHTML += "<a href=\"http://www.mousehuntgame.com/tournament.php?tid=" + jsonObj.viewing_atts.tournament.tournament_id + "\" data-ajax=\"false\" target=\"_blank\"><b>Tournament</b></a>" + " : " + jsonObj.viewing_atts.tournament.status + " - " + jsonObj.viewing_atts.tournament.rank + " | " + jsonObj.viewing_atts.tournament.score + "p - onl:" + jsonObj.viewing_atts.tournament.team_members_online + " - delay: " + delayleft + " - hunts: " + huntsleft + " -> " + Math.floor(delayleft/huntsleft) + "<br>";
						StatusDiv.innerHTML += '<a href=\"http://www.mousehuntgame.com/team.php\" data-ajax=\"false\" target=\"_blank\">Team</a>&emsp;&emsp;&emsp;&emsp;<a href=\"http://www.mousehuntgame.com/team.php?tab=2\" data-ajax=\"false\" target=\"_blank\">Journals</a>&emsp;&emsp;&emsp;&emsp;<a href=\"http://www.mousehuntgame.com/team.php?invite=true\" data-ajax=\"false\" target=\"_blank\">Invite</a><br>'; 
					}
					//Trap, Base, Charm, Cheese
					StatusDiv.innerHTML += "<b><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=1\" data-ajax=\"false\" target=\"_blank\">Base</a> : </b>" + jsonObj.base_name + "<br><b><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1\" data-ajax=\"false\" target=\"_blank\">Trap</a> : </b>" + jsonObj.weapon_name + "<br><b><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=2\" data-ajax=\"false\" target=\"_blank\">Charm</a> : </b>" + jsonObj.trinket_quantity + " " + jsonObj.trinket_name + "<br><b><a href=\"http://www.mousehuntgame.com/inventory.php?tab=0\" data-ajax=\"false\" target=\"_blank\">Cheese</a> : </b>" + jsonObj.bait_quantity + " " + jsonObj.bait_name + "<br>";
					StatusDiv.innerHTML += jsonObj.trap_power_type_name + " - Power : <b style=\"color:red;\">" + jsonObj.trap_power + "</b> - Luck : <b style=\"color:gold;\">" + jsonObj.trap_luck + "</b><br><hr>";
					//Location Specific
					//PC
					if (jsonObj.environment_id == 23){
						StatusDiv.innerHTML += "<b>Gold : </b> " + jsonObj.gold
						// + " - <b>Points : </b> " + jsonObj.points
						+ "<br>";
					}
					//SG
					if (jsonObj.environment_id == 31){
						StatusDiv.innerHTML += "Season : " + jsonObj.viewing_atts.season + " - Amplifier: " + jsonObj.viewing_atts.zzt_amplifier + "<br>";
						var MHA_C_LOCATION_TIMES = {
							name: 'Seasonal Garden',
							id: 'MHA_locationTimerSeasonalGarden',
							base: 1283328000,
							totaltime: 1152000,
							duration: [288000, 288000, 288000, 288000],
							state: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER']
						}
						var locationTimerObject,states,day,hour,min,timetmp;
						var currentTime = Math.floor(d.getTime() / 1000);
						var j;
						timetmp = (currentTime - MHA_C_LOCATION_TIMES.base) % MHA_C_LOCATION_TIMES.totaltime;
						for (j = 0;j < MHA_C_LOCATION_TIMES.duration.length;++j)
						{
							timetmp -= MHA_C_LOCATION_TIMES.duration[j];
							if (timetmp < 0) break;
							else if (timetmp == 0)
							{
								j = (j + 1) % MHA_C_LOCATION_TIMES.duration.length;
								timetmp = -MHA_C_LOCATION_TIMES.duration[j];
								break;
							}
						}
						timetmp = -timetmp;
						hour = Math.floor(timetmp / 3600);
						min = Math.floor((timetmp % 3600) / 60);
						day = Math.floor(hour / 24);
						hour = hour % 24;
						
						StatusDiv.innerHTML += "<span style='font-weight: bold;'>" + MHA_C_LOCATION_TIMES.name + ' : ' +  MHA_C_LOCATION_TIMES.state[j] + "</span>" + " - ";
						if (day !=0) { StatusDiv.innerHTML += day + " d : ";}
						StatusDiv.innerHTML += (hour < 10 ? "0"+hour : hour) + " h : " + (min < 10 ? "0"+min : min) + " m left<br>";
					}
					//ZT
					if (jsonObj.environment_id == 32){
 						var piece = ['None','Pawn1','Pawn2','Pawn3','Pawn4','Pawn5','Pawn6','Pawn7','Pawn8','Kight1','Kight2','Bishop1','Bishop2','Rook1','Rook2','Queen','King']; 
 						StatusDiv.innerHTML += "Amplifier: " + jsonObj.viewing_atts.zzt_amplifier + " - Tech: " + piece[jsonObj.viewing_atts.zzt_tech_progress] + " - Mystic: " + piece[jsonObj.viewing_atts.zzt_mage_progress] + "<br>Uncharged charm after Queen<br>";
					}
					//Iceberg
					if (jsonObj.environment_id == 40){
						StatusDiv.innerHTML += "<b>Phase : </b>" + jsonObj.quests.QuestIceberg.current_phase + " - " + jsonObj.quests.QuestIceberg.user_progress + " ft - " + jsonObj.quests.QuestIceberg.turns_taken + " hunts<br>";
					}
					//FW
					if (jsonObj.environment_id == 33){
						var fwObj = jsonObj.viewing_atts.desert_warpath;
						StatusDiv.innerHTML += "Victories : " + fwObj.victories + " - Friends : " + fwObj.friends_in_area + " - Wave " + fwObj.wave + " :<br>";
						
						for (var wp in fwObj.wave_population)
							StatusDiv.innerHTML += "<p style=\"text-align:right;\">" + fwObj.wave_population[wp].name + " - <b style=\"color:blue;\">" + fwObj.wave_population[wp].population + "</b> [" + fwObj.wave_population[wp].status + "]<br>";
						
						for (var wp in fwObj.common_population)
							StatusDiv.innerHTML += fwObj.common_population[wp].name + " [" + fwObj.common_population[wp].status + "]<br>";
						
						StatusDiv.innerHTML += "Streak - " + fwObj.streak.mouse_type + " - <b style=\"color:green;\">" + fwObj.streak.quantity + "</b><br>";
						
						//if ( jsonObj.viewing_atts.desert_warpath.streak.quantity > 5) soundalert();
						
						StatusDiv.innerHTML += JSON.stringify(jsonObj.viewing_atts.desert_warpath.streak,null,'\t') ;
						
						//if (jsonObj.viewing_atts.desert_warpath.wave == 1) soundalert();
						
					}
					//LG+
					if ((jsonObj.environment_id == 35)||(jsonObj.environment_id == 41)||(jsonObj.environment_id == 42)){
						for (var key in jsonObj.quests){
							if (jsonObj.quests[key].hasOwnProperty('essences')) {
								StatusDiv.innerHTML += '<em style=\"font-size:1.1em;color:limegreen;\" >Petals : ' + jsonObj.quests[key].loot_drops.dewthief_petal_crafting_item.quantity + '-[' + jsonObj.quests[key].loot_drops.dreamfluff_herbs_crafting_item.quantity + '-' + jsonObj.quests[key].loot_drops.duskshade_petal_crafting_item.quantity + ']-' + jsonObj.quests[key].loot_drops.graveblossom_petal_crafting_item.quantity + '-[' + jsonObj.quests[key].loot_drops.plumepearl_herbs_crafting_item.quantity + '-' + jsonObj.quests[key].loot_drops.lunaria_petal_crafting_item.quantity + ']</em><br>';
								i=8;
								while (jsonObj.quests[key].essences[i].quantity==0) i--;
								var sum=0;
								for (var j=0; j<9; j++){// j<=i
									if (j<=i) StatusDiv.innerHTML += '<em style=\"color:dodgerblue;\" >['+String.fromCharCode(j+65) + ':'+jsonObj.quests[key].essences[j].quantity + ']&emsp;</em>';
									if (j<7) sum = sum/3 + jsonObj.quests[key].essences[j].quantity;//Gur
								}
								StatusDiv.innerHTML += '<br>= ' + sum + '&emsp;<em style=\"color:dodgerblue;\" >' +  jsonObj.quests[key].essences[6].name + '<br></em>';//Gur
								StatusDiv.innerHTML += '<em style=\"font-size:0.8em;color:grey;\">' + JSON.stringify(jsonObj.quests[key].minigame ,null,'\t') + '</em><br>';
							} 
							break;
						}
					
						//minigamealert
						if (alerttext == 'minialert'){
							//Living Garden
							if (jsonObj.environment_id == 35){
								var smallObj = jsonObj.quests.QuestLivingGarden;
								if (smallObj.is_normal){
									if (smallObj.minigame.bucket_state == "filling"){
										if (smallObj.minigame.estimate == 35){
											StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"http://www.mousehuntgame.com/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
											soundalert();
										}else{// <35
											if (jsonObj.trinket_item_id != 1020){//sponge id
												StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****20 charms only****<br><br><a href=\"http://www.mousehuntgame.com/shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
												soundalert();
											}
										}
									}
								}else{
									if (smallObj.minigame.vials_state == "filling"){
										if (smallObj.minigame.estimate == 35){
											StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"http://www.mousehuntgame.com/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
											soundalert();
										}else{// <35
											if ((jsonObj.trinket_item_id != 1017) && (jsonObj.trinket_item_id != 1022)){
												StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****10 charms each****<br><br><a href=\"http://www.mousehuntgame.com/shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
												soundalert();
											}
										}
									}
								}
							}
							//Lost City
							if (jsonObj.environment_id == 41){
								var smallObj = jsonObj.quests.QuestLostCity;
								if (smallObj.is_normal){
									if (smallObj.minigame.curses[0].active && !smallObj.minigame.curses[0].charm.equipped){
										StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"http://www.mousehuntgame.com/shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
										soundalert();
									}
								}else{
									if (smallObj.minigame.is_cursed && !((smallObj.minigame.curses[0].active && smallObj.minigame.curses[0].charm.equipped) || (smallObj.minigame.curses[1].active && smallObj.minigame.curses[1].charm.equipped) || (smallObj.minigame.curses[2].active && smallObj.minigame.curses[2].charm.equipped) )){
										StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"http://www.mousehuntgame.com/shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
										soundalert();
									}
								}
							}
							//Sand Dunes
							if (jsonObj.environment_id == 42){
								var smallObj = jsonObj.quests.QuestSandDunes;
								if (smallObj.is_normal){
									if (smallObj.minigame.has_stampede && (jsonObj.trinket_item_id != 1016)){
										StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"http://www.mousehuntgame.com/shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
										soundalert();
									}
								}else{
									var salt = window.localStorage.getItem("KGSalt");
									if (salt == undefined || salt == null){
										window.localStorage.setItem("KGSalt", 20);
										salt = 20;
									}
									StatusDiv.innerHTML += 'min Salt to alert : <input type="number" id="SaltInput" name="Salt" value="' + salt.toString() + '"/>';
									StatusDiv.innerHTML += '&emsp;&emsp;&emsp;&emsp;<input type="button" value="Save" onclick="window.localStorage.setItem(\'KGSalt\', document.getElementById(\'SaltInput\').value);window.location.href=\'http://www.mousehuntgame.com\';"/><br>';
									StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"http://www.mousehuntgame.com/shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"http://www.mousehuntgame.com/inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
									/*if (smallObj.minigame.salt_charms_used >= salt){
										if (jsonObj.trinket_item_id != 1015) soundalert();
									}
									if (smallObj.minigame.salt_charms_used == 0){
										if (jsonObj.trinket_item_id == 1015) soundalert();
									}*/
									if ((smallObj.minigame.salt_charms_used >= salt)&&(jsonObj.trinket_item_id != 1015)) soundalert();
									if ((smallObj.minigame.salt_charms_used == 0)&&(jsonObj.trinket_item_id == 1015)) soundalert();
								}
							}

						}else{
							StatusDiv.innerHTML += '<br> ****alert deactivated**** <br><br>';
						}
					
					}
					
					
					//Sound link
					StatusDiv.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"http://www.mousehuntgame.com/turn.php\" data-ajax=\"false\">Sound the Horn!</a>&emsp;&emsp;&emsp;<a href=\"http://www.mousehuntgame.com/\" data-ajax=\"false\">&emsp;Camp&emsp;</a></div>";
					//append
					prefElement.parentNode.insertBefore(StatusDiv,prefElement);
				//----Links at bottoms
				var LinksDiv = document.createElement('div');
					LinksDiv.setAttribute('id','LinksDiv');
					LinksDiv.setAttribute('style','display:block; width:375px; margin:10px auto 10px auto; text-align:left; font-size:0.9em');
					
					LinksDiv.innerHTML += '<p style=\"font-size:1.2em;padding:0.5em;\" ><a href=\"http://www.mousehuntgame.com/managers/ajax/users/questsprogress.php\" data-ajax=\"false\" target=\"_blank\">Assignment</a>&emsp;&emsp;<a href=\"http://www.mousehuntgame.com/managers/ajax/users/relichunter.php?action=info&uh=' + jsonObj.unique_hash + '&viewas=&hg_is_ajax=1\" data-ajax=\"false\" target=\"_blank\">Map</a>&emsp;&emsp;<a href=\"http://www.mousehuntgame.com/forum/search.php?do=getnew&contenttype=vBForum_Post\" data-ajax=\"false\" target=\"_blank\">Forum</a>&emsp;&emsp;<a href=\"http://www.mousehuntgame.com/travel.php?quick=1\" data-ajax=\"false\" target=\"_blank\">Travel</a></p>';
					
					//option
					LinksDiv.innerHTML += '<hr>Alert (&lt;\/a&gt; worth)(relicHunter_complete)(hunting task) : <input type="text" id="AlertTextInput" name="AlertText" value="' + alerttext + '"/><br>';
					LinksDiv.innerHTML += 'Sound Mode : (' + soundmode.toString() + ') <select name="SoundMode" id="SoundModeInput">	\
<option value="-1">Disable</option>	\
<option value="0">Sound</option>	\
<option value="1">15min</option>	\
<option value="2">30min</option>	\
<option value="3">45min</option>	\
</select><br>';
					LinksDiv.innerHTML += 'delayB : <input type="number" id="DelayBaseInput" name="DelayBase" value="' + delaybase.toString() + '"/> + ' + 900*soundmode + 's + ~<br>';
					LinksDiv.innerHTML += 'delayR : <input type="number" id="DelayRangeInput" name="DelayRange" value="' + delayrange.toString() + '"/><br>';
					//applied preference set after div is appended
					LinksDiv.innerHTML += '&emsp;&emsp;&emsp;&emsp;<input type="button" id="PreferenceSaveInput" value="Save" onclick="	\
						window.localStorage.setItem(\'SoundMode\', document.getElementById(\'SoundModeInput\').value);\
						window.localStorage.setItem(\'DelayBase\', document.getElementById(\'DelayBaseInput\').value); window.localStorage.setItem(\'DelayRange\', document.getElementById(\'DelayRangeInput\').value);	\
						window.localStorage.setItem(\'AlertText\', document.getElementById(\'AlertTextInput\').value);	 \
						window.location.href=\'http://www.mousehuntgame.com\';"/><br><hr>';

					//----alert
					if ((alerttext != '')&& ((jsonObj.environment_id != 40 && document.body.innerHTML.match(alerttext)) || (jsonObj.environment_id == 40 && document.getElementById('journallatestentry').innerHTML.match(alerttext)))) soundalert();

					//----sound
					var delay = delaybase + soundmode*900 + Math.floor(Math.random()*(delayrange));
					var nextActiveTime = jsonObj.next_activeturn_seconds;
					
					if (jsonObj.bait_quantity != 0){//not out of cheese
						if (nextActiveTime == 0){
							document.location = 'http://www.mousehuntgame.com/turn.php';
						}else{
							//trap check
							var dlast = new Date(jsonObj.last_activeturn_timestamp*1000);
 							nextActiveTime = ((dlast.getMinutes() < 15)&&(d.getMinutes() < 15))?((15 - d.getMinutes())*60 - d.getSeconds()+15):(nextActiveTime + delay);
 							//nextActiveTime = ((dlast.getMinutes() < 45)&&(dlast.getMinutes() >= 30)&&(d.getMinutes() < 45)&&(d.getMinutes() >= 30) )?((45 - d.getMinutes())*60 - d.getSeconds()+15):(nextActiveTime + delay);
							setTimeout(function() { document.location = 'http://www.mousehuntgame.com/'; } , nextActiveTime*1000);
							
							//var d = new Date();
							d.setSeconds(d.getSeconds() + nextActiveTime);
							var dstring = d.toLocaleTimeString();	
							var dstringlast = dlast.toLocaleTimeString();	
							LinksDiv.innerHTML += '+' + delay + ' -> ' + nextActiveTime + ' (' + dstring + ') - last timestamp: ' + dstringlast + '<hr>';// (' + (jsonObj.last_activeturn_timestamp%900) + ')';
						}
					}
					// more
					if (jsonObj.environment_id != 33){
						LinksDiv.innerHTML += JSON.stringify(jsonObj.viewing_atts,null,'\t') + '<br>';
					}
					if ( jsonObj.quests.hasOwnProperty('QuestRelicHunter')){
						LinksDiv.innerHTML += JSON.stringify(jsonObj.quests.QuestRelicHunter,null,'\t') + '<br><br>';
					}

					//append
					prefElement.parentNode.appendChild(LinksDiv);
					//apply last pref
					document.getElementById('SoundModeInput').value = soundmode;
				prefElement = undefined;
				delete d;
				delete dlast;
			}
		}else{//----if KR
			 soundalert();
		}
	}else{//----not mobile
		setTimeout(function(){document.location = 'http://www.mousehuntgame.com/?switch_to=mobile';},100000);
	}
}else{//----not logged in
	if (!document.body.innerHTML.match("Please try again")){
		setTimeout( function(){
			document.getElementsByTagName('form')[0].elements.namedItem("doLogin").click();
		},30000);
	}
}

function soundalert(){
	var kingSound = document.createElement("audio");
	kingSound.src = "http://www.thewormlab.com/MiaowMusic/ogg/Miaow-snip-Stirring of a fool.ogg";
	kingSound.loop = true;
	kingSound.autoplay = true;
}