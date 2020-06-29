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
      question: "1) O juro simples produzido em uma aplicação de R$ 15.000,00 durante um semestre com uma taxa mensal de 3% é:",
      answers: {
        a: "R$ 25.700,00",
        b: "R$ 20.000,00",
        c: "R$ 17.700,00",
        d: "R$ 2.700,00",
      },
      correctAnswer: "b"
    },
    {
      question: "2) Qual foi a taxa mensal de uma aplicação, sob regime de juros simples, de um capital de R$ 3.000,00, durante 4 bimestres, para gerar juros de R$ 240,00?",
      answers: {
        a: "5%",
        b: "2%",
        c: "3%",
        d: "1%"
      },
      correctAnswer: "d"
    },
    {
      question: "3) Um investidor aplicou a quantia de R$ 80.000,00 em um fundo de investimentos que opera com regime de juros simples à taxa de 2% ao mês. Após um certo tempo o investidor verificou que o montante era de R$ 89.600,00. O tempo que o dinheiro ficou aplicado foi de:",
      answers: {
        a: "6 meses",
        b: "5 meses",
        c: "4 meses",
        d: "10 meses"
      },
      correctAnswer: "d"
    },
    {
      question: "4) Qual o valor do capital a ser investido, sob regime de juros simples, por 9 meses, a uma taxa bimestral de 2% para gerar juros de R$ 162,00?",
      answers: {
        a: "R$ 1.800,00",
        b: "R$ 2.000,00",
        c: "R$ 2.200,00",
        d: "R$ 2.500,00"
      },
      correctAnswer: "c"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();