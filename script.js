let currentLabel = "thorax"; // Change dynamically for each question

function checkAnswer(selectedPart) {
    const feedback = document.getElementById("feedback");
    if (selectedPart === currentLabel) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        // Update to next question
        currentLabel = "head"; // Example: change to the next label
        document.getElementById("question").textContent = `Click on: ${currentLabel}`;
    } else {
        feedback.textContent = "Try again!";
        feedback.style.color = "red";
    }
}
