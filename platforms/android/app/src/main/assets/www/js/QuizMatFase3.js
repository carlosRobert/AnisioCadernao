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
      question: "1) Com relação aos anagramas da palavra ESTADO, qual é o total de anagramas?",
      answers: {
        a: "720",
        b: "120",
        c: "24",
        d: "240",
      },
      correctAnswer: "a"
    },
    {
      question: "2) Determine quantos anagramas da palavra ESCOLA começam com E e terminam com A",
      answers: {
        a: "12",
        b: "120",
        c: "24",
        d: "720"
      },
      correctAnswer: "c"
    },
    {
      question: "3) Maurício e sua esposa Ana tem três filhos: Leandro, Marcelo e Maurício Junior. De quantas maneiras essa família composta de 5 pessoas pode sentar-se num banco de 5 lugares para tirar uma foto, ficando o pai e a mãe sempre juntos, em qualquer ordem?",
      answers: {
        a: "5",
        b: "120",
        c: "24",
        d: "48"
      },
      correctAnswer: "d"
    },
    {
      question: "4) ) Quantos são os anagramas da palavra BATATA?",
      answers: {
        a: "720",
        b: "60",
        c: "120",
        d: "30"
      },
      correctAnswer: "b"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();