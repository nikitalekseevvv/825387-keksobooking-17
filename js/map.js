'use strict';
(function () {
  var map = document.querySelector('.map');

  var activateMapAndForm = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
  };


  // Функция для активации карты, формы и всего-всего-всего
  window.activatePage = function () {
    activateMapAndForm();
    window.showAds(window.createAds(window.utils.NUBMERS_OF_ADS));
    window.switchFormStatus(window.form.adFormChildren);
    window.switchFormStatus(window.form.mapFiltersChildren);
    window.setAddressPin();
  };
})();
