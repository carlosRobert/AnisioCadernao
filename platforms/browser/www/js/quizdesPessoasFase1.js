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
      question: "1) _______é a capacidade de realizar uma tarefa ou um conjunto de tarefas em conformidade com determinados padrões exigidos pela organização. “ Saber fazer”",
      answers: {
        a: "Atitude",
        b: "Conhecimento",
        c: "Habilidade",
        d: "Liderança",
      },
      correctAnswer: "c"
    },
    {
      question: "2) O sucesso na __________ não depende só da forma como a mensagem é transmitida, a compreensão dela é fator fundamental. ",
      answers: {
        a: "Liderança",
        b: "Motivação",
        c: "Capacitação",
        d: "Comunicação"
      },
      correctAnswer: "d"
    },
    {
      question: "3) ___________é a área do conhecimento que visa  a melhorar a qualidade de vida e a desenvolver as habilidades pessoais de cada pessoa.",
      answers: {
        a: "Comunicação interpessoal",
        b: "Relacionamento pessoal",
        c: "Desenvolvimento pessoal",
        d: "Empreendedorismo "
      },
      correctAnswer: "c"
    },
    {
      question: "4) O indivíduo que detém uma forma especial, inovadora, de se dedicar às atividades de organização, administração, execução: principalmente na geração de riquezas.",
      answers: {
        a: "Empreendedorismo",
        b: "Comunicação interpessoal",
        c: "Capacitação técnica",
        d: "Educação financeira"
      },
      correctAnswer: "a"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();