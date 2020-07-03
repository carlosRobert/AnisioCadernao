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
      question: "1) A administração financeira está relacionada com as finanças da empresa. Com base no exposto, assinale a alternativa que apresenta a função do planejamento financeiro dentro do ambiente empresarial",
      answers: {
        a: "O planejamento financeiro tem o foco no mercado, identifica os clientes em potencial e, principalmente, deve servir de base para o desenvolvimento de produtos.",
        b: "No planejamento financeiro, é possível ao administrador financeiro selecionar, com maior margem de segurança, os ativos mais rentáveis e condizentes com os negócios da empresa, de forma a estabelecer uma rentabilidade mais satisfatória sobre os investimentos.",
        c: "O planejamento financeiro tem o foco em desenvolver produtos em larga escala que podem ser facilmente encontrados a preços baixos.",
        d: "O planejamento financeiro tem o foco em identificar investimentos a curto prazo, gerindo permanentemente o capital de giro.",
      },
      correctAnswer: "b"
    },
    {
      question: "2) Suponha‐se que uma empresa possua ativo não circulante de R$ 230 milhões, passivo não circulante de R$ 170 milhões e patrimônio líquido de R$ 150 milhões. Nesse caso, o capital de giro da empresa é:",
      answers: {
        a: "90 milhões",
        b: "100 milhões",
        c: "110 milhões",
        d: "120 milhões"
      },
      correctAnswer: "a"
    },
    {
      question: "3) É a previsão de entradas e saídas de recursos monetários, por um determinado período. Essa projeção deve ser feita com base nos dados levantados nas projeções econômico-financeiras realizadas anteriormente:",
      answers: {
        a: "Contas a pagar",
        b: "Capital de giro",
        c: "Demonstração do Resultado do Exercício",
        d: "Fluxo de caixa"
      },
      correctAnswer: "d"
    },
    
  ];

  
  buildQuiz();

  
  submitButton.addEventListener('click', showResults);
})();