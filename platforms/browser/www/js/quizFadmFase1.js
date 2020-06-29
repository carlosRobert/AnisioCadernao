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
      question: "1) Administração é um processo que consiste em:",
      answers: {
        a: "organizar, depois do planejamento, na busca do alcance de objetivos estabelecidos de uma forma eficaz e eficiente",
        b: "coordenar, antes de planejar, para alcance de objetivos firmes em que a eficiência é tudo e a eficácia pode ser relegada a segundo plano",
        c: "gerenciar, depois de organizar, sem necessidade de planejar, para alcance de objetivos naturais",
        d: "controlar, antes de planejar, e, depois de coordenar a produção eficiente e eficaz",
      },
      correctAnswer: "a"
    },
    {
      question: "2) Eficiência e Eficácia são duas condições inerentes a definição de excelência profissional da administração, objetivo de todos, em que a segunda diz respeito a primeira, a medida que:",
      answers: {
        a: "ser eficiente normalmente torna a administração eficaz, pois fazer correto sempre significa fazer bem feito",
        b: "o principal são os melhores resultados sempre, daí uma excelente administração considerar os fins e não os meios, pois ser apenas eficiente pode deixar a desejar",
        c: "não importam os meios que eu utilize com tanto que alcance os resultados a qualquer custo ainda que sacrifique a empresa em determinados momentos, o que importam são os fins",
        d: "revela-se certas situações para que não hajam complicações de mais esforços, quanto menores os esforços melhor para todos"
      },
      correctAnswer: "b"
    },
    {
      question: "3) <p>Frederick Winslow Taylor (EUA) é tido como “pai” da Administração científica a medida que propôs no século XIX mudanças segundo seus estudos que buscavam o aumento da produtividade e a minimização dos esforços dos operário no chão de fábrica principalmente, pois ele começa como operário e estudando chega a engenheiro, tornando-o amplo conhecedor das implicações da produção.</p><p>No século XX, Henry Ford e outros industriais, tinham sérios problemas para gerenciar gigantescos conglomerador, pois enfrentavam:</p> ",
      answers: {
        a: "turnos diários de trabalho cada vez menores em função da atuação dos sindicatos que já, no principio da industrialização, se faziam presentes na atenção aos trabalhadores",
        b: "a alta taxa de rotatividade, além da baixa qualificação profissional ante a necessidade de adaptação às novas tecnologias e a alta pressão por produtividade",
        c: "uma política salarial razoavelmente boa a medida que os salários eram pagos em função da produtividade que sempre foi crescente em todos os tempos",
        d: "grande qualificação profissional da mão de obra, e, já que havia excesso de trabalhadores qualificados os salários sempre foram muito baixos"
      },
      correctAnswer: "b"
    },
   
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();