// ==UserScript==
// @name        MouseHunt KR
// @version     0.1.8
// @namespace   Zwee
// @include     http://www.mousehuntgame.com/news.php
// @include     https://www.mousehuntgame.com/news.php
// ==/UserScript==
//init 27ms
// 81/100
var pageDate = new Date();
var canvasInfo = document.createElement('div');
canvasInfo.style.display = 'block';
document.getElementById('hgAppContainer').appendChild(canvasInfo);
var max_n = 15; // #sample
var jsonObj = JSON.parse(document.documentElement.innerHTML.match(/user = (.+?)};/)[1] + "}");
var i,main_i;
// var KR_samplechar="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";//62
var KR_samplechar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabdefghijklmnqrtuy0123456789";//54
var canvas = document.createElement('canvas');
canvas.width='100';
canvas.height='100';
var ctx = canvas.getContext("2d");
var KR_sampleimgArray = new Array();
for (main_i = 0; main_i<54; main_i++){
  ctx.fillStyle="rgb(0,0,0)";
  ctx.fillRect(0,0,100,100);
  ctx.font = "50px Verdana";
  ctx.fillStyle="rgb(255,0,0)";
  ctx.fillText(KR_samplechar[main_i], 0, 50);
  var imageData = ctx.getImageData(0, 0, 100, 100);
  var pixels = imageData.data;
  var x,y,xmin,xmax,ymin,ymax,i,c;
  xmin = xmax = ymin = ymax = -1;
  for (x = 0; x < 100; x++){
	c = 0;
	for (y = 0; y < 100; y++){
	  i = x + y*100;
	  if (pixels[i*4] != 0 ){//bg
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
	  tmpcanvas.width  = xmax - xmin + 1;
	  tmpcanvas.height = ymax - ymin + 1;
	  var tempdata = tmpcanvas.getContext("2d").getImageData( 0, 0, tmpcanvas.width, tmpcanvas.height);
	  var temppixels = tempdata.data;
	  for (x = xmin; x <=xmax; x++){
		for (y = ymin; y <= ymax; y++){
		  i  = x + y*100;
		  it = (x-xmin) + (y-ymin)*tmpcanvas.width;
		  temppixels[it*4]   = pixels[i*4];
		  temppixels[it*4+1] = pixels[i*4+1];
		  temppixels[it*4+2] = pixels[i*4+2];
		  temppixels[it*4+3] = pixels[i*4+3];
		}
	  }
	  tmpcanvas.getContext('2d').putImageData(tempdata,0,0);
	  KR_sampleimgArray[main_i] = tmpcanvas;
	  xmin = xmax = ymin = ymax = -1;
	}
  }
}
var resultArray = new Array();
var nowDate = new Date();
canvasInfo.innerHTML += ('Init in: ' + (nowDate.getTime() - pageDate.getTime()) + 'ms<br>Solving...<br>');
//----main function
main_i = 0;
loadandsolve();
//----main function
function loadandsolve() {
  if (main_i >= max_n){//eval
	// pageDate = new Date();
	canvasInfo.innerHTML += resultArray + '<br>';
	var uniqueresult = new Array();
	var weigh = new Array();
	var j;
	for (i = 0; i < resultArray.length; i++){
	  var matched = false;
	  for (j = 0; j < uniqueresult.length; j++){
		if (resultArray[i].match(uniqueresult[j])){
		  weigh[j]++;
		  matched = true;
		}
	  }
	  if (!matched){
		uniqueresult.push(resultArray[i]);
		weigh.push(1);
	  }
	}
	j = weigh.indexOf(Math.max.apply(null,weigh));
	nowDate = new Date();
	canvasInfo.innerHTML += uniqueresult[j] + ' ~ confidence: ' + weigh[j] + '/' + resultArray.length + ' in: ' + (nowDate.getTime() - pageDate.getTime()) + 'ms<br>';
	if (document.getElementById('puzzle_answer')){
	  document.getElementById('puzzle_answer').value = uniqueresult[j];
	  setTimeout(function(){document.getElementById('puzzle_submit').click();},1000);
	  setTimeout(function(){location.reload();},5000);
	}else{
	  window.localStorage.setItem('KRText',uniqueresult[j]);
	  //setTimeout(function(){location.href = '/';},5000);
	}
  }else{
	var img = new Image();
	// pageDate = new Date();
	img.onload = function(){
	  var canvas = document.createElement('canvas');
	  canvas.width='200';
	  canvas.height='58';
	  var ctx = canvas.getContext("2d");
	  ctx.drawImage(img, 0, 0);
	  var imageData = ctx.getImageData(0, 0, 200, 58);
	  var pixels = imageData.data;
	  var numPixels = 200 * 58;
	  var iu,id,il,ir,x,y;
	  var shoulderode = new Array();
	  //----clear bg, init erode index, clear middle space
	  for (i = 0; i < numPixels; i++){
		shoulderode[i] = false;
		//process bg : yellow and orange
		if (pixels[i*4] > 200 && pixels[i*4+1] > 120){
		  pixels[i*4] = 0; // Red
		  pixels[i*4+1] = 0; // Green
		  pixels[i*4+2] = 0; // Blue
		}
		else{//black
		  pixels[i*4] = 255; // Red
		  pixels[i*4+1] = 0; // Green
		  pixels[i*4+2] = 0; // Blue
		}
	  }
	  //----clear middle space
	  var c = 0;
	  for (x = 0; x < imageData.width; x++){
		c = 0;
		for (y = 0; y < imageData.height; y++){
		  i = x + y*imageData.width;
		  if (pixels[i*4] != 0) ++c;
		}
		if (c < 6){
		  for (y = 0; y < imageData.height; y++){
			i = x + y*imageData.width;
			pixels[i*4] = 0;
		  }
		}
	  }
	  //----scan for erode-able pixels
	  for ( y = 0; y < imageData.height; y++){
		for ( x = 0; x < imageData.width; x++){
		  i  =  x    +  y   *imageData.width;
		  iu =  x    + (y-1)*imageData.width;
		  id =  x    + (y+1)*imageData.width;
		  il = (x-1) +  y   *imageData.width;
		  ir = (x+1) +  y   *imageData.width;
		  //erode
		  if (pixels[i*4] == 0){
			shoulderode[iu] = shoulderode[id] = shoulderode[il] = shoulderode[ir] = true;
		  }
		}
	  }
	  //----erode them
	  for ( y = 0; y < imageData.height; y++){
		for ( x = 0; x < imageData.width; x++){
		  i  =  x + y*imageData.width;
		  if (shoulderode[i]){
			pixels[i*4] = 0; // Red
			pixels[i*4+1] = 0; // Green
			pixels[i*4+2] = 0; // Blue
		  }
		}
	  }
	  //----dilate
	  for ( i = 0; i < numPixels; i++) {
		shoulderode[i] = false;
	  }
	  for ( y = 0; y < imageData.height; y++){
		for ( x = 0; x < imageData.width; x++){
		  i  =  x    +  y   *imageData.width;
		  iu =  x    + (y-1)*imageData.width;
		  id =  x    + (y+1)*imageData.width;
		  il = (x-1) +  y   *imageData.width;
		  ir = (x+1) +  y   *imageData.width;
		  
		  if (pixels[i*4] != 0){
			if (pixels[iu*4] == 0)  shoulderode[iu] = true;
			if (pixels[id*4] == 0)  shoulderode[id] = true;
			if (pixels[il*4] == 0)  shoulderode[il] = true;
			if (pixels[ir*4] == 0)  shoulderode[ir] = true;
		  }
		}
	  }
	  //----dilate them
	  for ( y = 0; y < imageData.height; y++){
		for ( x = 0; x < imageData.width; x++){
		  i  =  x + y*imageData.width;
		  if (shoulderode[i]){
			pixels[i*4] = 255; // Red
			pixels[i*4+1] = 0; // Green
			pixels[i*4+2] = 0; // Blue
		  }
		}
	  }
	  //----ocr
	  var result = '';
	  var charcount = 0;
	  var xmin,xmax,ymin,ymax,it;
	  xmin = xmax = ymin = ymax = -1;
	  for (x = 0; x < 200; x++){
		c = 0;
		for (y = 0; y < 58; y++){
		  i = x + y*200;
		  if (pixels[i*4] != 0){//bg
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
		  if (((xmax-xmin)*(ymax-ymin)) > 150){//minsize
			++charcount;
			//crop
			var tmpcanvas = document.createElement('canvas');
			tmpcanvas.width  = xmax - xmin + 1;
			tmpcanvas.height = ymax - ymin + 1;
			var tempctx = tmpcanvas.getContext("2d");
			var tempdata = tempctx.getImageData( 0, 0, tmpcanvas.width, tmpcanvas.height);
			var temppixels = tempdata.data;
			for (x = xmin; x <=xmax; x++){
			  for (y = ymin; y <= ymax; y++){
				i  = x + y*200;
				it = (x-xmin) + (y-ymin)*tmpcanvas.width;
				temppixels[it*4]   = pixels[i*4];
				temppixels[it*4+1] = pixels[i*4+1];
				temppixels[it*4+2] = pixels[i*4+2];
				temppixels[it*4+3] = pixels[i*4+3];
			  }
			}
			result += ocrsolvechar(tempdata);
		  }
		  xmin = xmax = ymin = ymax = -1;
		}
	  }
	  // nowDate = new Date();
	  // canvasInfo.innerHTML += (result + ' in: ' + (nowDate.getTime() - pageDate.getTime()) + 'ms<br>');
	  resultArray.push(result.toLowerCase());
	}
	// img.src = '/puzzleimage.php?snuid=' + jsonObj.sn_user_id + '&hash=' + jsonObj.unique_hash;
	img.src = '/puzzleimage.php?t=' + new Date().getTime() + '&snuid=' + jsonObj.sn_user_id + '&hash=' + jsonObj.unique_hash;
	++main_i;
	// canvasInfo.appendChild(img);
	setTimeout(loadandsolve,1000);
  }
}
function ocrsolvechar(Imgdata){
  var resultchar = '';
  var resultcharindex = 0;
  var canvas = document.createElement('canvas');
  canvas.width = Imgdata.width;
  canvas.height = Imgdata.height;
  var ctx = canvas.getContext('2d');
  var numpixels = Imgdata.width*Imgdata.height;
  var letterimgdata;
  var imgval = 255;
  var i,j;
  var squares,rms;
  for ( i = 0; i < 54;i++){
	ctx.clearRect(0, 0, Imgdata.width, Imgdata.height);
	ctx.drawImage( KR_sampleimgArray[i], 0, 0, Imgdata.width, Imgdata.height);
	letterimgdata = ctx.getImageData( 0, 0, Imgdata.width, Imgdata.height);
	squares = 0;
	for ( j = 0; j < numpixels; j++){
	  squares += (Imgdata.data[j*4]-letterimgdata.data[j*4])*(Imgdata.data[j*4]-letterimgdata.data[j*4])/(numpixels*3);
	  squares += (Imgdata.data[j*4+1]-letterimgdata.data[j*4+1])*(Imgdata.data[j*4+1]-letterimgdata.data[j*4+1])/(numpixels*3);
	  squares += (Imgdata.data[j*4+2]-letterimgdata.data[j*4+2])*(Imgdata.data[j*4+2]-letterimgdata.data[j*4+2])/(numpixels*3);
	}
	rms = Math.sqrt(squares);
	if (rms < imgval){
	  imgval = rms;
	  resultcharindex = i;
	}
  }
  resultchar = KR_samplechar[resultcharindex];
  return resultchar;
}