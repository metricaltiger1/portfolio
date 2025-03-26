document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeStyle = document.getElementById('theme-style');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        themeStyle.href = 'css/dark-mode.css';
        document.querySelector('.toggle-ball').style.transform = 'translateX(30px)';
    }

    // Toggle theme
    themeToggle.addEventListener('click', function() {
        if (themeStyle.href.includes('dark-mode.css')) {
            themeStyle.href = '';
            localStorage.setItem('theme', 'light');
            document.querySelector('.toggle-ball').style.transform = 'translateX(0)';
        } else {
            themeStyle.href = 'css/dark-mode.css';
            localStorage.setItem('theme', 'dark');
            document.querySelector('.toggle-ball').style.transform = 'translateX(30px)';
        }
    });
});