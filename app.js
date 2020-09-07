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

//function for the welcome screen html
function homeScreenHTML() {
  return `
    <div class="home-screen">
      <h1>A short quiz over the requirements for taking a drivers safety course to dismiss a traffic citation.</h1>
      <button type="button" id="start">Start Quiz</button>
    </div>
  `;
}


//Function to display the question and answer choices in a form html
function questionsAndAnswersHTML(){
  
  let index = store.questions[store.index]; 
  return `
  <form id="question-form">
    <fieldset>
      <div class="question">
       <legend> ${index.question} </legend>
      </div>
      <div class="options">
        <div class="answers">
        ${answerChoices()}
          <div id="option-container">
        </div> 
      <div id="answer-results">
      <h2></h2>
        <p> Question Number: ${store.index + 1} out of ${store.questions.length} </p>
        <p> Youre score is: ${store.score}</p>
      </div>
        <button type="submit" id="submit-answer-btn"> Submit</button>
        <button type="button" id="next-question-btn"> Next Question</button>
    </fieldset>
  </form>

  

        `;
   
}

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


//Function to display the Quiz Results at end
function quizResultsHTML() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col">
              <legend>Your Score is: ${store.score}/${store.questions.length}</legend>
            </div>
          </div>
   <button type="button" id="restart-btn"> Try Again </button>
        </fieldset>
    </form>
    </div>
  `;
}


/********** RENDER FUNCTION **********/

function renderQuiz() {
// render all function
if(store.quizStarted === false){
  $('main').html(homeScreenHTML());

  }
  else if (store.quizStarted === true && store.index === store.questions.length) {
    $('main').html(quizResultsHTML());}

}



 
/********** EVENT HANDLER FUNCTIONS **********/

//function for the questions to begin on start click
function startClick() {
  $('.home-screen').on('click', start, function(event) {
    event.preventDefault();
    store.quizStarted = true;
    let html ="";
    html = questionsAndAnswersHTML();
    $('main').html(html);
  });
}



//function to check answers once submitted
function answerResults(){

  $('body').on('submit', '#question-form', function (event){
    event.preventDefault();
  
    let correctAnswer = store.questions[store.index].correctAnswer;
    let answer = $('input[name=options]:checked',).val();   

  $('input[type=radio]').each(() => {
    $('input[type=radio]').attr('disabled', true);
    $('#next-question-btn').show();
  });

  var answerEl = document.querySelector('h2');

     if (answer === correctAnswer) {
      store.score++;
     answerEl.textContent = "Thats Correct!";
       } 

    else {
      answerEl.innerHTML = "Incorrect! The correct answer is: " + correctAnswer;
         } 
    });

  }


//Event handler to listen for the next button
$(document).on('click', '#next-question-btn', function(event) {
 event.preventDefault();
  nextQuestion();
});

//function to update the question html
function nextQuestion(){
 
  let html='';
  store.index++;
  if (store.index < store.questions.length){
    html +=  questionsAndAnswersHTML();
    $('main').html(html);
  } 
  renderQuiz();
}


//function to restart the quiz
function restartQuiz() {
 store.quizStarted = false;
 store.index = 0;
 store.score = 0;

}

//function for restart click with event handler for restart button
function restartClick() {
  $(document).on('click', '#restart-btn', function(){
  
    restartQuiz();
    renderQuiz();
   
 });
}

function handleQuizApp() {
    renderQuiz();
    startClick();
    answerResults();
    restartClick();
    
}

$(handleQuizApp);
