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
  // 画笔对绘板的相对坐标
  var brushX = 0;
  var brushY = 0;

  // 选择画笔颜色
  $('.color-disk').children().click(function () {
    brushColor = $(".color-disk div").index($(this));
    $('#brush').css('background-color', colors[brushColor]);
  });

  // 鼠标经过时像素点变色
  $('#canvas').mousemove(function (e) {
    brushX = Math.floor(e.pageX - $(this).offset().left); // 当前鼠标相对canvas的X坐标
    brushY = Math.floor(e.pageY - $(this).offset().top); // 当前鼠标相对canvas的Y坐标
    // 覆盖一个元素
    $('#brush').css('top', brushY);
    $('#brush').css('left', brushX);
  });

  // 点击改变画布颜色
  $('#brush').click(function (e) {
    // 若颜色与原来不一致则改变
    var x = Math.floor(brushX / ratio);
    var y = Math.floor(brushY / ratio);
    if (array[y][x] !== brushColor) {
      ctx.fillStyle = colors[brushColor];
      ctx.fillRect(x * ratio, y * ratio, ratio, ratio);
      // 需要有3s间隔
      // ajax.post('/paint', {
      //   x: x,
      //   y: y,
      //   color: brushColor
      // }).then(function (res) {

      // });
    }
  });

  // 滚轮事件 delta 1 放大 -1 缩小
  $('#canvas').mousewheel(function (e, delta, deltaX, deltaY) {
    if (delta > 0) {
      // 设置缩放中心点
      $(this).css('transform-origin', brushX / (200 * ratio) + ' ' + brushY / (100 * ratio));
      $(this).css('-webkit-transform-origin', brushX / (200 * ratio) + ' ' + brushY / (100 * ratio));
      // $(this).css('transform', 'scale(' + ratio + ')');
    } else {
      $(this).css('transform', 'scale(1)');
    }
  });

  // 画布拖动


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