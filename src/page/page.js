import HealthBar from 'healthBar/healthBar';
import './page.scss';

let $wasteButtons, bars = {};


init();

function init () {
    initBars();
    defineDOM();
    bindEvents();
}

function initBars () {
   bars.hp = new HealthBar('#hp');
}

function defineDOM () {
    $wasteButtons = document.querySelectorAll('.waste-btn');
}

function bindEvents () {
    $wasteButtons.forEach(b=>{b.addEventListener('click', onClickActionButtons)})
}

function getRandomInt (min,max) {
    min = min || 0;
    max = max || 150;
    return Math.floor(Math.random() * (max - min)) + min;
}

function waste (bar, amount) {
    amount = amount || getRandomInt();
    bars[bar].waste(amount)
}

//  Events
// -------------------------------------------------

function onClickActionButtons (e) {
    let target = e.target,
        bar = target.dataset.type;
    waste(bar);
}

