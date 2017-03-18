# 函数用法
## 弹出框

回调函数传入dalog，一般放在有$参数的后面；
用法：在控制器就可以直接用dalog.texts("some text");弹出需要弹出的提示信息
代码如下：

```javascript

Module.controller("Ctrl", function($rootScope, $scope,dalog) {
    dalog.texts("some text");//
});

```

## 头部

回调函数传入 Title，一般放在有$参数的后面
在当前页向下一页跳转，下一页头部要根据需要显示不同标题，
用法：
	先在当前页控制器Title.pre(element, title, where)；
	在下一 页的控制器用Title.back(element)
```javascript
Module.controller("Ctrl", function($rootScope, $scope, $http, $state, $stateParams, dalog,$location, Title) {
     Title.pre(element, title, where);//elemnent选中标签，title下一页的标题，跳到下一个页面 
     Title.back(element);//elemnent选中标签
});

```