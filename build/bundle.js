(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.get = get;
exports.parse = parse;

function get(key, worksheet) {

  var spreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + worksheet + '/public/values?alt=json';
  var proxyUrl = 'https://jsonp.afeld.me/?callback=_gotSpreadsheetData&url=' + spreadsheetUrl;

  var tag = document.createElement('script');
  tag.src = proxyUrl;
  document.head.appendChild(tag);

  return new Promise(function (resolve, reject) {
    window._gotSpreadsheetData = function (data) {
      resolve(data);
    };
  });
}

function parse(data) {

  var dance = {
    name: data.feed.title.$t,
    sections: []
  };

  data.feed.entry.forEach(function (entry) {
    var section = {
      name: entry.gsx$section.$t,
      subsection: entry.gsx$subsection.$t,
      video: entry.gsx$video.$t,
      start: parseInt(entry.gsx$start.$t),
      end: parseInt(entry.gsx$end.$t)
    };
    dance.sections.push(section);
  });

  return dance;
}

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _SpreadsheetDataJs = require('./SpreadsheetData.js');

var SpreadsheetData = _interopRequireWildcard(_SpreadsheetDataJs);

var _loadYouTubeApiJs = require('./loadYouTubeApi.js');

var _loadYouTubeApiJs2 = _interopRequireDefault(_loadYouTubeApiJs);

var data;
var spreadsheetKey = '1D5HLvU5P213-9KG2_juyZ9jcujM_yYdF-S3-RlZjnng';

SpreadsheetData.get(spreadsheetKey, 1).then(function (d) {
  data = SpreadsheetData.parse(d);
  console.log(data);
}).then(_loadYouTubeApiJs2['default']).then(function () {
  console.log('youtube ready');
}).then(function () {
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
}).then(function () {
  console.log('here');
})['catch'](function (err) {
  console.log('error', err);
});

},{"./SpreadsheetData.js":1,"./loadYouTubeApi.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {

  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  return new Promise(function (resolve) {
    window.onYouTubeIframeAPIReady = function () {
      resolve();
    };
  });
};

module.exports = exports['default'];

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2NvdHQvRG9jdW1lbnRzL3NpdGVzL2ZsYW1lbmNvLXpvbmUvc3JjL2pzL1NwcmVhZHNoZWV0RGF0YS5qcyIsIi9Vc2Vycy9zY290dC9Eb2N1bWVudHMvc2l0ZXMvZmxhbWVuY28tem9uZS9zcmMvanMvYXBwLmpzIiwiL1VzZXJzL3Njb3R0L0RvY3VtZW50cy9zaXRlcy9mbGFtZW5jby16b25lL3NyYy9qcy9sb2FkWW91VHViZUFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDQWdCLEdBQUcsR0FBSCxHQUFHO1FBa0JILEtBQUssR0FBTCxLQUFLOztBQWxCZCxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFOztBQUVsQyxNQUFJLGNBQWMsbURBQWlELEdBQUcsU0FBSSxTQUFTLDRCQUF5QixDQUFDO0FBQzdHLE1BQUksUUFBUSxpRUFBK0QsY0FBYyxDQUFHOztBQUU1RixNQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLEtBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ25CLFVBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUvQixTQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxVQUFNLENBQUMsbUJBQW1CLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDMUMsYUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2YsQ0FBQztHQUNILENBQUMsQ0FBQztDQUVKOztBQUdNLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBRTs7QUFFMUIsTUFBSSxLQUFLLEdBQUc7QUFDVixRQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QixZQUFRLEVBQUUsRUFBRTtHQUNiLENBQUM7O0FBRUYsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0FBQ2pDLFFBQUksT0FBTyxHQUFHO0FBQ1osVUFBSSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUMxQixnQkFBVSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUNuQyxXQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQ3pCLFdBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDbkMsU0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztLQUNoQyxDQUFDO0FBQ0YsU0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDOUIsQ0FBQyxDQUFDOztBQUVILFNBQU8sS0FBSyxDQUFDO0NBRWQ7Ozs7Ozs7OztpQ0N0Q2dDLHNCQUFzQjs7SUFBM0MsZUFBZTs7Z0NBQ0EscUJBQXFCOzs7O0FBR2hELElBQUksSUFBSSxDQUFDO0FBQ1QsSUFBSSxjQUFjLEdBQUcsOENBQThDLENBQUM7O0FBR3BFLGVBQWUsQ0FDWixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUN0QixJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUs7QUFDWCxNQUFJLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxTQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ25CLENBQUMsQ0FDRCxJQUFJLCtCQUFnQixDQUNwQixJQUFJLENBQUMsWUFBTTtBQUNWLFNBQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FDOUIsQ0FBQyxDQUdELElBQUksQ0FBQyxZQUFNO0FBQ1YsTUFBSSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNuQyxTQUFLLEVBQUUsSUFBSSxHQUFHLENBQUM7QUFDZixVQUFNLEVBQUUsSUFBSSxHQUFHLENBQUM7QUFDaEIsV0FBTyxFQUFFLGFBQWE7QUFDdEIsY0FBVSxFQUFFO0FBQ1YsY0FBUSxFQUFFLENBQUM7QUFDWCxjQUFRLEVBQUUsQ0FBQztLQUNaO0FBQ0QsVUFBTSxFQUFFO0FBQ04sYUFBTyxFQUFFLGFBQWE7QUFDdEIsbUJBQWEsRUFBRSxtQkFBbUI7S0FDbkM7R0FDRixDQUFDLENBQUM7O0FBR0gsV0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFO0FBQzVCLFNBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7R0FDMUI7QUFDRCxXQUFTLG1CQUFtQixDQUFDLEtBQUssRUFBRTtBQUNsQyxXQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3BCO0NBQ0YsQ0FBQyxDQVVELElBQUksQ0FBQyxZQUFNO0FBQ1YsU0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNyQixDQUFDLFNBSUksQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUNkLFNBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzNCLENBQUMsQ0FBQzs7Ozs7Ozs7O3FCQzVEVSxZQUFXOztBQUV4QixNQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLEtBQUcsQ0FBQyxHQUFHLEdBQUcsb0NBQW9DLENBQUM7QUFDL0MsVUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRS9CLFNBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDOUIsVUFBTSxDQUFDLHVCQUF1QixHQUFHLFlBQVc7QUFDMUMsYUFBTyxFQUFFLENBQUM7S0FDWCxDQUFDO0dBQ0gsQ0FBQyxDQUFDO0NBRUoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGZ1bmN0aW9uIGdldChrZXksIHdvcmtzaGVldCkge1xuXG4gIHZhciBzcHJlYWRzaGVldFVybCA9IGBodHRwczovL3NwcmVhZHNoZWV0cy5nb29nbGUuY29tL2ZlZWRzL2xpc3QvJHtrZXl9LyR7d29ya3NoZWV0fS9wdWJsaWMvdmFsdWVzP2FsdD1qc29uYDtcbiAgdmFyIHByb3h5VXJsID0gYGh0dHBzOi8vanNvbnAuYWZlbGQubWUvP2NhbGxiYWNrPV9nb3RTcHJlYWRzaGVldERhdGEmdXJsPSR7c3ByZWFkc2hlZXRVcmx9YDtcblxuICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHRhZy5zcmMgPSBwcm94eVVybDtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2luZG93Ll9nb3RTcHJlYWRzaGVldERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH07XG4gIH0pO1xuXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcblxuICB2YXIgZGFuY2UgPSB7XG4gICAgbmFtZTogZGF0YS5mZWVkLnRpdGxlLiR0LFxuICAgIHNlY3Rpb25zOiBbXVxuICB9O1xuXG4gIGRhdGEuZmVlZC5lbnRyeS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIHZhciBzZWN0aW9uID0ge1xuICAgICAgbmFtZTogZW50cnkuZ3N4JHNlY3Rpb24uJHQsXG4gICAgICBzdWJzZWN0aW9uOiBlbnRyeS5nc3gkc3Vic2VjdGlvbi4kdCxcbiAgICAgIHZpZGVvOiBlbnRyeS5nc3gkdmlkZW8uJHQsXG4gICAgICBzdGFydDogcGFyc2VJbnQoZW50cnkuZ3N4JHN0YXJ0LiR0KSxcbiAgICAgIGVuZDogcGFyc2VJbnQoZW50cnkuZ3N4JGVuZC4kdClcbiAgICB9O1xuICAgIGRhbmNlLnNlY3Rpb25zLnB1c2goc2VjdGlvbik7XG4gIH0pO1xuXG4gIHJldHVybiBkYW5jZTtcblxufVxuIiwiaW1wb3J0ICogYXMgU3ByZWFkc2hlZXREYXRhIGZyb20gJy4vU3ByZWFkc2hlZXREYXRhLmpzJztcbmltcG9ydCBsb2FkWW91VHViZUFwaSBmcm9tICcuL2xvYWRZb3VUdWJlQXBpLmpzJztcblxuXG52YXIgZGF0YTtcbnZhciBzcHJlYWRzaGVldEtleSA9ICcxRDVITHZVNVAyMTMtOUtHMl9qdXlaOWpjdWpNX3lZZEYtUzMtUmxaam5uZyc7XG5cblxuU3ByZWFkc2hlZXREYXRhXG4gIC5nZXQoc3ByZWFkc2hlZXRLZXksIDEpXG4gIC50aGVuKChkKSA9PiB7XG4gICAgZGF0YSA9IFNwcmVhZHNoZWV0RGF0YS5wYXJzZShkKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSlcbiAgLnRoZW4obG9hZFlvdVR1YmVBcGkpXG4gIC50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygneW91dHViZSByZWFkeScpO1xuICB9KVxuXG5cbiAgLnRoZW4oKCkgPT4ge1xuICAgIHZhciBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKCdwbGF5ZXInLCB7XG4gICAgICB3aWR0aDogMTI4MCAvIDMsXG4gICAgICBoZWlnaHQ6IDEyODAgLyAzLFxuICAgICAgdmlkZW9JZDogJ0VsRW1JQmlVdTMwJyxcbiAgICAgIHBsYXllclZhcnM6IHtcbiAgICAgICAgY29udHJvbHM6IDAsXG4gICAgICAgIHNob3dpbmZvOiAwXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG9uUmVhZHk6IG9uUGxheWVyUmVhZHksXG4gICAgICAgIG9uU3RhdGVDaGFuZ2U6IG9uUGxheWVyU3RhdGVDaGFuZ2VcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gb25QbGF5ZXJSZWFkeShldmVudCkge1xuICAgICAgZXZlbnQudGFyZ2V0LnBsYXlWaWRlbygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblBsYXllclN0YXRlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgfVxuICB9KVxuXG5cblxuXG5cblxuXG5cblxuICAudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2hlcmUnKTtcbiAgfSlcblxuXG5cbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnIpO1xuICB9KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgdGFnLnNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpJztcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH07XG4gIH0pO1xuXG59XG4iXX0=
