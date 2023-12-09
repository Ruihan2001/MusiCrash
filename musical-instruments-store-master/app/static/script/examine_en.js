$('#phone').blur(function () {
    let phone = $(this).val();
    let span_ele = $(this).next('span');
    console.log(phone)
    if(phone.length===11) {
        span_ele.text('')
        $.get('/checkPhone', {phone: phone}, function (data) {
            // console.log(data)
            if(data.code !== 200){
                span_ele.css({"color": "#ff0011","font-size":"12px"})
                span_ele.text(data.msg);
            }
        })
    }else {
        span_ele.css({"color":"#ff0011","font-size":"12px"});
        span_ele.text('The Phone should contains 11 numbers ');
    }
});

$('#email').blur(function () {
    let email = $(this).val();
    let span_ele = $(this).next('span');
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    console.log(email)
    console.log(reg.test(email))
    if(reg.test(email)) {
        span_ele.text('')
        $.get('/checkEmail', {email: email}, function (data) {
            // console.log(data)
            if(data.code !== 200){
                span_ele.css({"color": "#ff0011","font-size":"12px"})
                span_ele.text(data.msg);
            }
        })
    }else {
        span_ele.css({"color":"#ff0011","font-size":"12px"});
        span_ele.text('The Email format is invalid ');
    }
});

$('#repassword').blur(function () {
    let repassword = $(this).val();
    let password = $('#password').val();
    let span_ele = $(this).next('span');

    if(repassword === password) {

    }else {
        span_ele.css({"color":"#ff0011","font-size":"12px"});
        span_ele.text('The confirm password is different from the password ');
    }
});