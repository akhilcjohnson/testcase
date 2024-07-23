const startPageData = {
    title: 'Simple Quiz',
    buttonText: 'Start',
    imageUrl: '/testcase/brain.svg'
};

const quizData = [
    {
        id: 1,
        type: 'multiple',
        question: 'What does HTML stand for?',
        options: [
            { id: 'a', text: 'Hyper Text Preprocessors' },
            { id: 'b', text: 'Hyper Text Markup Language' },
            { id: 'c', text: 'Hyper Text Multiple Language' }
        ],
        correctAnswer: 'b'
    },
    {
        id: 2,
        type: 'true_false',
        question: 'CSS stands for Cascading Style Sheets.',
        correctAnswer: 'true'
    },
    {
        id: 3,
        type: 'multiple_answer',
        question: "Which of the following are two types of cloud computing services?",
        options: [
            { id: 'a', text: "Software as a Service (SaaS)" },
            { id: 'b', text: "Hardware as a Service (HaaS)" },
            { id: 'c', text: "Platform as a Service (PaaS)" },
            { id: 'd', text: "Electricity as a Service (EaaS)" }
        ],
        correctAnswer: ['a', 'c']
    },
    {
        id: 4,
        type: 'true_false',
        question: 'HTML stands for Hyper Text Markup Language.',
        correctAnswer: 'true'
    },
    {
        id: 5,
        type: 'multiple_answer',
        question: "Which of the following are three database management systems?",
        options: [
            { id: 'a', text: "MySQL" },
            { id: 'b', text: "Oracle" },
            { id: 'c', text: "PostgreSQL" },
            { id: 'd', text: "Excel" }
        ],
        correctAnswer: ['a', 'b', 'c']
    }
];

const endPageData = {
    title: 'Simple Quiz',
    congratulationText: 'Congratulations!',
    imageUrl: '/trophy.svg',
    scoreText: 'Score:'
};

// UI Elements
let startButton = document.querySelector('.start-button');
let quizPage = document.querySelector('.quiz-page');
let endPage = document.querySelector('.end-page');
let nextButton = document.querySelector('.next-button');
let scoreValue = document.querySelector('.score-value');
let questionCounter = document.querySelector('.question-counter');
let optionsContainer = document.getElementById('options-container');

let currentQuestionIndex = 0;
let score = 0;
let selectedOptions = [];

// Initialize UI
const initUI = () => {
    startButton = document.querySelector('.start-button');
    quizPage = document.querySelector('.quiz-page');
    endPage = document.querySelector('.end-page');
    nextButton = document.querySelector('.next-button');
    scoreValue = document.querySelector('.score-value');
    questionCounter = document.querySelector('.question-counter');
    optionsContainer = document.getElementById('options-container');

    hideElement(quizPage);
    hideElement(endPage);
    setTextContent('.quiz-text', startPageData.title);
    setImageSource('.brain-image', startPageData.imageUrl);
    setTextContent('.start-button', startPageData.buttonText); // Correct selector
    setTextContent('.end-header', endPageData.title);
    setTextContent('.congratulation-text', endPageData.congratulationText);
    setImageSource('.svg-image', endPageData.imageUrl);
    setTextContent('.score-text', endPageData.scoreText);

    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }
    if (nextButton) {
        nextButton.addEventListener('click', handleNextButtonClick);
    }
};

// Utility functions
const hideElement = (element) => {
    element.style.display = 'none';
};

const showElement = (element) => {
    element.style.display = 'block';
};

const setTextContent = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    } else {
        console.log(`Element not found for selector: ${selector}`);
    }
};

const setImageSource = (selector, src) => {
    const element = document.querySelector(selector);
    if (element) {
        element.src = src;
    } else {
        console.log(`Element not found for selector: ${selector}`);
    }
};

// Start the quiz
const startQuiz = () => {
    hideElement(document.querySelector('.start-page'));
    showElement(quizPage);
    showQuestion(currentQuestionIndex);
    updateQuestionCounter();
};

// Show End Page
const showEndPage = () => {
    hideElement(document.querySelector('.text-header'));
    hideElement(questionCounter);
    hideElement(document.querySelector('.title-question'));
    hideElement(optionsContainer);
    hideElement(nextButton);
    showElement(endPage);
    scoreValue.textContent = `${score.toFixed(2)}/${quizData.length}`;
};

// Show Question
const showQuestion = (index) => {
    const currentQuestion = quizData[index];
    setTextContent('.title-question', `${index + 1}. ${currentQuestion.question}`);
    optionsContainer.innerHTML = '';
    if (currentQuestion.type === 'multiple') {
        currentQuestion.options.forEach(option => createOption(option, currentQuestion.correctAnswer));
    } else if (currentQuestion.type === 'true_false') {
        ['true', 'false'].forEach(value => createTrueFalseOption(value, currentQuestion.correctAnswer));
    } else if (currentQuestion.type === 'multiple_answer') {
        currentQuestion.options.forEach(option => createMultipleAnswerOption(option, currentQuestion.correctAnswer));
    }
};

// Create Option
const createOption = (option, correctAnswer) => {
    const isCorrect = option.id === correctAnswer;
    const optionBox = createOptionBox(option.text, option.id, isCorrect, handleOptionClick);
    optionsContainer.appendChild(optionBox);
};

// Create Option Box
const createOptionBox = (content, value, isCorrect, clickHandler) => {
    const optionBox = document.createElement('div');
    optionBox.classList.add('option-box');
    optionBox.textContent = content;
    optionBox.dataset.value = value;
    optionBox.dataset.isCorrect = isCorrect.toString();
    optionBox.addEventListener('click', clickHandler);
    return optionBox;
};

// Create True/False Option
const createTrueFalseOption = (value, correctAnswer) => {
    const isCorrect = correctAnswer === value;
    const optionBox = createOptionBox(value.charAt(0).toUpperCase() + value.slice(1), value, isCorrect, handleOptionClick);
    optionsContainer.appendChild(optionBox);
};

// Create Multiple Answer Option
const createMultipleAnswerOption = (option, correctAnswers) => {
    const isCorrect = correctAnswers.includes(option.id);
    const optionBox = createOptionBox(option.text, option.id, isCorrect, handleOptionClick);
    optionsContainer.appendChild(optionBox);
};

// Handle Option Click
const handleOptionClick = (event) => {
    const optionBox = event.currentTarget;
    const currentQuestion = quizData[currentQuestionIndex];
    const maxSelectable = currentQuestion.type === 'multiple_answer' ? currentQuestion.correctAnswer.length : 1;

    if (selectedOptions.includes(optionBox)) {
        selectedOptions = selectedOptions.filter(opt => opt !== optionBox);
        optionBox.classList.remove('selected');
    } else if (selectedOptions.length < maxSelectable) {
        selectedOptions.push(optionBox);
        optionBox.classList.add('selected');
    } else if (currentQuestion.type === 'multiple_answer') {
        alert(`You can select only ${maxSelectable} options.`);
    } else {
        selectedOptions.forEach(opt => opt.classList.remove('selected'));
        selectedOptions = [optionBox];
        optionBox.classList.add('selected');
    }
};

// Check Answers
const checkAnswers = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (currentQuestion.type === 'multiple_answer') {
        checkMultipleAnswers();
    } else {
        checkSingleAnswer();
    }
};

// Check Single Answer
const checkSingleAnswer = () => {
    selectedOptions.forEach(optionBox => {
        if (optionBox.dataset.isCorrect === 'true') {
            optionBox.classList.add('right');
            score++;
        } else {
            optionBox.classList.add('wrong');
        }
    });
};

// Check Multiple Answers
const checkMultipleAnswers = () => {
    const correctAnswers = quizData[currentQuestionIndex].correctAnswer;
    const markPerCorrectAnswer = 1 / correctAnswers.length;
    selectedOptions.forEach(option => {
        if (correctAnswers.includes(option.dataset.value)) {
            option.classList.add('right');
            score += markPerCorrectAnswer;
        } else {
            option.classList.add('wrong');
        }
    });
};

// Update Question Counter
const updateQuestionCounter = () => {
    questionCounter.textContent = `${currentQuestionIndex + 1} of ${quizData.length} Questions`;
};

// Handle Next Button Click
const handleNextButtonClick = () => {
    if (selectedOptions.length > 0) {
        checkAnswers();
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion(currentQuestionIndex);
                updateQuestionCounter();
                if (currentQuestionIndex === quizData.length - 1) {
                    nextButton.textContent = 'Submit';
                }
            } else {
                showEndPage();
            }
            selectedOptions = [];
        }, 1000);
    } else {
        alert('Please select an option.');
    }
};


// Initialize UI on DOM Content Loaded
document.addEventListener("DOMContentLoaded", initUI);

module.exports = {
    testEnvironment: 'jsdom',
    quizData,
    initUI,
    startQuiz,
    showQuestion,
    handleNextButtonClick,
    checkAnswers,
    showEndPage,
    updateQuestionCounter,
    hideElement,
    showElement,
    setTextContent,
    setImageSource,
    createOptionBox,
    createOption,
    createTrueFalseOption,
    createMultipleAnswerOption,
    handleOptionClick,
    checkSingleAnswer,
    checkMultipleAnswers
};