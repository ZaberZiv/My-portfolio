window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let slideIndex = 1,
    slides = document.querySelectorAll('.slider_item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none'); // Скрываем все слайды
        slides[slideIndex - 1].style.display = 'block';
    }

    function plusSlide(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', function() {
        plusSlide(-1);
    });

    next.addEventListener('click', function() {
        plusSlide(1);
    });

});