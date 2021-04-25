let sliderNode = document.getElementById("volumeSlider");
let body = document.querySelector("body");
let volumneValue = document.createElement("label");
body.append(volumneValue);

volumneValue.innerText = sliderNode.value + "%";

sliderNode.addEventListener("change", function(e){
	volumneValue.innerText = sliderNode.value * 10 +"%";
	volumeAmplifier(sliderNode.value);
});

function volumeAmplifier(value){
	let mVideoElement = document.querySelector('video');
	let audioCtx = new AudioCtx();
	let source = audioCtx.createMediaElementSource(mVideoElement);
	let gainNode = audioCtx.createGain();
	gainNode.gain.value = 2;
	source.connect(gainNode);
	gainNode.connect(audioCtx.destination);
}