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
      question: "1) Calcule a distância do ponto P(3,-4) à origem do sistema cartesiano.",
      answers: {
        a: "3",
        b: "11",
        c: "10",
        d: "5",
      },
      correctAnswer: "d"
    },
    {
      question: "2) Calcule a distância entre os pontos:A(7,-3) e B(-5,2)",
      answers: {
        a: "5",
        b: "13",
        c: "10",
        d: "4"
      },
      correctAnswer: "b"
    },
    {
      question: "3) (CEFET-RN/2008) Dois amigos, Adão e Eva, encontram-se na origem de um sistema cartesiano ortogonal. Eles só podem dar um passo de cada vez para Norte, Sul, Leste ou Oeste. Cada passo é representado, nesse sistema, pelo deslocamento de uma unidade para uma das direções mencionadas anteriormente. Eva deu 2 passos para o Sul, depois deu 5 passos para o Leste e parou. Adão deu 7 passos para o Norte, depois deu 3 passos para o Oeste, mais 3 passos para o Sul e parou. Após esses passos, podemos afirmar que a distância entre Adão e Eva é de:",
      answers: {
        a: "10 passos",
        b: "5 passos",
        c: "4 passos",
        d: "8 passos"
      },
      correctAnswer: "a"
    },
   
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();