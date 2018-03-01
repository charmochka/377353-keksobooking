'use strict';

(function () {
  var form = document.querySelector('.notice__form');

  // Привязывает поля въезда и выезда
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

  var resetFormHandler = function () {
    form.reset(); // Очистить форму
    window.removePins(); // Удалить пины
    window.clearOldPromo(); // Удалить объявления
    window.hideMap(); // Деактивировать карту
  };
  document.querySelector('.form__reset').addEventListener('click', resetFormHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), validate, window.backend.onError);
    resetFormHandler();

  });
})();

