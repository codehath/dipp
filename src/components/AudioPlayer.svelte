<script>
  export let audioFile;
  export let meditated;
  export let medGroup;

  let audioPlayer;
  let path = "meditate";
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;
  let message = meditated
    ? "Thank you for completing today's meditation!"
    : "Click Play to Begin Meditation";
  if (!medGroup) {
    message = meditated
      ? "Thank you for completing today's listening session!"
      : "Click Play to Begin Music";
  }

  let audioContext;
  let audioBuffer;
  let isLoading = true;

  async function initializeAudio() {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      const response = await fetch(audioFile, {
        priority: "high",
        importance: "high",
      });

      const reader = response.body.getReader();
      const chunks = [];
      let totalLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        totalLength += value.length;
      }

      const arrayBuffer = new Uint8Array(totalLength);
      let position = 0;
      for (const chunk of chunks) {
        arrayBuffer.set(chunk, position);
        position += chunk.length;
      }

      audioBuffer = await audioContext.decodeAudioData(arrayBuffer.buffer);
      duration = audioBuffer.duration;
      isLoading = false;
    } catch (error) {
      console.error("Error initializing audio:", error);
      isLoading = false;
    }
  }

  function togglePlayback() {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
    isPlaying = !isPlaying;
  }

  function restartTrack() {
    audioPlayer.pause();
    isPlaying = false;
    audioPlayer.currentTime = 0;
  }

  function updatePlaybackStatus() {
    if (!audioPlayer) return;
    isPlaying = !audioPlayer.paused;
    currentTime = audioPlayer.currentTime;
  }

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  async function submitForm() {
    const formData = new FormData();
    formData.append("meditated", "true");

    const response = await fetch(`${path}/?/update`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      console.log("Task submitted successfully");
    }
  }

  function handleEnded() {
    restartTrack();
    submitForm()
      .then(() => {
        if (medGroup) {
          message = "Thank you for completing today's meditation!";
        } else {
          message = "Thank you for completing today's listening session!";
        }
        setTimeout(() => {
          window.location.href = "/day";
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting task:", error);
      });
  }

  function scrubAudio(event) {
    audioPlayer.currentTime = event.target.value;
  }

  $: {
    updatePlaybackStatus();
  }

  import { onMount } from "svelte";
  onMount(() => {
    initializeAudio();
  });
</script>

<audio
  bind:this={audioPlayer}
  on:loadedmetadata={updatePlaybackStatus}
  on:timeupdate={updatePlaybackStatus}
  on:ended={handleEnded}
>
  <source src={audioFile} type="audio/aac" />
  Your browser does not support the audio element.
</audio>

<h1 class="title">{message}</h1>
<button class="play-button" on:click={togglePlayback}>
  <h1>{isPlaying ? "Pause" : "Play"}</h1>
</button>
<div class="timer-content">
  <div class="timer-text">
    <span class="white-text">{formatTime(currentTime)}</span>
    <span class="restart">/{isLoading ? "--:--" : formatTime(duration)}</span>
  </div>
</div>

<!-- Scrubber for audio -->
<input
  type="range"
  min="0"
  max={duration || 420}
  value={currentTime}
  on:input={scrubAudio}
  class="scrubber"
/>

<style>
  .title {
    padding: 0 0 50px 0;
    text-align: center; /* Center the title */
  }
  h1 {
    font-size: 32px;
    font-style: normal;
    font-weight: 300;
  }
  .play-button {
    display: flex;
    justify-content: center; /* Center the button */
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border-style: solid;
    border-color: #fff;
    padding: 50px 0;
    margin: 0 auto; /* Center the button */
  }
  .timer-content {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
  }
  .restart-button {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border-style: solid;
    border-color: #fff;
    padding: 5px 20px;
    background-color: transparent;
  }
  .restart {
    color: #000;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .white-text {
    color: white;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .scrubber {
    width: 100%; /* Make the scrubber full width */
    margin-top: 20px; /* Add some space above the scrubber */
  }
</style>
