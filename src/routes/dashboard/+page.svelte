<script>
  import DateTime from "../../components/DateTime.svelte";

  export let data; // data returned by the load function
  const user = data.user[0];
  const module = data.module;
  const dateDay = data.dateDay;
  const dateMonth = data.dateMonth;
  const day = data.day;
  const daysCompleted = data.daysCompleted;
</script>

{#if user}
  <div class="dashboard-container dashboard-colour">
    <svg class="dashboard-image" width="1088" height="332" viewBox="0 0 1088 332" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_538_18)">
        <path
          d="M966.914 312H931.5H36C24.9543 312 16 303.046 16 292V32C16 20.9543 24.9543 12 36 12H1052C1063.05 12 1072 20.9543 1072 32V205.733L1071.74 213.553C1071.35 225.146 1061.14 233.67 1049.57 234.527C1008.21 237.592 994.706 265.647 986.693 296.344C984.321 305.433 976.307 312 966.914 312Z"
          fill="var(--light-blue)"
        />
        <path
          d="M966.914 312H931.5H36C24.9543 312 16 303.046 16 292V32C16 20.9543 24.9543 12 36 12H1052C1063.05 12 1072 20.9543 1072 32V205.733L1071.74 213.553C1071.35 225.146 1061.14 233.67 1049.57 234.527C1008.21 237.592 994.706 265.647 986.693 296.344C984.321 305.433 976.307 312 966.914 312Z"
          stroke="var(--primary-blue)"
        />
      </g>
      <circle cx="1044.5" cy="284.5" r="27" fill="var(--light-blue)" stroke="var(--primary-blue)" />
      <defs>
        <filter id="filter0_d_538_18" x="0.7" y="0.7" width="1086.6" height="330.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="7.4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_538_18" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_538_18" result="shape" />
        </filter>
      </defs>
    </svg>
    <div class="dashboard-contents white-text">
      <div class="top-text">
        <div class="day">Day {day}</div>
        <DateTime {dateDay} {dateMonth} />
      </div>
      <div class="bottom-text">Dashboard</div>
    </div>
  </div>

  <div class="progress-container">
    <div class="progress-section">
      <p class="progress-text">Day:</p>
      <div class="progress-bar">
        {#each Array(day) as _, i}
          <div class="progress-pill light"></div>
        {/each}
        {#each Array(21 - day) as _, i}
          <div class="progress-pill"></div>
        {/each}
      </div>
      <p class="progress-text">{day}/21</p>
    </div>
    <div class="progress-section">
      <p class="progress-text">Module:</p>
      <div class="modules-bar">
        {#each Array(module.id) as _, i}
          <div class="modules-pill light"></div>
        {/each}
        {#each Array(3 - module.id) as _, i}
          <div class="modules-pill"></div>
        {/each}
      </div>
      <p class="progress-text">{module.id}/3</p>
    </div>
  </div>

  <div class="triplet-container">
    {#each Array(3) as _, module}
      <div class="module-container">
        <svg class="module-shape" viewBox="0 0 365 447" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_432_148)">
            <path
              d="M16 113V389.5C16 410.487 33.0132 427.5 54 427.5H311C331.987 427.5 349 410.487 349 389.5V50C349 29.0132 331.987 12 311 12H195.5C178.103 12 164 26.103 164 43.5C164 60.897 149.897 75 132.5 75H54C33.0132 75 16 92.0132 16 113Z"
              fill="var(--form-bg)"
            />
            <path
              d="M16 113V389.5C16 410.487 33.0132 427.5 54 427.5H311C331.987 427.5 349 410.487 349 389.5V50C349 29.0132 331.987 12 311 12H195.5C178.103 12 164 26.103 164 43.5C164 60.897 149.897 75 132.5 75H54C33.0132 75 16 92.0132 16 113Z"
              stroke="var(--primary-blue)"
            />
          </g>
          <defs>
            <filter id="filter0_d_432_148" x="0.7" y="0.7" width="363.6" height="446.1" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="7.4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_432_148" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_432_148" result="shape" />
            </filter>
          </defs>
        </svg>
        <div class="module">
          <div class="module-pill {module === 0 ? 'light' : module === 1 ? 'medium' : 'dark'}">
            <p class="module-pill-text">Module {module + 1}</p>
          </div>
          {#each Array(7) as _, i}
            <div class="grid-item">
              {#if module * 7 + i + 1 === day}
                <a class="day-pill light" href="/day">
                  <p class="day-pill-text">
                    Day {module * 7 + i + 1}
                  </p>
                </a>
              {:else}
                <div class="day-pill {module * 7 + i + 1 < day && daysCompleted.includes(module * 7 + i + 1) ? 'light inactive' : module * 7 + i + 1 < day ? 'inactive' : 'white'}">
                  <p class="day-pill-text">
                    Day {module * 7 + i + 1}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .dashboard-image {
    width: 100%;
    height: auto;
    max-height: 307px;
  }
  .module-container {
    position: relative;
  }
  .module-container .module-shape {
    padding: 3%;
  }
  .module {
    padding: 6%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: top;
    justify-items: stretch;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-gap: 0px;
  }
  .module-pill {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    width: 70%;
    max-width: 150px;
    height: 50%;
    max-height: 60px;
    flex-shrink: 0;
    border-radius: 38px;
    border-style: solid;
    border-color: var(--primary-blue);
  }
  .module-pill-text {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .grid-item {
    position: relative;
    padding: 10%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .day-pill {
    width: 100%;
    max-width: 190px;
    height: 80%;
    max-height: 80px;
    border-radius: 38px;
    border-style: solid;
    border-color: var(--primary-blue);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .inactive {
    cursor: not-allowed;
    /* background-color: white; */
    opacity: 0.5;
  }
  .day-pill-text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
  }
</style>
