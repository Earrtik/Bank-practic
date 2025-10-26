// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const menuItems = document.getElementById('menu-items');

hamburger.addEventListener('click', () => {
    menuItems.classList.toggle('show');
});


window.addEventListener('pageshow', () => {
    const spinner = document.getElementById('spinner');
    if(spinner) spinner.style.display = 'none';
});

// --- Spinner la click pe link/button ---
document.body.addEventListener('click', function(e) {
    // prinde orice link sau button cu clasa spinner-link
    const link = e.target.closest('.spinner-link'); 
    if (!link) return;

    e.preventDefault();

    const spinner = document.getElementById('spinner');
    if(spinner) spinner.style.display = 'block';

    const href = link.getAttribute('href');

    
    setTimeout(() => {
        if(href) {
            window.location.href = href;
        }
    }, 300);
});
