/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */
// variables
let countdownTimer = 10 * 1;
let display = document.querySelector('#time');
const quizForm = document.querySelector('#quizWrap');
const form = document.querySelector('.quiz');
const submitButton = document.querySelector('#btnSubmit');
const resultsScore = document.querySelector('#score');
const gameoverContainer = document.querySelector('#gameover');
const resultsContainer = document.querySelector('#score');
const correctAnswers = ['1','3','1','2','3'];
let quizOver = false;

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    if (!quizOver) {
      start.style.display = 'none';
      startTime(countdownTimer, display);
    }
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the scientific name for modern day humans?',
      o: ['Homo Ergaster', 'Homo Neanderthalensis', 'Homo Sapiens', 'Homo Erectus'],
      a: 2,
    },
    {
      q: 'What is the collective noun for a group of crows?',
      o: ['Pack', 'Gaggle', 'Herd', 'Murder'],
      a: 3,
    },
  ];

 
  // timer


  function startTime(duration, display) {
    let timer = duration, minutes, seconds;
    
    
    setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds + " minutes";

      if (--timer < 0) {
          timer = duration;
      }

      if(timer == 0) {
        display.textContent = "00:00 minutes";
        gameoverContainer.innerHTML = `Game over!`;
        calculateScore();
        quizOver = true;
        return false;

      }
  }, 1000);
  }



  function clearTimer() {
    clearTimeout(startTime);
  };

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q${index+1} - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="q${index}" id="radio_${index}_0" value=0> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="q${index}" id="radio_${index}_1" value=1> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="q${index}" id="radio_${index}_2" value=2> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="q${index}" id="radio_${index}_3" value=3> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    const userAnswers = [form.q0.value, form.q1.value, form.q2.value, form.q3.value, form.q4.value];
    
    userAnswers.forEach((answer,index) => {
      if(answer===correctAnswers[index]) {
        score++;
      }
    })
    
      resultsScore.innerHTML = `You scored ${score} out of ${quizArray.length}`;
    // });
  };


  // submit form
  submitButton.addEventListener('click', calculateScore);

  // reset form
  $("#btnReset").click(function(){
    document.location.reload(true);
  });

  // call the displayQuiz function
  displayQuiz();
});


