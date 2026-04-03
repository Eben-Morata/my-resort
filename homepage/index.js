const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");

menu.addEventListener("click", function () {
  // Toggle classes for the menu and hamburger animation
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

// Grab all the links
const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    // Prevent page jump for this demo
    e.preventDefault();

    // 1. Remove 'active' class from all links
    links.forEach((item) => item.classList.remove("active"));

    // 2. Add 'active' class to the one we just clicked
    this.classList.add("active");
  });
});

// header Carousel
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex === n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Auto-play feature
setInterval(() => {
  plusSlides(1);
}, 5000);

// About us
const observerOptions = {
  threshold: 0.2, // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

// Target all rows with the 'reveal' class
document.querySelectorAll(".reveal").forEach((row) => {
  observer.observe(row);
});

// suite section
function filterSuites(category, btn) {
  // Update Active Button
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const cards = document.querySelectorAll(".suite-card");

  cards.forEach((card) => {
    // If 'all' is selected or the card matches the category
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.style.display = "block";
      // Add a quick fade-in animation
      card.style.animation = "fadeIn 0.5s ease forwards";
    } else {
      card.style.display = "none";
    }
  });
}

// explore view prompt actions
function setupExplorePrompts() {
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", () => {
      const suiteCard = button.closest(".suite-card");
      const suiteTitle =
        suiteCard?.querySelector(".suite-info h3")?.innerText ||
        "Selected suite";
      const suiteImg = suiteCard?.querySelector("img")?.src || "";
      const suiteDesc =
        suiteCard?.querySelector(".suite-info p")?.innerText || "";
      const html = `
        <div class="explore-view">
          <img src="${suiteImg}" alt="${suiteTitle}" style="width:100%; max-width:320px; border-radius:8px; margin-bottom:12px;" />
          <strong>${suiteTitle}</strong>
          <p>${suiteDesc}</p>
          <p>Use filters or scroll for more suite options.</p>
        </div>
      `;
      showNotification("Now Viewing", html, true);
    });
  });
}

// Initialize prompts on DOM load
document.addEventListener("DOMContentLoaded", setupExplorePrompts);

// dinning section
const menus = {
  Azure: [
    {
      item: "Banku & Tilapia: Fermented corn and cassava dough served with spicy grilled tilapia and raw pepper.",
      price: "&#8373;24",
    },
    {
      item: "Fufu & Light Soup: Smooth, pounded cassava and plantain (or yam) served in a savory light soup with goat or fish.",
      price: "&#8373;38",
    },
    {
      item: "Waakye: Rice and beans cooked together, typically served with stew, shito (hot pepper sauce), fried plantain, and boiled eggs.",
      price: "&#8373;52",
    },
  ],
  Spice: [
    {
      item: "Red-Red (Stew): A popular bean stew cooked with palm oil and served with fried ripe plantains.",
      price: "&#8373;26",
    },
    {
      item: "Tuo Zaafi (TZ): Soft cooked corn flour meal served with leafy green soup (Kontomire) or okra soup.",
      price: "&#8373;45",
    },
    {
      item: "Garden Egg Stew: A savory stew made with indigenous eggplant, served with boiled yam or plantain.",
      price: "&#8373;14",
    },
  ],
};

function toggleMenu(restaurant) {
  const modal = document.getElementById("menu-modal");
  const title = document.getElementById("modal-title");
  const itemsContainer = document.getElementById("menu-items");

  if (restaurant) {
    title.innerText = `${restaurant} Signature Menu`;
    itemsContainer.innerHTML = menus[restaurant]
      .map(
        (m) => `
      <div class="menu-item">
        <span>${m.item}</span>
        <strong>${m.price}</strong>
      </div>
    `,
      )
      .join("");
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

// booking section
document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const guests = document.getElementById("guests").value;

    // Simple Date Validation
    if (new Date(checkout) <= new Date(checkin)) {
      showNotification(
        "Invalid Dates",
        "Check-out date must be after check-in date.",
      );
      return;
    }

    // Simulate API Call to a Booking Engine
    searchRooms(checkin, checkout, guests);
  });

function searchRooms(inDate, outDate, count) {
  const modal = document.getElementById("results-modal");
  const list = document.getElementById("rooms-list");

  // Mock Data - In a real app, this comes from your backend/API
  const availableRooms = [
    { name: "Ocean View Suite", price: "&#8373;450/night", img: "🌊" },
    { name: "Garden Private Villa", price: "&#8373;680/night", img: "🌿" },
  ];

  list.innerHTML = availableRooms
    .map(
      (room) => `
    <div style="border-bottom: 1px solid #ddd; padding: 15px 0; display:flex; justify-content: space-between;">
      <div>
        <strong>${room.img} ${room.name}</strong><br>
        <small>Available for ${inDate} to ${outDate}</small>
      </div>
      <div>
        <span style="color:#d4af37; font-weight:bold;">${room.price}</span>
        <button style="margin-left:10px; cursor:pointer;">Select</button>
      </div>
    </div>
  `,
    )
    .join("");

  modal.style.display = "block";
}

// Close Modal Logic
document.querySelector(".close").onclick = () => {
  document.getElementById("results-modal").style.display = "none";
};

// Notification Modal Functions
function showNotification(title, message, html = false) {
  const modal = document.getElementById("notification-modal");
  document.getElementById("notification-title").innerText = title;
  const msg = document.getElementById("notification-message");
  if (html) {
    msg.innerHTML = message;
  } else {
    msg.innerText = message;
  }
  modal.style.display = "flex";
}

function closeNotificationModal() {
  const modal = document.getElementById("notification-modal");
  modal.style.display = "none";
}

// booking
const bookingForm = document.getElementById("requestForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show initial message
    showNotification("Request Sent", "Your request is being processed...");

    // Simulate an API delay
    setTimeout(() => {
      showNotification(
        "Successful",
        "Request Sent! Thanks for booking Us. We will get in touch with You.",
      );
      bookingForm.reset();
    }, 1500);
  });
}

// footer
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("footer-newsletter");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulating an API call
    const email = newsletterForm.querySelector("input").value;

    showNotification(
      "Newsletter Subscription",
      "Thank you! Your journey begins soon.",
    );

    newsletterForm.reset();
  });
});

// toggle
const toggleSwitch = document.querySelector("#checkbox");
const currentTheme = localStorage.getItem("theme");

// Check for saved user preference on load
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
