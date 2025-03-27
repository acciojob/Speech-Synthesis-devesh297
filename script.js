// Select required elements
const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voices");
const rate = document.querySelector("[name='rate']");
const pitch = document.querySelector("[name='pitch']");
const textArea = document.querySelector("[name='text']");
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");

let voices = [];

// Function to populate voice options
function loadVoices() {
    voices = synth.getVoices(); // Get available voices
    voiceSelect.innerHTML = '<option value="">Select A Voice</option>';
    
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Ensure voices are loaded properly
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
}

// Function to start speech synthesis
function speakText() {
    if (synth.speaking) {
        synth.cancel(); // Stop any ongoing speech
    }

    const text = textArea.value.trim();
    if (text === "") {
        alert("Please enter some text to speak.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices[voiceSelect.value];

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.rate = rate.value;
    utterance.pitch = pitch.value;

    synth.speak(utterance);
}

// Function to stop speech
function stopSpeech() {
    synth.cancel();
}

// Event Listeners
speakButton.addEventListener("click", speakText);
stopButton.addEventListener("click", stopSpeech);

// Load voices on page load
window.onload = () => {
    setTimeout(loadVoices, 1000);
};
