<script>
  import AudioPlayer from "../../components/AudioPlayer.svelte";
  import CircularButton from "../../components/CircularButton.svelte";
  export let data;

  console.log("Data received:", data);

  const user = data.user[0];
  const file = data.file;
  const meditated = data.meditated;
  const medGroup = user.meditation;

  console.log("User data:", user);
  console.log("File data:", file);

  // dynamically import the audio file based on day
  const audioPath = "https://gidvzbginnkwrxhc.public.blob.vercel-storage.com/" + file;

  console.log("Audio path:", audioPath);

  const audioFile = audioPath;

  console.log("Final audio file path:", audioFile);
</script>

{#if user}
  <div class="pop-up dark">
    <CircularButton href="/day" position="back" size={30} />
    <CircularButton href="/dashboard" position="home" size={40} />
    <div class="pop-up-content center">
      <AudioPlayer {audioFile} {meditated} {medGroup} />
    </div>
  </div>
{/if}
