'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGHT_PRICE = 50000;

  var getPriceOptions = function (price) {
    if (price < LOW_PRICE) {
      return 'low';
    } else if (price > HIGHT_PRICE) {
      return 'high';
    }
    return 'middle';
  };

  var onFilters = function () {
    var valueChoosenType = document.querySelector('#housing-type').value;
    var valueChoosenPrice = document.querySelector('#housing-price').value;
    var valueChoosenRooms = document.querySelector('#housing-rooms').value;
    var valueChoosenGuests = document.querySelector('#housing-guests').value;
    var activFeatures = document.querySelectorAll('.features input:checked');

    window.filterPromos = window.promos.filter(function (promo) {
      var checkFeature = true;
      for (var i = 0; i < activFeatures.length; i++) {
        if (promo.offer.features.indexOf(activFeatures[i].value) === -1) {
          checkFeature = false;
          break;
        }
      }
      return (promo.offer.type === valueChoosenType || valueChoosenType === 'any') &&
      (valueChoosenPrice === getPriceOptions(promo.offer.price) || valueChoosenPrice === 'any') &&
      (promo.offer.rooms === Number(valueChoosenRooms) || valueChoosenRooms === 'any') &&
      (promo.offer.guests === Number(valueChoosenGuests) || valueChoosenGuests === 'any') &&
      (checkFeature);

    });

    var pinLength = document.querySelectorAll('.map__pin').length;
    for (var j = 1; j < pinLength; j++) {
      document.querySelectorAll('.map__pin')[1].remove();
    }
    window.createPins(window.filterPromos);
  };
  document.querySelector('.map__filters-container').addEventListener('change', onFilters);

})();
