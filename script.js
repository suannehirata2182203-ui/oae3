document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('pageLoader');
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieSettings = document.getElementById('cookieSettings');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');
    const settingsCookies = document.getElementById('settingsCookies');
    const saveSettings = document.getElementById('saveSettings');

    if (pageLoader) {
        setTimeout(function() {
            pageLoader.classList.add('hidden');
        }, 1000);
    }

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            burgerMenu.setAttribute('aria-expanded', !isExpanded);
        });

        document.addEventListener('click', function(event) {
            if (!burgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const isHomePage = currentPage === 'home.html' || currentPage === '' || currentPage === 'index.html';

    if (cookieBanner && isHomePage) {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setTimeout(function() {
                cookieBanner.classList.add('show');
            }, 500);
        }

        if (acceptCookies) {
            acceptCookies.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                localStorage.setItem('essentialCookies', 'true');
                localStorage.setItem('analyticsCookies', 'true');
                localStorage.setItem('marketingCookies', 'true');
                cookieBanner.classList.remove('show');
                if (cookieSettings) {
                    cookieSettings.style.display = 'none';
                }
            });
        }

        if (rejectCookies) {
            rejectCookies.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'rejected');
                localStorage.setItem('essentialCookies', 'true');
                localStorage.setItem('analyticsCookies', 'false');
                localStorage.setItem('marketingCookies', 'false');
                cookieBanner.classList.remove('show');
                if (cookieSettings) {
                    cookieSettings.style.display = 'none';
                }
            });
        }

        if (settingsCookies) {
            settingsCookies.addEventListener('click', function() {
                if (cookieSettings) {
                    cookieSettings.style.display = cookieSettings.style.display === 'none' ? 'block' : 'none';
                }
            });
        }

        if (saveSettings) {
            saveSettings.addEventListener('click', function() {
                const analytics = document.getElementById('analyticsCookies');
                const marketing = document.getElementById('marketingCookies');
                
                localStorage.setItem('cookieConsent', 'custom');
                localStorage.setItem('essentialCookies', 'true');
                localStorage.setItem('analyticsCookies', analytics.checked ? 'true' : 'false');
                localStorage.setItem('marketingCookies', marketing.checked ? 'true' : 'false');
                
                cookieBanner.classList.remove('show');
                if (cookieSettings) {
                    cookieSettings.style.display = 'none';
                }
            });
        }
    }

    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('http')) {
                if (pageLoader) {
                    pageLoader.classList.remove('hidden');
                }
            }
        });
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted && pageLoader) {
            pageLoader.classList.add('hidden');
        }
    });

    window.addEventListener('popstate', function(event) {
        if (pageLoader) {
            pageLoader.classList.remove('hidden');
            setTimeout(function() {
                pageLoader.classList.add('hidden');
            }, 1000);
        }
    });

    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (pageLoader) {
                pageLoader.classList.remove('hidden');
            }
            setTimeout(function() {
                window.history.back();
                setTimeout(function() {
                    if (pageLoader) {
                        pageLoader.classList.add('hidden');
                    }
                }, 1000);
            }, 100);
        });
    });
});

