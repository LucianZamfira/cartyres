$(document).ready(function () {
	// Trick for deselecting the select tag
	$('select')
		.on('click', function () {
			let open_state = $(this).attr('data-open') || false;

			if (!open_state) {
				$(this).attr('data-open', 1);
			} else {
				$(this).removeAttr('data-open');
				$('select').blur();
			}
		})
		.on('blur', function () {
			$(this).removeAttr('data-open');
		});

	/**
	 * Defaults for Owl carousel
	 *
	 * To add or alter some defaults, just set the data-options='{}' attribute for the targeted carousel in your HTML view.
	 *
	 * (!) passing JSON in data- attribute has an important rule: all keys must be double quouted.
	 * If you need to pass double qoutes in some config, such as NavText, you need to pass the HTML encoding entity (eg. &#34;)
	 *
	 * @link https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
	 * @link https://www.w3schools.com/html/html_entities.asp
	 */
	let carouselDefaultConfiguration = {
		dots: false,
		loop: false,
		nav: true,
		navText: ["<i class='icon-arrow-left'></i>", "<i class='icon-arrow-right'></i>"],
		lazyLoad: true,
		items: 1,
	};

	if ($('.owl--carousel')) {
		$('.owl--carousel').each(function () {
			if ($(this).attr('data-options') !== undefined) {
				$(this).owlCarousel($.extend(carouselDefaultConfiguration, $(this).data('options')));
			} else {
				$(this).owlCarousel(carouselDefaultConfiguration);
			}
		});
	}

	// Init Bootstrap modal
	if ($('#searchModal').length) {
		$('#searchModal').modal('show');
	}

	// Init Bootstrap tooltips
	if (window.innerWidth > 767) {
		$('[data-toggle="tooltip"]').tooltip({
			trigger: 'hover',
		});
	}

	// Fix the autohide dropdown
	$('.header-list .dropdown-menu').on('click', function (event) {
		event.stopPropagation();
	});

	// Init custom scroll
	$('.scroll-to').on('click', function (event) {
		event.preventDefault();

		let t = $(this).attr('href').replace(/\#/, '');
		if (t == '') return false;

		// @link https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
		document.getElementById(t).scrollIntoView({
			block: 'nearest',
			behavior: 'smooth',
		});
	});

	$('.scroll-top').on('click', function (event) {
		event.preventDefault();

		// @link https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
		document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
	});

	// Remove cookiebar
	$('#cookiebar__close, #cookiebar__accept').on('click', function (event) {
		event.preventDefault();

		$(this).parents('.cookiebar').removeClass('active');
	});

	// Init toast start
	$('.show-toast').on('click', function (event) {
		event.preventDefault();

		$('#defaultToast').toast('show');
		console.log('myToast: hidden.bs.toast');
	});

	$('#defaultToast').on('hidden.bs.toast', function () {
		console.log('myToast: hidden.bs.toast');
	});
	// Init toast end

	// Sticky menu start
	var headerHeight = $('header').outerHeight();

	// If window resize, recalculate header height
	window.onresize = function () {
		headerHeight = $('header').outerHeight();
	};

	// onScroll callback
	// function onScroll(event) {
	// 	var scroll = window.pageYOffset;

	// 	if (window.innerWidth >= 320) {
	// 		if (scroll < headerHeight) {
	// 			$('body').removeAttr('style');
	// 			$('header').attr('class', 'sticky-no');
	// 		} else {
	// 			$('body').css('padding-top', headerHeight);
	// 			$('header').attr('class', 'sticky-yes');
	// 		}
	// 	}

	// 	if (scroll < 100) {
	// 		$('.scroll-top').removeClass('show');
	// 	} else {
	// 		$('.scroll-top').addClass('show');
	// 	}

	// 	console.log(event, scroll);
	// }

	window.onscroll = function (event) {
		var scroll = window.pageYOffset;

		if (window.innerWidth >= 320) {
			if (scroll < headerHeight) {
				$('body').removeAttr('style');
				$('header').attr('class', 'sticky-no');
			} else {
				$('body').css('padding-top', headerHeight);
				$('header').attr('class', 'sticky-yes');
			}
		}

		if (scroll < 100) {
			$('.scroll-top').removeClass('show');
		} else {
			$('.scroll-top').addClass('show');
		}
	};

	// document.addEventListener('scroll', onScroll);
	// document.addEventListener('touchmove', onScroll);
	// Sticky menu end

	// Cancel search action
	$('.cancel-search').on('click', function (event) {
		event.preventDefault();
		$('body').removeClass('loading');
	});

	// Init burger menu action
	$('.menu-toggle').on('click', function () {
		$('nav').show();
		$('body').toggleClass('menu-show');
	});

	$('.menu-close').on('click', function () {
		$('body').toggleClass('menu-show');
	});

	// Custom classname for safari
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) document.body.className += ' safari';

	// Fix owl accessibility
	if ($('.owl-dot')) {
		$('.owl-dot').each(function (index) {
			$(this).attr('aria-label', 'slid-' + index);
		});
	}

	// Accordion events
	let lightAccordion = document.querySelector('.accordion-light');

	$('.accordion-item').on('click', function () {
		$(this).parent().find('.accordion-item').removeClass('active');
	});

	if (lightAccordion !== null) {
		lightAccordion.addEventListener('shown.bs.collapse', function (event) {
			event.target.parentNode.classList.add('active');
		});
	}

	// Select all functionality
	$('.button--all').on('click', function () {
		if ($(this).hasClass('toggled')) {
			$(this).parents('ul').find('input').prop('checked', false);
		} else {
			$(this).parents('ul').find('input').prop('checked', true);
		}

		$(this).toggleClass('toggled');
	});
});
