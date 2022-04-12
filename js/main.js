/*
 * Copyright and License
 * Copyright 2021 Samsung Electronics, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 * 
 * 
*/

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
