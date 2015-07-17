import * as SpreadsheetData from './SpreadsheetData.js';
import loadYouTubeApi from './loadYouTubeApi.js';


var data;
var spreadsheetKey = '1D5HLvU5P213-9KG2_juyZ9jcujM_yYdF-S3-RlZjnng';


SpreadsheetData
  .get(spreadsheetKey, 1)
  .then((d) => {
    data = SpreadsheetData.parse(d);
    console.log(data);
  })
  .then(loadYouTubeApi)
  .then(() => {
    console.log('youtube ready');
  })


  .then(() => {
    var player = new YT.Player('player', {
      width: 1280 / 3,
      height: 1280 / 3,
      videoId: 'ElEmIBiUu30',
      playerVars: {
        controls: 0,
        showinfo: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });


    function onPlayerReady(event) {
      event.target.playVideo();
    }
    function onPlayerStateChange(event) {
      console.log(event);
    }
  })









  .then(() => {
    console.log('here');
  })



  .catch((err) => {
    console.log('error', err);
  });
