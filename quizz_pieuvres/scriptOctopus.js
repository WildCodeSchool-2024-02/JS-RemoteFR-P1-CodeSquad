// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz() {
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function (question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function () {
        if (this.indexCurrentQuestion < this.questions.length) {
            timer.startTimer(5); // on démarre le timer avec le temps souhaité

            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );

        }
        else {
            questions_screen.style.display = "none";

            let trophyImg = document.querySelector("#trophyImg");
            let trophyText = document.querySelector("#trophyText");
            let NbrCorrectUser = document.querySelector("#nbrCorrects");

            NbrCorrectUser.textContent = quiz.nbrCorrects;
            if (quiz.nbrCorrects >= 6) {
                trophyImg.src = "../assets/trophy.png" // image trophy
                trophyText.textContent = "Bravo vous êtes un vrai molusque!"
            }
            else {
                trophyImg.src = "../assets/looser.png" // image du looser
                trophyText.textContent = "Vous êtes une crevette!"

            }

            result_screen.style.display = "block";


        }
    }
}


// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers, correctAnswers) {
    this.title = title,
        this.answers = answers,
        this.correctAnswers = correctAnswers,

        // Mise en place et structuration du HTML et CSS pour les questions
        this.getElement = function (indexQuestion, nbrOfQuestions) {
            let questionTitle = document.createElement("h3");
            questionTitle.classList.add("title_questions");
            questionTitle.textContent = this.title;

            // Le append sert à afficher le html 
            questions_screen.append(questionTitle);

            let questionAnswer = document.createElement("ul");
            questionAnswer.classList.add("list_questions");

            // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
            this.answers.forEach((answer, index) => {
                let answerElement = document.createElement("li");
                answerElement.classList.add("answers");
                answerElement.textContent = answer;
                answerElement.id = index + 1;
                answerElement.addEventListener("click", this.checkAnswer)

                questionAnswer.append(answerElement);
            });

            // Fonction pour voir à combien de question on est sur le total de questions présents
            let questionNumber = document.createElement("h4");
            questionNumber.classList.add("avancement_question");
            questionNumber.textContent = "Questions : " + indexQuestion + "/" + nbrOfQuestions;

            questions_screen.append(questionNumber);

            questions_screen.append(questionAnswer);
        }

    this.addAnswer = function (answer) {
        this.answers.push(answer);
    },

        // Ici on va checker la réponse correcte avec une écoute d'évènement :
        this.checkAnswer = (e) => {
            timer.stopTimer();
            let answerSelect = e.target;
            if (this.isCorrectAnswer(answerSelect.id)) {
                answerSelect.classList.add("answersCorrect");
                quiz.nbrCorrects++;
            } else {
                answerSelect.classList.add("answersWrong");
                let RightAnswers = this.correctAnswers.map(index => document.getElementById(index));
                RightAnswers.forEach(RightAnswer => {
                    RightAnswer.classList.add("answersCorrect");
                });
            }

            // Vérifiez si toutes les bonnes réponses ont été sélectionnées
            const allCorrectAnswersSelected = this.correctAnswers.every(index => {
                return document.getElementById(index).classList.contains("answersCorrect");


            });

            // Si toutes les bonnes réponses ont été sélectionnées, passez à la question suivante
            if (allCorrectAnswersSelected) {
                setTimeout(function () {
                    questions_screen.textContent = '';
                    quiz.indexCurrentQuestion++;
                    quiz.displayCurrentQuestion(1);
                }, 1100);
            }
        }

    // Si la réponse choisit par le user est égale à la réponse correcte retourner True sinon False
    this.isCorrectAnswer = function (answerUser) {
        return this.correctAnswers.includes(parseInt(answerUser)); // Vérifie si la réponse est dans les réponses correctes
    }


};


// On va récupérer notre fonction Quiz pour implémenter ses données dans ses arguments 
// Partie Création des mes données de Questions :
let timer = new Timer(); // on creer une INSTANCE de la classe Timer
// let timer2 = new Timer(); // on creer une deuxième INSTANCE indépendante de la classe Timer
let quiz = new Quiz(); // on creer une INSTANCE de la classe QUIZ


let question1 = new Question("Combien de bras possède la pieuvre ?", ["6", "8", "12"], [2]);
quiz.addQuestion(question1);

let question2 = new Question("En moyenne, combien de neuronnes possède une pieuvre ? ", ["500 millions", "5 millions", "Aucun car elle n'a pas de cerveau"], [1]);
quiz.addQuestion(question2);

let question3 = new Question("Où se trouvent les cellules de leur cerveaux ? ", ["Dans la tête comme tout le monde !", "Dans leurs bras", "Ca doit se ballader quelque part !"], [2]);
quiz.addQuestion(question3);

let question4 = new Question("Combien de coeur(s) possède(nt) les pieuvres ? ", ["1", "2", "3"], [3]);
quiz.addQuestion(question4);

let question5 = new Question("Les pieuvres peuvent se reconnaître entre elles, mais comment font-elles ? ", ["Par la vue", "Par les ondes", "Par des High-Five"], [3]);
quiz.addQuestion(question5);

let question6 = new Question("De quelle couleur est le sang de la pieuvre ? ", ["Rouge évidemment", "Bleu", "Noir"], [2]);
quiz.addQuestion(question6);

let question7 = new Question("A quelle vitesse, la pieuvre se propulse t-elle ? ", ["45km/h comme Usain Bolt", "25km/h", "60km/h"], [1]);
quiz.addQuestion(question7);

let question8 = new Question("Quelle taille maximale une pieuvre peut-elle atteindre ? ", ["5 mètres ", "10 mètres", "20 mètres"], [2]);
quiz.addQuestion(question8);

let question9 = new Question("A l'exception de certaines espèces, quel poids maximum une pieuvre peut-elle atteindre ? ", ["5kg", "20kg", "10kg"], [3]);
quiz.addQuestion(question9);

let question10 = new Question("Quelle qualité d'auto-défense, la pieuvre possède t-elle ? ", ["l'homomorphie", "l'homochromie", "elle est juste moche cela suffit déja pour effrayer !"], [2]);
quiz.addQuestion(question10);



let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function (NbrQuestion) {
    NbrQuestion.textContent = quiz.questions.length;
});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";

    quiz.displayCurrentQuestion();
}



let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);






function Timer() {
    let timer; // on instancie le timer pour pouvoir s'en servir dans les METHODES (une methode est une fonction lié a une classe)
    this.startTimer = (secondes) => {
        count = secondes
        timer = setInterval(function () { // on
            document.getElementById("timer_setInterval").innerHTML = count + " secondes"
            if (count == 0) {
                clearInterval(timer);
                document.getElementById("timer_setInterval").innerHTML = "Vous êtes trop lent!";
            }
            count--;
        }, 1000);
    }
    this.stopTimer = () => {
        clearInterval(timer);
    }
}

