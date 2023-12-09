function alert(){
    prompt("Username")
    // let signupbox = $('<label>username:<input type="text" id="username"></label><label>password:<input type="password" id="password"> </label>');
    // // $("body").append("<div id='msg'><span>"+signupbox+"</span></div>");
    // $("body").append("<div id='msg'>"+signupbox+"</div>");
    // clearmsg();
}
function clearmsg(){
    var t = setTimeout(function(){
        $("#msg").remove();
    },2000)
}
function jump(){
    // window.open("{{ url_for('main.testlogin') }}");
    window.open("testlogin.html");
}
function show_Win(div_Win, tr_Title, event) {
            var s_Width = document.documentElement.scrollWidth; //滚动 宽度
            var s_Height = document.documentElement.scrollHeight; //滚动 高度
            var js_Title = $(document.getElementById(tr_Title)); //标题
            js_Title.css("cursor", "move");
            //创建遮罩层
            $("<div id=\"div_Bg\"></div>").css({ "position": "absolute", "left": "0px", "right": "0px", "width": s_Width + "px", "height": s_Height + "px", "background-color": "#ffffff", "opacity": "0.6" }).prependTo("body");
            //获取弹出层
            var msgObj = $("#" + div_Win);
            msgObj.css('display', 'block'); //必须先弹出此行，否则msgObj[0].offsetHeight为0，因为"display":"none"时，offsetHeight无法取到数据；如果弹出框为table，则为'',如果为div，则为block，否则textbox长度无法充满td
            //y轴位置
            var js_Top = -parseInt(msgObj.height()) / 2 + "px";
            //x轴位置
            var js_Left = -parseInt(msgObj.width()) / 2 + "px";
            msgObj.css({ "margin-left": js_Left, "margin-top": js_Top });
            //使弹出层可移动
            msgObj.draggable({ handle: js_Title, scroll: false });
        }
