(function () {

  // 绘板
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
  }
  // 颜色
  var colors = {
    '0': '#000000',
    '1': '#ffffff',
    '2': '#999999'
  };
  // 当前画笔颜色
  var brushColor = '1'
  // 以ratio*ratio个像素代表一个画笔像素
  var ratio = 4;
  // 画布矩阵
  var array = [];
  // 画笔对绘板的相对坐标(0-200,0-100)
  var brushX = 0;
  var brushY = 0;

  // 选择画笔颜色
  $('.color-disk').children().click(function () {
    brushColor = $(".color-disk div").index($(this));
    $('#brush').css('background-color', colors[brushColor]);
  });

  // 鼠标经过时像素点变色
  $('#canvas').mousemove(function (e) {
    brushX = Math.floor((e.pageX - $('.window').offset().left - 10) / ratio); // 当前鼠标相对canvas的X坐标
    brushY = Math.floor((e.pageY - $('.window').offset().top - 10) / ratio); // 当前鼠标相对canvas的Y坐标
    // 覆盖一个元素 不能出边界
    if (brushX < 0 || brushX > 199) return;
    if (brushY < 0 || brushY > 99) return;
    $('#brush').css('top', brushY * ratio);
    $('#brush').css('left', brushX * ratio);
  });

  // 点击改变画布颜色
  $('#brush').click(function (e) {
    if (brushX < 0 || brushX > 199) return;
    if (brushY < 0 || brushY > 99) return;
    // 若颜色与原来不一致则改变
    if (array[brushY][brushX] !== brushColor) {
      ctx.fillStyle = colors[brushColor];
      ctx.fillRect(brushX * ratio, brushY * ratio, ratio, ratio);
      // 需要有3s间隔
      ajax.post('/paint', {
        'x': brushX,
        'y': brushY,
        'color': parseInt(brushColor)
      }).then(function (res) {

      });
    }
  });

  // 滚轮事件 delta 1 放大 -1 缩小 每次放大两倍
  $('#brush,#canvas').mousewheel(function (e, delta, deltaX, deltaY) {
    // 禁止页面滚动
    $('body').css('overflow', 'hidden');
    // 缩放中心点为当前画笔位置
    $('#canvas').css('transform-origin', brushX + ' ' + brushY);
    $('#canvas').css('-webkit-transform-origin', brushX + ' ' + brushY);
    ratio = delta > 0 ? ratio * 2 : ratio / 2
    $('#canvas').css('transform', 'scale(' + ratio / 4 * 2 + ')');
    // 改变像素大小
    $('#brush').css('width', ratio + 'px');
    $('#brush').css('height', ratio + 'px');
  });

  // 初始化绘板
  function init() {
    // 获取绘板数据
    ajax.get('/board').then(function (res) {
      for (var k = 0; k < 100; k++) {
        array.push(res.slice(k * 200, (k + 1) * 200));
      }
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
          // 填色
          ctx.fillStyle = colors[array[i][j]];
          ctx.fillRect(j * ratio, i * ratio, ratio, ratio);
        }
      }
    })
  }

  init();
}());