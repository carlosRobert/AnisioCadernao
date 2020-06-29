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
      question: " Considerando a abordagem do texto, os bens imateriais enfatizam a importância das representações culturais para a:",
      answers: {
        a: "Construção da identidade nacional.",
        b: "Elaboração do sentimento religioso.",
        c: "Reprodução do trabalho coletivo.",
        d: "Reprodução do saber tradicional.",
      },
      correctAnswer: "a"
    },
    {
      question: "2) Os noticiários sobre o continente africano, na maioria das vezes, destacam os problemas sociais, os conflitos étnicos, a fome, as doenças, entre outros fatores negativos. No entanto, ao estudar sobre alguns reinos e povos do continente africano identifica-se:",
      answers: {
        a: "Belezas naturais escondida pela pobreza e doenças contraídas por vírus como o ébola e a Covid-19, que já mostra um quadro como o Continente com maior índice de contaminação do mundo;",
        b: "Que os conflitos e guerras tribais entre as nações africanas deixaram esse quadro de calamidade que ainda hoje está presente como principal característica da história desse povo;",
        c: "O quanto são pertinentes essas informações noticiadas;",
        d: "Que a África tem diversas riquezas naturais (água, petróleo, ouro, diamantes), além de possuir diversas etnias, comunidades humanas com línguas, costumes diversos."
      },
      correctAnswer: "d"
    },
    {
      question: "3) <p>'Para os egípcios, o outro mundo encerrava os mesmos prazeres desfrutados na terra – criados, caça, pesca, lazer em família, boa comida e músicas. Mas, para ter acesso a tudo isso, o morto precisava ser absolvido num julgamento final.'</p><cite>(BRAICK. P.R.; MOTA, M. B. História: das cavernas ao terceiro milênio. São Paulo: Moderna, 2007. p. 53.)</cite><p>O deus responsável pelo julgamento dos mortos na religião do antigo Egito era:</p>",
      answers: {
        a: "Aton",
        b: "Isis",
        c: "Osíris",
        d: "Anúbis"
      },
      correctAnswer: "d"
    },
    
  ];

  
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();