'use strict';
// Модуль utilities.js
(function () {
  window.utilities = {
    getRandomElement: function (arrayName) {
      return arrayName[Math.floor(Math.random() * (arrayName.length))];
    }
  };
})();
