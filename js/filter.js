'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var filtersContainer = document.querySelector('.map__filters-container');
  var filtersFormChildren = filtersForm.querySelectorAll('fieldset, select, input');
  // Максимальное кол-во пинов на карте
  var PIN_MAX = 5;

  // Находим все условия фильтрации
  var FilterElement = {
    TYPE: filtersForm.querySelector('#housing-type'),
    PRICE: filtersForm.querySelector('#housing-price'),
    ROOMS: filtersForm.querySelector('#housing-rooms'),
    GUESTS: filtersForm.querySelector('#housing-guests'),
    FEATURES: Array.from(filtersForm.querySelectorAll('input[name=features]'))
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
    return FilterElement.TYPE.value === 'any' || advert.offer.type === FilterElement.TYPE.value;
  };
  // Фильтрация по цене
  var checkAdvertPrice = function (advert) {
    return FilterElement.PRICE.value === 'any' || advert.offer.price >= pricesPin[FilterElement.PRICE.value].min && advert.offer.price <= pricesPin[FilterElement.PRICE.value].max;
  };
  // Фильтрация по кол-ву комнат
  var checkAdvertRooms = function (advert) {
    return FilterElement.ROOMS.value === 'any' || advert.offer.rooms === parseInt(FilterElement.ROOMS.value, 10);
  };
  // Фильтрация по кол-ву гостей
  var checkAdvertGuests = function (advert) {
    return FilterElement.GUESTS.value === 'any' || advert.offer.guests === parseInt(FilterElement.GUESTS.value, 10);
  };

  // Фильтрация по преимуществам
  function getFilteredFeatures() {
    return FilterElement.FEATURES.filter(function (filter) {
      return filter.checked;
    }).map(function (filter) {
      return filter.value;
    });
  }

  var checkAdvertFeatures = function (advert, filteredFeatures) {
    return filteredFeatures.every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  };

  // Функция фильтрации
  var filtrateData = function (array) {
    var filteredFeatures = getFilteredFeatures();
    return array.filter(function (advert) {
      return checkAdvertType(advert) && checkAdvertPrice(advert) && checkAdvertRooms(advert) && checkAdvertGuests(advert) && checkAdvertFeatures(advert, filteredFeatures);
    })
    .slice(0, PIN_MAX);
  };

  window.filter = {
    filtrateData: filtrateData,
    filtersContainer: filtersContainer,
    setChangeHandler: function (onFilterChange) {
      filtersForm.addEventListener('change', function () {
        window.debounce(onFilterChange);
      });
    },
    activate: function () {
      window.utils.switchFormStatus(filtersFormChildren);
    },
    deactivate: function () {
      window.utils.switchFormStatus(filtersFormChildren);
      filtersForm.reset();
    }
  };

  window.utils.switchFormStatus(filtersFormChildren);
})();
