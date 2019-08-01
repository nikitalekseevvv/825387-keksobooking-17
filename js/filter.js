'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  // Максимальное кол-во пинов на карте
  var PIN_MAX = 5;

  // Находим все условия фильтрации
  var filters = {
    TYPE: mapFilters.querySelector('#housing-type'),
    PRICE: mapFilters.querySelector('#housing-price'),
    ROOMS: mapFilters.querySelector('#housing-rooms'),
    GUESTS: mapFilters.querySelector('#housing-guests')
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
  var checkAdvertType = function (advert) {
    return filters.TYPE.value === 'any' || advert.offer.type === filters.TYPE.value;
  };
  // Фильтрация по цене
  var checkAdvertPrice = function (advert) {
    return filters.PRICE.value === 'any' || advert.offer.price >= pricesPin[filters.PRICE.value].min && advert.offer.price <= pricesPin[filters.PRICE.value].max;
  };
  // Фильтрация по кол-ву комнат
  var checkAdvertRooms = function (advert) {
    return filters.ROOMS.value === 'any' || advert.offer.rooms === parseInt(filters.ROOMS.value, 10);
  };
  // Фильтрация по кол-ву гостей
  var checkAdvertGuests = function (advert) {
    return filters.GUESTS.value === 'any' || advert.offer.guests === parseInt(filters.GUESTS.value, 10);
  };

  // Функция фильтрации
  var filtrateData = function (array) {
    return array.filter(function (advert) {
      return checkAdvertType(advert) && checkAdvertPrice(advert) && checkAdvertRooms(advert) && checkAdvertGuests(advert);
    })
    .slice(0, PIN_MAX);
  };

  window.filter = {
    filtrateData: filtrateData,
    setChangeHandler: function (onFilterChange) {
      mapFilters.addEventListener('change', onFilterChange);
    },
    reset: function () {
      mapFilters.reset();
    }
  };
})();
