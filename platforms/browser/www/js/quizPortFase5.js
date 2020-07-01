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

      // se resposta está correta
      if(userAnswer === currentQuestion.correctAnswer){
        
        numCorrect++;

        
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
     
      else{
        
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    
    resultsContainer.innerHTML = `Você acertou ${numCorrect} do total de ${myQuestions.length} questão.`;
    if (numCorrect == 0) {
       document.getElementById("t1").innerHTML = "Você precisa estudar mais!";
    }

    else {document.getElementById("t1").innerHTML = "Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) O tema abordado no miniconto “Para que ninguém a quisesse” de Marina Colasanti é:",
      answers: {
        a: "violência contra mulher e a submissão do feminino.",
        b: "relações amorosas entre homens e mulheres no século XXI.",
        c: "relação de poder entre homem e mulher na sociedade atual.",
        d: "sentimento de inferioridade das mulheres com relação aos homens.",
      },
      correctAnswer: "a"
    },
    
  ];

 
  buildQuiz();

  
  submitButton.addEventListener('click', showResults);
})();