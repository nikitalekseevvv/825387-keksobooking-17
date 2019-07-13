'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var buttonMapPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var isActive = false;

  // Генерация метки объявления
  var renderPin = function (ad) {
    var templateCopy = pinTemplate.cloneNode(true);

    templateCopy.querySelector('img').src = ad.author.avatar;
    templateCopy.style.left = ad.location.x + 'px';
    templateCopy.style.top = ad.location.y + 'px';
    templateCopy.querySelector('img').alt = 'Заголовок объявления';

    return templateCopy;
  };

  // Задание 4. Отрисовка объявлений

  // Функция для показа объявлений на карте
  window.showAds = function (adsList) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adsList.length; i++) {
      fragment.appendChild(renderPin(adsList[i]));
    }

    map.appendChild(fragment);
  };

  // Создание массива из координат пина
  function getCoordinates() {
    return [
      parseInt(mainPin.style.left, 10) - window.utils.PIN_WIDTH / 2,
      parseInt(mainPin.style.top, 10) - (isActive ? window.utils.PIN_HEIGHT : window.utils.PIN_WIDTH / 2)
    ];
  }

  // Получение значения координат
  var setAddress = function (x, y) {
    window.form.adFormFieldAddress.value = x + ',' + y;
  };

  // Получение координат из данных
  var setAddressPin = function () {
    getCoordinates();
    var resultAddress = getCoordinates();
    setAddress(resultAddress[0], resultAddress[1]);
  };

  setAddressPin();

  buttonMapPin.addEventListener('mousedown', function (evt) {
    if (!isActive) {
      isActive = true;
      window.activatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: buttonMapPin.offsetLeft - shift.x,
        y: buttonMapPin.offsetTop - shift.y
      };

      if (currentCoords.x > window.utils.MIN_X && currentCoords.x < window.utils.MAX_X) {
        buttonMapPin.style.left = currentCoords.x + 'px';
      }

      if (currentCoords.y > window.utils.MIN_Y && currentCoords.y < window.utils.MAX_Y) {
        buttonMapPin.style.top = currentCoords.y + 'px';
      }

      var setAddressPointer = {
        x: currentCoords.x + window.utils.PIN_MAIN_WIDTH / 2,
        y: currentCoords.y + window.utils.PIN_MAIN_HEIGHT
      };

      setAddress(setAddressPointer.x, setAddressPointer.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);

    };

    var onMouseClick = function (clickEvt) {
      clickEvt.preventDefault();
      document.removeEventListener('click', onMouseClick);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('click', onMouseClick);
  });

})();
