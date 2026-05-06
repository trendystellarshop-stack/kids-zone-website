/* ===========================
   KIDS ZONE WEBSITE - JAVASCRIPT
   =========================== */

// ===========================
// HAMBURGER MENU
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===========================
// GAME FUNCTIONS
// ===========================

let currentGame = null;

function startGame(gameName) {
    currentGame = gameName;
    const modal = document.getElementById('gameModal');
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = '';
    
    switch(gameName) {
        case 'memory':
            startMemoryGame(gameContainer);
            break;
        case 'colors':
            startColorQuiz(gameContainer);
            break;
        case 'numbers':
            startNumberRush(gameContainer);
            break;
        case 'letters':
            startLetterHunt(gameContainer);
            break;
        case 'geography':
            startGeographyQuest(gameContainer);
            break;
        case 'puzzle':
            startPuzzleMaster(gameContainer);
            break;
        default:
            gameContainer.innerHTML = '<p>Game not found!</p>';
    }
    
    modal.style.display = 'block';
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
    currentGame = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ===========================
// MEMORY MATCH GAME
// ===========================

function startMemoryGame(container) {
    const emojis = ['🎈', '🎈', '🎉', '🎉', '⭐', '⭐', '🎁', '🎁', '🎯', '🎯', '🎪', '🎪'];
    let shuffled = emojis.sort(() => 0.5 - Math.random());
    let flipped = [];
    let matched = [];
    let score = 0;

    const gameHTML = `
        <h2>🎯 Memory Match Game</h2>
        <p style="text-align: center; font-size: 1.2rem; color: #FF6B9D;">Score: <strong>${score}</strong>/6</p>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 2rem 0;">
            ${shuffled.map((emoji, index) => 
                `<button class="memory-card" data-index="${index}" onclick="flipCard(${index})">?</button>`
            ).join('')}
        </div>
        <button class="btn btn-primary" onclick="closeGame()">Back</button>
    `;
    
    container.innerHTML = gameHTML;

    window.flipCard = function(index) {
        if (flipped.includes(index) || matched.includes(index)) return;
        
        const cards = document.querySelectorAll('.memory-card');
        cards[index].textContent = shuffled[index];
        cards[index].style.backgroundColor = '#FFE66D';
        flipped.push(index);

        if (flipped.length === 2) {
            setTimeout(() => {
                if (shuffled[flipped[0]] === shuffled[flipped[1]]) {
                    matched.push(flipped[0], flipped[1]);
                    score++;
                    
                    cards[flipped[0]].style.backgroundColor = '#4ECDC4';
                    cards[flipped[1]].style.backgroundColor = '#4ECDC4';
                    
                    if (matched.length === shuffled.length) {
                        setTimeout(() => {
                            alert(`🎉 Congratulations! You won! Score: ${score}/6`);
                            closeGame();
                        }, 500);
                    }
                } else {
                    cards[flipped[0]].textContent = '?';
                    cards[flipped[1]].textContent = '?';
                    cards[flipped[0]].style.backgroundColor = '#f5f7fa';
                    cards[flipped[1]].style.backgroundColor = '#f5f7fa';
                }
                flipped = [];
                updateScore();
            }, 800);
        }
    };

    const updateScore = function() {
        const scoreEl = document.querySelector('strong');
        if (scoreEl) scoreEl.textContent = score;
    };

    const style = document.createElement('style');
    style.textContent = `
        .memory-card {
            width: 60px;
            height: 60px;
            font-size: 2rem;
            border: none;
            border-radius: 10px;
            background-color: #f5f7fa;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }
        .memory-card:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
}

// ===========================
// COLOR QUIZ GAME
// ===========================

function startColorQuiz(container) {
    const colors = [
        { name: 'Red', hex: '#FF6B6B', emoji: '🔴' },
        { name: 'Blue', hex: '#4ECDC4', emoji: '🔵' },
        { name: 'Yellow', hex: '#FFE66D', emoji: '🟡' },
        { name: 'Green', hex: '#95E1D3', emoji: '🟢' },
        { name: 'Purple', hex: '#C7CEEA', emoji: '🟣' },
        { name: 'Orange', hex: '#FF9999', emoji: '🟠' }
    ];

    let score = 0;
    let currentQuestion = 0;
    const totalQuestions = colors.length;

    function showQuestion() {
        if (currentQuestion >= totalQuestions) {
            container.innerHTML = `
                <h2>🎉 Quiz Complete!</h2>
                <p style="font-size: 2rem; color: #FF6B9D; text-align: center;">Your Score: <strong>${score}/${totalQuestions}</strong></p>
                <p style="text-align: center; font-size: 1.2rem;">Great job! 🌟</p>
                <button class="btn btn-primary" onclick="closeGame()" style="width: 100%; margin-top: 1rem;">Back</button>
            `;
            return;
        }

        const color = colors[currentQuestion];
        const options = colors.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        const gameHTML = `
            <h2>🎨 Color Quiz</h2>
            <p style="text-align: center;">Question ${currentQuestion + 1}/${totalQuestions}</p>
            <div style="text-align: center; margin: 2rem 0;">
                <div style="width: 150px; height: 150px; background-color: ${color.hex}; margin: 0 auto; border-radius: 15px;"></div>
                <p style="margin-top: 1rem; font-size: 1.2rem;">What color is this?</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${options.map(opt => 
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="checkColorAnswer('${opt.name}', '${color.name}')">${opt.emoji} ${opt.name}</button>`
                ).join('')}
            </div>
        `;
        
        container.innerHTML = gameHTML;
    }

    window.checkColorAnswer = function(selected, correct) {
        if (selected === correct) {
            score++;
            alert('✅ Correct!');
        } else {
            alert(`❌ Oops! The correct answer is ${correct}`);
        }
        currentQuestion++;
        showQuestion();
    };

    showQuestion();
}

// ===========================
// NUMBER RUSH GAME
// ===========================

function startNumberRush(container) {
    let score = 0;
    let questionCount = 0;
    const totalQuestions = 5;

    function generateQuestion() {
        if (questionCount >= totalQuestions) {
            container.innerHTML = `
                <h2>🎉 Game Over!</h2>
                <p style="font-size: 2rem; color: #FF6B9D; text-align: center;">Your Score: <strong>${score}/${totalQuestions}</strong></p>
                <button class="btn btn-primary" onclick="closeGame()" style="width: 100%; margin-top: 1rem;">Back</button>
            `;
            return;
        }

        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;
        const options = [correctAnswer];
        
        while (options.length < 4) {
            const wrong = Math.floor(Math.random() * 20);
            if (!options.includes(wrong) && wrong !== correctAnswer) {
                options.push(wrong);
            }
        }
        options.sort(() => 0.5 - Math.random());

        const gameHTML = `
            <h2>🔢 Number Rush</h2>
            <p style="text-align: center;">Question ${questionCount + 1}/${totalQuestions}</p>
            <p style="font-size: 2.5rem; text-align: center; color: #FF6B9D; margin: 2rem 0;"><strong>${num1} + ${num2} = ?</strong></p>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${options.map(opt => 
                    `<button class="btn btn-secondary" style="width: 100%; font-size: 1.2rem;" onclick="checkMathAnswer(${opt}, ${correctAnswer})">${opt}</button>`
                ).join('')}
            </div>
        `;
        
        container.innerHTML = gameHTML;
    }

    window.checkMathAnswer = function(selected, correct) {
        if (selected === correct) {
            score++;
            alert('✅ Correct!');
        } else {
            alert(`❌ Oops! The correct answer is ${correct}`);
        }
        questionCount++;
        generateQuestion();
    };

    generateQuestion();
}

// ===========================
// LETTER HUNT GAME
// ===========================

function startLetterHunt(container) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let score = 0;
    let currentQuestion = 0;
    const totalQuestions = 5;

    function showQuestion() {
        if (currentQuestion >= totalQuestions) {
            container.innerHTML = `
                <h2>🎉 Quiz Complete!</h2>
                <p style="font-size: 2rem; color: #FF6B9D; text-align: center;">Your Score: <strong>${score}/${totalQuestions}</strong></p>
                <button class="btn btn-primary" onclick="closeGame()" style="width: 100%; margin-top: 1rem;">Back</button>
            `;
            return;
        }

        const targetLetter = letters[Math.floor(Math.random() * 26)];
        const options = [targetLetter];
        
        while (options.length < 4) {
            const random = letters[Math.floor(Math.random() * 26)];
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        options.sort(() => 0.5 - Math.random());

        const gameHTML = `
            <h2>🔤 Letter Hunt</h2>
            <p style="text-align: center;">Question ${currentQuestion + 1}/${totalQuestions}</p>
            <p style="font-size: 3rem; text-align: center; color: #FF6B9D; margin: 2rem 0;"><strong>${targetLetter}</strong></p>
            <p style="text-align: center; font-size: 1.2rem;">Find this letter:</p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
                ${options.map(opt => 
                    `<button class="btn btn-secondary" style="font-size: 1.5rem; padding: 20px;" onclick="checkLetter('${opt}', '${targetLetter}')">${opt}</button>`
                ).join('')}
            </div>
        `;
        
        container.innerHTML = gameHTML;
    }

    window.checkLetter = function(selected, correct) {
        if (selected === correct) {
            score++;
            alert('✅ Correct!');
        } else {
            alert(`❌ Oops! The letter was ${correct}`);
        }
        currentQuestion++;
        showQuestion();
    };

    showQuestion();
}

// ===========================
// GEOGRAPHY QUEST GAME
// ===========================

function startGeographyQuest(container) {
    const countries = [
        { name: 'France', emoji: '🇫🇷', capital: 'Paris' },
        { name: 'Japan', emoji: '🇯🇵', capital: 'Tokyo' },
        { name: 'Brazil', emoji: '🇧🇷', capital: 'Brasília' },
        { name: 'Egypt', emoji: '🇪🇬', capital: 'Cairo' },
        { name: 'Australia', emoji: '🇦🇺', capital: 'Canberra' }
    ];

    let score = 0;
    let currentQuestion = 0;
    const totalQuestions = countries.length;

    function showQuestion() {
        if (currentQuestion >= totalQuestions) {
            container.innerHTML = `
                <h2>🎉 Quest Complete!</h2>
                <p style="font-size: 2rem; color: #FF6B9D; text-align: center;">Your Score: <strong>${score}/${totalQuestions}</strong></p>
                <button class="btn btn-primary" onclick="closeGame()" style="width: 100%; margin-top: 1rem;">Back</button>
            `;
            return;
        }

        const country = countries[currentQuestion];
        const options = countries.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        const gameHTML = `
            <h2>🌍 Geography Quest</h2>
            <p style="text-align: center;">Question ${currentQuestion + 1}/${totalQuestions}</p>
            <div style="text-align: center; margin: 2rem 0;">
                <p style="font-size: 4rem; margin-bottom: 1rem;">${country.emoji}</p>
                <p style="font-size: 1.3rem;">This is <strong>${country.name}</strong></p>
                <p style="margin-top: 1rem; font-size: 1.2rem;">What is its capital?</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${options.map(opt => 
                    `<button class="btn btn-secondary" style="width: 100%;" onclick="checkCapital('${opt.capital}', '${country.capital}')">${opt.capital}</button>`
                ).join('')}
            </div>
        `;
        
        container.innerHTML = gameHTML;
    }

    window.checkCapital = function(selected, correct) {
        if (selected === correct) {
            score++;
            alert('✅ Correct!');
        } else {
            alert(`❌ Oops! The capital is ${correct}`);
        }
        currentQuestion++;
        showQuestion();
    };

    showQuestion();
}

// ===========================
// PUZZLE MASTER GAME
// ===========================

function startPuzzleMaster(container) {
    const puzzles = [
        { question: 'What has hands but cannot clap?', answer: 'clock', hint: 'Think of time ⏰' },
        { question: 'What has a face but cannot smile?', answer: 'watch', hint: 'It tells time ⌚' },
        { question: 'What gets wet while drying?', answer: 'towel', hint: 'Used in bathroom 🛁' },
        { question: 'What has keys but no locks?', answer: 'piano', hint: 'Makes music 🎹' },
        { question: 'What is light and fluffy but weighs nothing?', answer: 'cloud', hint: 'In the sky ☁️' }
    ];

    let score = 0;
    let currentQuestion = 0;
    const totalQuestions = puzzles.length;

    function showQuestion() {
        if (currentQuestion >= totalQuestions) {
            container.innerHTML = `
                <h2>🎉 All Puzzles Solved!</h2>
                <p style="font-size: 2rem; color: #FF6B9D; text-align: center;">Your Score: <strong>${score}/${totalQuestions}</strong></p>
                <button class="btn btn-primary" onclick="closeGame()" style="width: 100%; margin-top: 1rem;">Back</button>
            `;
            return;
        }

        const puzzle = puzzles[currentQuestion];
        
        const gameHTML = `
            <h2>🧩 Puzzle Master</h2>
            <p style="text-align: center;">Question ${currentQuestion + 1}/${totalQuestions}</p>
            <div style="background-color: #FFE66D; padding: 2rem; border-radius: 15px; margin: 2rem 0; text-align: center;">
                <p style="font-size: 1.5rem; color: #2C3E50;"><strong>${puzzle.question}</strong></p>
            </div>
            <p style="text-align: center; font-size: 1rem; color: #7F8C8D; margin-bottom: 1rem;">${puzzle.hint}</p>
            <div style="margin: 2rem 0;">
                <input type="text" id="puzzleAnswer" placeholder="Type your answer..." style="width: 100%; padding: 10px; font-size: 1rem; border: 2px solid #FF6B9D; border-radius: 10px; margin-bottom: 1rem;">
                <button class="btn btn-primary" style="width: 100%;" onclick="checkPuzzle()">Submit Answer</button>
            </div>
        `;
        
        container.innerHTML = gameHTML;
        document.getElementById('puzzleAnswer').focus();
    }

    window.checkPuzzle = function() {
        const answer = document.getElementById('puzzleAnswer').value.toLowerCase().trim();
        const correct = puzzles[currentQuestion].answer.toLowerCase();
        
        if (answer === correct) {
            score++;
            alert('✅ Correct!');
        } else {
            alert(`❌ Oops! The answer is: ${puzzles[currentQuestion].answer}`);
        }
        currentQuestion++;
        showQuestion();
    };

    // Allow Enter key to submit
    container.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPuzzle();
        }
    });

    showQuestion();
}

// ===========================
// PAGE LOAD EFFECTS
// ===========================

window.addEventListener('load', () => {
    // Animate section titles on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
});

// ===========================
// SMOOTH SCROLL FOR BUTTONS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===========================
// CONSOLE WELCOME MESSAGE
// ===========================

console.log('%c🎉 Welcome to Kids Zone! 🎉', 'font-size: 20px; color: #FF6B9D; font-weight: bold;');
console.log('%cHave fun learning and playing!', 'font-size: 14px; color: #4ECDC4;');