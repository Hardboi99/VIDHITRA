/*--------------- TABLE OF CONTENTS -------------

01. Preloader Js
02. Positon Sticky Js
03. Data BG Js
04. Header Sticky Js
05. Search Bar Js
06. Hamburger Menu Js
07. Nice Select Js
08. Hero Slider Js
09. Blog Slider Js
10. Marquee Slider Js
11. Brand Slider Js
12. Project Slider Js
13. Service Slider Js
14. Team Slider Js
15. Testimonial Slider Js
16. Rating Js Js
17. Fun Fact Js
18. Project 3 Active Js
19. Circle Proggess Bar Js
20. VenoBox Js
21. Mouse Js
22. Backtotop Js
23. Skill  Progress Bar Js
24. Price box Js
25. Gsap Js

-------------------------------------------------*/

(function ($) {
	"use strict";

	/* ------------- Preloader Js -------------*/

	var wind = $(window);
	wind.on("load", function () {
		$(".preloader").fadeOut(600);
	});

	/* ------------- Data BG Js -------------*/

	$("[data-bg-image]").each(function () {
		var $this = $(this),
			$image = $this.data("bg-image");
		$this.css("background-image", "url(" + $image + ")");
	});
	$("[data-mask]").each(function () {
		var $this = $(this),
			$mask_image = $this.data("mask");
		$this.css("mask-image", "url(" + $mask_image + ")");
	});

/* ------------- Header Sticky Js -------------*/

	var lastScrollTop = "";
	function stickyMenu($targetMenu, $toggleClass) {
		if ($(window).scrollTop() > 500) {
			$targetMenu.addClass($toggleClass);
		} else {
			$targetMenu.removeClass($toggleClass);
		}
	}

	$(window).on("scroll", function () {
		if ($(".tj-header-area").length) {
			stickyMenu($(".header-sticky"), "sticky");
		}
	});

	/* ------------- Search Bar Js -------------*/

	$(".header_search").on("click", function () {
		$(".search_popup").addClass("search-opened");
		$(".search-popup-overlay").addClass("opened");
	});
	$(".search_close_btn").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(".search-popup-overlay").removeClass("opened");
	});
	$(".search-popup-overlay").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(this).removeClass("opened");
	});

	/* ------------- Hamburger Menu  Js -------------*/

	$("#main-menu").meanmenu({
		meanMenuContainer: ".mobile_menu",
		meanScreenWidth: "991",
		meanExpand: ['<i class="tji-angle-down"></i>'],
	});

	$(".menu_btn").on("click", function () {
		$(".hamburger-area").addClass("opened");
		$(".body-overlay").addClass("opened");
	});
	$(".hamburgerCloseBtn").on("click", function () {
		$(".hamburger-area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
	});
	$(".body-overlay").on("click", function () {
		$(".hamburger-area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
	});

	/* ------------- Nice Select  Js -------------*/

	if ($("select").length > 0) {
		$("select").niceSelect();
	}

	/* ------------- Hero Slider  Js -------------*/
	/* === Vidhitra hero slide-nav controller ===
	   Assumes Solvior's Swiper instance for the hero is stored in a variable
	   the theme already exposes (commonly `heroSlider` or similar inside
	   main.js). Replace `window.__vdHeroSwiper` below with the actual
	   Swiper instance reference used in your copy of the theme's JS —
	   check main.js for the swiper init block targeting `.full-slider-active`.
	*/
	(function () {
		var tabs = document.querySelectorAll('.vd-slide-tab');
		var prevBtn = document.querySelector('.vd-slide-nav-arrow.vd-prev');
		var nextBtn = document.querySelector('.vd-slide-nav-arrow.vd-next');
		var AUTOPLAY_MS = 5000; // matches Swiper autoplay delay: 5000 in main.js

		function setActiveTab(index) {
			tabs.forEach(function (tab, i) {
				var fill = tab.querySelector('.vd-tab-progress-fill');
				tab.classList.remove('is-active', 'is-complete');
				fill.classList.remove('is-filling');
				// Force restart of the CSS animation
				fill.style.animation = 'none';
				void fill.offsetWidth;
				fill.style.animation = '';

				if (i < index) {
					tab.classList.add('is-complete');
				} else if (i === index) {
					tab.classList.add('is-active');
					tab.setAttribute('aria-selected', 'true');
					fill.classList.add('is-filling');
				} else {
					tab.setAttribute('aria-selected', 'false');
				}
			});
		}

		function initNav(swiperInstance) {
			// Set initial state
			setActiveTab(swiperInstance.realIndex || 0);

			// Click a tab -> jump straight to that slide
			tabs.forEach(function (tab) {
				tab.addEventListener('click', function () {
					var idx = parseInt(tab.getAttribute('data-slide-index'), 10);
					swiperInstance.slideToLoop ? swiperInstance.slideToLoop(idx) : swiperInstance.slideTo(idx);
				});
			});

			prevBtn.addEventListener('click', function () { swiperInstance.slidePrev(); });
			nextBtn.addEventListener('click', function () { swiperInstance.slideNext(); });

			// Keep tabs in sync whenever the slide changes (autoplay OR manual arrows)
			swiperInstance.on('slideChange', function () {
				setActiveTab(swiperInstance.realIndex);
			});
		}

		// --- Hook into the existing Swiper instance ---
		// If the theme's main.js already stores the hero Swiper on window, use it directly:
		if (window.__vdHeroSwiper) {
			initNav(window.__vdHeroSwiper);
		} else {
			// Fallback: poll briefly in case main.js initializes Swiper after this script runs
			var tries = 0;
			var poll = setInterval(function () {
				tries++;
				if (window.__vdHeroSwiper) {
					clearInterval(poll);
					initNav(window.__vdHeroSwiper);
				} else if (tries > 40) { // ~4 seconds
					clearInterval(poll);
					console.warn('Vidhitra hero nav: Swiper instance not found on window.__vdHeroSwiper — update the reference in vidhitra-hero-nav.js');
				}
			}, 100);
		}
	})();

	if ($(".full-slider-active").length > 0) {
		let full_screen = new Swiper(".full-slider-active", {
			speed: 2000,
			effect: "fade",
			loop: true,
			autoplay: {
				delay: 5000, // kept your original timing — see note below re: CSS var
			},
			navigation: {
				prevEl: ".vd-prev",   // was ".tj-btn-prev" — updated to match new nav markup
				nextEl: ".vd-next",   // was ".tj-btn-next" — updated to match new nav markup
			},
			// Old `pagination` block (fraction counter + .dash-inner progress line) removed —
			// fully replaced by the labeled tab navigation (vidhitra-hero-nav.js), which
			// reads `swiper.realIndex` itself via the `slideChange` event instead.
		});

		// Expose the instance so vidhitra-hero-nav.js can attach to it.
		// (That script polls for window.__vdHeroSwiper, so this line alone is
		// enough to wire everything up — no other changes needed there.)
		window.__vdHeroSwiper = full_screen;
	}

	if ($(".h6-hero-slider").length > 0) {
		let marquee = new Swiper(".h6-hero-slider", {
			slidesPerView: "auto",
			spaceBetween: 30,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 8000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
				},
				1400: {
					spaceBetween: 30,
				},
			},
		});
	}


	/* ------------- Blog Slider  Js -------------*/
	if ($(".blog-standard-slider").length > 0) {
		let blog = new Swiper(".blog-standard-slider", {
			slidesPerView: 1,
			loop: true,
			speed: 1200,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
		});
	}

	/* ------------- Marquee Slider  Js -------------*/
	if ($(".marquee-slider").length > 0) {
		let marquee = new Swiper(".marquee-slider", {
			slidesPerView: "auto",
			spaceBetween: 0,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 4000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}

	if ($(".h6-marquee-slider").length > 0) {
		let marquee = new Swiper(".h6-marquee-slider", {
			slidesPerView: "auto",
			spaceBetween: 20,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 4000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
			},
		});
	}

	if ($(".h9-hero-marquee-slider").length > 0) {
		let marquee = new Swiper(".h9-hero-marquee-slider", {
			slidesPerView: "auto",
			spaceBetween: 0,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 6000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}
	/* ------------- Brand Slider  Js -------------*/
	if ($(".brand-slider-1").length > 0) {
		let brand = new Swiper(".brand-slider-1", {
			slidesPerView: "auto",
			spaceBetween: 30,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 5000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				576: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3.3,
				},
				992: {
					slidesPerView: 4.5,
				},
				1200: {
					slidesPerView: 5.2,
				},
				1400: {
					slidesPerView: 6,
				},
			},
		});
	}
	if ($(".brand-slider-2").length > 0) {
		let brand = new Swiper(".brand-slider-2", {
			slidesPerView: "auto",
			spaceBetween: 30,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 5000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				430: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3.3,
				},
				992: {
					slidesPerView: 4.5,
				},
				1200: {
					slidesPerView: 5.2,
				},
				1400: {
					slidesPerView: 6,
				},
			},
		});
	}

	/* ------------- Project Slider  Js -------------*/
	if ($(".project-slider").length > 0) {
		let project = new Swiper(".project-slider", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			navigation: {
				nextEl: ".project-next",
				prevEl: ".project-prev",
			},
			breakpoints: {
				375: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
			},
		});
	}

	if ($(".h5-case-study-slider").length > 0) {
		let project = new Swiper(".h5-case-study-slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			speed: 1000,
			arrow: false,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},
		});
	}

	if ($(".h7-case-study-slider").length > 0) {
		var swiper = new Swiper(".h7-case-study-slider", {
			slidesPerView: 1,
			loop: true,
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			spaceBetween: -100,
			freemode: true,
			speed: 1000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 800,
				modifier: 1,
				slideShadows: false,
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".tj-project-nav-next",
				prevEl: ".tj-project-nav-prev",
			},
		});
	}
	if ($(".h8-case-study-slider").length > 0) {
		let project = new Swiper(".h8-case-study-slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			speed: 1000,
			arrow: false,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},
		});
	}
	/* ------------- Service Slider  Js -------------*/
	if ($(".tj-service-slider").length > 0) {
		let service = new Swiper(".tj-service-slider", {
			slidesPerView: 3,
			spaceBetween: 24,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".service-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 3,
				},
			},
		});
	}

	if ($(".h6-services-slider").length > 0) {
		let service = new Swiper(".h6-services-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
			},
		});
	}

	if ($(".h9-services-slider").length > 0) {
		let service = new Swiper(".h9-services-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
			},
		});
	}

	/* ------------- Team Slider Js -------------*/
	if ($(".tj-team-slider").length > 0) {
		let team = new Swiper(".tj-team-slider", {
			slidesPerView: 4,
			spaceBetween: 24,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".service-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				460: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 4,
				},
			},
		});
	}

	/* ------------- Testimonial Slider Js -------------*/
	if ($(".team-tab-slider").length > 0) {
		let team = new Swiper(".team-tab-slider", {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: false,
			speed: 1500,
			breakpoints: {
				320: {
					spaceBetween: 15,
					slidesPerView: 2.5,
				},
				576: {
					slidesPerView: 3.5,
				},
				768: {
					slidesPerView: 4.2,
				},
				1024: {
					slidesPerView: 5.5,
				},
				1200: {
					slidesPerView: 6,
				},
			},
		});
	}

	/* ------------- Testimonial Slider Js -------------*/
	if ($(".tj-testimonial-slider").length > 0) {
		let testimonial = new Swiper(".tj-testimonial-slider", {
			slidesPerView: 3,
			spaceBetween: 24,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 2,
				},
			},
		});
	}
	if ($(".tj-testimonial-slider-two").length > 0) {
		let testimonial2 = new Swiper(".tj-testimonial-slider-two", {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
		});
	}
	if ($(".testimonial-slider-two").length > 0) {
		let testimonial = new Swiper(".testimonial-slider-two", {
			slidesPerView: 3,
			spaceBetween: 65,
			centeredSlides: true,
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1.5,
				},
				768: {
					slidesPerView: 1.5,
				},
				992: {
					slidesPerView: 1.5,
				},
				1200: {
					slidesPerView: 1.9,
				},
				1440: {
					slidesPerView: 2.9,
				},
			},
		});
	}
	if ($(".h6-testimonial-slider").length > 0) {
		let testimonial = new Swiper(".h6-testimonial-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1000,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				450: {
					slidesPerView: 1.5,
				},
				576: {
					slidesPerView: 1.5,
				},
				768: {
					slidesPerView: 1.5,
				},
				992: {
					slidesPerView: 2.5,
				},
				1200: {
					slidesPerView: 2.5,
				},
				1400: {
					slidesPerView: 3,
				},
			},
		});
	}
	// Home 8 testimonial
	const testimonialsMarqueeSliders = {};

	function testimonialsMarquee(selector, isReverse = false, speed = 8000) {
		const screenWidth = window.innerWidth;
		const direction = screenWidth >= 768 ? "vertical" : "horizontal";

		// Destroy previous instance if exists
		if (testimonialsMarqueeSliders[selector]) {
			testimonialsMarqueeSliders[selector].destroy(true, true);
		}

		// Init if element exists
		if ($(selector).length > 0) {
			testimonialsMarqueeSliders[selector] = new Swiper(selector, {
				slidesPerView: "auto",
				spaceBetween: 24,
				centeredSlides: true,
				loop: true,
				allowTouchMove: false,
				speed: speed,
				direction: direction,
				autoplay: {
					delay: 0,
					disableOnInteraction: false,
					reverseDirection: isReverse,
				},
				breakpoints: {
					768: {
						spaceBetween: 30,
					},
				},
			});
		}
	}

	// Initialize both sliders
	testimonialsMarquee(".h8-testimonial-slider-up");
	testimonialsMarquee(".h8-testimonial-slider-down", true);

	// Reinitialize on resize
	window.addEventListener("resize", () => {
		testimonialsMarquee(".h8-testimonial-slider-up");
		testimonialsMarquee(".h8-testimonial-slider-down", true);
	});
	// Home 9 testimonial
	if ($(".client-thumb").length > 0) {
		var thumbs = new Swiper(".client-thumb", {
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			speed: 1500,
			// centeredSlides: false,
			freeMode: true,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			breakpoints: {
				0: {
					slidesPerView: 1.4,
					spaceBetween: 10,
				},
				430: {
					slidesPerView: 1.6,
				},
				530: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 2.4,
				},
				992: {
					slidesPerView: 3,
					centeredSlides: true,
				},
			},
		});
	}
	if ($(".h9-testimonial-slider").length > 0) {
		var testimonial = new Swiper(".h9-testimonial-slider", {
			slidesPerView: 1,
			spaceBetween: 28,
			loopedSlides: 3,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper_pagination",
				clickable: true,
			},
		});

		testimonial.controller.control = thumbs;
		thumbs.controller.control = testimonial;
	}
	if ($(".h10-testimonial-slider").length > 0) {
		let testimonial = new Swiper(".h10-testimonial-slider", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			speed: 1000,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	const tabs = document.querySelectorAll(".h6-tab");
	const contents = document.querySelectorAll(".h6-tab-content");

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			tabs.forEach(t => t.classList.remove("active"));
			contents.forEach(c => c.classList.remove("active"));

			tab.classList.add("active");
			const index = tab.getAttribute("data-index");
			document.getElementById("tab-" + index).classList.add("active");
		});
	});

	/* ------------- H5 Process Hover Active -------------*/
	if ($(".h5-process_wrap").length > 0) {
		$(".h5-process_item").on("mouseenter", function () {
			$(this).addClass("active").siblings().removeClass("active");
		});
	}

	/* ------------- Rating Js -------------*/

	if ($(".fill-ratings span").length > 0) {
		var star_rating_width = $(".fill-ratings span").width();
		$(".star-ratings").width(star_rating_width);
	}

	/* ------------- Fun Fact Js -------------*/

	if ($(".odometer").length > 0) {
		$(".odometer").each(function () {
			var $this = $(this);
			$this.appear(
				function () {
					var countNumber = $this.attr("data-count");
					$this.html(countNumber);
				},
				{ accX: 0, accY: 0 },
			); // Optional: Adjust appearance threshold
		});
	}

	/* ------------- Project 3 Active Js -------------*/

	$(".project-style-3").on("mouseenter", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	const headers = document.querySelectorAll(".header");
	headers.forEach(header => {
		header.addEventListener("click", () => {
			const caseItem = header.parentElement;
			const isActive = caseItem.classList.contains("active");

			// Close all sections
			document.querySelectorAll(".case-item").forEach(sec => {
				sec.classList.remove("active");
				sec.querySelector(".icon").classList.remove("active");
			});

			// Toggle current section
			if (!isActive) {
				caseItem.classList.add("active");
				header.querySelector(".icon").classList.add("active");
			}
		});
	});

	/* ------------- Circle Proggess Bar Js -------------*/

	if (typeof $.fn.knob != "undefined") {
		$(".knob").each(function () {
			var $this = $(this),
				knobVal = $this.attr("data-rel");

			$this.knob({
				draw: function () {
					$(this.i).val(this.cv + "%");
				},
			});

			$this.appear(
				function () {
					$({
						value: 0,
					}).animate(
						{
							value: knobVal,
						},
						{
							duration: 2000,
							easing: "swing",
							step: function () {
								$this.val(Math.ceil(this.value)).trigger("change");
							},
						},
					);
				},
				{
					accX: 0,
					accY: -150,
				},
			);
		});
	}

	/* ------------- VenoBox Js -------------*/

	if ($(".ig-gallery").length > 0) {
		new VenoBox({
			selector: ".ig-gallery",
			numeration: true,
			infinigall: true,
			spinner: "pulse",
		});
	}
	if ($(".video-popup").length > 0) {
		new VenoBox({
			selector: ".video-popup",
			numeration: true,
			spinner: "pulse",
		});
	}

	if ($(".tj-quick-product-details").length > 0) {
		const vb = new VenoBox({
			selector: ".tj-quick-product-details",
			numeration: true,
			spinner: "pulse",
			maxWidth: 800,
		});

		$(".tj-quick-product-details").on("click", function () {
			// Wait for VenoBox content to render
			setTimeout(function () {
				// Safely destroy existing swiper
				if (
					window.quickSwiper &&
					typeof window.quickSwiper.destroy === "function"
				) {
					window.quickSwiper.destroy(true, true);
				}

				// Re-initialize Swiper
				if ($(".tj-quick-details-slider").length > 0) {
					window.quickSwiper = new Swiper(".tj-quick-details-slider", {
						slidesPerView: 1,
						loop: true,
						speed: 1200,
						autoplay: {
							delay: 5000,
						},
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
						},
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
					});
					tjQuantityController();
				}
			}, 300);
		});
	}

	/* ------------- Mouse Js -------------*/

	$(".slider-drag").on("mouseenter", function () {
		$(".mouseCursor").addClass("cursor-big");
	});
	$(".slider-drag").on("mouseleave", function () {
		$(".mouseCursor").removeClass("cursor-big");
	});

	$("a,.sub-menu").on("mouseenter", function () {
		$(".mouseCursor,.tj-cursor").addClass("d-none");
	});
	$("a,.sub-menu").on("mouseleave", function () {
		$(".mouseCursor,.tj-cursor").removeClass("d-none");
	});

	$(".project-slider-one").on("mouseenter", function () {
		$(".mouseCursor").addClass("d-none");
	});
	$(".project-slider-one").on("mouseleave", function () {
		$(".mouseCursor").removeClass("d-none");
	});

	$(".view-project").on("mouseenter", function () {
		$(".mouseCursor").addClass("project-cursor");
	});
	$(".view-project").on("mouseleave", function () {
		$(".mouseCursor").removeClass("project-cursor");
	});

	function itCursor() {
		var myCursor = jQuery(".mouseCursor");
		if (myCursor.length) {
			if ($("body")) {
				const e = document.querySelector(".cursor-inner"),
					t = document.querySelector(".cursor-outer");
				let n,
					i = 0,
					o = !1;
				((window.onmousemove = function (s) {
					(o ||
						(t.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(e.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(n = s.clientY),
						(i = s.clientX));
				}),
					$("body").on("mouseenter", "button, a, .cursor-pointer", function () {
						(e.classList.add("cursor-hover"), t.classList.add("cursor-hover"));
					}),
					$("body").on("mouseleave", "button, a, .cursor-pointer", function () {
						($(this).is("a", "button") &&
							$(this).closest(".cursor-pointer").length) ||
							(e.classList.remove("cursor-hover"),
								t.classList.remove("cursor-hover"));
					}),
					(e.style.visibility = "visible"),
					(t.style.visibility = "visible"));
			}
		}
	}
	itCursor();

	/* ------------- Backtotop Js -------------*/

	function back_to_top() {
		var btn = $("#back_to_top");
		var btn_wrapper = $(".back-to-top-wrapper");
		$(window).on("scroll", function () {
			if ($(window).scrollTop() > 300) {
				btn_wrapper.addClass("back-to-top-btn-show");
			} else {
				btn_wrapper.removeClass("back-to-top-btn-show");
			}
		});
		btn.on("click", function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, "300");
		});
	}
	back_to_top();

	/* ------------- Price box Js -------------*/

	let year = $(".yearly");
	let month = $(".monthly");

	let price = $(".price-number");
	let period = $(".period");

	year.on("click", function () {
		$(this).addClass("active");
		month.removeClass("active");
		price.each(function () {
			$(this).text($(this).data("year-price"));
		});
		period.each(function () {
			$(this).text($(this).data("year-period"));
		});
	});
	month.on("click", function () {
		$(this).addClass("active");
		year.removeClass("active");
		price.each(function () {
			$(this).text($(this).data("month-price"));
		});
		period.each(function () {
			$(this).text($(this).data("month-period"));
		});
	});

	// service 5 tabs
	$(".h5-service-content").on("mouseover", function () {
		$(this)
			.parent(".service-style-5")
			.addClass("active")
			.siblings()
			.removeClass("active");
	});
	// blog 8 js
	$(".h8-blog-item .blog-images").on("mouseover", function () {
		$(this)
			.parent(".h8-blog-item")
			.addClass("active")
			.siblings()
			.removeClass("active");
	});
	// testimonial tabs
	$(".h7-testimonial .testimonial-content").on("click", function () {
		$(this)
			.parent(".h7-testimonial-single")
			.addClass("active")
			.siblings()
			.removeClass("active");
	});
	// portfolio tabs
	$(".h9-case-study .h9-case-study-item").on("mouseover", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
	// Team 10 tabs
	$(".h10-team-item").on("mouseover", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	$(window).on("load", function () {
		/*------------------------------------------------------
	/  WoW Js
	/------------------------------------------------------*/
		var wow = new WOW({
			boxClass: "wow", // default
			animateClass: "animated", // default
			offset: 80, // default
			callback: function (box) {
				// Ensure visibility when animation starts
				$(box).css("visibility", "visible");
				$(box).css("opacity", "1");
			},
		});
		wow.init();
	});

	// process hover effect
	const processContainer = document.querySelector("#tj-process");
	if (processContainer) {
		const processItems = processContainer?.querySelectorAll(".process-item");
		const processLineActive = processContainer?.querySelector(
			".process-line-active",
		);

		// add active class to item
		if (processItems?.length) {
			const totalPortion = 100 / processItems?.length;
			processLineActive.style.left = "0";
			processLineActive.style.top = "0";
			processItems.forEach((item, idx) => {
				item.addEventListener("mouseenter", function () {
					processItems.forEach(item2 => {
						item2.classList.remove("active");
					});
					processLineActive.style.top = `${totalPortion * idx}%`;
					this.classList.add("active");
				});
			});
		}
	}

	const processContainer2 = document.querySelector("#tj-process-2");
	if (processContainer2) {
		const processItems = processContainer2?.querySelectorAll(".process-item");
		const processLineActive = processContainer2?.querySelector(
			".process-line-active",
		);

		// add active class to item
		if (processItems?.length) {
			const totalPortion = 100 / processItems?.length;
			processLineActive.style.left = "0";
			processLineActive.style.top = "0";
			processItems.forEach((item, idx) => {
				item.addEventListener("mouseenter", function () {
					processItems.forEach(item2 => {
						item2.classList.remove("active");
					});
					processLineActive.style.left = `${totalPortion * idx}%`;
					this.classList.add("active");
				});
			});
		}
	}

	// header top toggler
	if ($(".header-topbar-toggler").length > 0) {
		const headerTop = document.querySelector(".header-topbar");
		const headerTopToggler = headerTop.querySelector(".header-topbar-toggler");

		if (headerTop) {
			console.log(headerTop.offsetHeight);
			headerTop.style.height = `${headerTop.offsetHeight}px`;
			headerTop.style.padding = `0px`;

			headerTopToggler.addEventListener("click", function () {
				headerTop.style.height = `0px`;
			});
		}
	}

	// h10 chart

	const ctx = document.querySelectorAll(".tj-pie-chart");

	if (ctx.length > 0) {
		ctx.forEach(ctxSingle => {
			const data = {
				datasets: [
					{
						label: "47",
						data: [20, 12, 15],
						backgroundColor: [
							"rgba(247, 247, 247, 0.2)",
							"rgba(247, 247, 247, 0.5)",
							"rgba(0, 117, 255, 1)",
						],
						borderWidth: 0,
						spacing: 4,
						hoverOffset: 0,
					},
				],
			};

			const options = {
				cutout: "60%",
			};

			const config = {
				type: "doughnut",
				data: data,
				options: options,
			};

			new Chart(ctxSingle, config);
		});
	}

	// Quantity increase/decrease
	// increase quantity
	function tjQuantityController() {
		jQuery(".tj-cart-plus").on("click", function () {
			var original_p = jQuery(this).siblings(".tj-cart-input");
			var p_value = parseInt(original_p.val());
			if (p_value > 0) {
				p_value = p_value + 1;
			} else if (!p_value) {
				p_value = 1;
			}
			var formattedNumber = ("" + p_value).slice(-2);
			original_p.val(formattedNumber);
		});

		// decrease quantity
		jQuery(".tj-cart-minus").on("click", function () {
			var original_p = jQuery(this).siblings(".tj-cart-input");
			var p_value = parseInt(original_p.val());
			if (p_value > 1) {
				p_value = p_value - 1;
			} else if (!p_value) {
				p_value = 1;
			}
			var formattedNumber = ("" + p_value).slice(-2);
			original_p.val(formattedNumber);
		});
	}
	tjQuantityController();
	/* ------------- Gsap Js -------------*/

	gsap.registerPlugin(ScrollTrigger, TweenMax, ScrollToPlugin);

	gsap.config({
		nullTargetWarn: false,
	});

	/* ------------- Process scroll animation -------------*/

	/* ------------- Positon Sticky Js -------------*/

	let tjStickyTrigger = null;
	function initStickySidebar() {
		if (window.innerWidth >= 992) {
			if (tjStickyTrigger) {
				tjStickyTrigger.kill();
				tjStickyTrigger = null;
			}
			const startPoint = window.innerWidth >= 992 ? 100 : 120;
			tjStickyTrigger = ScrollTrigger.create({
				trigger: ".tj-sticky",
				start: `top ${startPoint}`,
				end: `bottom ${startPoint}`,
				pin: true,
				scrub: 1,
			});
		}
	}
	initStickySidebar();
	window.addEventListener("resize", () => {
		initStickySidebar();
	});

	/* ------------- Skill  Progress Bar Js -------------*/

	const progressBarController = () => {
		const progressContainers = document.querySelectorAll(".tj-progress");
		if (progressContainers?.length) {
			progressContainers.forEach(progressContainer => {
				const targetedProgressBar =
					progressContainer.querySelector(".tj-progress__bar");
				const completedPercent =
					parseInt(targetedProgressBar.getAttribute("data-perchant"), 10) || 0;

				gsap.to(targetedProgressBar, {
					width: `${completedPercent}%`,
					ease: "power2.out",
					duration: 1,
					scrollTrigger: {
						trigger: progressContainer,
						start: "top 90%",
						end: "top 30%",
					},
					onUpdate: function () {
						let progressValue = Math.round(this.progress() * 100);
						let displayPercent = Math.round(
							(completedPercent * progressValue) / 100,
						);

						const percentageText = progressContainer.querySelector(
							".tj-progress__perchant",
						);
						if (percentageText) {
							percentageText.textContent = displayPercent + "%";
						}
					},
				});
			});
		}
	};
	progressBarController();

	// const lenis = new Lenis();
	// lenis.on("scroll", ScrollTrigger.update);
	// gsap.ticker.add(time => {
	// 	lenis.raf(time * 1000);
	// });
	// gsap.ticker.lagSmoothing(0);

	/* Text Effect Animation */
	if ($(".text-anim").length) {
		let staggerAmount = 0.03,
			translateXValue = 20,
			delayValue = 0.1,
			easeType = "power2.out",
			animatedTextElements = document.querySelectorAll(".text-anim");

		animatedTextElements.forEach(element => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.chars, {
				duration: 1,
				delay: delayValue,
				x: translateXValue,
				autoAlpha: 0,
				stagger: staggerAmount,
				ease: easeType,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	/* Text Effect Animation */
	if ($(".hero-text-anim").length) {
		let staggerAmount = 0.05,
			delayValue = 0.4,
			easeType = "power1.out",
			heroTextElements = document.querySelectorAll(".hero-text-anim");

		heroTextElements.forEach(element => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.chars, {
				opacity: 0,
				duration: 0.4,
				delay: delayValue,
				ease: easeType,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	/* Service js */
	let device_width = window.innerWidth;
	const serviceStack = gsap.utils.toArray(".service-stack");
	if (serviceStack.length > 0) {
		if (device_width > 991) {
			serviceStack.forEach(item => {
				gsap.to(item, {
					opacity: 0,
					scale: 0.9,
					y: 50,
					scrollTrigger: {
						trigger: item,
						scrub: true,
						start: "top top",
						pin: true,
						pinSpacing: false,
						markers: false,
					},
				});
			});
		}
	}
	/* === Vidhitra Approach — scroll-stack pin behavior ===
	   Renamed from ".project-stack" to ".approach-stack" to match the
	   new section (this isn't a portfolio anymore, so the class name
	   should reflect what it actually is).

	   Each card pins at "top top" — when its top edge hits the top of
	   the viewport — and stays pinned while the next card scrolls over it.
	   pinSpacing: false prevents extra whitespace gaps between cards. */
	const approachStack = gsap.utils.toArray(".approach-stack");
	if (approachStack.length > 0) {
		if (device_width > 991) {
			approachStack.forEach(item => {
				gsap.to(item, {
					opacity: 0,
					scale: 0.94,
					y: 40,
					scrollTrigger: {
						trigger: item,
						scrub: true,
						start: "top top",
						pin: true,
						pinSpacing: false,
						markers: false,
					},
				});
			});
		}
	}

	/* ==========================================
	   Vidhitra Approach — Premium 3D Scroll Reveal
	========================================== */
	/* =========================================================
	   VIDHITRA APPROACH — CINEMATIC 3D SCROLL ANIMATION
	   ========================================================= */

	(function () {

		let approachItems = [];
		let ticking = false;

		function clamp(value, min, max) {
			return Math.max(min, Math.min(max, value));
		}

		function easeOutCubic(t) {
			return 1 - Math.pow(1 - t, 3);
		}

		function updateApproach() {

			ticking = false;

			const vh = window.innerHeight;
			const isMobile = window.innerWidth < 768;

			approachItems.forEach((item, index) => {

				const rect = item.el.getBoundingClientRect();

				/*
				 * Animation starts when the card is near the bottom
				 * and finishes when it reaches the center of the screen.
				 */
				const start = vh * 0.92;
				const end = vh * 0.42;

				let progress = (start - rect.top) / (start - end);

				progress = clamp(progress, 0, 1);

				const eased = easeOutCubic(progress);

				/* --------------------------------------------
				   NUMBER — comes from behind the screen
				   -------------------------------------------- */

				const startDepth = isMobile ? -420 : -1500;

				const depth = startDepth * (1 - eased);

				const startScale = isMobile ? 0.68 : 0.20;

				const scale =
					startScale +
					((1 - startScale) * eased);

				const direction =
					index % 2 === 0 ? -1 : 1;

				const startX = isMobile ? 25 : 100;

				const x =
					startX *
					direction *
					(1 - eased);

				const startY = isMobile ? 25 : 70;

				const y =
					startY *
					(1 - eased);

				const rotateX =
					28 *
					(1 - eased);

				const rotateY =
					32 *
					direction *
					(1 - eased);

				const rotateZ =
					5 *
					direction *
					(1 - eased);

				const numberOpacity =
					clamp(progress * 1.25, 0, 1);

				item.number.style.transform =
					`perspective(1600px)
                 translate3d(${x}px, ${y}px, ${depth}px)
                 scale(${scale})
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 rotateZ(${rotateZ}deg)`;

				item.number.style.opacity =
					numberOpacity;

				/* --------------------------------------------
				   TITLE
				   -------------------------------------------- */

				let titleProgress =
					clamp(
						(progress - 0.18) / 0.42,
						0,
						1
					);

				const titleEase =
					easeOutCubic(titleProgress);

				item.title.style.opacity =
					titleProgress;

				item.title.style.transform =
					`translate3d(
                    0,
                    ${30 * (1 - titleEase)}px,
                    0
                )`;

				/* --------------------------------------------
				   DESCRIPTION
				   -------------------------------------------- */

				let descProgress =
					clamp(
						(progress - 0.34) / 0.42,
						0,
						1
					);

				const descEase =
					easeOutCubic(descProgress);

				item.desc.style.opacity =
					descProgress;

				item.desc.style.transform =
					`translate3d(
                    0,
                    ${35 * (1 - descEase)}px,
                    0
                )`;

				/* --------------------------------------------
				   ACTIVE / INACTIVE STATE
				   -------------------------------------------- */

				const distanceFromCenter =
					Math.abs(
						rect.top -
						(vh * 0.42)
					);

				const active =
					progress > 0.25 &&
					progress < 1 &&
					distanceFromCenter < vh * 0.28;

				item.el.classList.toggle(
					"is-approach-active",
					active
				);

				/* Previous cards become slightly quieter */
				if (rect.bottom < vh * 0.30) {

					item.number.style.opacity = "0.22";

					item.title.style.opacity =
						Math.min(
							parseFloat(item.title.style.opacity || 0),
							0.35
						);
				}

			});
		}

		function requestUpdate() {

			if (!ticking) {

				requestAnimationFrame(
					updateApproach
				);

				ticking = true;
			}
		}





	})();

document.addEventListener('DOMContentLoaded', function () {
	const items = document.querySelectorAll('.tj-approach-item');
	if (!items.length) return;

	document.body.classList.add('js-ready');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('in-view');
			observer.unobserve(entry.target);

			const numberEl = entry.target.querySelector('.tj-approach-number');
			if (numberEl) {
			numberEl.addEventListener('animationend', function handler() {
				numberEl.style.animation = 'none';
				numberEl.style.transform = 'translateZ(0) rotateY(0deg)';
				numberEl.removeEventListener('animationend', handler);
			});
			}
		}
		});
	}, {
		threshold: 0.2,
		rootMargin: '0px 0px -30px 0px'
	});

	items.forEach((item) => observer.observe(item));
	});
	
	document.addEventListener('DOMContentLoaded', function () {
		var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var el = document.querySelector('.counter-val');
		if (!el) return;
		var target = parseInt(el.getAttribute('data-target'), 10);
		if (reduced) { el.textContent = target + '+'; return; }
		var start = null;
		var duration = 900;
		function step(ts) {
			if (!start) start = ts;
			var progress = Math.min((ts - start) / duration, 1);
			var eased = 1 - Math.pow(1 - progress, 3);
			el.textContent = Math.round(eased * target) + '+';
			if (progress < 1) requestAnimationFrame(step);
		}
		setTimeout(function () { requestAnimationFrame(step); }, 550);
	});

	/* Marque js */
	gsap.to(".marquee-slider-wrapper-two", {
		scrollTrigger: {
			trigger: ".tj-project-section-two",
			start: "top center-=200",
			pin: ".marquee-slider-wrapper-two",
			end: "bottom bottom-=200",
			markers: false,
			pinSpacing: false,
			scrub: 1,
		},
	});

	// right swipe
	document.querySelectorAll(".rightSwipeWrap").forEach((wrap, i) => {
		gsap.set(wrap.querySelectorAll(".right-swipe"), {
			transformPerspective: 1200,
			x: "10rem",
			rotateY: -20,
			opacity: 0,
			transformOrigin: "right center",
		});
		gsap.to(wrap.querySelectorAll(".right-swipe"), {
			transformPerspective: 1200,
			x: 0,
			rotateY: 0,
			opacity: 1,
			delay: 0.3,
			ease: "power3.out",
			scrollTrigger: {
				trigger: wrap,
				start: "top 80%",
				id: "rightSwipeWrap-" + i,
				toggleActions: "play none none none",
				// markers: true,
			},
		});
	});

	// left swipe
	document.querySelectorAll(".leftSwipeWrap").forEach((wrap, i) => {
		gsap.set(wrap.querySelectorAll(".left-swipe"), {
			transformPerspective: 1200,
			x: "-10rem",
			rotateY: 20,
			opacity: 0,
			transformOrigin: "left center",
		});
		gsap.to(wrap.querySelectorAll(".left-swipe"), {
			transformPerspective: 1200,
			x: 0,
			rotateY: 0,
			opacity: 1,
			delay: 0.3,
			ease: "power3.out",
			scrollTrigger: {
				trigger: wrap,
				start: "top 80%",
				id: "leftSwipeWrap-" + i,
				toggleActions: "play none none none",
				// markers: true,
			},
		});
	});

	// border radius animation
	gsap.set(".tj-about-section", {
		"--br-bottom-left": "0px",
	});
	gsap.to(".tj-about-section", {
		"--br-bottom-left": "410px",
		ease: "power3.out", // extra smoothness on top of scrub
		scrollTrigger: {
			trigger: ".tj-about-section",
			start: "bottom 120%",
			end: "bottom 50%", // longer scroll for slower animation
			scrub: 0.8, // smooth scrub with inertia feel
			// markers: true,
		},
	});

	// Parallax GSAP
	ScrollTrigger.matchMedia({
		"(min-width: 768px)": function () {
			document.querySelectorAll(".tjParallaxSection").forEach((section, i) => {
				const image = section.querySelector(".tjParallaxImage");
				if (image) {
					gsap.to(image, {
						y: "-25%",
						ease: "none",
						scrollTrigger: {
							trigger: section,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
							// id: "parallax-" + i, // optional for debugging
							// markers: true,
						},
					});
				}
			});
		},
	});

	// itemScrollAnimation
	const teamItems = document.querySelectorAll(".itemScrollAnimate");
	teamItems.forEach((item, index) => {
		const isEven = index % 2 === 0;

		gsap.fromTo(
			item,
			{
				transform: isEven
					? "perspective(1000px) rotateX(50deg)"
					: "perspective(1000px) rotateX(-50deg)",
			},
			{
				transform: isEven
					? "perspective(1000px) rotateX(0deg)"
					: "perspective(1000px) rotateX(0deg)",
				duration: 2,
				ease: "power3.out",
				scrollTrigger: {
					id: `teamItemTrigger-${index}`,
					trigger: item,
					start: "top 100%",
					end: "top 40%",
					scrub: true,
					// markers: true,
				},
			},
		);
	});

	// project drag js
	const $cursor = $(".tj-cursor");
	const $container = $(".project-slider-one");

	if ($container.length > 0) {
		// Center the cursor
		gsap.set($cursor, { xPercent: -50, yPercent: -50 });

		// Track pointer movement
		$(document).on("pointermove", function (e) {
			gsap.to($cursor, {
				duration: 0,
				x: e.clientX,
				y: e.clientY,
			});
		});

		// Show cursor on enter
		$container.on("mouseenter", function () {
			$cursor.css({
				opacity: 1,
				visibility: "visible",
			});
		});

		// Hide cursor on leave
		$container.on("mouseleave", function () {
			$cursor.css({
				opacity: 0,
				visibility: "hidden",
			});
		});
	}

	// Text Invert
	if ($(".tj-text-invert").length) {
		const split = new SplitText(".tj-text-invert", { type: "lines" });
		split.lines.forEach(target => {
			gsap.to(target, {
				backgroundPositionX: 0,
				ease: "none",
				scrollTrigger: {
					trigger: target,
					scrub: 1,
					start: "top 85%",
					end: "bottom center",
				},
			});
		});
	}

	document.querySelectorAll(".svg-animate").forEach(box => {
		// Check if the element has the class .svg-animate
		if (box.classList.contains("svg-animate")) {
			const paths = box.querySelectorAll("path");

			paths.forEach(path => {
				const length = path.getTotalLength();

				// Set initial state
				gsap.set(path, {
					strokeDasharray: length,
					strokeDashoffset: length,
					visibility: "visible",
					opacity: 1,
				});

				// Animate on scroll
				gsap.to(path, {
					strokeDashoffset: 0,
					duration: 1.5,
					ease: "power2.out",
					scrollTrigger: {
						trigger: box,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				});
			});
		}
	});

	// hero banner parallax
	ScrollTrigger.matchMedia({
		"(min-width: 992px)": function () {
			const hero = document.querySelector(".heroStack .tj-hero-section");
			const overlay = document.querySelector(".heroStack .stackOverlay");

			if (hero) {
				// Parallax move of the whole hero section
				gsap.to(hero, {
					y: "30%",
					opacity: 0,
					ease: "none",
					scrollTrigger: {
						trigger: hero,
						start: "top top",
						end: "bottom top",
						scrub: true,
						// markers: true,
					},
				});

				// Fade-in overlay opacity
				// if (overlay) {
				// 	gsap.fromTo(
				// 		overlay,
				// 		{ opacity: 0 },
				// 		{
				// 			y: "30%",
				// 			opacity: 1,
				// 			ease: "none",
				// 			scrollTrigger: {
				// 				trigger: hero,
				// 				start: "top top",
				// 				end: "bottom top",
				// 				scrub: true,
				// 				// markers: true,
				// 			},
				// 		}
				// 	);
				// }
			}
		},
	});




	/* ---------------------------------------------------------
			32. Price Slider
	--------------------------------------------------------- */
	if ($("#slider-range").length) {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 600,
			values: [20, 320],
			slide: function (event, ui) {
				$("#price-from").text(ui.values[0]);
				$("#price-to").text(ui.values[1]);
			},
		});

		// Set initial values

		$("#price-from").text($("#slider-range").slider("values", 0));
		$("#price-to").text($("#slider-range").slider("values", 1));
	}

	/*---------------------------------------------------------
	 Form Submission
	---------------------------------------------------------*/
	if ($("#contact-form").length > 0) {
		$("#contact-form").validate({
			rules: {
				cfName: "required",
				cfEmail: {
					required: true,
					email: true,
				},
				cfPhone: "required",
			},

			messages: {
				cfName: "Enter your full name.",
				cfEmail: "Enter a valid email.",
				cfPhone: "Enter your phone number.",
			},
			submitHandler: function (form) {
				// start ajax request
				$.ajax({
					type: "POST",
					url: "assets/mail/contact-form.php",
					data: $("#contact-form").serialize(),
					cache: false,
					success: function (data) {
						if (data == "Y") {
							$("#message_sent").modal("show");
							$("#contact-form").trigger("reset");
						} else {
							$("#message_fail").modal("show");
						}
					},
				});
			},
		});
	}

	/*---------------------------------------------------------
	 copyright year
	---------------------------------------------------------*/
	const yearEl = document.querySelector(".copyright-text span");

	if (yearEl) {
		const currentYear = new Date().getFullYear();
		const spanYear = parseInt(yearEl.textContent, 10);

		if (spanYear < currentYear) {
			yearEl.textContent = currentYear;
		}
	}
})(jQuery);



/* ============================================
   Vidhitra About Visual Animation
============================================ */

(function () {

	if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
		return;
	}

	gsap.registerPlugin(ScrollTrigger);

	const visual = document.querySelector(".vd-about-visual");

	if (!visual) return;

	const image = visual.querySelector(".vd-about-image");
	const panel = visual.querySelector(".vd-about-panel");
	const frame = visual.querySelector(".vd-about-frame");
	const badge = visual.querySelector(".vd-about-badge");
	const dot = visual.querySelector(".vd-about-dot");

	gsap.set(visual, {
		opacity: 0,
		x: 60
	});

	gsap.set(image, {
		y: 35,
		scale: .94,
		opacity: 0
	});

	gsap.set(panel, {
		x: 35,
		y: 25,
		opacity: 0
	});

	gsap.set(frame, {
		opacity: 0,
		scale: .92
	});

	gsap.set(badge, {
		x: -30,
		y: 30,
		opacity: 0
	});

	gsap.set(dot, {
		scale: 0,
		opacity: 0
	});

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: visual,
			start: "top 80%",
			toggleActions: "play none none none"
		}
	});

	tl.to(visual, {
		opacity: 1,
		x: 0,
		duration: .9,
		ease: "power3.out"
	});

	tl.to(image, {
		y: 0,
		scale: 1,
		opacity: 1,
		duration: 1.2,
		ease: "power3.out"
	}, "-=.65");

	tl.to(panel, {
		x: 0,
		y: 0,
		opacity: 1,
		duration: .9,
		ease: "power3.out"
	}, "-=.9");

	tl.to(frame, {
		opacity: 1,
		scale: 1,
		duration: .8,
		ease: "power2.out"
	}, "-=.7");

	tl.to(badge, {
		x: 0,
		y: 0,
		opacity: 1,
		duration: .8,
		ease: "back.out(1.5)"
	}, "-=.45");

	tl.to(dot, {
		scale: 1,
		opacity: 1,
		duration: .5,
		ease: "back.out(2)"
	}, "-=.35");


	/* subtle parallax */

	gsap.to(image, {
		y: -20,
		ease: "none",
		scrollTrigger: {
			trigger: visual,
			start: "top bottom",
			end: "bottom top",
			scrub: 1
		}
	});

})();


/* ==========================================
   Vidhitra About - Mouse Depth Interaction
========================================== */

(function () {
	const visual = document.querySelector(".vd-about-visual");

	if (!visual || typeof gsap === "undefined") return;

	const image = visual.querySelector(".vd-parallax-layer");
	const panel = visual.querySelector(".vd-parallax-panel");
	const badge = visual.querySelector(".vd-parallax-badge");
	const frame = visual.querySelector(".vd-about-frame");

	(function () {
		const visual = document.querySelector(".vd-about-visual");
		if (!visual) return;

		visual.addEventListener("mousemove", function (e) {
			const rect = visual.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width - 0.5;
			const y = (e.clientY - rect.top) / rect.height - 0.5;

			gsap.to(".vd-about-dot", {
				x: x * -18,
				y: y * -18,
				duration: 1,
				ease: "power3.out"
			});
		});

		gsap.to(".vd-about-image", {
			y: -25,
			ease: "none",
			scrollTrigger: {
				trigger: ".vd-about-visual",
				start: "top bottom",
				end: "bottom top",
				scrub: 1.2
			}
		});
	})();

	visual.addEventListener("mouseleave", function () {

		gsap.to(
			[image, panel, badge, frame],
			{
				x: 0,
				y: 0,
				duration: 1.2,
				ease: "elastic.out(1, 0.65)",
				overwrite: true
			}
		);

	});

})();

gsap.fromTo(
	".vd-about-image",
	{
		clipPath: "inset(0 0 100% 0)",
		scale: 1.08,
		opacity: 0
	},
	{
		clipPath: "inset(0 0 0% 0)",
		scale: 1,
		opacity: 1,
		duration: 1.4,
		ease: "power4.out",
		scrollTrigger: {
			trigger: ".vd-about-visual",
			start: "top 80%",
			toggleActions: "play none none none"
		}
	}
);


gsap.fromTo(
	".vd-about-badge",
	{
		x: -45,
		y: 45,
		opacity: 0
	},
	{
		x: 0,
		y: 0,
		opacity: 1,
		duration: 1,
		delay: 0.65,
		ease: "back.out(1.5)",
		scrollTrigger: {
			trigger: ".vd-about-visual",
			start: "top 80%",
			toggleActions: "play none none none"
		}
	}
);


gsap.to(".vd-about-badge", {
	y: -7,
	duration: 2.8,
	repeat: -1,
	yoyo: true,
	ease: "sine.inOut"
});


gsap.to(".vd-about-frame", {
	clipPath: "inset(0 0% 0 0)",
	duration: 1.2,
	delay: 0.35,
	ease: "power2.out",
	scrollTrigger: {
		trigger: ".vd-about-visual",
		start: "top 80%",
		toggleActions: "play none none none"
	}
});

(function () {
	const visual = document.querySelector(".vd-about-visual");
	if (!visual) return;

	visual.addEventListener("mousemove", function (e) {
		const rect = visual.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;

		gsap.to(".vd-about-dot", {
			x: x * -18,
			y: y * -18,
			duration: 1,
			ease: "power3.out"
		});
	});

	gsap.to(".vd-about-image", {
		y: -25,
		ease: "none",
		scrollTrigger: {
			trigger: ".vd-about-visual",
			start: "top bottom",
			end: "bottom top",
			scrub: 1.2
		}
	});
})();

/* =========================================================
   VIDHITRA CAPABILITIES SECTION — SEARCH & INTERACTION
   ========================================================= */
// function initVidhitraCapabilitiesExplorer() {
// 	const searchInput = document.getElementById('vdCapabilitySearchInput');
// 	const searchClear = document.getElementById('vdCapabilitySearchClear');
// 	const countDisplay = document.getElementById('vdCapabilityCount');
// 	const items = document.querySelectorAll('.vd-capability-item');
// 	const noResults = document.getElementById('vdCapabilitiesNoResults');
// 	const resetBtn = document.getElementById('vdResetSearchBtn');

// 	if (!items.length) return;

// 	const totalCount = items.length;

// 	function filterCapabilities(query) {
// 		const q = query.trim().toLowerCase();
// 		let visibleCount = 0;

// 		items.forEach(item => {
// 			const title = (item.getAttribute('data-title') || '').toLowerCase();
// 			const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
// 			const descText = (item.querySelector('.desc') ? item.querySelector('.desc').textContent : '').toLowerCase();

// 			if (!q || title.includes(q) || keywords.includes(q) || descText.includes(q)) {
// 				item.classList.remove('is-hidden');
// 				visibleCount++;
// 			} else {
// 				item.classList.add('is-hidden');
// 			}
// 		});

// 		// Update count text
// 		if (countDisplay) {
// 			if (!q) {
// 				countDisplay.textContent = `${totalCount} capabilities`;
// 			} else {
// 				countDisplay.textContent = `${visibleCount} of ${totalCount} matched`;
// 			}
// 		}

// 		// Toggle clear button
// 		if (searchClear) {
// 			searchClear.style.display = q.length > 0 ? 'flex' : 'none';
// 		}

// 		// Toggle no results box
// 		if (noResults) {
// 			noResults.style.display = visibleCount === 0 ? 'block' : 'none';
// 		}
// 	}

// 	if (searchInput) {
// 		searchInput.addEventListener('input', function () {
// 			filterCapabilities(this.value);
// 		});
// 	}

// 	if (searchClear) {
// 		searchClear.addEventListener('click', function () {
// 			if (searchInput) {
// 				searchInput.value = '';
// 				searchInput.focus();
// 			}
// 			filterCapabilities('');
// 		});
// 	}

// 	if (resetBtn) {
// 		resetBtn.addEventListener('click', function () {
// 			if (searchInput) {
// 				searchInput.value = '';
// 			}
// 			filterCapabilities('');
// 		});
// 	}
// }

// if (document.readyState === "loading") {
// 	document.addEventListener("DOMContentLoaded", initVidhitraCapabilitiesExplorer, { once: true });
// } else {
// 	initVidhitraCapabilitiesExplorer();
// }




/* =========================================================
   VIDHITRA PHASE 1 — Supplemental JS Polish
   =========================================================
   Rules:
   - No duplicate event listeners for existing components.
   - Extends the existing scroll listener (stickyMenu) via CSS.
   - FAQ items use a soft intersection observer (no competing
     GSAP or second rAF loop).
   - prefers-reduced-motion respected.
   ========================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     FAQ — Smooth, stable scroll reveal via IntersectionObserver
     Slows down the reveal so it is not abrupt or jittery.
     Does NOT conflict with the Approach GSAP/rAF system.
  ---------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const faqItems = document.querySelectorAll('.h6-project-section .h6-project-item, .tj-faq .accordion-item, .tj-faq-style .accordion-item, .h7-faq-style .accordion-item, .accordion-item.wow');

  if (faqItems.length && !prefersReducedMotion) {

    // Match the real FAQ accordion cards, not the unrelated project cards.
    faqItems.forEach(function (item, i) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(28px)';
      item.style.transition = 'opacity 0.6s ease ' + (i * 0.08) + 's, transform 0.6s ease ' + (i * 0.08) + 's';
    });

    const faqObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          faqObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    faqItems.forEach(function (item) {
      faqObserver.observe(item);
    });

  } else if (faqItems.length && prefersReducedMotion) {
    faqItems.forEach(function (item) {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
  }

  /* ----------------------------------------------------------
     CONTACT THANK-YOU — smooth fade-in on form submission
     Augments the existing form submit handler by adding a
     smooth reveal class to the existing .vd-thank-you element.
     Uses MutationObserver so we don't duplicate the submit logic.
  ---------------------------------------------------------- */
  const thankYou = document.querySelector('.vd-contact-success') ||
                   document.querySelector('.vd-thank-you') ||
                   document.querySelector('#vdThankYou');

  if (thankYou) {
    // Add smooth transition styles programmatically
    thankYou.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    const tyObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          const isVisible = thankYou.classList.contains('is-visible') ||
                            !thankYou.classList.contains('d-none');
          if (isVisible) {
            thankYou.style.opacity = '1';
            thankYou.style.transform = 'translateY(0)';
          } else {
            thankYou.style.opacity = '0';
            thankYou.style.transform = 'translateY(16px)';
          }
        }
      });
    });

    tyObserver.observe(thankYou, { attributes: true });

    // Set initial hidden state
    thankYou.style.opacity = '0';
    thankYou.style.transform = 'translateY(16px)';
  }

})();