(function(){
  function buildQuiz(){
    // variável para armazenar a saída HTML
    const output = [];

    // para cada pergunta ...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variável para armazenar a lista de respostas possíveis
        const answers = [];

        // e para cada resposta disponível ...
        for(letter in currentQuestion.answers){

          // ...... add HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // adicione esta pergunta e suas respostas à saída
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finalmente combinamos nossa lista de saída em uma string de HTML e a colocamos na página
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // reunir containers de respostas do nosso quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // acompanhar as respostas do usuário
    let numCorrect = 0;

    // para cada pergunta ...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // encontre a resposta selecionada
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add ao número de respostas corretas
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
      question: "1) É comum dizer que todos os organismos são formados por células, estruturas conhecidas como a unidade funcional e estrutural dos seres vivos. Alguns organismos, no entanto, são acelulares e, por isso, alguns autores não os consideram vivos. Entre os seres listados abaixo, qual é o único que não possui células em sua constituição?",
      answers: {
        a: "Bactérias.",
        b: "Fungos.",
        c: "protozoários.",
        d: "Vírus.",
      },
      correctAnswer: "d"
    },
    {
      question: "2) (FaZU) Na divisão dos seres vivos em cinco reinos, qual deles é o mais inferior por conter organismos dotados de organização mais simples?",
      answers: {
        a: "Monera",
        b: "Protista",
        c: "Fungi",
        d: "Metaphyta"
      },
      correctAnswer: "a"
    },
    {
      question: "3) Sabemos que todos os seres vivos, com exceção dos vírus, são formados por células. Entretanto, alguns organismos possuem apenas uma célula, enquanto outros possuem milhares. O conjunto de células com estrutura e funções semelhantes recebe o nome de:",
      answers: {
        a: "Órgão.",
        b: "Organela.",
        c: "Tecido",
        d: "Molécula"
      },
      correctAnswer: "c"
    },
    {
      question: "4) Para um organismo ser considerado vivo, algumas características devem estar presentes. Analise as alternativas a seguir e marque o único atributo que NÃO é encontrado em todos os seres vivos.",
      answers: {
        a: "Hereditariedade.",
        b: "Capacidade de responder a estímulos.",
        c: "Corpo formado por várias células.",
        d: "Metabolismo."
      },
      correctAnswer: "c"
    },
  ];

  
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();