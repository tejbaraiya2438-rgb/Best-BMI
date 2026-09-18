// ==========================================
// NUTRIGUIDE - BMI JOURNEY
// ==========================================


// ================= ELEMENTS =================

const landingPage = document.getElementById("landingPage");
const bmiPage = document.getElementById("bmiPage");
const goalPage = document.getElementById("goalPage");

const startBtn = document.getElementById("startBtn");
const startNavBtn = document.getElementById("startNavBtn");
const ctaBtn = document.getElementById("ctaBtn");

const backBtn = document.getElementById("backBtn");
const goalBtn = document.getElementById("goalBtn");
const goalBackBtn = document.getElementById("goalBackBtn");

const calculateBtn = document.getElementById("calculateBtn");

const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const resultCard = document.getElementById("resultCard");
const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");
const bmiMessage = document.getElementById("bmiMessage");

const goalCards = document.querySelectorAll(".goal-card");
const goalResult = document.getElementById("goalResult");
const selectedGoal = document.getElementById("selectedGoal");


// ================= USER DATA =================

let userData = {
    age: null,
    height: null,
    weight: null,
    bmi: null,
    bmiCategory: null,
    goal: null
};


// ================= PAGE NAVIGATION =================

function showBMIPage() {

    landingPage.classList.add("hidden");
    goalPage.classList.add("hidden");

    bmiPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showLandingPage() {

    bmiPage.classList.add("hidden");
    goalPage.classList.add("hidden");

    landingPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showGoalPage() {

    landingPage.classList.add("hidden");
    bmiPage.classList.add("hidden");

    goalPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ================= BMI CALCULATION =================

function calculateBMI() {

    const age = Number(ageInput.value);
    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);


    // Validation

    if (!age || !height || !weight) {

        alert("Please enter age, height and weight.");

        return;
    }


    if (age < 1 || age > 120) {

        alert("Please enter a valid age.");

        return;
    }


    if (height < 50 || height > 250) {

        alert("Please enter a valid height in cm.");

        return;
    }


    if (weight < 10 || weight > 300) {

        alert("Please enter a valid weight in kg.");

        return;
    }


    // Convert height from cm to metres

    const heightInMetres = height / 100;


    // BMI Formula

    const bmi = weight / (heightInMetres * heightInMetres);


    const roundedBMI = Number(bmi.toFixed(1));


    // Determine category

    let category;
    let message;


    if (bmi < 18.5) {

        category = "Below standard range";

        message =
            "A BMI below 18.5 can be associated with being underweight. " +
            "BMI is only a screening measure, so nutrition and overall health " +
            "should also be considered.";

    } else if (bmi < 25) {

        category = "Standard range";

        message =
            "Your BMI falls within the standard adult BMI range. " +
            "A balanced diet, regular physical activity and healthy habits " +
            "remain important.";

    } else if (bmi < 30) {

        category = "Above standard range";

        message =
            "Your BMI is above the standard adult BMI range. " +
            "BMI alone cannot determine your health, but it can be a useful " +
            "starting point for discussing healthy weight-management habits.";

    } else {

        category = "Higher BMI range";

        message =
            "Your BMI is in a higher range. BMI is a screening measure and " +
            "does not by itself diagnose a health condition. Sustainable nutrition " +
            "and healthy lifestyle habits can be useful areas to focus on.";

    }


    // Save user data

    userData.age = age;
    userData.height = height;
    userData.weight = weight;
    userData.bmi = roundedBMI;
    userData.bmiCategory = category;


    // Show result

    bmiValue.textContent = roundedBMI;
    bmiCategory.textContent = category;
    bmiMessage.textContent = message;

    resultCard.classList.remove("hidden");


    // Scroll to result

    setTimeout(() => {

        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


// ================= GOAL SELECTION =================

function selectGoal(goal) {

    userData.goal = goal;


    let goalText;


    if (goal === "gain") {

        goalText = "Healthy Weight Gain";

    } else if (goal === "maintain") {

        goalText = "Maintain Weight";

    } else if (goal === "loss") {

        goalText = "Healthy Weight Loss";

    }


    selectedGoal.textContent = goalText;

    goalResult.classList.remove("hidden");


    // Remove previous selection

    goalCards.forEach(card => {

        card.classList.remove("selected");

    });


    // Add selected state

    const selectedCard =
        document.querySelector(`[data-goal="${goal}"]`);

    if (selectedCard) {

        selectedCard.classList.add("selected");

    }


    goalResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    console.log("User data:", userData);
}


// ================= EVENT LISTENERS =================

// Start journey

startBtn.addEventListener("click", showBMIPage);

startNavBtn.addEventListener("click", showBMIPage);

ctaBtn.addEventListener("click", showBMIPage);


// Back to landing

backBtn.addEventListener("click", showLandingPage);


// Calculate BMI

calculateBtn.addEventListener("click", calculateBMI);


// Continue to goal

goalBtn.addEventListener("click", showGoalPage);


// Back from goal

goalBackBtn.addEventListener("click", () => {

    goalPage.classList.add("hidden");
    bmiPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// Goal cards

goalCards.forEach(card => {

    card.addEventListener("click", () => {

        const goal = card.dataset.goal;

        selectGoal(goal);

    });

});


// Enter key support

[ageInput, heightInput, weightInput].forEach(input => {

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            calculateBMI();

        }

    });

});
