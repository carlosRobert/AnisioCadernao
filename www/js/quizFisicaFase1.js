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
      question: "1) Após chover na cidade de São Paulo, as águas da chuva descerão o rio Tietê até o rio Paraná, percorrendo cerca de 1.000km. Sendo de 4km/h a velocidade média das águas, o percurso mencionado será cumprido pelas águas da chuva em aproximadamente:",
      answers: {
        a: "30 dias",
        b: "10 dias",
        c: "25 dias",
        d: "2 dias",
      },
      correctAnswer: "b"
    },
    {
      question: "2) Um carro percorreu a metade de uma estrada viajando a 30km/h e a outra metade da estrada a 60km/h. Sua velocidade média no percurso total foi, em km/h, de ",
      answers: {
        a: "60",
        b: "54",
        c: "48",
        d: "40"
      },
      correctAnswer: "d"
    },
    {
      question: "3) Ao cobrar uma falta em um jogo de futebol, um jogador imprime à bola uma velocidade de 43,2 km/h. Sabendo que a bola gasta 3 s até atingir as redes, determine a distância percorrida. ",
      answers: {
        a: "36 m",
        b: "48 m",
        c: "52 m",
        d: "75 m"
      },
      correctAnswer: "a"
    },
    {
      question: "4) Um jogador de futebol, ao finalizar um lance na grande área para o gol, chuta a bola e esta alcança a velocidade de 22m/s em 0,2s. O goleiro consegue parar a bola através do recuo dos braços. Determine a aceleração da bola ao ser parada pelo goleiro. ",
      answers: {
        a: "110 m/s<sup>2</sup>",
        b: "50 m/s<sup>2</sup>",
        c: "44 m/s<sup>2</sup>",
        d: "60 m/s<sup>2</sup>"
      },
      correctAnswer: "a"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();