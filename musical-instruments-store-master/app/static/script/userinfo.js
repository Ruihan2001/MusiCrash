
$(document).ready(
    function change(){
  const current_user = AV.User.current()
  document.getElementById('username').innerText=current_user.getUsername();
})


function getloginState(){
  return AV.User.current()
}



