'use strict';
const sliderBox = document.querySelector('.slider__box'); //все слайдеры
const stub = document.querySelectorAll('.stub'); // каждый элемент слайдера
const nextButton = document.querySelector('.next'); //кнопка следующий
const backButton = document.querySelector('.back'); //кнопка предыдущий
const sliderNavigation = document.querySelector('.slider__navigation'); //поле нижней навигации
const sliderElement = document.querySelector('.slider__element');


let animation = document.querySelector('.animation');
let numberSlider = Number(0);  //счетчик текущего слайдера

//переменные для остановки таймеров
let timerSlider;
let timerRestartSlider; // переменная рестарта слайдера
let timerAutoHideShowArrow;

//настройки
let settings = {
    autoSlider : { 
        slider : 'on', //вкл/вык автоматический показ слайдеров
        time: 2000, //количество миллисекунд для запуска автоматической смены слайда
        timeManual : 5000, //количество миллисекунд для повторного запуска после остановки слайда в ручную
    },
    arrow : {
        arrow : 'on', //скрыть/показать кнопки следующий/предыдущий слайд. Если выключен то запустится автослайдер.
        autoArrow : 'on',  //скрыть кнопки следующий/предыдущий слайдера если не активна больше времени - autoArrowTime
        autoArrowTime : 6000, // время после которого скроются кнопки слайдера
    },
    navigation : {
        navigation : 'on', //скрыть/показать нижнюю навигацию
    },
    animation : {
        animation : 'on', //вкл / выкл анимацию
        type : '1', //вид анимации слайдера. Доступны номера от 1 до 3.
    },
};

startSlider(); //запуск проверки настроек и запуска слайдера

//запуск и проверка всех настроек
function startSlider() {
    sliderSettingsСheck(); //проверка автослайдера
    arrowSettingsСheck(); //проверка стрелок слайдера
    navigationSettingsСheck(); //проверка и запуск наличия нижней навигации

    // autoHideShowArrow(); /автоскрытие кнопок и навигации после простоя
}

//-----------автослайдер-----------------------
//функция проверка настроек автослайдера
function sliderSettingsСheck(){
    if (settings.autoSlider.slider === 'on'){     //проверка и запуск автоматического слайдера
        timerSlider = setInterval(nextSlider, settings.autoSlider.time); //присвоение переменной таймера для запуска и остановки автослайдера.
    }
}

//функция повторного рестарта автослайдера после его остановки
function restartSlider() {

    clearInterval(timerSlider); //остановка автослайдера перед повторным включением
    clearTimeout(timerRestartSlider); //остановка рестарта если уже была ранее запущена
    timerRestartSlider = setTimeout(sliderSettingsСheck, settings.autoSlider.timeManual); //таймер перезапуска автосладейра
}

//----------------------Стрелки и навигация--------------------
//функция проверки включения настроек стрелок слайдера
function arrowSettingsСheck(){
    if (settings.arrow.arrow === 'on') {         //показать кнопки вперед/назад
        nextButton.style.display = 'block';
        backButton.style.display = 'block';
    }
    else {     //отключение показа кнопок вперед/назад
        nextButton.style.display = 'none';
        backButton.style.display = 'none';
        sliderNavigation.style.display = 'none';

        //включение автослайдера
        settings.autoSlider.slider = 'on';
        // setInterval(nextSlider, settings.autoSlider.time); //удалить скорей всего т.к дублируется с основными настройками
    }
}

//функция проверки включения навигационных кнопок
function navigationSettingsСheck(){
    if (settings.navigation.navigation === 'on') {     //проверка и запуск наличия нижней навигации
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
function autoHideShowArrow() {
    // if (settings.arrow.arrow === 'on' && settings.arrow.autoArrow === 'on') {
    //     timerAutoHideShowArrow = setTimeout(() => {
    //         nextButton.style.display = 'none';
    //         backButton.style.display = 'none';
    //         sliderNavigation.style.display = 'none';
    //     }, settings.arrow.autoArrowTime);
    // }
}

//-------------------Анимация слайдера--------------------------
//функция анимации слайдера
function animationSlider() {
    // if (settings.animation .animation === 'on') {
    //     if (settings.animation.type === '1') {
    //         document.querySelector('.stub_activ').style.animation = 'animation-1 1s 1';
    //     }
    //     if (settings.animation.type === '2') {
    //         document.querySelector('.stub_activ').style.animation = 'animation-2 1s 1';
    //     }
    //     if (settings.animation.type === '3') {
    //         document.querySelector('.stub_activ').style.animation = 'animation-3 1s 1';
    //     }
    // }
    // else {
    //     document.querySelector('.stub_activ').style.animation = ''; 
    // }
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
    // animationSlider(); //анимация слайдера
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
    animationSlider(); //анимация слайдера
}

//----------------------События -------------------------------
//Событие нажатия на кнопку следующий слайдер
nextButton.addEventListener('click', () => {
    nextSlider();
    restartSlider();
    // autoHideShowArrow(); //скрытие кнопок после простоя
});

//Событие нажатия на кнопку  предыдущий слайдер
backButton.addEventListener('click', () => {
    backSlider();
    restartSlider();

    // autoHideShowArrow(); //скрытие кнопок после простоя
})

//Событие смены слайдов с помощью клавиатуры
document.addEventListener('keydown', function(event) {
    // if (settings.autoSlider.slider === 'off'){     //проверка включенного автослайдера
        if (event.code == 'ArrowRight') {
            nextSlider();
            restartSlider();
    //         autoHideShowArrow(); //скрытие кнопок после простоя
        }
        if (event.code == 'ArrowLeft') {
            backSlider();
            restartSlider();
    //         autoHideShowArrow(); //скрытие кнопок после простоя
        }
    // }
  });

//Событие перемещения на нужный слайд с помощью нижней навигации
document.addEventListener('click', function(e) {
    if (e.target.classList.value === 'slider__list') { //если нажата одна из кнопок навигации

        //обнуление всех активных слайдов и навигации
        for (let i = 0; i < sliderBox.children.length; i++) {
            removeClass(i);
            removeClassNavigation(i);
        }  

        numberSlider = e.target.dataset.nav; //перейти на слайд с нужным дата id
        addClass(numberSlider);
        addClassNavigation(numberSlider);

        clearInterval(timerId); //остановка автослайдера
        autoHideShowArrow(); //скрытие кнопок после простоя
        restartSlider(); //проверка и рестарт автослайдера
    }
});

//Событие показа кнопок при наведении на слайдер, не распостраняется на блок навигации
sliderBox.addEventListener('mousemove', () => {
    // if(settings.autoSlider.slider === 'off'){
    //     nextButton.style.display = 'block';
    //     nextButton.style.animation = 'animation-2 1s 1';

    //     backButton.style.display = 'block';
    //     backButton.style.animation = 'animation-2 1s 1';

    //     sliderNavigation.style.display = 'flex';

    //     clearTimeout(timerAutoHideShowArrow);
    // }
})

//Событие отмены скрытия кнопок если были нажаты кнопки навигации
sliderElement.addEventListener('click', () => {
        // clearTimeout(timerAutoHideShowArrow);
})
