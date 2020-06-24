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
      question: "1) O átomo é a menor partícula que identifica um elemento químico. Ele possui duas partes, a saber: uma delas é o núcleo, constituído por prótons e nêutrons, e a outra é a região externa – a eletrosfera-, por onde circulam os elétrons. Alguns experimentos permitiram a descoberta das características das partículas constituintes do átomo. Em relação a essas características, indique a alternativa correta.",
      answers: {
        a: "prótons e elétrons possuem massas iguais e cargas elétricas de sinais opostos.",
        b: "entre as partículas atômicas, os elétrons têm maior massa e ocupam maior volume no átomo.",
        c: "entre as partículas atômicas, os prótons e os nêutrons têm maior massa e ocupam maior volume no átomo.",
        d: "entre as partículas atômicas, os prótons e os nêutrons têm mais massa, mas ocupam um volume muito pequeno em relação ao volume total do átomo.",
      },
      correctAnswer: "d"
    },
    {
      question: "2) (UFCE) Na tentativa de montar o intrincado quebra-cabeça da evolução humana, pesquisadores têm utilizado relações que envolvem elementos de mesmo número atômico e diferentes números de massa para fazer a datação de fósseis originados em sítios arqueológicos. Quanto a esses elementos, é correto afirmar que são:",
      answers: {
        a: "isóbaros",
        b: "isótonos",
        c: "isótopos",
        d: "alótropos"
      },
      correctAnswer: "c"
    },
    {
      question: "3) (EAM - 2016)- A qual das espécies abaixo corresponde ao conceito de elemento químico?",
      answers: {
        a: "Substância",
        b: "Molécula",
        c: "Íon",
        d: "Átomo"
      },
      correctAnswer: "d"
    },
    {
      question: "4) (EAM - 2014)- Alguns elementos químicos artificiais não têm aplicação no dia a dia, contudo sua produção ajuda a entender melhor a estrutura dos átomos. Um dos últimos elementos químicos artificiais foi produzido em laboratório por cientistas. Para tanto, eles usaram um acelerador de partícula que lançou núcleos de plutônio para produzir um átomo com 114 prótons e 175 nêutrons. Sendo assim, pode-se afirmar que o número:",
      answers: {
        a: "atômico desse novo elemento é 114",
        b: "atômico desse novo elemento é 175",
        c: "de massa desse novo elemento é 114",
        d: "de massa desse novo elemento é 175"
      },
      correctAnswer: "a"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();