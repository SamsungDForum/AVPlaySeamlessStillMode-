/* ! Copyright (c) 2021, Samsung Electronics Co., Ltd


* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
 

* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
 

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE. */

// Return full path where videos are stored
var PackageId = tizen.application.getCurrentApplication().appInfo.packageId;
var sharedDir = tizen.application.getAppSharedURI(PackageId);
var sources = sharedDir + "../res/wgt/images/";

var p1;
var p2;
var playList = ["1.mp4", "2.mp4", "3.mp4", "4.mp4"];

var iterator = 0;


function increaseInterator(x) {
	iterator++;
	if(iterator >= x.length) {
		iterator = 0;
	}
	console.log("current iterator value " + iterator);
}

function play(pl) {
	document.getElementById("av-player").classList.add("vid");
	document.getElementById("av-player2").classList.add("vid");
	p1.open(sources + pl[iterator%pl.length]);
	p1.setListener(listener1);
	p1.setDisplayRect(0, 0, 1920, 1080);
	p1.prepare();
	p1.play();
}

var registerKey = function () {
    tizen.tvinputdevice.registerKey("MediaPlay");
    tizen.tvinputdevice.registerKey("MediaStop");
};

function init(){
	p1 = webapis.avplaystore.getPlayer();
	p2 = webapis.avplaystore.getPlayer();
	//play(playList);
	

	registerKey();

	// Keycode listener
	document.addEventListener('keydown', function (e) {
	    switch (e.keyCode) {
	        case 415: //MediaPlay
	            play(playList);
	            break;
	        case 413: //MediaStop
	        	p1.stop();
	        	p2.stop();
	        	document.getElementById("av-player").classList.remove("vid");
	        	document.getElementById("av-player2").classList.remove("vid");
	        	iterator=0;
	        	break;

	    }
	});
}


var listener1 = {
		onbufferingstart: function () {
			console.log("Buffering start.");
		},
		onbufferingprogress: function (percent) {
			console.log("Buffering progress data : " + percent);
		},
		onbufferingcomplete: function () {
			console.log("Buffering complete.");
		},
		onstreamcompleted: function () {
			console.log("Stream Completed");
			p1.setVideoStillMode("true"); // Turn on still mode to keep last frame
			p1.stop();
			increaseInterator(playList);
			p2.open(sources + playList[iterator%playList.length]);
			p2.setListener(listener2);
			p2.setDisplayRect(0, 0, 1920, 1080);
			p2.prepare();
			p2.setVideoStillMode("false");
			p2.play();			
		},
		oncurrentplaytime: function (currentTime) {
			console.log("Current playtime: " + currentTime);
		},
		onerror: function (eventType) {
			console.log("event type error : " + eventType);
		},
		onevent: function (eventType, eventData) {
			console.log("event type: " + eventType + ", data: " + eventData);
		},
		ondrmevent: function (drmEvent, drmData) {
			console.log("DRM callback: " + drmEvent + ", data: " + drmData);
		}
	};

var listener2 = {
		onbufferingstart: function () {
			console.log("Buffering start.");
		},
		onbufferingprogress: function (percent) {
			console.log("Buffering progress data : " + percent);
		},
		onbufferingcomplete: function () {
			console.log("Buffering complete.");
		},
		onstreamcompleted: function () {
			console.log("Stream Completed");
			increaseInterator(playList);
			p2.setVideoStillMode("true"); // Turn on still mode to keep last frame
			p2.stop();
			p1.open(sources + playList[iterator%playList.length]);
			p1.setListener(listener1);
			p1.setDisplayRect(0, 0, 1920, 1080);
			p1.prepare();
			p1.setVideoStillMode("false");
			p1.play();			
		},
		oncurrentplaytime: function (currentTime) {
			console.log("Current playtime: " + currentTime);
		},
		onerror: function (eventType) {
			console.log("event type error : " + eventType);
		},
		onevent: function (eventType, eventData) {
			console.log("event type: " + eventType + ", data: " + eventData);
		},
		ondrmevent: function (drmEvent, drmData) {
			console.log("DRM callback: " + drmEvent + ", data: " + drmData);
		}
		
		
};


window.onload = init;