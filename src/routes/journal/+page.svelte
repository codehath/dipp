<!-- Journal.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import CircularButton from "../../components/CircularButton.svelte";
  export let form;
  export let data; // data returned by the load function
  const user = data.user[0];
  let path = "journal"; // directory of this route

  const dayData = data.dayData;
  const userTasks = data.userTasks;

  // function to redirect on mount
  onMount(() => {
    // redirects to day page if journal completed
    if (userTasks.journal) {
      setTimeout(() => {
        window.location.href = "/day";
      }, 800); // Redirects after 800ms
    }
  });
</script>

{#if user}
  <div class="pop-up light">
    <CircularButton href="/dashboard" position="home" size={30} />
    <CircularButton href="/day" position="back" size={30} />
    <div class="pop-up-content center">
      <div class="container">
        <h1>Daily Journal</h1>
        <h4><strong>{dayData.title}</strong></h4>
        {#if form?.message}
          <p class="message">{form.message}</p>
        {/if}

        {#if !userTasks.journal}
          <form action="{path}/?/update" method="post">
            <input type="hidden" name="id" value={userTasks.id} />
            <div class="journal-container">
              <p class="prompt">{dayData.prompt}</p>
              <textarea name="journal" />
            </div>
            <div class="left">
              <input class="form-button" type="submit" value="Submit" />
            </div>
          </form>
        {:else}
          <div class="enterTask">
            <div class="journal-container">
              <p class="prompt">{dayData.prompt}</p>
              <textarea bind:value={userTasks.journal} name="journal" disabled />
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    flex-direction: column;
    align-items: left;
    width: 100%;
    gap: 20px;
  }
  .container h1,
  h4 {
    color: #fff;
    font-weight: 300;
    text-align: left;
  }
  form {
    gap: 20px;
  }
  textarea {
    padding: 20px;
    border-radius: 20px;
    border-style: solid;
    border-color: #d5d5d5;
    background: #fff;
    width: 100%;
    height: 379px;
    display: flex;
    flex-direction: column;
    align-items: right;
    resize: none;
  }
  textarea::placeholder {
    color: #888888;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  textarea:focus {
    border-style: solid;
    border-color: #5db3e5;
  }
  textarea:focus::placeholder {
    color: transparent;
  }
  textarea:disabled {
    background-color: #ededed; /* Change this to the color you prefer */
  }
  textarea:disabled::placeholder {
    color: #888888; /* Change this to the color you prefer */
  }
  .left {
    flex-direction: row;
    justify-content: right;
  }
  .message {
    color: white;
    font-size: 16px;
    font-weight: 300;
    width: 70%;
    margin: 20px 0 20px 0;
  }
  .prompt {
    color: #fff;
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 10px;
  }
  .journal-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
</style>
