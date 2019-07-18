'use strict';
(function () {
  var map = document.querySelector('.map');
  var buttonMapPin = document.querySelector('.map__pin--main');
  var isActive = false;
  var mainPin = map.querySelector('.map__pin--main');

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  // Функция для показа объявлений на карте
  var showAds = function (adsList) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adsList.length; i++) {
      fragment.appendChild(window.renderPin(adsList[i]));
    }

    map.appendChild(fragment);
  };

  // Функция для активации карты, формы и всего-всего-всего
  var activatePage = function () {
    activateMap();
    showAds(window.createAds(window.utils.NUBMERS_OF_ADS));
    window.form.activate();
    window.setAddressPin();
  };

  // Создание массива из координат пина
  window.map.getCoordinates = function () {
    return [
      parseInt(mainPin.style.left, 10) - window.utils.PIN_WIDTH / 2,
      parseInt(mainPin.style.top, 10) - (isActive ? window.utils.PIN_HEIGHT : window.utils.PIN_WIDTH / 2)
    ];
  };

  buttonMapPin.addEventListener('mousedown', function (evt) {
    if (!isActive) {
      isActive = true;
      activatePage();
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

      window.form.setAddress(setAddressPointer.x, setAddressPointer.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
