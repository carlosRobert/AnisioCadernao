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
      question: "1) A Europa foi revitalizada, nos últimos séculos da Idade média, pelo reaquecimento do comércio e pela agitação da vida urbana. A transição do feudalismo para o capitalismo foi, aos poucos, modificando os valores, as ideias, as necessidades artísticas e culturais da sociedade europeia que resultou em uma sociedade:",
      answers: {
        a: "Que estimula uma sociedade efervescente pautada em proposta de um ensino composto por Poesia, Gramática, História, Filosofia;",
        b: "Sustentada por valores da cultura medieval que passam a reger a nova visão de mundo, mas não deixa de valorizar a mentalidade burguesa;",
        c: "Com a mentalidade dominante na Idade Média, que concebia um modelo de homem obediente à Igreja;",
        d: "Baseada no florescimento apenas do comércio centralizada no Estado;",
      },
      correctAnswer: "a"
    },
    {
      question: "2) A frase de Luís, “L’Etat c’est moi” (o estado sou eu), como definição da natureza do absolutismo monárquico, significava:",
      answers: {
        a: "A unidade do poder estatal, civil e religioso, com a criação de uma igreja Francesa (nacional).",
        b: "A superioridade do príncipe em relação a todas as classes sociais, reduzindo a um lugar humilde a burguesia enriquecida.",
        c: "A submissão da nobreza feudal pela eliminação de todos os seus privilégios fiscais.",
        d: "A centralização do poder real e absoluto do monarca na sua pessoa, sem quaisquer limites institucionais reconhecidos."
      },
      correctAnswer: "d"
    },
   
    
  ];

  
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();