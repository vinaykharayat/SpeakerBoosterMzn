let sliderNode = document.getElementById("volumeSlider");
let body = document.querySelector("body");

let volumneValue = document.createElement("label");
let mVideoElement = document.querySelector('video');
body.append(volumneValue);
volumneValue.innerText = sliderNode.value + "%";
sliderNode.addEventListener("change", e => setValue(e.target.value));

async function setValue(value){
	await browser.storage.local.set({value});
	volumneValue.innerText = value *10 + "%";
	let value1 = browser.storage.local.get("value");
	value1.then((value)=>{
		volumneValue.innerText = value.value *10 + "%";
	});
}

async function init(){
	let value = browser.storage.local.get("value");
	value.then((value)=>{
		if(!value.value){
			value.value = mVideoElement.volume;
			console.log(value.value);
		}
		sliderNode.value = value.value;
		setValue(value.value);

	});
}
init().catch(e=> console.error(e));
