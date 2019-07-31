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
  var getFeature = function (popupFeaturesElement, features) {
    popupFeaturesElement.textContent = '';
    features.forEach(function (feature) {
      var itemElement = document.createElement('li');
      itemElement.classList.add('popup__feature', 'popup__feature--' + feature);
      popupFeaturesElement.appendChild(itemElement);
    });
  };

  // Получение фото
  var getPhoto = function (popupPhotosElement, photos) {
    popupPhotosElement.textContent = '';
    photos.forEach(function (photo) {
      var imgElement = document.createElement('img');
      imgElement.classList.add('popup__photo');
      imgElement.src = photo;
      imgElement.alt = 'Фотография жилья';
      imgElement.width = PHOTO_WIDTH;
      imgElement.height = PHOTO_HEIGHT;
      popupPhotosElement.appendChild(imgElement);
    });
  };

  // Получение карточки объявления
  var createCardElement = function (ad) {
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
    getFeature(сardElement.features, ad.offer.features);
    getPhoto(сardElement.photos, ad.offer.photos);

    return card;
  };

  // Экспорт функции вывода карточки
  window.createCard = function (adData) {
    var cardElement = createCardElement(adData);
    var closeBtnElement = cardElement.querySelector('.popup__close');

    // Закрытие карточки
    window.closeCard = function () {
      cardElement.remove();
      document.removeEventListener('keydown', onCardEscPress);
    };

    // Закрытие карточки по клавише
    var onCardEscPress = function (evt) {
      window.utils.isEscEvent(evt, window.closeCard);
    };

    // Закрытие карточки мышкой
    var onCardCloseClick = function () {
      window.closeCard();
    };

    closeBtnElement.addEventListener('click', onCardCloseClick);
    document.addEventListener('keydown', onCardEscPress);

    return cardElement;
  };

})();
