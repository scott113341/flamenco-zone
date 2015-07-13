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
    console.log('here');
  })



  .catch((err) => {
    console.log('error', err);
  });
