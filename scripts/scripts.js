const slider = document.querySelector('.slider__box'); //список слайдеров
const stub = document.querySelectorAll('.stub'); // слайдеры

const nextButton = document.querySelector('.next'); //кнопка следующий
const backButton = document.querySelector('.back'); //кнопка предыдущий




//настройки
const settings = {
    slider : false, //вкл/вык автоматический слайдер
    time: 3000, //количество секунд для запуска автоматического слайдера
    
};

//счетчик текущего слайдера
let numberSlider = Number(0); 

//запуск и проверка всех настроек слайдера
startSlider();

//функция проверки и автоматического запуска слайдера через заданный промежуток времени
function startSlider() {
    //проверка и запуск автоматического слайдреа
    if (settings.slider){
        setInterval(nextSlider, settings.time);
    }
    else if (settings.slider === false) {
        return;
    }
}

//кнопка следующий слайдер
nextButton.addEventListener('click', () => {
    nextSlider();
});

//кнопка предыдущий слайдер
backButton.addEventListener('click', () => {
    backSlider();
});

//функция следующего слайда
function nextSlider() {
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
}

//функция предыдущего слайда
function backSlider() {
    if (numberSlider > 0){
        slider.children[numberSlider].classList.remove('stub_activ');
        slider.children[numberSlider - 1].classList.add('stub_activ');
        numberSlider -= 1;
    }
    else if(slider.children[numberSlider - 1] === undefined) {
        numberSlider = slider.children.length - 1;
        slider.children[numberSlider].classList.add('stub_activ');
    }
}




