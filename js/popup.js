'use strict';
// Модуль popup.js
(function () {
  var setupWindow = document.querySelector('.setup');
  var setupWindowOpen = document.querySelector('.setup-open');
  var setupWindowClose = setupWindow.querySelector('.setup-close');
  var setupWindowIcon = setupWindowOpen.querySelector('.setup-open-icon');
  var inputName = setupWindow.querySelector('.setup-user-name');
  var setupWitcher = document.querySelector('.setup-wizard');
  var setupWitcherEyes = setupWitcher.querySelector('.wizard-eyes');
  var styleWitcherEyes = '.wizard-eyes';
  var valueWicherEyes = document.querySelector(['[name="eyes-color"]']);
  var setupWitcherCoat = setupWitcher.querySelector('.wizard-coat');
  var styleWitcherCoat = '.wizard-coat';
  var valueWitcherCoat = document.querySelector(['[name="coat-color"]']);
  var setupWitcherBall = document.querySelector('.setup-fireball-wrap');
  var styleWitcherBall = '.setup-fireball-wrap';
  var valueWitcherBall = document.querySelector(['[name="fireball-color"]']);
  var setupWizardForm = document.querySelector('.setup-wizard-form');

  var addHidden = function (name) {
    name.classList.add('hidden');
  };

  var removeHidden = function (name) {
    name.classList.remove('hidden');
  };

  // var removeListeners = function (element) {
  //   document.removeEventListener('keydown', element);
  //   document.removeEventListener('click', element);
  // };

  var changeFillColor = function (element, style, data) {
    var fillColor = document.querySelector(element).style.fill = window.utilities.getRandomElement(style);
    data.value = fillColor;
  };

  var changeBackgroundColor = function (element, style, data) {
    var fillBackground = document.querySelector(element).style.background = window.utilities.getRandomElement(style);
    data.value = fillBackground;
  };

  setupWindowOpen.addEventListener('click', function () {
    removeHidden(setupWindow);
  });

  setupWindowClose.addEventListener('click', function () {
    addHidden(setupWindow);
    setupWindow.removeAttribute('style');
  });

  setupWindowOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEY && evt.target !== inputName) {
      addHidden(setupWindow);
    }
  });

  setupWindowIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEY) {
      removeHidden(setupWindow);
    }
  });

  setupWitcherEyes.addEventListener('click', function () {
    changeFillColor(styleWitcherEyes, window.data.EYE_COLORS, valueWicherEyes);
  });

  setupWitcherCoat.addEventListener('click', function () {
    changeFillColor(styleWitcherCoat, window.data.COAT_COLORS, valueWitcherCoat);
  });

  setupWitcherBall.addEventListener('click', function () {
    changeBackgroundColor(styleWitcherBall, window.data.COAT_COLORS, valueWitcherBall);
  });

  // функция-обработчик отправки формы
  var formSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(addHidden.bind(null, setupWindow), window.backend.onErrorResponse, new FormData(setupWizardForm));
  };

  // обработчик отправки данных формы
  setupWizardForm.addEventListener('submit', formSubmit);

})();
