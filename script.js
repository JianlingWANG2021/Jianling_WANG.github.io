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

