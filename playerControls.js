
let videoElement = document.getElementById("videoElement");
let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let progressBar = document.getElementById("progressBar");


videoElement.removeAttribute("controls");
document.getElementById("controlsWrapper").style.display = "flex";

videoElement.addEventListener('loadedmetadata', () => {progressBar.setAttribute('max', videoElement.duration);});

videoElement.addEventListener("playing", () => {
  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});


videoElement.addEventListener("waiting", () => {
  progressBar.classList.add("timeline-loading");
});
videoElement.addEventListener("canplay", () => {
  progressBar.classList.remove("timeline-loading");
});

videoElement.addEventListener("ended", () => {
  playButton.style.backgroundImage = "url('./icons/play.svg')";
});

function playPause()

  if (videoElement.paused || videoElement.ended) {
videoElement.play();
  
    playButton.style.backgroundImage = "url('./icons/pause.svg')";
  } else {
    videoElement.pause();

    playButton.style.backgroundImage = "url('./icons/play.svg')";
  }


playButton.addEventListener('click', playPause);

videoElement.addEventListener('click', playPause);

videoElement.addEventListener('timeupdate', () => {

  progressBar.value = videoElement.currentTime;
});


function scrubToTime(e){
  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}

progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});


function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}

function logEvent(e){
  console.log(e);
}

/* After adjusting the coding from its original state, it can be seen that various elements can be changed and played around with on the media player, such as volume, screen size, and as well
as the ability to download the video. The features are commonly found within standard media players online. As mentioned in the style.css document, the sizing adjustment of the video allows for it to be a more immersive experience
for the audience. The adjustment of the playerControls.js code also now allows for the control bar at the bottom of the page to disappear when not being adjusted with. I believe this allows
for better engagement with the visual content being displayed in the music video. */
