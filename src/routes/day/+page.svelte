<!-- Day.svelte -->
<script>
  export let data; // data returned by the load function
  const user = data.user[0];
  const module = data.module;
  const userTasks = data.userTasks;
  const day = data.day;

  let taskCompletion;
  let tasks;
  let progressBar;
  let activityButtons;

  taskCompletion = [
    !!userTasks.meditation,
    !!userTasks.mood_id,
    !!userTasks.journal,
  ];
  tasks = { meditate: 0, mood: 1, journal: 2 };

  progressBar = {
    meditation: "activity-pill",
    mood_id: "activity-pill",
    journal: "activity-pill",
  };
  activityButtons = {
    meditate: "activity dark",
    mood: "activity medium",
    journal: "activity light",
  };

  Object.keys(progressBar).forEach((key) => {
    if (userTasks[key]) {
      progressBar[key] = "activity-pill light";
    }
  });

  if (!userTasks.meditation) {
    activityButtons.mood += " inactive";
    activityButtons.journal += " inactive";
  } else if (!userTasks.mood_id) {
    activityButtons.journal += " inactive";
    activityButtons.meditate += " complete";
  } else if (!userTasks.journal) {
    activityButtons.meditate += " complete";
    activityButtons.mood += " complete";
  } else {
    activityButtons.meditate += " complete";
    activityButtons.mood += " complete";
    activityButtons.journal += " complete";
  }

  // Activity configuration
  const activities = [
    {
      title: user.meditation ? 'Meditate' : 'Music',
      link: user.meditation ? '/listen/meditate' : '/listen/music',
      buttonClass: 'meditate',
      imageSrc: '/images/enter-button-1.svg',
      condition: true // Always enabled
    },
    {
      title: 'Mood',
      link: '/mood',
      buttonClass: 'mood',
      imageSrc: '/images/enter-button-2.svg',
      condition: userTasks.meditation
    },
    {
      title: 'Journal',
      link: '/journal',
      buttonClass: 'journal',
      imageSrc: '/images/enter-button-3.svg',
      condition: userTasks.mood_id
    }
  ];
</script>

{#if user}
  <div class="dashboard-container module-colour">
    <!-- Use this to centre if inline doesnt work -->
    <!-- <img
      class="dashboard-image"
      src="/images/module-dashboard-shape.svg"
      alt="dashboard-shape"
    /> -->
    <svg class="dashboard-shape" width="1086" height="330" viewBox="0 0 1086 330" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_418_36)">
        <path d="M15 31C15 19.9543 23.9543 11 35 11H1051C1062.05 11 1071 19.9543 1071 31V291C1071 302.046 1062.05 311 1051 311H35C23.9543 311 15 302.046 15 291V31Z" fill="var(--logout-color)"/>
        <path d="M35 11.5H1051C1061.77 11.5 1070.5 20.2304 1070.5 31V291C1070.5 301.77 1061.77 310.5 1051 310.5H35C24.2304 310.5 15.5 301.77 15.5 291V31C15.5 20.2304 24.2304 11.5 35 11.5Z" stroke="var(--border-color)"/>
      </g>
      <defs>
        <filter id="filter0_d_418_36" x="0.2" y="0.2" width="1085.6" height="329.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="7.4"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_418_36"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_418_36" result="shape"/>
        </filter>
      </defs>
    </svg>
    <div class="dashboard-contents">
      <a class="home-button" href="/dashboard"
        ><img src="/images/home-circle-button.svg" alt="home button" /></a
      >
      <div class="module-top-button">
        <div class="module-info-pill">
          <a class="module-info-button" href="/module?view=instructions">
            <img
              class="module-icon"
              src="/images/meditation-icon.svg"
              alt="meditation-icon"
            />
            <p class="module-info-text">Instructions</p>
          </a>
          <a class="module-info-button" href="/module?view=tasks">
            <img
              class="module-icon"
              src="/images/tasks-icon.svg"
              alt="tasks-icon"
            />
            <p class="module-info-text">Tasks</p>
          </a>
        </div>
      </div>
      <div class="bottom-text">Module {module.id} - {module.name}</div>
    </div>
  </div>

  <div class="progress-container">
    <div class="progress-section" style="width: 100%">
      <p class="progress-text">Day {day}</p>
      <div class="activity-bar">
        {#each Object.entries(progressBar) as [task, completion]}
          <div class={completion}></div>
        {/each}
      </div>
      <p class="progress-text">
        {taskCompletion.filter((value) => value === true)
          .length}/{taskCompletion.length}
      </p>
    </div>
  </div>

  <div class="triplet-container padding">
    {#each activities as {title, link, buttonClass, imageSrc, condition}}
      <div class={activityButtons[buttonClass]}>
        <h1>{title}</h1>
        {#if condition}
          <a href={link}>
            <div class="activity-contents">
              <img
                class="enter-button"
                src={imageSrc}
                alt="enter-button"
              />
            </div>
          </a>
        {:else}
          <div class="activity-contents">
            <img
              class="enter-button"
              src={imageSrc}
              alt="enter-button"
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .dashboard-shape{
    width: 100%;
    height: auto;
    max-height: 307px;
  }
  .activity {
    margin: 5%;
    position: relative;
    height: 394px;
    max-height: 100%;
    border-style: solid;
    border-color: var(--primary-blue);
    border-radius: 20px;
  }
  .activity-contents {
    padding: 15px 20px 10px 20px;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
  }
  .activity-contents img {
    max-width: 100%;
    width: 240px;
  }
  .inactive {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .complete {
    background-color: var(--complete-green);
    opacity: 0.5;
  }
  h1 {
    font-size: 36px;
    font-weight: 400;
    line-height: normal;
    padding: 20px;
  }
  .module-top-button {
    flex-direction: column;
    align-items: center;
    margin-bottom: auto;
    padding: 10px;
  }
  .module-info-pill {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: solid var(--text-color);
    /* background-color: transparent; */
    border-radius: 50px;
    padding: 20px 20px 20px 40px;
    font-size: 14px;
  }
  .module-info-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  .module-info-text {
    padding: 0 20px 0 10px;
  }
  .module-icon {
    width: 20px;
  }
  .home-button {
    position: absolute;
    top: 16px;
    right: 20px;
    z-index: 1000;
  }
  .home-button img {
    object-fit: cover;
    width: 80px;
  }
  
  @media (max-width: 768px) {
    .dashboard-container {
      background-color: var(--logout-color);  
    }
    .dashboard-image {
      background-color: var(--logout-color);  
    }
    .activity {
      margin: 4% 3%;
    }
    .home-button {
      display: none;
    }
  }
</style>
