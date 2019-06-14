'use strict';

var TYPES_OF_ADS = ['palace', 'flat', 'house', 'bungalo'];
var PIN_HEIGHT = 165;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130 + PIN_HEIGHT / 2;
var MAX_Y = 630 - PIN_HEIGHT / 2;
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
var createAds = function (index) {
  var adsList = [];

  for (var i = 0; i <= index; i++) {
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

activateMap();

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
var showAds = function (index) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < index; i++) {
    var similarAd = createAds(i);
    fragment.appendChild(renderPin(similarAd));
  }
  map.appendChild(fragment);
};

showAds(NUBMERS_OF_ADS);
