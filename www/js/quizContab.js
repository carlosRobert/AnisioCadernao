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
    if (numCorrect <=1) {
       document.getElementById("t1").innerHTML = "Você precisa estudar mais!";
    }
    else if (numCorrect == 2) {
      document.getElementById("t1").innerHTML = "Parabéns!";
    }
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) Quando o total de ativos (bens e direitos) da entidade é menor do que o passivo exigível (obrigações), tem-se um:",
      answers: {
        a: "passivo descoberto",
        b: "passivo flutuante",
        c: "passivo não circulante",
        d: "passivo circulante",
      },
      correctAnswer: "a"
    },
    {
      question: "2) A contabilidade, além de controlar e registrar os fatos que afetam o patrimônio, também possui um campo de aplicabilidade. A alternativa que melhor representa o campo de aplicação da contabilidade é:",
      answers: {
        a: "empresas",
        b: "entidade estatal",
        c: "fazenda pública",
        d: "aziendas"
      },
      correctAnswer: "d"
    },
    {
      question: "3) Na contabilidade o objeto é o patrimônio de uma entidade, constituído pelo conjunto de:",
      answers: {
        a: "bens, direitos e obrigações visando, ou não, incluir o lucro",
        b: "obrigações e bens",
        c: "bens, direitos e obrigações visando só o lucro",
        d: "bens e direito"
      },
      correctAnswer: "a"
    },
    
  ];

  
  buildQuiz();

  
  submitButton.addEventListener('click', showResults);
})();