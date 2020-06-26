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
      question: "1) Dentre os sistemas produtivos anteriores ao modo Capitalista de produção podemos indicar dois anteriores, segundo uma ordem cronológica. São eles:",
      answers: {
        a: "Barbárie e Feudalismo	",
        b: "Feudalismo e Coronelismo",
        c: "Absenteísmo e Judaísmo",
        d: "Socialismo e Comunismo",
      },
      correctAnswer: "a"
    },
    {
      question: "2) O Sistema tinha como característica o domínio da terra pelo senhor em troca de proteção contra ataques bárbaros principalmente, nele se exerciam atividades produtivas que consideravam a relação de “Compadrio” entre o senhor e o demais ocupantes daqueles espaços. Estamos falando do sistema: ",
      answers: {
        a: "Social – democrata",
        b: "Capitalista",
        c: "Feudal",
        d: "Socialista"
      },
      correctAnswer: "c"
    },
    {
      question: "3) O Burgos são os embriões das feiras livre como temos hoje, nisso se viam naquela época as trocas baseadas no valor que os interessados dispensavam pelo bem em questão, ou seja, no início não haviam relações de trocas baseada em valores monetários, pois as moedas vieram bem depois. Estamos falando da modalidade: ",
      answers: {
        a: "À vista",
        b: "Financiamento",
        c: "Escambo",
        d: "À prazo"
      },
      correctAnswer: "c"
    },
    {
      question: "4) O processo de especialização da manufatura permite a produção de excedentes pelo artesão que passa a ser capaz de produzir em quantidade cada vez maiores a ponto dele produzir para abastecer o feudo, o Sr. feudal e a sua família. Tal processo foi o propiciador das mudanças, como:",
      answers: {
        a: "nas relações no sistema feudal, pois vai possibilitar a acumulação primitiva dos artesãos e o consequente enfraquecimento do poder do Sr. feudal",
        b: "liberdade na circulação de bens e serviços entre feudos cada vez mais interessados na livre concorrência",
        c: "ampliação da maquinofatura que irá promover a expansão do sistema feudal pelo restante do mundo, alcançando o continente americano inclusive",
        d: "fechamento das fronteiras ante a concorrência externa que prejudicava a produção eficiente dos feudos ultra especializados"
      },
      correctAnswer: "a"
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();