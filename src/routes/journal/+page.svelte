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
          <p class="success-message">{form.message}</p>
        {/if}

        {#if !userTasks.journal}
          <form action="{path}/?/update" method="post" on:submit|preventDefault={e => {
            const textarea = e.target.querySelector('textarea[name="journal"]');
            if (textarea.value.trim()) {
              e.target.submit();
            }
          }}>
            <input type="hidden" name="id" value={userTasks.id} />
            <div class="journal-container">
              <p class="prompt">{dayData.prompt}</p>
              <textarea name="journal" required />
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
    color: var(--text-white);
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
    border-color: var(--border-color);
    background: var(--radio-buttons);
    width: 100%;
    height: 379px;
    display: flex;
    flex-direction: column;
    align-items: right;
    resize: none;
  }
  textarea::placeholder {
    color: var(--placeholder-color);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  textarea:focus {
    border-style: solid;
    border-color: var(--light-blue);
  }
  textarea:focus::placeholder {
    color: transparent;
  }
  textarea:disabled {
    background-color: var(--disabled-bg);
  }
  textarea:disabled::placeholder {
    color: var(--placeholder-color);
  }
  .left {
    flex-direction: row;
    justify-content: right;
  }
  .success-message {
    color: var(--complete-green);
    font-weight: bold;
  }
  .prompt {
    color: var(--text-white);
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
