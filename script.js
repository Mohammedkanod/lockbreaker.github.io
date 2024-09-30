// Game state
let level = 1;
const maxLevels = 30;
let correctCombination = "";
let attempts = 0;
let initialPermutations = 0;
let currentAccuracy = 100;
let accuracyHistory = [];
let attemptHistory = [];
// List of PnC-based hints for each level
const hints = [
    {
        hint: "237  :  One number is correct and well placed \n\n460  :  Two numbers are correct but wrongly placed \n\n195  :  Nothing is correct \n\n821  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [4, 0, 2],
        permutations: 6
    },
    {
        hint: "861  :  One number is correct and well placed \n\n523  :  Two numbers are correct but wrongly placed \n\n794  :  Nothing is correct \n\n289  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [2, 6, 1],
        permutations: 6
    },
    {
        hint: "913  :  One number is correct and well placed \n\n507  :  Nothing is correct \n\n284  :  One number is correct but wrongly placed \n\n146  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [1, 9, 3],
        permutations: 6
    },
    {
        hint: "314  :  One number is correct and well placed \n\n209  :  Two numbers are correct but wrongly placed \n\n875  :  Nothing is correct \n\n467  :  One number is correct and well placed",
        codeLength: 3,
        digits: [1, 2, 3],
        permutations: 6
    },
    {
        hint: "472  :  Two numbers are correct but wrongly placed \n\n865  :  One number is correct and well placed \n\n193  :  Nothing is correct \n\n570  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [2, 7, 4],
        permutations: 6
    },
    {
        hint: "210  :  Nothing is correct \n\n746  :  One number is correct and well placed \n\n583  :  Two numbers are correct but wrongly placed \n\n919  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [6, 3, 5],
        permutations: 6
    },
    {
        hint: "481  :  One number is correct and well placed \n\n362  :  Two numbers are correct but wrongly placed \n\n597  :  Nothing is correct \n\n254  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [3, 8, 4],
        permutations: 6
    },
    {
        hint: "847  :  One number is correct and well placed \n\n290  :  Two numbers are correct but wrongly placed \n\n765  :  Nothing is correct \n\n532  :  One number is correct and well placed",
        codeLength: 3,
        digits: [2, 4, 7],
        permutations: 6
    },
    {
        hint: "635  :  One number is correct and well placed \n\n189  :  Two numbers are correct but wrongly placed \n\n470  :  Nothing is correct \n\n804  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [1, 0, 5],
        permutations: 6
    },
    {
        hint: "752  :  One number is correct and well placed \n\n149  :  Two numbers are correct but wrongly placed \n\n863  :  Nothing is correct \n\n680  :  One number is correct and well placed",
        codeLength: 3,
        digits: [5, 7, 2],
        permutations: 6
    },
    {
        hint: "543  :  Two numbers are correct but wrongly placed \n\n297  :  One number is correct and well placed \n\n810  :  Nothing is correct \n\n564  :  One number is correct and well placed",
        codeLength: 3,
        digits: [5, 4, 3],
        permutations: 6
    },
    {
        hint: "298  :  One number is correct and well placed \n\n670  :  Two numbers are correct but wrongly placed \n\n184  :  Nothing is correct \n\n352  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [9, 0, 8],
        permutations: 6
    },
    {
        hint: "123  :  Two numbers are correct but wrongly placed \n\n456  :  Nothing is correct \n\n789  :  One number is correct and well placed \n\n230  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [0, 2, 3],
        permutations: 6
    },
    {
        hint: "374  :  One number is correct and well placed \n\n615  :  Two numbers are correct but wrongly placed \n\n980  :  Nothing is correct \n\n841  :  One number is correct and well placed",
        codeLength: 3,
        digits: [3, 7, 4],
        permutations: 6
    },
    {
        hint: "158  :  One number is correct and well placed \n\n764  :  Two numbers are correct but wrongly placed \n\n953  :  Nothing is correct \n\n625  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [5, 8, 1],
        permutations: 6
    },
    {
        hint: "760  :  One number is correct and well placed \n\n841  :  Two numbers are correct but wrongly placed \n\n239  :  Nothing is correct \n\n153  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [1, 0, 7],
        permutations: 6
    },
    {
        hint: "852  :  One number is correct and well placed \n\n348  :  Two numbers are correct but wrongly placed \n\n915  :  Nothing is correct \n\n217  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [2, 5, 8],
        permutations: 6
    },
    {
        hint: "469  :  One number is correct and well placed \n\n810  :  Two numbers are correct but wrongly placed \n\n273  :  Nothing is correct \n\n534  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [4, 6, 9],
        permutations: 6
    },
    {
        hint: "294  :  One number is correct and well placed \n\n607  :  Two numbers are correct but wrongly placed \n\n821  :  Nothing is correct \n\n125  :  One number is correct but wrongly placed",
        codeLength: 3,
        digits: [2, 4, 9],
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