// ==================== USER REGISTRATION & LOGIN ====================
// (Handled individually in HTML pages)

// ==================== QUIZZES SYSTEM ====================

// Load quizzes from LocalStorage or initialize sample quizzes
let quizzes = JSON.parse(localStorage.getItem('ivc_quizzes')) || [
    {
        question: "What is a trademark?",
        a: "A type of patent",
        b: "A symbol, word or phrase identifying a business",
        c: "A copyright",
        d: "A trade secret",
        correct: "b"
    },
    {
        question: "Which of the following can be copyrighted?",
        a: "Inventions",
        b: "Books and music",
        c: "Business names",
        d: "Logos",
        correct: "b"
    },
    {
        question: "IP stands for?",
        a: "Intellectual Property",
        b: "International Policy",
        c: "Internal Process",
        d: "Investment Plan",
        correct: "a"
    }
];

if(!localStorage.getItem('ivc_quizzes')){
    localStorage.setItem('ivc_quizzes', JSON.stringify(quizzes));
}

// ==================== UTILITY FUNCTIONS ====================

// Get current logged-in user
function getCurrentUser(){
    return JSON.parse(localStorage.getItem('ivc_current_user'));
}

// Update user score
function updateUserScore(newScore){
    let user = getCurrentUser();
    user.score = newScore;
    localStorage.setItem('ivc_current_user', JSON.stringify(user));

    let users = JSON.parse(localStorage.getItem('ivc_members')) || [];
    let idx = users.findIndex(u => u.email === user.email);
    if(idx !== -1){
        users[idx].score = newScore;
        localStorage.setItem('ivc_members', JSON.stringify(users));
    }
}

// ==================== PROFILE PAGE ====================

function loadProfile(){
    let user = getCurrentUser();
    if(!user){
        alert('Please login first!');
        window.location.href = 'login.html';
    } else {
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;
        document.getElementById('score').textContent = user.score;
    }
}

// ==================== LEADERBOARD ====================

function loadLeaderboard(){
    let users = JSON.parse(localStorage.getItem('ivc_members')) || [];
    users.sort((a,b) => b.score - a.score);

    const tbody = document.querySelector('#leaderboardTable tbody');
    if(!tbody) return;
    tbody.innerHTML = "";

    users.forEach((user, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.score}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ==================== COURSES ====================

function loadCourses(){
    let courses = JSON.parse(localStorage.getItem('ivc_courses')) || [];
    const container = document.getElementById('coursesContainer');
    if(!container) return;

    container.innerHTML = "";
    courses.forEach(course => {
        let div = document.createElement('div');
        div.classList.add('course-card');
        div.innerHTML = `
            <h2>${course.title}</h2>
            <p>${course.content}</p>
        `;
        container.appendChild(div);
    });
}

// ==================== IP TOOL ====================

function setupIPTool(){
    let step1Btns = document.querySelectorAll('#step1 .tool-btn');
    let step2 = document.getElementById('step2');
    let step2Question = document.getElementById('step2-question');
    let nextStepBtn = document.getElementById('nextStep');
    let resultDiv = document.getElementById('result');
    let ipResult = document.getElementById('ipResult');
    let selectedType = '';

    step1Btns.forEach(btn => {
        btn.addEventListener('click', function(){
            selectedType = this.getAttribute('data-type');
            document.getElementById('step1').style.display = 'none';
            step2.style.display = 'block';

            if(selectedType === 'brand'){
                step2Question.textContent = "Do you want to protect your brand name or logo?";
            } else if(selectedType === 'product'){
                step2Question.textContent = "Do you want to patent your product invention?";
            } else if(selectedType === 'creative'){
                step2Question.textContent = "Do you want to copyright your creative work (books, music, art)?";
            }
        });
    });

    nextStepBtn.addEventListener('click', function(){
        step2.style.display = 'none';
        resultDiv.style.display = 'block';

        if(selectedType === 'brand'){
            ipResult.textContent = "You should register a TRADEMARK to protect your brand/logo.";
        } else if(selectedType === 'product'){
            ipResult.textContent = "You should file a PATENT to protect your invention/product.";
        } else if(selectedType === 'creative'){
            ipResult.textContent = "You should register COPYRIGHT for your creative work.";
        }
    });
}
// SHOW ADMIN LINK
let adminUser = JSON.parse(localStorage.getItem("ivc_admin"));

if(adminUser){
    let link = document.getElementById("adminLink");
    if(link) link.style.display="block";
}
// ==================== EXPORTS ====================
// Call these functions in your pages as needed:
// loadProfile(), loadLeaderboard(), loadCourses(), setupIPTool()
