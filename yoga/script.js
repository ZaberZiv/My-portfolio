window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    // Show/Hide Tabs
        let tab = document.querySelectorAll('.info-header-tab'),
            info = document.querySelector('.info-header'),
            tabContent = document.querySelectorAll('.info-tabcontent');

        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }

        hideTabContent(1);

        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {

                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }

        info.addEventListener('click', function(event) {
            let target = event.target;
            if (target && target.classList.contains('info-header-tab')) {
                for(let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });
        
            // Timer 

            let deadline = '2019-08-25';

            function getTimeRemaining(endtime) {
                let t = Date.parse(endtime) - Date.parse(new Date()),
                    seconds = Math.floor((t/1000) % 60),
                    minutes = Math.floor((t/1000/60) % 60),
                    hours = Math.floor((t/(1000*60*60)));
 
                return {
                    'total' : t,
                    'hours' : hours,
                    'minutes' : minutes,
                    'seconds' : seconds
                };
            }
 
            function setClock(id, endtime) {
                let timer = document.getElementById(id),
                    hours = timer.querySelector('.hours'),
                    minutes = timer.querySelector('.minutes'),
                    seconds = timer.querySelector('.seconds'),
                    timeInterval = setInterval(updateClock, 1000);
                     
                function updateClock() {
                    let t = getTimeRemaining(endtime);
 
                        function addZero(num){
                            if(num <= 9) {
                                return '0' + num;
                            } else return num;
                        }
 
                        hours.textContent = addZero(t.hours);
                        minutes.textContent = addZero(t.minutes);
                        seconds.textContent = addZero(t.seconds);
 
                        if (t.total <= 0) {
                            clearInterval(timeInterval);
                            hours.textContent = '00';
                            minutes.textContent = '00';
                            seconds.textContent = '00';
                        }
                    }
 
                }
 
            setClock('timer', deadline);

    //MODAL Window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        btnDescription = document.querySelectorAll('.description-btn');


        more.addEventListener('click', popUp);
        // for (let i=0; i < btnDescription.length; i++) {
        //     btnDescription[i].addEventListener('click', popUp);
        // }
        btnDescription.forEach(function(item) {
            item.addEventListener('click', popUp);
        });
        
        function popUp() {                    
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
        }

        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

        // Form
        // Объект для хранения уведомлений
        let message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро свяжемся с вами!',
            failure: 'Что-то пошло не так...'
        };
        // Назначение переменных / создаем элемент div
        let form = document.getElementsByTagName('form'),
            input = document.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
        // добавляем класс status к элементу div
            statusMessage.classList.add('status');

    for (let i = 0; i < form.length; i++) {
        form[i].addEventListener('submit', function(event) { //собятиые - Нажатие кнопки "отправить"
            event.preventDefault();         //Отменяет событие, если оно отменяемое, без остановки дальнейшего распространения этого события.
            form[i].appendChild(statusMessage); // добавляет div в форму

            let request = new XMLHttpRequest(); //API по обмену данными м/у клиентом и сервером
            request.open('POST', 'server.php'); // запрос на отправку данных
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //устанавливает значения HTTP заголовков

            let formData = new FormData(form[i]);   //позволяет вам конструировать наборы пар ключ-значение
            request.send(formData);                 // отправка

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    }


    // Slider photo
    
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);

        // Функция которая будет скрывать лишние фото и показывать одно
        function showSlides(n) {

            if (n > slides.length) {
                slideIndex = 1;
            }

            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach((item) => item.style.display = 'none');
            dots.forEach((item) => item.classList.remove('dot-active'));

            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        prev.addEventListener('click', function() {
            plusSlides(-1);
        });

        next.addEventListener('click', function() {
            plusSlides(1);
        });

        dotsWrap.addEventListener('click', function(event) {
            for(let i = 0; i < dots.length; i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i]) {
                    currentSlide(i+1);
                }
            }
        });

        // Calc

        let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personsSum = 0,
            daySum = 0,
            total = 0;

            totalValue.innerHTML = 0;

            persons.addEventListener('input', function() {
                personsSum = +this.value;
                total = (daySum + personsSum)*4000;

                if(restDays.value == '' || persons.value == ''|| restDays.value == 0 || persons.value == 0) {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }
            });

            restDays.addEventListener('input', function() {
                daySum = +this.value;
                total = (daySum + personsSum)*4000;

                if(persons.value == '' || restDays.value == '' || persons.value == 0 || restDays.value == 0) {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }
            });

            place.addEventListener('change', function() {
                if (restDays.value == '' || persons.value == ''|| restDays.value == 0 || persons.value == 0) {
                    totalValue.innerHTML = 0;
                } else {
                    let a = total;
                    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
                }
            });
});



// FORM with Promise

// let message = {
//     loading: "Загрузка...",
//     sucsess: "Спасибо! Скоро мы с Вами свяжемся!",
//     failure: "Что-то пошло не так..."
// };
 
// let form = document.querySelector('.main-form'),
//     formDown = document.querySelector('#form'),
//     input = form.getElementsByTagName ('input'),
//     statusMessage = document.createElement('div');
     
 
//     statusMessage.classList.add('status');
 
// function sendForm(elem){
 
//     elem.addEventListener('submit', function (event) {
//         event.preventDefault();
//         elem.appendChild(statusMessage);
    
//         let formData = new FormData(elem);
    
//     function postData() {
//         return new Promise(function (resolve, reject) {
//             let request = new XMLHttpRequest();
//             request.open('POST', 'server.php');
//             request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
//             request.onreadystatechange = function () {
//                 if(request.readyState < 4) {
//                     resolve();
//                 } else if (request.readyState === 4) {
//                     if (request.status == 200 && request.status < 300) {
//                         resolve();
//                     } else {
//                         reject();
//                     }
//                 }
//             };
//             request.send(formData); // Вот тут другое название переменной
//         });
//     }
//         function clearInput() {
//         for (let i = 0; i < input.length; i++) {
//             input[i].value = '';
//         }
//     }
//     postData (formData)
//         .then (() => statusMessage.innerHTML = message.loading)
//         .then (() => statusMessage.innerHTML = message.sucsess)
//         .catch (() => statusMessage.innerHTML = message.failure)
//         .then (clearInput);
//     });
// }
// sendForm(form);
// sendForm(formDown);
