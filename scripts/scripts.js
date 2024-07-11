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
        slider : 'off', //вкл/вык автоматический слайдер
        time: 1000, //количество секунд для запуска автоматической смены слайда
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

//--------------------------------новая версия слайдера------------------------------------
//функция добавления идентификаторов слайдеру и навигации при старте
function startCreateId() {
    //присвоение идентификатора всем слайдерам
    for (let i = 0; i < sliderBox.children.length; i++) {
        sliderBox.children[i].dataset.slider = i;
    }
    //присвоение идентификатора всем навигационным кнопкам
    for (let i = 0; i < sliderBox.children.length; i++) {
        let item  = document.createElement('span');
        item.classList.add('slider__list');
        item.dataset.nav = i; //создать уникальный data атрибут, чтобы знать к какому слайду привязан для дальнейшей возможности клика по нему
        sliderNavigation.insertAdjacentElement("afterbegin", item );  
    }
    sliderNavigation.append(...Array.from(sliderNavigation.children).reverse()); //'костыль' для реверса data-id
    sliderNavigation.children[numberSlider].classList.add('slider__list_activ'); //вывод текущему слайдеру увеличенную точку навигации
}

startCreateId();


//кнопка следующий слайдер
nextButton.addEventListener('click', () => {
    nextSlider();
});

function nextSlider() {
    sliderNavigation.children[numberSlider].classList.remove('slider__list_activ');

    if (numberSlider + 1 < sliderBox.children.length){
        sliderBox.children[numberSlider].classList.remove('stub_activ');
        numberSlider += 1;

        sliderBox.children[numberSlider].classList.add('stub_activ');
        sliderNavigation.children[numberSlider].classList.add('slider__list_activ');

    }
    else if(sliderBox.children[numberSlider + 1] === undefined) {
        sliderBox.children[numberSlider].classList.remove('stub_activ');
        numberSlider = 0;

        sliderBox.children[numberSlider].classList.add('stub_activ');
        sliderNavigation.children[numberSlider].classList.add('slider__list_activ');
    }
}


//кнопка предыдущий слайдер
backButton.addEventListener('click', () => {
    backSlider();
})

function backSlider() {
    sliderNavigation.children[numberSlider].classList.remove('slider__list_activ');

    if (numberSlider > 0){
        sliderBox.children[numberSlider].classList.remove('stub_activ');
        sliderBox.children[numberSlider - 1].classList.add('stub_activ');

        sliderNavigation.children[numberSlider - 1].classList.add('slider__list_activ');
        numberSlider -= 1;
    }
    else if(sliderBox.children[numberSlider - 1] === undefined) {
        numberSlider = sliderBox.children.length - 1;
        sliderBox.children[0].classList.remove('stub_activ');

        sliderBox.children[numberSlider].classList.add('stub_activ');
        sliderNavigation.children[numberSlider].classList.add('slider__list_activ');
    }
}


//функция перелистывания слайдов с помощью клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowRight') {
        nextSlider();
    }
    if (event.code == 'ArrowLeft') {
        backSlider();
      }
  });

  //функция перелистывания слайдов с помощью мыши 50 на 50 поле.
  //---в разработке----------
  document.addEventListener('mousedown', function(event) {
    if (event.code == 'ArrowRight') {
        nextSlider();
    }
    if (event.code == 'ArrowLeft') {
        backSlider();
      }
  });

//функция перелистывания на нужный слайд с помощью нижней навигации
document.addEventListener('click', function(e) {
    if (e.target.classList.value === 'slider__list') { //если нажатие на навигации слайдера

        for (let i = 0; i < sliderBox.children.length; i++) {
            sliderBox.children[i].classList.remove('stub_activ');
            sliderNavigation.children[i].classList.remove('slider__list_activ');
        }   

        sliderBox.children[e.target.dataset.nav].classList.add('stub_activ');
        numberSlider = e.target.dataset.nav; 
        sliderNavigation.children[numberSlider].classList.add('slider__list_activ');
    }
});

//--------------------------------старая версия слайдера------------------------------------

// //функция проверки и автоматического запуска слайдера через заданный промежуток времени
// function startSlider() {
//     //проверка и запуск автоматического слайдера
//     if (settings.autoSlider.slider === 'on'){
//         setInterval(nextSlider, settings.autoSlider.time);
//     }
//     //проверка и запуск наличия кнопок вперед/назад
//     if (settings.arrow.arrow === 'off') {
//         nextButton.style.display = 'none';
//         backButton.style.display = 'none';
//         settings.autoSlider.slider = true;
//         setInterval(nextSlider, settings.autoSlider.time);
//     }
//     //проверка и запуск наличия нижней навигации
//     if (settings.navigation.navigation === 'on') {
//         showNavigation();
//     }
// }


// //запуск и проверка всех настроек слайдера
// startSlider();
