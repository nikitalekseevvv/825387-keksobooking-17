'use strict';
(function () {
  // Генерация аватара
  var getAvatar = function (index) {
    index = index + 1;
    return 'img/avatars/user' + '0' + index + '.png';
  };

  // Создание массива объявлений
  window.createAds = function (quanlityOfAds) {
    var adsList = [];

    for (var i = 0; i < quanlityOfAds; i++) {
      adsList.push({
        author: {avatar: getAvatar(i)},
        offer: {type: window.getRandomElement(window.utils.TYPES_OF_ADS)},
        location: {
          x: window.getRandomNumber(window.utils.MIN_X, window.utils.MAX_X),
          y: window.getRandomNumber(window.utils.MIN_Y, window.utils.MAX_Y)
        }
      });
    }
    return adsList;
  };
})();
