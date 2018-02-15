'use strict';


var PROMO_COUNT = 8; // не будет больше кол аватаров
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MAX_GUESTS = 5;
var MIN_GUESTS = 1;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 150;
var MAX_Y = 500;
var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var typeApartment = ['flat', 'house', 'bungalo'];
var checkOptions = ['12:00', '13:00', '14:00'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // нужен шафл
var promos = generatePromo(avatars, titles, typeApartment, checkOptions, features, photos);
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

// Генерация случайных значений без повтора
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
      'x': randomInteger(MIN_X, MAX_X),
      'y': randomInteger(MIN_Y, MAX_Y)
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

// Функция, которая создает пин на основе шаблона
var createPin = function (promo, index) {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  pinTemplate.querySelector('img').src = promo.author.avatar;
  pinTemplate.querySelector('img').style.pointerEvents = 'none';
  pinTemplate.style.left = randomInteger(MIN_X, MAX_X) + 'px';
  pinTemplate.style.top = randomInteger(MIN_Y, MAX_Y) + 'px';
  var pindElement = pinTemplate.cloneNode(true);
  pindElement.dataset.promoIndex = index;

  document.querySelector('.map').insertBefore(pindElement, document.querySelector('.map__filters-container'));
};

// Выводит все pin объявления на экран
var createPins = function (promosArr) {
  for (var i = 0; i < promosArr.length; i++) {
    createPin(promosArr[i], i);
  }
};

// Функция, которая создает объявление на основе шаблона
var createPromo = function (promo) {
  var promoTemplate = document.querySelector('template').content.querySelector('.map__card');
  var promoElement = promoTemplate.cloneNode(true);
  document.querySelector('.map').insertBefore(promoElement, document.querySelector('.map__filters-container'));

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
};

// Обработчик для активации карты
var onPinMainClick = function (evt) {
  if (evt.target.parentNode.classList.contains('map__pin--main') && document.querySelector('.map').classList.contains('map--faded')) {
    showMap();
    createPins(promos);

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
    createPromo(promos[promoIndex]);
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
  console.log(document.querySelector('#type').options[choosen].value);
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

console.log(document.querySelector('#type'));
document.querySelector('#type').addEventListener('change', onTypeChange);
document.querySelector('#timein').addEventListener('change', onSelectTimeChange);
document.querySelector('#timeout').addEventListener('change', onSelectTimeChange);

var validate = function () {
  document.querySelector('#capacity').setCustomValidity('');
  var selectIndexRoom = document.querySelector('#room_number').options.selectedIndex;
  var rooms = document.querySelector('#room_number').options[selectIndexRoom].value;

  var selectIndexCapacity = document.querySelector('#capacity').options.selectedIndex;
  var capacity = document.querySelector('#capacity').options[selectIndexCapacity].value;

  if (rooms === 100 && capacity !== 0) {
    document.querySelector('#capacity').setCustomValidity('Не для гостей');
  } else if (capacity === 0 && rooms !== 100) {
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

document.querySelector('.form__submit').addEventListener('click', validate);


