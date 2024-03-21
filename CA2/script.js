document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");
    const segments = [];
    let dx = 1;
    let dy = 0;
    let food = null;
    let gameIsOver = false;
    let score = 0; // Initialize score variable
    const initialSpeed = 100; // Initial speed in milliseconds
    let currentSpeed = initialSpeed;
    const growthRate = 1; // Number of segments added each time the snake eats food
  
    // Function to update score display
    function updateScoreDisplay() {
      const scoreDisplay = document.getElementById("score-display");
      scoreDisplay.textContent = "Score: " + score;
    }
  
    // Function to save score to localStorage
    function saveScore() {
      localStorage.setItem("snakeGameScore", score);
    }
  
    // Function to load score from localStorage
    function loadScore() {
      const savedScore = localStorage.getItem("snakeGameScore");
      if (savedScore !== null) {
        score = parseInt(savedScore);
        updateScoreDisplay();
      }
    }
    // Function to reset score to zero
    function resetScore() {
      score = 0;
      updateScoreDisplay(); // Update the displayed score
      saveScore(); // Save the new score to localStorage
  }
   // Load the score when the game starts
   loadScore();

   // Reset score to zero when the page is refreshed
   resetScore();

   // Function to play the sound effect
   function playEatSound() {
    const eatSound = document.getElementById("eat-sound");
    eatSound.play();
}
    // JavaScript code for the game logic

    // Play music button
    const playMusicButton = document.querySelector('.play-music');
    playMusicButton.addEventListener('click', function() {
      const bgMusic = document.getElementById('bg-music');
      bgMusic.play();
    });

    function playGameOverSound() {
      const gameOverSound = document.getElementById("game-over-sound");
      gameOverSound.play();
  }

    // Stop music button
    const stopMusicButton = document.querySelector('.stop-music');
    stopMusicButton.addEventListener('click', function() {
      const bgMusic = document.getElementById('bg-music');
      bgMusic.pause();
    });
    function createSegment(x, y) {
      const segment = document.createElement("div");
      segment.classList.add("snake-segment");
      segment.style.left = x * 10 + "px";
      segment.style.top = y * 10 + "px";
      gameContainer.appendChild(segment);
      segments.push(segment);
    }
  
    function createFood() {
      const x = Math.floor(Math.random() * 80);
      const y = Math.floor(Math.random() * 50);
      food = document.createElement("div");
      food.id = "food";
      food.style.left = x * 10 + "px";
      food.style.top = y * 10 + "px";
      gameContainer.appendChild(food);
    }
  
    function moveSnake() {
      if (gameIsOver) return;
  
      const head = segments[0];
      const newHead = document.createElement("div");
      newHead.classList.add("snake-segment");
      let newLeft = parseInt(head.style.left) + dx * 10;
      let newTop = parseInt(head.style.top) + dy * 10;
  
      // Check if the snake reaches the boundaries
      if (newLeft >= 800) newLeft = 0;
      else if (newLeft < 0) newLeft = 790;
      if (newTop >= 500) newTop = 0;
      else if (newTop < 0) newTop = 490;
  
      newHead.style.left = newLeft + "px";
      newHead.style.top = newTop + "px";
      gameContainer.insertBefore(newHead, segments[0]);
      segments.unshift(newHead);
      
      if (newHead.style.left === food.style.left && newHead.style.top === food.style.top) {
        gameContainer.removeChild(food);
        createFood();
        growSnake();
        updateSpeed(); // Update speed when snake grows
        score++; // Increase the score
        updateScoreDisplay(); // Update score display
        saveScore(); // Save score to localStorage
        playEatSound();
      } else {
        gameContainer.removeChild(segments.pop());
      }
  
      // Check if the snake bites its tail
      for (let i = 1; i < segments.length; i++) {
        if (newHead.style.left === segments[i].style.left && newHead.style.top === segments[i].style.top) {
          gameOver();
          break;
        }
      }
    }
    
  
    function changeDirection(event) {
      const key = event.keyCode;
      if (key === 37 && dx !== 1) {
        dx = -1;
        dy = 0;
      } else if (key === 38 && dy !== 1) {
        dx = 0;
        dy = -1;
      } else if (key === 39 && dx !== -1) {
        dx = 1;
        dy = 0;
      } else if (key === 40 && dy !== -1) {
        dx = 0;
        dy = 1;
      }
    }
  
    function gameOver() {
      gameIsOver = true;
      clearInterval(intervalId);
      alert("Game Over! Your score: " + score);
      localStorage.removeItem("snakeGameScore"); // Clear the saved score
      window.location.reload();
      playGameOverSound();
    }
  
    function growSnake() {
      for (let i = 0; i < growthRate; i++) {
        const lastSegment = segments[segments.length - 1];
        const newSegment = document.createElement("div");
        newSegment.classList.add("snake-segment");
        newSegment.style.left = lastSegment.style.left;
        newSegment.style.top = lastSegment.style.top;
        gameContainer.appendChild(newSegment);
        segments.push(newSegment);
      }
    }
  
    function updateSpeed() {
      // Increase speed based on the length of the snake
      const length = segments.length;
      currentSpeed = initialSpeed - (length * 2); // Adjust speed as per your preference
      if (currentSpeed < 50) currentSpeed = 50; // Limit the minimum speed
      clearInterval(intervalId);
      intervalId = setInterval(moveSnake, currentSpeed);
    }
  
    // Load the score when the game starts
    loadScore();
  
    createSegment(40, 25);
    createFood();
    let intervalId = setInterval(moveSnake, initialSpeed);
    document.addEventListener("keydown", changeDirection);
  });
  document.addEventListener("DOMContentLoaded", function() {
  const startScreen = document.getElementById("start-screen");
  const startForm = document.getElementById("start-form");
  const gameContainer = document.getElementById("game-container");

  // Event listener for the start form submission
  startForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values entered by the player
    const playerName = document.getElementById("player-name").value;
    const nickname = document.getElementById("nickname").value;

    // Check if both fields are filled
    if (playerName && nickname) {
      // Create a player object to store the name and nickname
      const player = {
        name: playerName,
        nickname: nickname
      };

      // Hide the start screen
      startScreen.classList.add("hidden");

      // Display the game container
      gameContainer.classList.remove("hidden");

      // Start the game with the player object
      startGame(player);
    } else {
      alert("Please fill in both fields.");
    }
  });

  // Function to start the game
  function startGame(player) {
    // Here, you can initialize the game with the player object
    console.log("Starting game with player:", player);
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const startScreen = document.getElementById("start-screen");
  const startForm = document.getElementById("start-form");
  const gameContainer = document.getElementById("game-container");

  // Event listener for the start form submission
  startForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values entered by the player
    const playerName = document.getElementById("player-name").value;
    const nickname = document.getElementById("nickname").value;

    // Check if both fields are filled
    if (playerName && nickname) {
      // Create a player object to store the name and nickname
      const player = {
        name: playerName,
        nickname: nickname
      };

      // Hide the start screen
      startScreen.classList.add("hidden");

      // Display the game container
      gameContainer.classList.remove("hidden");

      // Start the game with the player object
      startGame(player);
    } else {
      alert("Please fill in both fields.");
    }
  });

  // Function to start the game
  function startGame(player) {
    // Here, you can initialize the game with the player object
    console.log("Starting game with player:", player);
    // You can access player.name and player.nickname here to use in the game
  }
});




