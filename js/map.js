'use strict';

(function () {
  var HIGHT_MAIN_BUTTON_WITH_PIN = 62;
  var WIDTH_MAIN_BUTTON = 40;
  var HIGHT_MAIN_BUTTON = 44;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var address = document.querySelector('#address');

  // Функция, которая убирает заглушку с карты
  var showMap = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.toggle('map--faded', false);
      removeDisabled();
      window.createPins(window.promos);
    }
  };

  window.hideMap = function () {
    map.classList.toggle('map--faded', true);
    window.addDisabled();
    form.classList.add('notice__form--disabled');
    mainPin.style.top = '';
    mainPin.style.left = '';
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
    form.classList.remove('notice__form--disabled');
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
    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  };

  // Заполнение инпута "адрес" при загрузке страницы
  var writeValueAddress = function () {
    var start = getOffsetSum(mainPin);
    address.value =
      'x:' + (start.left - WIDTH_MAIN_BUTTON / 2)
      + ', '
      + 'y:' + (start.top + HIGHT_MAIN_BUTTON / 2);
  };
  writeValueAddress();

  // Перетаскивание главного пина
  mainPin.addEventListener('mousedown', function (evt) {
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

      coordinate.x = Math.min(
          Math.max(
              coordinate.x,
              window.MIN_X
          ),
          window.MAX_X
      );
      coordinate.y = Math.min(
          Math.max(
              coordinate.y,
              window.MIN_Y
          ),
          window.MAX_Y
      );
      mainPin.style.top = (coordinate.y) + 'px';
      mainPin.style.left = (coordinate.x) + 'px';
      // Заполнение инпута "адрес"
      address.value =
       'x:' + (getOffsetSum(mainPin).left - WIDTH_MAIN_BUTTON / 2)
       + ', '
       + 'y:' + (getOffsetSum(mainPin).top + HIGHT_MAIN_BUTTON_WITH_PIN);
    };

      // Обработчик для активации карты
    var onPinMainMouseUp = function () {
      showMap();


      address.setAttribute('readonly', ''); // Нельзя редактировать поле адреса

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
