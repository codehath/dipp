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
  <div class="dashboard-contents white-text dashboard-container">
    <div class="top-text">
      <div class="day">Day {day}</div>
      <DateTime {dateDay} {dateMonth} />
    </div>
    <div class="bottom-text">Dashboard</div>
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
      <div class="activity">
        <div class="module">
          <div class="grid-item">
            <p class="module-pill">Module {module + 1}</p>
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
  .module-pill {
    font-size: 20px;
    color: var(--text-color);
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    width: 100%;
    max-width: 190px;
    height: 80%;
    max-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
