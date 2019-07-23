'use strict';
(function () {
  // Глобальные переменные
  var TYPES_OF_ADS = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 82;
  var MIN_X = 0 - PIN_MAIN_WIDTH / 2;
  var MAX_X = 1200 - PIN_MAIN_WIDTH / 2;
  var MIN_Y = 130 - PIN_MAIN_HEIGHT;
  var MAX_Y = 630 - PIN_MAIN_HEIGHT;
  var NUBMERS_OF_ADS = 8;

  // Получение рандомного значения
  window.getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  // Получение рандомного элемента
  window.getRandomElement = function (elements) {
    return elements[window.getRandomNumber(0, elements.length)];
  };

  window.utils = {
    TYPES_OF_ADS: TYPES_OF_ADS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    NUBMERS_OF_ADS: NUBMERS_OF_ADS,
    keycode: function () {
      var ESC_KEYCODE = 27;
      var ENTER_KEYCODE = 13;

      return {
        isEscEvent: function (evt, action) {
          if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
            action();
          }
        },
        isEnterEvent: function (evt, action) {
          if (evt.key === 'Enter' || evt.keyCode === ENTER_KEYCODE) {
            action();
          }
        }
      };
    }
  };
})();

