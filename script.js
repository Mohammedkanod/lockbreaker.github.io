// Game state
let level = 1;
const maxLevels = 18;
let correctCombination = "";
let attempts = 0;
let initialPermutations = 0;
let currentAccuracy = 100;
let accuracyHistory = [];
let attemptHistory = [];
// List of PnC-based hints for each level
const hints = [
    {
        hint: "251  :  One number is correct and well placed \n609  :  One number is correct but wrongly placed  \n473  :  Nothing is correct \n583  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [2, 5, 1],
        permutations: 6
    },
    {
        hint: "512  :  One number is correct but wrongly placed \n267  :  Nothing is correct  \n418  :  One number is correct and well placed \n742  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [7, 4, 2],
        permutations: 12
    },
    {
        hint: "390  :  One number is correct and well placed \n864  :  Nothing is correct  \n107  :  One number is correct but wrongly placed \n425  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [0, 9, 3],
        permutations: 6
    },
    {
        hint: "789  :  Two numbers are correct and well placed \n245  :  Nothing is correct  \n368  :  One number is correct and well placed \n567  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [7, 8, 9],
        permutations: 6
    },
    {
        hint: "134  :  Nothing is correct \n578  :  One number is correct but wrongly placed \n620  :  Two numbers are correct and well placed \n492  :  One number is correct and well placed",
        codeLength: 3,
        digits: [6, 2, 0],
        permutations: 6
    },
    {
        hint: "456  :  Nothing is correct \n239  :  Two numbers are correct and well placed \n321  :  One number is correct but wrongly placed \n809  :  One number is correct and well placed",
        codeLength: 3,
        digits: [2, 3, 9],
        permutations: 6
    },
    {
        hint: "107  :  One number is correct and well placed \n683  :  Nothing is correct \n239  :  One number is correct but wrongly placed \n504  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [0, 7, 1],
        permutations: 6
    },
    {
        hint: "456  :  Nothing is correct \n237  :  One number is correct and well placed \n890  :  One number is correct but wrongly placed \n963  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [3, 7, 2],
        permutations: 6
    },
    {
        hint: "256  :  One number is correct and well placed \n310  :  Two numbers are correct but wrongly placed \n489  :  Nothing is correct \n570  :  One number is correct and well placed",
        codeLength: 3,
        digits: [5, 2, 6],
        permutations: 6
    },
    {
        hint: "836  :  Nothing is correct \n714  :  One number is correct but wrongly placed \n123  :  One number is correct and well placed \n497  :  Two numbers are correct and well placed",
        codeLength: 3,
        digits: [7, 1, 4],
        permutations: 6
    },
    {
        hint: "602  :  One number is correct and well placed \n519  :  Nothing is correct \n840  :  Two numbers are correct but wrongly placed \n718  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [0, 6, 2],
        permutations: 6
    },
    {
        hint: "781  :  One number is correct and well placed \n342  :  Two numbers are correct but wrongly placed \n906  :  Nothing is correct \n405  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [8, 1, 7],
        permutations: 6
    },
    {
        hint: "314  :  One number is correct and well placed \n560  :  Nothing is correct \n291  :  Two numbers are correct but wrongly placed \n430  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [4, 3, 0],
        permutations: 6
    },
    {
        hint: "548  :  Nothing is correct \n263  :  One number is correct but wrongly placed \n971  :  Two numbers are correct and well placed \n148  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [9, 7, 1],
        permutations: 6
    }
];

// Start the game for a new customer
function startLevel() {
    document.getElementById("bag").style.height = "auto";
    document.getElementById("bag").style.backgroundImage = "url(bagClosed.jpg)";
    const levelData = hints[level - 1];
    correctCombination = levelData.digits.join("");
    attempts = 0;
    initialPermutations = factorial(levelData.codeLength) * Math.pow(10, levelData.codeLength - 1); // Calculate permutations
    currentAccuracy = 100;
    attemptHistory = []; // Reset attempt history for the new level
    document.getElementById("hint-message").innerText = levelData.hint;
    createLockWheels(levelData.codeLength);
    document.getElementById("result-message").innerText = "";
    document.getElementById("next-customer").style.display = "none";
    updateAccuracyDisplay();
    updateAttemptHistory();
}

// Create rotating wheels for the lock
function createLockWheels(numDigits) {
    const lockContainer = document.getElementById("lock-container");
    lockContainer.innerHTML = ""; // Clear previous wheels

    for (let i = 0; i < numDigits; i++) {
        const lockWheel = document.createElement("div");
        lockWheel.classList.add("lock-wheel");

        const select = document.createElement("select");
        select.classList.add("digit");

        for (let j = 0; j <= 9; j++) {
            const option = document.createElement("option");
            option.value = j;
            option.innerText = j;
            select.appendChild(option);
        }

        lockWheel.appendChild(select);
        lockContainer.appendChild(lockWheel);
    }
}

// Update accuracy display with color transitions
function updateAccuracyDisplay() {
    const accuracyElement = document.getElementById("accuracy-display");
    accuracyElement.innerText = `Current Accuracy: ${currentAccuracy.toFixed(2)}%`;

    // Change color based on percentage
    if (currentAccuracy > 75) {
        accuracyElement.style.color = "green";
    } else if (currentAccuracy > 50) {
        accuracyElement.style.color = "yellow";
    } else {
        accuracyElement.style.color = "red";
    }
}

// Check if the player's guess matches the correct combination
function checkGuess() {
    const digits = document.querySelectorAll(".digit");
    let playerGuess = "";

    digits.forEach(digit => {
        playerGuess += digit.value;
    });

    attempts++;
    attemptHistory.push({ guess: playerGuess, correct: playerGuess === correctCombination });

    if (playerGuess === correctCombination) {
        document.getElementById("bag").style.backgroundImage = "url(bagOpened.jpg)";
        document.getElementById("bag").style.height = "120px";
        document.getElementById("result-message").innerText = "Correct! You cracked the lock.";
        document.getElementById("next-customer").style.display = "inline-block";

        // Record current accuracy and move to the next level
        accuracyHistory.push(currentAccuracy);
        updateAttemptHistory();
        if (level === maxLevels) {
            endGame();
        }
    } else {
        document.getElementById("result-message").innerText = "Incorrect! Try again.";
        // Decrease accuracy with each wrong attempt (based on number of attempts)
        currentAccuracy = currentAccuracy - 2,'%'
        if (currentAccuracy <= 0) {
            currentAccuracy = 0;
            document.getElementById("result-message").innerText = "Game Over! Your accuracy hit zero.";
            document.getElementById("next-customer").style.display = "none";
        }
        updateAccuracyDisplay();
        updateAttemptHistory();
    }
}

// Update attempt history display
function updateAttemptHistory() {
    const attemptHistoryElement = document.getElementById("attempt-history");
    attemptHistoryElement.innerHTML = ""; // Clear previous history

    attemptHistory.forEach((attempt, index) => {
        const historyItem = document.createElement("div");
        historyItem.innerText = `Attempt ${index + 1}: ${attempt.guess} - ${attempt.correct ? "Correct" : "Wrong"}`;
        historyItem.style.color = attempt.correct ? "green" : "red";
        attemptHistoryElement.appendChild(historyItem);
    });
}

// Calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// End the game and show summary of all accuracies
function endGame() {
    let summaryMessage = "Game Over! Here are your results:\n";
    let totalAccuracy = 0;

    accuracyHistory.forEach((accuracy, index) => {
        summaryMessage += `Level ${index + 1}: ${accuracy.toFixed(2)}%\n`;
        totalAccuracy += accuracy;
    });

    let averageAccuracy = totalAccuracy / accuracyHistory.length;
    summaryMessage += `\nAverage Accuracy: ${averageAccuracy.toFixed(2)}%`;

    localStorage.setItem("accuracyHistory", JSON.stringify(accuracyHistory));
    window.location.href = 'results.html'; // Redirect to the results page
}

// Event listener for starting the game
document.getElementById("start-game").addEventListener("click", () => {
    document.getElementById("store-background").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    startLevel();
});

// Event listener for submitting the guess
document.getElementById("submit-guess").addEventListener("click", checkGuess);

// Event listener for advancing to the next customer
document.getElementById("next-customer").addEventListener("click", () => {
    if (level < maxLevels) {
        level++;
        startLevel();
    }
});