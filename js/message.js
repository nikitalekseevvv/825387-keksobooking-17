'use strict';
(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);

  var removeErrorPopup = function () {
    document.removeChild(errorMessage);
  };

  var removeSuccessPopup = function () {
    document.removeChild(successMessage);
  };

  function onPopupEscPress(evt) {
    window.utils.isEscEvent(evt, removeErrorPopup);
    window.utils.isEscEvent(evt, removeSuccessPopup);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  var addErrorPopup = function () {
    document.appendChild(errorMessage);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', removeErrorPopup);
  };

  var addSuccessPopup = function () {
    document.appendChild(successMessage);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', removeSuccessPopup);
  };

  window.errorHandler = function () {
    addErrorPopup();
  };

  window.successHandler = function () {
    addSuccessPopup();
  };

})();
