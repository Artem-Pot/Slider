const slider = document.querySelector('.slider__box'); //список слайдеров
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

//функция проверки и автоматического запуска слайдера через заданный промежуток времени
function startSlider() {
    //проверка и запуск автоматического слайдера
    if (settings.autoSlider.slider === 'on'){
        setInterval(nextSlider, settings.autoSlider.time);
    }
    //проверка и запуск наличия кнопок вперед/назад
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
        //проверка если в настройках включена навигация
        if (settings.navigation.navigation === 'on') {
            sliderNavigation.children[numberSlider].classList.remove('slider__list_activ');
            sliderNavigation.children[numberSlider + 1].classList.add('slider__list_activ');
        }
        numberSlider += 1;
    }
    else if(slider.children[numberSlider + 1] === undefined) {
        slider.children[numberSlider].classList.remove('stub_activ');
        slider.children[0].classList.add('stub_activ');
        //проверка если в настройках включена навигация
        if (settings.navigation.navigation === 'on') {
            sliderNavigation.children[numberSlider].classList.remove('slider__list_activ');
            sliderNavigation.children[0].classList.add('slider__list_activ');
        }
        numberSlider = 0;
    }
}

//функция предыдущего слайда
function backSlider() {
    if (numberSlider > 0){
        slider.children[numberSlider].classList.remove('stub_activ');
        slider.children[numberSlider - 1].classList.add('stub_activ');
        //проверка если в настройках включена навигация
        if (settings.navigation.navigation === 'on') {
            sliderNavigation.children[numberSlider].classList.remove('slider__list_activ');
            sliderNavigation.children[numberSlider - 1].classList.add('slider__list_activ');
        }
        numberSlider -= 1;
    }
    else if(slider.children[numberSlider - 1] === undefined) {
        numberSlider = slider.children.length - 1;
        slider.children[0].classList.remove('stub_activ');
        slider.children[numberSlider].classList.add('stub_activ');
        //проверка если в настройках включена навигация
        if (settings.navigation.navigation === 'on') {
            sliderNavigation.children[0].classList.remove('slider__list_activ');
            sliderNavigation.children[numberSlider].classList.add('slider__list_activ');
        }
    }
}

//функция перелистывания слайдов с помощью мыши
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowRight') {
        nextSlider();
    }
    if (event.code == 'ArrowLeft') {
        backSlider();
      }
  });

  document.addEventListener('mousedown', function(event) {
    if (event.code == 'ArrowRight') {
        nextSlider();
    }
    if (event.code == 'ArrowLeft') {
        backSlider();
      }
  });

// функция показа количества слайдов в виде навигации внизу 
function showNavigation() {  
    for (let i = 0; i < sliderBox.children.length; i++) {
        let item  = document.createElement('span');
        item.classList.add('slider__list');
        item.dataset.id = i; //создать уникальный data атрибут, чтобы знать к какому слайду привязан для дальнейшей возможности клика по нему
        sliderNavigation.insertAdjacentElement("afterbegin", item );  
    }

    sliderNavigation.append(...Array.from(sliderNavigation.children).reverse()); //'костыль' для реверса data-id
    sliderNavigation.children[numberSlider].classList.add('slider__list_activ'); //выводит активный элемент при запуске данной функции
}

//функция перелистывания на нужный слайд с помощью нижней навигации
document.addEventListener('click', function(e) {
    if (e.target.classList.value === 'slider__list') { //если нажатие на навигации слайдера
        slider.children[numberSlider].classList.remove('stub_activ');
        sliderNavigation.children[numberSlider].classList.remove('slider__list_activ');

        //создание активного слайда с активацией выделения навигации
        slider.children[e.target.dataset.id].classList.add('stub_activ');
        numberSlider = e.target.dataset.id; //текущий слайдер
        sliderNavigation.children[numberSlider].classList.add('slider__list_activ');
    }
});

//запуск и проверка всех настроек слайдера
startSlider();
