'use strict';
(function () {
  // Максимальное кол-во пинов на карте
  var PIN_MAX = 5;

  // Находим все условия фильтрации
  var filters = {
    TYPE: document.querySelector('#housing-type'),
    PRICE: document.querySelector('#housing-price'),
    ROOMS: document.querySelector('#housing-rooms'),
    GUESTS: document.querySelector('#housing-guests')
  };

  // Значения фильтра по цене
  var pricesPin = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  // Фильтрация по типу
  var isAdvertType = function (advert) {
    return filters.TYPE.value === 'any' || advert.offer.type === filters.TYPE.value;
  };
  // Фильтрация по цене
  var isAdvertPrice = function (advert) {
    return filters.PRICE.value === 'any' || advert.offer.price >= pricesPin[filters.PRICE.value].min && advert.offer.price <= pricesPin[filters.PRICE.value].max;
  };
  // Фильтрация по кол-ву комнат
  var isAdvertRooms = function (advert) {
    return filters.ROOMS.value === 'any' || advert.offer.rooms === parseInt(filters.ROOMS.value, 10);
  };
  // Фильтрация по кол-ву гостей
  var isAdvertGuests = function (advert) {
    return filters.GUESTS.value === 'any' || advert.offer.guests === parseInt(filters.GUESTS.value, 10);
  };

  // Функция фильтрации
  var filtrateData = function (array) {
    return array.filter(function (advert) {
      return isAdvertType(advert) && isAdvertPrice(advert) && isAdvertRooms(advert) && isAdvertGuests(advert);
    })
    .slice(0, PIN_MAX);
  };

  window.filtrateData = filtrateData;
})();
