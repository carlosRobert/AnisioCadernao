(function(){
  function buildQuiz(){
    
    const output = [];

    
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        
        const answers = [];

        
        for(letter in currentQuestion.answers){

          
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    
    const answerContainers = quizContainer.querySelectorAll('.answers');

    
    let numCorrect = 0;

    
    myQuestions.forEach( (currentQuestion, questionNumber) => {

     
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
      question: "1)Como se denomina o tipo de vírus que ataca bactérias?",
      answers: {
        a: "Intracelular obrigatório.",
        b: "Bactericida.",
        c: "Bacteriose.",
        d: "Bacteriófago.",
      },
      correctAnswer: "d"
    },
    {
      question: "2) Uma pessoa foi diagnosticada com uma virose, logo, podemos concluir que ela apresenta uma doença causada por",
      answers: {
        a: "um organismo procarionte.",
        b: "um organismo eucarionte.",
        c: "um organismo acelular.",
        d: "um organismo unicelular."
      },
      correctAnswer: "c"
    },
    {
      question: "3) Sobre viroses e vírus, marque a alternativa correta:",
      answers: {
        a: "Todos os vírus são capazes de provocar doenças em seres humanos.",
        b: "As viroses são transmitidas exclusivamente por via respiratória.",
        c: "Dengue e gripe são exemplos de doenças causadas por vírus.",
        d: "A tuberculose é uma doença viral que afeta os pulmões."
      },
      correctAnswer: "c"
    },
    {
      question: "4) Algumas doenças virais podem ser transmitidas de pessoa para pessoa, mas existem algumas que necessitam de vetores para serem transmitidas, ou seja, necessitam de organismos que transportem o vírus até uma pessoa. Entre as doenças citadas a seguir, marque a única que é transmitida por um vetor.",
      answers: {
        a: "herpes.",
        b: "febre chikungunya.",
        c: "resfriado.",
        d: "AIDS."
      },
      correctAnswer: "b"
    },
  ];

  
  buildQuiz();

  
  submitButton.addEventListener('click', showResults);
})();