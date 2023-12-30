// 1. Acquires current Chrome tab.
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	return await chrome.tabs.query(queryOptions)
		.then((tabs) => {
			return tabs[0];
		})
		.catch((error) => {
			console.log(error);
			return;
		})
}
document.addEventListener('DOMContentLoaded', async function () {
	tab = await getCurrentTab();
});


// 2. Extracts videoUrl from HTML by executing 'parseHTML.js'.
function extractVideo() {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['parseHTML.js']
	}, function () { });
}

// 3. Receives runtime message (including videoUrl) and downloads the video.
chrome.runtime.onMessage.addListener(function (request, sender) {
	if (request.method === 'getVideoUrl') {
		alert('Video Url = ' + request.url);
		chrome.downloads.download({ url: request.url, saveAs: true });
	}
});

window.onload = extractVideo;

