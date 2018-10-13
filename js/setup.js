'use strict';

var NUMBER_OF_WITCHERS = 4;

// Создаем массив характеристик
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 27;
var ENTER_KEY = 13;

// Копируем шаблон, задаем лист и создаем фрагмент
var witchersTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var withchersList = document.querySelector('.setup-similar-list');
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

// Пишем рандомизатор
var getRandomElement = function (arrayName) {
  return arrayName[Math.floor(Math.random() * (arrayName.length))];
};

// Создаем случайного волшебника
var randomWitcher = function () {
  var witcher = {};
  witcher.name = getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES);
  witcher.coatColors = getRandomElement(COAT_COLORS);
  witcher.eyesColors = getRandomElement(EYE_COLORS);
  return witcher;
};

// Добовляем DOM элемент на основании объекта
var createWitcher = function (witcherData) {
  var withchersInfo = witchersTemplate.cloneNode(true);
  withchersInfo.querySelector('.setup-similar-label').textContent = witcherData.name;
  withchersInfo.querySelector('.wizard-coat').style.fill = witcherData.coatColors;
  withchersInfo.querySelector('.wizard-eyes').style.fill = witcherData.eyesColors;
  return fragment.appendChild(withchersInfo);
};

// Блок с фунциями и event handlers экрана настройки
var addHidden = function (name) {
  name.classList.add('hidden');
};

var removeHidden = function (name) {
  name.classList.remove('hidden');
};

var removeListeners = function (element) {
  document.removeEventListener('keydown', element);
  document.removeEventListener('click', element);
};

var changeFillColor = function (element, style, data) {
  var fillColor = document.querySelector(element).style.fill = getRandomElement(style);
  data.value = fillColor;
  removeListeners(element);
};

var changeBackgroundColor = function (element, style, data) {
  var fillBackground = document.querySelector(element).style.background = getRandomElement(style);
  data.value = fillBackground;
  removeListeners(element);
};

setupWindowOpen.addEventListener('click', function () {
  removeHidden(setupWindow);
});

setupWindowClose.addEventListener('click', function () {
  addHidden(setupWindow);
  setupWindow.removeAttribute('style');
});

setupWindowOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY && !(evt.target === inputName)) {
    addHidden(setupWindow);
  }
});

setupWindowIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    removeHidden(setupWindow);
  }
});

setupWitcherEyes.addEventListener('click', function () {
  changeFillColor(styleWitcherEyes, EYE_COLORS, valueWicherEyes);
});

setupWitcherCoat.addEventListener('click', function () {
  changeFillColor(styleWitcherCoat, COAT_COLORS, valueWitcherCoat);
});

setupWitcherBall.addEventListener('click', function () {
  changeBackgroundColor(styleWitcherBall, FIREBALL_COLORS, valueWitcherBall);
});

// модуль прередвигания диалога персонажа
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault(); // зачем?

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evnt) {
          evnt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

// Создаем и добовляем волшебников
(function () {

  for (var i = 0; i < NUMBER_OF_WITCHERS; i++) {
    var witcherElements = randomWitcher();
    var witcherDom = createWitcher(witcherElements);
    withchersList.appendChild(witcherDom);
  }
  document.querySelector('.setup-similar').classList.remove('hidden');
}());


