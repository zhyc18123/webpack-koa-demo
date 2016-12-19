/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);
	__webpack_require__(2);
	var getVip = __webpack_require__(3);
	var input = __webpack_require__(5);
	$(function () {
		var init = function init() {
			// var swiperHeight=[];
			var xinSwiper = new Swiper('.xin-con', {
				autoHeight: true,
				onSlideChangeStart: function onSlideChangeStart() {
					var activeSlide = $(".swiper-slide").eq(xinSwiper.activeIndex);
					console.log(activeSlide.height());
					if (activeSlide.height() < $(window).height()) {
						activeSlide.css('height', $(window).height() + 'px');
						$(".swiper-wrapper").css('height', $(window).height() + 'px');
					} else {
						$(".swiper-wrapper").css('height', activeSlide.height() + 'px');
					};
				},
				onInit: function onInit(swiper) {
					console.log($(".swiper-slide").eq(0).height());
					console.log($(window).height());
					if ($(".swiper-slide").eq(0).height() < $(window).height()) {
						console.log("xdd");
						$(".swiper-slide").eq(0).css('height', $(window).height() + 'px');
						$(".swiper-wrapper").css('height', $(window).height() + 'px');
					};
				}
			});
			getVip.init(xinSwiper);
			input.init(xinSwiper);
		};
		init();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Swiper 3.3.1
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2016, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: February 7, 2016
	 */
	!function () {
	  "use strict";
	  function e(e) {
	    e.fn.swiper = function (a) {
	      var s;return e(this).each(function () {
	        var e = new t(this, a);s || (s = e);
	      }), s;
	    };
	  }var a,
	      t = function t(e, s) {
	    function r(e) {
	      return Math.floor(e);
	    }function i() {
	      y.autoplayTimeoutId = setTimeout(function () {
	        y.params.loop ? (y.fixLoop(), y._slideNext(), y.emit("onAutoplay", y)) : y.isEnd ? s.autoplayStopOnLast ? y.stopAutoplay() : (y._slideTo(0), y.emit("onAutoplay", y)) : (y._slideNext(), y.emit("onAutoplay", y));
	      }, y.params.autoplay);
	    }function n(e, t) {
	      var s = a(e.target);if (!s.is(t)) if ("string" == typeof t) s = s.parents(t);else if (t.nodeType) {
	        var r;return s.parents().each(function (e, a) {
	          a === t && (r = t);
	        }), r ? t : void 0;
	      }if (0 !== s.length) return s[0];
	    }function o(e, a) {
	      a = a || {};var t = window.MutationObserver || window.WebkitMutationObserver,
	          s = new t(function (e) {
	        e.forEach(function (e) {
	          y.onResize(!0), y.emit("onObserverUpdate", y, e);
	        });
	      });s.observe(e, { attributes: "undefined" == typeof a.attributes ? !0 : a.attributes, childList: "undefined" == typeof a.childList ? !0 : a.childList, characterData: "undefined" == typeof a.characterData ? !0 : a.characterData }), y.observers.push(s);
	    }function l(e) {
	      e.originalEvent && (e = e.originalEvent);var a = e.keyCode || e.charCode;if (!y.params.allowSwipeToNext && (y.isHorizontal() && 39 === a || !y.isHorizontal() && 40 === a)) return !1;if (!y.params.allowSwipeToPrev && (y.isHorizontal() && 37 === a || !y.isHorizontal() && 38 === a)) return !1;if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
	        if (37 === a || 39 === a || 38 === a || 40 === a) {
	          var t = !1;if (y.container.parents(".swiper-slide").length > 0 && 0 === y.container.parents(".swiper-slide-active").length) return;var s = { left: window.pageXOffset, top: window.pageYOffset },
	              r = window.innerWidth,
	              i = window.innerHeight,
	              n = y.container.offset();y.rtl && (n.left = n.left - y.container[0].scrollLeft);for (var o = [[n.left, n.top], [n.left + y.width, n.top], [n.left, n.top + y.height], [n.left + y.width, n.top + y.height]], l = 0; l < o.length; l++) {
	            var p = o[l];p[0] >= s.left && p[0] <= s.left + r && p[1] >= s.top && p[1] <= s.top + i && (t = !0);
	          }if (!t) return;
	        }y.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !y.rtl || 37 === a && y.rtl) && y.slideNext(), (37 === a && !y.rtl || 39 === a && y.rtl) && y.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && y.slideNext(), 38 === a && y.slidePrev());
	      }
	    }function p(e) {
	      e.originalEvent && (e = e.originalEvent);var a = y.mousewheel.event,
	          t = 0,
	          s = y.rtl ? -1 : 1;if ("mousewheel" === a) {
	        if (y.params.mousewheelForceToAxis) {
	          if (y.isHorizontal()) {
	            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;t = e.wheelDeltaX * s;
	          } else {
	            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;t = e.wheelDeltaY;
	          }
	        } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * s : -e.wheelDeltaY;
	      } else if ("DOMMouseScroll" === a) t = -e.detail;else if ("wheel" === a) if (y.params.mousewheelForceToAxis) {
	        if (y.isHorizontal()) {
	          if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;t = -e.deltaX * s;
	        } else {
	          if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;t = -e.deltaY;
	        }
	      } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * s : -e.deltaY;if (0 !== t) {
	        if (y.params.mousewheelInvert && (t = -t), y.params.freeMode) {
	          var r = y.getWrapperTranslate() + t * y.params.mousewheelSensitivity,
	              i = y.isBeginning,
	              n = y.isEnd;if (r >= y.minTranslate() && (r = y.minTranslate()), r <= y.maxTranslate() && (r = y.maxTranslate()), y.setWrapperTransition(0), y.setWrapperTranslate(r), y.updateProgress(), y.updateActiveIndex(), (!i && y.isBeginning || !n && y.isEnd) && y.updateClasses(), y.params.freeModeSticky ? (clearTimeout(y.mousewheel.timeout), y.mousewheel.timeout = setTimeout(function () {
	            y.slideReset();
	          }, 300)) : y.params.lazyLoading && y.lazy && y.lazy.load(), 0 === r || r === y.maxTranslate()) return;
	        } else {
	          if (new window.Date().getTime() - y.mousewheel.lastScrollTime > 60) if (0 > t) {
	            if (y.isEnd && !y.params.loop || y.animating) {
	              if (y.params.mousewheelReleaseOnEdges) return !0;
	            } else y.slideNext();
	          } else if (y.isBeginning && !y.params.loop || y.animating) {
	            if (y.params.mousewheelReleaseOnEdges) return !0;
	          } else y.slidePrev();y.mousewheel.lastScrollTime = new window.Date().getTime();
	        }return y.params.autoplay && y.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
	      }
	    }function d(e, t) {
	      e = a(e);var s,
	          r,
	          i,
	          n = y.rtl ? -1 : 1;s = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), i = e.attr("data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : y.isHorizontal() ? (r = s, i = "0") : (i = s, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px", e.transform("translate3d(" + r + ", " + i + ",0px)");
	    }function u(e) {
	      return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e;
	    }if (!(this instanceof t)) return new t(e, s);var c = { direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, iOSEdgeSwipeDetection: !1, iOSEdgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", coverflow: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 }, flip: { slideShadows: !0, limitRotation: !0 }, cube: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 }, fade: { crossFade: !1 }, parallax: !1, scrollbar: null, scrollbarHide: !0, scrollbarDraggable: !1, scrollbarSnapOnRelease: !1, keyboardControl: !1, mousewheelControl: !1, mousewheelReleaseOnEdges: !1, mousewheelInvert: !1, mousewheelForceToAxis: !1, mousewheelSensitivity: 1, hashnav: !1, breakpoints: void 0, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, onlyExternal: !1, threshold: 0, touchMoveStopPropagation: !0, uniqueNavElements: !0, pagination: null, paginationElement: "span", paginationClickable: !1, paginationHide: !1, paginationBulletRender: null, paginationProgressRender: null, paginationFractionRender: null, paginationCustomRender: null, paginationType: "bullets", resistance: !0, resistanceRatio: .85, nextButton: null, prevButton: null, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, lazyLoading: !1, lazyLoadingInPrevNext: !1, lazyLoadingInPrevNextAmount: 1, lazyLoadingOnTransitionStart: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, control: void 0, controlInverse: !1, controlBy: "slide", allowSwipeToPrev: !0, allowSwipeToNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", buttonDisabledClass: "swiper-button-disabled", paginationCurrentClass: "swiper-pagination-current", paginationTotalClass: "swiper-pagination-total", paginationHiddenClass: "swiper-pagination-hidden", paginationProgressbarClass: "swiper-pagination-progressbar", observer: !1, observeParents: !1, a11y: !1, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", runCallbacksOnInit: !0 },
	        m = s && s.virtualTranslate;s = s || {};var f = {};for (var g in s) {
	      if ("object" != _typeof(s[g]) || null === s[g] || s[g].nodeType || s[g] === window || s[g] === document || "undefined" != typeof Dom7 && s[g] instanceof Dom7 || "undefined" != typeof jQuery && s[g] instanceof jQuery) f[g] = s[g];else {
	        f[g] = {};for (var h in s[g]) {
	          f[g][h] = s[g][h];
	        }
	      }
	    }for (var v in c) {
	      if ("undefined" == typeof s[v]) s[v] = c[v];else if ("object" == _typeof(s[v])) for (var w in c[v]) {
	        "undefined" == typeof s[v][w] && (s[v][w] = c[v][w]);
	      }
	    }var y = this;if (y.params = s, y.originalParams = f, y.classNames = [], "undefined" != typeof a && "undefined" != typeof Dom7 && (a = Dom7), ("undefined" != typeof a || (a = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (y.$ = a, y.currentBreakpoint = void 0, y.getActiveBreakpoint = function () {
	      if (!y.params.breakpoints) return !1;var e,
	          a = !1,
	          t = [];for (e in y.params.breakpoints) {
	        y.params.breakpoints.hasOwnProperty(e) && t.push(e);
	      }t.sort(function (e, a) {
	        return parseInt(e, 10) > parseInt(a, 10);
	      });for (var s = 0; s < t.length; s++) {
	        e = t[s], e >= window.innerWidth && !a && (a = e);
	      }return a || "max";
	    }, y.setBreakpoint = function () {
	      var e = y.getActiveBreakpoint();if (e && y.currentBreakpoint !== e) {
	        var a = e in y.params.breakpoints ? y.params.breakpoints[e] : y.originalParams,
	            t = y.params.loop && a.slidesPerView !== y.params.slidesPerView;for (var s in a) {
	          y.params[s] = a[s];
	        }y.currentBreakpoint = e, t && y.destroyLoop && y.reLoop(!0);
	      }
	    }, y.params.breakpoints && y.setBreakpoint(), y.container = a(e), 0 !== y.container.length)) {
	      if (y.container.length > 1) {
	        var b = [];return y.container.each(function () {
	          b.push(new t(this, s));
	        }), b;
	      }y.container[0].swiper = y, y.container.data("swiper", y), y.classNames.push("swiper-container-" + y.params.direction), y.params.freeMode && y.classNames.push("swiper-container-free-mode"), y.support.flexbox || (y.classNames.push("swiper-container-no-flexbox"), y.params.slidesPerColumn = 1), y.params.autoHeight && y.classNames.push("swiper-container-autoheight"), (y.params.parallax || y.params.watchSlidesVisibility) && (y.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 && (y.support.transforms3d ? (y.params.watchSlidesProgress = !0, y.classNames.push("swiper-container-3d")) : y.params.effect = "slide"), "slide" !== y.params.effect && y.classNames.push("swiper-container-" + y.params.effect), "cube" === y.params.effect && (y.params.resistanceRatio = 0, y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.centeredSlides = !1, y.params.spaceBetween = 0, y.params.virtualTranslate = !0, y.params.setWrapperSize = !1), ("fade" === y.params.effect || "flip" === y.params.effect) && (y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.watchSlidesProgress = !0, y.params.spaceBetween = 0, y.params.setWrapperSize = !1, "undefined" == typeof m && (y.params.virtualTranslate = !0)), y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1), y.wrapper = y.container.children("." + y.params.wrapperClass), y.params.pagination && (y.paginationContainer = a(y.params.pagination), y.params.uniqueNavElements && "string" == typeof y.params.pagination && y.paginationContainer.length > 1 && 1 === y.container.find(y.params.pagination).length && (y.paginationContainer = y.container.find(y.params.pagination)), "bullets" === y.params.paginationType && y.params.paginationClickable ? y.paginationContainer.addClass("swiper-pagination-clickable") : y.params.paginationClickable = !1, y.paginationContainer.addClass("swiper-pagination-" + y.params.paginationType)), (y.params.nextButton || y.params.prevButton) && (y.params.nextButton && (y.nextButton = a(y.params.nextButton), y.params.uniqueNavElements && "string" == typeof y.params.nextButton && y.nextButton.length > 1 && 1 === y.container.find(y.params.nextButton).length && (y.nextButton = y.container.find(y.params.nextButton))), y.params.prevButton && (y.prevButton = a(y.params.prevButton), y.params.uniqueNavElements && "string" == typeof y.params.prevButton && y.prevButton.length > 1 && 1 === y.container.find(y.params.prevButton).length && (y.prevButton = y.container.find(y.params.prevButton)))), y.isHorizontal = function () {
	        return "horizontal" === y.params.direction;
	      }, y.rtl = y.isHorizontal() && ("rtl" === y.container[0].dir.toLowerCase() || "rtl" === y.container.css("direction")), y.rtl && y.classNames.push("swiper-container-rtl"), y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")), y.params.slidesPerColumn > 1 && y.classNames.push("swiper-container-multirow"), y.device.android && y.classNames.push("swiper-container-android"), y.container.addClass(y.classNames.join(" ")), y.translate = 0, y.progress = 0, y.velocity = 0, y.lockSwipeToNext = function () {
	        y.params.allowSwipeToNext = !1;
	      }, y.lockSwipeToPrev = function () {
	        y.params.allowSwipeToPrev = !1;
	      }, y.lockSwipes = function () {
	        y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1;
	      }, y.unlockSwipeToNext = function () {
	        y.params.allowSwipeToNext = !0;
	      }, y.unlockSwipeToPrev = function () {
	        y.params.allowSwipeToPrev = !0;
	      }, y.unlockSwipes = function () {
	        y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0;
	      }, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab"), y.imagesToLoad = [], y.imagesLoaded = 0, y.loadImage = function (e, a, t, s, r) {
	        function i() {
	          r && r();
	        }var n;e.complete && s ? i() : a ? (n = new window.Image(), n.onload = i, n.onerror = i, t && (n.srcset = t), a && (n.src = a)) : i();
	      }, y.preloadImages = function () {
	        function e() {
	          "undefined" != typeof y && null !== y && (void 0 !== y.imagesLoaded && y.imagesLoaded++, y.imagesLoaded === y.imagesToLoad.length && (y.params.updateOnImagesReady && y.update(), y.emit("onImagesReady", y)));
	        }y.imagesToLoad = y.container.find("img");for (var a = 0; a < y.imagesToLoad.length; a++) {
	          y.loadImage(y.imagesToLoad[a], y.imagesToLoad[a].currentSrc || y.imagesToLoad[a].getAttribute("src"), y.imagesToLoad[a].srcset || y.imagesToLoad[a].getAttribute("srcset"), !0, e);
	        }
	      }, y.autoplayTimeoutId = void 0, y.autoplaying = !1, y.autoplayPaused = !1, y.startAutoplay = function () {
	        return "undefined" != typeof y.autoplayTimeoutId ? !1 : y.params.autoplay ? y.autoplaying ? !1 : (y.autoplaying = !0, y.emit("onAutoplayStart", y), void i()) : !1;
	      }, y.stopAutoplay = function (e) {
	        y.autoplayTimeoutId && (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplaying = !1, y.autoplayTimeoutId = void 0, y.emit("onAutoplayStop", y));
	      }, y.pauseAutoplay = function (e) {
	        y.autoplayPaused || (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplayPaused = !0, 0 === e ? (y.autoplayPaused = !1, i()) : y.wrapper.transitionEnd(function () {
	          y && (y.autoplayPaused = !1, y.autoplaying ? i() : y.stopAutoplay());
	        }));
	      }, y.minTranslate = function () {
	        return -y.snapGrid[0];
	      }, y.maxTranslate = function () {
	        return -y.snapGrid[y.snapGrid.length - 1];
	      }, y.updateAutoHeight = function () {
	        var e = y.slides.eq(y.activeIndex)[0];if ("undefined" != typeof e) {
	          var a = e.offsetHeight;a && y.wrapper.css("height", a + "px");
	        }
	      }, y.updateContainerSize = function () {
	        var e, a;e = "undefined" != typeof y.params.width ? y.params.width : y.container[0].clientWidth, a = "undefined" != typeof y.params.height ? y.params.height : y.container[0].clientHeight, 0 === e && y.isHorizontal() || 0 === a && !y.isHorizontal() || (e = e - parseInt(y.container.css("padding-left"), 10) - parseInt(y.container.css("padding-right"), 10), a = a - parseInt(y.container.css("padding-top"), 10) - parseInt(y.container.css("padding-bottom"), 10), y.width = e, y.height = a, y.size = y.isHorizontal() ? y.width : y.height);
	      }, y.updateSlidesSize = function () {
	        y.slides = y.wrapper.children("." + y.params.slideClass), y.snapGrid = [], y.slidesGrid = [], y.slidesSizesGrid = [];var e,
	            a = y.params.spaceBetween,
	            t = -y.params.slidesOffsetBefore,
	            s = 0,
	            i = 0;if ("undefined" != typeof y.size) {
	          "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * y.size), y.virtualSize = -a, y.rtl ? y.slides.css({ marginLeft: "", marginTop: "" }) : y.slides.css({ marginRight: "", marginBottom: "" });var n;y.params.slidesPerColumn > 1 && (n = Math.floor(y.slides.length / y.params.slidesPerColumn) === y.slides.length / y.params.slidesPerColumn ? y.slides.length : Math.ceil(y.slides.length / y.params.slidesPerColumn) * y.params.slidesPerColumn, "auto" !== y.params.slidesPerView && "row" === y.params.slidesPerColumnFill && (n = Math.max(n, y.params.slidesPerView * y.params.slidesPerColumn)));var o,
	              l = y.params.slidesPerColumn,
	              p = n / l,
	              d = p - (y.params.slidesPerColumn * p - y.slides.length);for (e = 0; e < y.slides.length; e++) {
	            o = 0;var u = y.slides.eq(e);if (y.params.slidesPerColumn > 1) {
	              var c, m, f;"column" === y.params.slidesPerColumnFill ? (m = Math.floor(e / l), f = e - m * l, (m > d || m === d && f === l - 1) && ++f >= l && (f = 0, m++), c = m + f * n / l, u.css({ "-webkit-box-ordinal-group": c, "-moz-box-ordinal-group": c, "-ms-flex-order": c, "-webkit-order": c, order: c })) : (f = Math.floor(e / p), m = e - f * p), u.css({ "margin-top": 0 !== f && y.params.spaceBetween && y.params.spaceBetween + "px" }).attr("data-swiper-column", m).attr("data-swiper-row", f);
	            }"none" !== u.css("display") && ("auto" === y.params.slidesPerView ? (o = y.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), y.params.roundLengths && (o = r(o))) : (o = (y.size - (y.params.slidesPerView - 1) * a) / y.params.slidesPerView, y.params.roundLengths && (o = r(o)), y.isHorizontal() ? y.slides[e].style.width = o + "px" : y.slides[e].style.height = o + "px"), y.slides[e].swiperSlideSize = o, y.slidesSizesGrid.push(o), y.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === e && (t = t - y.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t), y.slidesGrid.push(t)) : (i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t), y.slidesGrid.push(t), t = t + o + a), y.virtualSize += o + a, s = o, i++);
	          }y.virtualSize = Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;var g;if (y.rtl && y.wrongRTL && ("slide" === y.params.effect || "coverflow" === y.params.effect) && y.wrapper.css({ width: y.virtualSize + y.params.spaceBetween + "px" }), (!y.support.flexbox || y.params.setWrapperSize) && (y.isHorizontal() ? y.wrapper.css({ width: y.virtualSize + y.params.spaceBetween + "px" }) : y.wrapper.css({ height: y.virtualSize + y.params.spaceBetween + "px" })), y.params.slidesPerColumn > 1 && (y.virtualSize = (o + y.params.spaceBetween) * n, y.virtualSize = Math.ceil(y.virtualSize / y.params.slidesPerColumn) - y.params.spaceBetween, y.wrapper.css({ width: y.virtualSize + y.params.spaceBetween + "px" }), y.params.centeredSlides)) {
	            for (g = [], e = 0; e < y.snapGrid.length; e++) {
	              y.snapGrid[e] < y.virtualSize + y.snapGrid[0] && g.push(y.snapGrid[e]);
	            }y.snapGrid = g;
	          }if (!y.params.centeredSlides) {
	            for (g = [], e = 0; e < y.snapGrid.length; e++) {
	              y.snapGrid[e] <= y.virtualSize - y.size && g.push(y.snapGrid[e]);
	            }y.snapGrid = g, Math.floor(y.virtualSize - y.size) - Math.floor(y.snapGrid[y.snapGrid.length - 1]) > 1 && y.snapGrid.push(y.virtualSize - y.size);
	          }0 === y.snapGrid.length && (y.snapGrid = [0]), 0 !== y.params.spaceBetween && (y.isHorizontal() ? y.rtl ? y.slides.css({ marginLeft: a + "px" }) : y.slides.css({ marginRight: a + "px" }) : y.slides.css({ marginBottom: a + "px" })), y.params.watchSlidesProgress && y.updateSlidesOffset();
	        }
	      }, y.updateSlidesOffset = function () {
	        for (var e = 0; e < y.slides.length; e++) {
	          y.slides[e].swiperSlideOffset = y.isHorizontal() ? y.slides[e].offsetLeft : y.slides[e].offsetTop;
	        }
	      }, y.updateSlidesProgress = function (e) {
	        if ("undefined" == typeof e && (e = y.translate || 0), 0 !== y.slides.length) {
	          "undefined" == typeof y.slides[0].swiperSlideOffset && y.updateSlidesOffset();var a = -e;y.rtl && (a = e), y.slides.removeClass(y.params.slideVisibleClass);for (var t = 0; t < y.slides.length; t++) {
	            var s = y.slides[t],
	                r = (a - s.swiperSlideOffset) / (s.swiperSlideSize + y.params.spaceBetween);if (y.params.watchSlidesVisibility) {
	              var i = -(a - s.swiperSlideOffset),
	                  n = i + y.slidesSizesGrid[t],
	                  o = i >= 0 && i < y.size || n > 0 && n <= y.size || 0 >= i && n >= y.size;o && y.slides.eq(t).addClass(y.params.slideVisibleClass);
	            }s.progress = y.rtl ? -r : r;
	          }
	        }
	      }, y.updateProgress = function (e) {
	        "undefined" == typeof e && (e = y.translate || 0);var a = y.maxTranslate() - y.minTranslate(),
	            t = y.isBeginning,
	            s = y.isEnd;0 === a ? (y.progress = 0, y.isBeginning = y.isEnd = !0) : (y.progress = (e - y.minTranslate()) / a, y.isBeginning = y.progress <= 0, y.isEnd = y.progress >= 1), y.isBeginning && !t && y.emit("onReachBeginning", y), y.isEnd && !s && y.emit("onReachEnd", y), y.params.watchSlidesProgress && y.updateSlidesProgress(e), y.emit("onProgress", y, y.progress);
	      }, y.updateActiveIndex = function () {
	        var e,
	            a,
	            t,
	            s = y.rtl ? y.translate : -y.translate;for (a = 0; a < y.slidesGrid.length; a++) {
	          "undefined" != typeof y.slidesGrid[a + 1] ? s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] - (y.slidesGrid[a + 1] - y.slidesGrid[a]) / 2 ? e = a : s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] && (e = a + 1) : s >= y.slidesGrid[a] && (e = a);
	        }(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / y.params.slidesPerGroup), t >= y.snapGrid.length && (t = y.snapGrid.length - 1), e !== y.activeIndex && (y.snapIndex = t, y.previousIndex = y.activeIndex, y.activeIndex = e, y.updateClasses());
	      }, y.updateClasses = function () {
	        y.slides.removeClass(y.params.slideActiveClass + " " + y.params.slideNextClass + " " + y.params.slidePrevClass);var e = y.slides.eq(y.activeIndex);e.addClass(y.params.slideActiveClass);var t = e.next("." + y.params.slideClass).addClass(y.params.slideNextClass);y.params.loop && 0 === t.length && y.slides.eq(0).addClass(y.params.slideNextClass);var s = e.prev("." + y.params.slideClass).addClass(y.params.slidePrevClass);if (y.params.loop && 0 === s.length && y.slides.eq(-1).addClass(y.params.slidePrevClass), y.paginationContainer && y.paginationContainer.length > 0) {
	          var r,
	              i = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length;if (y.params.loop ? (r = Math.ceil((y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup), r > y.slides.length - 1 - 2 * y.loopedSlides && (r -= y.slides.length - 2 * y.loopedSlides), r > i - 1 && (r -= i), 0 > r && "bullets" !== y.params.paginationType && (r = i + r)) : r = "undefined" != typeof y.snapIndex ? y.snapIndex : y.activeIndex || 0, "bullets" === y.params.paginationType && y.bullets && y.bullets.length > 0 && (y.bullets.removeClass(y.params.bulletActiveClass), y.paginationContainer.length > 1 ? y.bullets.each(function () {
	            a(this).index() === r && a(this).addClass(y.params.bulletActiveClass);
	          }) : y.bullets.eq(r).addClass(y.params.bulletActiveClass)), "fraction" === y.params.paginationType && (y.paginationContainer.find("." + y.params.paginationCurrentClass).text(r + 1), y.paginationContainer.find("." + y.params.paginationTotalClass).text(i)), "progress" === y.params.paginationType) {
	            var n = (r + 1) / i,
	                o = n,
	                l = 1;y.isHorizontal() || (l = n, o = 1), y.paginationContainer.find("." + y.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(y.params.speed);
	          }"custom" === y.params.paginationType && y.params.paginationCustomRender && (y.paginationContainer.html(y.params.paginationCustomRender(y, r + 1, i)), y.emit("onPaginationRendered", y, y.paginationContainer[0]));
	        }y.params.loop || (y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.isBeginning ? (y.prevButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.prevButton)) : (y.prevButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.isEnd ? (y.nextButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.nextButton)) : (y.nextButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))));
	      }, y.updatePagination = function () {
	        if (y.params.pagination && y.paginationContainer && y.paginationContainer.length > 0) {
	          var e = "";if ("bullets" === y.params.paginationType) {
	            for (var a = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length, t = 0; a > t; t++) {
	              e += y.params.paginationBulletRender ? y.params.paginationBulletRender(t, y.params.bulletClass) : "<" + y.params.paginationElement + ' class="' + y.params.bulletClass + '"></' + y.params.paginationElement + ">";
	            }y.paginationContainer.html(e), y.bullets = y.paginationContainer.find("." + y.params.bulletClass), y.params.paginationClickable && y.params.a11y && y.a11y && y.a11y.initPagination();
	          }"fraction" === y.params.paginationType && (e = y.params.paginationFractionRender ? y.params.paginationFractionRender(y, y.params.paginationCurrentClass, y.params.paginationTotalClass) : '<span class="' + y.params.paginationCurrentClass + '"></span> / <span class="' + y.params.paginationTotalClass + '"></span>', y.paginationContainer.html(e)), "progress" === y.params.paginationType && (e = y.params.paginationProgressRender ? y.params.paginationProgressRender(y, y.params.paginationProgressbarClass) : '<span class="' + y.params.paginationProgressbarClass + '"></span>', y.paginationContainer.html(e)), "custom" !== y.params.paginationType && y.emit("onPaginationRendered", y, y.paginationContainer[0]);
	        }
	      }, y.update = function (e) {
	        function a() {
	          s = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate()), y.setWrapperTranslate(s), y.updateActiveIndex(), y.updateClasses();
	        }if (y.updateContainerSize(), y.updateSlidesSize(), y.updateProgress(), y.updatePagination(), y.updateClasses(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), e) {
	          var t, s;y.controller && y.controller.spline && (y.controller.spline = void 0), y.params.freeMode ? (a(), y.params.autoHeight && y.updateAutoHeight()) : (t = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0), t || a());
	        } else y.params.autoHeight && y.updateAutoHeight();
	      }, y.onResize = function (e) {
	        y.params.breakpoints && y.setBreakpoint();var a = y.params.allowSwipeToPrev,
	            t = y.params.allowSwipeToNext;y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0, y.updateContainerSize(), y.updateSlidesSize(), ("auto" === y.params.slidesPerView || y.params.freeMode || e) && y.updatePagination(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), y.controller && y.controller.spline && (y.controller.spline = void 0);var s = !1;if (y.params.freeMode) {
	          var r = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate());y.setWrapperTranslate(r), y.updateActiveIndex(), y.updateClasses(), y.params.autoHeight && y.updateAutoHeight();
	        } else y.updateClasses(), s = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0);y.params.lazyLoading && !s && y.lazy && y.lazy.load(), y.params.allowSwipeToPrev = a, y.params.allowSwipeToNext = t;
	      };var x = ["mousedown", "mousemove", "mouseup"];window.navigator.pointerEnabled ? x = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (x = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), y.touchEvents = { start: y.support.touch || !y.params.simulateTouch ? "touchstart" : x[0], move: y.support.touch || !y.params.simulateTouch ? "touchmove" : x[1], end: y.support.touch || !y.params.simulateTouch ? "touchend" : x[2] }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === y.params.touchEventsTarget ? y.container : y.wrapper).addClass("swiper-wp8-" + y.params.direction), y.initEvents = function (e) {
	        var a = e ? "off" : "on",
	            t = e ? "removeEventListener" : "addEventListener",
	            r = "container" === y.params.touchEventsTarget ? y.container[0] : y.wrapper[0],
	            i = y.support.touch ? r : document,
	            n = y.params.nested ? !0 : !1;y.browser.ie ? (r[t](y.touchEvents.start, y.onTouchStart, !1), i[t](y.touchEvents.move, y.onTouchMove, n), i[t](y.touchEvents.end, y.onTouchEnd, !1)) : (y.support.touch && (r[t](y.touchEvents.start, y.onTouchStart, !1), r[t](y.touchEvents.move, y.onTouchMove, n), r[t](y.touchEvents.end, y.onTouchEnd, !1)), !s.simulateTouch || y.device.ios || y.device.android || (r[t]("mousedown", y.onTouchStart, !1), document[t]("mousemove", y.onTouchMove, n), document[t]("mouseup", y.onTouchEnd, !1))), window[t]("resize", y.onResize), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.nextButton[a]("click", y.onClickNext), y.params.a11y && y.a11y && y.nextButton[a]("keydown", y.a11y.onEnterKey)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.prevButton[a]("click", y.onClickPrev), y.params.a11y && y.a11y && y.prevButton[a]("keydown", y.a11y.onEnterKey)), y.params.pagination && y.params.paginationClickable && (y.paginationContainer[a]("click", "." + y.params.bulletClass, y.onClickIndex), y.params.a11y && y.a11y && y.paginationContainer[a]("keydown", "." + y.params.bulletClass, y.a11y.onEnterKey)), (y.params.preventClicks || y.params.preventClicksPropagation) && r[t]("click", y.preventClicks, !0);
	      }, y.attachEvents = function () {
	        y.initEvents();
	      }, y.detachEvents = function () {
	        y.initEvents(!0);
	      }, y.allowClick = !0, y.preventClicks = function (e) {
	        y.allowClick || (y.params.preventClicks && e.preventDefault(), y.params.preventClicksPropagation && y.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
	      }, y.onClickNext = function (e) {
	        e.preventDefault(), (!y.isEnd || y.params.loop) && y.slideNext();
	      }, y.onClickPrev = function (e) {
	        e.preventDefault(), (!y.isBeginning || y.params.loop) && y.slidePrev();
	      }, y.onClickIndex = function (e) {
	        e.preventDefault();var t = a(this).index() * y.params.slidesPerGroup;y.params.loop && (t += y.loopedSlides), y.slideTo(t);
	      }, y.updateClickedSlide = function (e) {
	        var t = n(e, "." + y.params.slideClass),
	            s = !1;if (t) for (var r = 0; r < y.slides.length; r++) {
	          y.slides[r] === t && (s = !0);
	        }if (!t || !s) return y.clickedSlide = void 0, void (y.clickedIndex = void 0);if (y.clickedSlide = t, y.clickedIndex = a(t).index(), y.params.slideToClickedSlide && void 0 !== y.clickedIndex && y.clickedIndex !== y.activeIndex) {
	          var i,
	              o = y.clickedIndex;if (y.params.loop) {
	            if (y.animating) return;i = a(y.clickedSlide).attr("data-swiper-slide-index"), y.params.centeredSlides ? o < y.loopedSlides - y.params.slidesPerView / 2 || o > y.slides.length - y.loopedSlides + y.params.slidesPerView / 2 ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
	              y.slideTo(o);
	            }, 0)) : y.slideTo(o) : o > y.slides.length - y.params.slidesPerView ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
	              y.slideTo(o);
	            }, 0)) : y.slideTo(o);
	          } else y.slideTo(o);
	        }
	      };var T,
	          S,
	          C,
	          z,
	          M,
	          P,
	          I,
	          k,
	          E,
	          B,
	          D = "input, select, textarea, button",
	          L = Date.now(),
	          H = [];y.animating = !1, y.touches = { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 };var G, A;if (y.onTouchStart = function (e) {
	        if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
	          if (y.params.noSwiping && n(e, "." + y.params.noSwipingClass)) return void (y.allowClick = !0);if (!y.params.swipeHandler || n(e, y.params.swipeHandler)) {
	            var t = y.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
	                s = y.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;if (!(y.device.ios && y.params.iOSEdgeSwipeDetection && t <= y.params.iOSEdgeSwipeThreshold)) {
	              if (T = !0, S = !1, C = !0, M = void 0, A = void 0, y.touches.startX = t, y.touches.startY = s, z = Date.now(), y.allowClick = !0, y.updateContainerSize(), y.swipeDirection = void 0, y.params.threshold > 0 && (k = !1), "touchstart" !== e.type) {
	                var r = !0;a(e.target).is(D) && (r = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), r && e.preventDefault();
	              }y.emit("onTouchStart", y, e);
	            }
	          }
	        }
	      }, y.onTouchMove = function (e) {
	        if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
	          if (e.preventedByNestedSwiper) return y.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void (y.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);if (y.params.onlyExternal) return y.allowClick = !1, void (T && (y.touches.startX = y.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, y.touches.startY = y.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, z = Date.now()));if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return S = !0, void (y.allowClick = !1);if (C && y.emit("onTouchMove", y, e), !(e.targetTouches && e.targetTouches.length > 1)) {
	            if (y.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, y.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof M) {
	              var t = 180 * Math.atan2(Math.abs(y.touches.currentY - y.touches.startY), Math.abs(y.touches.currentX - y.touches.startX)) / Math.PI;M = y.isHorizontal() ? t > y.params.touchAngle : 90 - t > y.params.touchAngle;
	            }if (M && y.emit("onTouchMoveOpposite", y, e), "undefined" == typeof A && y.browser.ieTouch && (y.touches.currentX !== y.touches.startX || y.touches.currentY !== y.touches.startY) && (A = !0), T) {
	              if (M) return void (T = !1);if (A || !y.browser.ieTouch) {
	                y.allowClick = !1, y.emit("onSliderMove", y, e), e.preventDefault(), y.params.touchMoveStopPropagation && !y.params.nested && e.stopPropagation(), S || (s.loop && y.fixLoop(), I = y.getWrapperTranslate(), y.setWrapperTransition(0), y.animating && y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), y.params.autoplay && y.autoplaying && (y.params.autoplayDisableOnInteraction ? y.stopAutoplay() : y.pauseAutoplay()), B = !1, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grabbing", y.container[0].style.cursor = "-moz-grabbin", y.container[0].style.cursor = "grabbing")), S = !0;var r = y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY;r *= y.params.touchRatio, y.rtl && (r = -r), y.swipeDirection = r > 0 ? "prev" : "next", P = r + I;var i = !0;if (r > 0 && P > y.minTranslate() ? (i = !1, y.params.resistance && (P = y.minTranslate() - 1 + Math.pow(-y.minTranslate() + I + r, y.params.resistanceRatio))) : 0 > r && P < y.maxTranslate() && (i = !1, y.params.resistance && (P = y.maxTranslate() + 1 - Math.pow(y.maxTranslate() - I - r, y.params.resistanceRatio))), i && (e.preventedByNestedSwiper = !0), !y.params.allowSwipeToNext && "next" === y.swipeDirection && I > P && (P = I), !y.params.allowSwipeToPrev && "prev" === y.swipeDirection && P > I && (P = I), y.params.followFinger) {
	                  if (y.params.threshold > 0) {
	                    if (!(Math.abs(r) > y.params.threshold || k)) return void (P = I);if (!k) return k = !0, y.touches.startX = y.touches.currentX, y.touches.startY = y.touches.currentY, P = I, void (y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY);
	                  }(y.params.freeMode || y.params.watchSlidesProgress) && y.updateActiveIndex(), y.params.freeMode && (0 === H.length && H.push({ position: y.touches[y.isHorizontal() ? "startX" : "startY"], time: z }), H.push({ position: y.touches[y.isHorizontal() ? "currentX" : "currentY"], time: new window.Date().getTime() })), y.updateProgress(P), y.setWrapperTranslate(P);
	                }
	              }
	            }
	          }
	        }
	      }, y.onTouchEnd = function (e) {
	        if (e.originalEvent && (e = e.originalEvent), C && y.emit("onTouchEnd", y, e), C = !1, T) {
	          y.params.grabCursor && S && T && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab");var t = Date.now(),
	              s = t - z;if (y.allowClick && (y.updateClickedSlide(e), y.emit("onTap", y, e), 300 > s && t - L > 300 && (E && clearTimeout(E), E = setTimeout(function () {
	            y && (y.params.paginationHide && y.paginationContainer.length > 0 && !a(e.target).hasClass(y.params.bulletClass) && y.paginationContainer.toggleClass(y.params.paginationHiddenClass), y.emit("onClick", y, e));
	          }, 300)), 300 > s && 300 > t - L && (E && clearTimeout(E), y.emit("onDoubleTap", y, e))), L = Date.now(), setTimeout(function () {
	            y && (y.allowClick = !0);
	          }, 0), !T || !S || !y.swipeDirection || 0 === y.touches.diff || P === I) return void (T = S = !1);T = S = !1;var r;if (r = y.params.followFinger ? y.rtl ? y.translate : -y.translate : -P, y.params.freeMode) {
	            if (r < -y.minTranslate()) return void y.slideTo(y.activeIndex);if (r > -y.maxTranslate()) return void (y.slides.length < y.snapGrid.length ? y.slideTo(y.snapGrid.length - 1) : y.slideTo(y.slides.length - 1));if (y.params.freeModeMomentum) {
	              if (H.length > 1) {
	                var i = H.pop(),
	                    n = H.pop(),
	                    o = i.position - n.position,
	                    l = i.time - n.time;y.velocity = o / l, y.velocity = y.velocity / 2, Math.abs(y.velocity) < y.params.freeModeMinimumVelocity && (y.velocity = 0), (l > 150 || new window.Date().getTime() - i.time > 300) && (y.velocity = 0);
	              } else y.velocity = 0;H.length = 0;var p = 1e3 * y.params.freeModeMomentumRatio,
	                  d = y.velocity * p,
	                  u = y.translate + d;y.rtl && (u = -u);var c,
	                  m = !1,
	                  f = 20 * Math.abs(y.velocity) * y.params.freeModeMomentumBounceRatio;if (u < y.maxTranslate()) y.params.freeModeMomentumBounce ? (u + y.maxTranslate() < -f && (u = y.maxTranslate() - f), c = y.maxTranslate(), m = !0, B = !0) : u = y.maxTranslate();else if (u > y.minTranslate()) y.params.freeModeMomentumBounce ? (u - y.minTranslate() > f && (u = y.minTranslate() + f), c = y.minTranslate(), m = !0, B = !0) : u = y.minTranslate();else if (y.params.freeModeSticky) {
	                var g,
	                    h = 0;for (h = 0; h < y.snapGrid.length; h += 1) {
	                  if (y.snapGrid[h] > -u) {
	                    g = h;break;
	                  }
	                }u = Math.abs(y.snapGrid[g] - u) < Math.abs(y.snapGrid[g - 1] - u) || "next" === y.swipeDirection ? y.snapGrid[g] : y.snapGrid[g - 1], y.rtl || (u = -u);
	              }if (0 !== y.velocity) p = y.rtl ? Math.abs((-u - y.translate) / y.velocity) : Math.abs((u - y.translate) / y.velocity);else if (y.params.freeModeSticky) return void y.slideReset();y.params.freeModeMomentumBounce && m ? (y.updateProgress(c), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating = !0, y.wrapper.transitionEnd(function () {
	                y && B && (y.emit("onMomentumBounce", y), y.setWrapperTransition(y.params.speed), y.setWrapperTranslate(c), y.wrapper.transitionEnd(function () {
	                  y && y.onTransitionEnd();
	                }));
	              })) : y.velocity ? (y.updateProgress(u), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function () {
	                y && y.onTransitionEnd();
	              }))) : y.updateProgress(u), y.updateActiveIndex();
	            }return void ((!y.params.freeModeMomentum || s >= y.params.longSwipesMs) && (y.updateProgress(), y.updateActiveIndex()));
	          }var v,
	              w = 0,
	              b = y.slidesSizesGrid[0];for (v = 0; v < y.slidesGrid.length; v += y.params.slidesPerGroup) {
	            "undefined" != typeof y.slidesGrid[v + y.params.slidesPerGroup] ? r >= y.slidesGrid[v] && r < y.slidesGrid[v + y.params.slidesPerGroup] && (w = v, b = y.slidesGrid[v + y.params.slidesPerGroup] - y.slidesGrid[v]) : r >= y.slidesGrid[v] && (w = v, b = y.slidesGrid[y.slidesGrid.length - 1] - y.slidesGrid[y.slidesGrid.length - 2]);
	          }var x = (r - y.slidesGrid[w]) / b;if (s > y.params.longSwipesMs) {
	            if (!y.params.longSwipes) return void y.slideTo(y.activeIndex);"next" === y.swipeDirection && (x >= y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w)), "prev" === y.swipeDirection && (x > 1 - y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w));
	          } else {
	            if (!y.params.shortSwipes) return void y.slideTo(y.activeIndex);"next" === y.swipeDirection && y.slideTo(w + y.params.slidesPerGroup), "prev" === y.swipeDirection && y.slideTo(w);
	          }
	        }
	      }, y._slideTo = function (e, a) {
	        return y.slideTo(e, a, !0, !0);
	      }, y.slideTo = function (e, a, t, s) {
	        "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), y.snapIndex = Math.floor(e / y.params.slidesPerGroup), y.snapIndex >= y.snapGrid.length && (y.snapIndex = y.snapGrid.length - 1);var r = -y.snapGrid[y.snapIndex];y.params.autoplay && y.autoplaying && (s || !y.params.autoplayDisableOnInteraction ? y.pauseAutoplay(a) : y.stopAutoplay()), y.updateProgress(r);for (var i = 0; i < y.slidesGrid.length; i++) {
	          -Math.floor(100 * r) >= Math.floor(100 * y.slidesGrid[i]) && (e = i);
	        }return !y.params.allowSwipeToNext && r < y.translate && r < y.minTranslate() ? !1 : !y.params.allowSwipeToPrev && r > y.translate && r > y.maxTranslate() && (y.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = y.params.speed), y.previousIndex = y.activeIndex || 0, y.activeIndex = e, y.rtl && -r === y.translate || !y.rtl && r === y.translate ? (y.params.autoHeight && y.updateAutoHeight(), y.updateClasses(), "slide" !== y.params.effect && y.setWrapperTranslate(r), !1) : (y.updateClasses(), y.onTransitionStart(t), 0 === a ? (y.setWrapperTranslate(r), y.setWrapperTransition(0), y.onTransitionEnd(t)) : (y.setWrapperTranslate(r), y.setWrapperTransition(a), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function () {
	          y && y.onTransitionEnd(t);
	        }))), !0));
	      }, y.onTransitionStart = function (e) {
	        "undefined" == typeof e && (e = !0), y.params.autoHeight && y.updateAutoHeight(), y.lazy && y.lazy.onTransitionStart(), e && (y.emit("onTransitionStart", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeStart", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextStart", y) : y.emit("onSlidePrevStart", y)));
	      }, y.onTransitionEnd = function (e) {
	        y.animating = !1, y.setWrapperTransition(0), "undefined" == typeof e && (e = !0), y.lazy && y.lazy.onTransitionEnd(), e && (y.emit("onTransitionEnd", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeEnd", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextEnd", y) : y.emit("onSlidePrevEnd", y))), y.params.hashnav && y.hashnav && y.hashnav.setHash();
	      }, y.slideNext = function (e, a, t) {
	        if (y.params.loop) {
	          if (y.animating) return !1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t);
	        }return y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t);
	      }, y._slideNext = function (e) {
	        return y.slideNext(!0, e, !0);
	      }, y.slidePrev = function (e, a, t) {
	        if (y.params.loop) {
	          if (y.animating) return !1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex - 1, a, e, t);
	        }return y.slideTo(y.activeIndex - 1, a, e, t);
	      }, y._slidePrev = function (e) {
	        return y.slidePrev(!0, e, !0);
	      }, y.slideReset = function (e, a, t) {
	        return y.slideTo(y.activeIndex, a, e);
	      }, y.setWrapperTransition = function (e, a) {
	        y.wrapper.transition(e), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTransition(e), y.params.parallax && y.parallax && y.parallax.setTransition(e), y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(e), y.params.control && y.controller && y.controller.setTransition(e, a), y.emit("onSetTransition", y, e);
	      }, y.setWrapperTranslate = function (e, a, t) {
	        var s = 0,
	            i = 0,
	            n = 0;y.isHorizontal() ? s = y.rtl ? -e : e : i = e, y.params.roundLengths && (s = r(s), i = r(i)), y.params.virtualTranslate || (y.support.transforms3d ? y.wrapper.transform("translate3d(" + s + "px, " + i + "px, " + n + "px)") : y.wrapper.transform("translate(" + s + "px, " + i + "px)")), y.translate = y.isHorizontal() ? s : i;var o,
	            l = y.maxTranslate() - y.minTranslate();o = 0 === l ? 0 : (e - y.minTranslate()) / l, o !== y.progress && y.updateProgress(e), a && y.updateActiveIndex(), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTranslate(y.translate), y.params.parallax && y.parallax && y.parallax.setTranslate(y.translate), y.params.scrollbar && y.scrollbar && y.scrollbar.setTranslate(y.translate), y.params.control && y.controller && y.controller.setTranslate(y.translate, t), y.emit("onSetTranslate", y, y.translate);
	      }, y.getTranslate = function (e, a) {
	        var t, s, r, i;return "undefined" == typeof a && (a = "x"), y.params.virtualTranslate ? y.rtl ? -y.translate : y.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = r.transform || r.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function (e) {
	          return e.replace(",", ".");
	        }).join(", ")), i = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), y.rtl && s && (s = -s), s || 0);
	      }, y.getWrapperTranslate = function (e) {
	        return "undefined" == typeof e && (e = y.isHorizontal() ? "x" : "y"), y.getTranslate(y.wrapper[0], e);
	      }, y.observers = [], y.initObservers = function () {
	        if (y.params.observeParents) for (var e = y.container.parents(), a = 0; a < e.length; a++) {
	          o(e[a]);
	        }o(y.container[0], { childList: !1 }), o(y.wrapper[0], { attributes: !1 });
	      }, y.disconnectObservers = function () {
	        for (var e = 0; e < y.observers.length; e++) {
	          y.observers[e].disconnect();
	        }y.observers = [];
	      }, y.createLoop = function () {
	        y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove();var e = y.wrapper.children("." + y.params.slideClass);"auto" !== y.params.slidesPerView || y.params.loopedSlides || (y.params.loopedSlides = e.length), y.loopedSlides = parseInt(y.params.loopedSlides || y.params.slidesPerView, 10), y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides, y.loopedSlides > e.length && (y.loopedSlides = e.length);var t,
	            s = [],
	            r = [];for (e.each(function (t, i) {
	          var n = a(this);t < y.loopedSlides && r.push(i), t < e.length && t >= e.length - y.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t);
	        }), t = 0; t < r.length; t++) {
	          y.wrapper.append(a(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
	        }for (t = s.length - 1; t >= 0; t--) {
	          y.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
	        }
	      }, y.destroyLoop = function () {
	        y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove(), y.slides.removeAttr("data-swiper-slide-index");
	      }, y.reLoop = function (e) {
	        var a = y.activeIndex - y.loopedSlides;y.destroyLoop(), y.createLoop(), y.updateSlidesSize(), e && y.slideTo(a + y.loopedSlides, 0, !1);
	      }, y.fixLoop = function () {
	        var e;y.activeIndex < y.loopedSlides ? (e = y.slides.length - 3 * y.loopedSlides + y.activeIndex, e += y.loopedSlides, y.slideTo(e, 0, !1, !0)) : ("auto" === y.params.slidesPerView && y.activeIndex >= 2 * y.loopedSlides || y.activeIndex > y.slides.length - 2 * y.params.slidesPerView) && (e = -y.slides.length + y.activeIndex + y.loopedSlides, e += y.loopedSlides, y.slideTo(e, 0, !1, !0));
	      }, y.appendSlide = function (e) {
	        if (y.params.loop && y.destroyLoop(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) for (var a = 0; a < e.length; a++) {
	          e[a] && y.wrapper.append(e[a]);
	        } else y.wrapper.append(e);y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0);
	      }, y.prependSlide = function (e) {
	        y.params.loop && y.destroyLoop();var a = y.activeIndex + 1;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
	          for (var t = 0; t < e.length; t++) {
	            e[t] && y.wrapper.prepend(e[t]);
	          }a = y.activeIndex + e.length;
	        } else y.wrapper.prepend(e);y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.slideTo(a, 0, !1);
	      }, y.removeSlide = function (e) {
	        y.params.loop && (y.destroyLoop(), y.slides = y.wrapper.children("." + y.params.slideClass));var a,
	            t = y.activeIndex;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.length) {
	          for (var s = 0; s < e.length; s++) {
	            a = e[s], y.slides[a] && y.slides.eq(a).remove(), t > a && t--;
	          }t = Math.max(t, 0);
	        } else a = e, y.slides[a] && y.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.params.loop ? y.slideTo(t + y.loopedSlides, 0, !1) : y.slideTo(t, 0, !1);
	      }, y.removeAllSlides = function () {
	        for (var e = [], a = 0; a < y.slides.length; a++) {
	          e.push(a);
	        }y.removeSlide(e);
	      }, y.effects = { fade: { setTranslate: function setTranslate() {
	            for (var e = 0; e < y.slides.length; e++) {
	              var a = y.slides.eq(e),
	                  t = a[0].swiperSlideOffset,
	                  s = -t;y.params.virtualTranslate || (s -= y.translate);var r = 0;y.isHorizontal() || (r = s, s = 0);var i = y.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);a.css({ opacity: i }).transform("translate3d(" + s + "px, " + r + "px, 0px)");
	            }
	          }, setTransition: function setTransition(e) {
	            if (y.slides.transition(e), y.params.virtualTranslate && 0 !== e) {
	              var a = !1;y.slides.transitionEnd(function () {
	                if (!a && y) {
	                  a = !0, y.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) {
	                    y.wrapper.trigger(e[t]);
	                  }
	                }
	              });
	            }
	          } }, flip: { setTranslate: function setTranslate() {
	            for (var e = 0; e < y.slides.length; e++) {
	              var t = y.slides.eq(e),
	                  s = t[0].progress;y.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));var r = t[0].swiperSlideOffset,
	                  i = -180 * s,
	                  n = i,
	                  o = 0,
	                  l = -r,
	                  p = 0;if (y.isHorizontal() ? y.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + y.slides.length, y.params.flip.slideShadows) {
	                var d = y.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
	                    u = y.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0));
	              }t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
	            }
	          }, setTransition: function setTransition(e) {
	            if (y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.virtualTranslate && 0 !== e) {
	              var t = !1;y.slides.eq(y.activeIndex).transitionEnd(function () {
	                if (!t && y && a(this).hasClass(y.params.slideActiveClass)) {
	                  t = !0, y.animating = !1;for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < e.length; s++) {
	                    y.wrapper.trigger(e[s]);
	                  }
	                }
	              });
	            }
	          } }, cube: { setTranslate: function setTranslate() {
	            var e,
	                t = 0;y.params.cube.shadow && (y.isHorizontal() ? (e = y.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), y.wrapper.append(e)), e.css({ height: y.width + "px" })) : (e = y.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), y.container.append(e))));for (var s = 0; s < y.slides.length; s++) {
	              var r = y.slides.eq(s),
	                  i = 90 * s,
	                  n = Math.floor(i / 360);y.rtl && (i = -i, n = Math.floor(-i / 360));var o = Math.max(Math.min(r[0].progress, 1), -1),
	                  l = 0,
	                  p = 0,
	                  d = 0;s % 4 === 0 ? (l = 4 * -n * y.size, d = 0) : (s - 1) % 4 === 0 ? (l = 0, d = 4 * -n * y.size) : (s - 2) % 4 === 0 ? (l = y.size + 4 * n * y.size, d = y.size) : (s - 3) % 4 === 0 && (l = -y.size, d = 3 * y.size + 4 * y.size * n), y.rtl && (l = -l), y.isHorizontal() || (p = l, l = 0);var u = "rotateX(" + (y.isHorizontal() ? 0 : -i) + "deg) rotateY(" + (y.isHorizontal() ? i : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";if (1 >= o && o > -1 && (t = 90 * s + 90 * o, y.rtl && (t = 90 * -s - 90 * o)), r.transform(u), y.params.cube.slideShadows) {
	                var c = y.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
	                    m = y.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), r.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0));
	              }
	            }if (y.wrapper.css({ "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px", "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px", "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px", "transform-origin": "50% 50% -" + y.size / 2 + "px" }), y.params.cube.shadow) if (y.isHorizontal()) e.transform("translate3d(0px, " + (y.width / 2 + y.params.cube.shadowOffset) + "px, " + -y.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + y.params.cube.shadowScale + ")");else {
	              var f = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
	                  g = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
	                  h = y.params.cube.shadowScale,
	                  v = y.params.cube.shadowScale / g,
	                  w = y.params.cube.shadowOffset;e.transform("scale3d(" + h + ", 1, " + v + ") translate3d(0px, " + (y.height / 2 + w) + "px, " + -y.height / 2 / v + "px) rotateX(-90deg)");
	            }var b = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;y.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (y.isHorizontal() ? 0 : t) + "deg) rotateY(" + (y.isHorizontal() ? -t : 0) + "deg)");
	          }, setTransition: function setTransition(e) {
	            y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.cube.shadow && !y.isHorizontal() && y.container.find(".swiper-cube-shadow").transition(e);
	          } }, coverflow: { setTranslate: function setTranslate() {
	            for (var e = y.translate, t = y.isHorizontal() ? -e + y.width / 2 : -e + y.height / 2, s = y.isHorizontal() ? y.params.coverflow.rotate : -y.params.coverflow.rotate, r = y.params.coverflow.depth, i = 0, n = y.slides.length; n > i; i++) {
	              var o = y.slides.eq(i),
	                  l = y.slidesSizesGrid[i],
	                  p = o[0].swiperSlideOffset,
	                  d = (t - p - l / 2) / l * y.params.coverflow.modifier,
	                  u = y.isHorizontal() ? s * d : 0,
	                  c = y.isHorizontal() ? 0 : s * d,
	                  m = -r * Math.abs(d),
	                  f = y.isHorizontal() ? 0 : y.params.coverflow.stretch * d,
	                  g = y.isHorizontal() ? y.params.coverflow.stretch * d : 0;Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);var h = "translate3d(" + g + "px," + f + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";if (o.transform(h), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, y.params.coverflow.slideShadows) {
	                var v = y.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
	                    w = y.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0);
	              }
	            }if (y.browser.ie) {
	              var b = y.wrapper[0].style;b.perspectiveOrigin = t + "px 50%";
	            }
	          }, setTransition: function setTransition(e) {
	            y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
	          } } }, y.lazy = { initialImageLoaded: !1, loadImageInSlide: function loadImageInSlide(e, t) {
	          if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== y.slides.length)) {
	            var s = y.slides.eq(e),
	                r = s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!s.hasClass("swiper-lazy") || s.hasClass("swiper-lazy-loaded") || s.hasClass("swiper-lazy-loading") || (r = r.add(s[0])), 0 !== r.length && r.each(function () {
	              var e = a(this);e.addClass("swiper-lazy-loading");var r = e.attr("data-background"),
	                  i = e.attr("data-src"),
	                  n = e.attr("data-srcset");y.loadImage(e[0], i || r, n, !1, function () {
	                if (r ? (e.css("background-image", 'url("' + r + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), i && (e.attr("src", i), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), s.find(".swiper-lazy-preloader, .preloader").remove(), y.params.loop && t) {
	                  var a = s.attr("data-swiper-slide-index");if (s.hasClass(y.params.slideDuplicateClass)) {
	                    var o = y.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + y.params.slideDuplicateClass + ")");y.lazy.loadImageInSlide(o.index(), !1);
	                  } else {
	                    var l = y.wrapper.children("." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');y.lazy.loadImageInSlide(l.index(), !1);
	                  }
	                }y.emit("onLazyImageReady", y, s[0], e[0]);
	              }), y.emit("onLazyImageLoad", y, s[0], e[0]);
	            });
	          }
	        }, load: function load() {
	          var e;if (y.params.watchSlidesVisibility) y.wrapper.children("." + y.params.slideVisibleClass).each(function () {
	            y.lazy.loadImageInSlide(a(this).index());
	          });else if (y.params.slidesPerView > 1) for (e = y.activeIndex; e < y.activeIndex + y.params.slidesPerView; e++) {
	            y.slides[e] && y.lazy.loadImageInSlide(e);
	          } else y.lazy.loadImageInSlide(y.activeIndex);if (y.params.lazyLoadingInPrevNext) if (y.params.slidesPerView > 1 || y.params.lazyLoadingInPrevNextAmount && y.params.lazyLoadingInPrevNextAmount > 1) {
	            var t = y.params.lazyLoadingInPrevNextAmount,
	                s = y.params.slidesPerView,
	                r = Math.min(y.activeIndex + s + Math.max(t, s), y.slides.length),
	                i = Math.max(y.activeIndex - Math.max(s, t), 0);for (e = y.activeIndex + y.params.slidesPerView; r > e; e++) {
	              y.slides[e] && y.lazy.loadImageInSlide(e);
	            }for (e = i; e < y.activeIndex; e++) {
	              y.slides[e] && y.lazy.loadImageInSlide(e);
	            }
	          } else {
	            var n = y.wrapper.children("." + y.params.slideNextClass);n.length > 0 && y.lazy.loadImageInSlide(n.index());var o = y.wrapper.children("." + y.params.slidePrevClass);o.length > 0 && y.lazy.loadImageInSlide(o.index());
	          }
	        }, onTransitionStart: function onTransitionStart() {
	          y.params.lazyLoading && (y.params.lazyLoadingOnTransitionStart || !y.params.lazyLoadingOnTransitionStart && !y.lazy.initialImageLoaded) && y.lazy.load();
	        }, onTransitionEnd: function onTransitionEnd() {
	          y.params.lazyLoading && !y.params.lazyLoadingOnTransitionStart && y.lazy.load();
	        } }, y.scrollbar = { isTouched: !1, setDragPosition: function setDragPosition(e) {
	          var a = y.scrollbar,
	              t = y.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
	              s = t - a.track.offset()[y.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
	              r = -y.minTranslate() * a.moveDivider,
	              i = -y.maxTranslate() * a.moveDivider;r > s ? s = r : s > i && (s = i), s = -s / a.moveDivider, y.updateProgress(s), y.setWrapperTranslate(s, !0);
	        }, dragStart: function dragStart(e) {
	          var a = y.scrollbar;a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), y.params.scrollbarHide && a.track.css("opacity", 1), y.wrapper.transition(100), a.drag.transition(100), y.emit("onScrollbarDragStart", y);
	        }, dragMove: function dragMove(e) {
	          var a = y.scrollbar;a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), y.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), y.emit("onScrollbarDragMove", y));
	        }, dragEnd: function dragEnd(e) {
	          var a = y.scrollbar;a.isTouched && (a.isTouched = !1, y.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
	            a.track.css("opacity", 0), a.track.transition(400);
	          }, 1e3)), y.emit("onScrollbarDragEnd", y), y.params.scrollbarSnapOnRelease && y.slideReset());
	        }, enableDraggable: function enableDraggable() {
	          var e = y.scrollbar,
	              t = y.support.touch ? e.track : document;a(e.track).on(y.touchEvents.start, e.dragStart), a(t).on(y.touchEvents.move, e.dragMove), a(t).on(y.touchEvents.end, e.dragEnd);
	        }, disableDraggable: function disableDraggable() {
	          var e = y.scrollbar,
	              t = y.support.touch ? e.track : document;a(e.track).off(y.touchEvents.start, e.dragStart), a(t).off(y.touchEvents.move, e.dragMove), a(t).off(y.touchEvents.end, e.dragEnd);
	        }, set: function set() {
	          if (y.params.scrollbar) {
	            var e = y.scrollbar;e.track = a(y.params.scrollbar), y.params.uniqueNavElements && "string" == typeof y.params.scrollbar && e.track.length > 1 && 1 === y.container.find(y.params.scrollbar).length && (e.track = y.container.find(y.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = y.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = y.size / y.virtualSize, e.moveDivider = e.divider * (e.trackSize / y.size), e.dragSize = e.trackSize * e.divider, y.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", y.params.scrollbarHide && (e.track[0].style.opacity = 0);
	          }
	        }, setTranslate: function setTranslate() {
	          if (y.params.scrollbar) {
	            var e,
	                a = y.scrollbar,
	                t = (y.translate || 0, a.dragSize);e = (a.trackSize - a.dragSize) * y.progress, y.rtl && y.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), y.isHorizontal() ? (y.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (y.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), y.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
	              a.track[0].style.opacity = 0, a.track.transition(400);
	            }, 1e3));
	          }
	        }, setTransition: function setTransition(e) {
	          y.params.scrollbar && y.scrollbar.drag.transition(e);
	        } }, y.controller = { LinearSpline: function LinearSpline(e, a) {
	          this.x = e, this.y = a, this.lastIndex = e.length - 1;var t, s;this.x.length;this.interpolate = function (e) {
	            return e ? (s = r(this.x, e), t = s - 1, (e - this.x[t]) * (this.y[s] - this.y[t]) / (this.x[s] - this.x[t]) + this.y[t]) : 0;
	          };var r = function () {
	            var e, a, t;return function (s, r) {
	              for (a = -1, e = s.length; e - a > 1;) {
	                s[t = e + a >> 1] <= r ? a = t : e = t;
	              }return e;
	            };
	          }();
	        }, getInterpolateFunction: function getInterpolateFunction(e) {
	          y.controller.spline || (y.controller.spline = y.params.loop ? new y.controller.LinearSpline(y.slidesGrid, e.slidesGrid) : new y.controller.LinearSpline(y.snapGrid, e.snapGrid));
	        }, setTranslate: function setTranslate(e, a) {
	          function s(a) {
	            e = a.rtl && "horizontal" === a.params.direction ? -y.translate : y.translate, "slide" === y.params.controlBy && (y.controller.getInterpolateFunction(a), i = -y.controller.spline.interpolate(-e)), i && "container" !== y.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (y.maxTranslate() - y.minTranslate()), i = (e - y.minTranslate()) * r + a.minTranslate()), y.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, y), a.updateActiveIndex();
	          }var r,
	              i,
	              n = y.params.control;if (y.isArray(n)) for (var o = 0; o < n.length; o++) {
	            n[o] !== a && n[o] instanceof t && s(n[o]);
	          } else n instanceof t && a !== n && s(n);
	        }, setTransition: function setTransition(e, a) {
	          function s(a) {
	            a.setWrapperTransition(e, y), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
	              i && (a.params.loop && "slide" === y.params.controlBy && a.fixLoop(), a.onTransitionEnd());
	            }));
	          }var r,
	              i = y.params.control;if (y.isArray(i)) for (r = 0; r < i.length; r++) {
	            i[r] !== a && i[r] instanceof t && s(i[r]);
	          } else i instanceof t && a !== i && s(i);
	        } }, y.hashnav = { init: function init() {
	          if (y.params.hashnav) {
	            y.hashnav.initialized = !0;var e = document.location.hash.replace("#", "");if (e) for (var a = 0, t = 0, s = y.slides.length; s > t; t++) {
	              var r = y.slides.eq(t),
	                  i = r.attr("data-hash");if (i === e && !r.hasClass(y.params.slideDuplicateClass)) {
	                var n = r.index();y.slideTo(n, a, y.params.runCallbacksOnInit, !0);
	              }
	            }
	          }
	        }, setHash: function setHash() {
	          y.hashnav.initialized && y.params.hashnav && (document.location.hash = y.slides.eq(y.activeIndex).attr("data-hash") || "");
	        } }, y.disableKeyboardControl = function () {
	        y.params.keyboardControl = !1, a(document).off("keydown", l);
	      }, y.enableKeyboardControl = function () {
	        y.params.keyboardControl = !0, a(document).on("keydown", l);
	      }, y.mousewheel = { event: !1, lastScrollTime: new window.Date().getTime() }, y.params.mousewheelControl) {
	        try {
	          new window.WheelEvent("wheel"), y.mousewheel.event = "wheel";
	        } catch (O) {
	          (window.WheelEvent || y.container[0] && "wheel" in y.container[0]) && (y.mousewheel.event = "wheel");
	        }!y.mousewheel.event && window.WheelEvent, y.mousewheel.event || void 0 === document.onmousewheel || (y.mousewheel.event = "mousewheel"), y.mousewheel.event || (y.mousewheel.event = "DOMMouseScroll");
	      }y.disableMousewheelControl = function () {
	        return y.mousewheel.event ? (y.container.off(y.mousewheel.event, p), !0) : !1;
	      }, y.enableMousewheelControl = function () {
	        return y.mousewheel.event ? (y.container.on(y.mousewheel.event, p), !0) : !1;
	      }, y.parallax = { setTranslate: function setTranslate() {
	          y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
	            d(this, y.progress);
	          }), y.slides.each(function () {
	            var e = a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
	              var a = Math.min(Math.max(e[0].progress, -1), 1);d(this, a);
	            });
	          });
	        }, setTransition: function setTransition(e) {
	          "undefined" == typeof e && (e = y.params.speed), y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
	            var t = a(this),
	                s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;0 === e && (s = 0), t.transition(s);
	          });
	        } }, y._plugins = [];for (var N in y.plugins) {
	        var R = y.plugins[N](y, y.params[N]);R && y._plugins.push(R);
	      }return y.callPlugins = function (e) {
	        for (var a = 0; a < y._plugins.length; a++) {
	          e in y._plugins[a] && y._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        }
	      }, y.emitterEventListeners = {}, y.emit = function (e) {
	        y.params[e] && y.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);var a;if (y.emitterEventListeners[e]) for (a = 0; a < y.emitterEventListeners[e].length; a++) {
	          y.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        }y.callPlugins && y.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	      }, y.on = function (e, a) {
	        return e = u(e), y.emitterEventListeners[e] || (y.emitterEventListeners[e] = []), y.emitterEventListeners[e].push(a), y;
	      }, y.off = function (e, a) {
	        var t;if (e = u(e), "undefined" == typeof a) return y.emitterEventListeners[e] = [], y;if (y.emitterEventListeners[e] && 0 !== y.emitterEventListeners[e].length) {
	          for (t = 0; t < y.emitterEventListeners[e].length; t++) {
	            y.emitterEventListeners[e][t] === a && y.emitterEventListeners[e].splice(t, 1);
	          }return y;
	        }
	      }, y.once = function (e, a) {
	        e = u(e);var t = function t() {
	          a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), y.off(e, t);
	        };return y.on(e, t), y;
	      }, y.a11y = { makeFocusable: function makeFocusable(e) {
	          return e.attr("tabIndex", "0"), e;
	        }, addRole: function addRole(e, a) {
	          return e.attr("role", a), e;
	        }, addLabel: function addLabel(e, a) {
	          return e.attr("aria-label", a), e;
	        }, disable: function disable(e) {
	          return e.attr("aria-disabled", !0), e;
	        }, enable: function enable(e) {
	          return e.attr("aria-disabled", !1), e;
	        }, onEnterKey: function onEnterKey(e) {
	          13 === e.keyCode && (a(e.target).is(y.params.nextButton) ? (y.onClickNext(e), y.isEnd ? y.a11y.notify(y.params.lastSlideMessage) : y.a11y.notify(y.params.nextSlideMessage)) : a(e.target).is(y.params.prevButton) && (y.onClickPrev(e), y.isBeginning ? y.a11y.notify(y.params.firstSlideMessage) : y.a11y.notify(y.params.prevSlideMessage)), a(e.target).is("." + y.params.bulletClass) && a(e.target)[0].click());
	        }, liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'), notify: function notify(e) {
	          var a = y.a11y.liveRegion;0 !== a.length && (a.html(""), a.html(e));
	        }, init: function init() {
	          y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.a11y.makeFocusable(y.nextButton), y.a11y.addRole(y.nextButton, "button"), y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.a11y.makeFocusable(y.prevButton), y.a11y.addRole(y.prevButton, "button"), y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)), a(y.container).append(y.a11y.liveRegion);
	        }, initPagination: function initPagination() {
	          y.params.pagination && y.params.paginationClickable && y.bullets && y.bullets.length && y.bullets.each(function () {
	            var e = a(this);y.a11y.makeFocusable(e), y.a11y.addRole(e, "button"), y.a11y.addLabel(e, y.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1));
	          });
	        }, destroy: function destroy() {
	          y.a11y.liveRegion && y.a11y.liveRegion.length > 0 && y.a11y.liveRegion.remove();
	        } }, y.init = function () {
	        y.params.loop && y.createLoop(), y.updateContainerSize(), y.updateSlidesSize(), y.updatePagination(), y.params.scrollbar && y.scrollbar && (y.scrollbar.set(), y.params.scrollbarDraggable && y.scrollbar.enableDraggable()), "slide" !== y.params.effect && y.effects[y.params.effect] && (y.params.loop || y.updateProgress(), y.effects[y.params.effect].setTranslate()), y.params.loop ? y.slideTo(y.params.initialSlide + y.loopedSlides, 0, y.params.runCallbacksOnInit) : (y.slideTo(y.params.initialSlide, 0, y.params.runCallbacksOnInit), 0 === y.params.initialSlide && (y.parallax && y.params.parallax && y.parallax.setTranslate(), y.lazy && y.params.lazyLoading && (y.lazy.load(), y.lazy.initialImageLoaded = !0))), y.attachEvents(), y.params.observer && y.support.observer && y.initObservers(), y.params.preloadImages && !y.params.lazyLoading && y.preloadImages(), y.params.autoplay && y.startAutoplay(), y.params.keyboardControl && y.enableKeyboardControl && y.enableKeyboardControl(), y.params.mousewheelControl && y.enableMousewheelControl && y.enableMousewheelControl(), y.params.hashnav && y.hashnav && y.hashnav.init(), y.params.a11y && y.a11y && y.a11y.init(), y.emit("onInit", y);
	      }, y.cleanupStyles = function () {
	        y.container.removeClass(y.classNames.join(" ")).removeAttr("style"), y.wrapper.removeAttr("style"), y.slides && y.slides.length && y.slides.removeClass([y.params.slideVisibleClass, y.params.slideActiveClass, y.params.slideNextClass, y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), y.paginationContainer && y.paginationContainer.length && y.paginationContainer.removeClass(y.params.paginationHiddenClass), y.bullets && y.bullets.length && y.bullets.removeClass(y.params.bulletActiveClass), y.params.prevButton && a(y.params.prevButton).removeClass(y.params.buttonDisabledClass), y.params.nextButton && a(y.params.nextButton).removeClass(y.params.buttonDisabledClass), y.params.scrollbar && y.scrollbar && (y.scrollbar.track && y.scrollbar.track.length && y.scrollbar.track.removeAttr("style"), y.scrollbar.drag && y.scrollbar.drag.length && y.scrollbar.drag.removeAttr("style"));
	      }, y.destroy = function (e, a) {
	        y.detachEvents(), y.stopAutoplay(), y.params.scrollbar && y.scrollbar && y.params.scrollbarDraggable && y.scrollbar.disableDraggable(), y.params.loop && y.destroyLoop(), a && y.cleanupStyles(), y.disconnectObservers(), y.params.keyboardControl && y.disableKeyboardControl && y.disableKeyboardControl(), y.params.mousewheelControl && y.disableMousewheelControl && y.disableMousewheelControl(), y.params.a11y && y.a11y && y.a11y.destroy(), y.emit("onDestroy"), e !== !1 && (y = null);
	      }, y.init(), y;
	    }
	  };t.prototype = { isSafari: function () {
	      var e = navigator.userAgent.toLowerCase();return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
	    }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent), isArray: function isArray(e) {
	      return "[object Array]" === Object.prototype.toString.apply(e);
	    }, browser: { ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled, ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1 }, device: function () {
	      var e = navigator.userAgent,
	          a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
	          t = e.match(/(iPad).*OS\s([\d_]+)/),
	          s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
	          r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);return { ios: t || r || s, android: a };
	    }(), support: { touch: window.Modernizr && Modernizr.touch === !0 || function () {
	        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
	      }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
	        var e = document.createElement("div").style;return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
	      }(), flexbox: function () {
	        for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) {
	          if (a[t] in e) return !0;
	        }
	      }(), observer: function () {
	        return "MutationObserver" in window || "WebkitMutationObserver" in window;
	      }() }, plugins: {} };for (var s = ["jQuery", "Zepto", "Dom7"], r = 0; r < s.length; r++) {
	    window[s[r]] && e(window[s[r]]);
	  }var i;i = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, i && ("transitionEnd" in i.fn || (i.fn.transitionEnd = function (e) {
	    function a(i) {
	      if (i.target === this) for (e.call(this, i), t = 0; t < s.length; t++) {
	        r.off(s[t], a);
	      }
	    }var t,
	        s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
	        r = this;if (e) for (t = 0; t < s.length; t++) {
	      r.on(s[t], a);
	    }return this;
	  }), "transform" in i.fn || (i.fn.transform = function (e) {
	    for (var a = 0; a < this.length; a++) {
	      var t = this[a].style;t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
	    }return this;
	  }), "transition" in i.fn || (i.fn.transition = function (e) {
	    "string" != typeof e && (e += "ms");for (var a = 0; a < this.length; a++) {
	      var t = this[a].style;t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
	    }return this;
	  })), window.Swiper = t;
	}(),  true ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
	  "use strict";
	  return window.Swiper;
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var drawCanvas = __webpack_require__(6);

	var renderAnalysisReportPage = function renderAnalysisReportPage(reportData) {
		// 概率圆环
		var enrollCanvas = document.getElementById('enroll-canvas');
		var context = enrollCanvas.getContext('2d');
		var radius = 70;
		enrollCanvas.width = enrollCanvas.parentNode.clientWidth;
		enrollCanvas.height = enrollCanvas.width - 60;

		var centerX = enrollCanvas.width / 2;
		var centerY = enrollCanvas.height / 2;

		drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#e4e4e4', 8, radius, 1);
		drawCanvas.drawCircle(context, centerX, centerY, '#ffffff', '#f9be00', 10, radius, 0.4, 'round');
		context.textBaseline = 'middle';
		context.textAlign = "center";

		drawCanvas.drawCircleText(context, 'normal 36pt serif', '#f9be00', '40', centerX - 10, centerY - 16);
		drawCanvas.drawCircleText(context, 'normal 18pt serif', '#f9be00', '%', centerX + 35, centerY - 10);
		drawCanvas.drawCircleText(context, 'normal 16px serif', '#b6b6b6', '录取概率', centerX, centerY + 22);

		// canvas 折线图
		/**
	  *  width: 100%;
	  *  max-width: 600px;
	  *  height: 500px;
	  **/
		var canvas = document.getElementById('line-chart-canvas'),
		    context = canvas.getContext('2d');

		canvas.width = canvas.parentNode.clientWidth;

		canvas.height = canvas.parentNode.clientHeight - 50;

		var originData = [{ "ranking": 10700, "year": 2013 }, { "ranking": 5326, "year": 2014 }, { "ranking": 5000, "year": 2015 }, { "ranking": 6000, "year": 2016 }];

		var startX = 0;
		var startY = 40;
		var widthMargin = canvas.width / 4;
		var labelWitth = widthMargin;
		var coordData;
		var lowestPercent = 1;
		var offsetY;

		var yearColor = {
			dotColor: "#999999",
			lineColor: "#999999"
		};
		var historyColor = {
			dotColor: "#f9be00",
			lineColor: "#f9be00"
		};
		var currentColor = {
			dotColor: "#eb614c",
			lineColor: "#eda89d"
		};
		coordData = drawCanvas.setCoordinate(originData, startX, startY, widthMargin, 400, lowestPercent);

		offsetY = lowestPercent < 0.01 ? 80 : lowestPercent < 0.1 ? 50 : 30;

		drawCanvas.drawCoordinate(context, coordData, yearColor, historyColor, currentColor, 20, labelWitth, canvas.width, canvas.height, offsetY);
		drawCanvas.drawLabel(context, coordData, 36, 8, 20, canvas.height, offsetY, labelWitth, canvas.width);

		// 录取人数最多的五个院校
		var canvas = document.getElementById('trapezoid-canvas');
		var trapezoidParentNodeWidth = canvas.parentNode.clientWidth;

		canvas.width = trapezoidParentNodeWidth - 60;
		canvas.height = canvas.width * (300 / 750) * (64 / 300) * 5 + 50 + 35; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度
		var context = canvas.getContext('2d');
		var contextFontStyle;
		var width = canvas.width * (360 / 750);

		if (trapezoidParentNodeWidth >= 640) {
			contextFontStyle = "normal normal 24px serif";
			width = canvas.width * (420 / 750);
			canvas.height = canvas.width * (420 / 750) * (64 / 300) * 5 + 50 + 35;
		} else if (trapezoidParentNodeWidth >= 414) {
			contextFontStyle = "normal normal 20px serif";
			width = canvas.width * (360 / 750);
			canvas.height = canvas.width * (360 / 750) * (64 / 300) * 5 + 50 + 35;
		} else if (trapezoidParentNodeWidth >= 320) {
			contextFontStyle = "normal normal 16px serif";
			width = canvas.width * (320 / 750);
			canvas.height = canvas.width * (320 / 750) * (64 / 300) * 5 + 50 + 35; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度
		} else {
			contextFontStyle = "normal normal 16px serif";
			width = canvas.width * (320 / 750);
			canvas.height = canvas.width * (320 / 750) * (64 / 300) * 5 + 50 + 35; // 286/750 为梯形宽度占比，64/286为高度占比， 50为每个梯形的间隙， 20为标题高度
		}
		var height = width * (64 / 286);

		var schoolData = [{ "studentNumber": 319000, "schoolName": "中山大学" }, { "studentNumber": 100, "schoolName": "华南理工大学" }, { "studentNumber": 80, "schoolName": "华南理工大学" }, { "studentNumber": 50, "schoolName": "华南理工大学" }, { "studentNumber": 9, "schoolName": "华南理工大学" }];
		var trapezoidStyle = ["#f9be00", "#fac724", "#fbd149", "#fcda6d", "#fce392"],
		    schoolNumNameStyle = {
			"numStyle": "#ffffff",
			"nameStyle": "#000000"
		},
		    lineDotStyle = {
			"strokeStyle": "#ccdbe1",
			"fillStyle": "#ffffff"
		};

		drawCanvas.drawTrapezoid(context, width, height, schoolData, trapezoidStyle, schoolNumNameStyle, lineDotStyle, "（考生数量）", 6, contextFontStyle);
	};

	module.exports = {
		renderAnalysisReportPage: renderAnalysisReportPage
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _url = __webpack_require__(4);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var init = function init(xinSwiper) {
		// 监听获取vip体验卡按钮
		$("#vip-btn").on("click", function () {
			getVip(xinSwiper);
		});
		// 监听获取验证码按钮
		$(document).on("click", ".get-auto-code", function () {
			console.log("xdd");
			getAutoCode(xinSwiper);
		});
	};
	///检查输入的手机号码
	var checkMobile = function checkMobile(mobile) {
		if (!mobile) {
			alert("请先输入手机号码！");
			return false;
		} else if (!/^1[34578]\d{9}$/.test(mobile)) {
			alert("手机号码格式不正确，请检查");
			return false;
		} else {
			return true;
		};
	};
	// 改变获取验证码按钮
	var countdown = 120,
	    $getAutoCode = $("#get-auto-code");
	var changeAutoCode = function changeAutoCode() {
		if (countdown === 0) {
			$getAutoCode.addClass('get-auto-code');
			$getAutoCode.text("发送验证码");
			countdown = 120;
		} else {
			$getAutoCode.removeClass("get-auto-code");
			$getAutoCode.text("重新发送(" + countdown + ")");
			countdown--;
			setTimeout(function () {
				changeAutoCode();
			}, 1000);
		};
	};
	var getAutoCode = function getAutoCode(xinSwiper) {
		var mobile = $("#mobile").val();
		if (!checkMobile(mobile)) {
			return;
		};
		changeAutoCode();
		$.ajax({
			type: "post",
			cache: false,
			url: _url2.default.autoUrl,
			data: $(".vip-form").serialize(),
			success: function success(data) {
				console.log(data);
				switch (data.code) {
					case 0:
						break;
					case 11007:
						alert("短信验证码已经发送");
						break;
					case 12001:
						alert("手机号码格式错误");
						break;
					case 11301:
						alert("您已领取过体验卡");
						break;
					default:
						break;
				}
			},
			error: function error(request, _error) {
				alert("服务器错误！");
			}
		});
	};
	var getVip = function getVip(xinSwiper) {
		var mobile = $("#mobile").val(),
		    autoCode = $("#auto-code").val();
		if (!checkMobile(mobile)) {
			return;
		};
		if (!autoCode) {
			alert("请输入验证码！");
			return;
		};
		$.ajax({
			type: "post",
			cache: false,
			url: _url2.default.vipUrl,
			data: $(".vip-form").serialize(),
			success: function success(data) {
				console.log(data);
				switch (data.code) {
					case 0:
						$(".result-text .text").text("领取成功！");
						xinSwiper.slideNext();
						break;
					case 11301:
						alert("您已领取过体验卡");
					case 11302:
						alert("体验卡已经被领取完了");
					case 10005:
						alert("短信验证码不合法");
					default:
						break;
				}
			},
			error: function error(request, _error2) {
				alert("服务器错误！");
			}
		});
	};
	module.exports = {
		init: init
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		autoUrl: "/get-auto-code",
		vipUrl: "/get-vip",
		analysisReportUrl: "/score/analysis"
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var swiperToAyalysisReport = __webpack_require__(7);
	var init = function init(xinSwiper) {
		$("#get-report").on("click", function () {
			var data = {
				req_id: "",
				exam_no: "",
				province_id: "",
				score: "",
				exp_sch_id: "",
				batch: ""
			};
			swiperToAyalysisReport.getAnalysisReportData(data, xinSwiper);
		});
	};
	module.exports = {
		init: init
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	function drawCircle(ctx, x, y, fillStyle, strokeStyle, lineWidth, radius, angle, lineCap) {
		ctx.beginPath();
		ctx.arc(x, y, radius, -0.5 * Math.PI, (angle * 2 - 0.5) * Math.PI, false);
		ctx.fillStyle = fillStyle;
		ctx.fill();
		ctx.lineWidth = lineWidth;
		if (lineCap) {
			ctx.lineCap = lineCap;
		}
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}

	function drawCircleText(ctx, font, fillStyle, content, x, y) {
		ctx.font = font;
		ctx.fillStyle = fillStyle;
		ctx.fillText(content, x, y);
	}

	/**
	 *  获取输入数据的坐标
	 *  @param { [{},{}] } originData 排名 年份
	 *  @param {Number} 第一个点的横坐标 偏移量
	 *  @param {Number} 年份点纵坐标偏移量，年份虚线纵坐标偏移量再次基础上加上50
	 *  @param {Number} 年份竖线之前的间距
	 *  @param {Number} canvas的高度
	 * */
	function setCoordinate(originData, startX, startY, widthMargin, canvasHeight, lowestPercent) {

		var coordData = [];
		var x;
		var y;
		var rankMaxStr;
		var rankMax = 0;
		var heightPercent;
		var len = originData.length;

		for (var i = 0; i < len; i++) {
			rankMax = originData[i].ranking > rankMax ? originData[i].ranking : rankMax;
		}
		rankMaxStr = "" + rankMax;

		if (rankMaxStr.length <= 3) {
			rankMax += 5 * Math.pow(10, rankMaxStr.length - 2);
		} else if (rankMaxStr.length <= 6) {
			rankMax += 3 * Math.pow(10, rankMaxStr.length - 2);
		} else {
			rankMax += 1 * Math.pow(10, rankMaxStr.length - 2);
		}

		for (var i = 0; i < len; i++) {
			x = startX + widthMargin * i;
			heightPercent = originData[i].ranking / rankMax;

			lowestPercent = heightPercent > lowestPercent ? lowestPercent : heightPercent;

			y = startY + originData[i].ranking / rankMax * canvasHeight;

			coordData.push({
				"x": x,
				"y": y,
				"ranking": originData[i].ranking,
				"year": originData[i].year,
				"heightPercent": heightPercent
			});
		}

		return coordData;
	}

	/**
	 *  画点线: 年份的竖线， 往年录取点线， 当前排名点线
	 *  @param { Array } 点坐标
	 *  @param {Object} 年份颜色
	 *  @param {Object} 往年录取颜色
	 *  @param {Object} 当前排名点线颜色值
	 * */
	function drawCoordinate(ctx, coord, yearColor, historyColor, currentColor, startY, labelWidth, canvasWidth, canvasHeight, offsetY) {
		var len = coord.length;

		// 过往年份 text、竖线、圆点
		var year;
		var x;
		var y;
		var lineHeight;
		var linePercent;
		var coordLen = coord.length;
		var lineStartY = startY + offsetY;

		lineHeight = canvasHeight - lineStartY;
		for (var i = 0; i < len - 1; i++) {
			year = parseFloat(coord[i].year);
			x = parseFloat(coord[i].x);
			y = parseFloat(coord[i].y);
			linePercent = parseFloat(coord[i].heightPercent);

			ctx.font = 'normal 12pt Calibri';
			ctx.fillStyle = yearColor.dotColor;
			ctx.fillText(year, x + labelWidth / 2 - 16, startY);

			ctx.setLineDash([1, 2]);
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = yearColor;
			ctx.moveTo(x + labelWidth / 2, lineStartY);
			ctx.lineTo(x + labelWidth / 2, canvasHeight);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.fillStyle = historyColor.dotColor;
			ctx.arc(x + labelWidth / 2, lineStartY + lineHeight * linePercent, 6, 0, 2 * Math.PI);
			ctx.fill();
		}

		// 当前 点、线
		x = coord[coordLen - 1].x;
		y = coord[coordLen - 1].y;
		linePercent = coord[coordLen - 1].heightPercent;

		ctx.setLineDash([8, 6]);
		ctx.beginPath();
		ctx.strokeStyle = currentColor.lineColor;
		ctx.lineWidth = 2;
		ctx.moveTo(0, lineStartY + lineHeight * linePercent);
		ctx.lineTo(canvasWidth, lineStartY + lineHeight * linePercent);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = currentColor.dotColor;
		ctx.arc(x + labelWidth / 2, lineStartY + lineHeight * linePercent, 6, 0, 2 * Math.PI);
		ctx.fill();

		// 过往历史折线
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = historyColor.lineColor;
		ctx.setLineDash([1, 0]);

		if (coord[0]) {
			x = parseFloat(coord[0].x);
			y = parseFloat(coord[0].y);
			linePercent = parseFloat(coord[0].heightPercent);
			ctx.moveTo(x + labelWidth / 2, lineStartY + lineHeight * linePercent);
		}

		if (coord[1]) {
			x = parseFloat(coord[1].x);
			y = parseFloat(coord[1].y);
			linePercent = parseFloat(coord[1].heightPercent);
			ctx.lineTo(x + labelWidth / 2, lineStartY + lineHeight * linePercent);

			if (3 == coordLen) {
				ctx.stroke();
			}
		}

		if (coord[2] && coordLen > 3) {
			x = parseFloat(coord[2].x);
			y = parseFloat(coord[2].y);
			linePercent = parseFloat(coord[2].heightPercent);
			ctx.lineTo(x + labelWidth / 2, lineStartY + lineHeight * linePercent);
			ctx.stroke();
		}
	}

	/**
	 * 标注:
	 *
	 *
	 *
	 *
	 * */
	function drawLabel(ctx, coord, labelHeight, radius, startY, canvasHeight, offsetY, labelWidth, canvasWidth) {

		if (typeof radius === 'undefined') {
			radius = 5;
		}
		if (typeof radius === 'number') {
			radius = { tl: radius, tr: radius, br: radius, bl: radius };
		} else {
			var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
			for (var side in defaultRadius) {
				radius[side] = radius[side] || defaultRadius[side];
			}
		}

		// 从点的位置开始(x, y)
		var len = coord.length;
		var x, y;
		var ranking, rankingStr;
		var width;
		var linePercent;
		var lineStartY = startY + offsetY;
		var lineHeight = canvasHeight - lineStartY;
		for (var i = 0; i < len; i++) {
			x = coord[i].x;
			y = coord[i].y;
			ranking = coord[i].ranking;
			linePercent = coord[i].heightPercent;
			rankingStr = "" + ranking;
			y = lineStartY + lineHeight * linePercent;

			switch (rankingStr.length) {
				case 1:
				case 2:
					width = 70;
					break;
				case 3:
				case 4:
				case 5:
				case 6:
					width = 85;
					break;
				case 7:
				case 8:
					width = 90;
					break;
				case 9:
					width = 95;
					break;
				default:
					width = 100;
					break;

			}

			if (canvasWidth < 320) {
				width -= 10;
			}

			ctx.strokeStyle = "#3e3a39";
			ctx.fillStyle = "#3e3a39";
			if (i == len - 1) {
				ctx.strokeStyle = "#eb614c";
				ctx.fillStyle = "#eb614c";
			}

			y -= 58;
			x += labelWidth / 2 - width / 2;

			ctx.beginPath();
			ctx.lineTo(x + width / 2, y + labelHeight + 10);
			ctx.lineTo(x + width / 2 - 10, y + labelHeight);
			ctx.lineTo(x + radius.bl, y + labelHeight);
			ctx.quadraticCurveTo(x, y + labelHeight, x, y + labelHeight - radius.bl);
			ctx.lineTo(x, y + radius.tl);
			ctx.quadraticCurveTo(x, y, x + radius.tl, y);
			ctx.lineTo(x + radius.tl, y);
			ctx.lineTo(x + width - radius.tr, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
			ctx.lineTo(x + width, y + labelHeight - radius.br);
			ctx.quadraticCurveTo(x + width, y + labelHeight, x + width - radius.br, y + labelHeight);
			ctx.lineTo(x + width / 2 + 10, y + labelHeight);
			ctx.closePath();
			ctx.fill();

			if (ranking) {
				ctx.font = 'normal 12pt Calibri';
				ctx.fillStyle = '#ffffff';
				switch (rankingStr.length) {
					case 1:
					case 2:
						x += 20;
						break;
					case 3:
					case 4:
					case 5:
						x += 15;
						break;
					case 6:
					case 7:
						x += 10;
						break;
					default:
						x += 10;
						break;

				}
				ctx.fillText(ranking + "名", x, y + 25);
			}
			if (i == len - 1) {
				ctx.font = 'normal 12pt Calibri';
				ctx.fillStyle = '#eb614c';
				ctx.fillText("你的排名", x + width / 2 - 40, y + 86);
			}
		}
	}

	/**
	 * 梯形宽度计算方式
	 * 第一个梯形宽度固定宽度为父元素宽度的 286/750，高度是宽度的 64/286
	 *
	 * 每个梯形需确定: 1.左上角坐标(x,y) 2.第一个梯形的高宽(width, height)
	 *
	 * 传参 第一个梯形的宽高 width，height
	 *
	 * */
	function drawTrapezoid(ctx, initWidth, initHeight, schoolList, trapezoidStyle, schoolNumNameStyle, lineDotStyle, title, trapezoidGap, contextFontStyle) {
		var lineFinal = 0;
		var startX;
		var startY;
		var trapezoidWidthDown;
		var schoolListItem;
		var offsetY = 0;

		if (!trapezoidGap) {
			trapezoidGap = 10;
		}

		if (!contextFontStyle) {
			contextFontStyle = "18px serif";
		}
		// 标题
		if (title) {
			ctx.font = contextFontStyle;
			ctx.fillStyle = '#bebebe';
			if (initWidth < 120) {
				ctx.fillText(title, initWidth / 2 - 50, 25);
			} else if (initWidth < 140) {
				ctx.fillText(title, initWidth / 2 - 58, 25);
			} else {
				ctx.fillText(title, initWidth / 2 - 66, 25);
			}

			offsetY = 40;
		}

		for (var i = 0, len = schoolList.length; i < len; i++) {
			schoolListItem = schoolList[i];
			startX = (initHeight + trapezoidGap) * i * (18 / 64);
			startY = (initHeight + trapezoidGap) * i + offsetY;
			trapezoidWidthDown = initWidth - 2 * startX;

			if (!lineFinal) {
				lineFinal = startX + trapezoidWidthDown + 20;
			}

			// 画梯形
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(startX + trapezoidWidthDown, startY);
			ctx.lineTo(startX + trapezoidWidthDown - initHeight * (18 / 64), startY + initHeight);
			ctx.lineTo(startX + initHeight * (18 / 64), startY + initHeight);
			ctx.closePath();

			// add linear gradient
			var grd = ctx.createLinearGradient(0, 0, initWidth, initHeight);

			if (trapezoidStyle[i]) {
				grd.addColorStop(0, trapezoidStyle[i]); // light
				grd.addColorStop(1, trapezoidStyle[i]); // dark
			} else {
				grd.addColorStop(0, '#f9be00'); // light
				grd.addColorStop(1, '#f9be00'); // dark
			}
			ctx.fillStyle = grd;
			ctx.fill();

			// 直线、圆点
			ctx.beginPath();
			ctx.moveTo(startX + trapezoidWidthDown * (250 / 286), startY + initHeight / 2);
			ctx.lineTo(lineFinal, startY + initHeight / 2);
			if (lineDotStyle.strokeStyle) {
				ctx.strokeStyle = lineDotStyle.strokeStyle;
			} else {
				ctx.strokeStyle = "##ccdbe1";
			}
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(startX + trapezoidWidthDown * (250 / 286), startY + initHeight / 2, 3, 0, 2 * Math.PI, true);
			if (lineDotStyle.fillStyle) {
				ctx.fillStyle = lineDotStyle.fillStyle;
			} else {
				ctx.fillStyle = "#ffffff";
			}
			ctx.fill();

			// 考生数量
			ctx.font = contextFontStyle;
			if (schoolNumNameStyle.fillStyle) {
				ctx.fillStyle = schoolNumNameStyle.numStyle;
			} else {
				ctx.fillStyle = '#ffffff';
			}
			// 根据数量长度设置 x 方向的偏移量
			var numOffset = 0;
			var studentNumberStr = schoolListItem["studentNumber"] + "";
			switch (studentNumberStr.length) {
				case 1:
					numOffset = startX + trapezoidWidthDown / 2 - 6;
					break;
				case 2:
					numOffset = startX + trapezoidWidthDown / 2 - 10;
					break;
				case 3:
					numOffset = startX + trapezoidWidthDown / 2 - 16;
					break;
				case 4:
					numOffset = startX + trapezoidWidthDown / 2 - 20;
					break;
				case 5:
					numOffset = startX + trapezoidWidthDown / 2 - 24;
					break;
				case 6:
					numOffset = startX + trapezoidWidthDown / 2 - 28;
					break;
				default:
					numOffset = startX + trapezoidWidthDown / 2 - 22;
					break;
			}
			ctx.fillText(schoolListItem["studentNumber"], numOffset, startY + initHeight / 2 + 6);

			// 学校名称
			ctx.font = contextFontStyle;
			if (schoolNumNameStyle.fillStyle) {
				ctx.fillStyle = schoolNumNameStyle.nameStyle;
			} else {
				ctx.fillStyle = '#000000';
			}
			ctx.fillText(schoolListItem["schoolName"], lineFinal + 8, startY + initHeight / 2 + 6);
		}
	}

	module.exports = {
		drawCircle: drawCircle,
		drawCircleText: drawCircleText,
		setCoordinate: setCoordinate,
		drawCoordinate: drawCoordinate,
		drawLabel: drawLabel,
		drawTrapezoid: drawTrapezoid
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _url = __webpack_require__(4);

	var _url2 = _interopRequireDefault(_url);

	var _analysisReport = __webpack_require__(2);

	var _analysisReport2 = _interopRequireDefault(_analysisReport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function gotoAnalysisReportPage(requestParam, xinSwiper) {

		$.ajax({
			type: "post",
			cache: false,
			url: _url2.default.analysisReportUrl,
			data: requestParam,
			success: function success(data) {
				console.log(data);

				_analysisReport2.default.renderAnalysisReportPage(data);
				xinSwiper.slideNext();
			},
			error: function error() {
				_analysisReport2.default.renderAnalysisReportPage();
				xinSwiper.slideNext();
				alert("服务器错误！");
			}
		});
	}

	module.exports = {
		getAnalysisReportData: gotoAnalysisReportPage
	};

/***/ }
/******/ ]);