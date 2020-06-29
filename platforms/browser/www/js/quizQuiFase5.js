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
      document.getElementById("t1").innerHTML = "Está bom, mas pode melhorar!";
    }
    else if (numCorrect == 4) {
      document.getElementById("t1").innerHTML = "Parabéns!";
    }
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) Segundo Composto acima, marque a alternativa correta, Trata-se de uma cadeia: ",
      answers: {
        a: "aberta",
        b: "homogênea",
        c: "insaturada",
        d: "heterogênea",
      },
      correctAnswer: "d"
    },
    {
      question: "2) Quanto a classificação do carbono:",
      answers: {
        a: "Existem 3 carbonos secundários.",
        b: "Existe 1 carbono quaternário.",
        c: "Existem 5 carbonos primários.",
        d: "Existe 1 carbono primário."
      },
      correctAnswer: "a"
    },
    {
      question: "3) Sua fórmula molecular será:",
      answers: {
        a: "C<sub>7</sub>H<sub>14</sub>O<sub>2</sub>",
        b: "C<sub>7</sub>H<sub>12</sub>O<sub>2</sub>",
        c: "C<sub>7</sub>H<sub>14</sub>O",
        d: "C<sub>6</sub>H<sub>14</sub>O<sub>2</sub>"
      },
      correctAnswer: "a"
    },
    {
      question: "4) Quantas ligações sigmas existem na molécula:",
      answers: {
        a: "22",
        b: "23",
        c: "21",
        d: "24"
      },
      correctAnswer: "c"
    },
    {
      question: "5) Trata-se de uma cadeia:",
      answers: {
        a: "aberta, homogênea, normal e saturada",
        b: "cíclica homogênea, normal e insaturada",
        c: "aberta, homogênea, ramificada e saturada",
        d: "cíclica, heterogênea, ramificada e saturada"
      },
      correctAnswer: "d"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();