let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav ul li a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav ul li a[href*=' + id + ']').classList.add('active')
      })
    }

  })
}

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('number').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, subject, message }), // Sending all form data
    });

    const result = await response.text();
    alert(result); 

    // Clear form fields after successful submission
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('number').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error sending your message.');
  }
});
