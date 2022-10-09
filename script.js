const sections = document.querySelectorAll('.section');
const main = document.querySelector('.main');

let currentSection = 0;

let isThrottled = false;

window.addEventListener('wheel', (e) => {
    if (isThrottled) return
    isThrottled = true;

    setTimeout(() => {
        isThrottled = false
    }, 500)

    const direction = e.deltaY > 0 ? 1 : -1;
    if (direction === 1) {
        if (sections.length - 1 === currentSection) return
        currentSection++
    } else {
        if (currentSection === 0) return
        currentSection--
    }
    sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        block: "start",
    })
})