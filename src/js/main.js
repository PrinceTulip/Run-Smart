require('regenerator-runtime')
const tabs = () => {
  const bindTabs = (triggerSelector, contentSelector, activeSelector) => {
    const trigger = document.querySelectorAll(triggerSelector);
    const content = document.querySelectorAll(contentSelector);
    const active = activeSelector;
    console.log(active)

    trigger.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        hideTabs();
        e.preventDefault();
        showTabs(i);
      })
    });

    const hideTabs = () => {
      trigger.forEach((item) => {
        item.classList.remove(active);
      });

      content.forEach((item) => {
        item.style.display = 'none';
      })
    };

    const showTabs = (i) => {
      trigger[i].classList.add(active);
      content[i].style.display = 'block';
    }

    hideTabs();
    showTabs(0)
  };

  bindTabs('.catalog__tabs-link', '.catalog__content ', 'catalog__tabs-link--active');
};

const slider = () => {
  function bindSlider(slidesSelector, prevSelector, nextSelector) {
    const slides = document.querySelectorAll(slidesSelector);
    const prev = document.querySelector(prevSelector);
    const next = document.querySelector(nextSelector);
    let slideIndx = 1;
    let pause = null;

    function currency(n) {
      showSlide(n)
    }

    function showSlide(n) {

      if (slideIndx > slides.length) {
        n = 1;
        slideIndx = 1;
      } else if (slideIndx < 1) {
        slideIndx = slides.length;
        n = slides.length;
      }

      slides.forEach((item) => {
        item.style.display = 'none';
        item.classList.add('slideInRight');
      });
      slides[n - 1].style.display = 'block';
      slides[n - 1].classList.add('slideInRight');
    }

    try {
      next.addEventListener('click', () => {
        showSlide(slideIndx += 1);
      });

      prev.addEventListener('click', () => {
        showSlide(slideIndx -= 1);
      });
    } catch (e) {

    }

    const autoPlay = () => {
      pause = setInterval(() => {
        showSlide(slideIndx += 1);
      }, 5000)
    };

    slides[0].parentElement.addEventListener('mouseover', () => {
      clearInterval(pause);
    });
    slides[0].parentElement.addEventListener('mouseout', () => {
      autoPlay();
    });

    autoPlay();
    showSlide(slideIndx)
  }

  bindSlider('.slider__item', '.slider__prevSelector', '.slider__nextSelector')

  bindSlider('.feedback__item', '.slider__prevSelector', '.slider__nextSelector')
};


function bindSlider(slidesSelector, prevSelector, nextSelector, dotsSelector, activeDotSelector) {
  const slides = document.querySelectorAll(slidesSelector);
  const prev = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);
  const dots = document.querySelectorAll(dotsSelector);
  const activeDot = activeDotSelector;
  let slideIndx = 1;
  let pause = null;
  bindSlider('.feedback__item', null, null, '.dot', 'dot-active')
};

try {
  dots.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(i + 1);
    })
  })
} catch (e) {
}
try {
  dots[n - 1].classList.add(activeDot);
} catch (e) {
}
try {
  dots.forEach((item) => {
    item.classList.remove(activeDot);
  });
} catch (e) {
}

const popup = document.querySelector(".popup-form");
const close = popup.querySelector(".popup-form__close");
const link = document.querySelectorAll(".popup-button");
const overlay = document.querySelector(".popup-overlay")
const order = document.querySelector(".popup-order");

for (let i = 0; i < link.length; i++) {

  link[i].addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("popup-form-show");
    overlay.classList.add("popup-overlay-show");
  });

}


function closeAllPopup() {
  document.querySelectorAll('.popup-form').forEach(function (item) {
    item.classList.remove('popup-form-show')
  })

}

const requestData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
  });

  return res;
};

function forms() {
  const form = document.querySelectorAll("form");
  const overlay = document.querySelector(".popup-overlay")

  form.forEach((item) => {

    console.log(item);

    item.addEventListener('submit', (e) => {
      e.preventDefault()
      console.log(item)
      const formdata = new FormData();

      requestData("../php/server.php", formdata)
          .then(function (res) {
            item.reset()
           closeAllPopup()

            order.classList.add("popup-order-show")
            overlay.classList.add("popup-overlay-show")
          })

          .catch(function () {
            alert("вышел нахуй остюда")
            overlay.classList.remove('popup-overlay-show')
          })
    })
  })
}

forms()


close.addEventListener("click", function (event) {
  event.preventDefault();
  popup.classList.remove("popup-form-show");
  overlay.classList.remove("popup-overlay-show");
});


window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    if (overlay.classList.contains("popup-overlay-show")) {
      popup.classList.remove("popup-form-show");
      overlay.classList.remove("popup-overlay-show");
    }
  }
});

window.addEventListener("click", function (e) {
  if (e.target === overlay) {
    popup.classList.remove("popup-form-show");
    overlay.classList.remove("popup-overlay-show");
  }
});

try {
  const WOW = require ('wow.js')

  const wow = new WOW(
      {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window,
        resetAnimation: true,     // reset animation on end (default is true)
      }
  );

  wow.init();

} catch (e) {
  
}


window.addEventListener('DOMContentLoaded', () => {
  slider();
  tabs();
});




