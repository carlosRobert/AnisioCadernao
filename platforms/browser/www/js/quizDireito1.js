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
        question: "1) Sua finalidade diz respeito à preservação da SEGURANÇA. A qual deve ser entendida como segurança jurídica. Uma vez que, não há pessoa, grupo social, entidade pública ou privada, que não tenha necessidade de segurança jurídica, para atingir seus objetivos e até mesmo para sobreviver.\nO período acima se refere ao objetivo do(a): ",
        answers: {
          a: "Direito.",
          b: "Jurisprudência.",
          c: "Justiça.",
          d: "Moral.",
        },
        correctAnswer: "a"
      },
      {
        question: "2) Marque a alternativa em que contenha os tipos de lei existentes no ordenamento jurídico brasileiro.",
        answers: {
          a: "Leis complementares; Normativas circulares; leis delegadas; decretos.",
          b: "Leis marciais; leis complementares; leis delegadas; resoluções.",
          c: "Leis complementares; leis ordinárias; leis delegadas; decretos.",
          d: "Leis complementares; leis suplementares; leis marciais; decretos.",
        },
        correctAnswer: "c"
      },
      {
        question: "3) É um dos mais antigos conjuntos de leis já encontrados, na história da humanidade, e tem por base a Lei do Talião",
        answers: {
          a: "Código Faraônico.",
          b: "Lei da XII tábuas.",
          c: "Código de Hamurabi.",
          d: "Lex Aquila"
        },
        correctAnswer: "c"
      },
      {
        question: "4) A constituição Federal poderá ser alterada, a fim de melhor explicar seu texto ou atualizá-lo. Tal alteração se dá através da(o):",
        answers: {
          a: "Lei Complementar.",
          b: "Emenda Constitucional.",
          c: "Aditivo Constitucional.",
          d: "Revisão Constitucional."
        },
        correctAnswer: "b"
      }, 

    ];
  
    // Kick things off
    buildQuiz();
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
  })();