window.onload = function(){//onload 事件会在页面或图像加载完成后立即发生
	var ousername = document.getElementById("UserName");
	var opassword = document.getElementById("Password");
	var obutton = document.getElementById("btn");
	var res;

	obutton.onclick = function(){
	var username = ousername.value;
	var password = opassword.value;
	if(username == ''){
		alert("请输入用户名");
	}
	else if (password == '') {
		alert("请输入密码");
	} 
	else {
	    ajaxObj = new XMLHttpRequest();
	    var loginData = {
	    	"mobile":username,
	    	"pwd":password,
	    };
	    ajaxObj.open('POST','http://yjhapi.agxx.club/iweb/login/check');
	    //ajaxObj.send();
	    ajaxObj.setRequestHeader("Content-Type","application/json");//表示以json的形式提交数据
	    ajaxObj.onreadystatechange = function(){
    	if(ajaxObj.readyState == 4 && ajaxObj.status == 200){
    		res = ajaxObj.responseText;
    		res = res.substring(1);
    		res = JSON.parse(res);//将获得的responseText(JSON格式)转化为javascript对象(数组)
    		ajaxObj.abort();
    		ifLogin(res);
    		console.log(res);
    	}

		/*var url1 = "http://yjhapi.agxx.club/iweb/login/check?mobile="+username+"&pwd="+password;
		ajaxFn(url1,function(data)){
			alert("已成功登陆");*/       
		};
		ajaxObj.send(JSON.stringify(loginData));
	}
}
function ifLogin(obj){
	if(obj.status == 1){
		alert("已成功登陆");
	}
}
}

// obutton.onclick = function(){
// 	var username = ousername.value;
// 	var password = opassword.value;
// 	if(username == ''){
// 		alert("请输入用户名");
// 	}
// 	else if (password == '') {
// 		alert("请输入密码");
// 	} 
// 	else {
// 		var ajaxObj = null;
// 		if(window.XMLHttpRequest){
// 			ajaxObj = new XMLHttpRequest();
// 		}
// 		else{
// 			ajaxObj = new ActiveXObject('Microsoft.XMLHttp');
// 	    }
// 	    var loginData = {
// 	    	"mobile":username,
// 	    	"pwd":password,
// 	    };
// 	    ajaxObj.open('POST','http://yjhapi.agxx.club/iweb/login/check');
// 	    ajaxObj.setRequestHeader("Content-Type","application/json");
// 	    ajaxObj.onreadystatechange = function(){
//     	if(ajaxObj.readyState == 4 && ajaxObj.status == 200){
//     		res = ajaxObj.responseText;
//     		res = res.substring(1);
//     		res = JSON.parse(res);
//     		ajaxObj.abort();
//     		ifLogin(res);
//     		console.log(res);
//     	}

// 		/*var url1 = "http://yjhapi.agxx.club/iweb/login/check?mobile="+username+"&pwd="+password;
// 		ajaxFn(url1,function(data)){
// 			alert("已成功登陆");*/       
// 		};
// 		request.send(JSON.stringify(loginData));
// 	}
// }
// function ifLogin(obj){
// 	if(obj.status == 1){
// 		showSuccessMsg();
// 	}
// }

/*function ajaxFn(url,succFn){
	var ajaxObj = null;
	if(window.XMLHttpRequest){
		ajaxObj = new XMLHttpRequest();//1、得到ajax操作的对象
	}
	else{
		ajaxObj = new ActiveXObject('Microsoft.XMLHttp');
	}
	ajaxObj.open('POST',url,true);//2、给对象，指定请求方式，请求的地址,异步或同步
    ajaxObj.send();//3、发送请求给服务器处理
    //4、当接收到服务器发回的相应信息，如何处理数据
    //onreadystatechange 准备状态的改变
    ajaxObj.onreadystatechange = function(){
    	if(ajaxObj.readyState == 4){
    		if(ajaxObj.status >= 200 && ajaxObj.status <= 300){
    			succFn(ajaxObj.responseText);
    		}
    	}
    }
}*/
