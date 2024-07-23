# Quiz Application Test Cases

## Initialization Tests
Tests to ensure that the application initializes correctly.

1. **Verify UI Initialization**
   - **Description**: Check that all UI components are loaded correctly and are visible as expected.
   - **Steps**:
     1. Open the application.
     2. Observe the initial load screen.
   - **Expected Result**: All components should be in their default state with no errors.

2. **Start Page Visibility**
   - **Description**: Ensure the start page is displayed initially before any interaction.
   - **Steps**:
     1. Launch the application.
     2. Check if the start page is the first screen visible.
   - **Expected Result**: The start page should be visible.

3. **Start Button Text**
   - **Description**: Confirm that the start button contains the correct text.
   - **Steps**:
     1. Examine the start button on the initial screen.
   - **Expected Result**: The button should read "Start".

## Quiz Navigation Tests
Ensure proper navigation within the quiz.

1. **Quiz Page Display**
   - **Steps**:
     1. Click the start button.
   - **Expected Result**: The quiz page should be displayed.

2. **First Question Display**
   - **Steps**:
     1. Ensure the quiz starts correctly after the start button is clicked.
   - **Expected Result**: The first question should be correctly displayed.

3. **Question Counter Update**
   - **Steps**:
     1. Start the quiz and view the question counter.
   - **Expected Result**: The question counter should correctly reflect the number of the current question.

## Answer Selection Tests
Tests to ensure that the application accurately handles user interactions during answer selection.

1. Single Option Selection for Multiple Choice Questions
    - **Description**: Verify that only one option can be selected in a multiple-choice question and that it is visually indicated.
    - **Steps**:
    1. Start the quiz.
    2. Navigate to a multiple-choice question.
    3. Select an option.
    - **Expected Result**: The selected option should be highlighted as 'selected', and no other options should be highlighted.

2. Correct and Incorrect Answer Selections for True/False Questions
    - **Description**: Ensure correct processing of selections for true/false questions, and allow users to change their selection.
    - **Steps**:
    1. Start the quiz and navigate to a true/false question.
    2. Select 'True', then switch to 'False'.
    - **Expected Result**: Initially, 'True' should be highlighted; after changing, only 'False' should be highlighted. Correct selections are marked 'right', and incorrect selections are not marked 'wrong'.

3. Multiple Answers Selection for Multiple Answer Questions
    - **Description**: Test that multiple answers can be selected and deselected, reflecting user choices accurately for questions allowing multiple correct answers.
    - **Steps**:
    1. Start the quiz.
    2. Navigate to a multiple answer question.
    3. Select multiple valid options.
    - **Expected Result**: All selected options should be highlighted. Multiple selections should be possible without automatically deselecting others.

4. Selection Persistence Across Navigation
    - **Description**: Confirm that previously selected answers are remembered and displayed correctly when navigating back to a previously answered question.
    - **Steps**:
    1. Answer the first question.
    2. Navigate to the next question and then back to the first.
    - **Expected Result**: The original selections for the first question should still be marked as selected upon return.

5. Deselection of Options in Multiple Choice Questions
    - **Description**: Test the ability to deselect a chosen option in a multiple-choice question, verifying that options can be unselected.
    - **Steps**:
    1. Start the quiz and select an option in a multiple-choice question.
    2. Deselect the same option.
    - **Expected Result**: The option should no longer be highlighted as selected after deselection.

6. Deselection of Options in Multiple Answer Questions
    - **Description**: Ensure that options in multiple answer questions can be selected and then deselected.
    - **Steps**:
    1. Navigate to a multiple answer question.
    2. Select and then deselect an option.
    - **Expected Result**: The option should be selectable and then deselected, with no residual selection marking when deselected.

7. Multiple Options Selection and Deselection in Multiple Answer Questions
    - **Description**: Verify the functionality of selecting and deselecting multiple options in a multiple answer question.
    - **Steps**:
    1. Navigate to a multiple answer question.
    2. Select the first option, verify selection.
    3. Select the second option, verify both selections.
    4. Deselect the second option, verify it is deselected while the first remains selected.
    - **Expected Result**: Each option should respond to selections and deselections independently, correctly reflecting the user's interaction.

## Score Calculation Tests
Ensure that scoring works as expected.

1. **Correct Score Calculation**
   - **Steps**:
     1. Answer questions.
     2. Complete the quiz.
   - **Expected Result**: The score should correctly reflect the number of correct answers.

2. **Score Display on End Page**
   - **Steps**:
     1. Complete the quiz and observe the score on the end page.
   - **Expected Result**: The final score should be displayed accurately.

## Navigation Tests
Verify navigation through quiz questions and to the end page.

1. **Next Button Functionality**
   - **Steps**:
     1. Click the next button after answering a question.
   - **Expected Result**: The next question should be displayed.

2. **End Page Display**
   - **Steps**:
     1. Answer the last question and click the next or submit button.
   - **Expected Result**: The end page with the final score should be displayed.
