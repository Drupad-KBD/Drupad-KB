const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const scrambleElements = document.querySelectorAll(".scramble-text");

// Function to display the actual names after a delay


// Function to scramble text
const scrambleText = (element) => {
  let iterations = 0;
  const targetText = element.dataset.value; // Get the original text
  const interval = setInterval(() => {
    element.textContent = targetText.split("")
      .map((letter, index) => {
        if (index < iterations) {
          return targetText[index]; // Return the actual letter from the name
        }
        return letters[Math.floor(Math.random() * 26)]; // Scramble letters
      })
      .join("");

    if (iterations >= targetText.length) {
      clearInterval(interval); // Stop when the name is fully revealed
    }
    iterations += 1 / 2; // Adjust the speed of the reveal
  }, 25);
};


// Add event listeners for mouseover and touchstart to trigger scrambling
scrambleElements.forEach(element => {
  element.addEventListener("mouseover", (event) => {
    scrambleText(event.target);
  });

  element.addEventListener("touchstart", (event) => {
    scrambleText(event.target);
  });
});


// Dragging functionality for the image track
const track = document.getElementById("image-track");
let prevPercentage = 0;
let isDragging = false;

function handleDragStart(event) {
  isDragging = true;
  prevPercentage = parseFloat(track.dataset.percentage) || 0;
  const clientX = event.clientX || event.touches[0].pageX;
  track.dataset.mouseDownAt = clientX;
}

function handleDragEnd() {
  isDragging = false;
  track.dataset.mouseDownAt = "0";
}

function handleDragMove(event) {
  if (!isDragging) return;

  const clientX = event.clientX || event.touches[0].pageX;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
  const maxDelta = track.offsetWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentage = Math.max(Math.min(percentage + prevPercentage, 0), -100);

  track.dataset.percentage = nextPercentage;
  track.style.transform = `translate(${nextPercentage}%, 20%)`;
  track.animate(
    { transform: `translate(${nextPercentage}%, 20%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    image.animate(
      { objectPosition: `${nextPercentage + 100}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
}

// Add scroll button functionality/
const scrollBtn = document.getElementById("scroll-btn");

const scrollImages = () => {
    // Get the current percentage and ensure it is a number
    let currentPercentage = parseFloat(track.dataset.percentage) || 0;

    // Calculate the next percentage based on the current position
    let nextPercentage = currentPercentage - 50; // Scroll further each click

    // Prevent exceeding bounds
    if (nextPercentage < -100) {
        nextPercentage = 0; // Reset to the start after going too far
    }

    // Apply the transition
    track.style.transition = "transform 3s ease-out";
    track.style.transform = `translate(${nextPercentage}%, 20%)`;

    for (const image of track.getElementsByClassName("image")) {
        image.style.transition = "object-position 3s ease-out";
        image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    }

    // Update the current percentage in the dataset
    track.dataset.percentage = nextPercentage; // Store the new percentage value
};

// Attach click and touch event listeners
scrollBtn.addEventListener("click", scrollImages);
scrollBtn.addEventListener("touchstart", (event) => {
    event.preventDefault(); // Prevent default touch behavior
    scrollImages(); // Call the scroll function
});

// Dragging functionality
track.addEventListener("mousedown", handleDragStart);
track.addEventListener("touchstart", handleDragStart);
track.addEventListener("mouseup", handleDragEnd);
track.addEventListener("touchend", handleDragEnd);
window.addEventListener("mousemove", handleDragMove);
window.addEventListener("touchmove", handleDragMove);




  
//////////               navbarstuff             ////////////
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSection = document.querySelector(event.target.getAttribute('href'));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// You can add any other JavaScript functionality here
const contactSections = document.querySelectorAll('.contact-section');

contactSections.forEach(section => {
  section.addEventListener('mouseover', () => {
    contactSections.forEach(otherSection => {
      if (otherSection !== section) {
        otherSection.classList.add('opaque');
      }
    });
  });

  section.addEventListener('mouseout', () => {
    contactSections.forEach(otherSection => {
      otherSection.classList.remove('opaque');
    });
  });
});


const dropdownButtons = document.querySelectorAll('.dropdown-button');

dropdownButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.skill, .sub-title, .content');
hiddenElements.forEach((el) => observer.observe(el))

const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('active');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('active');
  });
});



// Toggle dropdown for mobile view
function toggleDropdown() {
  const dropdownMenu = document.getElementById('dropdown-menu');
  dropdownMenu.classList.toggle('show'); // Toggle the "show" class
}

// Close the dropdown when an option is selected
const dropdownLinks = document.querySelectorAll('.dropdown-content a');

dropdownLinks.forEach(link => {
  link.addEventListener('click', () => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.classList.remove('show'); // Close the dropdown
  });
});


// Theme toggle logic
const themeToggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("fa-sun", "fa-moon"); // Switch to moon icon
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-moon", "fa-sun"); // Switch to sun icon
    localStorage.setItem("theme", "light");
  }
});

// On page load, set the saved theme preference
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-sun", "fa-moon"); // Show moon if dark mode is active
  }
});




// Function to show or hide the description on double-click
function openDescription(title, description, videoSrc) {
    // Get modal elements
    const modal = document.getElementById("project-modal");
    const modalDescription = document.getElementById("modal-description");
    const videoSource = document.getElementById("video-source");

    // Set the title and description in the modal
    const modalTitle = modal.querySelector('h1');
    modalTitle.textContent = title; // Set the project title
    
    modalDescription.innerHTML = description; // Use innerHTML to render HTML content

    // Set the video source and load it
    videoSource.src = videoSrc;
    const modalVideo = document.getElementById("modal-video");
    modalVideo.load(); // Load the new video

    // Show the modal
    modal.style.display = "block";
}

function closeModal() {
    // Hide the modal
    const modal = document.getElementById("project-modal");
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("project-modal");
    if (event.target == modal) {
        closeModal();
    }
};
