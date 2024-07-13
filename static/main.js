let allBreeds = [];
let currentImageBreed = "";
let userName = "";
let score = 0;

// Fetch all breeds from the API
async function fetchBreeds() {
    const response = await fetch('/breeds');
    const data = await response.json();
    allBreeds = data.breeds;
}

// Fetch a random dog image from the API
async function fetchRandomDog() {
    const response = await fetch('/random_dog');
    const data = await response.json();
    const imageUrl = data.image_url;
    const breed = data.breed;
    currentImageBreed = breed;
    document.getElementById('dog-image').src = imageUrl;
    document.getElementById('dog-image').classList.add('fade-in');
    setTimeout(() => document.getElementById('dog-image').classList.remove('fade-in'), 1000);
    generateOptions(breed);
    document.getElementById('feedback').classList.add('is-hidden');
}

// Generate breed options for the user to guess
function generateOptions(correctBreed) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    const breeds = [correctBreed];

    while (breeds.length < 4) {
        const randomBreed = allBreeds[Math.floor(Math.random() * allBreeds.length)];
        if (!breeds.includes(randomBreed)) {
            breeds.push(randomBreed);
        }
    }

    breeds.sort(() => Math.random() - 0.5);

    breeds.forEach(breed => {
        const button = document.createElement('button');
        button.textContent = breed;
        button.className = 'button is-info is-large';
        button.style.fontSize = '1rem';
        button.style.padding = '0.5rem 1rem';
        button.style.borderRadius = '10px';
        button.onclick = () => checkGuess(breed);
        optionsContainer.appendChild(button);
    });
}

// Check the user's guess
function checkGuess(guess) {
    const feedback = document.getElementById('feedback');
    if (guess === currentImageBreed) {
        score++;
        feedback.textContent = getMotivationalMessage();
        feedback.className = 'notification is-success';
        setTimeout(fetchRandomDog, 2000);
    } else {
        feedback.textContent = getFailureMessage();
        feedback.className = 'notification is-danger';
        setTimeout(() => {
            submitScore(userName, score);
            resetGame();
        }, 2000);
    }
    feedback.classList.remove('is-hidden');
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Generate motivational message for correct guess
function getMotivationalMessage() {
    const messages = [
        `Wow, ${userName}! You're a dog detective!`,
        `Incredible, ${userName}! You must be part dog!`,
        `Unbelievable, ${userName}! You're crushing it!`,
        `Fantastic, ${userName}! You're a dog wizard!`
    ];
    const funnyMessages = [
        `You're unstoppable, ${userName}! Dog whisperer!`,
        `${userName}, you're a legend! Keep it up!`,
        `Woof-tastic, ${userName}! Dogs love you!`,
        `You're on fire, ${userName}! Dog master!`
    ];
    return score > 5 ? funnyMessages[Math.floor(Math.random() * funnyMessages.length)] : messages[Math.floor(Math.random() * messages.length)];
}

// Generate failure message for incorrect guess
function getFailureMessage() {
    const messages = [
        `GAME OVER, Oh no, ${userName}! Even dogs are laughing at you!`,
        `GAME OVER, Yikes, ${userName}! Did you forget what a dog looks like?`,
        `GAME OVER, Bummer, ${userName}! Better luck next time!`,
        `GAME OVER, Ouch, ${userName}! Even my cat could do better!`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Reset the game to the initial state
function resetGame() {
    document.getElementById('game').classList.add('is-hidden');
    document.getElementById('name-input').classList.remove('is-hidden');
    document.getElementById('user-name').value = '';
    score = 0;
}

// Start the game by fetching breeds and a random dog
function startGame() {
    const nameInput = document.getElementById('user-name');
    userName = nameInput.value.trim();
    if (userName) {
        document.getElementById('name-input').classList.add('is-hidden');
        document.getElementById('game').classList.remove('is-hidden');
        document.getElementById('score').textContent = `Score: ${score}`;
        fetchBreeds().then(fetchRandomDog);
    } else {
        const errorNotification = document.getElementById('error-notification');
        errorNotification.textContent = "Please enter your name";
        errorNotification.style.display = 'block';
        setTimeout(() => errorNotification.style.display = 'none', 3000);
    }
}

// Submit the score to the server
async function submitScore(userName, score) {
    const response = await fetch('/submit_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: userName, score: score }),
    });
    const data = await response.json();
    console.log(data.message);
    fetchLeaderboard();
}

// Fetch the leaderboard from the server
async function fetchLeaderboard() {
    const response = await fetch('/leaderboard');
    const data = await response.json();
    displayLeaderboard(data.leaderboard);
}

// Display the leaderboard
function displayLeaderboard(leaderboard) {
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = '';
    leaderboard.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.user_name}: ${entry.score}`;
        leaderboardContainer.appendChild(listItem);
    });
}

// Call fetchLeaderboard when the page loads
window.onload = fetchLeaderboard;
