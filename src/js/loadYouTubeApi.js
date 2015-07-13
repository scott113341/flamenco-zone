export default function() {

  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  return new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = function() {
      resolve();
    };
  });

}
