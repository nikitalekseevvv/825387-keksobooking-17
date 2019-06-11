'use strict';

var TYPES_OF_ADS = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 165;
var MIN_X = 0 + PIN_WIDTH / 2;
var MAX_X = 1200 - PIN_WIDTH / 2;
var MIN_Y = 130 + PIN_HEIGHT / 2;
var MAX_Y = 630 - PIN_HEIGHT / 2;
var NUBMERS_OF_ADS = 8;
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

// Получение рандомного значения
var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

// Получение рандомного элемента
var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

// Генерация аватара
var getAvatar = function (index) {
  index = index + 1;
  return 'img/avatars/user' + '0' + index + '.png';
};

// Создание объявление
var createAd = function (arr) {
  var ad = {
    author: {avatar: getAvatar(arr)},
    offer: {type: getRandomElement(TYPES_OF_ADS)},
    location: {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    }
  };

  return ad;
};

// Задание 2. Активация карты

var activateMap = function () {
  map.classList.remove('map--faded');
};

activateMap();

// Задание 3. Создание элементов

// Генерация метки объявления
var renderPin = function (ad) {
  // Объявление и разрешение на клониование всего узла
  var pinTemplate = pin.cloneNode(true);
  // Указание аватара
  pinTemplate.querySelector('img').src = ad.author.avatar;
  // Указание расположения
  pinTemplate.style = 'left: ' + (ad.location.x) + 'px; top: ' + (ad.location.y) + 'px;';
  // Указание альтернативного значения
  pinTemplate.querySelector('img').alt = 'Заголовок объявления';
  // Возвращение метки объявления
  return pinTemplate;
};

// Задание 4. Отрисовка объявлений

// Функция для показа объявлений на карте
var showAds = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUBMERS_OF_ADS; i++) {
    var similarAd = createAd(i);
    fragment.appendChild(renderPin(similarAd));
  }
  map.appendChild(fragment);
};

showAds();
