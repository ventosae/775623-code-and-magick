'use strict';

var NUMBER_OF_WITCHERS = 4;

// Создаем массив характеристик
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Копируем шаблон, задаем лист и создаем фрагмент
var witchersTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var withchersList = document.querySelector('.setup-similar-list');

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

// Создаем и добовляем волшебников
var addWitchers = function () {
  document.querySelector('.setup').classList.remove('hidden');
  for (var i = 0; i < NUMBER_OF_WITCHERS; i++) {
    var witcherElements = randomWitcher();
    var witcherDom = createWitcher(witcherElements);
    withchersList.appendChild(witcherDom);
  }
  document.querySelector('.setup-similar').classList.remove('hidden');
};

addWitchers();
