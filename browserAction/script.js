let sliderNode = document.getElementById("volumeSlider");
let body = document.querySelector("body");
let volumneValue = document.createElement("label");
body.append(volumneValue);

sliderNode.addEventListener("change", e => setValue(e.target.value));

async function setValue(value){
	await browser.storage.local.set({value});
}

async function init(){
	let {value} = browser.local.storage.get("value");
	if(!value){
		value = 0;
	}
	sliderNode.value = value;
	setValue(value);
}

init().catch(e=> console.error(e));


// async function volumeAmplifier(value){
// 	let mVideoElement = document.querySelector('video');
// 	let audioCtx = new AudioCtx();
// 	let source = audioCtx.createMediaElementSource(mVideoElement);
// 	let gainNode = audioCtx.createGain();
// 	gainNode.gain.value = value;
// 	source.connect(gainNode);
// 	gainNode.connect(audioCtx.destination);
// }