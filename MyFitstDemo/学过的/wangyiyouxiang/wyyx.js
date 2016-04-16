/**
 * Created by Administrator on 2016/4/2.
 */

$(function () {
   $(".sub").click(function(){
       var n=$("#tst").val();
       var p=$("#pwd").val();
       if(!n){
           alert("请输入账号!");
           return;
       }
       else if(!p){
           alert("请输入密码!");
           return;
       }
       var x=[{userName:"liuyang",password:'liuyang123'},{userName:"admin",password:'admin123'}];
       var name = false;
       var pswd = false;
       for(var i=0;i< x.length;i++){
           if(n == x[i].userName){
               name=true;
               if(p==x[i].password){
                   pswd=true;
               }
               else{
                   pswd=false;
               }
           }
       }
       if(name==true && pswd==true){
           alert("登录成功");
           window.open("https://www.baidu.com/");
       }
       else if(name==false){
           alert("账号错误");
       }
       else if(pswd ==false){
           alert("密码错误");
       }
   }) 
});