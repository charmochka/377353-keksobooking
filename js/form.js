'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  // Валидация формы
  var onSelectTimeChange = function (evt) {
    var choosen = evt.target.selectedIndex;
    document.querySelector('#timein').options[choosen].selected = true;
    document.querySelector('#timeout').options[choosen].selected = true;
  };

  // Проверка, сопоставляет тип жилья и минимальную цену, реагирует на изменение типа жилья
  var onTypeChange = function (evt) {

    var choosen = evt.target.selectedIndex;
    var typeOfApartmentsValue = document.querySelector('#type').options[choosen].value;
    switch (typeOfApartmentsValue) {
      case 'flat':
        document.querySelector('#price').setAttribute('min', '1000');
        break;
      case 'bungalo':
        document.querySelector('#price').setAttribute('min', '0');
        break;
      case 'house':
        document.querySelector('#price').setAttribute('min', '5000');
        break;
      case 'palace':
        document.querySelector('#price').setAttribute('min', '10000');
        break;
    }
  };

  document.querySelector('#type').addEventListener('change', onTypeChange);
  document.querySelector('#timein').addEventListener('change', onSelectTimeChange);
  document.querySelector('#timeout').addEventListener('change', onSelectTimeChange);

  var validate = function () {
    document.querySelector('#capacity').setCustomValidity('');
    var selectIndexRoom = document.querySelector('#room_number').options.selectedIndex;
    var rooms = document.querySelector('#room_number').options[selectIndexRoom].value;

    var selectIndexCapacity = document.querySelector('#capacity').options.selectedIndex;
    var capacity = document.querySelector('#capacity').options[selectIndexCapacity].value;
    // Если ставить ===, так как хочет слинт, то все ломается
    if (rooms === '100' && capacity !== '0') {
      document.querySelector('#capacity').setCustomValidity('Не для гостей');
    } else if (capacity === '0' && rooms !== '100') {
      document.querySelector('#capacity').setCustomValidity('Возможно только для 100 комнат');
    } else if (capacity > rooms) {
      document.querySelector('#capacity').setCustomValidity('Число гостей не должно привышать количество комнат');

    }
    for (var i = 0; i < document.querySelectorAll('input').length; i++) {

      if (document.querySelectorAll('input')[i].checkValidity() === false) {
        document.querySelectorAll('input')[i].style.borderColor = 'red';
      }
    }
    for (var j = 0; j < document.querySelectorAll('select').length; j++) {

      if (document.querySelectorAll('select')[j].checkValidity() === false) {
        document.querySelectorAll('select')[j].style.borderColor = 'red';
      }
    }
  };

  // Закрыть карту и удалить пины, объявления
  //Удаление пинов
  var resetFormHandler = function (evt) {
    evt.preventDefault();

    var pins = document.querySelectorAll('.map__pin');
    //window.removePins(pins)
   // window.removePins(window.filterPromos)      
    //window.closePopup();
    form.reset();
    var pinLength = document.querySelectorAll('.map__pin').length;
    for (var i = 1; i < pinLength; i++) {
      document.querySelectorAll('.map__pin')[1].remove();
    }

    var promoLength = document.querySelectorAll('.map__card.popup').length;
    for (var j = 0; j < promoLength; j++) {
      document.querySelectorAll('.map__card.popup')[0].remove();
    }

    // var inputLength = document.querySelectorAll('input').length;
    // for (var k = 0; k < inputLength; k++) {
    //   document.querySelectorAll('input')[k].value = '';
    // }

    // var selectLength = document.querySelectorAll('select').length;
    // for (var n = 0; n < selectLength; n++) {
    //   document.querySelectorAll('select')[n].selectedIndex = 0;
    // }
    // var featureLength = document.querySelectorAll('.feature').length; // Разобраться с тем, что стили не удаляются
    // for (var m = 0; m < featureLength; m++) {
    //   document.querySelectorAll('.feature')[m].style.backgroundColor = '#fafafa';
    // }
    // document.querySelector('#description').value = '';

    window.hideMap();
  };
  document.querySelector('.form__reset').addEventListener('click', resetFormHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    document.querySelector('#address').removeAttribute('disabled');
    window.backend.upload(new FormData(form), validate, window.backend.onError);
    resetFormHandler();

  });
})();

