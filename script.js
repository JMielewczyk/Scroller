const sections = document.querySelectorAll('.section');
const main = document.querySelector('.main');
const sectionSelector = document.querySelector('.section-selector');
let allDots;

let currentSection = 0;
let isThrottled = false;

const addDots = () => {
    for (section of sections) {
        const element = document.createElement('div');
        element.classList.add('dot')
        sectionSelector.appendChild(element)
    }
    allDots = [...document.querySelectorAll('.dot')]
}
addDots()


const chooseSection = (e) => {
    if (e.target.classList.value === 'dot') {
        const index = allDots.indexOf(e.target)
        currentSection = index;
        scrollInto(currentSection)
    }
}
sectionSelector.addEventListener('click', chooseSection)

window.addEventListener('wheel', (e) => {
    if (isThrottled) return
    isThrottled = true;

    setTimeout(() => {
        isThrottled = false
    }, 300)

    const direction = e.deltaY > 0 ? 1 : -1;
    if (direction === 1) {
        if (sections.length - 1 === currentSection) return
        currentSection++
    } else {
        if (currentSection === 0) return
        currentSection--
    }
    scrollInto(currentSection)
})

function scrollInto(value, mobile) {
    if (mobile) {
        console.log(currentSection)
        const position = `translateY(-${sections[currentSection].offsetTop}px)`
        const positionNav = `calc(${sections[currentSection].offsetTop}px + 50vh)`;
        main.style.transform = position;
        sectionSelector.style.top = positionNav;
    }
    sections[value].scrollIntoView({
        behavior: 'smooth',
        block: "start",
    })
    allDots.forEach(dot => dot.classList.remove('active'))
    allDots[value].classList.add('active')
}
scrollInto(currentSection)

let touchStart_value;
let touchEnd_value;
let swipe;

window.addEventListener('touchstart', (e) => {
    touchStart_value = e.touches[0].clientY
})
window.addEventListener('touchmove', (e) => {
    touchEnd_value = e.touches[0].clientY
})
window.addEventListener('touchend', (e) => {
    detectSwipe(touchStart_value, touchEnd_value)
})

function detectSwipe(value_start, value_end) {
    if (Math.abs(value_start) > Math.abs(value_end)) {
        if (currentSection === sections.length - 1) return
        currentSection++
    } else {
        if (currentSection === 0) return
        currentSection--
    }
    scrollInto(currentSection, true)
}