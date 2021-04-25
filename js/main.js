function volumeAmplifier(){
	let mVideoElement = document.querySelector('video');
	let audioCtx = new AudioCtx();
	let source = audioCtx.createMediaElementSource(mVideoElement);
	let gainNode = audioCtx.createGain();
	gainNode.gain.value = 2;
	source.connect(gainNode);
	gainNode.connect(audioCtx.destination);
}

volumeAmplifier();