const slider = document.querySelector('.slider__box'); //список слайдеров
const stub = document.querySelectorAll('.stub'); // слайдеры

const nextBotton = document.querySelector('.next'); //кнопка следующий
const backBotton = document.querySelector('.back'); //кнопка предыдущий

let numberSlider = 0;

// function test() {
//     for (let i = 0; i < slider.children.length; i++) {
//         if(slider.children[i].classList.contains('stub_activ')) {
//         slider.children[i].classList.remove('stub_activ');
//         slider.children[i + 1].classList.add('stub_activ2');
//         }        
//     }
// }

nextBotton.addEventListener('click', () => {
    slider.children[numberSlider].classList.remove('stub_activ');
    slider.children[numberSlider + 1].classList.add('stub_activ');
    numberSlider += 1;
    console.log(numberSlider + 1);
});

backBotton.addEventListener('click', () => {
    slider.children[numberSlider].classList.remove('stub_activ');
    slider.children[numberSlider - 1].classList.add('stub_activ');
    numberSlider -= 1;
    console.log(numberSlider + 1);    
});

