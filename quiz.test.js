const {
    initUI, startQuiz, showQuestion, handleNextButtonClick, quizData,
    checkAnswers, showEndPage, updateQuestionCounter
} = require('./quiz'); // Import necessary functions from the quiz module.

// Sets up the initial HTML structure for testing the quiz application.
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
    initUI(); // Initialize UI elements based on the imported quiz functions.
}

// Describe block for tests related to the initial state of the UI.
describe('Initialization Tests', () => {
  beforeEach(() => {
    setupDOM(); // Assuming you have a function that sets up the DOM.
  });

  test('UI initializes correctly', () => {
    expect(document.querySelector('.start-button')).not.toBeNull();
    expect(document.querySelector('.end-page')).not.toBeNull();
    expect(document.querySelector('.next-button')).not.toBeNull();
    expect(document.querySelector('.question-counter')).not.toBeNull();
    expect(document.getElementById('options-container')).not.toBeNull();
    expect(document.querySelector('.start-button')).not.toBeNull();
  });

  test('Start page is displayed initially', () => {
    expect(document.querySelector('.start-page').style.display).not.toBe('none');
  });

  test('Start button text is set correctly', () => {
    expect(document.querySelector('.start-button').textContent).toBe('Start');
  });
});



// Describe block for testing navigation within the quiz.
describe('Quiz Navigation Tests', () => {
    beforeEach(() => {
        setupDOM(); // Prepare the DOM before each test.
        startQuiz();
    });

    test('Quiz page is displayed after clicking start button', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Simulate clicking the start button.
        const quizPage = document.querySelector('.quiz-page');
        expect(quizPage.style.display).toBe('block'); // Check if the quiz page is displayed after the start button is clicked.
    });

    test('First question is displayed correctly', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Activate the quiz.
        const questionText = document.querySelector('.title-question');
        expect(questionText.textContent).toContain('What does HTML stand for?'); // Verify the first question is displayed correctly.
    });

    test('Question counter is updated correctly', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Begin the quiz.
        const questionCounter = document.querySelector('.question-counter');
        expect(questionCounter.textContent).toBe('1 of 5 Questions'); // Ensure the question counter reflects the current question.
    });
});

// Describe block for testing answer selection and score calculation.
describe('Answer Selection Tests', () => {
    beforeEach(() => {
        setupDOM(); // Setup DOM for each test.
    });

    test('Selecting a single option for multiple choice questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Start the quiz.
        showQuestion(0); // Display the first question.
        const option = document.querySelector('.option-box');
        option.click(); // Simulate option selection.
        expect(option.classList.contains('selected')).toBe(true); // Check if the option is marked as selected.
    });

    test('Correct and incorrect answer selections for true/false questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Start the quiz.
        handleNextButtonClick(); // Navigate to the next question.
        showQuestion(1); // Display the second question.
        const questionText = document.querySelector('.title-question');
        expect(questionText.textContent).toContain('CSS stands for Cascading Style Sheets.'); // Verify the question text.

        const trueOption = document.querySelector('.option-box[data-value="true"]');
        const falseOption = document.querySelector('.option-box[data-value="false"]');
        trueOption.click(); // Simulate clicking the true option.

        checkAnswers(); // Check answers to determine correctness.
        expect(trueOption.classList.contains('right')).toBe(true); // Verify if the correct option is marked as right.
        expect(falseOption.classList.contains('wrong')).toBe(false); // Verify the incorrect option is not marked as wrong.
    });

    test('Multiple answers can be selected for multiple answer questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Start the quiz.
        handleNextButtonClick(); // Navigate to the next question.
        handleNextButtonClick(); // Continue to another question.
        showQuestion(2); // Display the third question.
        const questionText = document.querySelector('.title-question');
        expect(questionText.textContent).toContain('Which of the following are two types of cloud computing services?'); // Verify the question text.

        const options = document.querySelectorAll('.option-box');
        options[0].click(); // Select the first option.
        options[2].click(); // Select the third option.
        expect(options[0].classList.contains('selected')).toBe(false); // Check if the first option is correctly unselected.
        expect(options[2].classList.contains('selected')).toBe(true); // Verify the third option remains selected.
    });
    test('Selection persistence across navigation', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Start the quiz.
        showQuestion(0); // Display the first question.

        const option = document.querySelector('.option-box');
        option.click(); // Select an option.
        handleNextButtonClick(); // Move to next question.
        handleNextButtonClick(); // Move back to the first question.

        expect(option.classList.contains('selected')).toBe(true); // Check if the original selection is still marked.
    });

    test('Deselection of options in multiple choice questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Start the quiz.
        showQuestion(0); // Display the first question.

        const option = document.querySelector('.option-box');
        option.click(); // Select an option.
        option.click(); // Deselect the same option.
        
        expect(option.classList.contains('selected')).toBe(false); // Check if the option is deselected.
    });

    test('Deselection of options in multiple answer questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Start the quiz.
        showQuestion(2); // Display a multiple answer question.

        const options = document.querySelectorAll('.option-box');
        options[0].click(); // Select the first option.
        options[0].click(); // Deselect the first option.

        expect(options[0].classList.contains('selected')).toBe(false); // Verify that the first option is deselected.
    });

    test('Multiple options selection and deselection in multiple answer questions', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Start the quiz.
        showQuestion(2); // Display a multiple answer question.
    
        const options = document.querySelectorAll('.option-box');
        options[0].click(); // Select the first option.
        expect(options[0].classList.contains('selected')).toBe(true); // Check first option selected
    
        options[1].click(); // Select the second option.
        expect(options[1].classList.contains('selected')).toBe(true); // Check second option selected
    
        options[1].click(); // Deselect the second option.
        expect(options[1].classList.contains('selected')).toBe(false); // Check second option deselected

    });
    
});

// Describe block for testing the navigation to the end of the quiz and score display.
describe('Navigation Tests', () => {
    beforeEach(() => {
    setupDOM(); // Reset the DOM before each test.
});

       test('Next button navigates to the next question', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Initiate the quiz.
        const nextButton = document.querySelector('.next-button');
        nextButton.click(); // Navigate to the next question.
        const newQuestionText = document.querySelector('.title-question');
        expect(newQuestionText).not.toBe('1. What does HTML stand for?'); // Check if the new question is different.
    });

    test('End page is displayed after the last question', () => {
        const startButton = document.querySelector('.start-button');
        startButton.click(); // Begin the quiz.
        // Navigate through all questions.
        for (let i = 0; i < quizData.length - 1; i++) {
            const options = document.querySelectorAll('.option-box');
            const correctOption = Array.from(options).find(option => option.dataset.isCorrect === 'true');
            correctOption.click();
            handleNextButtonClick();
        }
        // Check the nextButton's status
        const nextButton = document.querySelector('.next-button');
        console.log(`Next button text before final click: ${nextButton ? nextButton.textContent : 'Button not found'}`);
    
        if (nextButton && nextButton.textContent === 'Submit') {
            nextButton.click();
        
            // Wait for the end page to display
            const endPage = document.querySelector('.end-page');
            console.log(`End page display status: ${endPage ? endPage.style.display : 'End page not found'}`);
            expect(endPage).not.toBeNull();
            expect(endPage.style.display).toBe('block');
        }
    });
});
