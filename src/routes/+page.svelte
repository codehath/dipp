<!-- Import the necessary components -->
<script>
</script>

<div class="landing-content">
  <div class="landing-logo">
    <img src="/images/landing-logo.svg" alt="logo" />
  </div>
  <a href="/login">
    <div class="pill">
      <p>Enter</p>
    </div>
  </a>
</div>

<style>
  .landing-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
    color: var(--text-color);
  }
  .landing-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .landing-logo img {
    object-fit: contain;
    max-width: 100%;
    width: 451px;
    filter: var(--image-filter);
  }
  .pill {
    background-color: var(--background-color);
    border-color: var(--primary-blue);
    color: var(--text-color);
  }
</style>
