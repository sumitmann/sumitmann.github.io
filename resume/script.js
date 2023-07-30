// script.js
document.addEventListener("DOMContentLoaded", function () {
    const pointersSection = document.querySelector(".pointers-section");
    const backgroundContent = document.getElementById("backgroundContent");

    const sections = document.querySelectorAll(".scroll-effect-section");

  function updateTextColor(element) {
    const letters = element.querySelectorAll("p span");
    const lettersCount = letters.length;
    const distanceFromTop = element.getBoundingClientRect().top - (window.innerHeight / 2 );
    const seciotnHeight = element.clientHeight;
    const scrollAmount = Math.max(0, Math.min((distanceFromTop / seciotnHeight) * -1, 1))

    // Calculate the index of the letter to change color based on the scroll amount
    const letterIndex = Math.floor(scrollAmount / (0.8 / lettersCount));
    const textColor = `rgb(255, 255, 255)`;

    // Apply the new text color to each letter
    for (let i = 0; i < lettersCount; i++) {
      letters[i].style.color = i <= letterIndex ? textColor : '#242424';
    }
  }

  function onScroll() {
    sections.forEach((section) => {
      const sectionRect = section.getBoundingClientRect();
      const middleOfViewport = window.innerHeight / 2;

      // Check if the middle of the section is within the viewport
      if (sectionRect.top < middleOfViewport && sectionRect.bottom > middleOfViewport) {
        updateTextColor(section);
      }
    });
  }

  document.addEventListener("scroll", onScroll);






    const sectionHeight = pointersSection.clientHeight;
    const sectionWidth = pointersSection.clientWidth;
  
    // Function to create '+ x' elements and add them to the background
    function createPlusXElements(height, width) {
      const numRows = Math.ceil(height / 30);
      const numCells =  Math.ceil(width / 30);
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCells; j++) {
          const div = document.createElement("div");
          const span = document.createElement("span");
          div.classList.add("plus-x");
          span.textContent = "+";
          div.appendChild(span);
          backgroundContent.appendChild(div);
        }
      }
    }

    function tiltMainText(event) {
        const mainText = document.querySelector(".main-text");
        const rect = mainText.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const offsetX = rect.width / 2;
        const offsetY = rect.height / 2;
        const maxTilt = 5; // Maximum tilt angle in degrees
    
        // Calculate tilt angles based on mouse position (opposite direction)
        const tiltX = -(mouseY - offsetY) / offsetY * maxTilt;
        const tiltY = -(offsetX - mouseX) / offsetX * maxTilt;
    
        // Apply the tilt using CSS transform
        mainText.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      function resetMainText() {
        const mainText = document.querySelector(".main-text");
        mainText.style.transform = `rotateX(0deg) rotateY(0deg)`;
      }

      const landingContent = document.querySelector(".landing-content");
      landingContent.addEventListener("mousemove", tiltMainText);
      landingContent.addEventListener("mouseout", resetMainText);
  
    // Calculate the height of pointers-section and add '+ x' elements dynamically
    createPlusXElements(sectionHeight, sectionWidth);
  
    let isScrolling = false; // To track if scrolling is in progress
    let scrollTimeout; // Declare the scrollTimeout variable outside the event listener
  
    // Function to rotate background elements based on scroll amount
    function rotateBackgroundElements(scrollAmount) {
      if (isScrolling) {
        const elements = document.querySelectorAll(".plus-x");
        elements.forEach((element) => {
          const rotateX = ((element.getBoundingClientRect().top + element.clientHeight) / window.innerHeight - 0.5) * 360 * scrollAmount;
          element.style.transform = `rotate(${-rotateX}deg)`;
        });
      }
    }
  
    document.addEventListener("scroll", function () {
      isScrolling = true; // Set isScrolling to true when scrolling starts
      clearTimeout(scrollTimeout); // Clear the previous timeout
      scrollTimeout = setTimeout(() => {
        isScrolling = false; // Set isScrolling to false after a delay (scrolling stopped)
      }, 100); // Adjust the delay time as needed
  
      const distanceFromTop = pointersSection.getBoundingClientRect().top;
      const scrollAmount = Math.min(Math.max(distanceFromTop / window.innerHeight, 0), 1);
  
      rotateBackgroundElements(scrollAmount);
    });
  });
  