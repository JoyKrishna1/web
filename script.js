// Sample default data
let data = {
    ethics: {
        "Accountability": 3.60,
        "Compliance with Laws": 11.63,
        "Duty of Care": 9.90,
        "Transparency": 3.88
    },
    safety: {
        "Emergency Preparedness": 2.85,
        "Fire Protection & Prevention": 2.42,
        "First Aid": 3.02,
        "Hazardous Chemicals": 2.05,
        "Job Safety": 5.92,
        "Occupational Safety Hazard": 2.27,
        "Permit Systems": 2.45,
        "PPE Knowledge": 2.12,
        "Process Knowledge": 3.25,
        "Safety Audit and Committee Meeting": 1.82,
        "Safety Culture": 2.8
    }
};

// Function to generate input fields
function generateInputs() {
    const ethicsDiv = document.getElementById("ethics-inputs");
    const safetyDiv = document.getElementById("safety-inputs");

    ethicsDiv.innerHTML = "";
    safetyDiv.innerHTML = "";

    Object.keys(data.ethics).forEach((key) => {
        ethicsDiv.innerHTML += `<div class="input-group">
            <label>${key}: </label>
            <input type="number" id="ethics-${key}" value="${data.ethics[key]}" step="0.1">
        </div>`;
    });

    Object.keys(data.safety).forEach((key) => {
        safetyDiv.innerHTML += `<div class="input-group">
            <label>${key}: </label>
            <input type="number" id="safety-${key}" value="${data.safety[key]}" step="0.1">
        </div>`;
    });

    drawChart();
}

// Function to update scores
function updateScores() {
    Object.keys(data.ethics).forEach((key) => {
        data.ethics[key] = parseFloat(document.getElementById(`ethics-${key}`).value);
    });

    Object.keys(data.safety).forEach((key) => {
        data.safety[key] = parseFloat(document.getElementById(`safety-${key}`).value);
    });

    drawChart();
}

// Function to calculate the average score
function getAverageScore(categoryData) {
    const values = Object.values(categoryData);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

// Function to draw the chart
function drawChart() {
    const ethicsScore = getAverageScore(data.ethics);
    const safetyScore = getAverageScore(data.safety);

    const trace = {
        x: ["Ethics", "Safety"],
        y: [ethicsScore, safetyScore],
        type: "bar",
        marker: { color: ["blue", "red"] }
    };

    Plotly.newPlot("chart", [trace], { title: "Ethics vs Safety Score" });
}

// Initialize inputs and chart
generateInputs();
