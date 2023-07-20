import { questions } from "./Questions.js";
const headContainer = document.querySelector(".head");
const contentContainer = document.querySelector(".content");
const steps = document.querySelector("#steps");
const options = document.querySelector("#options");
const title = document.querySelector("#title");
const btnInit = document.querySelector(".btn-init");
const btnEnd = document.querySelector(".btn-end");
const score = document.querySelector("#score");
const total = document.querySelector("#total");

let indexQuest = 0;
let countQuest = questions.length;
let countQuestCorrect = 0;

function setInitialStyle() {
    headContainer.classList.remove("question");
    contentContainer.classList.add("init");
    contentContainer.classList.remove("progress");
    contentContainer.classList.remove("end");
    steps.innerText = "";
    title.innerText = "Quiz - Desenvolvimento Web";
}

function setFinalStyle() {
    headContainer.classList.remove("question");
    contentContainer.classList.add("end");
    contentContainer.classList.remove("progress");
    contentContainer.classList.remove("init");
    title.innerText = "Quiz - Desenvolvimento Web";
    score.innerText = countQuestCorrect;
    total.innerText = countQuest;
}

function setQuizStyle() {
    headContainer.classList.add("question");
    contentContainer.classList.add("progress");
    contentContainer.classList.remove("init");
    contentContainer.classList.remove("end");
}

function fillAndConfigureDataQuestion(index) {
    const question = questions[index];
    title.innerText = question.title;
    options.innerHTML = "";
    for(let id in question.options) {
        options.innerHTML += `<button class="btn-option" data-id="${id}">${question.options[id]}</button>`;
    }
    steps.innerHTML = `${(index+1)}/${countQuest}`;
    configureOptionActions();
}

function configureOptionActions() {
    const btnOpts = document.querySelectorAll(".btn-option");
    for(let btn of btnOpts) {
        btn.addEventListener("click", resolveQuestion);
    }
}

function resolveQuestion(event) {
    const btnClicked = event.target;
    const idClicked = btnClicked.dataset.id;
    const idCorrect = questions[indexQuest].correctIndex;
    if(idClicked != idCorrect) {
        btnClicked.classList.add("fail");
    }
    else {
        countQuestCorrect++;
    }
    const btnOpts = document.querySelectorAll(".btn-option");
    for(let btn of btnOpts) {
        const id = btn.dataset.id;
        if(id == idCorrect) {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    }
    setTimeout(() => {
        if((indexQuest+1) == countQuest) {
            setFinalStyle();
        } else {
            fillAndConfigureDataQuestion(++indexQuest);
        }
    }, 600);
}

function initializeQuiz() {
    countQuest = questions.length;
    indexQuest = 0;
    countQuestCorrect = 0;
    setInitialStyle();
}

function startQuiz() {
    fillAndConfigureDataQuestion(0);
    setQuizStyle();
}

btnInit.addEventListener("click", () => {
    startQuiz();
});

btnEnd.addEventListener("click", () => {
    initializeQuiz();
});

initializeQuiz();