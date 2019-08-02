'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormChildren = adForm.querySelectorAll('fieldset, select, input');
  var adFormFieldAddress = adForm.querySelector('#address');
  var title = document.querySelector('#title');
  var typeOfHousing = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var price = adForm.querySelector('#price');
  var roomSelect = adForm.querySelector('#room_number');
  var guestSelect = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var minPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  window.form = {
    activate: function () {
      adForm.classList.remove('ad-form--disabled');
      window.utils.switchFormStatus(adFormChildren);
    },
    deactivate: function () {
      adForm.classList.add('ad-form--disabled');
      window.utils.switchFormStatus(adFormChildren);
      adForm.reset();
    }
  };

  // Функция для проверки цены в зависимости от типа жилья
  typeOfHousing.addEventListener('change', function (evt) {
    var minValue = minPrice[evt.target.value];
    price.min = minValue;
    price.placeholder = minValue;
  });

  // Функция для определения время выезда в зависимости от времени заезда и наоборот
  var onChangeTimeInput = function (evt) {
    var changedInput = evt.target === timeOut ? timeIn : timeOut;
    changedInput.value = evt.target.value;
  };

  timeIn.addEventListener('change', onChangeTimeInput);
  timeOut.addEventListener('change', onChangeTimeInput);

  // Переключение статуса элементов формы
  window.utils.switchFormStatus(adFormChildren);

  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Минимальная длина — 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Максимальная длина — 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  });

  price.addEventListener('invalid', function () {
    if (price.validity.rangeOverflow) {
      price.setCustomValidity('Максимальная цена — 1 000 000');
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  });

  // Получение значения координат
  window.form.setAddress = function (x, y) {
    adFormFieldAddress.value = x + ',' + y;
    adFormFieldAddress.setAttribute('readonly', 'readonly');
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), function () {
      window.message.showSuccess();
      window.form.deactivate();
      window.filter.deactivate();
      window.map.deactivate();
    },
    window.message.showError);
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.deactivate();
    window.filter.deactivate();
    window.map.deactivate();
  });

  var syncRoomToGuest = function () {
    var roomToGuestMessage = '';
    if (roomSelect.value !== '100' && guestSelect.value > roomSelect.value) {
      roomToGuestMessage = 'Извините, но количество гостей не должно превышать ' + roomSelect.value + '.';
    } else if (roomSelect.value !== '100' && guestSelect.value === '0') {
      roomToGuestMessage = 'Извините, но данная опция доступна только для аппартаментов со 100 комнатами.';
    } else if (roomSelect.value === '100' && guestSelect.value !== '0') {
      roomToGuestMessage = 'Извините, но аппартаменты на 100 комнат не предназначены для гостей.';
    }
    guestSelect.setCustomValidity(roomToGuestMessage);
  };

  syncRoomToGuest();

  var optionChangeHandler = function () {
    syncRoomToGuest();
  };

  roomSelect.addEventListener('change', optionChangeHandler);
  guestSelect.addEventListener('change', optionChangeHandler);
})();
