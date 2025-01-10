// Access the webcam and start video feed
const video = document.getElementById('webcam');
const emotionDisplay = document.getElementById('detectedEmotion');
const recommendations = document.getElementById('musicRecommendations');

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((error) => {
        console.error("Error accessing webcam:", error);
        alert("Camera access is required for emotion detection.");
    });

// Dummy function for emotion detection
document.getElementById('detectEmotionButton').addEventListener('click', () => {
    // Simulate emotion detection
    const emotions = ['Happy', 'Sad', 'Angry', 'Neutral'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    emotionDisplay.textContent = randomEmotion;
});

// Dummy function for music recommendation
// document.getElementById('recommendMusicButton').addEventListener('click', () => {
//     const emotion = emotionDisplay.textContent;

//     let musicList = '';
//     if (emotion === 'Happy') {
//         musicList = '<p>1. Happy Song - Artist A</p><p>2. Joyful Tune - Artist B</p>';
//     } else if (emotion === 'Sad') {
//         musicList = '<p>1. Blue Mood - Artist C</p><p>2. Tears in Rain - Artist D</p>';
//     } else {
//         musicList = '<p>1. Chill Beats - Artist E</p><p>2. Ambient Vibes - Artist F</p>';
//     }

//     recommendations.innerHTML = musicList;
// });


document.addEventListener('DOMContentLoaded', () => {
    const recommendMusicButton = document.getElementById('recommendMusicButton');
    const musicRecommendations = document.getElementById('musicRecommendations');
    const detectedEmotionDisplay = document.getElementById('detectedEmotion');
    const loadingIndicator = document.getElementById('loadingIndicator'); // Get the loading indicator
    
    const musicData = {
        happy: [
            { title: "Walking on Sunshine", artist: "Katrina & The Waves", src: "path/to/happy1.mp3" },
            { title: "Good Vibrations", artist: "The Beach Boys", src: "path/to/happy2.mp3" },
            { title: "Random 3", artist: "The Beach Boys", src: "path/to/happy2.mp3" }
        ],
        sad: [
            { title: "Hurt", artist: "Johnny Cash", src: "path/to/sad1.mp3" },
            { title: "Someone Like You", artist: "Adele", src: "path/to/sad2.mp3" },
            { title: "Idk", artist: "The Beach Boys", src: "path/to/happy2.mp3" }
        ],
        angry: [
            { title: "Break Stuff", artist: "Limp Bizkit", src: "path/to/angry1.mp3" },
            { title: "Killing in the Name", artist: "Rage Against the Machine", src: "path/to/angry2.mp3" },
            { title: "Something", artist: "The Beach Boys", src: "path/to/happy2.mp3" }
        ],
        neutral: [
            { title: "Clair de Lune", artist: "Debussy", src: "path/to/neutral1.mp3" },
            { title: "Watermark", artist: "Enya", src: "path/to/neutral2.mp3" },
            { title: "change this", artist: "The Boys", src: "path/to/happy2.mp3" }
        ],
        //add more if needed
    };

    recommendMusicButton.addEventListener('click', () => {
        musicRecommendations.classList.toggle('hidden');

        if (!musicRecommendations.classList.contains('hidden')) {
            // Show the loading indicator
            loadingIndicator.classList.remove('hidden');

            // Simulate a delay (replace with actual processing time)
            setTimeout(() => {
                musicRecommendations.innerHTML = ''; // Clear previous recommendations

                const detectedEmotion = detectedEmotionDisplay.textContent.toLowerCase();
                const recommendations = musicData[detectedEmotion] || [];

                recommendations.forEach(track => {
                    const trackElement = document.createElement('div');
                    trackElement.classList.add('track', 'bg-white', 'bg-opacity-20', 'p-4', 'rounded-lg', 'shadow-lg', 'mb-2');
                    trackElement.innerHTML = `
                        <p>Track: ${track.title}</p>
                        <p>Artist: ${track.artist}</p>
                        <audio controls class="w-full mt-2">
                            <source src="${track.src}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    `;
                    musicRecommendations.appendChild(trackElement);
                });

                // Hide the loading indicator
                loadingIndicator.classList.add('hidden');
            }, 1000); // Simulate a 1-second delay
        }
    });
});