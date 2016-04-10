# MousehuntUOP

# Setup

## For normal people

Grab it here    
+ Chrome Web Store: https://chrome.google.com/webstore/detail/mousehunt-tractor/nchjclcllaekebgoipccgiepbjbpnejm?hl=en-US    
+ Chrome Web Store (new UI): https://chrome.google.com/webstore/detail/mousehunt-tractor/ahjmolpcodleempppdjfkihifaaflooi?hl=en-US    

## For developers

`/server` contains backend functionality for Tourney live scoreboard system. Warning: Do not expose this server to public because it might get you and your clan banned    
`/Extension` contains the main code. For starters, go straight to content.js    
`/history` contains older version of this extension (userscripts.org era)    

# Features

## Layout    

* Redesign layout components    
* New Golden shield status    
* Clocks    
* Detailed next hunt timer. The time different between my timer and dev's timer is browser rendering time. My timer is correct    
* Short Trap selector http://imgur.com/42goVim     
* Compact inventory special page http://imgur.com/Or76S3S     
* For new layout: Force trap stats to appear    
* For old UI: Added Travel, Potion, Free Gift and Supply tab to the camp page. Crafting page is broken.    
* Tourney live scoreboard (1 minute refresh).    

---

## Tourney live scoreboard system

* You can find the source code of the server (using PHP and MicrosoftSQL) in the server folder.     
* So a whole clan can watch the tourney of each other by setting the same server url. Everytime you attend to a tournament, the script will send your team ID to the private server. People can then watch it from TIVI tab. Also highlight your team.    
* Screenshot: http://imgur.com/AmtGi27    
**Disclaimer: These teams are innocent, I used Chrome console to edit them for demo purpose.**    
* In the demonstration, 'my' team is yellow, 'clan' team is green.     
* If you don't want to show your tourney to your clan, consider turning it off.    

---

## The one shouldn't be named    

* Do what it should do    
* Solve what it should solve    
 * For a good night sleep    
 * Not perfect, only 97%
* Stop Alarm: https://www.mousehuntgame.com/forum/showthread.php?91498-Does-anyone-know-how-to-turn-the-music-off-when-its-the-kings-reward     

---

## The mini one shouldn't be named    

Only Change Trap at Trapcheck, Easter Egg Cycle, LG, Express Train , Sunken and Burrough Rift is fully tested.    
Warning: FW is not fully tested and the mechanism is quite complex     

---

## Source code     

* It sucks    
* Code convention is terrible
* No documentation     
* No framework. No jQuery. Pure JS.

I know it sucks. So don't tell me it sucks.

---

## Deprecated / Broken    

* Mobile travel simulation
* Quick buy market (There is 30~60 sec delay before an offer appear on the market, but if you buy it via ID, you can get it. This functionality isn't supported anymore because you can make buy offer, which is more reliable)    
* Crafting system for old MH layout.

---

## And remember

All roads lead to King's Stockade