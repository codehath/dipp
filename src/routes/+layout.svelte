<script>
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { SunMoon } from "lucide-svelte";

  let PUBLIC_DEV_MODE = "false";

  try {
    const env = import("$env/static/public");
    PUBLIC_DEV_MODE = env.PUBLIC_DEV_MODE;
    PUBLIC_TEST_MS = env.PUBLIC_TEST_DATE;
  } catch (e) {
    // Environment variables not available, using defaults
    console.log("Using default development settings");
  }

  export let data; // data returned by the load function
  let user;

  // Reactive statement to update `user` based on `data.user`
  $: user = data?.user ? data.user[0] : null;

  // Function to calculate milliseconds until next midnight
  function getMsUntilMidnight() {
    if (PUBLIC_DEV_MODE === "true") {
      return parseInt(PUBLIC_TEST_MS, 10); // Use test milliseconds if in dev mode
    }

    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    console.log("Ms till Midnight:", midnight - now);
    return midnight - now;
  }

  // Set up the midnight refresh
  onMount(() => {
    const timeout = setTimeout(async () => {
      await goto("/dashboard", { invalidateAll: true }); // This will reload data
    }, getMsUntilMidnight());

    return () => clearTimeout(timeout); // Cleanup on component unmount
  });
</script>

<svelte:head>
  <title>{$page.data.title ?? "DIPP Trial"}</title>
</svelte:head>

<div class="main-container">
  <nav class="navbar">
    <div class="header-logo">
      <a href="/dashboard" data-sveltekit-reload>
        <img class="dipp-svg" src="/images/header-logo.svg" alt="logo" />
      </a>
      <p class="logo-text">Digital Intervention for Psychedelic Preparedness</p>
    </div>
    <div class="container">
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li>
            <button class="theme-toggle" on:click={() => window.toggleTheme()}>
              <SunMoon size={20} />
            </button>
          </li>
          <li>
            <a class="about-pill" href="/about" data-sveltekit-reload><p class="about">About</p></a>
          </li>
          {#if user}
            <li>
              <div class="logout-pill">
                <form class="logout" action="/logout" method="POST" use:enhance data-sveltekit-reload>
                  <button type="submit">Log out</button>
                </form>
              </div>
            </li>
          {/if}
        </ul>
      </div>

      <!-- Responsive -->
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
  </nav>

  <div class="slot-container">
    <slot />
  </div>
</div>

<!-- Displays page data at bottom of page - ONLY FOR DEBUGGING-->
<!-- <pre>
  {JSON.stringify($page, null, 2)}
</pre> -->

<style>
  /* boostrap adjustments for hamburger menu */
  .navbar {
    display: flex;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    position: relative;
    min-height: 150px;
    margin-bottom: 0px;
    border: 1px solid transparent;
  }
  .logo-text {
    width: 480px;
  }
  .icon-bar {
    background-color: var(--text-color);
  }
  .container {
    display: flex;
    flex-direction: row;
    justify-content: right;
    padding: 0;
    margin: 0 0 0 auto;
  }
  .nav > li > a {
    position: relative;
    display: flex;
    margin: 3px;
  }
  .navbar-nav {
    margin: 0px;
    display: flex;
    align-items: center;
  }
  .navbar-toggle {
    position: relative;
    float: left;
    margin: 0 8px;
    background-color: transparent;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  .navbar-collapse {
    padding: 0 10px;
    border-top: none;
  }
  .nav > li > a:focus,
  .nav > li > a:hover {
    text-decoration: none;
    background-color: inherit;
  }

  .main-container {
    display: block;
    min-height: 100svh;
    width: 100svw;
  }
  .slot-container {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 178px);
    max-width: 100%;
    padding: 0 20px 20px 20px;
  }
  .header-logo {
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 20px;
    margin-right: auto;
  }
  .header-logo img {
    filter: var(--image-filter);
  }

  .dipp-svg {
    padding: 10px;
  }
  .logo-text {
    color: var(--text-color);
    font-size: 20px;
    font-weight: 500;
  }
  @media (max-width: 1000px) {
    .logo-text {
      display: none;
    }
  }
  .about-pill {
    width: 101.8px;
    height: 43px;
    border-radius: 38px;
    border-style: solid;
    border-color: var(--text-color);
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .logout-pill {
    width: 101.8px;
    height: 43px;
    border-radius: 38px;
    border-style: solid;
    border-color: var(--text-color);
    background-color: var(--text-color);
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .about {
    color: var(--text-color);
    font-size: 16px;
    font-weight: 500;
  }
  .logout button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  .logout {
    color: var(--logout-color);
    font-size: 16px;
    font-weight: 500;
  }
  .theme-toggle {
    padding: 8px;
    font-size: 1.5rem;
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: 50%;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
  }
  .theme-toggle:hover {
    background: var(--form-bg);
  }

  @media (max-width: 768px) {
    .navbar-nav {
      display: block;
      margin: 5px 0;
    }
    .theme-toggle {
      margin: 5px 0;
    }
  }
</style>
