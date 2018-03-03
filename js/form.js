'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var formFilters = document.querySelector('.map__filters');
  var capacity = document.querySelector('#capacity');
  var price = document.querySelector('#price');
  var input = document.querySelectorAll('input');
  var select = document.querySelectorAll('select');

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
        price.setAttribute('min', '1000');
        break;
      case 'bungalo':
        price.setAttribute('min', '0');
        break;
      case 'house':
        price.setAttribute('min', '5000');
        break;
      case 'palace':
        price.setAttribute('min', '10000');
        break;
    }
  };

  document.querySelector('#type').addEventListener('change', onTypeChange);
  document.querySelector('#timein').addEventListener('change', onSelectTimeChange);
  document.querySelector('#timeout').addEventListener('change', onSelectTimeChange);

  var validate = function () {
    capacity.setCustomValidity('');
    var selectIndexRoom = document.querySelector('#room_number').options.selectedIndex;
    var rooms = document.querySelector('#room_number').options[selectIndexRoom].value;

    var selectIndexCapacity = capacity.options.selectedIndex;
    var capacitySelected = capacity.options[selectIndexCapacity].value;

    if (rooms === '100' && capacitySelected !== '0') {
      capacity.setCustomValidity('Не для гостей');
    } else if (capacitySelected === '0' && rooms !== '100') {
      capacity.setCustomValidity('Возможно только для 100 комнат');
    } else if (capacitySelected > rooms) {
      capacity.setCustomValidity('Число гостей не должно привышать количество комнат');

    }
    for (var i = 0; i < input.length; i++) {

      if (input[i].checkValidity() === false) {
        input[i].style.borderColor = 'red';
      }
    }
    for (var j = 0; j < select.length; j++) {

      if (select[j].checkValidity() === false) {
        select[j].style.borderColor = 'red';
      }
    }
  };

  // Закрыть карту и удалить пины, объявления
  var resetFormHandler = function () {
    form.reset(); // Очистить форму
    formFilters.reset();
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

