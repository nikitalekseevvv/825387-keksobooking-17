'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var isActive = false;

  // Генерация метки объявления
  window.renderPin = function (ad) {
    var templateCopy = pinTemplate.cloneNode(true);

    templateCopy.querySelector('img').src = ad.author.avatar;
    templateCopy.style.left = ad.location.x + 'px';
    templateCopy.style.top = ad.location.y + 'px';
    templateCopy.querySelector('img').alt = 'Заголовок объявления';

    return templateCopy;
  };

  // Создание массива из координат пина
  function getCoordinates() {
    return [
      parseInt(mainPin.style.left, 10) - window.utils.PIN_WIDTH / 2,
      parseInt(mainPin.style.top, 10) - (isActive ? window.utils.PIN_HEIGHT : window.utils.PIN_WIDTH / 2)
    ];
  }

  // Получение значения координат
  window.setAddress = function (x, y) {
    window.form.adFormFieldAddress.value = x + ',' + y;
  };

  // Получение координат из данных
  var setAddressPin = function () {
    getCoordinates();
    var resultAddress = getCoordinates();
    window.setAddress(resultAddress[0], resultAddress[1]);
  };

  setAddressPin();

})();
