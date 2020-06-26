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
      question: "1) Uma panela com água é aquecida de 25°C para 80°C. A variação de temperatura sofrida pela panela com água, nas escalas Kelvin e Fahrenheit, foi de:",
      answers: {
        a: "32 K e 105°F ",
        b: "55 K e 99°F  ",
        c: "57 K e105°F",
        d: "99 K e 105°F",
      },
      correctAnswer: "b"
    },
    {
      question: "2) Maria usou um livro de receitas para fazer um bolo de fubá. Mas, ao fazer a tradução do livro do inglês para o português, a temperatura permaneceu em Fahrenheit (ºF). A receita disse que o bolo deve ser levado ao forno a 392ºF e permanecer nessa temperatura por 30 minutos. Qual é a temperatura em graus Celsius que Maria deve deixar o forno para não errar a receita?",
      answers: {
        a: "200°C",
        b: "100°C",
        c: "362°C",
        d: "150°C"
      },
      correctAnswer: "a"
    },
    {
      question: "3) Para medir a febre de pacientes, um estudante de medicina criou sua própria escala linear de temperaturas. Nessa nova escala, os valores de O (zero) e 10 (dez) correspondem, respectivamente, a 37°C e 40°C. A temperatura de mesmo valor numérico em ambas as escalas é aproximadamente:",
      answers: {
        a: "52,9",
        b: "28,5",
        c: "74,3",
        d: "8,5"
      },
      correctAnswer: "a"
    },
   
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();