$(function(argument) {
    console.log("ok");
    var callback = {
            success: function(d) {
                console.log("success");
                console.log(d);
                //弹出注册成功

            },
            fail: function() {
                console.log("error");
            }
        }
        //发送Ajax请求
    function myAjax(url, data, type, callback) {
        $.ajax({
                url: url,
                type: type,
                dataType: 'json',
                data: data,
            })
            .done(function(d) {
                callback.success(d);
            })
            .fail(function() {
                callback.fail();
            })
            .always(function() {
                console.log("complete");
            });
    }
    $('btn').click(function(event) {
        console.log("get ");
        var url = "/api/repair/send",//保修表单提交
            type = "POST",
            data = {
                phone: user.phone
            };
        myAjax(url, data, type, callback);


    });


})
