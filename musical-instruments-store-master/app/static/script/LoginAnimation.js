$(document).ready(function (){
    // event handlers
    // login and sign up page switch effect
    $("#signUpPage").on('click', function (){
        // switch to sign up page
        $('#box').addClass('right-panel-active');
    });
    $("#signInPage").on('click', function (){
        // switch to login page
        $('#box').removeClass('right-panel-active');
    });
    // // input invalidations
    // $("#signUpbtn").on('click', signUp);
    // $("#signInbtn").on('click', signIn);
    // // $("#signInUsername").on('change', checkUsername);
    // // $("#signInPsssword").on('change', checkPassword);
    // $("#signUpUsername").on('change', checkUsername);
    // $("#signUpEmail").on('change', checkEmail);
    // $("#signUpPsssword").on('change', checkPassword);
    // $("#signUpRepassword").on('change', checkPasswordConfirm);
})

// email validation
function checkEmail(){
    // get the input value
    let inputValue = $(this).val();
    // regexp expression
    let regexp = /^[A-Za-z0-9/.]+@[A-Za-z0-9/.]+$/;
    // test regexp
    if(!regexp.test(inputValue)){
        // not pass, alert message
        alert("Check your email again !");
        // focus on the input box
        $(this).focus();
        // clear the old input
        $(this).val('');
    }
}

// password confirm validation
function checkPasswordConfirm(){
    // check if enter 2 same password
    let check = ($(this).val()==$("#signUpPassword").val());
    // not pass, alert message
    if(!check){
        alert("Different password !");
        // focus on the input box
        $(this).focus();
        // clear the old input
        $(this).val('');
        $("#signUpPassword").val('');
    }
}

// username validation
function checkUsername(){
    // get the input value
    let inputValue = $(this).val();
    // set the regexp expression
    let regexp = /^[A-Za-z0-9]+$/;
    let invalidate = false;
    // not pass, alert message
    if(!regexp.test(inputValue)){
        // regexp test fail
        alert("Ony character and number are allowed !");
        invalidate = true;
    }else if(inputValue.length>15){
        // username length fail
        alert("Username should shorter than 15 characters !");
        invalidate = true;
    }
    if(invalidate){
        // focus on the input box
        $(this).focus();
        // clear the old input
        $(this).val('');
    }
}

// password validation
function checkPassword(){
    // get the input value
    let inputValue = $(this).val()
    // set regexp
    let regexp = /^[A-Za-z0-9_]*$/;
    let invalidate = false;
    // not pass, alert message
    if(!regexp.test(inputValue)){
        // regexp test fail
        alert("Password should only contains number, characters and _ !");
        invalidate = true;
    }else if(inputValue.length<8){
        // password length fail
        alert("Password at least 8 characters long !");
        // invalidate = true;
    }
    if(invalidate){
        // focus on the input box
        $(this).focus();
        // clear the old input
        $(this).val('');
    }
}
//
// // sign up function
// function signUp(){
//     // get the input value
//     let username = $("#signUpUsername").val();
//     let email = $("#signUpEmail").val();
//     let password = $("#signUpPassword").val();
//     let repassword = $("#signUpRepassword").val();
//     // post the data in json
//     $.post('/signup', {
//         "username": username, "email": email, "password": password, "repassword": repassword
//     }).done(function (response){
//         // post success
//         let server_code = response["returnValue"];
//         let server_text = response["text"];
//         if(server_code == 0) { // sign up success
//             // alert success message
//             alert(server_text);
//         }else if(server_code == 1) { // fail: reconfirm password
//             // alert fail message
//             alert(server_text);
//         }
//     }).fail(function (){
//         // post fail
//         alert("server fail");
//     });
// }

// // sign in function
// function signIn(){
//     // get the input value
//     let username = $("#signInUsername").val();
//     let password = $("#signInPsssword").val();
//     // post the data in json
//     $.post('/login', {
//         "username": username, "password": password
//     }).done(function (response){
//         // post success
//         let server_code = response["returnValue"];
//         let server_text = response["text"];
//         if(server_code == 0) { // sign in success
//             // alert success message
//             alert(server_text);
//         }else if(server_code == 1){ // fail: no user
//             // alert fail message
//             alert(server_text);
//         }else if (server_code == 2){ // fail: wrong password
//             // alert fail message
//             alert(server_text);
//         }
//     }).fail(function (){
//         // post fail
//         alert("server fail");
//     });
// }



