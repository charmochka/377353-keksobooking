'use strict';

(function () {
  var HIGHT_MAIN_BUTTON_WITH_PIN = 62;
  var WIDTH_MAIN_BUTTON = 40;
  var HIGHT_MAIN_BUTTON = 44;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  // Функция, которая убирает заглушку с карты
  var showMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', false);
    removeDisabled();
  };

  window.hideMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', true);
    window.addDisabled();
    document.querySelector('.notice__form').classList.add('notice__form--disabled');

  };

  // Делаем поля ввода не активными
  window.addDisabled = function () {
    var fieldset = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].setAttribute('disabled', 'disabled');
    }
  };
  // Заглушка для форм
  window.addDisabled();

  // Делаем поля ввода активными
  var removeDisabled = function () {
    var fieldset = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled');
    }
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
  };

  // Обработчик для показа объявления
  var onPinClick = function (evt) {
    if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
      var promoIndex = evt.target.dataset.promoIndex;
      window.clearOldPromo();

      window.createPromo(window.promos[promoIndex]);
    }
  };

  // Слушаем события на карте
  map.addEventListener('click', onPinClick);

  // Поиск координат центральной кнопки
  var getOffsetSum = function (elem) {
    var left = elem.offsetLeft;
    var top = elem.offsetTop;
    return {top: Math.round(top), left: Math.round(left)};
  };


  // Заполнение инпута "адрес" при загрузке страницы
  var writeValueAddress = function () {
    document.querySelector('#address').value = ((getOffsetSum(mainPin).left - WIDTH_MAIN_BUTTON / 2) + ', ' + (getOffsetSum(mainPin).top + HIGHT_MAIN_BUTTON / 2));
  };

  writeValueAddress();

  // Перетаскивание главного пина
  var pinHandler = document.querySelector('.map__pin--main');
  pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shift = {
      x: evt.clientX - mainPin.offsetLeft,
      y: evt.clientY - mainPin.offsetTop
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var coordinate = {
        x: moveEvt.clientX - shift.x,
        y: moveEvt.clientY - shift.y
      };
      if (coordinate.x < window.MIN_X) {
        coordinate.x = window.MIN_X;
      } else if (coordinate.x > window.MAX_X) {
        coordinate.x = window.MAX_X;
      }

      if (coordinate.y < window.MIN_Y) {
        coordinate.y = window.MIN_Y + 'px';
      } else if (coordinate.y > window.MAX_Y) {
        coordinate.y = window.MAX_Y + 'px';
      }
      mainPin.style.top = (coordinate.y) + 'px';
      mainPin.style.left = (coordinate.x) + 'px';
      // Заполнение инпута "адрес"
      document.querySelector('#address').value = ((getOffsetSum(mainPin).left - WIDTH_MAIN_BUTTON / 2) + ', ' + (getOffsetSum(mainPin).top + HIGHT_MAIN_BUTTON_WITH_PIN));

    };

      // Обработчик для активации карты
    var onPinMainMouseUp = function () {
      showMap();
      window.createPins(window.promos);

      document.querySelector('#address').setAttribute('disabled', 'disabled'); // Нельзя редактировать поле адреса

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  });

  // Entr по главному пину
  var onPinKeyDown = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.createPins(window.promos);
      mainPin.removeEventListener('keydown', onPinKeyDown);
    }
  };

  mainPin.addEventListener('keydown', onPinKeyDown);

})();
