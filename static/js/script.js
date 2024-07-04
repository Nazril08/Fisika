document.querySelectorAll('.card-info a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        alert('More info clicked!');
    });
});