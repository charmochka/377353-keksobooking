'use strict';

(function () {
  var HIGHT_MAIN_BUTTON_WITH_PIN = 62;
  var WIDTH_MAIN_BUTTON = 40;
  var HIGHT_MAIN_BUTTON = 44;

  // Функция, которая убирает заглушку с карты
  var showMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', false);
    removeDisabled();
  };
  var hideMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', true);
    addDisabled();
  };

  // Делаем поля ввода не активными
  var addDisabled = function () {
    var fieldset = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].setAttribute('disabled', 'disabled');
    }
  };
  // Заглушка для форм
  addDisabled();

  // Делаем поля ввода активными
  var removeDisabled = function () {
    var fieldset = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled');
    }
  };


  // Обработчик для активации карты
  var onPinMainClick = function (evt) {
    if (evt.target.parentNode.classList.contains('map__pin--main') && document.querySelector('.map').classList.contains('map--faded')) {
      showMap();
      window.createPins(window.promos);

      // Заполнение инпута "адрес" при активации карты
      document.querySelector('#address').value = ((getOffsetSum(mainPin).left - WIDTH_MAIN_BUTTON / 2) + ', ' + (getOffsetSum(mainPin).top - HIGHT_MAIN_BUTTON_WITH_PIN));
      document.querySelector('#address').setAttribute('disabled', 'disabled'); // Нельзя редактировать поле адреса
    }
  };
  // Обработчик для показа объявления
  // Как сократить эти сплиты?
  var onPinClick = function (evt) {
    if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
      var promoIndex = evt.target.dataset.promoIndex;
      window.createPromo(window.promos[promoIndex]);
    }
  };

  // Слушаем события на карте
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  map.addEventListener('mouseup', onPinMainClick);
  map.addEventListener('click', onPinClick);

  // Поиск координат центральной кнопки
  function getOffsetSum(elem) {
    var top = 0;
    var left = 0;
    while (elem) {
      top = top + parseFloat(elem.offsetTop);
      left = left + parseFloat(elem.offsetLeft);
      elem = elem.offsetParent;
    }
    return {top: Math.round(top), left: Math.round(left)};
  }

  // Заполнение инпута "адрес" при загрузке страницы
  var writeValueAddress = function () {
    document.querySelector('#address').value = ((getOffsetSum(mainPin).left - WIDTH_MAIN_BUTTON / 2) + ', ' + (getOffsetSum(mainPin).top - HIGHT_MAIN_BUTTON / 2));
  };
  writeValueAddress();

  // Закрыть карту и удалить пины, объявления
  var onCancleClick = function () {
    var pinLength = document.querySelectorAll('.map__pin').length;
    for (var i = 1; i < pinLength; i++) {
      document.querySelectorAll('.map__pin')[1].remove();
    }

    var promoLength = document.querySelectorAll('.map__card.popup').length;
    for (var j = 0; j < promoLength; j++) {
      document.querySelectorAll('.map__card.popup')[0].remove();
    }

    var inputLength = document.querySelectorAll('input').length;
    for (var k = 0; k < inputLength; k++) {
      document.querySelectorAll('input')[k].value = '';
    }

    var selectLength = document.querySelectorAll('select').length;
    for (var n = 0; n < selectLength; n++) {
      document.querySelectorAll('select')[n].selectedIndex = 0;
    }
    document.querySelector('#description').value = '';
    hideMap();
  };
  document.querySelector('.form__reset').addEventListener('click', onCancleClick);
})();

