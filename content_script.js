browser.storage.onChanged.addListener((changes, area) =>{
	if(area === 'local' && 'value' in changes){
		increaseVolume(changes.value.newValue);
	}
});
function increaseVolume(value){
	let mVideoElement = document.querySelector('video');
	// window.alert(mVideoElement);
	let audioCtx = new AudioContext();
	let source = audioCtx.createMediaElementSource(mVideoElement);
	let gainNode = audioCtx.createGain();
	gainNode.gain.value = value;
	source.connect(gainNode);
	gainNode.connect(audioCtx.destination);
}

browser.storage.local.get('value').then(result=> increaseVolume(result.value));