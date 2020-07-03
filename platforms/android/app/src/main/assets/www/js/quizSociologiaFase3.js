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
    if (numCorrect ==0) {
       document.getElementById("t1").innerHTML = "Você precisa estudar mais!";
    }
    else if (numCorrect ==1) {
      document.getElementById("t1").innerHTML = "Parabéns! Mas você pode melhorar!";
    }
    
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) A acumulação flexível, da qual resulta o sistema de produção toyotista, caracteriza-se por:",
      answers: {
        a: "divisão do trabalho no maior número de trabalhadores possíveis",
        b: "produção em massa",
        c: "realização de várias funções por um mesmo trabalhador",
        d: "fortalecimento dos sindicatos e leis trabalhistas",
      },
      correctAnswer: "c"
    },
    {
      question: "2) O trabalho do proletário está diretamente relacionado ao trabalho assalariado, durante o processo de urbanização e industrialização a partir do século XVIII. Sobre o tema, está correto:",
      answers: {
        a: "O trabalho assalariado está diretamente relacionado ao mundo liberal e descentralizado politicamente característicos da modernidade.",
        b: "O trabalho do proletário caracteriza-se pela venda da força de trabalho, sua propriedade, ao capitalista.",
        c: "O proletariado consegue reunir em torno de si, no trabalho assalariado o que ele necessita para garantir sua sobrevivência.",
        d: "O capitalista, dono dos meios de produção, paga ao proletariado o que ele merece pela dedicação ao trabalho regular."
      },
      correctAnswer: "b"
    },
  
    
  ];

  
  buildQuiz();

  
  submitButton.addEventListener('click', showResults);
})();