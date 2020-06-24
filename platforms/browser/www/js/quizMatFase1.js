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
      question: "1) Numa pesquisa verificou-se que, das pessoas consultadas, 100 liam o jornal A, 150 liam o jornal B, 20 liam os dois jornais (A e B). Sabendo-se que todas as pessoas consultadas liam pelo menos um dos dois jornais, quantas pessoas foram consultadas?",
      answers: {
        a: "230",
        b: "100",
        c: "130",
        d: "270",
      },
      correctAnswer: "a"
    },
    {
      question: "2) Numa pesquisa verificou-se que, das pessoas consultadas, 100 liam o jornal Liberal, 150 liam o jornal Diário, 20 liam os dois jornais (Liberal e Diário) e 110 não liam nenhum dos dois jornais. Quantas pessoas liam somente o jornal Liberal? ",
      answers: {
        a: "100",
        b: "80",
        c: "130",
        d: "110"
      },
      correctAnswer: "b"
    },
    {
      question: "3) Numa pesquisa verificou-se que, das pessoas consultadas, 100 liam o jornal Liberal, 150 liam o jornal Diário, 20 liam os dois jornais (Liberal e Diário) e 110 não liam nenhum dos dois jornais. Quantas pessoas liam somente um dos jornais?",
      answers: {
        a: "100",
        b: "250",
        c: "130",
        d: "210"
      },
      correctAnswer: "d"
    },
    {
      question: "4) Uma prova com duas questões foi dada a uma classe de quarenta alunos. Dez alunos acertaram as duas questões, 25 acertaram a primeira questão e 20 acertaram a segunda questão. Quantos alunos erraram as duas questões?",
      answers: {
        a: "10",
        b: "5",
        c: "35",
        d: "15"
      },
      correctAnswer: "b"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();