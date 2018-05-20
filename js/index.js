/*
* @Author: TomChen
* @Date:   2018-05-15 19:11:58
* @Last Modified by:   TomChen
* @Last Modified time: 2018-05-18 20:55:11
*/
handleCart();
handleNav();
handleSearch();
handleCarousel();
handleCate();
handleTimer();
handleFlash();
handleElec();
function handleCart(){
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
}
function handleNav(){
	//获取导航标签
	var aNavA = document.querySelectorAll('.header .nav a');
	var oNavContent = document.querySelector('.header .nav-content');
	var oNavUl = oNavContent.getElementsByTagName('ul')[0];
	var oNavLoader = document.querySelector('.header .nav-content .loader');
	var timer = null;
	for(var i = 0;i<aNavA.length-2;i++){
		aNavA[i].index = i;
		aNavA[i].onmouseenter = function(){
			clearTimeout(timer);
			oNavUl.innerHTML = '';
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:200});
			oNavLoader.style.display = 'block';
			var index = this.index;
			//模拟网络请求数据延迟
			setTimeout(function(){
				loadData(index);
				oNavLoader.style.display = 'none';
			},1000)
		}
		aNavA[i].onmouseleave = function(){
			timer = setTimeout(function(){
				oNavContent.style.borderTop = 'none';
				oNavLoader.style.display = 'none';
				oNavUl.innerHTML = '';
				animation(oNavContent,{height:0});	
			},500)
		}
		oNavContent.onmouseenter = function(){
			clearTimeout(timer);		
		}
		oNavContent.onmouseleave = function(){
			timer = setTimeout(function(){
				oNavContent.style.borderTop = 'none';
				oNavLoader.style.display = 'none';
				oNavUl.innerHTML = '';
				animation(oNavContent,{height:0});	
			},500)			
		}
	}

	function loadData(index){
		oNavUl.innerHTML = '';
		var aDatas = aNavItems[index];
		if(!aDatas){
			return;
		}
		for(var i = 0;i<aDatas.length;i++){
			var oLi = document.createElement('li');
			var oDiv = document.createElement('div');
			oDiv.className = 'img-box';
			var oImg = document.createElement('img');
			oImg.src = aDatas[i].img;
			var oP1 = document.createElement('p');
			oP1.className = 'product-name';
			oP1.innerHTML =  aDatas[i].name;
			var oP2 = document.createElement('p');
			oP2.className = 'product-price';
			oP2.innerHTML = aDatas[i].price + "元起";
			if(aDatas[i].tag){
				var oSpan =  document.createElement('span');
				oSpan.className = 'tag';
				oSpan.innerHTML = aDatas[i].tag;
				oLi.appendChild(oSpan);
			}
			oDiv.appendChild(oImg);
			oLi.appendChild(oDiv);
			oLi.appendChild(oP1);
			oLi.appendChild(oP2);
			oNavUl.appendChild(oLi);
		}

	}

}
function handleSearch(){
	var oList = document.querySelector('.header .search .list');
	var oInput = document.querySelector('.header .search .inputer input');
	var oInputer = document.querySelector('.header .search .inputer');
	var oSearchBtn = document.querySelector('.header .search .search-btn');
	var aSearchA = document.querySelectorAll('.header .search .inputer a');
	oInput.onfocus = function(){
		oInputer.style.borderColor = '#ff6700';
		oSearchBtn.style.borderColor = '#ff6700';
		aSearchA[0].style.display = 'none';
		aSearchA[1].style.display = 'none';
		oList.style.display = 'block';
	}
	oInput.onblur = function(){
		oInputer.style.borderColor = '#e0e0e0';
		oSearchBtn.style.borderColor = '#e0e0e0';
		aSearchA[0].style.display = 'block';
		aSearchA[1].style.display = 'block';
		oList.style.display = 'none';
	}	
}
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:[
			'images/b1.jpg',
			'images/b2.jpg',
			'images/b3.jpg',
			'images/b1.jpg',
			'images/b2.jpg'
		],
		width:1226,
		height:460,
		playDuration:3000		
	})
}
function handleCate(){
	var aCateA = document.querySelectorAll(".hot .cate li a");
	var oCate = document.querySelector(".hot .cate");

	var oCateContent = document.querySelector(".hot .cate-content");
	var oCateUl = oCateContent.getElementsByTagName('ul')[0];

	var timer = null;
	for(var i=0;i<aCateA.length;i++){
		aCateA[i].index = i;
		aCateA[i].onmouseenter = function(){
			for(var j = 0;j<aCateA.length;j++){
				aCateA[j].className = '';
			}
			this.className = 'active';
			oCateContent.style.display = 'block';
			loadData(this.index);
		}
	}
	oCate.onmouseleave = function(){
		timer = setTimeout(function(){
			for(var i =0;i<aCateA.length;i++){
				aCateA[i].className = '';
			}
			oCateContent.style.display = 'none';
		},500)
	}

	oCateContent.onmouseenter = function(){
		clearTimeout(timer);
	}
	oCateContent.onmouseleave = function(){
		for(var i =0;i<aCateA.length;i++){
			aCateA[i].className = '';
		}
		oCateContent.style.display = 'none';		
	}
	function loadData(index){
		oCateUl.innerHTML = '';
		var datas = aCateItems[index]
		if(!datas){
			return;
		}
		var sHtml = '';
		for(var i = 0;i<datas.length;i++){
			sHtml += '<li>';
			sHtml += '<img src="'+datas[i].img+'" alt="">';
			sHtml += '<a href="#">'+datas[i].name+'</a></li>';
		}
		oCateUl.innerHTML = sHtml;
	}
}

function handleTimer(){
	var aBox = document.querySelectorAll('.hot .flash .box-bd .timer-box .box');
	var nextDate = new Date('2018/05/20 19:00:00');
	var timer = null;
	function toStr(num){
		if(num<10){
			return '0'+num;
		}else{
			return ''+num;
		}
	}
	timer = setInterval(time,500)
	function time(){
		//获取当前时间
		var now = new Date();
		//剩下的毫秒数
		var allTime = nextDate.getTime() - now.getTime();
		if(allTime<0){
			allTime = 0;
			clearInterval(timer);
		}
		var allS = parseInt(allTime/1000);
		var h = parseInt(allS/3600);
		var m = parseInt((allS%3600)/60);
		var s = (allS%3600)%60;

		aBox[0].innerHTML = toStr(h);
		aBox[1].innerHTML = toStr(m);
		aBox[2].innerHTML = toStr(s);		
	}
	time();
}
function handleFlash(){
	var aSpan = document.querySelectorAll('.hot .flash .box-hd .more span');
	var oUl = document.querySelector('.hot .flash .box-bd .product-list ul');
	aSpan[1].onclick = function(){
		// oUl.style.marginLeft = "-978px";
		animation(oUl,{marginLeft:-978});
		this.className = '';
		aSpan[0].className = 'active';

	}
	aSpan[0].onclick = function(){
		animation(oUl,{marginLeft:0});
		this.className = '';
		aSpan[1].className = 'active';
	}
}
function handleElec(){
	var aA = document.querySelectorAll('.elec .box-hd li a');
	var oUl = document.querySelector('.elec .box-bd .list');
	loadData(0);
	for(var i = 0;i<aA.length;i++){
		aA[i].index = i;
		aA[i].onmouseenter = function(){
			for(var j = 0;j<aA.length;j++){
				aA[j].className = '';
			}
			this.className = 'active';
			loadData(this.index);
		}
	}

	function loadData(index){
		oUl.innerHTML = '';
		var datas = aElecItems[index];
		if(!datas){
			return;
		}
		var sHtml = '';
		for(var i=0;i<datas.length-1;i++){
			sHtml +=  '<li class="col1';
			if(datas[i].tag){
				sHtml += ' flag '+datas[i].tag+'">';
			}else{
				sHtml += '">';
			}
			sHtml += '<a href="#"><div class="img-box"><img src="'+datas[i].img+'" alt=""></div>';
			sHtml += '<p class="intro">' + datas[i].intro + '</p><p class="desc">';
			sHtml += 'Unibody 全陶瓷</p><p class="price"><span>'+datas[i].price+'元</span></p>';
			
			if(datas[i].recomm){
				sHtml += '	<div class="view"><p class="recomm">'+datas[i].recomm+'</p>';
				if(datas[i].author){
					sHtml += '<p class="author">来自于'+ datas[i].author+' 的评论</p>';
				}
				sHtml += '</div>'
			}
			sHtml += '</a></li>'
		}
		var lastData = datas[datas.length-1];
		sHtml += '<li class="col1"><div class="top"><div class="top-left"><p class="desc">';
		sHtml += lastData.top.desc+'</p><p class="price">'+lastData.top.price+'元</p>';
		sHtml += '</div><div class="top-right"><img src="'+lastData.top.img+'" alt=""></div></div>';
		sHtml += '<div class="bottom"><div class="bottom-left"><p class="desc">'+lastData.bottom.desc+'</p>';
		sHtml += '<p class="more">'+lastData.bottom.more+'</p></div><div class="bottom-right"><i class="iconfont">';
		sHtml += lastData.bottom.iconfont + '</i></div></div></li>	'

		oUl.innerHTML = sHtml;
	}
}



