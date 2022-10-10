const sections = document.querySelectorAll('.section');
const main = document.querySelector('.main');
const sectionSelector = document.querySelector('.section-selector');

let allDots;
let is_touchDevice = false;
let currentSection = 0;
let isThrottled = false;
let touchStart_value;
let touchEnd_value;


function isTouchDevice() {
    if (navigator.maxTouchPoints > 0) {
        is_touchDevice = true
    }
}
isTouchDevice();


const createNavigation = () => {
    for (section of sections) {
        const element = document.createElement('div');
        element.classList.add('dot')
        sectionSelector.appendChild(element)
    }
    allDots = [...document.querySelectorAll('.dot')]
}
createNavigation()


const chooseSection = (e) => {
    if (e.target.classList.value === 'dot') {
        const index = allDots.indexOf(e.target)
        currentSection = index;
        scrollInto(currentSection, is_touchDevice)
    }
}
sectionSelector.addEventListener('click', chooseSection)


const wheel_scrollValue = (e) => {
    is_touchDevice = false;
    if (isThrottled) return
    isThrottled = true;

    setTimeout(() => {
        isThrottled = false
    }, 600)
    const direction = e.deltaY > 0 ? 1 : -1;
    calc_currentSection(direction)
}
window.addEventListener('wheel', wheel_scrollValue);


const calc_currentSection = (direction) => {
    if (direction === 1) {
        if (sections.length - 1 === currentSection) return
        currentSection++
    } else {
        if (currentSection === 0) return
        currentSection--
    }
    scrollInto(currentSection, is_touchDevice)
}


const is_arrowKey = (e) => {
    if (e.key === 'ArrowDown') {
        calc_currentSection(1);
    } else if (e.key === 'ArrowUp') {
        calc_currentSection(-1);
    } else return
}
document.addEventListener('keydown', is_arrowKey)


function scrollInto(value, is_touchDevice) {
    if (is_touchDevice === true) {
        const position = `translateY(-${sections[currentSection].offsetTop}px)`
        const positionNav = `calc(${sections[currentSection].offsetTop}px + 50vh)`;
        main.style.transform = position;
        sectionSelector.style.top = positionNav;
    } else {
        sections[value].scrollIntoView({
            behavior: 'smooth',
            block: "start",
        })
    }

    allDots.forEach(dot => dot.classList.remove('active'))
    allDots[value].classList.add('active')
}
scrollInto(currentSection)


window.addEventListener('touchstart', (e) => {
    touchStart_value = e.touches[0].clientY
})
window.addEventListener('touchmove', (e) => {
    touchEnd_value = e.touches[0].clientY
})
window.addEventListener('touchend', (e) => {
    detectSwipe(touchStart_value, touchEnd_value)
    touchStart_value = false;
    touchEnd_value = false;
})


function detectSwipe(value_start, value_end) {
    if (!value_end) return
    if (Math.abs(value_start) > Math.abs(value_end)) {
        if (currentSection === sections.length - 1) return
        currentSection++
    } else {
        if (currentSection === 0) return
        currentSection--
    }
    is_touchDevice = true
    scrollInto(currentSection, is_touchDevice)
}