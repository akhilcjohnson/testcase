const {
    initUI, startQuiz, showQuestion, handleNextButtonClick,
    checkAnswers, showEndPage, updateQuestionCounter
} = require('./quiz'); // Adjust the path as needed

// Common setup function
function setupDOM() {
    document.body.innerHTML = `
        <div class="start-page">
            <button class="start-button">Start</button>
        </div>
        <div class="quiz-page" style="display: none;">
            <div class="question-counter"></div>
            <div class="title-question"></div>
            <div id="options-container"></div>
            <button class="next-button">Next</button>
        </div>
        <div class="end-page" style="display: none;">
            <div class="score-value"></div>
        </div>
    `;
    initUI();
}

describe('Initialization Tests', () => {
    beforeEach(() => {
        setupDOM();
    });

    test('UI initializes correctly', () => {
        const startButton = document.querySelector('.start-button');
        expect(startButton).not.toBeNull();
    });

    test('Start page is displayed initially', () => {
        const startPage = document.querySelector('.start-page');
        expect(startPage.style.display).not.toBe('none');
    });

    test('Start button text is set correctly', () => {
        const startButton = document.querySelector('.start-button');
        expect(startButton.textContent).toBe('Start');
    });
});

describe('Quiz Navigation Tests', () => {
    beforeEach(() => {
        setupDOM();
    });

    test('Quiz page is displayed after clicking start button', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        const quizPage = document.querySelector('.quiz-page');
        expect(quizPage.style.display).toBe('block');
    });

    test('First question is displayed correctly', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        const questionText = document.querySelector('.title-question');
        expect(questionText.textContent).toContain('What does HTML stand for?');
    });

    test('Question counter is updated correctly', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        const questionCounter = document.querySelector('.question-counter');
        expect(questionCounter.textContent).toBe('1 of 5 Questions');
    });
});

describe('Answer Selection Tests', () => {
    beforeEach(() => {
        setupDOM();
    });

    test('Selecting a single option for multiple choice questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        showQuestion(0);
        const questionText = document.querySelector('.title-question');
        expect(questionText.textContent).toContain('What does HTML stand for?');

        const option = document.querySelector('.option-box');
        expect(option).not.toBeNull();
        option.click();
        expect(option.classList.contains('selected')).toBe(true);
    });

    test('Correct and incorrect answer selections for true/false questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        handleNextButtonClick();
        showQuestion(1);
        const questionText = document.querySelector('.title-question');
        expect(questionText.textContent).toContain('CSS stands for Cascading Style Sheets.');

        const trueOption = document.querySelector('.option-box[data-value="true"]');
        const falseOption = document.querySelector('.option-box[data-value="false"]');
        expect(trueOption).not.toBeNull();
        expect(falseOption).not.toBeNull();
        trueOption.click();

        checkAnswers();
        expect(trueOption.classList.contains('right')).toBe(true);
        expect(falseOption.classList.contains('wrong')).toBe(false);
    });

    test('Multiple answers can be selected for multiple answer questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        handleNextButtonClick();
        handleNextButtonClick();
        showQuestion(2);
        const questionText = document.querySelector('.title-question');
        expect(questionText.textContent).toContain('Which of the following are two types of cloud computing services?');

        const options = document.querySelectorAll('.option-box');
        expect(options.length).toBeGreaterThan(0);
        options[0].click();
        options[2].click();
        expect(options[0].classList.contains('selected')).toBe(false);
        expect(options[2].classList.contains('selected')).toBe(true);
    });
});

describe('Score Calculation Tests', () => {
    beforeEach(() => {
        setupDOM();
    });

    test('Score is calculated correctly for each type of question', () => {
        let score = 0;
        const mockCheckAnswers = () => {
            score = 1; // Simulate correct answer
        };

        const startButton = document.querySelector('.start-button');
        startButton.click();
        const option = document.querySelector('.option-box');
        option.click();
        mockCheckAnswers();
        expect(score).toBe(1);
    });

    test('Score is displayed correctly on the end page', () => {
        // Mock the scoring process and navigation
        let score = 5;
        const mockShowEndPage = () => {
            const endPage = document.querySelector('.end-page');
            const scoreValue = endPage.querySelector('.score-value');
            scoreValue.textContent = `${score}.00/5`;
            endPage.style.display = 'block';
        };

        const startButton = document.querySelector('.start-button');
        startButton.click();
        for (let i = 0; i < 5; i++) {
            handleNextButtonClick();
        }
        mockShowEndPage();

        const scoreValue = document.querySelector('.score-value');
        expect(scoreValue.textContent).toBe('5.00/5');
    });
});


describe('Navigation Tests', () => {
    beforeEach(() => {
    setupDOM();
});

       test('Next button navigates to the next question', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        const nextButton = document.querySelector('.next-button');
        nextButton.click();
        const newQuestionText = document.querySelector('.title-question');
        expect(newQuestionText).not.toBe('1. What does HTML stand for?');
    });

    test('End page is displayed after the last question', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click();
        for (let i = 0; i < 5; i++) {
            handleNextButtonClick();
        }
        const endPage = document.querySelector('.end-page');
        expect(endPage.style.display).toBe('block');
});
});
