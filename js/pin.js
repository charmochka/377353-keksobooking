'use strict';

(function () {
  var PINS = 5;

  // Функция, которая создает пин на основе шаблона
  var createPin = function (promo, index) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var img = pinTemplate.querySelector('img');
    img.src = promo.author.avatar;
    img.style.pointerEvents = 'none';
    pinTemplate.style.left = promo.location.x + 'px';
    pinTemplate.style.top = promo.location.y + 'px';
    var pindElement = pinTemplate.cloneNode(true);
    pindElement.dataset.promoIndex = index;

    document.querySelector('.map').insertBefore(pindElement, document.querySelector('.map__filters-container'));
  };

  // Выводит все pin объявления на экран
  window.createPins = function (promos) {
    if (PINS > promos.length) {
      PINS = promos.length;
    }
    for (var i = 0; i < PINS; i++) {
      createPin(promos[i], i);
    }
    PINS = 5;
  };
  // Удаление пинов
  window.removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

})();

