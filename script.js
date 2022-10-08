const sections = document.querySelectorAll('.section');
const main = document.querySelector('.main');
sections_offsetTop = []

for (let section of sections) {
    sections_offsetTop.push(section.offsetTop)
}

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        let scroll_value;
        for (let i = 0; i < sections_offsetTop.length; i++) {
            if (window.scrollY >= sections_offsetTop[i++] && e.key === 'ArrowDown') {
                scroll_value = sections_offsetTop[i--]
            }
        }
        window.scroll({
            left: 0,
            top: scroll_value,
            behavior: 'smooth'
        })
    }
})