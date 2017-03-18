$(document).ready(function () {
  // alert('ok');

  // 给每个catalogue-msg，ranking-msg的list绑定事件，，点击时获取当前的类型，
  // 然后将其替换到maincontent-title里，给catalogue-msg，
  // ranking-msg添加隐藏
  function stopPropagation(e) {
      if (e.stopPropagation)
      e.stopPropagation();
      else
      e.cancelBubble = true;
  }
  //给document绑定，移除下拉
  $(document).bind('click',function () {
      // $('#catalogue-msg').addClass('hide');
      $('#catalogue-msg').slideUp("slow");
      // $('#ranking-msg').addClass('hide');
      $('#ranking-msg').slideUp("slow");
      $('.catalogue img').replaceWith('<img src="images/shop_main/down.png" alt="" />');
      $('.ranking img').replaceWith('<img src="images/shop_main/down.png" alt="" />');

  });

// catalogue事件绑定
  $('.catalogue').bind('click',function (e) {
    // alert('ok');
    stopPropagation(e);
    $('#catalogue-msg').slideDown("slow");
    $('#ranking-msg').slideUp("slow");
    $('.catalogue img').replaceWith('<img src="images/shop_main/up.png" alt="" />');
  });
  $('#catalogue-msg .list').bind('click',function (e) {

      console.log($(this).find('span').text());
      var set = $(this).find('span').text();
      // console.log($('.catalogue span').text());
      $('.catalogue span').replaceWith("<span>"+set+"</span>");
      // $('#catalogue-msg').addClass('hide');
      $('#catalogue-msg').slideUp("slow");
      $(this).siblings().children('div').remove();
      $(this).children('div').remove();
      $('<div class="fr"><img src="images/shop_main/对号.png" alt="" /></div>').appendTo($(this));
      $('.catalogue img').replaceWith('<img src="images/shop_main/down.png" alt="" />');

  })


// rankinge事件绑定

  $('.ranking').bind('click',function (e) {
    // alert('ok');
    stopPropagation(e);
    // $('#ranking-msg').removeClass('hide');
    $('#ranking-msg').slideDown("slow");
    $('#catalogue-msg').slideUp("slow");
    $('.ranking img').replaceWith('<img src="images/shop_main/up.png" alt="" />');
  })
  $('#ranking-msg .list').bind('click',function (e) {

      console.log($(this).find('span').text());
      var set = $(this).find('span').text();
      // console.log($('.catalogue span').text());
      $('.ranking span').replaceWith("<span>"+set+"</span>");
      // $('#ranking-msg').addClass('hide');
      $('#ranking-msg').slideUp("slow");
      $(this).siblings().children('div').remove();
      $(this).children('div').remove();
      $('<div class="fr"><img src="images/shop_main/对号.png" alt="" /></div>').appendTo($(this));
      $('.ranking img').replaceWith('<img src="images/shop_main/down.png" alt="" />');

  })

   
        $('.shop-item .list').bind('click',function (e) {
          alert("is click");
        })  


})
