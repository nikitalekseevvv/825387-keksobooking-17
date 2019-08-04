'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 82;

  window.utils = {
    TYPES_OF_ADS: ['palace', 'flat', 'house', 'bungalo'],
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    MIN_X: 0 - PIN_MAIN_WIDTH / 2,
    MAX_X: 1200 - PIN_MAIN_WIDTH / 2,
    MIN_Y: 130 - PIN_MAIN_HEIGHT,
    MAX_Y: 630 - PIN_MAIN_HEIGHT,
    NUBMERS_OF_ADS: 8,
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    switchFormStatus: function (elements) {
      elements.forEach(function (element) {
        element.disabled = !element.disabled;
      });
    },
    getRandomNumber: function (min, max) {
      return Math.random() * (max - min) + min;
    },
    getRandomElement: function (elements) {
      return elements[window.getRandomNumber(0, elements.length)];
    }
  };
})();

