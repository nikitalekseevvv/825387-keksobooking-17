'use strict';
(function () {
  // Генерация аватара
  var getAvatar = function (index) {
    index = index + 1;
    return 'img/avatars/user' + '0' + index + '.png';
  };

  // Создание массива объявлений
  window.createAds = function () {
    var ads = [];

    ads.forEach(function (arr) {
      ads.push({
        author: {avatar: getAvatar(arr)},
        offer: {type: window.utils.getRandomElement(window.utils.TYPES_OF_ADS)},
        location: {
          x: window.utils.getRandomNumber(window.utils.MIN_X, window.utils.MAX_X),
          y: window.utils.getRandomNumber(window.utils.MIN_Y, window.utils.MAX_Y)
        }
      });
      return ads;
    });
  };
})();
