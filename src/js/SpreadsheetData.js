export function get(key, worksheet) {

  var spreadsheetUrl = `https://spreadsheets.google.com/feeds/list/${key}/${worksheet}/public/values?alt=json`;
  var proxyUrl = `https://jsonp.afeld.me/?callback=_gotSpreadsheetData&url=${spreadsheetUrl}`;

  var tag = document.createElement('script');
  tag.src = proxyUrl;
  document.head.appendChild(tag);

  return new Promise((resolve, reject) => {
    window._gotSpreadsheetData = function(data) {
      resolve(data);
    };
  });

}


export function parse(data) {

  var dance = {
    name: data.feed.title.$t,
    sections: []
  };

  data.feed.entry.forEach((entry) => {
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
