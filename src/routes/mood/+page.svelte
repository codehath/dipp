<script>
  import { onMount } from "svelte";
  import Graph from "../../components/Graph.svelte";
  import CircularButton from "../../components/CircularButton.svelte";
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

  let answers = "";
  let questionnaire = [
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
      answer: { x: 0, y: 0 },
    },
    { type: "scale", statement: "How accurately do you think you identified your current emotion? 1 (Not at all accurately) to 5 (Extremely accurately)", answer: null },
  ];

  // Retrieve the answers from the questionnaire
  $: {
    const answersArray = retrieveAnswers(questionnaire);
    answers = Array.isArray(answersArray) ? answersArray.join(",") : "";
  }

  function handleSubmit() {
    const allQuestionsAnswered = questionnaire.every((q) => {
      if (q.type === "scale") return q.answer !== null;
      return true; // Graph type always has a value
    });

    if (!allQuestionsAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const form = document.getElementById("questionnaireForm");
    if (form) form.submit();
  }

  // function to redirect on mount
  onMount(() => {
    // redirects to day page if questionnaire completed
    if (completed) {
      setTimeout(() => {
        window.location.href = "/day";
      }, 800); // Redirects after 800ms
    }
  });
</script>

{#if user}
  <div class="pop-up medium">
    <CircularButton href="/dashboard" position="home" size={30} />
    <CircularButton href="/day" position="back" size={30} />
    <div class="pop-up-content center">
      <div class="container">
        {#if completed}
          <div class="instructions-text">
            <p>Mood questionnaire completed for today.</p>
          </div>
        {:else}
          <div class="instructions-text">
            <p>Please indicate on a 5-point scale how much you agree with the following statements. '1' means "Not at all" and '5' means "Very much".</p>
          </div>

          <form id="questionnaireForm" action="{path}/?/update" method="post">
            <input type="hidden" name="answers[]" value={answers} />

            {#each questionnaire as question, index}
              <div class="question-container">
                <div class="question-text">
                  <p><span class="question-number">{index + 1}.</span> {question.statement}</p>
                </div>

                <div class="answer-section">
                  {#if question.type === "scale"}
                    <div class="radio-buttons">
                      <span class="number">1</span>
                      {#each Array(5).fill(undefined) as _, i}
                        <input type="radio" name="q{index}" bind:group={question.answer} value={i + 1} />
                      {/each}
                      <span class="number">5</span>
                    </div>
                  {:else if question.type === "graph"}
                    <div class="graph-section">
                      <div class="chart">
                        <Graph points={[question.answer]} />
                        <div class="axis-labels">
                          <span class="x-label">Pleasantness</span>
                          <span class="y-label">Energy</span>
                        </div>
                      </div>
                      <div class="answer-input">
                        <div class="slider-group">
                          <div class="slider-label">
                            <span class="label-text">Pleasantness</span>
                          </div>
                          <div class="slider-container">
                            <span class="number">Negative</span>
                            <input type="range" min="-5" max="5" step="1" bind:value={question.answer.x} class="slider" id="pleasantnessSlider" />
                            <span class="number">Positive</span>
                          </div>
                        </div>
                        <div class="slider-group">
                          <div class="slider-label">
                            <span class="label-text">Energy</span>
                          </div>
                          <div class="slider-container">
                            <span class="number">Low</span>
                            <input type="range" min="-5" max="5" step="1" bind:value={question.answer.y} class="slider" id="energySlider" />
                            <span class="number">High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}

            <div class="submit-container">
              <button type="button" class="form-button" on:click={handleSubmit}>Submit</button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem;
    gap: 2vh;
  }
  .instructions-text p {
    color: #fff;
    text-align: center;
    font-size: 22px;
    font-weight: 300;
    margin-bottom: 2rem;
  }
  .question-container {
    margin-bottom: 3rem;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .question-text {
    margin-bottom: 1.5rem;
    width: 100%;
  }
  .question-text p {
    color: #fff;
    text-align: left;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    padding: 0 1rem;
    line-height: 1.4;
  }
  .question-number {
    font-weight: 500;
    margin-right: 0.5rem;
  }
  .answer-section {
    width: 100%;
    display: flex;
    justify-content: center;
  }
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 0.5rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    width: 100%;
    max-width: 400px;
  }
  .number {
    font-size: 12px;
    color: white;
    min-width: 60px;
    text-align: center;
  }
  .graph-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
  }
  .chart {
    width: 100%;
    max-width: 400px;
    position: relative;
    margin: 1rem auto 3rem;
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
  .answer-input {
    width: 100%;
    max-width: 400px;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .slider-group {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .slider-label {
    text-align: center;
    margin-bottom: 1rem;
  }
  .label-text {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .slider-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0;
  }
  .slider {
    -webkit-appearance: none;
    width: 100%;
    max-width: 250px;
    height: 10px;
    background: white;
    border-radius: 20px;
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
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
  .submit-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
  .form-button {
    padding: 1rem 3rem;
    background-color: #5db3e5;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s;
    min-width: 200px;
  }
  .form-button:hover {
    background-color: #4a90c0;
  }

  /* Mobile Styles */
  @media (max-width: 600px) {
    .container {
      padding: 1rem;
    }
    .question-text p {
      font-size: 16px;
    }
    .radio-buttons {
      padding: 0.5rem 1rem;
    }
    .slider-group {
      padding: 1.2rem;
    }
    .slider-container {
      flex-direction: row;
      align-items: center;
      gap: 0.8rem;
    }
    .slider {
      max-width: 200px;
    }
    .number {
      font-size: 12px;
      min-width: 50px;
    }
    .chart {
      margin: 1rem auto 2.5rem;
    }
    .x-label,
    .y-label {
      font-size: 12px;
    }
    .x-label {
      bottom: -20px;
    }
    .y-label {
      left: -25px;
    }
    .label-text {
      font-size: 16px;
    }
  }

  @media (max-width: 400px) {
    .slider {
      max-width: 160px;
    }
    .number {
      min-width: 45px;
      font-size: 11px;
    }
    .slider-group {
      padding: 1rem;
    }
  }
</style>
