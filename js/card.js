'use strict';
(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var AccomodationType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  // Получение преимуществ
  function getFeature(name) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + name);
    return featureElement;
  }

  // Получение фото
  function getPhoto(src) {
    var photoElement = document.createElement('img');
    photoElement.src = src;
    photoElement.classList.add('popup__photo');
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photoElement.alt = 'Фотография жилья';
    return photoElement;
  }

  // Получение карточки объявления
  window.renderCardElement = function (ad) {
    var card = cardTemplate.cloneNode(true);
    var сardElement = {
      title: card.querySelector('.popup__title'),
      address: card.querySelector('.popup__text--address'),
      price: card.querySelector('.popup__text--price'),
      type: card.querySelector('.popup__type'),
      capacity: card.querySelector('.popup__text--capacity'),
      time: card.querySelector('.popup__text--time'),
      description: card.querySelector('.popup__description'),
      avatar: card.querySelector('.popup__avatar'),
      features: card.querySelector('.popup__features'),
      photos: card.querySelector('.popup__photos')
    };

    сardElement.title.textContent = ad.offer.title;
    сardElement.address.textContent = ad.offer.address;
    сardElement.price.textContent = ad.offer.price + '₽/ночь';
    сardElement.type.textContent = AccomodationType[ad.offer.type.toUpperCase()];
    сardElement.capacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    сardElement.time.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    сardElement.description.textContent = ad.offer.description;
    сardElement.avatar.src = ad.author.avatar;

    ad.offer.features.forEach(function (feature) {
      сardElement.features.appendChild(getFeature(feature));
    });

    ad.offer.photos.forEach(function (src) {
      сardElement.photos.appendChild(getPhoto(src));
    });

    return card;
  };

  window.card = {
    renderCardElement: renderCardElement
  };
})();
