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
var FONT = '16px PT Mono';
var FONT_COLOR = '#000';

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
var writeMessage = function (ctx, message, x, y) {
  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;
  ctx.fillText(message, CLOUD_X + x, CLOUD_Y + y);
};

var getColumnColor = function (ctx, names) {
  ctx.fillStyle = names === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(43, 92, 252, ' + Math.random() + ')';
};

var renderHistogram = function (ctx, names, times) {
  var columnY = CLOUD_Y + CLOUD_HEIGHT - VERTICAL_POSITION;
  for (var i = 0; i < names.length; i++) {
    var columnX = CLOUD_X + HORIZONTAL_POSITION + (COLUMN_GAP + COLUMN_WIDTH) * i;
    var columnHeight = (Math.round(times[i]) * HISTOGRAM_HEIGHT) / getMaxElement(times);
    ctx.fillStyle = getColumnColor(ctx, names[i]);
    ctx.fillRect(columnX, columnY, COLUMN_WIDTH, -columnHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], columnX, columnY + NAME_VERTICAL);
    ctx.fillText(Math.round(times[i]), columnX, columnY - columnHeight - RESULTS_VERTICAL);
  }
};

window.renderStatistics = function (ctx, names, times) {
  // paint cloud shadow
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.5)');
  // paint cloud
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  // writing message
  writeMessage(ctx, TEXT_1, 60, 30);
  writeMessage(ctx, TEXT_2, 60, 50);
  // paint histogram
  renderHistogram(ctx, names, times);
};
