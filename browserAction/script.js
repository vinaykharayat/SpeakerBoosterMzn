let sliderNode = document.getElementById("volumeSlider");
let body = document.querySelector("body");
let volumneValue = document.getElementById("volumePercentage");
let mVideoElement = document.querySelector('video');
let mEnableSpeakerBooster = document.querySelector("#enableSpeakerBooster");
let mVolumeDownButton = document.querySelector("#lowVolume");
let mVolumeUpButton = document.querySelector("#highVolume");
let mLogo = document.querySelector("#logo");

volumneValue.innerText = sliderNode.value + "%";
console.log(mVolumeDownButton);
mVolumeUpButton.addEventListener("click", (e) => {
    let statusValue = browser.storage.local.get("status");
    statusValue.then((value) => {
        mEnableSpeakerBooster.checked = value.status;
    });
    if (mEnableSpeakerBooster.checked) {
        sliderNode.value++;
        setValue(sliderNode.value);
    }
});

mVolumeDownButton.addEventListener("click", (e) => {
    let statusValue = browser.storage.local.get("status");
    statusValue.then((value) => {
        mEnableSpeakerBooster.checked = value.status;
    });
    if (mEnableSpeakerBooster.checked) {
        sliderNode.value--;
        setValue(sliderNode.value);
    }
});

sliderNode.addEventListener("change", e => setValue(e.target.value));
mEnableSpeakerBooster.addEventListener("change", e => setStatus(e.target.checked));

async function setStatus(status) {
    await browser.storage.local.set({ status });
    let statusValue = browser.storage.local.get("status");
    statusValue.then((value) => {
        mEnableSpeakerBooster.checked = value.status;
    });
    if (!mEnableSpeakerBooster.checked) {
        sliderNode.disabled = true;
    } else {
        sliderNode.disabled = false;

    }
}

async function setValue(value) {
    await browser.storage.local.set({ value });
    volumneValue.innerText = value * 10 + "%";
    let value1 = browser.storage.local.get("value");
    value1.then((value) => {
        volumneValue.innerText = value.value * 10 + "%";
    });
    mLogo.style.animation = "shake 0.5s 1";
}

async function init() {
    let value = browser.storage.local.get("value");
    let status = browser.storage.local.get("status");

    status.then((value) => {
        if (!value.status) {
            value.status = false;
        }
        mEnableSpeakerBooster.checked = value.status;
        setStatus(value.status);
    });

    value.then((value) => {
        if (!value.value) {
            value.value = mVideoElement.volume;
        }
        sliderNode.value = value.value;
        setValue(value.value);

    });
}
init().catch(e => console.error(e));