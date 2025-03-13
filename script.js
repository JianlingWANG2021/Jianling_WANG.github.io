document.addEventListener("DOMContentLoaded", function () {
    // Function to show a section
    function showSection(sectionId, element) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected section
        let section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }

        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Remove active class from dropdown items
        document.querySelectorAll('.dropdown-menu li').forEach(item => {
            item.classList.remove('active');
        });

        // Set the clicked menu item as active
        if (element) {
            element.classList.add('active');
        }
    }

    // Function to toggle dropdown menu
    function toggleDropdown(event) {
        let dropdownMenu = document.querySelector(".dropdown-menu");
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "block";
        }
    }

    // Attach click event to navigation items
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", function (event) {
            let sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showSection(sectionId, this);
        });
    });

    // Attach click event to dropdown menu items
    document.querySelectorAll(".dropdown-menu li").forEach(item => {
        item.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents closing the dropdown
            let sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showSection(sectionId, this);
        });
    });

});



document.addEventListener("DOMContentLoaded", function () {
    loadQA();  // 页面加载时获取历史问答
});

function submitQuestion() {
    const questionInput = document.getElementById("question-input");
    const questionText = questionInput.value.trim();

    if (questionText === "") {
        alert("Please enter a question!");
        return;
    }

    const qaList = document.getElementById("qa-list");
    const li = document.createElement("li");
    li.innerHTML = `<strong>Q:</strong> ${questionText} <br> <strong>A:</strong> <span class="answer">Waiting for response...</span> 
                    <button onclick="replyToQuestion(this)">Reply</button>`;
    qaList.appendChild(li);

    saveQA();
    questionInput.value = "";  // 清空输入框
}

function replyToQuestion(button) {
    const answerSpan = button.previousElementSibling;
    const answer = prompt("Enter your reply:");
    if (answer) {
        answerSpan.textContent = answer;
        saveQA();
    }
}

// 保存问答数据到 localStorage
function saveQA() {
    const qaList = document.getElementById("qa-list").innerHTML;
    localStorage.setItem("qaData", qaList);
}

// 加载问答数据
function loadQA() {
    const savedQA = localStorage.getItem("qaData");
    if (savedQA) {
        document.getElementById("qa-list").innerHTML = savedQA;
    }
}


function submitQuestion() {
    const questionInput = document.getElementById("question-input");
    const questionText = questionInput.value.trim();

    if (questionText === "") {
        alert("Please enter a question!");
        return;
    }

    const qaList = document.getElementById("qa-list");
    const li = document.createElement("li");

    li.innerHTML = `<strong>Q:</strong> ${questionText} <br> 
                    <strong>A:</strong> <span class="answer">Waiting for response...</span> 
                    <button onclick="replyToQuestion(this)">Reply</button>
                    <button onclick="deleteQuestion(this)">Delete</button>`;
    qaList.appendChild(li);

    saveQA();
    questionInput.value = "";  // 清空输入框
}

function deleteQuestion(button) {
    button.parentElement.remove();  // 删除当前问题
    saveQA();  // 更新存储数据
}

