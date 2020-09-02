/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    // question 1
    {
      question: 'Can you take the drivers safety course if you have a Commercial Drivers License?',
      answers: [
        'Yes',
        'No'
      ],
      correctAnswer: 'No'
    },
    // question 2
    {
      question: 'For the drivers safety course, you cannot exceed the speed of: ',
      answers: [
        '75',
        '80',
        '90',
        '95'
      ],
      correctAnswer: '95'
    },
    // question 3
    {
      question: 'One of the requirements for the drivers safety course is to have a valid Texas drivers license or be active military (including spouse or immediate family',
      answers: [
        'True',
        'False'
      ],
      correctAnswer: 'True'
    },
    // question 4
    {
      question: 'If approved for the drivers safety course, how long does the court provide the defendant to complete the course?',
      answers: [
        '60 days',
        '30 days',
        '90 days',
        '45 days'
      ],
      correctAnswer: '90 days'
    },
    // question 5
    {
      question: 'How often can the drivers safety course be taken for ticket dismissal?',
      answers: [
        'Once every 6 months',
        'Once a year',
        'As many times as necessary',
        'Once every 3 years'
      ],
      correctAnswer: 'Once a year'
    },

  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  index: 0,
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

//function for the welcome screen
function homeScreen() {
  return `
    <div class="home-screen">
      <h1>A short quiz over the requirements for taking a drivers safety course to dismiss a traffic citation.</h1>
      <button type="button" id="start">Start Quiz</button>
    </div>
  `;
}

//function for the questions to begin
function startQuestion() {
  let index = store.questions[store.index];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${index.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${answerChoices()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next Question</button>
      </fieldset>
    </form >
  `;
}

function questionAndScore() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${store.index + 1}/${store.questions.length}
      </li>
      <li id="score">
        Score: ${store.score}/${store.questions.length}
      </li>
    </ul>
  `;
}

//Function to display the answer choices
function answerChoices() {
  const answersArray = store.questions[store.index].answers
  let answers = '';
  let i = 0;

  answersArray.forEach(answer => {
    answers+= `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answers;
}

//Function to provide the Answer Results
function provideAnswerResults(answerStatus) {
  let correctAnswer = store.questions[store.index].correctAnswer;
  let responseHTML = '';
  if (answerStatus === 'correct') {
    responseHTML = `
    <div class="right-answer">Correct!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    responseHTML = `
      <div class="wrong-answer">Incorrect! The correct answer is ${correctAnswer}.</div>
    `;
  }
  return responseHTML;
}


//Function to display the Quiz Results at end
function quizResults() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col">
              <legend>Your Score is: ${store.score}/${store.questions.length}</legend>
            </div>
          </div>
   <button type="button" id="restart"> Try Again </button>
        </fieldset>
    </form>
    </div>
  `;
}



/********** RENDER FUNCTION **********/

function renderQuiz() {
// render all function
let html =' ';

if (store.quizStarted === false) { 
  $('main').html(homeScreen());
  return;
  }

else if (store.quizStarted === true){
    html += generateQuestionHtml();
    html = generateQuestionNumberAndScoreHtml();
    $('main').html(html);
    }
else (store.questionNumber === store.questions.length){
      $('main').html(generateResultsScreen());}
  
}

 
/********** EVENT HANDLER FUNCTIONS **********/


function startClick() {
  $('main').on('click', '#start', function (event) {
    $('main').html(startQuestion());
    store.quizStarted === true;
   renderQuiz();
    
  });
}


function nextQuestionClick() {
  $('body').on('click', '#next-question-btn', function (event) {
    store.index+=;
    renderQuiz();
  });
}


function formSubmission() {
$('body').on('click', '#next-question-btn', function (event)) {
  event.preventDefault();
 
  }
}

function restartQuiz() {
 store.quizStarted === false;
 store.index = 0;
 store.score = 0;

}

function restartClick() {
  $('body').on('click', '#restart', () =>{
    restartQuiz();
    renderQuiz();
  });
}

function handleQuizApp() {
  renderQuiz();
  startClick();
  nextQuestionClick();
  formSubmission();
  restartClick();
}

$(handleQuizApp);
