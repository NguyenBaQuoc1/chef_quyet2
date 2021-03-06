/*-----------------------------------------------------------------------------------

    Theme Name: Agrikon
    Description: Creative Agency & Portfolio WordPress Theme
    Author: Ninetheme
    Author URI: https://ninetheme.com/
    Version: 1.0

-----------------------------------------------------------------------------------*/


(function(window, document, $) {

    "use strict";

    var doc = $(document),
        win = $(window),
        body = $('body');

    function agrikonMainHeaderSticky() {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 0;
          var stricky = $(".stricked-menu");
          if ( $(window).scrollTop() > 130 ) {
            stricky.addClass("stricky-fixed");
          } else if ( $(window).scrollTop() <= 130 ) {
            stricky.removeClass("stricky-fixed");
          }
        }
    }

    function agrikonScrollToTop() {
        if ( $(".scroll-to-target").length ) {
          $( ".scroll-to-target" ).on("click", function () {
            var target = $(this).attr("data-target");
            var speed = parseInt( $(this).attr("data-speed") );
            // animate
            $("html, body").animate(
              {
                scrollTop: $(target).offset().top
              },
              speed
            );
            return false;
          });
        }
    }

    function agrikonScrollToReview() {
        if ( $(".summary .woocommerce-review-link").length ) {
            $( ".woocommerce-review-link" ).on("click", function (e) {
                var target = $(this).attr('href');
                var hHeight = $('header.agrikon-main-header').outerHeight();
                // animate
                $("html, body").animate(
                    {
                        scrollTop: $(target).offset().top - hHeight
                    },
                    1000
                );
            });
        }
    }

    function agrikonScrollToTopBtn() {
        var strickyScrollPos = 100;
        if ( $(".scroll-to-top").length ) {
            if ( $(window).scrollTop() > strickyScrollPos ) {
                $(".scroll-to-top").fadeIn(500);
            } else if ( $(".scroll-to-top").scrollTop() <= strickyScrollPos ) {
                $(".scroll-to-top").fadeOut(500);
            }
        }
        if ( $(".cart--fixed").length ) {
            if ( $(window).scrollTop() > strickyScrollPos ) {
                $(".cart--fixed").fadeIn(500).css('display', 'flex');
                $(".wishlist--count").fadeIn(500).css('display', 'flex');
            } else if ( $(".cart--fixed").scrollTop() <= strickyScrollPos ) {
                $(".cart--fixed").fadeOut(500);
                $(".wishlist--count").fadeOut(500);
            }
        }
        if ( $(".wishlist--count").length ) {
            if ( $(window).scrollTop() > strickyScrollPos ) {
                $(".wishlist--count").fadeIn(500).css('display', 'flex');
            } else if ( $(".cart--fixed").scrollTop() <= strickyScrollPos ) {
                $(".wishlist--count").fadeOut(500);
            }
        }
    }

    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                //$(this).addClass("current");
            }
        });
        // if any li has .current elmnt add class
        selector.children("li").each(function () {
            if ($(this).find(".current").length) {
                //$(this).addClass("current");
            }
        });
        // if no file name return
        if ("" == FileName) {
            //selector.find("li").eq(0).addClass("current");
        }
    }

    /* Navbar Menu */
    function agrikonMainHeader() {
        if ($(".main-menu__list").length) {
            // dynamic current class
            let mainNavUL = $(".main-menu__list");
            //dynamicCurrentMenuClass(mainNavUL);
        }

        if ($(".main-menu").length && $(".mobile-nav__container").length) {
            let navContent = document.querySelector(".main-menu").innerHTML;
            let mobileNavContainer = document.querySelector(".mobile-nav__container");
            mobileNavContainer.innerHTML = navContent;
        }
        if ($(".sticky-header__content").length) {
            let navContent = document.querySelector(".main-menu").innerHTML;
            let mobileNavContainer = document.querySelector(".sticky-header__content");
            mobileNavContainer.innerHTML = navContent;
        }

        if ($(".mobile-nav__container .main-menu__list").length) {
            let dropdownAnchor = $(".mobile-nav__container .main-menu__list .dropdown > a");
            dropdownAnchor.each(function () {
                let self = $(this);
                let toggleBtn = document.createElement("BUTTON");
                toggleBtn.setAttribute("aria-label", "dropdown toggler");
                toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
                self.append(function () {
                    return toggleBtn;
                });
                self.find("button").on("click", function (e) {
                    e.preventDefault();
                    let self = $(this);
                    self.toggleClass("expanded");
                    self.parent().toggleClass("expanded");
                    self.parent().parent().children("ul").slideToggle();
                });
            });
        }

        if ($(".mobile-nav__toggler").length) {
            $(".mobile-nav__toggler").on("click", function (e) {
                e.preventDefault();
                $(".mobile-nav__wrapper.mobile-nav__default").toggleClass("expanded");
            });
        }

        if ($(".search-toggler").length) {
            $(".search-toggler").on("click", function (e) {
                e.preventDefault();
                $(".search-popup.search-popup__default").toggleClass("active");
            });
        }
    }


    function agrikonVideoPopup() {
        if ($(".video-popup").length) {
          $(".video-popup").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            closeMarkup:'<button title="%title%" type="button" class="mfp-close mfp-default-close">&#215;</button>',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
          });
        }
    }

    function agrikonImagePopup() {
        if ($(".img-popup").length) {
            var groups = {};
            $(".img-popup").each(function () {
                var id = parseInt($(this).attr("data-group"), 10);

                if (!groups[id]) {
                    groups[id] = [];
                }

                groups[id].push(this);
            });

            $.each(groups, function () {
                $(this).magnificPopup({
                    type: "image",
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    gallery: {
                        enabled: true
                    }
                });
            });
        }
    }

    /* homeSlider */
    function agrikonSwiperSlider2() {
        $('.thm-swiper__slider2').each(function () {
            const options = JSON.parse(this.dataset.swiperOptions);
            let mySlider = new NTSwiper(this, options);
        });
    }

    function agrikonRelatedSlider() {
        const mySwiper = $('.nt-related-post .swiper-container');
        if ( mySwiper.length ) {
            const myData= mySwiper.data( 'slider-settings' );
            const relatedSwiper = new NTSwiper('.nt-related-post .swiper-container', {
                slidesPerView: 'auto',
                spaceBetween: myData.gap,
                speed: myData.speed,
                autoplay: myData.autoplay,
                loop: myData.loop,
                centeredSlides: myData.center,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        centeredSlides: false
                    },
                    480: {
                        slidesPerView: myData.xsperview,
                        centeredSlides: false
                    },
                    768: {
                        slidesPerView: myData.smperview,
                        centeredSlides: myData.center,
                    },
                    991: {
                        slidesPerView: myData.mdperview,
                        centeredSlides: myData.center,
                    },
                    1200: {
                        slidesPerView: myData.perview,
                        centeredSlides: myData.center,
                    }
                }
            });
        }
    }


    /* simpleParallax*/
    function agrikonSimpleParallax() {
        var imageUp = document.getElementsByClassName('thumparallax');
        var imageDown = document.getElementsByClassName('thumparallax-down');
        if ( imageUp.length || imageDown.length ) {
            new simpleParallax(imageUp, {
                delay: 1
            });
            new simpleParallax(imageDown, {
                orientation: 'down',
                delay: 1
            });
        }
    }

    /* Wow Animation */
    function agrikonWow() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100
        });
        wow.init();

        var wow2 = new WOW({
            boxClass: 'wow2',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        });
        wow2.init();
    }

    /* fade slideshow  */
    function agrikonfadeSlideshow() {
        $(window).scroll(function () {
            var scrolled = $(this).scrollTop();
            $('.slider .caption').css({
                'transform': 'translate3d(0, ' + -(scrolled * 0.20) + 'px, 0)',
                'opacity': 1 - scrolled / 600
            });
        });
    }


    function agrikonUiTooltip() {
        var myTooltips = $('[data-agrikon-ui-tooltip]');
        if (myTooltips.length) {
            myTooltips.each(function(i, el) {
                var myTooltip = $(el);
                var myData = myTooltip.data('agrikonUiTooltip');
                if (!myData) {
                    return true; // next iteration
                }
                var myPosition = {};
                var myClasses = {
                    'ui-tooltip': 'ui-corner-all ui-widget-shadow'
                };
                if (myData.position === 'top') {
                    myPosition.my = 'center bottom-25';
                    myPosition.at = 'center top';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-top'
                    };
                }
                if (myData.position === 'left') {
                    myPosition.my = 'right-25 center';
                    myPosition.at = 'left center';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-left'
                    };
                }
                if (myData.position === 'right') {
                    myPosition.my = 'left+25 center';
                    myPosition.at = 'right center';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-right'
                    };
                }
                if (myData.position === 'bottom') {
                    myPosition.my = 'center top+25';
                    myPosition.at = 'center bottom';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-bottom'
                    };
                }
                myTooltip.tooltip({
                    classes: myClasses,
                    position: myPosition,
                    items: myTooltip,
                    content: function() {
                        return myData.content;
                    }
                });
            });
        }
    }

    function agrikonLightBox() {
        var myLightboxes = $('[data-agrikon-lightbox]');
        if (myLightboxes.length) {
            myLightboxes.each(function(i, el) {
                var myLightbox = $(el);
                var myData = myLightbox.data('agrikonLightbox');
                var myOptions = {};
                if (!myData || !myData.type) {
                    return true; // next iteration
                }
                if (myData.type === 'gallery') {
                    if (!myData.selector) {
                        return true; // next iteration
                    }
                    myOptions = {
                        delegate: myData.selector,
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    };

                }
                if (myData.type === 'image') {
                    myOptions = {
                        type: 'image'
                    };
                }
                if (myData.type === 'iframe') {
                    myOptions = {
                        type: 'iframe'
                    };
                }
                if (myData.type === 'inline') {
                    myOptions = {
                        type: 'inline',
                    };
                }
                if (myData.type === 'modal') {
                    myOptions = {
                        type: 'inline',
                        modal: false
                    };
                }
                if (myData.type === 'ajax') {
                    myOptions = {
                        type: 'ajax',
                        overflowY: 'scroll'
                    };
                }
                myLightbox.magnificPopup(myOptions);
            });
        }
    }


    function agrikonAnimationFix() {
        $('body:not(.elementor-page) .elementor-invisible').each(function () {

            var myEl = $( this ),
            animData  = myEl.data('settings'),
            animName  = animData._animation,
            animDelay = animData._animation_delay;
            myEl.addClass( 'wow2 '+ animName );

            myEl.css({
                "animation-name": animName,
            });

        });
    }

    function agrikonImageReveal() {

        $('.agrikon-image-reveal').each(function () {
            var myEl = $( this ),
            animData = myEl.data('image-reveal-settings'),
            pos = animData.orientation,
            offset = animData.offset,
            once = animData.once,
            delay = animData.delay;
            myEl.find('.elementor-image')
            .addClass('reveal-holder')
            .attr({"data-aos":"reveal-item","data-aos-delay": delay,"data-aos-offset": offset,"data-aos-once": once})
            .prepend( '<div class="reveal-block '+pos+'" data-aos="reveal-'+pos+'"></div>' );
            myEl.find('.reveal-block')
            .attr({"data-aos-delay": delay,"data-aos-offset": offset,"data-aos-once": once});
        });
        if( $('.agrikon-image-reveal').length ) {
            AOS.init({
                duration: 500,
                easing: 'ease-out-quart',
                mirror: true,
            });
        }
    }

    // agrikonVegasSlider Preview function
    function agrikonVegasSlider() {

        $(".home-slider-vegas-wrapper").each(function (i, el) {
            var myEl         = jQuery(el),
                myVegasId    = myEl.find('.nt-home-slider-vegas').attr('id'),
                myVegas      = $( '#' + myVegasId ),
                myPrev       = myEl.find('.vegas-control-prev'),
                myNext       = myEl.find('.vegas-control-next'),
                mySettings   = myEl.find('.nt-home-slider-vegas').data('slider-settings'),
                myContent    = myEl.find('.nt-vegas-slide-content'),
                myCounter    = myEl.find('.nt-vegas-slide-counter'),
                mySocials    = myEl.find('.social .icon');

            myEl.parents('.elementor-widget-agrikon-vegas-slider').removeClass('elementor-invisible');

            if( mySettings.slides.length ) {
                var slides = mySettings.slides,
                    anim   = mySettings.animation ? mySettings.animation : 'kenburns',
                    trans  = mySettings.transition ? mySettings.transition : 'slideLeft',
                    delay  = mySettings.delay ? mySettings.delay : 7000,
                    dur    = mySettings.duration ? mySettings.duration : 2000,
                    autoply= mySettings.autoplay,
                    shuf   = 'yes' == mySettings.shuffle ? true : false,
                    timer  = 'yes' == mySettings.timer ? true : false,
                    over   = 'none' != mySettings.overlay ? true : false;

                myVegas.vegas({
                    autoplay: autoply,
                    delay: delay,
                    timer: timer,
                    shuffle: shuf,
                    animation: anim,
                    transition: trans,
                    transitionDuration: dur,
                    overlay: over,
                    slides: mySettings.slides,
                    init: function (globalSettings) {
                        myContent.eq(0).addClass('active');
                        var total = myContent.size();
                        myCounter.find('.total').html(total);
                    },
                    walk: function (index, slideSettings) {
                        myContent.removeClass('active').eq(index).addClass('active');
                        var current = index +1;
                        myCounter.find('.current').html(current);
                    },
                    end: function (index, slideSettings) {
                    }
                });

                myPrev.on('click', function () {
                    myVegas.vegas('previous');
                });

                myNext.on('click', function () {
                    myVegas.vegas('next');
                });

                mySocials.on( 'click', function () {
                    $( this ).parent().toggleClass( "active" );
                });

            }
        });
        // add video support on mobile device for vegas slider
        if( $(".home-slider-vegas-wrapper").length ) {
            $.vegas.isVideoCompatible = function () {
                return true;
            }
        }
    }
    // agrikonVegasTemplate Preview function
    function agrikonVegasTemplate() {
        $(".slider-vegas-template-wrapper").each(function () {
            var myEl       = $(this),
                myVegasId  = myEl.find('.slider-vegas-template').attr('id'),
                myVegas    = $( '#' + myVegasId ),
                myPrev     = myEl.find('.vegas-control-prev'),
                myNext     = myEl.find('.vegas-control-next'),
                mySettings = myEl.find('.slider-vegas-template').data('slider-settings'),
                myContent  = myEl.find('.elementor-top-section'),
                myCounter  = myEl.find('.nt-vegas-slide-counter'),
                mySocials  = myEl.find('.social .icon');

            myEl.parents('.elementor-widget-agrikon-vegas-template').removeClass('elementor-invisible');

            var mySlides = [];
            myEl.find( '.elementor-top-section' ).each( function(){
                var mySlide = $(this),
                    bgImage = mySlide.css('background-image');
                    bgImage = bgImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''),
                    bgImage = {"src": bgImage};

                mySlides.push( bgImage );
                mySlide.addClass('vegas-slide-template-section').css({
                    'background-image' : 'none',
                    'background-color' : 'transparent',
                });
            });

            if( mySlides.length ) {
                var anim  = mySettings.animation ? mySettings.animation : 'kenburns',
                    trans = mySettings.transition ? mySettings.transition : 'slideLeft',
                    delay = mySettings.delay ? mySettings.delay : 7000,
                    dur   = mySettings.duration ? mySettings.duration : 2000,
                    aply  = mySettings.autoplay,
                    shuf  = 'yes' == mySettings.shuffle ? true : false,
                    timer = 'yes' == mySettings.timer ? true : false,
                    over  = 'none' != mySettings.overlay ? true : false;

                myVegas.vegas({
                    autoplay: aply,
                    delay: delay,
                    timer: timer,
                    shuffle: shuf,
                    animation: anim,
                    transition: trans,
                    transitionDuration: dur,
                    overlay: over,
                    slides: mySlides,
                    init: function (globalSettings) {
                        myContent.eq(0).addClass('active');
                        var total = myContent.size();
                        myCounter.find('.total').html(total);
                        myContent.find( '[data-split-settings]' ).each( function(){
                            var mySplit = $(this),
                                myData = mySplit.data('split-settings'),
                                myAnim = myData.animation;
                            myContent.find('.elementor-heading-title').removeClass('wow animated');
                        });
                        myContent.each( function(){
                            var myElAnim = $(this).find( '.elementor-element[data-settings]' ),
                                myData = myElAnim.data('settings'),
                                myAnim = myData && myData._animation ? myData._animation : '',
                                myDelay = myData && myData._animation_delay ? myData._animation_delay / 1000 : '';

                            if (myData && myAnim ) {
                                myElAnim.removeClass( 'animated' );
                                $(this).find(myElAnim).css({
                                    'animation-delay' : myDelay+'s',
                                });
                            }
                        });
                    },
                    walk: function (index, slideSettings) {

                        myContent.removeClass('active').eq(index).addClass('active');

                        myContent.find( '[data-split-settings]' ).each( function(){
                            var mySplit = $(this),
                                myData = mySplit.data('split-settings'),
                                myAnim = myData.animation;

                                myContent.find('.elementor-heading-title').removeClass('animated');
                                myContent.eq(index).find('.elementor-heading-title').addClass('animated');
                        });

                        myContent.each( function(){
                            var myElAnim = $(this).find( '.elementor-element[data-settings]' ),
                                myData = myElAnim.data('settings'),
                                myAnim = myData && myData._animation ? myData._animation : '',
                                myDelay = myData && myData._animation_delay ? myData._animation_delay / 1000 : '';

                            if (myData && myAnim ) {
                                myElAnim.removeClass( 'animated ' + myAnim );
                                myContent.eq(index).find(myElAnim).addClass('animated ' + myAnim);
                            }
                        });
                        var current = index +1;
                        myCounter.find('.current').html(current);
                    },
                    end: function (index, slideSettings) {
                    }
                });

                myPrev.on('click', function () {
                    myVegas.vegas('previous');
                });

                myNext.on('click', function () {
                    myVegas.vegas('next');
                });

            }
        });
    }

    // agrikonFixedSection
    function agrikonFixedSection() {
        var myFixedSection = $('.agrikon-section-fixed-yes');
        var myFixedSectiontop = $('.agrikon-section-fixed-yes').position();
        if ( myFixedSection.length ) {
            myFixedSection.parents('[data-elementor-type="section"]').addClass( 'agrikon-section-fixed agrikon-custom-header' );
            $(window).scrollTop(0);
            $(window).on("scroll", function () {
                var bodyScroll = $(window).scrollTop();
                if ( bodyScroll>100 ) {
                    myFixedSection.parents('[data-elementor-type="section"]').addClass( 'section-fixed-active' );
                } else {
                   myFixedSection.parents('[data-elementor-type="section"]').removeClass( 'section-fixed-active' );
                }
            });
        }
    }

    class ShapeOverlays {
        constructor(elm) {
            this.elm = elm;
            this.path = elm.querySelectorAll('path');
            this.numPoints = 18;
            this.duration = 600;
            this.delayPointsArray = [];
            this.delayPointsMax = 300;
            this.delayPerPath = 100;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {
            this.isAnimating = true;
            const range = 4 * Math.random() + 6;
            for (var i = 0; i < this.numPoints; i++) {
                const radian = i / (this.numPoints - 1) * Math.PI;
                this.delayPointsArray[i] = (Math.sin(-radian) + Math.sin(-radian * range) + 2) / 4 * this.delayPointsMax;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.classList.add('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.classList.remove('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints + 1; i++) {
                points[i] = ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
            }

            let str = '';
            str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
            for (var i = 0; i < this.numPoints - 1; i++) {
                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
            }
            str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }

    class ShapeOverlays2 {
        constructor(elm) {
            this.elm = elm;
            this.path = elm.querySelectorAll('path');
            this.numPoints = 4;
            this.duration = 800;
            this.delayPointsArray = [];
            this.delayPointsMax = 180;
            this.delayPerPath = 70;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {
            this.isAnimating = true;
            const range = Math.random() * Math.PI * 2;
            for (var i = 0; i < this.numPoints; i++) {
                const radian = (i / (this.numPoints - 1)) * Math.PI * 2;
                this.delayPointsArray[i] = (Math.sin(radian + range) + 1) / 2 * this.delayPointsMax;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.classList.add('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.classList.remove('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints; i++) {
                points[i] = ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
            }

            let str = '';
            str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
            for (var i = 0; i < this.numPoints - 1; i++) {
                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
            }
            str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }
    class ShapeOverlays3 {
        constructor(elm) {
            this.elm = elm;
            this.path = elm.querySelectorAll('path');
            this.numPoints = 2;
            this.duration = 600;
            this.delayPointsArray = [];
            this.delayPointsMax = 0;
            this.delayPerPath = 200;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {
            this.isAnimating = true;
            for (var i = 0; i < this.numPoints; i++) {
                this.delayPointsArray[i] = 0;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.classList.add('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.classList.remove('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints; i++) {
                const thisEase = this.isOpened ?
                (i == 1) ? ease.cubicOut : ease.cubicInOut:
                (i == 1) ? ease.cubicInOut : ease.cubicOut;
                points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
            }

            let str = '';
            str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
            for (var i = 0; i < this.numPoints - 1; i++) {
                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
            }
            str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }
    class ShapeOverlays4 {
        constructor(elm) {
            this.elm = elm;
            this.path = elm.querySelectorAll('path');
            this.numPoints = 4;
            this.duration = 1000;
            this.delayPointsArray = [];
            this.delayPointsMax = 0;
            this.delayPerPath = 60;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {
            this.isAnimating = true;
            for (var i = 0; i < this.numPoints; i++) {
                this.delayPointsArray[i] = 0;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.classList.add('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.classList.remove('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints; i++) {
                const thisEase = (i % 2 === 1) ? ease.sineOut : ease.exponentialInOut;
                points[i] = (1 - thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100
            }

            let str = '';
            str += (this.isOpened) ? `M 0 0 H ${points[0]}` : `M ${points[0]} 0`;
            for (var i = 0; i < this.numPoints - 1; i++) {
                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += `C ${points[i]} ${cp} ${points[i + 1]} ${cp} ${points[i + 1]} ${p} `;
            }
            str += (this.isOpened) ? `H 100 V 0` : `H 0 V 0`;
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }

    function shapeOverlaysMenu() {
        if ( $('.agrikon-shape-overlay-menu').length ) {
            const elmNavi = document.querySelector('.agrikon-shape-overlay-menu');
            const elmHamburger = document.querySelector('.hamburger');
            const gNavItems = document.querySelectorAll('.global-menu__item');
            const elmOverlay = document.querySelector('.shape-overlays');
            var overlay = new ShapeOverlays(elmOverlay);

            if ( $(elmNavi).hasClass('demo-2') ){
                overlay = new ShapeOverlays2(elmOverlay);
            }
            if ( $(elmNavi).hasClass('demo-3') ){
                overlay = new ShapeOverlays3(elmOverlay);
            }
            if ( $(elmNavi).hasClass('demo-4') ){
                overlay = new ShapeOverlays4(elmOverlay);
            }

            elmHamburger.addEventListener('click', () => {
                if (overlay.isAnimating) {
                    return false;
                }
                overlay.toggle();
                if (overlay.isOpened === true) {
                    elmNavi.classList.add('is-opened-navi');
                    elmHamburger.classList.add('is-opened-navi');
                    for (var i = 0; i < gNavItems.length; i++) {
                        gNavItems[i].classList.add('is-opened');
                    }
                } else {

                    for (var i = 0; i < gNavItems.length; i++) {
                        gNavItems[i].classList.remove('is-opened');
                    }
                    setTimeout(function(){
                    elmNavi.classList.remove('is-opened-navi');
                    elmHamburger.classList.remove('is-opened-navi');
                    }, 1000);
                }
            });

            for (var i = 0; i < gNavItems.length; i++) {
                gNavItems[i].addEventListener('click', () => {
                    if (overlay.isAnimating) {
                        return false;
                    }
                    overlay.toggle();
                    if (overlay.isOpened === true) {
                        elmNavi.classList.add('is-opened-navi');
                        elmHamburger.classList.add('is-opened-navi');
                        for (var i = 0; i < gNavItems.length; i++) {
                            gNavItems[i].classList.add('is-opened');
                        }
                    } else {

                        for (var i = 0; i < gNavItems.length; i++) {
                            gNavItems[i].classList.remove('is-opened');
                        }
                        setTimeout(function(){
                        elmNavi.classList.remove('is-opened-navi');
                        elmHamburger.classList.remove('is-opened-navi');
                        }, 1000);
                    }
                });
            }
        }
    }

    /* agrikonBgImage */
    function agrikonBgImage() {
        $( '[data-agrikon-bg-src]' ).each(function () {
            var myBg  = $( this ),
                mySrc = myBg.data('agrikon-bg-src');
            if ( mySrc ) {
                myBg.css( 'background-image', 'url(' + mySrc + ')' );
            }
        });
    }

    $( document ).ready( function() {

        if ( win.outerWidth() <= 1024 ) {
            body.removeClass('nt-desktop').addClass('nt-mobile');
        } else {
            body.removeClass('nt-mobile').addClass('nt-desktop');
        }

        win.on('resize', function () {
            if ( win.outerWidth() <= 1024 ) {
                body.removeClass('nt-desktop').addClass('nt-mobile');
            }else {
                body.removeClass('nt-mobile').addClass('nt-desktop');
            }
        });

        agrikonMainHeader();
        agrikonVideoPopup();
        agrikonSwiperSlider2()
        agrikonRelatedSlider();
        agrikonfadeSlideshow();
        agrikonUiTooltip();
        agrikonLightBox();
        agrikonAnimationFix();
        agrikonImageReveal();
        agrikonVegasSlider();
        agrikonVegasTemplate();
        agrikonFixedSection();
        shapeOverlaysMenu();
        agrikonScrollToTop();
        agrikonScrollToReview();
    });

    // === window When scroll === //
    win.on("scroll", function () {
        var bodyScroll = win.scrollTop();

        if ( bodyScroll > 100 ) {
            body.addClass("scroll-start");
        } else {
            body.removeClass("scroll-start");
        }

        agrikonMainHeaderSticky();
        agrikonScrollToTopBtn();
    });

    // === window When Loading === //
    win.on("load", function () {
        if ( $(".preloader").length ) {
          $( ".preloader" ).fadeOut();
        }
        $( "body" ).addClass('page-loaded');
        agrikonBgImage();
        agrikonWow();
        agrikonSimpleParallax();
    });

})(window, document, jQuery);
