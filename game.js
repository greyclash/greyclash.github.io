const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progeressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let accpetingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Whose operations are more faster among the following ?',
    choice1: 'Combinational Circuits',
    choice2: 'Sequential Circuits',
    choice3: 'Latches',
    choice4: 'Flip Flops', 
    answer: 1
  },
  {
    question: 'One example of the use of an S-R flip-flop is as ___________',
    choice1: 'Transition pulse generator',
    choice2: 'Racer',
    choice3: 'Switch debouncer',
    choice4: 'Astable oscillator', 
    answer: 3
  },
  {
    question: 'The truth table for an S-R flip-flop has how many VALID entries?',
    choice1: '1',
    choice2: '2',
    choice3: '3',
    choice4: '4', 
    answer: 3
  },
  {
    question: 'When both inputs of a J-K flip-flop cycle, the output will ___________',
    choice1: 'Be invalid',
    choice2: 'Change',
    choice3: 'Not change ',
    choice4: 'Toggle', 
    answer: 3
  },
  {
    question: 'Which of the following is correct for a gated D-type flip-flop?',
    choice1: 'The Q output is either SET or RESET as soon as the D input goes HIGH or LOW',
    choice2: 'The output complement follows the input when enbaled',
    choice3: 'Only one of the inputs can be HIGH at a time',
    choice4: 'The output toggles if one of the input is held HIGH', 
    answer: 1
  },
  {
    question: 'The parallel outputs of a counter circuit represent the _____________',
    choice1: 'Parallel data word',
    choice2: 'Clock frequency',
    choice3: 'Counter modulus',
    choice4: 'Clock count', 
    answer: 4
  },
  {
    question: 'BCD counter is also known as ____________',
    choice1: 'Parallel counter',
    choice2: 'Decade counter',
    choice3: 'Synchronous counter',
    choice4: 'VLSI counter', 
    answer: 2
  },
  {
    question: 'Ripple counters are also called ____________',
    choice1: 'SSI counters',
    choice2: 'Asynchronous counters',
    choice3: 'Synchronous counters',
    choice4: 'VLSI counters', 
    answer: 2
  },
  {
    question: 'The circuits of NOR based S-R latch classified as asynchronous sequential circuits, why?',
    choice1: 'Because of inverted outputs',
    choice2: 'Because of triggering functionality',
    choice3: 'Beacuse of cross-coupled connection',
    choice4: 'Because of inverted outputs & triggering functionality', 
    answer: 3
  },
  {
    question: 'A basic S-R flip-flop can be constructed by cross-coupling of which basic logic gates?',
    choice1: 'AND or OR gates',
    choice2: 'XOR or XNOR gates',
    choice3: 'NOR or NAND gates',
    choice4: 'AND or NOR gates', 
    answer: 3
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1)

  accpetingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!accpetingAnswers) return

    accpetingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()




