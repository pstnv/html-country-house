

const header = document.querySelector('#header');
const intro = document.querySelector('#intro');
const navToggle = document.querySelector('#navToggle');
const nav = document.querySelector('#nav');


let introHeight = intro.clientHeight;
let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

checkScroll(introHeight, scrollPosition);




// 1. FIXED HEADER
// массив из двух событий, подслушка window на три события - одна функция
// при загрузке экрана
// при скролле
// при изменении размеров. Например, переход из моб.версии в десктопную
["scroll", "resize"].forEach (function(e) {
    window.addEventListener(e, function () {
        introHeight = intro.clientHeight;
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        checkScroll(introHeight, scrollPosition);
    });
})

function checkScroll(introHeight, scrollPosition) {
    if (scrollPosition > introHeight) {
        header.classList.add('fixed');
    }
    else {
        header.classList.remove('fixed');
    }
}

// 2. SMOOTH SCROLLS
// 2.1 Само свойство прописали в  CSS scroll-behavior: smooth;
// 2.2 При нажатии на ссылку вычисляет расстояние до нужного раздела
// 2.3 Вычисляет высоту контейнера header
// 2.4 Чтобы header не перекрывал контейнер на свою высоту
// делаем скролл на расстояние минус высоту header

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach (link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        let elementID = link.hash;
        let elementOffset = document.querySelector(elementID).offsetTop;
        let headerHeight = header.clientHeight;

       // свернуть меню после клика на ссылку, перед переходом к разделу
        nav.classList.remove('show');

       // window.scrollTo(0, elementOffset - headerHeight) || document.documentElement.scrollTo(0, elementOffset - headerHeight);
        window.scrollTo({top: elementOffset - headerHeight, behavior: 'smooth'}) || document.documentElement.scrollTo({top: elementOffset - headerHeight, behavior:'smooth'});
    });
});



// 3. NAV - раскрыть меню при нажатии на бургер

navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    nav.classList.toggle('show');
})

// 4. REVIEWS - слайдер отзывы
// Ссылка на библиотеку: https://kenwheeler.github.io/slick/

const slider = $('#reviewsSlider');

    slider.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            autoplay: true,
            arrows: false,
            dots: true
      });

// 5. MODAL - модальное окно
    const modal = document.querySelector('#modal');
    const btnContact = document.querySelector('#btnContact');
    const closeButton = document.querySelector('#closeButton');
    const btnSubmit = document.querySelector('#btnSubmit');

    //функция очистки полей
    function resetForm () {
            document.querySelector('.form').reset();
        }

    // если пользователь кликнул на кнопку обратной ссвязи
    // модальное окно откроется
    btnContact.addEventListener('click', ()=> {
        document.querySelector('.modal').style.display = 'flex';        
    })

    // если пользователь кликнул на крестик, модальное окно закроется
    closeButton.addEventListener('click', ()=> {
        document.querySelector('.modal').style.display = 'none';
        resetForm ();        
    })
    
    // подслушка на window - клик
    window.addEventListener('click', function(event) {
    // если пользователь кликнул вне модального окна, оно закроется
        if (event.target == modal) {
            modal.style.display = "none";
            resetForm ();
        }
    // если меню бургера раскрыто, и пользователь кликнул 
    // вне пункта бургера или не на бургер, - меню закроется
        collapseBurger (event);
    });

    // подслушка на window - касание
    window.addEventListener('touchstart', function(event) {
        
        // если меню бургера раскрыто, и пользователь касается 
        // вне пункта бургера или не на бургер, - меню закроется
            collapseBurger (event);
    });

    function collapseBurger (event) {
        if (!event.target.classList.value.includes('nav__link') &&
            !event.target.classList.value.includes('burger')) {

                if (nav.classList.value.includes('show')) {
                    nav.classList.remove('show');
                }
            }        
    }

    // если пользователь кликнул на отправку формы, при переходе со страницы форма будет очищена
    btnSubmit.addEventListener('click', () => {
        window.addEventListener('unload', () => {
            resetForm ();
        })
    });

	gsap.from (".term", {
		opacity: 0,
		duration: .7,
		stagger: .7
	})