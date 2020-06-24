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
      question: "1) Os ácidos HClO<sub>4</sub>, H<sub>2</sub>MnO<sub>4</sub>, H<sub>3</sub>BO<sub>3</sub>, H<sub>4</sub>Sb<sub>2</sub>O<sub>7</sub>, quanto ao número de hidrogênios ionizáveis, podem ser classificados em:",
      answers: {
        a: "monoácido, diácido, triácido, tetrácido.",
        b: "monoácido, diácido, triácido, triácido.",
        c: "monoácido, diácido, diácido, tetrácido.",
        d: "monoácido, monoácido, diácido, triácido.",
      },
      correctAnswer: "a"
    },
    {
      question: "2) A respeito das substâncias denominadas ácidos, um estudante anotou as seguintes características: Ele cometeu somente um erro em:",
      answers: {
        a: "são adstringentes",
        b: "conduz corrente elétrica",
        c: "formam íons em solução aquosa",
        d: "queimam em contato com a pele"
      },
      correctAnswer: "a"
    },
    {
      question: "3) (UESPI) Sejam os ácidos relacionados a seguir, com seus respectivos graus de ionização em porcentagem (α%):HClO<sub>4</sub> (α% = 97%);H<sub>2</sub>SO<sub>4</sub> (α% = 61%);H<sub>3</sub>BO<sub>3</sub> (α% = 0,025%);H<sub>3</sub>PO<sub>4</sub> (α% = 27%); HNO<sub>3</sub>(α% = 92%).<br> Assinale a afirmativa correta:",
      answers: {
        a: "H<sub>3</sub>PO<sub>4</sub> é mais forte que H<sub>2</sub>SO<sub>4</sub>.",
        b: "HNO<sub>3</sub> é um ácido mode",
        c: "HClO<sub>4</sub> é mais fraco que HNO<sub>3</sub>",
        d: "H<sub>3</sub>BO<sub>3</sub> é um ácido fraco."
      },
      correctAnswer: "d"
    },
    {
      question: "4) A nomenclatura para o ácido moderado da questão anterior será",
      answers: {
        a: "ácido clórico",
        b: "ácido sulfúrico",
        c: "ácido bórico",
        d: "ácido fosfórico"
      },
      correctAnswer: "d"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();