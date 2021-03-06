/**
 * 
 * 
 *主页模块
 *
 */
var indextModule = angular.module("IndextModule", []);
indextModule.controller('indexCtrl', function ($rootScope, $scope, $http, $state, $stateParams, dalog, $location, Title) {
    console.log("主页控制器");
    $('.nav a').bind('click', function (event) {
        console.log("is click");
        var title = $(this).has('p').text();
        Title.pre($(this), title, $(this).attr('name'));
        Title.back($('.header img'));

    });

});
indextModule.controller('allCtrl', function ($rootScope, $scope, $http, $state, $stateParams, dalog, $location, Title) {
    console.log("验证控制器");
    $scope.check = function (next) { //验证成功后
        console.log("进入验证用户");
        // dalog.texts('进入验证用户');
        var callback = {
            success: function (data) { //data Ajax成功的数据
                console.log(data);
                if (data.state == 'true') {
                    // $state.go("noticeA");
                    console.log(data.phone);
                    $rootScope.phone = data.phone;
                    $rootScope.xiaoqu = data.xiaoqu;
                    $rootScope.name = data.name;
                    if (data.sex == "M") {
                        $rootScope.sex = "男";
                    } else if (data.sex == "F") {
                        $rootScope.sex = "女";
                    };
                    $rootScope.IDCardNumber = data.IDCardNumber;
                    $rootScope.address = data.xiaoqu + data.addressdong + data.addressdanyuan;
                    $state.go(next);
                }
                if (data.state == "false") {
                    console.log("请登录");
                    dalog.texts('您尚未登录,请先登录');
                    $state.go('login');
                }
            },
            fail: function () { // Ajax成失败

            }
        }
        // $state.go(next);
        myAjax('http://rap.taobao.org/mockjs/15555/api/account/islogined', "", 'GET', callback);
    }

});

indextModule.controller('waitCtrl', function ($scope, $http, $state, $stateParams, dalog, $location, Title) {
    console.log("等待开发控制器");
    dalog.texts('此功能正在开发中');
    Title.back($('.header img'));

});

indextModule.controller('404Ctrl', function ($scope, $http, $state, $stateParams) {
    // console.log("404控制器");

});


/**
 * 
 * 
 *商店模块
 *
 */
var shopListModule = angular.module("ShopListModule", []);
// 商店主页控制器
shopListModule.controller('ShopListCtrl', function ($scope, $http, $state, $stateParams) {
    var shopData = [{
        "shopName": "二哥超市",
        "shopImg": "/userAPP/images/shop_main/timg.jpg",
        "monthlySales": "224",
        "activity": "满30立减20",
        "qiSong": "10",
        "peiSong": "1"
    }, {
        "shopName": "UI水果",
        "shopImg": "url",
        "monthlySales": "634",
        "activity": "购买满230元以上，8折优惠",
        "qiSong": "12",
        "peiSong": "3"
    }, {
        "shopName": "米奇蛋糕店",
        "shopImg": "url",
        "monthlySales": "1234",
        "activity": "购买满250元以上，8折优惠",
        "qiSong": "30",
        "peiSong": "5"
    }

    ];
    $scope.shopData = shopData;
    console.log("in controller");
    console.log($scope.shopData);

    // $(function() {
    //     $('.shop-item .list').click(function() {
    //         alert("is click");
    //     }); 
    // })


});
// 商店子页控制器
shopListModule.controller('ShopsubListCtrl', function ($scope, $http, $state, $stateParams) {

    $(function () {
        var offset = $("#end").offset();
        $(".addcar").click(function (event) {
            var addcar = $(this);
            var img = addcar.parent().find('.goods').attr('src');
            var flyer = $('< img class="u-flyer" src="' + img + '">');
            flyer.fly({
                start: {
                    left: event.pageX,
                    top: event.pageY
                },
                end: {
                    left: offset.left + 50,
                    top: offset.top + 10,
                    width: 0,
                    height: 0
                },
                onEnd: function () {
                    $("#shopcarnum").show();
                    var cn = $("#shopcarnum");
                    cn.html(parseInt(cn.html()) + 1);
                }
            });
        });
    });

});


/**
 * 
 * 
 *报修模块
 *
 */
var repairListModule = angular.module("RepairListModule", []);
repairListModule.controller('repairListCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, Title) {
    Title.back($('.header img'));

    function getData(url, element) { //element 滑动的元素 
        // 第一次请页面请求历史报修数据3条
        $http.get(url)
            .success(function (largeLoad) {
                var data = largeLoad;
                console.log(data);
                $scope.repairData = data; //绑定获取的数据到全局$scope上
            });
        $(function () {

            $('#element').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                autoLoad: false,

                loadDownFn: function (me) {

                    // $http.get('/userAPP/data/books1.json')//刷新请求后台报修历史数据
                    $http.get('/api/repair/history') //刷新请求后台报修历史数据

                        .success(function (largeLoad) {
                            var data = largeLoad;
                            console.log(data);
                            $scope.repairData = $scope.repairData.concat(data);
                            // $scope.scopeData  = $scope.scopeData.concat(data);
                            console.log($scope.scopeData);
                        });

                }
            });
        });

    }

    getData('/api/repair/history', "body");

});
repairListModule.controller("applyCtrl", function ($rootScope, $scope, $http, $state, $stateParams, dalog, $location, Title) {
    // dalog.texts("applyCtrl");

    $("#formid").submit(function () {
        // alert("submit"); 
        dalog.texts("正在提交，请等待");
        $("#formid").ajaxSubmit({
            type: "post", //提交方式  
            dataType: "json", //数据类型  
            url: "/api/repair/send", //请求url  
            success: function (data) { //提交成功的回调函数  
                console.log(data);
                if (data.type == "success") {
                    dalog.texts("提交成功，请耐心等待处理结果");
                    clearForm(formid);
                } else if (data.type == "failure") {

                    if (data.reason == "title or content not exist") {
                        dalog.texts("提交失败，请正确填写报修信息");
                    }
                }
            }
        });
        return false; //不刷新页面  
    });

    //清空表单
    function clearForm(form) {
        $(':input', form).each(function () {
            var type = this.type;
            var tag = this.tagName.toLowerCase(); // normalize case
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = "";
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex = -1;
            else if (type == 'file')
                $('img', form).attr("src", "images/baoxiu/addpic.jpg");
        });
    };

    // Title.pre(element, title, where);//elemnent选中标签，title下一页的标题，跳到下一个页面 
    Title.back($('.header img')); //elemnent选中标签

});
// repairListModule.controller('applyCtrl', function($scope, $http, $state, $stateParams, dalog) {
//      alert("wddm");
//      console.log("applyCtrl 控制器");
//      // dalog.texts('applyCtrl');
// });

/**
 * 
 * 
 *社区公告
 *
 */
var app = angular.module('announceApp', []);
app.controller('announceCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, Title) {
    console.log($scope.title);
    console.log($scope.last_url);
    Title.back($('.header img'));
    $http.get('http://rap.taobao.org/mockjs/15555/api/announce/getannounces')
        .success(function (largeLoad) {
            var data = largeLoad;
            console.log(data);
            $scope.announce = data; //绑定获取的数据到全局$scope上
        });
    $scope.deliver = function (index) {
        console.log("ok");
        console.log(index);
        Title.pre($(this), '公告详情', 'noticeC');
        Title.back($('.header img'));
        $rootScope.Cjx = $scope.announce[index];
    };


});
app.controller('DetailCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, Title) {
    console.log('DetailCtrl');
    Title.back($('.header img'));

});

/**
 * 
 * 
 *注册登陆模块
 *
 */
var loginModule = angular.module("loginListModule", []);
//注册控制器
loginModule.controller('regCtrl', function ($scope, $http, $state, $stateParams, dalog) {

    console.log("regCtrl 控制器");
    //错误提示

    // dalog.texts('regCtrl 控制器');

    console.log(dalog);
    // 获取图片验证码
    function changeCode() {
        $('#img').attr({ src: "/api/account/regimgcode?" + (Math.random() * 100).toFixed(0) });
    }
    $('#img').click(function (event) {
        var url = "/api/account/regimgcode?" + (Math.random() * 100).toFixed(0);
        $(this).attr({ src: url });
    });
    // changeCode();


    //获取提交数据
    function getData() {
        var phone = $('#phone').val(),
            pwd = $('#pwd').val(),
            msgcode = $('#msgcode').val(),
            code = $('#code').val(),
            // phoneTest = /^1[34578]\d{9}$/,
            user = {};
        user.phone = phone;
        user.pwd = pwd;
        user.msgcode = msgcode;
        user.code = code;
        return user;
    }



    var codeUrl = "/api/account/regmsgcode",
        registeUrl = "/api/account/reg";


    function checkUser(account, pass) {


        function checkPhone(account, pass) {
            var accountCheck = /^1[3|4|5|7|8]\d{9}$/;
            var state = "";
            if (account === "") {
                dalog.texts('手机格式不正确');
                return state = "fail";
            } else if (!accountCheck.test(account)) {
                dalog.texts('手机格式不正确');
                return state = "fail";
            }
            if (pass != null) {
                if (pass.length < 6) {
                    dalog.texts('密码应大于六位');
                    return state = "fail";
                } else if (pass.length > 20) {
                    dalog.texts('密码应小于20位');
                    return state = "fail";
                }
            }

        }
        return checkPhone(account, pass);
    }
    //获取手机短信验证码   
    $scope.getCode = function () {
        console.log("begin getCode");
        var user = getData();
        var type = "POST",
            data = {
                phone: user.phone
            };
        //图片验证码
        function tuCode() {
            var data = {
                phone: user.phone,
                code: user.code
            },
                result = "";
            console.log(data);

            var callback = {
                success: function (d) {
                    console.log(d);
                    if (d.type == "success") {
                        result = "ture";
                        var InterValObj;
                        var count = 30;
                        var curCount;
                        curCount = count;
                        $("#getCode").attr("disabled", "true");
                        $("#getCode").html(curCount + "秒重新获取");
                        InterValObj = window.setInterval(SetRemainTime, 1000);

                        function SetRemainTime() {
                            if (curCount == 0) {
                                window.clearInterval(InterValObj);
                                $("#getCode").removeAttr("disabled");
                                $("#getCode").html("重新发送验证码");
                            } else {
                                curCount--;
                                $("#getCode").html(+curCount + "秒重新获取");
                            }
                        }
                    } else if (d.type == "failure") {
                        changeCode();
                        if (d.reason == "code wrong") {
                            console.log(d.reason);
                            dalog.texts("验证码错误");
                            changeCode();
                            result = "false";
                        } else if (d.reason == " phone exist") {
                            dalog.texts("手机已经注册");
                            result = "false";
                        } else if (d.reason == "phone format wrong") {
                            dalog.texts("手机格式不正确");
                            result = "false";
                        }
                    }
                },
                fail: function () {
                    console.log("error");
                    dalog.texts('请求失败');
                }
            }
            if (checkUser(user.phone) != "fail") {
                if (data.code == "") {
                    dalog.texts("请输入图形验证码");
                    return;
                }
                myAjax(codeUrl, data, "POST", callback);
            }
            return result;
        }

        var callback = {
            success: function (d) {
                console.log("success");
                console.log(d);
                if (d.type == "success") {
                    console.log("短信验证码发送成功");
                    dalog.texts("短信验证码发送成功");

                } else if (d.type == "failure") {


                    if (d.reason == "phone exist") {
                        dalog.texts("手机已经注册");
                    }

                }
                // var InterValObj;
                // var count = 30;
                // var curCount;
                // curCount = count;
                // $("#getCode").attr("disabled", "true");
                // $("#getCode").html(curCount + "秒重新获取");
                // InterValObj = window.setInterval(SetRemainTime, 1000);

                // function SetRemainTime() {
                //     if (curCount == 0) {
                //         window.clearInterval(InterValObj);
                //         $("#getCode").removeAttr("disabled");
                //         $("#getCode").html("重新发送验证码");
                //     } else {
                //         curCount--;
                //         $("#getCode").html(+curCount + "秒重新获取");
                //     }
                // }

            },
            fail: function () {
                console.log("error");
                dalog.texts('请求失败');

            }
        }
        //发送手机短信
        if (tuCode() == "ture") {
            //图片验证码正确
            if (checkUser(user.phone) != "fail") {
                myAjax(codeUrl, data, type, callback);

            }
        }

    }

    //注册
    $scope.register = function () {
        console.log("begin register");
        var user = getData();
        var type = "POST",
            data = {
                phone: user.phone,
                pwd: user.pwd,
                msgcode: user.msgcode
            };
        console.log(data);
        var callback = {
            success: function (d) {
                console.log("success");
                console.log(d);
                $scope.$apply();
                if (d.type == "success") {
                    console.log("注册成功");
                    dalog.texts("注册成功");
                    //记录登陆成功状态
                    $state.go("index");
                } else if (d.type == "failure") {


                    if (d.reason == "phone exist") {
                        dalog.texts("手机已经注册");
                    }

                }

            },
            fail: function () {
                console.log("error");
                dalog.texts('请求失败');
            }
        }
        if (checkUser(user.phone) != "fail") {
            myAjax(registeUrl, data, type, callback);
        }

    };







    /*  验证手机有效性
        有效可点击获取验证码 无效弹出手机验证错误
        注册提交前验证密码有效性
        有效可以提交注册并提示成功  无效提示密码有问题
    */


});
//登陆控制器
loginModule.controller('loginCtrl', function ($scope, $http, $state, $stateParams, dalog) {
    console.log("loginCtrl");
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


    function checkUser(account, pass) {


        function checkPhone(account, pass) {
            var accountCheck = /(^1[3|5][0-9]\d{4,8}$)|(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/;
            var state = "";
            if (account === "") {
                dalog.texts('请输入正确账号');
                return state = "fail";
            } else if (!accountCheck.test(account)) {
                dalog.texts('不是正确的手机号');
                return state = "fail";
            }
            console.log(pass.length);
            if (pass != null) {
                if (pass.length < 6) {
                    dalog.texts('密码应大于六位');
                    return state = "fail";
                } else if (pass.length > 20) {
                    dalog.texts('密码应小于20位');
                    return state = "fail";
                }
            }

        }

        return checkPhone(account, pass);
    }
    $('.login').click(function (event) {
        var data = getData();
        console.log(data);
        var account = data.phone;
        var pass = data.pwd;
        var callback = {
            success: function (data) { //data Ajax成功的数据
                console.log(data);
                if (data.type == 'success') {
                    console.log("登录成功");
                    dalog.texts('登录成功');
                    $state.go("index");
                }
                if (data.type == "failure") {
                    console.log("登录失败，重新登录");
                    dalog.texts('登录失败，重新登录');
                    if (data.reason == "pwd wrong") {
                        dalog.texts('密码错误，请重新登录');
                    } else if (data.reason == "phone not exist") {
                        dalog.texts('手机不存在，请重新登录');
                    }
                }
            },
            fail: function () { // Ajax成失败
                console.log("请求失败");
                dalog.texts('请求失败');
            }
        };
        console.log(checkUser(account, pass));

        if (checkUser(account, pass) != "fail") {
            myAjax('/api/account/login', data, 'POST', callback);
        }

    });



});


/**
 * 
 * 
 *个人中心模块
 *
 */
var personalModule = angular.module("personalModule", []);
personalModule.controller('personalCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, Title) {
    console.log('personalCtrl');
    $(function () {
        $('.maintop').click(function () {
            $('.maintop').css("background", "#cccaca");
        });
    })
    console.log(Title);
    // Title.pre(element, title, where)elemnent选中标签，title下一页的标题，跳到下一个页面 
    // Title.back(element)elemnent选中标签
    Title.pre($('#pinto span'), '设置', 'fill_personal');
    Title.back($('.header img'));


});
personalModule.controller('fill_personalCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, Title, dalog) {
    $(function () {
        $('.xiaoqu').click(function () {
            $('.alqu').show();
            $(".alqu li").click(function () {
                $(this).addClass('bian').siblings().removeClass('bian');
            });
            $(".yes").click(function () {
                $('.xqu').val($('.bian').html());
                $('.alqu').hide();
            });
            $(".no").click(function () {
                $('.alqu').hide();
            });
        });
        $('.addre').click(function () {
            $('.aladdre').show();
            $(".yes").click(function () {
                if (($('.ad1').val()) && ($('.ad2').val()) && ($('.ad3').val()) != "") {
                    var address = $('.ad1').val() + '栋 ' + $('.ad2').val() + '单元 ' + $('.ad3').val() + '室 ';
                    $('.adr').val(address);
                }
                $('.aladdre').hide();

            });
            $(".no").click(function () {
                $('.aladdre').hide();
            });
        });

    })

    // 提交
    $scope.send = function () {
        // alert("submit");
        dalog.texts("正在提交，请等待");
        console.log($("input[name |='sex']").val());
        var sex = $("input[name |='sex']").val();
        if (sex == "女") {
            $rootScope.sex = "F";
        } else if (sex == "男") {
            $rootScope.sex = "M";
        }
        $("#formid").ajaxSubmit({
            type: "post", //提交方式  
            dataType: "json", //数据类型  
            url: "/api/account/userex", //请求url  
            success: function (data) { //提交成功的回调函数  
                console.log(data);
                if (data.type == "success") {
                    dalog.texts("修改成功");
                    var callback = {
                        success: function (data) { //data Ajax成功的数据
                            console.log(data);
                            if (data.state == 'true') {
                                console.log(data.phone);
                                $rootScope.phone = data.phone;
                                $rootScope.xiaoqu = data.xiaoqu;
                                $rootScope.name = data.name;
                                if (data.sex == "F") {
                                    $rootScope.sex = "男";
                                } else if (data.sex == "M") {
                                    $rootScope.sex = "女";
                                };
                                $rootScope.IDCardNumber = data.IDCardNumber;
                                $rootScope.address = data.xiaoqu + data.addressdong + data.addressdanyuan;
                                $state.go('fill_personal');
                            }
                        }
                    }
                    myAjax('/api/account/islogined', "", 'GET', callback);
                }
            }
        });
        return false; //不刷新页面  
    }

    Title.back($('.header img'));



});
personalModule.controller('shop_applyCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, Title) {

    Title.back($('.header img'));


});
