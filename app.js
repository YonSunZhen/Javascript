window.onload = function(){
	imgLocation("container","box");

    var imgData={"data":[{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]};
	window.onscroll = function(){//监听滚动条
		if(checkFlag()){
			var cparent = document.getElementById("container");
			for (var i = 0; i < imgData.data.length; i++) {
				var ccontent = document.createElement("div");//创建元素节点
				ccontent.className="box";
				cparent.appendChild(ccontent);//可向节点的子节点列表的末尾添加新的子节点
				var boximg = document.createElement("div");
				boximg.className="box_img";
				ccontent.appendChild(boximg);//先创建节点再添加
				var img = document.createElement("img");
				img.src = "images/"+imgData.data[i].src;
				boximg.appendChild(img);//动态增加存放图片的地方
			}
			imgLocation("container","box");
		}
	}
}

function checkFlag(){
	var cparent = document.getElementById("container");
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
	//console.log(lastContentHeight);得到最后一张图片距顶部的高度
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //console.log(scrollTop);//输出超出容器的部分
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(pageHeight);//得到当前容器的高度
    if (lastContentHeight<scrollTop+pageHeight) {
    	return true;
    } 
}   

function imgLocation(parent,content){//获得有多少个div
	//将parent下多有的content全部取出
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
    //console.log(ccontent.length);
    var imgWidth = ccontent[0].offsetWidth;//得到第一张图片的宽度
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);//整个屏幕的宽度除以图片的宽度得到可以存放图片的张数
    cparent.style.cssText = "width:"+imgWidth*num+"px;margin:0 auto";//重新设置样式表
    
    var BoxHeightArr=[];
    for(var i = 0;i<ccontent.length;i++){
    	if(i<num){
    		BoxHeightArr[i] = ccontent[i].offsetHeight;
    	    //console.log(BoxHeightArr[i]);//输出第一行所有box的高度
    	}else{
    		var minheight = Math.min.apply(null,BoxHeightArr);
    		//console.log(minheight);//得到第一行中高度最小的图片
    		var minIndex = getminheightLocation(BoxHeightArr,minheight);
    		ccontent[i].style.position = "absolute";
    		ccontent[i].style.top = minheight+"px";//设置图片顶部顶着上一张图片
    		ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";//将图片居左（offsetLeft得到那张图片的左边距）
    		BoxHeightArr[minIndex] = BoxHeightArr[minIndex]+ccontent[i].offsetHeight;//得到叠加之后的图片的高度

    	}
    }    
}

function getminheightLocation(BoxHeightArr,minHeight) {//得到高度最小的图片的位置
	for(var i in BoxHeightArr){
		if(BoxHeightArr[i] == minHeight){
			return i;
		}
	}
}

function getChildElement(parent,content){//得到每个控件
	var contentArr=[];
	var allcontent = parent.getElementsByTagName("*");
	for (var i = 0; i < allcontent.length; i++) {
		if(allcontent[i].className==content){
			contentArr.push(allcontent[i]);//将所有box放进数组contentArr
		}
	}
	return contentArr;
}
