// one page scroll
$(function () {

    var sections = $('.section'),
        display = $('.main-content'),
        inScroll = false;

    var scrollToSection = function (sectionEq) {
        var position = 0;

        if(!inScroll) {

            inScroll = true;

            position = (sections.eq(sectionEq).index() * -100) + '%';

            sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

            display.css({
                "transform" : "translate3d(0, " + position + ", 0)"
            });

            setTimeout(function () {

                inScroll = false;

                $('.fixed-menu__item').eq(sectionEq).addClass('active').siblings().removeClass('active');

            }, 1300)
        }

    };

    $('.wrapper').on('wheel', function (e) {

        var deltaY = e.originalEvent.deltaY,
            activeSection = sections.filter('.active'),
            nextSection = activeSection.next(),
            prevSection = activeSection.prev();

        if (deltaY > 0) {  // скролим вниз

            if (nextSection.length) {
                scrollToSection(nextSection.index());
            }
        }

        if (deltaY < 0) {  // скролим вверх

            if (prevSection.length) {
                scrollToSection(prevSection.index());
            }
        }
    });

    $('.down-arrow').on('click', function (e) {
        e.preventDefault();

        scrollToSection(1);
    });

    $('.fixed-menu__link, .nav__link, .nav__order').on('click', function (e) {
        e.preventDefault();

        var href = parseInt($(this).attr('href'));

        scrollToSection(href);

    })

    $(document).on('keydown', function (e) {

        var activeSection = sections.filter('.active'),
            nextSection = activeSection.next(),
            prevSection = activeSection.prev();

        switch (e.keyCode) {
            case 40 : //листаем вниз
                if (nextSection.length) {
                    scrollToSection(nextSection.index());
                }
                break;

            case 38 : //листаем вверх
                if (prevSection.length) {
                    scrollToSection(prevSection.index());
                }
                break;
        }
    });
});

//slider
$(function () {

  var burgerCarousel =  $('.burgers__slider').owlCarousel({
        items : 1,
        loop : true,
      smartSpeed : 1000
    });

  $('.burgers__slider__btn-next').on('click', function (e) {
      e.preventDefault();
      burgerCarousel.trigger('next.owl.carousel');
  });

  $('.burgers__slider__btn-prev').on('click', function (e) {
      e.preventDefault();
      burgerCarousel.trigger('prev.owl.carousel');
  });
});

//вертикальный акко
$(function () {
    $('.team-acco__trigger').on('click', function(e) {

        e.preventDefault();

        var $this = $(this),
            item = $this.closest('.team-acco__item'),
            container = $this.closest('.team-acco'),
            items = container.find('.team-acco__item'),
            content = item.find('.team-acco__content'),
            otherContent = container.find('.team-acco__content');

        if (!item.hasClass('team-acco__item_active')) {

            items.removeClass('team-acco__item_active');
            item.addClass('team-acco__item_active');
            otherContent.slideUp();
            content.slideDown();

        } else {
            item.removeClass('team-acco__item_active');
            content.slideUp();

        }

    });
});

//горизонтальный акко
$(function () {
    $('.menu-acco__trigger').on('click', function (e){
        e.preventDefault();

        var $this = $(this),
            container = $this.closest('.menu-acco'),
            item = $this.closest('.menu-acco__item'),
            items = container.find('.menu-acco__item'),
            activeItem = items.filter('.menu-acco__item_active'),
            content = item.find('.menu-acco__content'),
            activeContent = activeItem.find('.menu-acco__content');

        if (!item.hasClass('menu-acco__item_active')) {

            items.removeClass('menu-acco__item_active');
            item.addClass('menu-acco__item_active');

            activeContent.animate({
                'width' : '0px'
            });

            content.animate({
                'width' : '550px'
            })

        } else {
            item.removeClass('menu-acco__item_active');
            content.animate({
                'width' : '0px'
            });
        }
    });

    $(document).on('click', function(e) {
        var $this = $(e.target);

        if(!$this.closest('.menu-acco').length) {
            $('.menu-acco__content').animate({
                'width' : '0px'
            });

            $('.menu-acco__item').removeClass('menu-acco__item_active');
        }
    });
});

//input mask
$(function () {
   $('.phone-mask').inputmask('+7 (999) 999 99 99');
});

//fancybox
$(function () {
    $('.review__view').fancybox({
        type : 'inline',
        maxWidth : 460,
        fitToView : false,
        padding : 0
    });

    $('.full-review__close').on('click', function (e) {

        e.preventDefault();
        $.fancybox.close();
    })
});

//form submit
$(function () {
    $('#order__form').on('submit', function (e) {
        e.preventDefault();

        var
            form = $(this);
            formData = form.serialize();

        $.ajax({
            url: 'php/mail.php',
            type: 'POST',
            data: formData,
            success: function (data) {

                var popup = data.status ? '#success' : '#error';


                $.fancybox.open([
                    {href: popup}
                ], {
                    type: 'inline',
                    maxWidth: 250,
                    fitToView: false,
                    padding: 0,
                    afterClose: function () {
                        form.trigger('reset');
                        }
                    });
                }
            })
        });

        $('.status-popup__close').on('click', function (e) {
            e.preventDefault();
            $.fancybox.close();
        });

});

//yandex map
$(function () {
    ymaps.ready(init);
    var myMap;

    function init() {
        myMap = new ymaps.Map("map", {
            center : [59.91817154482064,30.30557799999997],
            zoom : 11,
            controls : []
        });

        var coords = [
            [59.94554327989287,30.38935262114668],
            [59.91142323563909,30.50024587065841],
            [59.88693161784606,30.319658102103713],
            [59.97033574821672,30.315194906302924],
        ],
        myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-26, -52]
        });

        for (var i = 0; i < coords.length; i++) {
            myCollection.add(new ymaps.Placemark(coords[i]));
        }

        myMap.geoObjects.add(myCollection);

        myMap.behaviors.disable('scrollZoom');
    }
});


