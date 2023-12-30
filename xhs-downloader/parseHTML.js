// 1. Queries the <video> elements within the current HTML.
var videos = document.getElementsByTagName('video');
if (videos.length === 0) {
    alert('No video element found on the current page');
}

// 2. Sends the runtime message including videoUrl to popup.js to download.
var videoUrl = videos[0].getAttribute('src');

chrome.runtime.sendMessage({
    method: 'getVideoUrl',
    url: videoUrl
});