'use strict';

var TYPES_OF_ADS = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 65;
var MIN_X = 0 - PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH / 2;
var MIN_Y = 130;
var MAX_Y = 630;
var NUBMERS_OF_ADS = 8;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Получение рандомного значения
var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

// Получение рандомного элемента
var getRandomElement = function (elements) {
  return elements[getRandomNumber(0, elements.length)];
};

// Генерация аватара
var getAvatar = function (index) {
  index = index + 1;
  return 'img/avatars/user' + '0' + index + '.png';
};

// Создание массива объявлений
var createAds = function (quanlityOfAds) {
  var adsList = [];

  for (var i = 0; i < quanlityOfAds; i++) {
    adsList.push({
      author: {avatar: getAvatar(i)},
      offer: {type: getRandomElement(TYPES_OF_ADS)},
      location: {
        x: getRandomNumber(MIN_X, MAX_X),
        y: getRandomNumber(MIN_Y, MAX_Y)
      }
    });
  }
  return adsList;
};

// Задание 2. Активация карты

var activateMap = function () {
  map.classList.remove('map--faded');
};

// Задание 3. Создание элементов

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
var showAds = function (adsList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsList.length; i++) {
    fragment.appendChild(renderPin(adsList[i]));
  }

  map.appendChild(fragment);
};

// ----------------ЗАДАНИЕ 7 ---------------------

// Переменные для работы
var buttonMapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormChildren = adForm.querySelectorAll('fieldset, select, input');
var adFormFieldAddress = adForm.querySelector('#address');
var mainPin = map.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersChildren = mapFilters.querySelectorAll('fieldset, select, input');
var mainPinWidth = mainPin.querySelector('img').offsetWidth;
var mainPinHeight = mainPin.querySelector('img').offsetHeight;

// Функция для смены статуса элемента: Активный или неактивный
var switchFormStatus = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = !element[i].disabled;
  }
};

// Переключение статуса элементов формы и фильтров
switchFormStatus(adFormChildren);
switchFormStatus(mapFiltersChildren);


// Создание массива из координат пина
function getCoordinates() {
  var mainPinPositionLeft = parseInt(mainPin.style.left, 10);
  var mainPinPositionTop = parseInt(mainPin.style.top, 10);
  var coordinatesPin = [];

  var coords = {
    x: mainPinPositionLeft + mainPinWidth / 2,
    y: mainPinPositionTop + mainPinHeight / 2
  };
  coordinatesPin.push(coords.x);
  coordinatesPin.push(coords.y);

  return coordinatesPin;
}

// Получение значения координат
var setAddress = function (x, y) {
  adFormFieldAddress.value = x + ',' + y;
};

// Получение координат из данных
var setAddressPin = function () {
  getCoordinates();
  var resultAddress = getCoordinates();
  setAddress(resultAddress[0], resultAddress[1]);
};

setAddressPin();

// Функция для активации формы
var activateAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

// Функция для активации карты, формы и всего-всего-всего
var activatePage = function () {
  activateMap();
  activateAdForm();
  showAds(createAds(NUBMERS_OF_ADS));
  buttonMapPin.removeEventListener('click', activatePage);
  buttonMapPin.removeEventListener('mouseup', activatePage);
  switchFormStatus(adFormChildren);
  switchFormStatus(mapFiltersChildren);
  setAddressPin();
};

// Активация формы и фильтров по действиям
buttonMapPin.addEventListener('click', activatePage);


// ----------------ЗАДАНИЕ 8 ---------------------

var typeOfHousing = adForm.querySelector('#type');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var price = adForm.querySelector('#price');
var minPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
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

// ----------------ЗАДАНИЕ 9 -------------------

buttonMapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

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

    if (currentCoords.x > MIN_X && currentCoords.x < MAX_X) {
      buttonMapPin.style.left = currentCoords.x + 'px';
    }

    if (currentCoords.y > MIN_Y && currentCoords.y < MAX_Y) {
      buttonMapPin.style.top = currentCoords.y + 'px';
    }

    var setAddressPointer = {
      x: currentCoords.x + PIN_WIDTH / 2,
      y: currentCoords.y
    };

    setAddress(setAddressPointer.x, setAddressPointer.y);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    setAddress(setAddressPointer.x, setAddressPointer.y);
    buttonMapPin.removeEventListener('click', activatePage);
    buttonMapPin.removeEventListener('mouseup', activatePage);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
