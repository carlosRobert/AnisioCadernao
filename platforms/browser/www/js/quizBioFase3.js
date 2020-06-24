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
      question: "1) Em relação ao ditado popular mencionado abaixo, assinale a alternativa que pode explicar o fenômeno correspondente. “Ai, ai, ai, carrapato não tem pai.”",
      answers: {
        a: "neotenia.",
        b: "partenogênese.",
        c: "conjugação.",
        d: "poliembrionia.",
      },
      correctAnswer: "b"
    },
    {
      question: "2) Os ovários são duas glândulas situadas uma em cada lado do útero, abaixo das trompas. Produzem os óvulos e também os hormônios sexuais femininos. Assinale a alternativa que indica quais hormônios são produzidos pelos ovários.",
      answers: {
        a: "estrógeno e progesterona;",
        b: "estrógeno e testosterona;",
        c: "progesterona e testosterona;",
        d: "ICSH e estrógeno."
      },
      correctAnswer: "a"
    },
    {
      question: "3) (UFRGS-RS) O epidídimo tem a função de:",
      answers: {
        a: "armazenar espermatozoides.",
        b: "produzir hormônio sexual masculino.",
        c: "produzir espermatozoides.",
        d: "produzir hormônios gonadotróficos."
      },
      correctAnswer: "a"
    },
    {
      question: "4) Sobre o sistema genital masculino e feminino, marque a informação INCORRETA: ",
      answers: {
        a: "A vagina é um canal musculoso que se estende até a base do útero.",
        b: "Os lábios maiores e lábios menores fazem parte do chamado pudendo feminino.",
        c: "Os espermatozoides são produzidos no interior dos túbulos seminíferos e ficam armazenados nos ductos deferentes, onde completam seu amadurecimento.",
        d: "No homem, a uretra passa pelo interior do pênis."
      },
      correctAnswer: "c"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();