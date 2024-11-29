// Labels and coordinates
const labels = [
    { name: "Sand Box Front", coords: [150, 248, 186, 365] },
    { name: "Sand Box Rear", coords: [1802, 212, 1817, 412] },
    { name: "Battery", coords: [243, 374, 280, 401] },
    { name: "Control Stand", coords: [361, 241, 439, 348] },
    { name: "Electrical Cabinet", coords: [519, 181, 559, 341] },
    { name: "Inertial Air Filter", coords: [579, 127, 613, 185] },
    { name: "Inertial Air Discharge Fan", coords: [661, 115, 691, 179] },
    { name: "Traction Motor Blower", coords: [620, 215, 667, 379] },
    { name: "Generator Blower", coords: [680, 214, 695, 315] },
    { name: "Auxiliary Generator", coords: [736, 235, 751, 278] },
    { name: "Turbo Charger", coords: [789, 197, 826, 234] },
    { name: "Main Generator", coords: [747, 298, 782, 415] },
    { name: "Diesel Engine 16-645E3", coords: [939, 263, 1146, 350] },
    { name: "Exhaust Manifold", coords: [883, 189, 1219, 235] },
    { name: "Engine Governor", coords: [1256, 237, 1271, 293] },
    { name: "Lube Oil Strainer", coords: [1254, 350, 1301, 401] },
    { name: "Engine Water Tank", coords: [1311, 236, 1350, 275] },
    { name: "Fuel Pump", coords: [1320, 359, 1358, 377] },
    { name: "Lube Oil Filters", coords: [1373, 297, 1419, 345] },
    { name: "Lube Oil Cooler", coords: [1366, 252, 1399, 285] },
    { name: "Radiators", coords: [1260, 142, 1600, 217] },
    { name: "Radiator Cooling Fans", coords: [1243, 103, 1625, 129] },
    { name: "Fuel Filter", coords: [1431, 280, 1450, 334] },
    { name: "Air Compressor", coords: [1461, 308, 1494, 396] },
    { name: "HEP Plant", coords: [1651, 261, 1761, 369] },
    { name: "HEP Relay Cabinet", coords: [1591, 254, 1625, 307] },
    { name: "HEP High Voltage Cabinet", coords: [1679, 226, 1759, 243] },
    { name: "Truck 1", coords: [307, 468, 536, 540] },
    { name: "Truck 2", coords: [1350, 467, 1534, 532] },
    { name: "Fuel Tank", coords: [662, 457, 1050, 550] },
    { name: "Air Dryer", coords: [1135, 456, 1163, 519] },
    { name: "Turbo Lube Oil Pump", coords: [936, 385, 984, 411] },
    { name: "Air Brake Compartment", coords: [346, 358, 512, 415] },
    { name: "Coupler / Draft Gear, Front", coords: [26, 462, 169, 513] },
    { name: "Coupler / Draft Gear, Rear", coords: [1697, 457, 1839, 509] },
    { name: "HEP Cooling Expansion Tank", coords: [1777, 140, 1816, 184] },
    { name: "HEP Cooling Fan", coords: [1637, 110, 1762, 132] },
    { name: "HEP Air Start Reservoirs", coords: [1077, 455, 1125, 553] },
    { name: "Exhaust Silencers", coords: [780, 110, 822, 195] },
    { name: "Main Air Reservoirs", coords: [789, 425, 1196, 452] },
    { name: "Emergency Fuel Cut Offs (Both Sides)", coords: [708, 424, 738, 448] }
];

let currentIndex = 0;
const missedLabels = []; // Track missed labels
let correctCount = 0;
let incorrectCount = 0;

// Shuffle the labels array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle labels before starting the quiz
shuffle(labels);

// Set the initial question
function setQuestion() {
    if (currentIndex < labels.length) {
        document.getElementById("question").textContent = `Click on: ${labels[currentIndex].name}`;
    } else {
        endQuiz();
    }
}

// Add a highlight for correct or incorrect answers
function addHighlight(coords, container, color, label = null) {
    const diagram = document.getElementById("diagram");
    const scaleX = diagram.clientWidth / diagram.naturalWidth;
    const scaleY = diagram.clientHeight / diagram.naturalHeight;

    const x1 = coords[0] * scaleX;
    const y1 = coords[1] * scaleY;
    const x2 = coords[2] * scaleX;
    const y2 = coords[3] * scaleY;

    const highlight = document.createElement("div");
    highlight.classList.add("highlight");
    highlight.style.left = `${x1}px`;
    highlight.style.top = `${y1}px`;
    highlight.style.width = `${x2 - x1}px`;
    highlight.style.height = `${y2 - y1}px`;
    highlight.style.borderColor = color;
    highlight.style.backgroundColor = color === "green" ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)";

    if (label) {
        highlight.addEventListener("mouseover", () => {
            label.style.display = "block";
            label.style.left = `${x2 + 5}px`; // Position label to the right of the highlight
            label.style.top = `${y1}px`; // Align vertically
        });
        highlight.addEventListener("mouseout", () => {
            label.style.display = "none";
        });
    }

    container.appendChild(highlight);
    return highlight; // Return the highlight for additional controls
}

// End the quiz and display the summary
function endQuiz() {
    const questionElement = document.getElementById("question");
    const feedbackElement = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");

    const score = ((correctCount / labels.length) * 100).toFixed(2); // Calculate score percentage

    questionElement.textContent = "Quiz Completed!";
    feedbackElement.innerHTML = `
        <p>Score: ${score}%</p>
        <p>Correct: ${correctCount}</p>
        <p>Incorrect: ${incorrectCount}</p>
        <p>Missed Labels:</p>
        <ul>
            ${missedLabels
                .map(
                    (label) =>
                        `<li class="missed-label" data-label="${label.name}">${label.name}</li>`
                )
                .join("")}
        </ul>
    `;

    // Highlight missed areas in red when hovered and show labels
    const missedLabelElements = document.querySelectorAll(".missed-label");
    missedLabelElements.forEach((element) => {
        const label = labels.find((l) => l.name === element.dataset.label);
        let tempHighlight = null; // Track the temporary highlight
        let tempLabel = null; // Track the temporary label
        element.addEventListener("mouseover", () => {
            tempHighlight = addHighlight(label.coords, diagramContainer, "red");
            tempLabel = document.createElement("div");
            tempLabel.classList.add("label");
            tempLabel.textContent = label.name;
            tempLabel.style.left = `${tempHighlight.style.left}`;
            tempLabel.style.top = `${parseInt(tempHighlight.style.top) + 20}px`; // Below the highlight
            diagramContainer.appendChild(tempLabel);
        });
        element.addEventListener("mouseout", () => {
            if (tempHighlight) tempHighlight.remove(); // Remove the highlight
            if (tempLabel) tempLabel.remove(); // Remove the label
        });
    });
}

// Start the quiz
setQuestion();

function checkAnswer(isCorrect) {
    const feedback = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");
    const currentLabel = labels[currentIndex];

    if (isCorrect) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        correctCount++;

        const label = document.createElement("div");
        label.classList.add("label");
        label.textContent = currentLabel.name;
        label.style.display = "none";

        addHighlight(currentLabel.coords, diagramContainer, "green", label);
        diagramContainer.appendChild(label);
    } else {
        feedback.textContent = "Incorrect! Moving to the next label.";
        feedback.style.color = "red";
        incorrectCount++;
        missedLabels.push(currentLabel);
    }

    currentIndex++;
    setQuestion();
}

const diagram = document.getElementById("diagram");
diagram.addEventListener("click", (event) => {
    const scaleX = diagram.naturalWidth / diagram.clientWidth;
    const scaleY = diagram.naturalHeight / diagram.clientHeight;

    const x = Math.round(event.offsetX * scaleX);
    const y = Math.round(event.offsetY * scaleY);

    const coords = labels[currentIndex].coords;

    // Check if the click is within the bounds
    const isCorrect =
        x >= coords[0] && x <= coords[2] && y >= coords[1] && y <= coords[3];

    checkAnswer(isCorrect);
});
