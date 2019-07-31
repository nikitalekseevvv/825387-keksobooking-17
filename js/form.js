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
  var roomSelect = adForm.querySelector('#room_number');
  var guestSelect = adForm.querySelector('#capacity');
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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), window.resetPage, window.message.showError);
  });

  window.resetForm = function () {
    adForm.querySelector('#title').value = '';
    price.value = '';
    roomSelect.value = '1';
    guestSelect.value = '1';
    typeOfHousing.value = 'flat';
    price.min = price.placeholder = minPrice[typeOfHousing.value];
    adForm.querySelector('#description').value = '';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
  };

  function syncRoomToGuest() {
    var roomToGuestMessage = '';
    if (roomSelect.value !== '100' && guestSelect.value > roomSelect.value) {
      roomToGuestMessage = 'Извините, но количество гостей не должно превышать ' + roomSelect.value + '.';
    } else if (roomSelect.value !== '100' && guestSelect.value === '0') {
      roomToGuestMessage = 'Извините, но данная опция доступна только для аппартаментов со 100 комнатами.';
    } else if (roomSelect.value === '100' && guestSelect.value !== '0') {
      roomToGuestMessage = 'Извините, но аппартаменты на 100 комнат не предназначены для гостей.';
    }
    guestSelect.setCustomValidity(roomToGuestMessage);
  }

  syncRoomToGuest();

  var optionChangeHandler = function () {
    syncRoomToGuest();
  };

  roomSelect.addEventListener('change', optionChangeHandler);
  guestSelect.addEventListener('change', optionChangeHandler);
})();
