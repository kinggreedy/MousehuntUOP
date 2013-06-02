function JBCountDown(settings) {
    var glob = settings;
   
    function deg(deg) {return (Math.PI/180)*deg - (Math.PI/180)*90;}
    
    glob.total   = Math.floor((glob.endDate - glob.startDate) / 3600);
    glob.hours   = Math.floor((glob.endDate - glob.now) / 3600);
    glob.minutes = 60 - Math.floor(((glob.endDate - glob.now) % 3600) / 60) ;
    glob.seconds = 60 - Math.floor((glob.endDate - glob.now) % 60);
    
    if (glob.now >= glob.endDate) {return;}
    var clock = {
        set: {
            hours: function(){
                var cHr = $("#UOP_jbclock_canvas_hours").get(0);
                var ctx = cHr.getContext("2d");
                ctx.clearRect(0, 0, cHr.width, cHr.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.hoursColor;
                
                ctx.shadowBlur    = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.hoursGlow;
                
                ctx.arc(47,47,43, deg(0), deg((360/glob.total)*(glob.total - glob.hours)));
                ctx.lineWidth = 9;
                ctx.stroke();
                $(".UOP_jbclock_clock_hours .UOP_jbclock_val").text(glob.hours);
            },
            minutes : function(){
                var cMin = $("#UOP_jbclock_canvas_minutes").get(0);
                var ctx = cMin.getContext("2d");
                ctx.clearRect(0, 0, cMin.width, cMin.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.minutesColor;
                
                ctx.shadowBlur    = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.minutesGlow;
                
                ctx.arc(47,47,43, deg(0), deg(6*glob.minutes));
                ctx.lineWidth = 9;
                ctx.stroke();
                $(".UOP_jbclock_clock_minutes .UOP_jbclock_val").text(60 - glob.minutes);
            },
            seconds: function(){
                var cSec = $("#UOP_jbclock_canvas_seconds").get(0);
                var ctx = cSec.getContext("2d");
                ctx.clearRect(0, 0, cSec.width, cSec.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.secondsColor;
                
                ctx.shadowBlur    = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.secondsGlow;
                
                ctx.arc(47,47,43, deg(0), deg(6*glob.seconds));
                ctx.lineWidth = 9;
                ctx.stroke();
        
                $(".UOP_jbclock_clock_seconds .UOP_jbclock_val").text(60 - glob.seconds);
            }
        },
       
        start: function(){
            /* Seconds */
            var cdown = setInterval(function(){
                if ( glob.seconds > 59 ) {
                    if (60 - glob.minutes == 0 && glob.hours == 0) {
                        clearInterval(cdown);
                        
						/* Countdown is complete */
						if (glob.callbackFunc != null) glob.callbackFunc();
                        
                        return;
                    }
                    glob.seconds = 1;
                    if (glob.minutes > 59) {
                        glob.minutes = 1;
						if (glob.hours > 0) {
							glob.hours--;
							clock.set.hours();
						}
                        clock.set.minutes();
                    } else {
                        glob.minutes++;
                    }
                    clock.set.minutes();
                } else {
                    glob.seconds++;
                }
				//clock.set.seconds();

				glob.now = Math.floor(new Date().getTime() / 1000);
				glob.hours   = Math.floor((glob.endDate - glob.now) / 3600);
				glob.minutes = 60 - Math.floor(((glob.endDate - glob.now) % 3600) / 60) ;
				glob.seconds = 60 - Math.floor((glob.endDate - glob.now) % 60);
            },1000);
        }
    }
    //clock.set.seconds();
    clock.set.minutes();
    clock.set.hours();
    clock.start();
}