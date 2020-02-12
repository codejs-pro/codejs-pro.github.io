$(function() {
	'use strict';

	let $win_width = $(window).outerWidth(); //ширина вікна
	
	
	/* Курсор
	------------------------------------------------------- */
	if ($win_width > 1024) {
		$(document).on('mousemove touchmove',function(e) {
			$('#js-cursor').css({left: e.clientX, top: e.clientY});

			if ($win_width / 2 < e.clientX) {
				$('#js-cursor').addClass('left');
			} else {
				$('#js-cursor').removeClass('left');
			}
		});


		$('.js-green').hover(function(){
			$('#js-cursor').addClass('green');
		},
		function(){
			$('#js-cursor').removeClass('green');
		});
		
		
		$('.js-slider').hover(function(){
			$('#js-cursor').addClass('slider');
		},
		function(){
			$('#js-cursor').removeClass('slider');
		});
	}
	

	
	
	
	
	
	/* Навігація по сторінці
	------------------------------------------------------- */
	$('.js-get-section').on('click', function(){
		
        var $scroll = $($(this).data('section')).offset().top;
        $('html, body').animate({
            scrollTop: $scroll
        }, 500);
		$('#js-mobile-menu').removeClass('open');
		$('#page').removeClass('form-open');
		return false;
    });
	
	
	/* Досягнення учнів
	------------------------------------------------------- */
	$('#js-projects').slick({
		infinite: false,
		dots: true, //показувати точки
		appendDots: $('#js-dots-projects'), //блок де будуть розташовані точки
		//обнуляємо стандартний шаблон точок
		customPaging: function() {
			return '';
		},
		arrows: false,
		slidesToShow: 1, //показувати слайдів
		slidesToScroll: 1, //прокручувати слайдів
		speed: 700 //швидкість анімації зміни слайдів
	});
	
	
	/* Фотогалерея
	------------------------------------------------------- */
	$('#js-gallery').slick({
		infinite: false,
		dots: true, //показувати точки
		appendDots: $('#js-dots-gallery'), //блок де будуть розташовані точки
		//обнуляємо стандартний шаблон точок
		customPaging: function() {
			return '';
		},
		arrows: false,
		slidesToShow: 1, //показувати слайдів
		slidesToScroll: 1, //прокручувати слайдів
		speed: 700 //швидкість анімації зміни слайдів
	});
	
	
	/* Перемикач табів
	------------------------------------------------------- */
	$('.js-switch').on('click', function(){
		let $benefit = $('#js-section4');
		let	$tab = $(this).data('tab');
		
		$benefit.removeClass('class1 class2');
		$benefit.addClass('class'+ $tab);
		
		$('.js-tab').removeClass('active');
		$('#js-tab'+ $tab).addClass('active');
		
		return false;
	});
	
	
	/* Меню на мобільних пристроях
	------------------------------------------------------- */
	$('#js-menu-open').click(function () {
		$('#js-mobile-menu').addClass('open');
		$('#page').addClass('form-open');
		return false;
	});
	
	
	$('#js-menu-close').click(function () {
		$('#js-mobile-menu').removeClass('open');
		$('#page').removeClass('form-open');
		return false;
	});
	
	
	$(function(){
		$(document).on('click touchstart', function(event) {
			if ($('#js-mobile-menu').hasClass('open')) {
				if ($(event.target).closest('#js-mobile-menu').length) { return; }
				$('#js-mobile-menu').removeClass('open');
				$('#page').removeClass('form-open');
				event.stopPropagation();
			}
		});
	});
	
	
	/* Маска номера телефону
	------------------------------------------------------- */
	$('.js-tel').mask('+38 (999) 999-99-99');
	
	
	/* Відправка заявки
	------------------------------------------------------- */
	$('#js-send').click(function () {
		let $tel = $('#js-tel-field').val();
		let $data = {}; //відповідь від сервера
		
		if ($tel === '') {
			popupInfo('Введіть номер телефону', true);
			return false;
		}
		
		$.post('/handlers/ajax_orders.php',
			{
				name: $('#js-name-field').val(),
				tel: $tel,
				city: $('#js-city-field').val()
			}, 
			function(data) { // Обработчик ответа от сервера
				$data = $.parseJSON(data);

				if ($data.name === 'success') {
					resetInput();
					popupInfo('Заявка відправлена');
				} else if ($data.name === 'error') {
					popupInfo($data.error, true);
				} else {
					popupInfo('Возникла ошибка', true);
				}
		});

		return false;
	});
	
	
	/* Анімація при скролі сторінки
	------------------------------------------------------- */
	imgScroll($(document).scrollTop());
	
	$(document).on('scroll', function() {
		imgScroll($(this).scrollTop());
    });
	
	
	let wow = new WOW(
		{
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true,       // act on asynchronously loaded content (default is true)
			scrollContainer: null // optional scroll container selector, otherwise use window
		}
	);
	wow.init();
	
	
});


/* Інформаційне модальне вікно
------------------------------------------------------- */
function popupInfo($text, $error) {
	'use strict';
	
	if ($('.popup-info').length) {
		$('.popup-info').remove();
	}
		
	var $class = 'popup-info',
		
		$icon = '<svg fill="#343434" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M4477.6,5002.9C2307.4,4736.8,599.4,3163.3,172.4,1034.1c-96.5-476.7-96.5-1380.5,0-1854.3c269.1-1336.6,1035.4-2465.5,2178.9-3208.4c488.4-318.8,1070.5-552.8,1719.8-696.1c263.2-55.6,391.9-64.4,933-64.4s669.8,8.8,933,64.4c1365.8,298.3,2462.6,1041.2,3202.6,2178.9c318.8,488.4,552.8,1070.5,696.1,1719.7c55.6,263.2,64.4,391.9,64.4,933c0,690.2-35.1,935.9-222.3,1517.9c-462.1,1450.7-1620.3,2626.4-3076.8,3129.4c-532.3,184.3-880.3,242.8-1494.5,251.5C4816.8,5011.7,4533.1,5008.8,4477.6,5002.9z M5761.5,4099.2c818.9-160.9,1517.9-532.3,2111.6-1123.1c593.7-596.6,959.3-1286.9,1129-2126.3c70.2-359.7,70.2-1126,0-1485.7c-169.6-839.4-535.2-1529.6-1129-2126.3c-596.6-593.7-1286.9-959.3-2126.2-1129c-359.7-70.2-1126-70.2-1485.8,0c-839.4,169.7-1529.6,535.3-2126.3,1129c-593.7,596.6-959.3,1286.9-1129,2126.3c-70.2,359.7-70.2,1126,0,1485.7c169.7,839.4,535.2,1529.6,1129,2126.3c675.6,672.7,1465.3,1052.9,2459.7,1178.7C4799.3,4181.1,5521.7,4146,5761.5,4099.2z"/><path d="M7124.4,2259.5c-117-52.6-137.5-76-1594-1757.8c-696.1-804.3-1278.1-1474-1292.7-1488.7c-14.6-17.6-272,219.4-631.7,576.2c-649.3,643.4-745.8,710.7-944.7,678.5c-277.8-46.8-438.7-374.4-307.1-623c23.4-43.9,400.7-435.8,842.3-874.5c675.6-669.7,818.9-798.4,924.2-830.6c260.3-76.1,219.4-114.1,1936.2,1860.1c854,982.7,1573.5,1822.1,1599.8,1871.8c64.3,119.9,58.5,324.6-11.7,418.2C7510.5,2271.2,7297,2341.4,7124.4,2259.5z"/></g></svg>',
		
		$popupInfo = '';
		
	if ($error) {
		$class = 'popup-info popup-error';
		
		$icon = '<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,923.7C266,923.7,76.4,734,76.4,500C76.4,266,266.1,76.4,500,76.4c234,0,423.6,189.7,423.6,423.6C923.6,734,734,923.7,500,923.7z"/><path d="M451.5,770.2c-13.1-13.1-19.7-29.3-19.7-48.5c0-18.6,6.7-34.5,20.2-47.6c13.4-13.1,29.5-19.7,48.1-19.7s34.6,6.6,48.1,19.7c13.4,13.1,20.1,29,20.1,47.6c0,19.2-6.6,35.3-19.7,48.5c-13.1,13.2-29.3,19.7-48.5,19.7C480.9,789.9,464.7,783.3,451.5,770.2z M444.1,559c0,16.5,5.1,29.9,15.2,40.4c10.1,10.4,23.4,15.6,39.8,15.6c16.5,0,29.9-5.2,40.2-15.6C549.8,589,555,575.5,555,559V265.2c0-16.5-5.2-29.7-15.6-39.9c-10.4-10.1-23.8-15.2-40.2-15.2c-15.9,0-29,5.2-39.4,15.6c-10.4,10.4-15.6,23.6-15.6,39.5V559z"/></svg>';
	}
		
	$popupInfo = $('<div>'+ $icon +'<p>'+ $text +'</p></div>')
	.addClass($class);
	$('#page').prepend($popupInfo);
	$('.popup-info').delay(7000).fadeOut(500);
}


function resetInput() {
	'use strict';
	
	$('.input-field').each(function(){
		$(this).val('');
	});
}


function imgScroll($document_scroll) {
	'use strict';
	
	if ($(window).width() > 1280) {
		let	$offset_top = $('#js-section1').offset().top;
		let	$scroll = $(window).scrollTop();
		let	$new = $scroll - $offset_top + 109;
		let $img_offset = $('#js-img-section2').offset().top;
		let $opacity = ($img_offset - $document_scroll) / 100;
		
		if ($opacity > 1) {
			$opacity = 1;
		}
		
		$('#js-img-section1').css('opacity', $opacity);
		
		if ($new < 0) {
			$new = 0;
		}
		
		if($document_scroll < $img_offset) {
			$('#js-img-section1').css('transform', 'translate(0px, '+ $new +'px)');
		}
		
		
		let	$offset_top2 = $('#js-section6').offset().top;
		let	$scroll2 = $(window).scrollTop();
		let	$new2 = $scroll2 - $offset_top2 + 109;
		let $img_offset2 = $('#js-img-section7').offset().top;
		let $opacity2 = ($img_offset2 - $document_scroll) / 100;
		
		if ($opacity2 > 1) {
			$opacity2 = 1;
		}
		
		$('#js-img-section6').css('opacity', $opacity2);
		
		if ($new2 < 0) {
			$new2 = 0;
		}
		
		if($document_scroll < $img_offset2) {
			$('#js-img-section6').css('transform', 'translate(0px, '+ $new2 +'px)');
		}
	}
}