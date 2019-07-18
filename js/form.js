'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormChildren = adForm.querySelectorAll('fieldset, select, input');
  var adFormFieldAddress = adForm.querySelector('#address');
  var typeOfHousing = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var price = adForm.querySelector('#price');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersChildren = mapFilters.querySelectorAll('fieldset, select, input');
  var minPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  window.form = {
    activate: function () {
      adForm.classList.remove('ad-form--disabled');
      window.switchFormStatus(adFormChildren);
      window.switchFormStatus(mapFiltersChildren);
    },
    deactivate: function () {
      adForm.classList.add('ad-form--disabled');
      window.switchFormStatus(adFormChildren);
      window.switchFormStatus(mapFiltersChildren);
    }
  };

  // Функция для проверки цены в зависимости от типа жилья
  typeOfHousing.addEventListener('change', function (evt) {
    var minValue = minPrice[evt.target.value];
    price.min = minValue;
    price.placeholder = minValue;
  });

  // Функция для определения время выезда в зависимости от времени заезда и наоборот
  function onChangeTimeInput(evt) {
    var changedInput = evt.target === timeOut ? timeIn : timeOut;
    changedInput.value = evt.target.value;
  }

  timeIn.addEventListener('change', onChangeTimeInput);
  timeOut.addEventListener('change', onChangeTimeInput);

  // Функция для смены статуса элемента: Активный или неактивный
  window.switchFormStatus = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = !element[i].disabled;
    }
  };

  // Переключение статуса элементов формы и фильтров
  window.switchFormStatus(adFormChildren);
  window.switchFormStatus(mapFiltersChildren);

  // Получение значения координат
  window.form.setAddress = function (x, y) {
    adFormFieldAddress.value = x + ',' + y;
  };
})();
