$(document).ready(function(){

	// Modal

	$('[data-modal=consultation').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks').fadeOut('slow');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('.modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay').fadeIn('slow');
		});
	});

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				  },
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя",
					minlength: jQuery.validator.format("Необходимо ввести минимум {0} символа!")
				  },
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					  required: "Пожалуйста, введите свою почту",
					  email: "Неправильно введён адрес почты"
				}
			}
		});
	};

	validateForms('#consultation form');
	validateForms('#order form');
	validateForms('#consultation-form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			
			setTimeout(() => {
                $('.overlay, #thanks').fadeOut('slow');
            }, 5000);

			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll and pageup
	$(window).scroll(function() {
		if($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#']").click(function(){
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

});