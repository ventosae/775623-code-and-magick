'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var HISTOGRAM_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var GAP = 10;
var TEXT_1 = 'Ура вы победили!';
var TEXT_2 = 'Список результатов:';
var HORIZONTAL_POSITION = 60;
var VERTICAL_POSITION = 40;
var RESULTS_VERTICAL = 5;
var NAME_VERTICAL = 20;

// paint cloud
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// find max element
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// write text message
var writeMessage = function (ctx, message, color, font, x, y) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(message, CLOUD_X + x, CLOUD_Y + y);
};

var getRandomOpacity = function () {
  var colorOpacity = Math.random();
  return colorOpacity;
};

var renderHistogram = function (ctx, names, times, x, y, columnGap, columnWidth, cloudHeight, histogramHeight) {
  for (var i = 0; i < names.length; i++) {
    var columnHeight;
    var columnX;
    var columnY;
    for (i = 0; i < names.length; i++) {
      columnX = x + HORIZONTAL_POSITION + (columnGap + columnWidth) * i;
      columnY = y + cloudHeight - VERTICAL_POSITION;
      columnHeight = (Math.round(times[i]) * histogramHeight) / getMaxElement(times);
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(43, 92, 252, ' + getRandomOpacity() + ')';
      }
      ctx.fillRect(columnX, columnY, columnWidth, -columnHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], columnX, columnY + NAME_VERTICAL);
      ctx.fillText(Math.round(times[i]), columnX, columnY - columnHeight - RESULTS_VERTICAL);
    }
  }
};

window.renderStatistics = function (ctx, names, times) {
  // paint cloud shadow
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.5)');
  // paint cloud
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  // writing message
  writeMessage(ctx, TEXT_1, '#000', '16px PT Mono', 60, 30);
  writeMessage(ctx, TEXT_2, '#000', '16px PT Mono', 60, 50);
  // paint histogram
  renderHistogram(ctx, names, times, CLOUD_X, CLOUD_Y, COLUMN_GAP, COLUMN_WIDTH, CLOUD_HEIGHT, HISTOGRAM_HEIGHT);
};
