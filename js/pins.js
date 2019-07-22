'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Генерация метки объявления
  window.renderPin = function (ad) {
    var templateCopy = pinTemplate.cloneNode(true);

    templateCopy.querySelector('img').src = ad.author.avatar;
    templateCopy.style.left = ad.location.x + 'px';
    templateCopy.style.top = ad.location.y + 'px';
    templateCopy.querySelector('img').alt = 'Заголовок объявления';

    return templateCopy;
  };
})();
