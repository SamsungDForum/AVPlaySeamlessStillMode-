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
var Main = {};

var player, player1, player2, player3, player4;
var fullscreenMode=0;

var rotation_flag = 0;

//Return full path where videos are stored
var PackageId =  tizen.application.getCurrentApplication().appInfo.packageId;
var sharedDir = tizen.application.getAppSharedURI(PackageId);
var url = sharedDir + "../res/wgt/img/01.mp4";
var url2 = sharedDir + "../res/wgt/img/02.mp4";
var url3 = sharedDir + "../res/wgt/img/small.mp4";
var url4 = sharedDir + "../res/wgt/img/smallblue.mp4";

var listener1;
var listener2;
var listener3;
var listener4;

function createinfodiv() {
	var info = document.createElement('div');
	info.id = 'info';
	info.style.position = "absolute";
	info.style.width = "25%";
	info.style.height = "25%";
	info.style.top = "35%";
	info.style.left = "35%";
	info.style.padding = "1.5%";
	info.style.border = "2px solid #a4cde1";
	info.style.borderRadius = "15px";
	info.style.boxShadow = "3px 3px 5px #ffffff";
	info.style.backgroundColor = "#ffffff";
	//info.style.color="#fff";
	
	var h = document.createElement('h2');
	h.innerHTML = "Seamless Demo";
	info.appendChild(h);
	
	var hr = document.createElement('hr');
	info.appendChild(hr);
	
	var p = document.createElement('p');
	p.innerHTML = "Vidoes will play one after another in Seamless Mode";
	info.appendChild(p);
	document.body.appendChild(info);
}


Main.onLoad = function (){	
	"use strict";
	createinfodiv();
	 if (window.tizen === undefined) {
        
         setTimeout(
         		function(){
         			 Main.log('This application needs to be run on Tizen device');
         		},
         		1000
         );
     }else{
    	setTimeout(
    		function(){
    			document.getElementById('info').style.display = "none";
    			document.getElementById('av').style.display = "block";
    			Main.log('Started Example');
    			Main.registAllKeys();
    			Main.initplayer();
    			Main.play();
    			document.addEventListener('keydown', Main.onKeyDown, false);
    		},
    		5000
    	);
     }
	
};


/**
 * Handles a key press
 * @param {KeyboardEvent} event
 */
Main.onKeyDown = function (event) {
	"use strict";
	var keyCode = event.keyCode;
    
	switch (keyCode) {
		case 13:    // Enter
	   
	        break;
	    case 10252: // MediaPlayPause
	    case 415:   // MediaPlay
	    case 19:    // MediaPause
	    	Main.play();
	        break;
	    case 413:   // MediaStop
	        Main.stop();
	        break;
	    case 417:   // MediaFastForward
	        break;
	    case 412:   // MediaRewind
	        break;
	    case 48: //Key 0
	        Main.log();
	        rotation_flag = 0;
			Main.rotation();
	        break;
	    case 49: //Key 1
	    	rotation_flag = 90;
			Main.rotation();
	        break;
	    case 50: //Key 2
	    	rotation_flag = 180;
			Main.rotation();
	        break;
	    case 51: //Key 3
	    	rotation_flag = 270;
			Main.rotation();
	        break;
	    case 52: //Key 4
	    	rotation_flag = 0;
			Main.rotation();
	        break;
	    case 10009: // Return
	        if (webapis.avplay.getState() !== 'IDLE' && webapis.avplay.getState() !== 'NONE') {
	            Main.stop();
	        } else {
	            tizen.application.getCurrentApplication().hide();
	        }
        break;
		case 38: 
		break;
		case 40:
		break;
		default:
			Main.log(keyCode);
		break;
	}
};


/**
 * Adds text to a UI element -  NOTE: THIS FUNCTION SHOULD NOT BE USED ON PRODUCTION APPS, it is only for visual demonstration of what is happening
 * @param {String} text
 */
Main.log = function (text) {
  "use strict";
  console.log(text);
};


/**
 * Generic Error handler for uncaught JS errors
 * @param errMsg
 * @param url
 * @param lineNum
 * @returns {boolean}
 */
window.onerror = function handleError(errMsg, url, lineNum) {
	"use strict";
  Main.log('Error Message: ' + errMsg);
  Main.log('  URL: ' + url);
  Main.log('  Line: ' + lineNum);
  return false;
};


function onHide()
{   
	player1.stop();
	player1.close();
	player2.stop();
	player2.close();
	player3.stop();
	player3.close();
	player4.stop();
	player4.close();
}

Main.registAllKeys = function () {
	"use strict";
	try {
        tizen.tvinputdevice.getSupportedKeys()
            .forEach(function (k){
                if ([
                    'ColorF0Red',
                    'ColorF1Green',
                    'ColorF2Yellow',
                    'ColorF3Blue',
                    'MediaFastForward',
                    'MediaPause',
                    'MediaPlay',
                    'MediaPlayPause',
                    'MediaRecord',
                    'MediaRewind',
                    'MediaStop',
                    'Info',
                    '1',
                    '2',
                    '3',
                    '4'
                ].indexOf(k.name) > -1) {
                    tizen.tvinputdevice.registerKey(k.name);
                    Main.log('Subscribed key:'+ k.name + ' ' + k.code);
                }
            });
    } catch (e) {
        Main.log('Could not subscribe keys, exception occurred:'+ e);
    }

	
};


Main.initplayer = function(){
	"use strict";
	//shifted these getPlayer in play function if we call stop and play again.
	player1 = webapis.avplaystore.getPlayer();
	player2 = webapis.avplaystore.getPlayer();
	player3 = webapis.avplaystore.getPlayer();
	player4 = webapis.avplaystore.getPlayer();
	
	listener1 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {
				  	player3.stop();
					Main.log('open1: '+url);
					Main.log('open status: '+player1.open(url));
					Main.log('setListener status: '+player1.setListener(listener3));
					Main.log('mixbuffer set: '+player1.setStreamingProperty("USE_VIDEOMIXER"));
					Main.log('prepare status: '+player1.prepare());
					Main.log('frame set: '+player1.setStreamingProperty("SET_MIXEDFRAME"));
					player1.setDisplayRect(0, 0, 960, 540);
					Main.log('play status: '+player1.play());
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error : " + eventType);
			  }
	};
	
	listener2 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {

					player4.stop();
					Main.log('open status: '+player2.open(url2));
					Main.log('setListener status: '+player2.setListener(listener4));
					Main.log('mixbuffer set: '+player2.setStreamingProperty("USE_VIDEOMIXER"));
					Main.log('prepare status: '+player2.prepare());
					Main.log('frame set: '+player2.setStreamingProperty("SET_MIXEDFRAME"));
					player2.setDisplayRect(960, 540, 960, 540);
					Main.log('play status: '+player2.play());
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error : " + eventType);
			  }
	};
	
	listener3 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {
				  Main.log("3onstream complete.");
				  	player1.stop();
					Main.log('open3: '+url3);
					Main.log('open status: '+player3.open(url3));
					Main.log('setListener status: '+player3.setListener(listener1));
					Main.log('mixbuffer set: '+player3.setStreamingProperty("USE_VIDEOMIXER"));
					Main.log('prepare status: '+player3.prepare());
					Main.log('frame set: '+player3.setStreamingProperty("SET_MIXEDFRAME"));
					player3.setDisplayRect(0, 0, 960, 540);		
					Main.log('play status: '+player3.play());
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error : " + eventType);
			  }
	};
	
	listener4 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {
				  Main.log("4onstream complete.");
				  	player2.stop();
					Main.log('open1: '+url4);
					Main.log('open status: '+player4.open(url4));
					Main.log('setListener status: '+player4.setListener(listener2));
					Main.log('mixbuffer set: '+player4.setStreamingProperty("USE_VIDEOMIXER"));
					Main.log('prepare status: '+player4.prepare());
					Main.log('frame set: '+player4.setStreamingProperty("SET_MIXEDFRAME"));
					player4.setDisplayRect(960, 540, 960, 540);
					Main.log('play status: '+player4.play());
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error : " + eventType);
			  }
	};
};


//start playback
Main.play = function() {	
	
		// Start playback of first video pair
		Main.log('open1: '+url);
		Main.log('open2: '+url2);
		Main.log('open status: '+player1.open(url));
		Main.log('open status: '+player2.open(url2));
		Main.log('setListener status: '+player1.setListener(listener3));
		Main.log('setListener status: '+player2.setListener(listener4));
		Main.log('mixbuffer set: '+player1.setStreamingProperty("USE_VIDEOMIXER"));
		Main.log('mixbuffer set: '+player2.setStreamingProperty("USE_VIDEOMIXER"));
		Main.log('prepare status: '+player1.prepare());
		Main.log('prepare status: '+player2.prepare());
		Main.log('frame set: '+player1.setStreamingProperty("SET_MIXEDFRAME"));
		Main.log('frame set: '+player2.setStreamingProperty("SET_MIXEDFRAME"));
		player1.setDisplayRect(0, 0, 960, 540);
		player2.setDisplayRect(960, 540, 960, 540);		
		Main.log('play status: '+player1.play());
		Main.log('play status: '+player2.play());
		Main.log('webapis.avplay.setDisplayRotation : '+ player1.setDisplayRotation("PLAYER_DISPLAY_ROTATION_0"));
		Main.log('webapis.avplay.setDisplayRotation : '+ player2.setDisplayRotation("PLAYER_DISPLAY_ROTATION_0"));
};


//stop playback
Main.stop = function() {
	
	"use strict";
	player1.stop();
	player1.close();
	player2.stop();
	player2.close();
	player3.stop();
	player3.close();
	player4.stop();
	player4.close();
};


Main.onUnLoad = function (){
	onHide();
	
};



