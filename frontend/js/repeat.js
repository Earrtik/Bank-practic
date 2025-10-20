const hamburger = document.getElementById('hamburger');
const menuItems = document.getElementById('menu-items');

hamburger.addEventListener('click', () => {
    menuItems.classList.toggle('show');
});


// Animatie loading
// selectează toate link-urile cu clasa spinner-link
document.querySelectorAll('.spinner-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // previne navigarea instantanee
        document.getElementById('spinner').style.display = 'block'; // arată spinnerul

        setTimeout(() => {
            window.location.href = this.href; // navighează după 0.5 secunde
        }, 500);    
    });
});

