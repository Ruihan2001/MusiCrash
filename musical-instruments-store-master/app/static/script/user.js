AV.init({
  appId: "pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI",
  appKey: "pShwYQQ4JVfSStc56MvkHNrr",
});


$(document).ready(
    function change_index(){
        const current_user = AV.User.current();
        //document.getElementById('username').innerText="HELLO, " + current_user.getUsername();
        console.log(sessionStorage.getItem('authenticated'));
        var oplist = document.getElementById('user-operation');
        if(oplist!=null) {

            checkIsOperation().then(res => {
                if (res) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    var span = document.createElement("span");
                    var span1 = document.createElement("span");
                    a.href = '/staff_index';
                    span.className = "sn-title-menu";
                    li.id = "ad";
                    span1.className = "dsn-meta-menu";
                    span.innerText = "Administrator";
                    oplist.appendChild(li);
                    li.appendChild(a);
                    a.appendChild(span);
                    a.appendChild(span1);
                }
            })
            checkLoginState().then(s => {
                if (s) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    var span = document.createElement("span");
                    var span1 = document.createElement("span");
                    a.href = 'javascript: logout()';
                    a.id = 'logouta';
                    span.className = "sn-title-menu";
                    span.id = "logout";
                    li.id = "logoutc";
                    span1.className = "dsn-meta-menu";
                    span.innerText = "Log out";
                    oplist.appendChild(li);
                    li.appendChild(a);
                    a.appendChild(span);
                    a.appendChild(span1);
                    var li1 = document.createElement("li");
                    var a1 = document.createElement("a");
                    var span2 = document.createElement("span");
                    var span3 = document.createElement("span");
                    a1.href = '/testbase';
                    span2.className = "sn-title-menu";
                    li1.id = "userinfo";
                    span3.className = "dsn-meta-menu";
                    span2.innerText = "User Info";
                    oplist.appendChild(li1);
                    li1.appendChild(a1);
                    a1.appendChild(span2);
                    a1.appendChild(span3);
                    document.getElementById('logoutb').innerText = "";
                    $('#logoutb').append('<img src="../static/img/login-user.png" style="width: 20px; border-radius: 20px; background-color: white">')
                } else {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    var span = document.createElement("span");
                    var span1 = document.createElement("span");
                    a.href = '/signUp';
                    a.id = 'logouta';
                    span.className = "sn-title-menu";
                    li.id = "ad";
                    span1.className = "dsn-meta-menu";
                    span.innerText = "Login & Sign Up";
                    oplist.appendChild(li);
                    li.appendChild(a);
                    a.appendChild(span);
                    a.appendChild(span1);
                }
            })
        }
      //document.getElementById('username2').innerText=current_user.getUsername();
});

function updateLocation(){
    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log( position.coords.longitude );
            console.log( position.coords.latitude );
            const point = new AV.GeoPoint({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                if(getLoginState()!=null) {
                    const currentUser = AV.User.current();
                    currentUser.set('location',point)
                    currentUser.save()
                }
        },
        function (e) {
           throw(e.message);
        }
    )
}
}

async function signUp(username, email, phone, password, onSuccess, onFail){
    // 创建实例
    const user = new AV.User();

    // 等同于 user.set('username', 'Tom')
    user.setUsername(username);
    user.setPassword(password);

    // 可选
    if(phone !== null){
      user.setMobilePhoneNumber(phone);
    }
    if(email !== null){
      user.setEmail(email);
    }

    user.signUp().then((user) => {
      // 注册成功
      console.log(`注册成功。objectId：${user.id}`);
      onSuccess(user);
    }, (error) => {
      // 注册失败（通常是因为用户名已被使用）
      onFail(error)
    });
}

async function signInWithUsername(username,password, onSuccess, onFail){
    let key = 'authenticated';
  AV.User.logIn(username, password).then((user) => {
      // 登录成功
////
      const current_user = AV.User.current();
      //const roles = AV.User.current().getRoles();
      checkIsOperation().then(res => {
            $.post('/checkLogin',
                {
                    'user': current_user.get('username'),
                    'operation': res
                }).done(
                    function(response){
                    console.log(response);
                    console.log(sessionStorage.getItem('authenticated'));
                });
            updateLocation()
      onSuccess(user);
        }, (error) => {
      // 登录失败（可能是密码错误）

      onFail(error)
  });
      })


}

async function signInWithEmail(email,password, onSuccess, onFail){
    AV.User.loginWithEmail(email, password).then((user) => {
      // 登录成功
        updateLocation()
      onSuccess(user)

    }, (error) => {
      // 登录失败（可能是密码错误）
      onFail(error)
    });
}

async function logout() {
    console.log(getLoginState());
    if(getLoginState()!=null){
        AV.User.logOut();
        alert('logout successfully');
        const current_user = AV.User.current();
        let username;
        if(current_user==null){
            username = null;
        }
        else{
            username = current_user.get('username');
        }
        $.post('/checkLogin',
          {
              'user': null,
              'operation': false
          }).done(
          function(response){
              $("a#logouta").attr("href", "/signUp")
              document.getElementById('logout').innerText = "Login & Sign Up"
              a = document.getElementById('logouta');
              a.href = "/signUp";
              document.getElementById('logoutb').innerText = "Setting"
              li = document.getElementById('user-operation');
              var length = li.childNodes.length
              if(document.getElementById('ad')){
                  li.removeChild(li.childNodes[length-1]);
              }

              li1 = document.getElementById('userinfo')
              li1.remove()

          });
        // document.getElementById('result').innerText='logout successfully';
    }
    else{
            // document.getElementById('result').innerText='not already login';
        alert('not already login');
    }
    //console.log('logout successfully');
}

function getLoginState(){
  return AV.User.current()
}

async function checkLoginState(){
  return !!AV.User.current();
}



function changeInfo(username,phone,email){
    if(getLoginState()!=null){
        const currentUser = AV.User.current();
        if(username!==''){
            currentUser.setUsername(username);
        }
        if(phone!==''){
            currentUser.setMobilePhoneNumber(phone);
        }
        if(email!==''){
            currentUser.setEmail(email);
        }
        currentUser.save().then((currentUser) => {
  // 成功保存之后，执行其他逻辑
  console.log(`保存成功。objectId：${currentUser.id}`);
  document.getElementById('result').innerText='successfully change';
}, (error) => {
  // 异常处理
            document.getElementById('result').innerText='fail to change';
            console.log(`保存失败。objectId：${currentUser.id}`);
});
    }
    else{
          document.getElementById('result').innerText='not already login';
    }
}

function reset(email) {
    AV.User.requestPasswordReset(email);
      document.getElementById('result').innerText='email has been sent';
}

function orderlist() {
    window.location.href = '/orderList/'+AV.User.current().id
}

function collectionlist() {
    window.location.href = '/collection/'+AV.User.current().id
}

async function checkIsOperation() {
    if(AV.User.current() != null){
        roles=await AV.User.current().getRoles()
    for(role in roles){
        if (roles[role].getName()==='operation'){
            return true
        }
    }
    return false
    }
    return false
}