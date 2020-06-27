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
    else if (numCorrect <= 4) {
      document.getElementById("t1").innerHTML = "Parabéns!";
    }
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) Sobre os Remédios Constitucionais, marque a assertiva INCORRETA:",
      answers: {
        a: "O Habeas Corpus protege o direito de ir e vir do indivíduo;",
        b: "A Ação Popular pode ser realizada por qualquer pessoa, desde que a mesma seja cidadã;",
        c: "O habeas data resguarda o direito à informação;",
        d: "O mandado de segurança não protege direito líquido e certo.",
      },
      correctAnswer: "d"
    },
    {
      question: "2) Pode ser entendida como o entendimento dos magistrados, exteriorizados em sentenças ou acórdãos, no qual manifestam, de forma harmônica, conhecimento acerca do direito aplicado a um caso concreto, cujos fundamentos das decisões são colocados à disposição da comunidade jurídica através de publicações, servindo como base a pesquisa em contribuição ao saber jurídico. ",
      answers: {
        a: "Doutrina",
        b: "Jurisprudência",
        c: "Lei",
        d: "Costume"
      },
      correctAnswer: "b"
    },
    {
      question: "3) Segundo o Art. 3º da C/88 constituem objetivos fundamentais da República Federativa do Brasil, EXCETO:",
      answers: {
        a: "construir uma sociedade livre, justa e solidária;",
        b: "garantir o desenvolvimento nacional;",
        c: "erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais;",
        d: "promover o bem de alguns, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação."
      },
      correctAnswer: "d"
    },
    {
      question: "4) É o comportamento que se repete no tempo. Há o costume quando as pessoas adquirem um hábito comportamental duradouro, praticando espontaneamente a conduta.",
      answers: {
        a: "Doutrina",
        b: "Jurisprudência",
        c: "Lei",
        d: "Costume"
      },
      correctAnswer: "d"
    },
    {
      question: "5) O _________ destina-se a disciplinar interesses gerais da coletividade, dizendo respeito à coletividade. Ao passo que o __________ é o conjunto de preceitos reguladores das relações dos indivíduos entre si. Tais conceitos dizem respeito, respectivamente à:",
      answers: {
        a: "Direito Privado e Direito Público.",
        b: "Direito Público e Direito Comparado",
        c: "Direito Pátrio e Direito Privado",
        d: "Direito Público e Direito Privado"
      },
      correctAnswer: "d"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();