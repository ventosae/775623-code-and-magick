'use strict';

var NUMBER_OF_WITCHERS = 4;

// Создаем массив характеристик
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

// Пишем рандомизатор
var getRandomElement = function (variable) {
  return variable[Math.floor(Math.random() * (variable.length))];
};

// Убераем скрывающие классы
var removeClass = function (element, classToRemove) {
  document.querySelector(element).classList.remove(classToRemove);
};

// Создаем случайного волшебника
var randomWitcher = function () {
  var witcher = {};
  witcher.name = getRandomElement(names) + ' ' + getRandomElement(surnames);
  witcher.coatColor = getRandomElement(coatColor);
  witcher.eyesColor = getRandomElement(eyesColor);
  return witcher;
};

// Добовляем DOM элемент на основании объекта
var createWitcher = function (witcherData) {
  var fragment = document.createDocumentFragment();
  var witchersTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var withchersInfo = witchersTemplate.cloneNode(true);
  withchersInfo.querySelector('.setup-similar-label').textContent = witcherData.name;
  withchersInfo.querySelector('.wizard-coat').style.fill = witcherData.coatColor;
  withchersInfo.querySelector('.wizard-eyes').style.fill = witcherData.eyesColor;
  return fragment.appendChild(withchersInfo);
};

// Делаем функцию заполнения блока DOM элементами
var appendWitcher = function (witcher) {
  var withchersList = document.querySelector('.setup-similar-list');
  withchersList.appendChild(witcher);
};

// Создаем и добовляем волшебников
var addWitchers = function (witcherNumber) {
  removeClass('.setup', 'hidden');
  for (var i = 0; i < witcherNumber; i++) {
    var witcherElements = randomWitcher();
    var witcherDom = createWitcher(witcherElements);
    appendWitcher(witcherDom);
  }
  removeClass('.setup-similar', 'hidden');
};

addWitchers(NUMBER_OF_WITCHERS);
