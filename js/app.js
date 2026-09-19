const userData = {
    age: null,
    gender: null,
    pregnancy: null,
    height: null,
    weight: null,
    bmi: null,
    bmiCategory: null,
    goal: null,
    calories: null,
    protein: null,
    carbs: null
};

const landingPage = document.getElementById("landingPage");
const bmiPage = document.getElementById("bmiPage");
const goalPage = document.getElementById("goalPage");
const nutritionPage = document.getElementById("nutritionPage");

const startBtn = document.getElementById("startBtn");
const startNavBtn = document.getElementById("startNavBtn");
const ctaBtn = document.getElementById("ctaBtn");

const backBtn = document.getElementById("backBtn");
const goalBackBtn = document.getElementById("goalBackBtn");
const nutritionBackBtn = document.getElementById("nutritionBackBtn");

const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const maleGenderBtn = document.getElementById("maleGenderBtn");
const femaleGenderBtn = document.getElementById("femaleGenderBtn");

const pregnancySection = document.getElementById("pregnancySection");
const pregnancyYesBtn = document.getElementById("pregnancyYesBtn");
const pregnancyNoBtn = document.getElementById("pregnancyNoBtn");
const pregnancyUnsureBtn = document.getElementById("pregnancyUnsureBtn");

const calculateBtn = document.getElementById("calculateBtn");

const resultCard = document.getElementById("resultCard");
const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");
const bmiMessage = document.getElementById("bmiMessage");
const goalBtn = document.getElementById("goalBtn");

const gainGoal = document.getElementById("gainGoal");
const maintainGoal = document.getElementById("maintainGoal");
const lossGoal = document.getElementById("lossGoal");

const goalResult = document.getElementById("goalResult");
const selectedGoal = document.getElementById("selectedGoal");
const goalResultMessage = document.getElementById("goalResultMessage");
const nutritionContinueBtn = document.getElementById("nutritionContinueBtn");

const nutritionBMI = document.getElementById("nutritionBMI");
const nutritionGoal = document.getElementById("nutritionGoal");
const calorieValue = document.getElementById("calorieValue");
const proteinValue = document.getElementById("proteinValue");
const carbValue = document.getElementById("carbValue");

function showPage(page) {
    [landingPage, bmiPage, goalPage, nutritionPage].forEach(section => {
        if (section) section.classList.add("hidden");
    });

    if (page) page.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function startJourney() {
    showPage(bmiPage);
}

[startBtn, startNavBtn, ctaBtn].forEach(button => {
    if (button) {
        button.addEventListener("click", startJourney);
    }
});

if (backBtn) {
    backBtn.addEventListener("click", () => {
        showPage(landingPage);
    });
}

if (goalBackBtn) {
    goalBackBtn.addEventListener("click", () => {
        showPage(bmiPage);
    });
}

if (nutritionBackBtn) {
    nutritionBackBtn.addEventListener("click", () => {
        showPage(goalPage);
    });
}

function selectGender(gender) {
    userData.gender = gender;

    maleGenderBtn?.classList.toggle("selected", gender === "male");
    femaleGenderBtn?.classList.toggle("selected", gender === "female");

    updatePregnancyVisibility();
}

maleGenderBtn?.addEventListener("click", () => {
    selectGender("male");
});

femaleGenderBtn?.addEventListener("click", () => {
    selectGender("female");
});

function selectPregnancy(status) {
    userData.pregnancy = status;

    pregnancyYesBtn?.classList.toggle("selected", status === "yes");
    pregnancyNoBtn?.classList.toggle("selected", status === "no");
    pregnancyUnsureBtn?.classList.toggle("selected", status === "unsure");
}

pregnancyYesBtn?.addEventListener("click", () => {
    selectPregnancy("yes");
});

pregnancyNoBtn?.addEventListener("click", () => {
    selectPregnancy("no");
});

pregnancyUnsureBtn?.addEventListener("click", () => {
    selectPregnancy("unsure");
});

function updatePregnancyVisibility() {
    const age = Number(ageInput?.value || 0);

    if (userData.gender === "female" && age >= 22) {
        pregnancySection?.classList.remove("hidden");
    } else {
        pregnancySection?.classList.add("hidden");

        userData.pregnancy = null;

        pregnancyYesBtn?.classList.remove("selected");
        pregnancyNoBtn?.classList.remove("selected");
        pregnancyUnsureBtn?.classList.remove("selected");
    }
}

ageInput?.addEventListener("input", updatePregnancyVisibility);

function calculateBMI() {
    const age = Number(ageInput?.value);
    const height = Number(heightInput?.value);
    const weight = Number(weightInput?.value);

    if (!age || age <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    if (!userData.gender) {
        alert("Please select your gender.");
        return;
    }

    if (
        userData.gender === "female" &&
        age >= 22 &&
        !userData.pregnancy
    ) {
        alert("Please select your pregnancy status.");
        return;
    }

    if (!height || height <= 0) {
        alert("Please enter a valid height.");
        return;
    }

    if (!weight || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    userData.age = age;
    userData.height = height;
    userData.weight = weight;

    userData.bmi = Number(
        (weight / Math.pow(height / 100, 2)).toFixed(1)
    );

    if (userData.bmi < 18.5) {
        userData.bmiCategory = "Underweight";
        bmiMessage.textContent =
            "Your BMI falls below the standard adult healthy range.";
    } else if (userData.bmi < 25) {
        userData.bmiCategory = "Healthy range";
        bmiMessage.textContent =
            "Your BMI falls within the standard adult healthy range.";
    } else if (userData.bmi < 30) {
        userData.bmiCategory = "Overweight";
        bmiMessage.textContent =
            "Your BMI is above the standard adult healthy range.";
    } else {
        userData.bmiCategory = "Obesity range";
        bmiMessage.textContent =
            "Your BMI is above the standard adult healthy range.";
    }

    bmiValue.textContent = userData.bmi;
    bmiCategory.textContent = userData.bmiCategory;

    resultCard?.classList.remove("hidden");
}

calculateBtn?.addEventListener("click", calculateBMI);


/* =========================================================
   GOAL LOGIC

   BMI < 18.5
   -> Gain + Maintain
   -> Gain is suggested

   BMI 18.5 - 24.9
   -> Gain + Maintain + Healthy Weight Loss
   -> Maintain is suggested

   BMI >= 25
   -> Maintain + Healthy Weight Loss
   -> Healthy Weight Loss is suggested

   Pregnancy = Yes / Not sure
   -> Healthy Weight Loss is hidden
   -> Gain + Maintain remain available
   -> BMI still decides which available option is suggested
   ========================================================= */

function prepareGoalOptions() {
    if (!gainGoal || !maintainGoal || !lossGoal) {
        return;
    }

    /* Reset all cards first */
    gainGoal.classList.remove("hidden");
    maintainGoal.classList.remove("hidden");
    lossGoal.classList.remove("hidden");

    document.querySelectorAll(".goal-card").forEach(card => {
        card.classList.remove("selected");
        card.classList.remove("recommended");
    });

    /* Pregnancy safety override */
    const pregnancyOverride =
        userData.gender === "female" &&
        userData.age >= 22 &&
        (
            userData.pregnancy === "yes" ||
            userData.pregnancy === "unsure"
        );

    if (pregnancyOverride) {
        /*
         * Pregnancy:
         * No weight-loss option.
         * Gain and Maintain stay separate.
         */
        lossGoal.classList.add("hidden");

        if (userData.bmi < 18.5) {
            gainGoal.classList.add("recommended");
        } else {
            maintainGoal.classList.add("recommended");
        }

        return;
    }

    /*
     * NORMAL BMI LOGIC
     */

    if (userData.bmi < 18.5) {

        /* Low BMI */
        gainGoal.classList.add("recommended");

        maintainGoal.classList.remove("hidden");
        lossGoal.classList.add("hidden");

    } else if (userData.bmi < 25) {

        /* Healthy BMI */
        gainGoal.classList.remove("hidden");
        maintainGoal.classList.add("recommended");
        lossGoal.classList.remove("hidden");

    } else {

        /* High BMI */
        gainGoal.classList.add("hidden");
        maintainGoal.classList.remove("hidden");
        lossGoal.classList.add("recommended");
    }
}

goalBtn?.addEventListener("click", () => {
    prepareGoalOptions();
    showPage(goalPage);
});

function selectGoal(goal) {
    const selectedCard = document.getElementById(`${goal}Goal`);

    if (!selectedCard) {
        return;
    }

    if (selectedCard.classList.contains("hidden")) {
        return;
    }

    document.querySelectorAll(".goal-card").forEach(card => {
        card.classList.remove("selected");
    });

    selectedCard.classList.add("selected");

    userData.goal = goal;

    if (goal === "gain") {
        selectedGoal.textContent = "Healthy Weight Gain";

        goalResultMessage.textContent =
            "General nutrition guidance for supporting healthy weight gain.";

    } else if (goal === "maintain") {
        selectedGoal.textContent = "Maintain Weight";

        goalResultMessage.textContent =
            "General balanced nutrition guidance for maintaining your current weight.";

    } else if (goal === "loss") {
        selectedGoal.textContent = "Healthy Weight Loss";

        goalResultMessage.textContent =
            "General nutrition guidance for healthy weight management.";
    }

    goalResult?.classList.remove("hidden");
}

gainGoal?.addEventListener("click", () => {
    selectGoal("gain");
});

maintainGoal?.addEventListener("click", () => {
    selectGoal("maintain");
});

lossGoal?.addEventListener("click", () => {
    selectGoal("loss");
});


function calculateNutrition() {
    const weight = userData.weight;
    const height = userData.height;
    const age = userData.age;

    const baseCalories =
        (10 * weight) +
        (6.25 * height) -
        (5 * age) +
        5;

    const calories = Math.round(baseCalories);
    const protein = Math.round(weight * 1.2);
    const carbs = Math.round((calories * 0.45) / 4);

    userData.calories = calories;
    userData.protein = protein;
    userData.carbs = carbs;

    if (nutritionBMI) {
        nutritionBMI.textContent = userData.bmi;
    }

    if (nutritionGoal) {
        nutritionGoal.textContent =
            selectedGoal?.textContent || "Selected goal";
    }

    if (calorieValue) {
        calorieValue.textContent = calories;
    }

    if (proteinValue) {
        proteinValue.textContent = `${protein} g`;
    }

    if (carbValue) {
        carbValue.textContent = `${carbs} g`;
    }
}

nutritionContinueBtn?.addEventListener("click", () => {
    if (!userData.goal) {
        alert("Please select a goal first.");
        return;
    }

    calculateNutrition();
    showPage(nutritionPage);
});
