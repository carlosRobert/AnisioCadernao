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
      question: "1) 1492 é um ano emblemático para a ciência e a comprovação da teoria da esfericidade da Terra, e, não de que a Terra era Plana como preconizava a igreja à época das grandes navegações, pois nesse ano se tem:",
      answers: {
        a: "descobrimento do Caminho para as Índias por Américo Vespúcio",
        b: "abertura do Estreito de Gibraltar, entre o Panamá e a Colômbia, fechado pelos Turcos – Otomanos",
        c: "construção da Rota da Seda a partir do Japão e a América espanhola",
        d: "descobrimento do Novo Mundo por Cristóvão Colombo",
      },
      correctAnswer: "d"
    },
    {
      question: "2) O Tratado de Tordesilhas de 1594 previa a divisão da Terra entre as duas coroas financiadoras das grandes navegações, Portugal e Espanha ficariam com as terras que teriam o Meridiano de Tordesilhas como referência para definir o que caberia a cada nação respectivamente:",
      answers: {
        a: "a Leste as terras seriam da Espanha, e, a Oeste ficariam para Portugal",
        b: "a Oeste as terras que seriam da Espanha, e, a Leste ficariam com Portugal",
        c: "a Sudeste de Fernando de Noronha as terras seriam da Espanha, e, a Oeste ficariam com Portugal",
        d: "a Nordeste da ilha do Marajó as terras seriam de Portugal, e, a Oeste ficariam com a Espanha"
      },
      correctAnswer: "b"
    },
    {
      question: "3) Podemos dizer que o caráter da ocupação do território brasileiro cumpre o caráter Litorâneo – Periférico, pois atendia basicamente as seguintes condições, respectivamente:",
      answers: {
        a: "o transporte era através de navios que precisavam de portos para escoamento da produção de matérias-primas a serem beneficiadas na Europa",
        b: "ao longo da industrialização do Brasil a partir de 1532 nós estávamos de vez nas grandes discussões do capitalismo internacional",
        c: "era litorâneo pois a produção acontecia no interior do Brasil que ao mesmo tempo era periférico, pois o escoamento para a Europa necessitava dos portos para envio dos bens manufaturados",
        d: "a Europa impunha esse caráter ao Brasil desde sempre por temer a concorrência de nossos bens manufaturados com os deles."
      },
      correctAnswer: "a"
    },
   
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();