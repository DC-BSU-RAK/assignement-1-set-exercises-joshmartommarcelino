// Get all the elements we need from the page
const audioPlayer = document.getElementById('audio-player');
const prevBankBtn = document.getElementById('prev-bank');
const nextBankBtn = document.getElementById('next-bank');
const currentBankDisplay = document.getElementById('current-bank');
const sampleBanks = document.querySelectorAll('.sample-bank');
const sayItBtn = document.getElementById('say-it');
const speechTextArea = document.getElementById('speech-text');

// Keeps track of which sample bank is showing
let currentBankIndex = 0;
const totalBanks = sampleBanks.length;

// Set up the soundboard when the page is ready
function initSoundboard() {
    updateNavigationButtons(); // Show/hide buttons depending on the bank

    // Add click events to every sound sample
    const samples = document.querySelectorAll('.sample');
    samples.forEach(sample => {
        sample.addEventListener('click', () => {
            playSample(sample.getAttribute('data-sample'));
        });
    });

    // Add click events for next/previous buttons
    prevBankBtn.addEventListener('click', navigatePreviousBank);
    nextBankBtn.addEventListener('click', navigateNextBank);

    // Set up the button for reading text out loud
    sayItBtn.addEventListener('click', speakText);

    // (Optional) Load audio durations – placeholder only
    loadAudioDurations();
}

// Play the selected sound file
function playSample(sampleFile) {
    audioPlayer.src = `audio/${sampleFile}`; // Set file path
    audioPlayer.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Could not play audio. Check the file and format.');
    });
}

// Go to the previous bank of sound buttons
function navigatePreviousBank() {
    if (currentBankIndex > 0) {
        showBank(currentBankIndex - 1);
    }
}

// Go to the next bank of sound buttons
function navigateNextBank() {
    if (currentBankIndex < totalBanks - 1) {
        showBank(currentBankIndex + 1);
    }
}

// Show the sound bank by its number
function showBank(index) {
    // Hide all banks
    sampleBanks.forEach(bank => {
        bank.style.display = 'none';
    });

    // Show the one we want
    sampleBanks[index].style.display = 'grid';

    // Update the current number
    currentBankIndex = index;
    currentBankDisplay.textContent = index + 1;

    // Update the visibility of next/previous buttons
    updateNavigationButtons();
}

// Show or hide next/previous buttons depending on the bank shown
function updateNavigationButtons() {
    prevBankBtn.style.visibility = currentBankIndex === 0 ? 'hidden' : 'visible';
    nextBankBtn.style.visibility = currentBankIndex === totalBanks - 1 ? 'hidden' : 'visible';
}

// Speak the text from the text box out loud
function speakText() {
    const text = speechTextArea.value.trim();

    if (text) {
        const speech = new SpeechSynthesisUtterance(text); // Create the speech message

        // Try to use a UK English voice if available
        const voices = window.speechSynthesis.getVoices();
        const ukVoice = voices.find(voice => voice.lang === 'en-GB');
        if (ukVoice) {
            speech.voice = ukVoice;
        }

        window.speechSynthesis.speak(speech); // Speak the message
    }
}

// Placeholder function for loading audio durations (not functional here)
function loadAudioDurations() {
    console.log('Loading audio durations...');
}

// Run setup when the page has fully loaded
document.addEventListener('DOMContentLoaded', initSoundboard);

// Preload audio files for faster loading later
function preloadAudio() {
    const samples = document.querySelectorAll('.sample');
    samples.forEach(sample => {
        const audio = new Audio();
        audio.src = `audio/${sample.getAttribute('data-sample')}`;
    });
}

// Load voices for text-to-speech feature
function preloadVoices() {
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log(`Loaded ${voices.length} voices for text-to-speech`);
    };

    // Trigger voice loading
    window.speechSynthesis.getVoices();
}

// Start preloading audio and voices when everything is ready
window.addEventListener('load', () => {
    preloadAudio();
    preloadVoices();
});