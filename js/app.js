var routerApp = angular.module('routerApp', ['ui.router', 'ngGrid', 'IndextModule', 'ShopListModule', 'RepairListModule', 'loginListModule', 'DalogModule', 'announceApp', 'fileInput','personalModule','titleModule']);


/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('header', {
            url: '/header',
            templateUrl: "tpls/header.html"
        })
        .state('index', {
            url: '/index',
            templateUrl: "tpls/index.html",
            controller: 'indexCtrl'
        })
        .state('wait', {
            url: '/wait',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@wait': {
                    templateUrl: 'tpls/header.html'
                },
                'main@wait': {
                    templateUrl: 'tpls/wait.html'
                }
            },
            controller: 'waitCtrl'
        })
        //电商
        .state('shop_main', { //电商主页
            url: '/shop_main',
            templateUrl: "tpls/shop_main.html",
            controller: 'ShopListCtrl'
        })
        .state('shop_subpage', { //商铺子页面
            url: '/shop_subpage',
            templateUrl: "tpls/shop_subpage.html",
            controller: 'ShopsubListCtrl'
        })
        //报修
        .state('baoxiu_apply', { //报修提交
            url: '/baoxiu_apply',
            templateUrl: "tpls/baoxiu_apply.html",
            controller: 'applyCtrl'
        })
        .state('baoxiu_history', { //报修历史
            url: '/baoxiu_history',
            templateUrl: "tpls/baoxiu_history.html"
        })
        .state('dingdan', { //订单
            url: '/dingdan',
            templateUrl: "tpls/dingdan.html"
        })
        //公告
        .state('noticeA', {
            url: '/noticeA',
            templateUrl: "tpls/noticeA.html",
            controller: 'announceCtrl',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@noticeA': {
                    templateUrl: 'tpls/header.html'
                },
                'main@noticeA': {
                    templateUrl: 'tpls/noticeA.html'
                }
            }
        })
        .state('noticeC', {
            url: '/noticeC',
            templateUrl: "tpls/noticeC.html",
            controller: 'DetailCtrl',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@noticeC': {
                    templateUrl: 'tpls/header.html'
                },
                'main@noticeC': {
                    templateUrl: 'tpls/noticeC.html'
                }
            }
        })
        //个人中心
        .state('personal', { //个人中心
            url: '/personal',
            templateUrl: "tpls/personal.html",
            controller: 'personalCtrl'
        })
        .state('suggest', { //意见反馈
            url: '/suggest',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@suggest': {
                    templateUrl: 'tpls/header.html'
                },
                'main@suggest': {
                    templateUrl: 'tpls/suggest.html'
                }
            }
        })   
        .state('about', { //关于
            url: '/about',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@about': {
                    templateUrl: 'tpls/header.html'
                },
                'main@about': {
                    templateUrl: 'tpls/about.html'
                }
            }
        })
        .state('login', { //登录
            url: '/login',
            templateUrl: "tpls/login.html",
            controller: 'loginCtrl'
        })
        .state('reg', { //注册
            url: '/reg',
            templateUrl: "tpls/reg.html",
            controller: 'regCtrl'
        })
        .state('find', { //找回
            url: '/find',
            templateUrl: "tpls/find.html",
            controller: 'regCtrl'
        })
        .state('fill_personal', { //个人信息填写
            url: '/fill_personal',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@fill_personal': {
                    templateUrl: 'tpls/header.html'
                },
                'main@fill_personal': {
                    templateUrl: 'tpls/fill_personal.html'
                }
            },
            controller: 'fill_personalCtrl'
        }) 
        .state('setup', { //设置
            url: '/setup',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@setup': {
                    templateUrl: 'tpls/header.html'
                },
                'main@setup': {
                    templateUrl: 'tpls/setup.html'
                }
            }
        })
        .state('shop_apply', { //商铺申请
            url: '/shop_apply',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@shop_apply': {
                    templateUrl: 'tpls/header.html'
                },
                'main@shop_apply': {
                    templateUrl: 'tpls/shop_apply.html'
                }
            },
            controller:"shop_applyCtrl"
        })
       .state('file', {
            url: '/file',
            templateUrl: "tpls/file.html",
            controller: 'applyCtrl'
        })
        // .state('test', {
        //     url: '/test',
        //     templateUrl: "tpls/test.html"
        // })


});
