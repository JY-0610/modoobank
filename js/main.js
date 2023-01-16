var $selector = document.querySelector('.main_content');
var numSlide = $selector.querySelectorAll('.banner > li').length;
var slideNow = 0;
var slidePrev = 0;
var slideNext = 0;
var slideFirst = 1;
var timerId = '';
var timerSpeed = 2000;
var isTimerOn = false;

$selector.querySelectorAll('.banner > li').forEach(function (el, i) {
    $selector.querySelector('.indicator').innerHTML += '<li><a href="#">' + (i + 1) + '번 슬라이드</a></li>\n';
});
if (isTimerOn === true) {
    $selector.querySelector('.control a.play').setAttribute('class', 'play on');
} else {
    $selector.querySelector('.control a.play').setAttribute('class', 'play');
}
showSlide(slideFirst);


$selector.querySelectorAll('.indicator li a').forEach(function (el, i) {
    el.addEventListener('click', function () {
        var index = Array.from($selector.querySelectorAll('.indicator li a')).indexOf(this);
        showSlide(index + 1);
    }, false);
});

$selector.querySelectorAll('.banner li a').forEach(function (el, i) {
    el.addEventListener('focus', function () {
        var index = Array.from($selector.querySelectorAll('.slide li a')).indexOf(this);
        $selector.querySelector('div.box').scrollLeft = 0;
        showSlide(index + 1);
    }, false);
    console.log(this)
});

$selector.querySelector('.control a.prev').addEventListener('click', function () {
    showSlide(slidePrev);
}, false);

$selector.querySelector('.control a.next').addEventListener('click', function () {
    showSlide(slideNext);
}, false);

$selector.querySelector('.control a.play').addEventListener('click', function () {
    if (isTimerOn === true) {
        stopTimer();
    } else {
        startTimer();
    }
}, false);


function startTimer() {
    timerId = setTimeout(function () {
        showSlide(slideNext);
    }, timerSpeed);
    $selector.querySelector('.control a.play').classList.add('on');
    isTimerOn = true;
}

function stopTimer() {
    clearTimeout(timerId);
    $selector.querySelector('.control a.play').classList.remove('on');
    isTimerOn = false;
}

function resetTimer() {
    clearTimeout(timerId);

    if (isTimerOn === true) {
        timerId = setTimeout(function () {
            showSlide(slideNext);
        }, timerSpeed);
        setTimeout(function () {}, 50);
    }
}


function showSlide(n) {
    resetTimer();
      $selector.querySelectorAll('.banner > li').forEach(function (el, i) {
        el.classList.remove('on');
    });
    $selector.querySelector('.banner > li:nth-child(' + n + ')').classList.add('on');
    $selector.querySelectorAll('.indicator > li').forEach(function (el, i) {
        el.classList.remove('on');
    });
    $selector.querySelector('.indicator > li:nth-child(' + n + ')').classList.add('on');

    slideNow = n;
    slidePrev = (n === 1) ? numSlide : (n - 1);
    slideNext = (n === numSlide) ? 1 : (n + 1);
    // console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
}


// tab-menu