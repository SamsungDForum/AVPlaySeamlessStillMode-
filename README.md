# AVPlay SeamlessPlay - MixedFrame mode

This application demonstrates the usage of `webapis.avplaystore` API playing videos in seamless manner using Mixedframe mode. Using AVPlay store you can run two players simultaneously. With this API it is possible to have a video player in application. AVPlay is alternative to HTML5 player and has many advantages over it including: wider range of codecs and formats, DRMs support, hardware acceleration.
It is highly recommended for handling videos in SSSP applications.

## How to use the AVPlay SeamlessPlay application

First add videos to project folder and alternate url values with videos name. After building and installing the app, video playback will start automatically. Review Main.onKeyDown for other playback options.

## Supported platforms

2015 and newer

## Prerequisites

To use `webapis.avplaystore` API, embed below script into your `index.html`:

```html
<script src="$WEBAPIS/webapis/webapis.js"></script>
```

## Privileges and metadata

In order to use `webapis.avplaystore` API the following privilege must be included in `config.xml`:

```xml
<tizen:privilege name="http://developer.samsung.com/privilege/avplay" />
```

Public level privilege of certificate is supported.

## Other resources
In order to achieve seamless playback, make sure video resolution and bitrate are similar for all video elements in playlist.
Black gap between videos can be observed on first switch between first and second video (platform limitation).
Known Limitations comes from the fact of video usage. Please refer to SDF article about videos.

### File structure

```
AVPlayStillMode/ - AVPlayStillMode sample app root folder
│
├── css/ - styles used in the application
│   │
│   ├── style.css - styles specific for the application
│   └── SamsungOneUI-400.ttf - font used in application
│
├── js/ - scripts used in the application
│   │
│   └── main.js - main application script
│
├── config.xml - application's configuration file
├── index.html - main document
└── README.md - this file
```

## Other resources

*  **AVPlay API**  
  https://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/avplay-api

* **AVPlay guide**  
  https://developer.samsung.com/tv/develop/guides/multimedia/media-playback/using-avplay


## Copyright and License

**Copyright 2021 Samsung Electronics, Inc.**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
