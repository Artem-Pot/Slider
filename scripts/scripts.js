const slider = document.querySelector('.slider__box'); //список слайдеров
const stub = document.querySelectorAll('.stub'); // слайдеры

const nextBotton = document.querySelector('.next'); //кнопка следующий
const backBotton = document.querySelector('.back'); //кнопка предыдущий


let numberSlider = Number(0); //счетчик текущего слайдера

nextBotton.addEventListener('click', () => {
    if (numberSlider + 1 < slider.children.length){
        slider.children[numberSlider].classList.remove('stub_activ');
        slider.children[numberSlider + 1].classList.add('stub_activ');
        numberSlider += 1;
    }
    else if(slider.children[numberSlider + 1] === undefined) {
        slider.children[numberSlider].classList.remove('stub_activ');
        slider.children[0].classList.add('stub_activ');
        numberSlider = 0;
    }
});

backBotton.addEventListener('click', () => {
    if (numberSlider > 0){
        slider.children[numberSlider].classList.remove('stub_activ');
        slider.children[numberSlider - 1].classList.add('stub_activ');
        numberSlider -= 1;
    }
    else if(slider.children[numberSlider - 1] === undefined) {
        numberSlider = slider.children.length - 1;
        slider.children[numberSlider].classList.add('stub_activ');
    }
});



