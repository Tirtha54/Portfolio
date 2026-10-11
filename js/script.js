const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('open');
    });
});

const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeIcon.className = 'fa-solid fa-sun';
}

themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

const words = ['Web Developer', 'Cybersecurity Enthusiast', 'B.Sc. IT Graduate'];
const typingText = document.getElementById('typing-text');
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const word = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = word.substring(0, charIndex);

    let delay = deleting ? 50 : 100;

    if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1500;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

type();

const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.id;
        }
    });

    menuLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const success = document.getElementById('form-success');

function showError(input, errorId, text) {
    document.getElementById(errorId).textContent = text;
    input.classList.add('invalid');
}

function clearError(input, errorId) {
    document.getElementById(errorId).textContent = '';
    input.classList.remove('invalid');
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    success.textContent = '';

    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'name-error', 'Please enter your name');
        valid = false;
    } else {
        clearError(nameInput, 'name-error');
    }

    if (emailInput.value.trim() === '') {
        showError(emailInput, 'email-error', 'Please enter your email');
        valid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email');
        valid = false;
    } else {
        clearError(emailInput, 'email-error');
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'message-error', 'Please enter a message');
        valid = false;
    } else {
        clearError(messageInput, 'message-error');
    }

        if (valid) {
        success.style.color = '';
        success.textContent = 'Sending...';

        fetch('https://formspree.io/f/mrpelqvq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            })
        })
        .then(function (response) {
            if (response.ok) {
                success.textContent = 'Thank you! Your message has been sent.';
                form.reset();
            } else {
                success.style.color = '#f43f5e';
                success.textContent = 'Something went wrong. Please email me directly.';
            }
        })
        .catch(function () {
            success.style.color = '#f43f5e';
            success.textContent = 'Network error. Please email me directly.';
        });
    }
});