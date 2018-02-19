'use strict';

(function () {

  var PROMO_COUNT = 8; // не будет больше кол аватаров
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 5;
  var MIN_GUESTS = 1;
  window.MIN_X = 300;
  window.MAX_X = 900;
  window.MIN_Y = 150;
  window.MAX_Y = 500;
  var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var typeApartment = ['flat', 'house', 'bungalo'];
  var checkOptions = ['12:00', '13:00', '14:00'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // нужен шафл
  window.promos = generatePromo(avatars, titles, typeApartment, checkOptions, features, photos);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // Генерация массива случайной длинны для фич
  function getRandomFeatures(arrMainFeatures) {
    var rand = Math.floor(Math.random() * (arrMainFeatures.length - 1));
    return shuffleArray(arrMainFeatures).slice(0, rand + 1);
  }

  // Генерация случайного индекса элемента
  function getRandomElement(array) {
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
  }

  // Генерация случайных чисел в диапазоне
  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }


  // Создаем объявление на основе данных из объекта
  function generatePromo(arrAvatars, arrTitles, arrTypes, arrCheckOptions, arrFeatures, arrPhotos) {
    var randomAvatar = shuffleArray(arrAvatars);
    var randomTitle = shuffleArray(arrTitles);
    var arrPromos = [];
    for (var i = 0; i < PROMO_COUNT; i++) {
      var location = {
        'x': randomInteger(window.MIN_X, window.MAX_X),
        'y': randomInteger(window.MIN_Y, window.MAX_Y)
      };
      var promo = {
        'author': {
          'avatar': randomAvatar[i]
        },
        'offer': {
          'title': randomTitle[i],
          'address': location.x + ', ' + location.y,
          'price': (randomInteger(MIN_PRICE, MAX_PRICE) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '),
          'type': getRandomElement(arrTypes),
          'rooms': randomInteger(MIN_ROOMS, MAX_ROOMS),
          'guests': randomInteger(MIN_GUESTS, MAX_GUESTS),
          'checkin': getRandomElement(arrCheckOptions),
          'checkout': getRandomElement(arrCheckOptions),
          'features': getRandomFeatures(arrFeatures),
          'description': '',
          'photos': shuffleArray(arrPhotos)
        }
      };
      arrPromos.push(promo);
    }
    return arrPromos;
  }

})();
