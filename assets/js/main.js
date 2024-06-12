/***************************************************
==================== JS INDEX ======================
****************************************************
01. Sticky
02. Preloader
03. Magnific Image popup
04. Text Slider
05. Smooth active
06. Counter active
07. Progress Bar
08. Scroll Top
09. meanmenu active
10. Button Hover Animation
11. Pin Active
12. Image Reveal Animation
13. Sidebar Menu
14. Offcanvas Menu Off/On
15. Blog Share Pin
16. Switcher JS

****************************************************/

(function ($) {
  ("use strict");

  // 01. Sticky
  let header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Screen Width
  var device_width = window.screen.width;
  var overlay = document.querySelector(".overlay-switcher-close");

  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // 03. Magnific Image popup
  if ($(".image-popup").length && "magnificPopup" in jQuery) {
    $(".image-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }

  // Magnific Video popup
  if ($(".video-popup").length && "magnificPopup" in jQuery) {
    $(".video-popup").magnificPopup({
      type: "iframe",
    });
  }

  // 05. Smooth active
  if (device_width > 767) {
    if (
      document.querySelector("#has_smooth").classList.contains("has-smooth")
    ) {
      const smoother = ScrollSmoother.create({
        smooth: 0.5,
        effects: device_width < 1025 ? false : true,
        smoothTouch: 0.1,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
    }
  }

  // 06. Counter active
  if ("counterUp" in window) {
    const skill_counter = window.counterUp.default;
    const skill_cb = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains("is-visible")) {
          skill_counter(el, {
            duration: 1500,
            delay: 16,
          });
          el.classList.add("is-visible");
        }
      });
    };

    const IO = new IntersectionObserver(skill_cb, {
      threshold: 1,
    });

    const els = document.querySelectorAll(".wc-counter");
    els.forEach((el) => {
      IO.observe(el);
    });
  }

  // 07. Progress Bar
  if ($(".progress__label").length) {
    $(".progress__label").progressBar({
      percentage: true,
      animation: true,
      height: "2",
      barColor: "#E8BF96",
      shadow: true,
    });
  }

  if ($(".progress__label-2").length) {
    $(".progress__label-2").progressBar({
      height: "2",
      percentage: true,
      animation: true,
      shadow: true,
      barColor: "#FD8F77",
      backgroundColor: "#44454A",
    });

    var progress_item_2 = document.querySelectorAll(
      ".progress__item-2 .sonny_progressbar"
    );
    if (progress_item_2) {
      progress_item_2.forEach((elem) => {
        var prog_val = elem.getAttribute("data-width");
        elem.childNodes[1].childNodes[2].style.left = prog_val + "%";
      });
    }
  }

  // 08. Scroll Top
  let scroll_top = document.getElementById("scroll_top");
  if (scroll_top) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        scroll_top.classList.add("showed");
      } else {
        scroll_top.classList.remove("showed");
      }
    };

    scroll_top.addEventListener("click", function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }

  // 09. meanmenu active
  $(".offcanvas__menu").meanmenu({
    meanScreenWidth: "5000",
    meanMenuContainer: ".offcanvas__menu-wrapper",
    meanMenuCloseSize: "28px",
  });

  // meanmenu activition
  $(".main-menu").meanmenu({
    meanScreenWidth: "1199",
    meanMenuContainer: ".offcanvas__menu-wrapper",
    meanMenuCloseSize: "28px",
  });

  const all_btn = gsap.utils.toArray(".btn-move");
  const all_btn_cirlce = gsap.utils.toArray(".btn-item");

  all_btn.forEach((btn, i) => {
    $(btn).mousemove(function (e) {
      callParallax(e);
    });
    function callParallax(e) {
      parallaxIt(e, all_btn_cirlce[i], 80);
    }

    function parallaxIt(e, target, movement) {
      var $this = $(btn);
      var relX = e.pageX - $this.offset().left;
      var relY = e.pageY - $this.offset().top;

      gsap.to(target, 0.3, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement,
        scale: 1.2,
        ease: Power2.easeOut,
      });
    }
    $(btn).mouseleave(function (e) {
      gsap.to(all_btn_cirlce[i], 0.3, {
        x: 0,
        y: 0,
        scale: 1,
        ease: Power2.easeOut,
      });
    });
  });

  // 10. Button Hover Animation
  var btn_hover_all = document.querySelectorAll(".btn-hover-bgchange");

  if (btn_hover_all) {
    for (const ele of btn_hover_all) {
      var newSpan = document.createElement("span");
      ele.appendChild(newSpan);
    }

    $(".btn-hover-bgchange").on("mouseenter", function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;

      $(this).find("span").css({
        top: y,
        left: x,
      });
    });

    $(".btn-hover-bgchange").on("mouseout", function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;

      $(this).find("span").css({
        top: y,
        left: x,
      });
    });
  }

  // 11. Pin Active
  var pin_fixed = document.querySelectorAll(".pin__element");
  var pin__area = document.querySelectorAll(".pin__area");

  if (pin_fixed && device_width > 991) {
    pin_fixed.forEach((element, index) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: pin__area[index],
          pin: element,
          start: "top top",
          end: "bottom bottom",
          pinSpacing: false,
        },
      });
    });
  }

  // var schedule_fixed = document.querySelector('.pin__elem');
  // if (schedule_fixed && device_width > 991) {

  //   gsap.utils.toArray(".pin__elem").forEach((panel, i, array) => {

  //     if (i === array.length - 1) {
  //       return;
  //     }

  //     ScrollTrigger.create({
  //       trigger: panel,
  //       start: "top top",
  //       pin: true,
  //       pinSpacing: false
  //     });

  //   });
  // }
})(jQuery);
