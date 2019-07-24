'use strict';
(function () {
  var mainSection = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  // Отрисовка окна
  var drawPopup = function (template, section) {
    var popup = template.cloneNode(true);

    // Закрытие окна
    var onPopupClose = function () {
      section.removeChild(popup);
      document.removeEventListener('click', onPopupClose);
    };

    // Закрытие окна по нажатию Esc
    var onPopupEscPress = function (evt) {
      window.utils.isEscEvent(evt, onPopupClose);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onPopupClose);

    return popup;
  };

  window.message = {
    showError: function (errorMessage) {
      var errorPopup = drawPopup(errorTemplate, mainSection);
      errorPopup.querySelector('.error__message').textContent = errorMessage;
      mainSection.appendChild(errorPopup);
    },
    showSuccess: function () {
      var successPopup = drawPopup(successTemplate, mainSection);
      mainSection.appendChild(successPopup);
    }
  };

})();
