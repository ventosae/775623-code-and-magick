'use strict';
// Модуль generation.js
(function () {
  var witchersTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var withchersList = document.querySelector('.setup-similar-list');

  var randomWitcher = function () {
    var witcher = {};
    witcher.name = window.utilities.getRandomElement(window.data.NAMES) + ' ' + window.utilities.getRandomElement(window.data.SURNAMES);
    witcher.coatColors = window.utilities.getRandomElement(window.data.COAT_COLORS);
    witcher.eyesColors = window.utilities.getRandomElement(window.data.EYE_COLORS);
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

  var renderWitchers = function () {
    for (var i = 0; i < window.data.NUMBER_OF_WITCHERS; i++) {
      var witcherElements = randomWitcher();
      var witcherDom = createWitcher(witcherElements);
      withchersList.appendChild(witcherDom);
    }
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  renderWitchers();
})();
