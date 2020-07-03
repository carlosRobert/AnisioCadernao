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
      question: "1) A Sociologia passou a ter mais importância a partir de dois eventos históricos importantes a Revolução Industrial e a Revolução Francesa. Essas duas revoluções colaboraram para?",
      answers: {
        a: "O surgimento da sociedade de castas.",
        b: "O nascimento da sociedade estamental.",
        c: "O surgimento da sociedade capitalista.",
        d: "O início da sociedade hierárquica.",
      },
      correctAnswer: "c"
    },
    {
      question: "2) Uma das consequências diretas da Revolução Industrial e das péssimas condições de trabalho foi:",
      answers: {
        a: "A eclosão de movimentos de protesto e uma organização da classe trabalhadora.",
        b: "O surgimento movimentos pelo fim da sociedade industrial.",
        c: "A luta pela preservação ambiental em oposição a degradação da natureza, devido a industrialização.",
        d: "Crescimento da violência urbana."
      },
      correctAnswer: "d"
    },
    {
      question: "3) A Revolução Industrial foi responsável por intensas mudanças que ocasionaram no surgimento de novos grupos sociais que eram antagônicos. Quais eram esses grupos sociais?",
      answers: {
        a: "Nobreza e camponeses.",
        b: "Clero e proletariado.",
        c: "Burguesia e proletariado.",
        d: "Burguesia e camponeses."
      },
      correctAnswer: "c"
    },
    
  ];

  
  buildQuiz();

  
  submitButton.addEventListener('click', showResults);
})();