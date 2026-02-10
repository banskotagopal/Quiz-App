// ----------------------------------------start button------------------------------------------
let startBtn = document.getElementById("start-btn")
let start_continer = document.getElementById("start-continer")
let quiz_continer = document.getElementById("quiz-continer")
let current_qs = document.getElementById("current_qs")
let i = 0;

startBtn.addEventListener('click', start)

function start() {
    start_continer.classList.remove("active")
    quiz_continer.classList.add("active")

    addQs()
}

// -----------------------------------questions----------------------------------
let score = 0
let totalQsSpan = document.getElementById("total_qs")
let qs_list = document.getElementById("qs-list")
let question_text = document.getElementById("question")
let correct_ans = document.getElementById("correct_ans")
let total_qus = document.getElementById("total_qus")
let perWidth = document.querySelector(".progess-increase")

let questionArray = [
    {
        question: "Q1. If a force acts on a body for a short time interval, the change in momentum is equal to:",
        answers: [
            { text: "A) Force × time", correct: true },
            { text: "B) Mass × acceleration", correct: false },
            { text: "C) Force ÷ time", correct: false },
            { text: "D) Mass × velocity", correct: false }
        ]
    },
    {
        question: "Q2. The atomic number of an element is 17. Its valency is:?",
        answers: [
            { text: "A) 2", correct: false },
            { text: "B) 1", correct: true },
            { text: "C) 3", correct: false },
            { text: "D) 1 or 3", correct: false }
        ]
    },
    {
        question: "Q4. Which of the following is a noble gas?",
        answers: [
            { text: "A) Oxygen", correct: false },
            { text: "B) Nitrogen", correct: false },
            { text: "C) Argon", correct: true },
            { text: "D) Hydrogen", correct: false }
        ]
    },
    {
        question: "Q1. The SI unit of work is:",
        answers: [
            { text: "A) Joule", correct: true },
            { text: "B) Newton", correct: false },
            { text: "C) Watt", correct: false },
            { text: "D) Pascal", correct: false }
        ]
    },
    {
        question: "Q2. Which of the following is a vector quantity?",
        answers: [
            {text:"A) Speed" ,correct: false},
            {text:"B) Distance" ,correct: false},
            {text:"C) Time" ,correct: false},
            {text:"D) Displacement" ,correct: true},
        ]
    }
]

let answersDisabled = false
totalQsSpan.textContent = questionArray.length

let currentQsIdx = 0

function addQs() {
    i++
    answersDisabled = false
    qs_list.innerHTML = ""
    let currentQuestion = questionArray[currentQsIdx]
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button")
        current_qs.textContent = i
        question_text.textContent = currentQuestion.question
        button.dataset.correct = answer.correct
        button.textContent = answer.text
        button.addEventListener('click', selectedAns)
        qs_list.appendChild(button)
    })
}

let progess = document.getElementById("progess-increase")
let info = document.getElementById('info')

function selectedAns(evt) {
    if (answersDisabled) return
    answersDisabled = true
    const button = evt.target
    const isCorrect = button.dataset.correct === "true"
    if (isCorrect) {
        button.classList.add("correct")
        score++
    } else {
        button.classList.add("incorrect")
    }

    setTimeout(() => {
        currentQsIdx++
        if (currentQsIdx < questionArray.length) {
            addQs()
            const totalPer = (currentQsIdx / questionArray.length) * 100
            perWidth.style.width = `${totalPer}%`
        } else {
            let result = document.getElementById("result")
            quiz_continer.classList.remove("active")
            result.classList.add("active")
            correct_ans.textContent = score
            total_qus.textContent = questionArray.length
        if(score === 0 && score === 1)
        {
           info.textContent = "very bad keep Learning! 🤐"  
        }
        if(score > 1 && score <4)
        {
            info.textContent = "Good Do more hard work! 😊"
        }
        if(score === 4)
        {
            info.textContent = "Very Good you are talented! 😎"
        }
        if(score === 5)
        {
           info.textContent = "Excellent you are very talented! 😍"
        }
    }
    }, 1000)

}

let reset_quiz = document.getElementById("reset_btn")
reset_quiz.addEventListener('click', resetQuiz)

function resetQuiz() {
    score = 0
    currentQsIdx = 0
    i = 0
    answersDisabled = false
    qs_list.innerHTML = ""
    result.classList.remove("active")
    quiz_continer.classList.add("active")
    perWidth.style.width = "0%"
    info.textContent = ""
    addQs()
}
