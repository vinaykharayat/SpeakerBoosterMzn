let mVideoElement = document.querySelector('video');
let audioCtx = new AudioContext();
let source = audioCtx.createMediaElementSource(mVideoElement);
let gainNode = audioCtx.createGain();

browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && 'value' in changes) {
        increaseVolume(changes.value.newValue);
    }

    if (area === 'local' && 'status' in changes) {
        speakerBoosterStatus(changes.status.newValue);
    }
});

function increaseVolume(value) {
    if (value === undefined) {
        gainNode.gain.value = 0;
    } else {
        gainNode.gain.value = value;
    }
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}


function speakerBoosterStatus(status) {
    if (status === false) {
        gainNode.gain.value = 1;
    } else {
        browser.storage.local.get('value').then(result => increaseVolume(result.value));
    }
}

browser.storage.local.get('value').then(result => increaseVolume(result.value));
browser.storage.local.get('status').then(result => speakerBoosterStatus(result.value));