
$(document).ready(function () {

    // 1. همبرگر منو و اورلی
    $('.hamburger, .overlay').click(function () {
        $('.sidebar').toggleClass('active');
        $('.overlay').toggleClass('active');
    });

    // 2. لودر صفحه
    $('.loader').fadeOut(500, function () {
        $('.loader-background').fadeOut(500);
    });

    // 3. انیمیشن ورود تصاویر هدست با تاخیر
    setTimeout(function () {
        $('.img-Headphone').each(function (i) {
            $(this).delay(i * 300).queue(function (next) {
                $(this).addClass('animate__animated animate__fadeInUp').css('opacity', 1);
                next();
            });
        });
    }, 700);

    // 4. اسلایدر محصول (رنگ‌های هدست)
    (function () {
        const images = ['img-0', 'img-1', 'img-2'];
        let current = 1; // شروع از سبز (فرض بر اینه img-1 سبز باشه)

        function updateSlider(index) {
            current = index;

            // حذف کلاس‌های قبلی
            $('.product-img').removeClass('active left right');
            $('.dot').removeClass('active');

            // اضافه کردن کلاس active به تصویر فعلی
            $(`#${images[index]}`).addClass('active');

            // چپ و راست
            let leftIndex = (index - 1 + images.length) % images.length;
            let rightIndex = (index + 1) % images.length;

            $(`#${images[leftIndex]}`).addClass('left');
            $(`#${images[rightIndex]}`).addClass('right');

            // دات فعال
            $(`.dot[data-index="${index}"]`).addClass('active');
        }

        // کلیک روی دات‌ها
        $('.dot').on('click', function () {
            const idx = parseInt($(this).data('index'));
            updateSlider(idx);
        });

        // شروع اولیه
        updateSlider(current);
    })();

    // 5. انیمیشن هنگام اسکرول (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = $(entry.target);
                const animation = el.data('animate');
                el.addClass('animate__animated ' + animation);
                observer.unobserve(entry.target); // فقط یک بار انیمیشن اجرا بشه
            }
        });
    }, { threshold: 0.2 });

    $('.animate-on-scroll').each(function () {
        observer.observe(this);
    });

    // 6. تغییر استایل نوار ناوبری هنگام اسکرول
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('nav').addClass('scrolled');
        } else {
            $('nav').removeClass('scrolled');
        }

        if ($(this).scrollTop() > 100) {
            $('.img-logo img').addClass('Rotate-icon');
        } else {
            $('.img-logo img').removeClass('Rotate-icon');
        }

        if ($(this).scrollTop() > 8) {
            $('.navbar').addClass('scrolled-mobile');
        } else {
            $('.navbar').removeClass('scrolled-mobile');
        }
    });


    $(function () {
        const slider = $('.slider-section-2');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.on('mousedown', function (e) {
            isDown = true;
            slider.addClass('dragging');
            startX = e.pageX - slider.offset().left;
            scrollLeft = slider.scrollLeft();
        });



        $(document).on('mouseup', function () {
            isDown = false;
            slider.removeClass('dragging');
        });



        slider.on('mouseleave', function () {
            isDown = false;
            slider.removeClass('dragging');
        });



        slider.on('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offset().left;
            const walk = (x - startX) * 4;
            slider.scrollLeft(scrollLeft - walk);
        });




    });



    const testimonialSwiper = new Swiper(".testimonialSwiper", {
        effect: "cards",
        grabCursor: true,
        loop: true,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

});


// ------------------------------
// اسکرول نرم
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({
        lerp: 0.070,
        smoothWheel: true,
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
});


