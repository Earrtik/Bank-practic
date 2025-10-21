const hamburger = document.getElementById('hamburger');
const menuItems = document.getElementById('menu-items');

hamburger.addEventListener('click', () => {
    menuItems.classList.toggle('show');
});

document.body.addEventListener('click', function(e) {
    const link = e.target.closest('.spinner-link'); // prinde a sau button
    if (!link) return;

    e.preventDefault();
    const spinner = document.getElementById('spinner');
    if(spinner) spinner.style.display = 'block';

    const href = link.getAttribute('href');
    if(href) setTimeout(() => { window.location.href = href; }, 500);
});


