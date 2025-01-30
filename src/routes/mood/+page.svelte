<script>
  import { onMount } from "svelte";
  import Graph from "../../components/Graph.svelte";
  import { retrieveAnswers } from "$lib/utils/clientHelperFunctions";

  export let data;
  const user = data.user[0];
  const mood = data.mood;

  const path = "mood"; // directory of this route
  export let form;
  let completed = false;

  // checks if the user has completed the questionnaire
  if (mood) {
    completed = Boolean(mood.q9);
  }

  let currentQuestionIndex = 0;
  let answers;
  let questionnaireForm;
  let questionnaire = [
    { type: "instructions", text: "Please indicate on a 5-point scale how much you agree with the following statements. '1' means 'Not at all' and '5' means 'Very much.'" },
    { type: "scale", statement: "In the last 15 minutes I paid attention to what I was doing, in the present moment.", answer: null },
    { type: "scale", statement: "In the last 15 minutes I noticed physical sensations come and go.", answer: null },
    { type: "scale", statement: "In the last 15 minutes I was aware of what was going on in my body.", answer: null },
    { type: "scale", statement: "In the last 15 minutes I noticed pleasant and unpleasant thoughts and emotions.", answer: null },
    { type: "scale", statement: "In the last 15 minutes I was aware of what was going on in my mind.", answer: null },
    { type: "scale", statement: "In the last 15 minutes I could separate myself from my thoughts and feelings.", answer: null },
    { type: "scale", statement: "In the last 15 minutes I could actually see that I am not my thoughts.", answer: null },
    {
      type: "graph",
      statement:
        "Where does your current mood fit on this graph? The horizontal axis shows how pleasant you feel (negative to positive), and the vertical axis shows your energy level (low to high). For example, feeling happy and energetic would be in the top right.",
      answer: { x: 0, y: 0 }, // Initialize with default values
    },
    { type: "scale", statement: "How accurately do you think you identified your current emotion? 1 (Not at all accurately) to 5 (Extremely accurately)", answer: null },
    { type: "final", text: "Thank you for completing the mood questionnaire. Please submit below." },
  ];

  // Retrieve the answers from the questionnaire
  $: {
    answers = questionnaire
      .map((q) => {
        if (q.type === "scale") {
          return q.answer || 0; // Convert null to 0 for scale questions
        } else if (q.type === "graph") {
          return {
            x: q.answer?.x || 0,
            y: q.answer?.y || 0,
          };
        }
        return null; // For instructions and final
      })
      .filter((a) => a !== null); // Remove null values
  }

  // Function to handle final radio change and consequent automatic form submission
  function handleRadioChange() {
    // Ensure all required answers are present before submitting
    const requiredAnswers = questionnaire.filter((q) => q.type === "scale" || q.type === "graph");
    const allAnswered = requiredAnswers.every((q) => q.answer !== null);

    if (allAnswered) {
      questionnaireForm.submit();
    }
  }

  // function to redirect on mount
  onMount(() => {
    // redirects to day page if questionnaire completed
    if (completed) {
      setTimeout(() => {
        window.location.href = "/day";
      }, 2000); // Redirects after 2 seconds
    }
  });
</script>

{#if user}
  <div class="pop-up medium">
    <a class="circular-button home" href="/dashboard"><img src="/images/home-circle-button.svg" alt="home button" /></a>
    <a class="circular-button back" href="/day"><img src="/images/return-circle-button.svg" alt="back button" /></a>
    <div class="pop-up-content center">
      <div class="container">
        {#if completed}
          <div class="instructions-text">
            <p>Mood questionnaire completed for today.</p>
          </div>
        {:else}
          {#if currentQuestionIndex === 0}
            <div class="instructions-text">
              <p>{questionnaire[0].text}</p>
            </div>
            <button class="form-button" on:click={() => currentQuestionIndex++}>Next</button>
          {:else if currentQuestionIndex === 1}
            <div class="questionnaire-text">
              <p>{questionnaire[1].statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" name="answer-1" bind:group={questionnaire[1].answer} value={i + 1} on:change={() => currentQuestionIndex++} />
              {/each}
              <span class="number">5</span>
            </div>
          {:else if currentQuestionIndex === 2}
            <div class="questionnaire-text">
              <p>{questionnaire[2].statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" name="answer-2" bind:group={questionnaire[2].answer} value={i + 1} on:change={() => currentQuestionIndex++} />
              {/each}
              <span class="number">5</span>
            </div>
          {:else if currentQuestionIndex === 3}
            <div class="questionnaire-text">
              <p>{questionnaire[3].statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" name="answer-3" bind:group={questionnaire[3].answer} value={i + 1} on:change={() => currentQuestionIndex++} />
              {/each}
              <span class="number">5</span>
            </div>
          {:else if currentQuestionIndex === 4}
            <div class="questionnaire-text">
              <p>{questionnaire[4].statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" name="answer-4" bind:group={questionnaire[4].answer} value={i + 1} on:change={() => currentQuestionIndex++} />
              {/each}
              <span class="number">5</span>
            </div>
          {:else if currentQuestionIndex === 5}
            <div class="questionnaire-text">
              <p>{questionnaire[5].statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" name="answer-5" bind:group={questionnaire[5].answer} value={i + 1} on:change={() => currentQuestionIndex++} />
              {/each}
              <span class="number">5</span>
            </div>
          {:else if currentQuestionIndex === 6}
            <div class="questionnaire-text">
              <p>{questionnaire[6].statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" name="answer-6" bind:group={questionnaire[6].answer} value={i + 1} on:change={() => currentQuestionIndex++} />
              {/each}
              <span class="number">5</span>
            </div>
          {:else if currentQuestionIndex === 7}
            <div class="questionnaire-text">
              <p>{questionnaire[7].statement}</p>
            </div>
            <div class="mood-input-container">
              <div class="chart">
                <Graph points={[questionnaire[8].answer || { x: 0, y: 0 }]} />
                <div class="axis-labels">
                  <span class="x-label">Pleasantness</span>
                  <span class="y-label">Energy</span>
                </div>
              </div>
              <div class="answer-input">
                <p class="graph-text">Pleasantness</p>
                <div class="slider-container">
                  <span class="number">Negative</span>
                  <input type="range" min="-5" max="5" step="1" bind:value={questionnaire[8].answer.x} class="slider" id="pleasantnessSlider" />
                  <span class="number">Positive</span>
                </div>
                <p class="graph-text">Energy</p>
                <div class="slider-container">
                  <span class="number">Low</span>
                  <input type="range" min="-5" max="5" step="1" bind:value={questionnaire[8].answer.y} class="slider" id="energySlider" />
                  <span class="number">High</span>
                </div>
              </div>
            </div>
            <button class="form-button" on:click={() => currentQuestionIndex++}>Next</button>
          {:else if currentQuestionIndex === 8}
            <div class="questionnaire-text">
              <p>{questionnaire[8].statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" name="answer-8" bind:group={questionnaire[8].answer} value={i + 1} on:change={handleRadioChange} />
              {/each}
              <span class="number">5</span>
            </div>
            <form bind:this={questionnaireForm} action="{path}/?/update" method="post">
              <input type="hidden" name="answers" value={JSON.stringify(answers)} />
            </form>
          {:else if currentQuestionIndex === 9}
            <div class="instructions-text">
              <p>{questionnaire[9].text}</p>
            </div>
            <form bind:this={questionnaireForm} action="{path}/?/update" method="post">
              <input type="hidden" name="answers" value={JSON.stringify(answers)} />
              <button class="form-button" type="submit">Submit</button>
            </form>
          {/if}
          <!-- <div class="button-container">
          {#if currentQuestionIndex === 0}
            <button on:click={() => currentQuestionIndex++}>Next</button>
          {:else if 0 < currentQuestionIndex && currentQuestionIndex < questionnaire.length - 1}
            <button on:click={goBack}>Back</button>
            <button on:click={() => currentQuestionIndex++}>Next</button>
          {:else if currentQuestionIndex === questionnaire.length - 1}
            <button on:click={goBack}>Back</button>
            <button on:click={handleSubmit}>Finish</button>
          {/if}
        </div> -->
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 40svh;
    gap: 2vh;
  }
  .instructions-text p {
    color: #fff;
    text-align: center;
    font-size: 22px;
    font-weight: 300;
  }
  .questionnaire-text p {
    color: #fff;
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 300;
  }
  /* Style the radio button when checked */
  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    max-width: 5vw;
    max-height: 5vw;
    border: solid 1px white;
    border-radius: 50%;
    background-color: white;
    margin: 10px;
    cursor: pointer;
  }
  input[type="radio"]:checked {
    background-color: #5db3e5;
  }
  input[type="radio"]:hover {
    background-color: #5db3e5;
  }
  .radio-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .number {
    font-size: 12px;
    color: white;
    margin: 0 10px;
  }
  .mood-input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
  }

  .chart {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;
    position: relative;
    margin: 20px 0;
    aspect-ratio: 1;
  }

  .axis-labels {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .x-label {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 14px;
  }

  .y-label {
    position: absolute;
    top: 50%;
    left: -40px;
    transform: translateY(-50%) rotate(-90deg);
    color: white;
    font-size: 14px;
  }

  .graph-text {
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 100;
    margin: 20px 0 10px 0;
  }

  .answer-input {
    display: flex;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
  }
  .slider-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px auto;
    width: 100%;
    max-width: 300px;
    padding: 0 10px;
  }

  .slider-container .number {
    flex: 0 0 50px;
    text-align: center;
    font-size: 12px;
    color: white;
    margin: 0;
  }

  .slider {
    -webkit-appearance: none;
    flex: 1;
    height: 10px;
    background: white;
    border-radius: 20px;
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    margin: 0 10px;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #5db3e5;
    cursor: pointer;
    border-radius: 50%;
    border: white solid;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #5db3e5;
    cursor: pointer;
    border-radius: 50%;
  }
</style>
