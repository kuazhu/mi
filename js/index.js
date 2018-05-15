/*
* @Author: TomChen
* @Date:   2018-05-15 19:11:58
* @Last Modified by:   TomChen
* @Last Modified time: 2018-05-15 19:48:28
*/
//获取元素
var oCartBox = document.querySelector('.cart-box');
var oCart = document.querySelector('.cart-box .cart');
var oCartA = oCart.getElementsByTagName('a')[0];
var oCartLoader = document.querySelector('.cart-content .loader');
var oCartContent = document.querySelector('.cart-content');
var oEmptySpan = document.querySelector('.cart-box .empty-cart');
//监听鼠标移入事件
oCartBox.onmouseenter = function(){
	//1.改变购物车的背景色也字体颜色
	oCart.style.background = '#fff';
	oCartA.style.color = '#ff6700';
	//2.显示loading图标
	oCartLoader.style.display = 'block';
	//3.购物车的内容显示出来
	// oCartContent.style.height = '100px';
	animation(oCartContent,{height:100},false,function(){
		//隐藏loading
		oCartLoader.style.display = 'none';
		//获取数据并且显示
		oEmptySpan.style.display = 'block';
	});
}
oCartBox.onmouseleave = function(){
	//1.改变购物车的背景色也字体颜色
	oCart.style.background = '#424242';
	oCartA.style.color = '#b0b0b0';
	oEmptySpan.style.display = 'none';
	//隐藏购物车的内容
	animation(oCartContent,{height:0});	
}