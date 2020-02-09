$(document).ready(function(){
 
	var nav = $('.navigation');
 
	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			nav.addClass("fixed_nav");
		} else {
			nav.removeClass("fixed_nav");
		}
	});

	var lan = $('.language');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			lan.addClass("fixed_lang");
		} else {
			lan.removeClass("fixed_lang");
		}
	});

	var lanMob = $('.mobile_language');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 90) {
			lanMob.addClass("fixed_language");
		} else {
			lanMob.removeClass("fixed_language");
		}
	});

	var hamburger = $('.hamburger');

	$(window).scroll(function() {
		if($(this).scrollTop() > 90) {
			hamburger.addClass('fixed_hamburger');
		} else {
			hamburger.removeClass('fixed_hamburger');
		}
	});
});