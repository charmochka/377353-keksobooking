'use strict';

(function () {
  var map = document.querySelector('.map');

  // Функция, которая создает объявление на основе шаблона
  window.createPromo = function (promo) {
    var promoTemplate = document.querySelector('template').content.querySelector('.map__card');
    var promoElement = promoTemplate.cloneNode(true);
    map.insertBefore(promoElement, document.querySelector('.map__filters-container')); // Всталяем фрагмент в DOM

    promoElement.querySelector('h3').textContent = promo.offer.title;
    promoElement.querySelector('.popup__avatar').src = promo.author.avatar;
    promoElement.querySelectorAll('p')[0].textContent = promo.offer.address;
    promoElement.querySelectorAll('p')[1].textContent = promo.offer.price + '/ночь';
    promoElement.querySelectorAll('p')[2].textContent = promo.offer.rooms + ' комнаты для ' + promo.offer.guests + ' гостей';
    promoElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + promo.offer.checkin + ', выезд до ' + promo.offer.checkout;
    promoElement.querySelectorAll('p')[4].textContent = promo.offer.description;

    switch (promo.offer.type) {
      case 'flat':
        promoElement.querySelector('h4').textContent = 'Комната';
        break;
      case 'bungalo':
        promoElement.querySelector('h4').textContent = 'Бунгало';
        break;
      case 'house':
        promoElement.querySelector('h4').textContent = 'Дом';
        break;
    }

    // Вывод картинок для объявления
    var photoTemplate = promoElement.querySelector('.popup__pictures');
    for (var i = 0; i < promo.offer.photos.length; i++) {
      var photoPromo = photoTemplate.querySelector('li').querySelector('img');
      var photoElement = photoPromo.cloneNode(true);
      photoElement.src = promo.offer.photos[i];
      photoElement.style.cssText = 'width:100px; height:100px;';
      photoTemplate.querySelector('li').appendChild(photoElement);
    }

    // Генерируем фичи
    var featureTemplate = promoElement.querySelector('.popup__features');
    var childrenFeatures = featureTemplate.querySelectorAll('li');
    // Удаляем всех детей
    for (var k = 0; k < childrenFeatures.length; k++) {
      featureTemplate.removeChild(childrenFeatures[k]);
    }

    // Добавляем новых детей
    for (var j = 0; j < promo.offer.features.length; j++) {
      var myFeatures = document.createElement('li');

      featureTemplate.appendChild(myFeatures);
      myFeatures.className = 'feature feature--' + promo.offer.features[j];
    }

    map.addEventListener('click', onButtonClosePopup);
    map.addEventListener('keydown', onClosePopupKeyDown);
  };

  var onButtonClosePopup = function (evt) {
    if ((evt.target === document.querySelector('.popup__close')) || (evt.target.className === 'popup__close')) {
      evt.stopPropagation();
      window.closePopup();
      map.removeEventListener('click', onButtonClosePopup);
    }
  };
  window.closePopup = function () {
    map.removeChild(document.querySelector('.map__card'));

  };

  var onClosePopupKeyDown = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.closePopup();
      map.removeEventListener('keydown', onClosePopupKeyDown);
    }
  };

  // Удаляет открытое объявление
  window.clearOldPromo = function () {
    if (document.querySelector('.map__card')) {
      map.removeChild(document.querySelector('.map__card'));
    }
  };

})();
