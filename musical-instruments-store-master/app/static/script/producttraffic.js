$(document).ready(
    function add_traffic(){
        var idArray = window.location.href.split("/");
        var id = idArray[idArray.length-1];
        const query = new AV.Query('Product');
        query.get(id).then((product) => {
            console.log(product.get('visit_count'))
            product.increment('visit_count', 1);
            console.log(product.get('visit_count'))
            product.save();
        }, (error) => {
            console.log("error")
        });
      //document.getElementById('username2').innerText=current_user.getUsername();
});