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
    if (numCorrect == 0) {
       document.getElementById("t1").innerHTML = "Você precisa estudar mais!";
    }
    else if (numCorrect == 1) {
      document.getElementById("t1").innerHTML = "Parabéns!";
    }
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) No conto “Como um filho querido” a esposa e o esposo foram ao tabelião com intuito de:",
      answers: {
        a: "regularizar a situação de um parente registrando seu nome. ",
        b: "registrar o nome do filho querido que há 40 anos fazia parte da família, mas não tinha registro.",
        c: "buscar informações sobre a documentação para a adoção do filho querido. ",
        d: "lavrar o ato de adoção do bolo no tabelionato, e assim, incorporá-lo à família como um filho querido com direito ao sobrenome da família Silva.",
      },
      correctAnswer: "d"
    },
    {
      question: "2) <p><h3>Todo ponto de vista é a vista de um ponto</h3></p><br><p> Ler significa reler e compreender, interpretar. Cada um lê com os olhos que tem. E interpreta a partir de onde os pés pisam. Todo ponto de vista é um ponto. Para entender como alguém lê, é necessário saber como são seus olhos e qual é sua visão de mundo. Isso faz da leitura sempre uma releitura. A cabeça pensa a partir de onde os pés pisam. Para compreender, é essencial conhecer o lugar social de quem olha. Vale dizer: como alguém vive, com quem convive, que experiências tem, em que trabalha, que desejos alimenta, como assume os dramas da vida e da morte e que esperanças o animam. Isso faz da compreensão sempre uma interpretação.<cite>(BOFF, Leonardo. A águia e a galinha. 4. ed. RJ: Sextante, 1999).</cite></p>A expressão “com os olhos que tem” no texto, tem o sentido de:<p></>",
      answers: {
        a: "individualizar a leitura.",
        b: "priorizar a leitura.",
        c: "promover a leitura.",
        d: "incentivar a leitura."
      },
      correctAnswer: "a"
    },
   
    
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();