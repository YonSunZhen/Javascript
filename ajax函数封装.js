window.onload=function(){
	var ousername = document.getElementById("UserName");
	var opassword = document.getElementById("Password");
	var obutton = document.getElementById("btn");

	obutton.onclick=function(){
		var username = ousername.value;
	    var password = opassword.value;
	    if(username == ''){
	    	alert("请输入用户名");
	    }else if(password == ''){
            alert("请输入密码");
	    }else{
	    	var loginData = {
		    	"mobile":username,
		    	"pwd":password,
	        }
	        var login = JSON.stringify(loginData);
	    	ajax('http://yjhapi.agxx.club/iweb/login/check',login,function(res){
	    		res = res.substring(1);
    		    res = JSON.parse(res);
                //ajaxObj.abort();
    		    ifLogin(res);
    		    //console.log(res);
	    	});
	    }
	    function ifLogin(obj){
	        if(obj.status == 1){
		    alert("已成功登陆");
	        }
        }
    }
}
//POST函数封装
function ajax(url,string,funSucc,funFaild){
		var xhr=new XMLHttpRequest();
		xhr.open('POST',url,true);
		url=url+new Date().getTime();//防止浏览器的缓存，确保每次从服务器获得的是最新的数据
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.send(string);
		xhr.onreadystatechange=function(){
			if (xhr.readyState == 4&& xhr.status == 200) {
				funSucc(xhr.responseText);
			}
			/*else{
				funFaild(xhr.statusText);
			}*/
		}
	}











