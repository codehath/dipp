<script>
  import { enhance } from "$app/forms";
  export let form;
  let showPassword = false;
</script>

<div class="container">
  <form action="?/login" method="POST" use:enhance data-sveltekit-reload>
    {#if form?.credentials}
      <p class="error">Invalid username or password</p>
    {/if}

    {#if form?.serverError}
      <p class="error">An unexpected error occurred. Please try again later.</p>
    {/if}

    <div class="input-div">
      <input class="input-box" id="username" name="username" type="text" placeholder="Username" required />
    </div>

    <div class="input-div">
      <input class="input-box" id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Password" required />
      <button type="button" class="password-toggle" on:click={() => (showPassword = !showPassword)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          {#if showPassword}
            <!-- Show crossed-out eye icon when password is visible -->
            <path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
            />
            <line x1="1" y1="1" x2="23" y2="23" />
          {:else}
            <!-- Show regular eye icon when password is hidden -->
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          {/if}
        </svg>
      </button>
    </div>

    <button class="login-button" type="submit">Log in</button>
  </form>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 178px);
    width: 100%;
  }

  form {
    margin: auto;
    width: 100%;
    max-width: 450px;
    padding: 3.5rem;
    background: var(--background-color);
    border-radius: 50px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .error {
    color: var(--error-color);
    font-size: 1rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .input-div {
    position: relative;
    margin-bottom: 1.25rem;
  }

  .input-box {
    width: 100%;
    height: 45px;
    padding: 0 1.5rem;
    border: 2px solid var(--border-color);
    border-radius: 22.5px;
    font-size: 1.125rem;
    outline: none;
    transition: all 0.2s ease;
    background-color: var(--form-bg);
    color: var(--text-color);
  }

  .input-box::placeholder {
    color: var(--placeholder-color);
    font-size: 1.125rem;
  }

  .input-box:focus {
    border-color: var(--text-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  .password-toggle {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--placeholder-color);
    cursor: pointer;
    padding: 8px;
    transition: color 0.2s ease;
  }

  .password-toggle:hover {
    color: var(--primary-blue);
  }

  .password-toggle svg {
    width: 20px;
    height: 20px;
  }

  .login-button {
    margin-top: 1.25rem;
    width: 100%;
    height: 45px;
    background: var(--medium-blue);
    color: var(--text-white);
    border: none;
    border-radius: 22.5px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 1px;
  }

  .login-button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 640px) {
    form {
      padding: 2.5rem;
    }
  }
</style>
