/*
* @Author: TomChen
* @Date:   2018-05-15 19:11:58
* @Last Modified by:   TomChen
* @Last Modified time: 2018-05-16 20:12:52
*/
handleCart();
handleNav();
handleSearch();
handleCarousel();
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
