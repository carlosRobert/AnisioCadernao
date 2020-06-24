(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `Você acertou ${numCorrect} do total de ${myQuestions.length} questões.`;
    if (numCorrect <=2) {
       document.getElementById("t1").innerHTML = "Você precisa estudar mais!";
    }
    else if (numCorrect == 3) {
      document.getElementById("t1").innerHTML = "Parabéns!";
    }
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) O conjunto de organismos da mesma espécie que vivem na mesma área em um determinado momento é denominado de:",
      answers: {
        a: "comunidade.",
        b: "espécime.",
        c: "população.",
        d: "ecossistema.",
      },
      correctAnswer: "c"
    },
    {
      question: "2) (Fuvest) A maior parte do nitrogênio que compõe as moléculas orgânicas ingressa nos ecossistemas pela ação de:",
      answers: {
        a: "algas marinhas",
        b: "animais",
        c: "bactérias",
        d: "plantas terrestres"
      },
      correctAnswer: "c"
    },
    {
      question: "3) (UEPB) Considerando a poluição de um ecossistema aquático por produtos clorados, a exemplo de DDT, o componente biótico da cadeia que deverá apresentar maior concentração do produto será:",
      answers: {
        a: "o fitoplâncton",
        b: "o zooplâncton",
        c: "os peixes carnívoros",
        d: "as aves piscívoras"
      },
      correctAnswer: "d"
    },
    {
      question: "4) A ecologia é uma parte da biologia que estuda a relação dos organismos com o meio que os cerca. Os organismos interagem entre si e com todas as partes não vivas do ambiente, tais como solo, água, temperatura e umidade. Essas partes não vivas são chamadas de:",
      answers: {
        a: "fatores abióticos.",
        b: "fatores bióticos.",
        c: "biosfera.",
        d: "ecossistema."
      },
      correctAnswer: "a"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();