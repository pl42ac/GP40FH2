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
document.getElementById("question").textContent = `Click on: ${labels[currentIndex].name}`;

function checkAnswer(selectedPart) {
    const feedback = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");
    const diagram = document.getElementById("diagram");

    if (selectedPart === labels[currentIndex].name) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        // Highlight the area
        const coords = labels[currentIndex].coords;

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

        const label = document.createElement("div");
        label.classList.add("label");
        label.style.left = `${x1}px`;
        label.style.top = `${y1 - 20}px`;
        label.textContent = labels[currentIndex].name;

        diagramContainer.appendChild(highlight);
        diagramContainer.appendChild(label);

        currentIndex++;
        if (currentIndex < labels.length) {
            document.getElementById("question").textContent = `Click on: ${labels[currentIndex].name}`;
        } else {
            document.getElementById("question").textContent = "Quiz Completed!";
        }
    } else {
        feedback.textContent =
