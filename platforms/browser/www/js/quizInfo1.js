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
      question: "1) Dentre as principais suítes de aplicativos para escritório estão o LibreOffice, o Microsoft Office, e o Google Docs. O LibreOffice nomeia o seu programa de planilhas como:",
      answers: {
        a: "Excel",
        b: "Calc",
        c: "Word",
        d: "Writer",
      },
      correctAnswer: "b"
    },
    {
      question: "2) O LibreOffice nomeia o seu programa de processador de texto como: ",
      answers: {
        a: "PowerPoint",
        b: "Calc",
        c: "Writer.",
        d: "Word"
      },
      correctAnswer: "c"
    },
    {
      question: "3) O LibreOffice nomeia a sua ferramenta para criação de apresentações multimídias como:",
      answers: {
        a: "PowerPoint",
        b: "Excel",
        c: "Calc",
        d: "Impress"
      },
      correctAnswer: "d"
    },
    {
      question: "4) Qual desses NÃO é um software proprietário?",
      answers: {
        a: "Word",
        b: "Windows",
        c: "LibreOffice Calc",
        d: "Corel Draw"
      },
      correctAnswer: "c"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();