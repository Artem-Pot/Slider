'use strict';
const sliderBox = document.querySelector('.slider__box');
const stub = document.querySelectorAll('.stub');
const nextButton = document.querySelector('.next');
const backButton = document.querySelector('.back'); 
const sliderNavigation = document.querySelector('.slider__navigation');
const sliderElement = document.querySelector('.slider__element');

let animation = document.querySelector('.animation');
let numberSlider = Number(0);  //счетчик текущего слайдера

let timerSlider; //переменная времени перелистывания автослайдера
let timerRestartSlider; // переменная рестарта слайдера
let timerAutoHideShowArrow; //переменная таймера скрытия слайдера

let settings = {
    autoSlider : { 
        slider : 'off',
        time: 3000,
        timeManual : 10000,
    },
    arrow : {
        arrow : 'on', //скрыть/показать кнопки следующий/предыдущий слайд. Если выключен то запустится автослайдер.
        autoArrow : 'on',  //скрыть/показать кнопки следующий/предыдущий слайдера, если не активна autoArrowTime времени
        autoArrowTime : 6000, // время после которого скроются кнопки слайдера, если autoArrow - on
    },
    navigation : {
        navigation : 'on', //скрыть/показать нижнюю навигацию
    },
    animation : {
        animation : 'on', //вкл / выкл анимацию перелистывания слайдеров
        type : '1', //Тип анимации слайдера. Доступны номера от 1 до 3.
    },
};

//запуск и проверка всех настроек
function startSlider() {
    sliderSettingsСheck(); 
    arrowSettingsСheck(); 
    navigationSettingsСheck(); 
    autoHideArrow();
}

startSlider();

//-----------------------автослайдер-----------------------
//функция проверка настроек автослайдера
function sliderSettingsСheck(){
    if (settings.autoSlider.slider === 'on'){
        timerSlider = setInterval(nextSlider, settings.autoSlider.time);
    }
}

//функция повторного рестарта автослайдера после его остановки
function restartSlider() {
    if (settings.autoSlider.slider === 'on'){
        clearInterval(timerSlider); 
        clearTimeout(timerRestartSlider);
        timerRestartSlider = setTimeout(sliderSettingsСheck, settings.autoSlider.timeManual);
    }
}

//----------------------Стрелки и навигация--------------------
//функция проверки включения настроек стрелок слайдера и навигации
function arrowSettingsСheck(){
    if (settings.arrow.arrow === 'on') {        
        nextButton.style.display = 'block';
        backButton.style.display = 'block';
    }
    if (settings.arrow.arrow === 'off') {
        nextButton.style.display = 'none';
        backButton.style.display = 'none';
        settings.autoSlider.slider = 'on';
    }
}

//функция проверки включения навигационных кнопок
function navigationSettingsСheck(){
    if (settings.navigation.navigation === 'on') {
        sliderNavigation.style.display = 'flex';
        
        for (let i = 0; i < sliderBox.children.length; i++) {
            let item  = document.createElement('span');
            item.classList.add('slider__list');
            item.dataset.nav = i; //создать уникальный data атрибут, чтобы знать к какому слайду привязан для дальнейшей возможности клика по нему
            sliderNavigation.insertAdjacentElement("afterbegin", item );  
        }

        sliderNavigation.append(...Array.from(sliderNavigation.children).reverse()); //'костыль' для реверса data-id
        addClassNavigation(numberSlider);
    }
}

//функция автоскрытия кнопок и навигации после простоя
function autoHideArrow() {
    clearTimeout(timerAutoHideShowArrow);

    if (settings.arrow.arrow === 'on' && settings.arrow.autoArrow === 'on') {
        timerAutoHideShowArrow = setTimeout(() => {
            nextButton.style.display = 'none';
            backButton.style.display = 'none';
            sliderNavigation.style.display = 'none';
        }, settings.arrow.autoArrowTime);
    }
}

//функция показа стрелок и навигации после наведения
function autoShowArrow() {
    nextButton.style.display = 'block';
    nextButton.style.animation = 'animation-2 1s 1';

    backButton.style.display = 'block';
    backButton.style.animation = 'animation-2 1s 1';

    sliderNavigation.style.display = 'flex';
}

//-------------------Анимация слайдера--------------------------
//функция анимации слайдера
function animationSlider() {
    if (settings.animation .animation === 'on') {
        if (settings.animation.type === '1') {
            document.querySelector('.stub_activ').style.animation = 'animation-1 1s 1';
        }
        if (settings.animation.type === '2') {
            document.querySelector('.stub_activ').style.animation = 'animation-2 1s 1';
        }
        if (settings.animation.type === '3') {
            document.querySelector('.stub_activ').style.animation = 'animation-3 1s 1';
        }
    }
    else {
        document.querySelector('.stub_activ').style.animation = ''; 
    }
}

//-------------------функции удаления и добавления классов---------------------------
//функция удаление класса неактивного слайдера
function removeClass(children) {
    sliderBox.children[children].classList.remove('stub_activ');
}
//функция добавление класса активного слайдера
function addClass(children) {
    sliderBox.children[children].classList.add('stub_activ');
}

//функция удаление класса неактивной навигации
function removeClassNavigation(children) {
    sliderNavigation.children[children].classList.remove('slider__list_activ');
}

//функция добавление класса активной навигации
function addClassNavigation(children) {
    sliderNavigation.children[children].classList.add('slider__list_activ');
}

//--------------------функции смены слайдеров-------------------------
//функция слайдера вперёд
function nextSlider() {
    settings.navigation.navigation === 'on' ? removeClassNavigation(+numberSlider) : '';

    if (+numberSlider + 1 < sliderBox.children.length){ //если следующий слайдер меньше общего количества слайдеров
        removeClass(+numberSlider);
        numberSlider = +numberSlider + 1;
        addClass(+numberSlider);
        settings.navigation.navigation === 'on' ? addClassNavigation(+numberSlider) : '';
        animation.style.animation = 'animation-3 1s 1';
    } 

    else if(sliderBox.children[+numberSlider + 1] === undefined) { //если следующий слайд не определён
        removeClass(+numberSlider);
        numberSlider = 0;
        addClass(+numberSlider);
        settings.navigation.navigation === 'on' ? addClassNavigation(+numberSlider) : '';
        animation.style.animation = 'animation-3 1s 1';
    }
    animationSlider();
}

//функция слайдера назад
function backSlider() {
    settings.navigation.navigation === 'on' ? removeClassNavigation(+numberSlider) : '';

    if (+numberSlider > 0){
        removeClass(+numberSlider);
        addClass(numberSlider - 1);
        settings.navigation.navigation === 'on' ? addClassNavigation(+numberSlider - 1) : '';
        numberSlider -= 1;

    }
    else if(sliderBox.children[numberSlider - 1] === undefined) {
        numberSlider = sliderBox.children.length - 1;
        removeClass(0);
        addClass(+numberSlider);
        settings.navigation.navigation === 'on' ? addClassNavigation(+numberSlider) : '';
    }
    animationSlider(); 
}

//----------------------События -------------------------------
//Событие нажатия на кнопку следующий слайдер
nextButton.addEventListener('click', () => {
    nextSlider();
    restartSlider();
    autoHideArrow();
});

//Событие нажатия на кнопку  предыдущий слайдер
backButton.addEventListener('click', () => {
    backSlider();
    restartSlider();
    autoHideArrow();
})

//Событие смены слайдов с помощью клавиатуры
document.addEventListener('keydown', function(event) {
        if (event.code == 'ArrowRight') {
            nextSlider();
            arrowSettingsСheck();
            autoShowArrow();
            autoHideArrow();
            restartSlider();

        }
        if (event.code == 'ArrowLeft') {
            backSlider();
            arrowSettingsСheck();
            autoShowArrow();
            autoHideArrow();
            restartSlider();
        }
  });

//Событие перемещения на нужный слайд с помощью нижней навигации
document.addEventListener('click', function(e) {
    if (e.target.classList.value === 'slider__list') {

        //обнуление всех активных слайдов и навигации
        for (let i = 0; i < sliderBox.children.length; i++) {
            removeClass(i);
            removeClassNavigation(i);
        }  

        numberSlider = e.target.dataset.nav; //перейти на слайд с нужным дата id
        addClass(numberSlider);
        addClassNavigation(numberSlider);
        animationSlider();
        autoHideArrow(); 
        restartSlider();
    }
});

//Событие показа кнопок при наведении на слайдер, не распостраняется на блок навигации
sliderBox.addEventListener('mousemove', () => {
        arrowSettingsСheck();
        autoShowArrow();
        autoHideArrow();
})

//Событие отмены скрытия кнопок если были нажаты кнопки навигации или наведение
sliderElement.addEventListener('click', () => {
        arrowSettingsСheck();
        autoShowArrow();
        autoHideArrow();
})