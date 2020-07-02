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

     
      if(userAnswer === currentQuestion.correctAnswer){
        
        numCorrect++;

        
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
     
      else{
        
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    
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
      question: "1) A Cultura ___________________ não está ligada a nenhum grupo social específico, pois, é transmitida de maneira industrializada, para um público generalizado , de diferentes camadas sócio-econômicas.",
      answers: {
        a: "Cultura Jovem",
        b: "Cultura de massa",
        c: "Cultura Erudita",
        d: "Cultura popular",
      },
      correctAnswer: "b"
    },
    {
      question: "2)  O ___________ é considerado um bem imaterial da humanidade.",
      answers: {
        a: "Brinquedo de miriti",
        b: "Acarajé",
        c: "Chapéu de palha",
        d: "Círio Nsa Sra de Nazaré"
      },
      correctAnswer: "d"
    },
    {
      question: "3) A(o) _____________ é considerada uma lenda da cultura popular paraense.",
      answers: {
        a: "Saci Pererê",
        b: "Mula sem cabeça",
        c: "lobisomem",
        d: "Matinta perera"
      },
      correctAnswer: "d"
    },
    
  ];

  
  buildQuiz();

  
  submitButton.addEventListener('click', showResults);
})();