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
      question: "1)No contexto das suítes de aplicativos para escritório podemos afirmar que:",
      answers: {
        a: "um texto feito no Microsoft word não pode ser “aberto” no LibreOffice writer.",
        b: "o LibreOffice é uma suíte de aplicativos de escritório que não pode ser instalada no sistema Windows caso já tenha o pacote office da Microsoft instalado.",
        c: "o LibreOffice impress é funcionalmente equivalente ao Microsoft Excel.",
        d: "O LibreOffice Calc serve para fazer planilhas.",
      },
      correctAnswer: "d"
    },
    {
      question: "2) O LibreOffice é uma suíte de escritório que compreende programas para processamento de texto, a criação e edição de planilhas, apresentações de slides, diagramas e desenhos. Marque a resposta correta:",
      answers: {
        a: "O LibreOffice é um software proprietário muito parecido com o pacote office da Microsoft;",
        b: "O Calc é o editor de planilhas eletrônicas do Libreoffice e é um software similar ao Microsoft word;",
        c: "Entre os programas que compõem o LibreOffice, podemos destacar o writer, que é um processador de texto;",
        d: "O Calc é o editor de planilhas eletrônicas do Microsoft Excel;"
      },
      correctAnswer: "c"
    },
    {
      question: "3) O LibreOffice possui alguns aplicativos que apresentam funcionalidades semelhantes às apresentadas pelos aplicativos do MS-Office. O Writer do LibreOffice gera documentos com a extensão:",
      answers: {
        a: ".odt",
        b: ".docx",
        c: ".ppt",
        d: ".doc"
      },
      correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();