function Polyglot(options) {
    this.phrases = options.phrases;
  }
  Polyglot.prototype.t = function (key) {
    return this.phrases[key];
  };

  var zhPhrases = {
    resetPass: "重置密码",
    newPass: "新密码",
    confirmPass: "重新输入",
    reset: "重置",
    passwordMismatch: "两次输入不一致",
    resetSucc:
      "重置密码成功",
    tokenInvalid: "Token 已过期或无效",
    serverError: "服务器发生错误",
  };
  var enPhrases = {
    resetPass: "Reset Password",
    newPass: "New password",
    confirmPass: "Confirm password",
    reset: "Reset",
    passwordMismatch: "Your password and confirmation password do not match.",
    resetSucc:
      "Your password has been reset.",
    tokenInvalid: "Token is expired or invalid.",
    serverError: "A server error occurred.",
  };
  var i18nPhrases =
    window.navigator.language.slice(0, 2) === "zh" ? zhPhrases : enPhrases;
  var polyglot = new Polyglot({ phrases: i18nPhrases });

  $("h3").text(polyglot.t("resetPass"));
  $("#newPass").text(polyglot.t("newPass"));
  $("#confirmPass").text(polyglot.t("confirmPass"));
  $("#reset").text(polyglot.t("reset"));

  //获得token
  var token = location.search.match(/token=(\w*)/);
  if(token&&token[1]){
    token = token[1];
  }
  $(function(){
    $("#reset").click(function(){
      var p = $("[name=password]");
      var p1 = $("[name=password1]");
      if(p.val()!=p1.val()){
        $("#error").show();
        $("#error").text(polyglot.t("passwordMismatch"));
      }
      if(p.val()&&p1.val()&&p.val()==p1.val()){
        $.ajax({
          dataType: 'jsonp',
          // CHANGE THE URL BELOW.
          url:"https://api.example.com/1.1/resetPassword/"+token,
          // Replace api.example.com with:
          // - (LeanCloud China) your own custom api domain
          // - (LeanCloud Intl.) FIRST-8-CHARACTERS-OF-YOUR-APP-ID-IN-LOWERCASE.api.lncldglobal.com
          data:{"password":p.val()},
          success:function(result){
            $("#error").show();  // error is used for both success and failure message.
            if(result.error){
              if (result.error.startsWith("Token")) {
                $("#error").text(polyglot.t("tokenInvalid"));
              } else {
                $("#error").text(result.error);
              }
            }else{
              $("#error").html(polyglot.t("resetSucc"));
            }
          },
          error:function(result,text){
            $("#error").text(polyglot.t("serverError"));
          }
        });
      }

    });
  });