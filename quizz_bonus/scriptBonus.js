let indexCurrentQuestion = 0;   // Fonction question actuelle va servir dans le quiz + le timer

// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz() {  // initialise les variables
    this.questions = []; //tableau de question (vide)
    this.nbrCorrects = 0; // nombre de réponse correct = 0

    // Ajouts de questions
    this.addQuestion = function (question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function () {
        if (indexCurrentQuestion < this.questions.length) {
            timer.startTimer(10); // on démarre le timer avec le temps souhaité

            this.questions[indexCurrentQuestion].getElement(
                indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";
            document.getElementById("timer_setInterval").style.display = "none";


            let trophyImg = document.querySelector("#trophyImg");
            let trophyText = document.querySelector("#trophyText");
            let NbrCorrectUser = document.querySelector("#nbrCorrects");


            NbrCorrectUser.textContent = quiz.nbrCorrects;
            if (quiz.nbrCorrects >= 6) {  // si réponses >= 6, ajout d'image trophy + texte congrats
                trophyImg.src = "../assets/trophy.png"
                trophyText.textContent = "Bravo vous êtes incollable!"
            }
            else {
                trophyImg.src = "../assets/looser.png" // sinon ajout image looser + texte
                trophyText.textContent = "Allez révisez!"
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
                    indexCurrentQuestion++;
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
// Partie Création de Questions :
let timer = new Timer();
let quiz = new Quiz();

let question1 = new Question("Dans quelle animé, peut-on rencontrer la pieuvre Hank ? ", ["La Petite Sirène", "Atlantide", "Le Monde de Dory"], [3]);
quiz.addQuestion(question1);

let question2 = new Question("Comment s'appelle le poulpe collègue de Bob l'éponge ? ", ["Carlo", "Patrick", "Michel"], [1]);
quiz.addQuestion(question2);

let question3 = new Question("Qui est Ursula dans l'univers Walt Disney ? ", ["Un personnage de Lilo et Stitch ", "La méchante dans la Petite sirène", "Personne c'est le nom de ma tante"], [2]);
quiz.addQuestion(question3);

let question4 = new Question("Dans quel film peut-on apercevoir Blip-Bloop la pieuvre ? ", ["Peter Pan 2", "Peter Pan 1", "Vaïana"], [1]);
quiz.addQuestion(question4);

let question5 = new Question("Dans quel roman d'aventure paru en 1870, le héro se confronte au Kraken ? ", ["Voyage au centre de la terre", "20 000 lieues sous les mer", "L'île au trésor"], [2]);
quiz.addQuestion(question5);

let question6 = new Question("Comment s'appelle le pirate à tête de poulpe ennemie de Jack Sparrow ? ", ["Armando Salazar", "Barbe Noire", "Davy Jones"], [3]);
quiz.addQuestion(question6);

let question7 = new Question("Qui Spiderman affront-il dans le second volet sorti en 2004 ? ", ["Dc Octopus", "Le bouffon Vert", "Venom"], [1]);
quiz.addQuestion(question7);

let question8 = new Question("Dans quel manga/animé peut-on découvrir Hatchan (Octo en français) ? ", ["One Piece", "Dragon ball", "Demon Slayer"], [1]);
quiz.addQuestion(question8);

let question9 = new Question("Qui est Célia Mae dans Monstre & Cie ? ", ["La chef des monstres", "La petite fille", "La copine de Bob Razowski"], [3]);
quiz.addQuestion(question9);

let question10 = new Question("Dans quel film, des pieuvres mécaniques patrouillent sous la surface de la planète ? ", ["Alien", "Matrix", "Terminator"], [2]);
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

                questions_screen.textContent = '';
                indexCurrentQuestion++;
                quiz.displayCurrentQuestion();
            }
            count--;
        }, 1000);
    }
    this.stopTimer = () => {
        clearInterval(timer);
    }
}
