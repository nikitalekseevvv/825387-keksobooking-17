'use strict';
(function () {
  var mainSection = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  // Отрисовка окна
  var drawPopup = function (template, section) {
    var popup = template.clonNode(true);

    // Закрытие окна
    var onPopupClose = function () {
      section.removeChild(popup);
    };

    // Закрытие окна по нажатию Esc
    var onPopupEscPress = function (evt) {
      window.utils.isEscEvent(evt, onPopupClose);
    };

    section.addEventListener('keydown', onPopupEscPress);
    section.addEventListener('click', onPopupClose);

    return popup;
  };

  window.message = {
    showError: function (errorMessage) {
      var fragment = document.createDocumentFragment();
      var errorPopup = drawPopup(errorTemplate, mainSection);
      errorPopup.querySelector('.error__message').textContent = errorMessage;
      fragment.appendChild(errorPopup);
      mainSection.appendChild(fragment);
    },
    showSuccess: function () {
      var fragment = document.createDocumentFragment();
      var successPopup = drawPopup(successTemplate, mainSection);
      fragment.appendChild(successPopup);
      mainSection.appendChild(fragment);
    }
  };

})();
