<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { truncateWords } from "$lib/utils/clientHelperFunctions";
  import CircularButton from "../../components/CircularButton.svelte";

  export let data; // data returned by the load function
  const user = data.user[0];
  const module = data.module;
  const tasks = data.tasks;
  const weeklytasks = data.weeklyTasks;
  const path = "module"; // directory of this route

  let view = $page.url.searchParams.get("view") || "";
  let selectedButton = view.includes("-") ? view.split("-")[0] : view;
  let parameterID = view.includes("-") ? view.split("-")[1] : null;
  let selectedTask = null;
  let completed = false;
  let updateForm;

  let moduleTasks = tasks.filter((task) => task.module_id === module.id);

  // checks whether there is a task in the weeklyTasks table that corresponds to this task and has been completed
  function isTaskComplete(task) {
    return weeklytasks.some((weeklytask) => weeklytask.task_id == task.id && weeklytask.complete_timestamp);
  }

  // updates query parameters of current page when toggle buttons are clicked or tasks are expanded
  function updateQueryParameters(view, id = null) {
    const query = new URLSearchParams($page.url.searchParams.toString());
    query.set("view", id ? `${view}-${id}` : view);
    goto(`?${query.toString()}`);
  }

  // sends a request to the server to add new entry to the weeklyTasks table, where start_timestamp will be set
  async function addWeeklyTask(taskID) {
    const formData = new FormData();
    formData.append("taskID", taskID);

    const response = await fetch(`${path}/?/add`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      console.log("Task submitted successfully");
    }
  }

  // function that deals with task being selected from list
  function selectTask(task) {
    selectedTask = task; // assign task to selectedTask variable in order to render html for task info
    updateQueryParameters("tasks", task.id.toString()); // update query parameters
    addWeeklyTask(selectedTask.id); // create new task entry in db
  }

  // function to handle checkbox change and send update request to server, where complete_timestamp will be set
  function handleCheckBox() {
    if (completed) {
      updateForm.submit();
    }
  }

  // listener which assigns selectedTask to whichever task matches the current query parameter ID
  // (ensures selectedTask is not null when expanded task info page is refreshed)
  $: selectedTask = tasks.find((task) => task.id == parameterID);

  // function to redirect to task info page if user goes straight to URL of expanded task without row existing in table
  onMount(() => {
    if (parameterID !== null) {
      const weeklyTasks = weeklytasks.map((entry) => entry.task_id);
      if (!weeklyTasks.includes(Number(parameterID))) {
        window.location.href = "/module?view=tasks";
      }
    }
  });
</script>

{#if user}
  <div class="pop-up white">
    <CircularButton href="/day" position="back" size={30} />
    <CircularButton href="/dashboard" position="home" size={30} />
    <div class="pop-up-content">
      <div class="button-container">
        <button
          class="form-button"
          type="button"
          class:black={selectedButton === "instructions"}
          class:grey={selectedButton !== "instructions"}
          data-toggle="modal"
          on:click={() => (selectedButton = "instructions")}
          on:click={() => {
            selectedTask = null;
            updateQueryParameters("instructions");
          }}
        >
          <img src="/images/meditation-grey-icon.svg" alt="meditation-grey-icon" />
          <p>Instructions</p>
        </button>
        <button
          type="button"
          class="form-button"
          class:black={selectedButton === "tasks"}
          class:grey={selectedButton !== "tasks"}
          data-toggle="modal"
          on:click={() => (selectedButton = "tasks")}
          on:click={() => updateQueryParameters("tasks")}
        >
          <img src="/images/task-grey-icon.svg" alt="task-grey-icon" />
          <p>Tasks</p>
        </button>
      </div>

      <div class="content">
        {#if selectedButton === "instructions"}
          <h1>Module {module.id}: {module.name}</h1>
          <p>{module.description}</p>

          <p>Your tasks for this week include:</p>
          <ol class="instructions-tasks">
            {#each moduleTasks as task}
              <li><strong>{task.task}</strong></li>
            {/each}
          </ol>
          <p>If you have any concerns or questions as you progress through the material, don't hesitate to reach out to the study coordinators or researchers.</p>
        {:else if selectedButton === "tasks"}
          {#if !selectedTask}
            {#each tasks.slice().sort((a, b) => a.id - b.id) as task, index}
              <div class="task-item" on:click={() => selectTask(task)}>
                <div class="task-number-box {isTaskComplete(task) ? 'completed' : ''}">
                  {index + 1}
                </div>
                <div class="task-item-content">
                  <h2>{task.task}</h2>
                  <p class="goal">
                    {truncateWords(task.goal, 22)}...
                  </p>
                </div>
              </div>
            {/each}
          {:else}
            <div class="task-details">
              <h1>
                {selectedTask.task} ({selectedTask.time} minutes)
              </h1>
              {#if isTaskComplete(selectedTask)}
                <p class="complete"><strong>Task Completed</strong></p>
              {/if}
              <h2>Goal:</h2>
              <p>{selectedTask.goal}</p>

              <h2>Materials Needed:</h2>
              <ul>
                {#each Object.values(selectedTask.materials) as material}
                  <li>{material}</li>
                {/each}
              </ul>
              <h2>Instructions:</h2>
              <ol>
                {#each Object.keys(selectedTask.instructions) as instructionKey}
                  <li>
                    {selectedTask.instructions[instructionKey]}
                  </li>
                  <br />
                {/each}
              </ol>
              {#if selectedTask.specifics}
                <hr />
                {@html selectedTask.specifics}
              {/if}
            </div>
              {#if !isTaskComplete(selectedTask)}
                <form class="block" bind:this={updateForm} action="{path}/?/update" method="post">
                  <label for="completed">Mark as Complete</label>
                  <input type="checkbox" id="completed" name="completed" bind:checked={completed} on:change={handleCheckBox} />
                  <input type="hidden" name="taskID" value={selectedTask.id} />
                </form>
              {/if}
            <button
              class="form-button black"
              on:click={() => {
                selectedTask = null;
                updateQueryParameters("tasks");
              }}>Back</button
            >
          {/if}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
    gap: 20px;
    padding: 10% 10%;
    width: 100%;
    height: 100%;
    min-height: 50svh;
  }
  .task-item {
    border-style: solid;
    border-color: var(--border-color);
    border-radius: 20px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 120px;
    cursor: pointer;
  }
  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 20px;
    font-weight: normal;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 20px;
    }

    h2 {
      font-size: 16px;
    }
  }

  .task-number-box {
    min-width: 60px;
    height: 80%;
    border-style: solid;
    border-color: var(--primary-blue);
    border-radius: 20px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    background-color: var(--weekly-task-number-box);
  }
  .task-item-content {
    flex-direction: column;
    justify-content: top;
    align-items: left;
    margin-right: 10px;
  }
  .goal {
    font-size: 16px;
    color: var(--placeholder-color);
    margin: 5px 0 5px 0;
  }
  .task-details {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
    gap: 20px;
    margin-bottom: 20px;
    width: 100%;
  }
  .task-details {
    font-size: 16px;
  }
  .task-details li {
    margin: 0 20px 0 20px;
  }
  @media (max-width: 768px) {
    .task-details {
      font-size: 12px;
    }
    .task-details ul li {
      margin: 0 0 0 10px;
    }
  }
  .button-container {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  .black {
    color: var(--text-black);
    background-color: var(--text-color);
  }
  .completed {
    background-color: var(--complete-green);
    border-color: var(--complete-border-green);
    opacity: 0.5;
  }
  .complete {
    color: var(--complete-green);
    font-style: italic;
  }
  .block {
    display: block;
    padding: 10px;
  }
  @media (max-width: 1000px) {
    .goal {
      display: none;
    }
  }
  .instructions-tasks {
    padding-left: 20px;
  }
  .task-details h1 {
    font-size: 32px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .task-details h2 {
    font-size: 24px;
    font-weight: 500;
    color: var(--text-color);
    margin: 15px 0 10px 0;
    line-height: 1.3;
  }

  /* Add styling for headings in specifics section */
  :global(.task-details h1),
  :global(.task-details h2),
  :global(.task-details h3),
  :global(.task-details h4) {
    color: var(--text-color);
  }
</style>
