// Elements
const audioPlayer = document.getElementById('audio-player');
const prevBankBtn = document.getElementById('prev-bank');
const nextBankBtn = document.getElementById('next-bank');
const currentBankDisplay = document.getElementById('current-bank');
const sampleBanks = document.querySelectorAll('.sample-bank');
const sayItBtn = document.getElementById('say-it');
const speechTextArea = document.getElementById('speech-text');

// State
let currentBankIndex = 0;
const totalBanks = sampleBanks.length;

// Initialize the soundboard
function initSoundboard() {
    // Set up sample bank navigation
    updateNavigationButtons();
    
    // Add event listeners to all sample elements
    const samples = document.querySelectorAll('.sample');
    samples.forEach(sample => {
        sample.addEventListener('click', () => {
            playSample(sample.getAttribute('data-sample'));
        });
    });
    
    // Add event listeners for navigation
    prevBankBtn.addEventListener('click', navigatePreviousBank);
    nextBankBtn.addEventListener('click', navigateNextBank);
    
    // Set up text-to-speech functionality
    sayItBtn.addEventListener('click', speakText);
    
    // Load sample durations dynamically
    loadAudioDurations();
}

// Function to play an audio sample
function playSample(sampleFile) {
    // Set the source of the audio player
    audioPlayer.src = `audio/${sampleFile}`;
    
    // Play the audio
    audioPlayer.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Could not play audio. Make sure the audio file exists and is in the correct format.');
    });
}

// Function to navigate to previous bank
function navigatePreviousBank() {
    if (currentBankIndex > 0) {
        showBank(currentBankIndex - 1);
    }
}

// Function to navigate to next bank
function navigateNextBank() {
    if (currentBankIndex < totalBanks - 1) {
        showBank(currentBankIndex + 1);
    }
}

// Function to show a specific bank
function showBank(index) {
    // Hide all banks
    sampleBanks.forEach(bank => {
        bank.style.display = 'none';
    });
    
    // Show the selected bank
    sampleBanks[index].style.display = 'grid';
    
    // Update current bank index
    currentBankIndex = index;
    
    // Update the bank display
    currentBankDisplay.textContent = index + 1;
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Function to update navigation buttons visibility
function updateNavigationButtons() {
    // Hide/show previous button
    if (currentBankIndex === 0) {
        prevBankBtn.style.visibility = 'hidden';
    } else {
        prevBankBtn.style.visibility = 'visible';
    }
    
    // Hide/show next button
    if (currentBankIndex === totalBanks - 1) {
        nextBankBtn.style.visibility = 'hidden';
    } else {
        nextBankBtn.style.visibility = 'visible';
    }
}

// Function to handle text-to-speech
function speakText() {
    const text = speechTextArea.value.trim();
    
    if (text) {
        // Use the Web Speech API for text-to-speech
        const speech = new SpeechSynthesisUtterance(text);
        
        // Optionally customize the voice
        const voices = window.speechSynthesis.getVoices();
        // Try to find a UK English voice for Alan Partridge
        const ukVoice = voices.find(voice => voice.lang === 'en-GB');
        if (ukVoice) {
            speech.voice = ukVoice;
        }
        
        // Speak the text
        window.speechSynthesis.speak(speech);
    }
}

// Function to load audio durations dynamically
function loadAudioDurations() {
    // This is a mock function as we can't actually load the audio files in this code example
    // In a real implementation, you would load each audio file and read its duration
    console.log('Loading audio durations...');
    // The durations are already set in the HTML, but in a real implementation
    // you would update them here after loading the audio files
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initSoundboard);

// Preload audio for better performance
function preloadAudio() {
    const samples = document.querySelectorAll('.sample');
    samples.forEach(sample => {
        const audio = new Audio();
        audio.src = `audio/${sample.getAttribute('data-sample')}`;
    });
}

// Preload voices for text-to-speech
function preloadVoices() {
    // Some browsers need this event to load voices
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log(`Loaded ${voices.length} voices for text-to-speech`);
    };
    
    // Force loading of voices
    window.speechSynthesis.getVoices();
}

// Call preload functions when the page loads
window.addEventListener('load', () => {
    preloadAudio();
    preloadVoices();
});