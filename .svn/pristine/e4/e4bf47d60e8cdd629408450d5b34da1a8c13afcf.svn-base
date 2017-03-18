$(function(argument) {
    console.log("ok");
    //错误提示

    // 获取图片验证码
    function changeCode() {
        $('#img').click(function(event) {
            // alert("ox");
            var url = "http://115.159.144.106/process/account/Regcode?" + (Math.random() * 100).toFixed(0);
            $(this).attr({
                src: url
            });
            // console.log(url);
        });
    }
    //



    //获取提交数据
    function getData() {
        var phone = $('#phone').val(),
            pwd = $('#pwd').val(),
            msgcode = $('#msgcode').val(),
            // phoneTest = /^1[34578]\d{9}$/,
            user = {};
        user.phone = phone;
        user.pwd = pwd;
        user.msgcode = msgcode;
        return user;
    }




    // //发送Ajax请求
    // function myAjax(url, data, type, callback) {
    //     $.ajax({
    //             url: url,
    //             type: type,
    //             dataType: 'json',
    //             data: data,
    //         })
    //         .done(function(d) {
    //             callback.success(d);
    //         })
    //         .fail(function() {
    //             callback.fail();
    //         })
    //         .always(function() {
    //             console.log("complete");
    //         });
    // }

    
        //发送验证码和登陆
    function zhuce(getCode, register, codeUrl,registeUrl) {
        //获取手机短信验证码   
        getCode.click(function(event) {
            console.log("begin getCode");
            var user = getData(),
                phoneTest = /^1[34578]\d{9}$/;
            console.log(user);

            if (!phoneTest.test(user.phone)) {
                console.log("您的手机格式不正确");
                return;
            }
            console.log(user);

            // var url = "http://115.159.144.106/api/account/regmsgcode",
            var type = "POST",
                data = {
                    phone: user.phone
                };
            var callback = {
                success: function(d) {
                    console.log("success");
                    console.log(d);
                    console.log("验证码发送成功");
                    var InterValObj; 
                    var count = 30; 
                    var curCount;
          　        curCount = count;
                    $("#getCode").attr("disabled", "true");
                    $("#getCode").html( curCount + "秒重新获取");
                    InterValObj = window.setInterval(SetRemainTime, 1000); 
    　　            function SetRemainTime() {
                        if (curCount == 0) {                
                            window.clearInterval(InterValObj);
                            $("#getCode").removeAttr("disabled");
                            $("#getCode").html("重新发送验证码");
                        }
                        else {
                            curCount--;
                            $("#getCode").html(+ curCount + "秒重新获取");
                        }
                    }
                },
                fail: function() {
                    console.log(d);
                    console.log("error");
                }
            }
            myAjax(codeUrl, data, type, callback);


        });

        //注册
        register.click(function() {
            console.log("begin register");
            var user = getData();
            // var url = "http://115.159.144.106/api/account/reg",
            var type = "POST",
                msgcode = user.msgcode,
                phone = user.phone,
                pwd = user.pwd;
            console.log(msgcode);
            console.log(pwd);
            console.log(phone);
            data = {
                phone: phone,
                pwd: pwd,
                msgcode: msgcode
            };
            console.log(data);
            if (user.pwd == "") {
                //验证不通过
                console.log("密码不能为空");
                return;
            }
            else if ((user.pwd.length<6)||(user.pwd.length>20)){
                 console.log("密码应大于6位并小于20位");
                 return;
             }
             else if(user.msgcode==""){
                console.log("验证码不能为空");
                return;
             }
            console.log("send");
            var callback = {
                success: function(d) {
                    console.log("success");
                    console.log(d);
                    if (d.type == "success") {
                        alert("登陆成功");
                        console.log("登陆成功");
                        //记录登陆成功状态
                        $state.go("index");
                    }
                    //弹出注册成功

                },
                fail: function() {
                    console.log("error");
                }
            }
            myAjax(registeUrl, data, type, callback);

        });

    }

    var getCode = $('#getCode'),
        register = $('#register'),
        codeUrl = "http://115.159.144.106/api/account/regmsgcode",
        registeUrl = "http://115.159.144.106/api/account/reg";
        zhuce(getCode,register,codeUrl,registeUrl);


    /*  验证手机有效性
        有效可点击获取验证码 无效弹出手机验证错误
        注册提交前验证密码有效性
        有效可以提交注册并提示成功  无效提示密码有问题
    */
})
