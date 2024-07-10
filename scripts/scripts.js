const slider = document.querySelector('.slider__box'); //список слайдеров
const stub = document.querySelectorAll('.stub'); // слайдеры

const nextButton = document.querySelector('.next'); //кнопка следующий
const backButton = document.querySelector('.back'); //кнопка предыдущий

//счетчик текущего слайдера
let numberSlider = Number(0); 

//настройки
let settings = {
    //автослайдер
    autoSlider : { 
        slider : false, //вкл/вык автоматический слайдер
        time: 1000, //количество секунд для запуска автоматической смены слайда
    },
    //стрелки next, back
    arrow : {
        hiddenArrow : false, //скрыть кнопки следующий/предыдущий слайд. Запустится автослайдер.
    },
};

//функция проверки и автоматического запуска слайдера через заданный промежуток времени
function startSlider() {
    //проверка и запуск автоматического слайдера
    if (settings.autoSlider.slider){
        setInterval(nextSlider, settings.autoSlider.time);
    }
    if (settings.arrow.hiddenArrow === true) {
        nextButton.style.display = 'none';
        backButton.style.display = 'none';
        settings.autoSlider.slider = true;
        setInterval(nextSlider, settings.autoSlider.time);
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

//запуск и проверка всех настроек слайдера
startSlider();

