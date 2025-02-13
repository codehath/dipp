<script>
  export let href;
  export let position = "back"; // "back", "home", or "close"
  export let size = 30;
  export let variant = ""; // for page-specific positioning
</script>

<a class="circular-button {position} {variant}" {href}>
  {#if position === "back"}
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="m4 8l-.707.707L2.586 8l.707-.707zm5 12a1 1 0 1 1 0-2zm-.707-6.293l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 7h10.5v2H4zm10.5 13H9v-2h5.5zm6.5-6.5a6.5 6.5 0 0 1-6.5 6.5v-2a4.5 4.5 0 0 0 4.5-4.5zM14.5 7a6.5 6.5 0 0 1 6.5 6.5h-2A4.5 4.5 0 0 0 14.5 9z"
      />
    </svg>
  {:else if position === "home"}
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
    </svg>
  {/if}
</a>

<style>
  .circular-button {
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--circle-button-color);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border-color);
  }

  .circular-button:hover {
    transform: scale(1.1);
  }

  .circular-button svg {
    width: 30px;
    height: 30px;
    color: var(--placeholder-color);
  }

  .back {
    top: 30px;
    left: 30px;
  }

  .home {
    top: 30px;
    right: 30px;
  }

  .close {
    top: 20px;
    left: 20px;
  }

  .day-home {
    right: 35px;
  }
</style>
