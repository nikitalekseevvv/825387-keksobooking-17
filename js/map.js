'use strict';
(function () {
  var map = document.querySelector('.map');
  var buttonMapPin = document.querySelector('.map__pin--main');
  var isActive = false;
  var mainPin = map.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  function mapServerAdsToAds(serverAds) {
    return serverAds.map(function (ad, index) {
      return Object.assign({id: index}, ad);
    });
  }

  // Функция для показа объявлений на карте
  var successHandler = function (serverAds) {
    var fragment = document.createDocumentFragment();
    var ads = mapServerAdsToAds(serverAds);
    if (!isActive) {
      for (var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        fragment.appendChild(window.renderPin(ad));
      }
    }
    map.appendChild(fragment);
    isActive = true;
  };

  // Создание массива из координат пина
  var getCoordinates = function () {
    return [
      parseInt(mainPin.style.left, 10) - window.utils.PIN_WIDTH / 2,
      parseInt(mainPin.style.top, 10) - (isActive ? window.utils.PIN_HEIGHT : window.utils.PIN_WIDTH / 2)
    ];
  };

  // Получение координат из данных
  var setAddressPin = function () {
    getCoordinates();
    var resultAddress = getCoordinates();
    window.form.setAddress(resultAddress[0], resultAddress[1]);
  };

  setAddressPin();

  // Окно ошибки

  var removeErrorPopup = function () {
    document.removeChild(errorMessage);
  };

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, removeErrorPopup);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  var addErrorPopup = function () {
    document.appendChild(errorMessage);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', removeErrorPopup);
  };

  var errorHandler = function () {
    addErrorPopup();
  };

  // Функция для активации карты, формы и всего-всего-всего
  var activatePage = function () {
    activateMap();
    window.form.activate();
    setAddressPin();
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
      window.load(successHandler, errorHandler);
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
