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
    if (numCorrect ==0) {
       document.getElementById("t1").innerHTML = "Você precisa estudar mais!";
    }
    else if (numCorrect == 1) {
      document.getElementById("t1").innerHTML = "Foi legal!<br> Mas você pode melhorar.";
    }
    else {document.getElementById("t1").innerHTML = "Você acertou todas! Parabéns!"; }
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1)<p>“As reformas, o progresso da cidade – conseqüência do aumento da riqueza –, tais como demolições de bairros velhos, (...) alargamento das ruas para a circulação comercial, etc., expulsam sempre os pobres para os cantos e recantos cada vez mais sujos e insalubres” (Marx e Engels – sec XIX).</p><cite>(DANTAS, José, História do Brasil, São Paulo: Moderna, 1990, p. 212)</cite><p>No Brasil, a observação de Marx e Engels se relaciona ao contexto histórico:</p>",
      answers: {
        a: "Revolta de Canudos.",
        b: "Revolta da Vacina.",
        c: "Guerra do Contestado.",
        d: "Revolta do cangaço.",
      },
      correctAnswer: "b"
    },
    {
      question: "2) Diante do cenário político de controle do voto e da consequente manipulação por parte dos grandes proprietários de terra que controlavam a política através de uma tessitura da política dos governadores, a realidade social da República Velha foi marcada por inúmeras revolta rurais que tiveram como principal causa:",
      answers: {
        a: "A disputa por terras, como na região do Contestado que diante do desrespeito do governo com a população que vivia no lugar explodiu uma guerra contra o governo;",
        b: "O descaso com o campo e o incentivo ao messianismo que marcou especialmente os movimentos de Canudos e Contestado;",
        c: "As guerras entre os coronéis que impedia o desenvolvimento do campo deixando miséria e fome por onde aconteciam esses conflitos;",
        d: "Canudos, Contestado ou cangaço foram marcados pela situação de miséria no campo diante da crise econômica e social no Brasil da chamada República Velha;"
      },
      correctAnswer: "d"
    },
   
    
  ];

  
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();