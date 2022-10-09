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

function scrollInto(value) {
    sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        block: "start",
    })
    allDots.forEach(dot => dot.classList.remove('active'))
    allDots[currentSection].classList.add('active')
}
scrollInto(currentSection)