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
      document.getElementById("t1").innerHTML = "Está bom, mas você pode melhorar!";
    }
    else if (numCorrect == 4) {
      document.getElementById("t1").innerHTML = "Parabéns!";
    }
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) A palavra design significa:",
      answers: {
        a: "o profissional;",
        b: "o projeto;",
        c: "a textura ",
        d: "o texto",
      },
      correctAnswer: "b"
    },
    {
      question: "2) O brinquedo de miriti é considerado:",
      answers: {
        a: "design da produção gráfica",
        b: "design da produção industrial",
        c: "design da produção digital",
        d: "design da produção artesanal"
      },
      correctAnswer: "d"
    },
    {
      question: "3) O design criado através de programas no computador:",
      answers: {
        a: "design técnico;",
        b: "design  gráfico;",
        c: "design artesanal",
        d: "design manual"
      },
      correctAnswer: "b"
    },
    {
      question: "4) O produto industrial abaixo,  possuí uma evolução significativa em design e funções inovadoras que são produzidos em  grande escala.",
      answers: {
        a: "cerâmica",
        b: "renda",
        c: "celular",
        d: "desenho a mão livre"
      },
      correctAnswer: "c"
    },
    {
      question: "5) No texto Arte, censura e resistência , a expressão Quem matou Herzog? Foi divulgada através de que elemento circulante?",
      answers: {
        a: "Moeda",
        b: "Cédula de dinheiro ",
        c: "Garrafa de refrigerante",
        d: "Jornal impresso"
      },
      correctAnswer: "b"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();