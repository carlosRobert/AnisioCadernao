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
      question: "1) Temos duas cargas elétricas Q idênticas separadas por uma distância de 4m. Determine o valor destas cargas, em Coulomb, sabendo que a intensidade da força entre elas é de 200 N.",
      answers: {
        a: "8 . 10<sup>-7</sup>",
        b: "3,55 .10<sup>-9</sup> ",
        c: "16 . 10<sup>-8</sup>",
        d: "5,96 .10<sup>-4</sup>",
      },
      correctAnswer: "d"
    },
    {
      question: "2) Duas esferas igualmente carregadas, no vácuo, repelem-se mutuamente quando separadas a uma certa distância. Triplicando a distância entre as esferas, a força de repulsão entre elas torna-se:",
      answers: {
        a: "3 vezes menor",
        b: "9 vezes menor",
        c: "6 vezes menor",
        d: "12 vezes menor"
      },
      correctAnswer: "b"
    },
    {
      question: "3) Calcule a intensidade da força elétrica de repulsão entre duas cargas puntiformes de  3.10<sup>-5</sup> C e 5.10<sup>-6</sup> C que se encontram no vácuo, separadas por uma distância de 15 cm. Dado: K = 9 . 10<sup>9</sup> N.m<sup>2</sup> /C<sup>2</sup>.",
      answers: {
        a: "60 N",
        b: "135 N",
        c: "15 N",
        d: "27 N "
      },
      correctAnswer: "a"
    },
   
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();