import pictures from './pictures.js';

const sliderBox = document.querySelector('.slider-box');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dots = document.querySelector('.dots');
let index = 0;
let auto = true;

sliderIndividualAndAutomatic(3000, 90)


function sliderIndividualAndAutomatic(frequency, sliderViewportHeight) {

    let timer = frequency + 1000;
    loadPictures();
    const slider = document.querySelectorAll('.slider');
    showDots();
    const dot = document.querySelectorAll('.dot');
    showPictureAutoFirst();
    const showAuto = setInterval(showPictureAuto, frequency);

    setInterval(() => {
        if (!auto) {
            timer += 1000;
            showPictureAuto();
        }
    }, frequency)

    leftArrow.addEventListener('click', () => {
        auto = false;
        timer = 0;
        clearInterval(showAuto);
        showPicture(index - 1);
    });

    rightArrow.addEventListener('click', () => {
        auto = false;
        timer = 0;
        clearInterval(showAuto);
        showPicture(index + 1);
    });

    for (let i = 0; i < pictures.length; i++) {
        dot[i].addEventListener('click', () => {
            auto = false;
            timer = 0;
            clearInterval(showAuto);
            showPicture(i);
        });
    }

    function showDots() {
        for (let i = 0; i < pictures.length; i++) {
            const dotElem = document.createElement('span');
            dotElem.classList.add('dot');
            dots.prepend(dotElem);
        }
    }

    function showPicture(i) {
        dot[index].classList.remove('dot-showed');
        slider[index].classList.remove('show')
        slider[index].classList.add('hide');
        if (i >= pictures.length) i = 0;
        if (i < 0) i = pictures.length - 1;
        slider[i].classList.remove('hide');
        slider[i].classList.add('show');
        dot[i].classList.add('dot-showed');
        index = i;
    }

    function showPictureAuto() {
        if (timer > frequency) {
            dot[index].classList.remove('dot-showed');
            slider[index].classList.remove('show')
            slider[index].classList.add('hide');
            index++;
            if (index >= pictures.length) index = 0;
            slider[index].classList.remove('hide');
            slider[index].classList.add('show');
            dot[index].classList.add('dot-showed');
        }
    }

    function showPictureAutoFirst() {
        slider[index].classList.remove('hide');
        slider[index].classList.add('show');
        dot[index].classList.add('dot-showed');
    }

    function loadPictures() {
        for (let i = 0; i < pictures.length; i++) {
            const sliderElement = document.createElement('div');
            sliderElement.classList.add('slider', 'hide');
            sliderElement.style.height = `${sliderViewportHeight}vh`;
            sliderElement.innerHTML = `
                                            <div class="count">${i + 1} / ${pictures.length}</div>
                                            <img src=${pictures[i].url} alt=${pictures[i].alt}>
                                            <div class="caption">${pictures[i].caption}</div>
                                        `;
            sliderBox.append(sliderElement);
        }
    }
}