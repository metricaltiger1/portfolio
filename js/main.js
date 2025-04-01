// Main application controller
document.addEventListener("DOMContentLoaded", function () {
  console.log('Main DOMContentLoaded handler started');

  // Initialize mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll(".nav-links a").forEach((link) => {
          link.addEventListener("click", () => {
              navLinks.classList.remove("active");
          });
      });
  }

  // Header scroll effect
  const header = document.querySelector("header");
  if (header) {
      window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
              header.classList.add("scrolled");
          } else {
              header.classList.remove("scrolled");
          }
      });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: "smooth",
              });

              // Update URL without page reload
              history.pushState(null, null, targetId);
          }
      });
  });

  // Handle back/forward navigation
  window.addEventListener("popstate", function () {
      const hash = window.location.hash;
      if (hash) {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
              targetElement.scrollIntoView();
          }
      }
  });

  // Load sections dynamically
  const sections = [
      "about",
      "experience",
      "education",
      "skills",
      "projects",
      "contact",
  ];

  const contentDiv = document.getElementById("content");
  let loadedSections = 0;

  // Function to load sections sequentially
  function loadSection(index) {
      if (index >= sections.length) {
          // All sections loaded, initialize animations
          initializeAnimations();
          return;
      }

      const section = sections[index];
      fetch(`sections/${section}.html`)
          .then((response) => response.text())
          .then((html) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, "text/html");
              const sectionContent = doc.querySelector("section");

              if (sectionContent) {
                  contentDiv.appendChild(sectionContent);
                  console.log(`Loaded section: ${section}`);
                  
                  // Check if this is the contact section
                  if (section === "contact") {
                      setupContactForm();
                  }
              }

              // Load next section
              loadSection(index + 1);
          })
          .catch((error) => {
              console.error(`Error loading ${section}.html:`, error);
              // Continue with next section even if this one fails
              loadSection(index + 1);
          });
  }

  // Start loading sections
  loadSection(0);

  function initializeAnimations() {
      console.log('Initializing animations');
      
      // Initialize timeline animations
      const timelineItems = document.querySelectorAll(".timeline-item");
      if (timelineItems.length > 0) {
          const timelineObserver = new IntersectionObserver(
              (entries) => {
                  entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                          entry.target.classList.add("visible");
                      }
                  });
              },
              { threshold: 0.1 }
          );

          timelineItems.forEach((item) => timelineObserver.observe(item));
      }

      // Initialize skill bar animations
      const skillBars = document.querySelectorAll(".skill-progress");
      if (skillBars.length > 0) {
          const skillObserver = new IntersectionObserver(
              (entries) => {
                  entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                          const targetWidth = entry.target.getAttribute("data-width");
                          entry.target.style.width = targetWidth;
                          entry.target.style.transition = "width 1.5s ease";
                          skillObserver.unobserve(entry.target);
                      }
                  });
              },
              { threshold: 0.5 }
          );

          skillBars.forEach((bar) => {
              // Initialize all bars to 0 width
              bar.style.width = "0";
              skillObserver.observe(bar);
          });
      }
  }

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();


  // Typing animation for hero section
class TxtRotate {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    }
    
    tick() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];
  
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
      let delta = 200 - Math.random() * 100;
  
      if (this.isDeleting) { delta /= 2; }
  
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
  
      setTimeout(() => this.tick(), delta);
    }
  }
  
  // Initialize typing animation
  window.onload = function() {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute('data-rotate');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    
    // Add animation for title lines
    const titleLines = document.querySelectorAll('.title-line span');
    titleLines.forEach(line => {
      line.innerHTML = line.parentNode.textContent;
      line.style.display = 'inline-block';
    });
  };

  // Initialize EmailJS
// Initialize EmailJS
console.log('Initializing EmailJS...');
emailjs.init('Zp1P-9f_0cMqR-jzx')
    .then(function() {
        console.log('EmailJS successfully initialized');
    })
    .catch(function(error) {
        console.error('EmailJS initialization failed:', error);
    });

// Contact form handling
function setupContactForm() {
    console.log('Setting up contact form');
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log('Contact form not found yet');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    // Create spinner if it doesn't exist
    if (!submitBtn.querySelector('.spinner')) {
        const spinner = document.createElement('span');
        spinner.className = 'spinner hidden';
        submitBtn.appendChild(spinner);
    }

    contactForm.addEventListener('submit', function(e) {
        console.log('Form submission started');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Set loading state
        setFormState(true);
        
        const serviceID = 'service_t13xp4e';
        const templateID = 'template_0qg0xmb';

        // Prepare email parameters
        const emailParams = {
            name: contactForm.querySelector('#name').value,
            from_name: contactForm.querySelector('#name').value, // Using same value as name
            message: contactForm.querySelector('#message').value,
            subject: contactForm.querySelector('#subject').value,
            reply_to: contactForm.querySelector('#email').value
        };

        console.log('Sending email with parameters:', emailParams);
        emailjs.send(serviceID, templateID, emailParams)
            .then((response) => {
                console.log('Email successfully sent', response);
                showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                showFormMessage('Failed to send message. Please try again later.', 'error');
            })
            .finally(() => {
                setFormState(false);
            });
    });

    function setFormState(isSubmitting) {
        console.log(`Setting form state to ${isSubmitting ? 'loading' : 'idle'}`);
        const fields = contactForm.querySelectorAll('input, textarea, button');
        fields.forEach(field => {
            field.disabled = isSubmitting;
        });

        const spinner = submitBtn.querySelector('.spinner');
        if (isSubmitting) {
            submitBtn.classList.add('sending');
            spinner.classList.remove('hidden');
        } else {
            submitBtn.classList.remove('sending');
            spinner.classList.add('hidden');
        }
    }

    function showFormMessage(message, type) {
        console.log(`Showing message: ${message} (${type})`);
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');
        
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

// Check for contact form periodically in case it loads after our initial check
const formCheckInterval = setInterval(() => {
    if (document.getElementById('contactForm')) {
        setupContactForm();
        clearInterval(formCheckInterval);
    }
}, 500);
});

