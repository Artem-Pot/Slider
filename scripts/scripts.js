'use strict';
const sliderBox = document.querySelector('.slider__box'); //все слайдеры
const stub = document.querySelectorAll('.stub'); // каждый элемент слайдера
const nextButton = document.querySelector('.next'); //кнопка следующий
const backButton = document.querySelector('.back'); //кнопка предыдущий
const sliderNavigation = document.querySelector('.slider__navigation'); //поле нижней навигации

//счетчик текущего слайдера
let numberSlider = Number(0); 

//настройки
let settings = {
    //автослайдер
    autoSlider : { 
        slider : 'on', //вкл/вык автоматический слайдер
        time: 1000, //количество миллисекунд для запуска автоматической смены слайда
        timeManual : 5000, //количество миллисекунд для повторного запуска после остановки слайда в ручную
    },
    //стрелки next, back
    arrow : {
        arrow : 'on', //скрыть/показать кнопки следующий/предыдущий слайд. Если выключен то запустится автослайдер.
    },
    //нижняя навигация
    navigation : {
        navigation : 'on', //скрыть/показать навигацию
    },
};

//запуск и проверка всех включенных настроек
function startSlider() {
    //проверка и запуск автоматического слайдера
    if (settings.autoSlider.slider === 'on'){
        autoSlider(); //запуск автослайдера
    }
    //проверка и запуск наличия кнопок вперед/назад. Если кнопки скрыты, то запускается автоматическая прокрутка слайдера
    if (settings.arrow.arrow === 'off') {
        nextButton.style.display = 'none';
        backButton.style.display = 'none';
        settings.autoSlider.slider = true;
        setInterval(nextSlider, settings.autoSlider.time);
    }
    //проверка и запуск наличия нижней навигации
    if (settings.navigation.navigation === 'on') {
        showNavigation();
    }

    startCreateId(); //включение функции присвоения дата идентификаторов. Возможно её удалить если не понадобится
}

//функция таймер слайдера
let timerId;

function autoSlider() {
    timerId = setInterval(nextSlider, settings.autoSlider.time); //переменная для запуска и остановки автослайдера.
}

//нижняя навигация слайдеров
function showNavigation() {  
    for (let i = 0; i < sliderBox.children.length; i++) {
        let item  = document.createElement('span');
        item.classList.add('slider__list');
        item.dataset.nav = i; //создать уникальный data атрибут, чтобы знать к какому слайду привязан для дальнейшей возможности клика по нему
        sliderNavigation.insertAdjacentElement("afterbegin", item );  
    }
    sliderNavigation.append(...Array.from(sliderNavigation.children).reverse()); //'костыль' для реверса data-id
    sliderNavigation.children[numberSlider].classList.add('slider__list_activ'); //вывод текущему слайдеру увеличенную точку навигации
}

//функция присвоения идентификатора всем слайдерам, возможно пригодится
function startCreateId() {
    for (let i = 0; i < sliderBox.children.length; i++) {
        sliderBox.children[i].dataset.slider = i;
    }
}

//кнопка следующий слайдер
nextButton.addEventListener('click', () => {
    nextSlider();
    clearInterval(timerId); //остановка автослайдера
    setTimeout(autoSlider, settings.autoSlider.timeManual); //запуск таймера после его остановки
});

//кнопка предыдущий слайдер
backButton.addEventListener('click', () => {
    backSlider();
    clearInterval(timerId);  //остановка автослайдера
    setTimeout(autoSlider, settings.autoSlider.timeManual); //запуск таймера после его остановки
})

//функция перелистывания слайдов с помощью клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowRight') {
        nextSlider();
        clearInterval(timerId); //остановка автослайдера
        setTimeout(autoSlider, settings.autoSlider.timeManual); //запуск таймера после его остановки
    }
    if (event.code == 'ArrowLeft') {
        backSlider();
        clearInterval(timerId); //остановка автослайдера
        setTimeout(autoSlider, settings.autoSlider.timeManual); //запуск таймера после его остановки
      }
  });

  //функция перелистывания слайдов с помощью мыши 50 на 50 поле.
  //---в разработке----------
//   document.addEventListener('mousedown', function(event) {
//     if (event.code == 'ArrowRight') {
//         nextSlider();
//     }
//     if (event.code == 'ArrowLeft') {
//         backSlider();
//       }
//   });

//функция слайдера вперёд
function nextSlider() {
    sliderNavigation.children[+numberSlider].classList.remove('slider__list_activ');

    if (+numberSlider + 1 < sliderBox.children.length){ //если следующий слайдер меньше общего количества слайдеров
        sliderBox.children[+numberSlider].classList.remove('stub_activ');
        numberSlider = +numberSlider + 1;

        sliderBox.children[+numberSlider].classList.add('stub_activ');
        sliderNavigation.children[+numberSlider].classList.add('slider__list_activ');
    } 

    else if(sliderBox.children[+numberSlider + 1] === undefined) { //если следующий слайд не определён
        sliderBox.children[+numberSlider].classList.remove('stub_activ');
        numberSlider = 0;

        sliderBox.children[+numberSlider].classList.add('stub_activ');
        sliderNavigation.children[+numberSlider].classList.add('slider__list_activ');
    }
}
//функция слайдера назад
function backSlider() {
    sliderNavigation.children[+numberSlider].classList.remove('slider__list_activ');

    if (+numberSlider > 0){
        sliderBox.children[+numberSlider].classList.remove('stub_activ');
        sliderBox.children[numberSlider - 1].classList.add('stub_activ');

        sliderNavigation.children[numberSlider - 1].classList.add('slider__list_activ');
        numberSlider -= 1;
    }
    else if(sliderBox.children[numberSlider - 1] === undefined) {
        numberSlider = sliderBox.children.length - 1;

        sliderBox.children[0].classList.remove('stub_activ');

        sliderBox.children[+numberSlider].classList.add('stub_activ');
        sliderNavigation.children[+numberSlider].classList.add('slider__list_activ');
    }
}

//функция перемещения на нужный слайд с помощью нижней навигации
document.addEventListener('click', function(e) {
    if (e.target.classList.value === 'slider__list') { //если нажата одна из кнопок навигации

        //обнуление всех активных слайдов и навигации
        for (let i = 0; i < sliderBox.children.length; i++) {
            sliderBox.children[i].classList.remove('stub_activ');
            sliderNavigation.children[i].classList.remove('slider__list_activ');
        }  

        numberSlider = e.target.dataset.nav;
        sliderBox.children[numberSlider].classList.add('stub_activ');
        sliderNavigation.children[numberSlider].classList.add('slider__list_activ');
    }
});

startSlider();


