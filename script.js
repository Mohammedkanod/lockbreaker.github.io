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
        hint: "251  :  Two numbers are correct but wrongly placed \n\n609  :  One number is correct and well placed  \n\n473  :  Nothing is correct",
        codeLength: 3,
        digits: [2, 1, 9],
        permutations: 6
    },
    {
        hint: "432  :  Two numbers are correct but wrongly placed \n\n518  :  One number is correct and well placed \n\n760  :  Nothing is correct",
        codeLength: 3,
        digits: [5, 1, 9],
        permutations: 6
    },
    {
        hint: "381  :  Two numbers are correct but wrongly placed \n\n926  :  Nothing is correct \n\n457  :  One number is correct and well placed",
        codeLength: 3,
        digits: [4, 8, 7],
        permutations: 6
    },
    {
        hint: "567  :  Nothing is correct \n\n241  :  Two numbers are correct but wrongly placed \n\n984  :  One number is correct and well placed",
        codeLength: 3,
        digits: [2, 8, 1],
        permutations: 6
    },
    {
        hint: "703  :  One number is correct and well placed \n\n594  :  Nothing is correct \n\n218  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [7, 2, 1],
        permutations: 6
    },
    {
        hint: "824  :  Two numbers are correct but wrongly placed \n\n931  :  One number is correct and well placed \n\n547  :  Nothing is correct",
        codeLength: 3,
        digits: [3, 9, 1],
        permutations: 6
    },
    {
        hint: "768  :  One number is correct and well placed \n\n542  :  Nothing is correct \n\n930  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [9, 7, 8],
        permutations: 6
    },
    {
        hint: "684  :  Two numbers are correct but wrongly placed \n\n752  :  One number is correct and well placed \n\n139  :  Nothing is correct",
        codeLength: 3,
        digits: [6, 5, 8],
        permutations: 6
    },
    {
        hint: "421  :  One number is correct and well placed \n\n308  :  Two numbers are correct but wrongly placed \n\n976  :  Nothing is correct",
        codeLength: 3,
        digits: [3, 1, 8],
        permutations: 6
    },
    {
        hint: "857  :  Nothing is correct \n\n240  :  One number is correct and well placed \n\n931  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [9, 1, 0],
        permutations: 6
    },
    {
        hint: "612  :  Two numbers are correct but wrongly placed \n\n954  :  One number is correct and well placed \n\n307  :  Nothing is correct",
        codeLength: 3,
        digits: [9, 1, 2],
        permutations: 6
    },
    {
        hint: "348  :  One number is correct and well placed \n\n526  :  Two numbers are correct but wrongly placed \n\n709  :  Nothing is correct",
        codeLength: 3,
        digits: [3, 2, 8],
        permutations: 6
    },
    {
        hint: "720  :  Nothing is correct \n\n361  :  Two numbers are correct but wrongly placed \n\n498  :  One number is correct and well placed",
        codeLength: 3,
        digits: [3, 9, 8],
        permutations: 6
    },
    {
        hint: "319  :  One number is correct and well placed \n\n540  :  Two numbers are correct but wrongly placed \n\n782  :  Nothing is correct",
        codeLength: 3,
        digits: [3, 4, 9],
        permutations: 6
    },
    {
        hint: "803  :  Two numbers are correct but wrongly placed \n\n291  :  Nothing is correct \n\n645  :  One number is correct and well placed",
        codeLength: 3,
        digits: [8, 4, 5],
        permutations: 6
    },
    {
        hint: "174  :  Nothing is correct \n\n863  :  One number is correct and well placed \n\n520  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [8, 2, 6],
        permutations: 6
    },
    {
        hint: "957  :  Two numbers are correct but wrongly placed \n\n438  :  Nothing is correct \n\n206  :  One number is correct and well placed",
        codeLength: 3,
        digits: [2, 9, 7],
        permutations: 6
    },
    {
        hint: "153  :  One number is correct and well placed \n\n678  :  Two numbers are correct but wrongly placed \n\n490  :  Nothing is correct",
        codeLength: 3,
        digits: [6, 7, 8],
        permutations: 6
    },
    {
        hint: "239  :  Nothing is correct \n\n814  :  Two numbers are correct but wrongly placed \n\n765  :  One number is correct and well placed",
        codeLength: 3,
        digits: [7, 5, 4],
        permutations: 6
    },
    {
        hint: "607  :  Two numbers are correct but wrongly placed \n\n381  :  One number is correct and well placed \n\n954  :  Nothing is correct",
        codeLength: 3,
        digits: [3, 1, 7],
        permutations: 6
    },
    {
        hint: "582  :  One number is correct and well placed \n\n430  :  Two numbers are correct but wrongly placed \n\n761  :  Nothing is correct",
        codeLength: 3,
        digits: [5, 3, 2],
        permutations: 6
    },
    {
        hint: "963  :  Two numbers are correct but wrongly placed \n\n218  :  Nothing is correct \n\n507  :  One number is correct and well placed",
        codeLength: 3,
        digits: [9, 5, 7],
        permutations: 6
    },
    {
        hint: "478  :  One number is correct and well placed \n\n329  :  Two numbers are correct but wrongly placed \n\n506  :  Nothing is correct",
        codeLength: 3,
        digits: [4, 9, 8],
        permutations: 6
    },
    {
        hint: "659  :  Two numbers are correct but wrongly placed \n\n213  :  One number is correct and well placed \n\n740  :  Nothing is correct",
        codeLength: 3,
        digits: [6, 3, 5],
        permutations: 6
    },
    {
        hint: "913  :  One number is correct and well placed \n\n507  :  Nothing is correct \n\n284  :  Two numbers are correct but wrongly placed",
        codeLength: 3,
        digits: [9, 2, 4],
        permutations: 6
    },
    {
        hint: "742  :  Two numbers are correct but wrongly placed \n\n351  :  One number is correct and well placed \n\n986  :  Nothing is correct",
        codeLength: 3,
        digits: [7, 1, 2],
        permutations: 6
    },
    {
        hint: "631  :  Nothing is correct \n\n859  :  Two numbers are correct but wrongly placed \n\n204  :  One number is correct and well placed",
        codeLength: 3,
        digits: [8, 9, 4],
        permutations: 6
    },
    {
        hint: "106  :  One number is correct and well placed \n\n437  :  Two numbers are correct but wrongly placed \n\n952  :  Nothing is correct",
        codeLength: 3,
        digits: [1, 4, 7],
        permutations: 6
    },
    {
        hint: "847  :  Two numbers are correct but wrongly placed \n\n513  :  Nothing is correct \n\n902  :  One number is correct and well placed",
        codeLength: 3,
        digits: [8, 2, 7],
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