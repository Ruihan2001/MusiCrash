function DeleteProduct(){
    const currentUser = AV.User.current();

}


function Order(obj){
    const Order = AV.Object.extend('Order');
    const order  = new Order();
        if(checkLoginState()){
            let id = obj.getAttribute("id");
            const query = new AV.Query('Product');
            query.get(id).then((product) => {
               // const titleid     = product.get('title').getObjectId();
                //const priceid     = product.get('price').getObjectId();
                const currentUser = AV.User.current();
                const title     = product.get('title');
                const price     = product.get('price');
                console.log(title, 1);
                let status = "delivering";
                order.set('price',price);
                order.set('status',status);
                order.set('product',product);
                order.set('user',currentUser);
                order.save().then((order) => {
                    console.log('保存成功。objectId：'+order.getObjectId());
                }, (error) => {
                    console.log(error);
    // 异常处理
                });
            });
        }
        else{
            document.getElementById('result').innerText='not already login';
        }
}


function MakeOrder(){
    const currentUser = AV.User.current();
    // const Order = AV.Object.extend('Order');
    // const order  = new Order();
    //     if(!checkLoginState()){
    //         const query = new AV.Query('Product');
    //         query.get(id).then((product) => {
    //             const title     = product.get('title');
    //             const price     = product.get('price');
    //             console.log(title, 1);
    //             let status = "waiting to be delivered";
    //             order.set('price',price);
    //             order.set('status',status);
    //             order.set('product',product);
    //             order.set('user',currentUser);
    //             order.set('name',name);
    //             order.set('email',email);
    //             order.set('address',address);
    //             order.set('town',town);
    //             order.set('offline',offline);
    //             order.save().then((order) => {
    //             }, (error) => {
    //                 console.log(error);
    // // 异常处理
    //             });
    //         });
    //     }
    //     else{
    //         document.getElementById('result').innerText='not already login';
    //     }
    const idArray = window.location.href.split("/");
    const id = idArray[idArray.length-1];
    const name = document.getElementById('name').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const off = document.getElementById('selectEx').value;
    let offline;
    if(off == "online")
    {
        offline = false
    }
    else{
        offline = true
    }
    const town = document.getElementById('town').value;
    AV.Cloud.run('makeOrder', {'product_id':id,'name':name,'address':address,'email':email,"offline":offline,"town":town}).then(function (data) {
      // 处理结果
        console.log(data)
        if(data){
                    alert("Place Order Successfully")
window.location.href = '/orderList/'+currentUser.id;
        }else {
            console.log(error);
        }
    }, function (err) {
      // 处理报错
    });
}

function ModifyOrder(orderid){
    const currentUser = AV.User.current();
    // const Order = AV.Object.extend('Order');
    // const order  = new Order();
    //     if(!checkLoginState()){
    //         const query = new AV.Query('Product');
    //         query.get(id).then((product) => {
    //             const title     = product.get('title');
    //             const price     = product.get('price');
    //             console.log(title, 1);
    //             let status = "waiting to be delivered";
    //             order.set('price',price);
    //             order.set('status',status);
    //             order.set('product',product);
    //             order.set('user',currentUser);
    //             order.set('name',name);
    //             order.set('email',email);
    //             order.set('address',address);
    //             order.set('town',town);
    //             order.set('offline',offline);
    //             order.save().then((order) => {
    //             }, (error) => {
    //                 console.log(error);
    // // 异常处理
    //             });
    //         });
    //     }
    //     else{
    //         document.getElementById('result').innerText='not already login';
    //     }
    const name = document.getElementById('name').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const off = document.getElementById('selectEx').value;
    let offline;
    if(off == "online")
    {
        offline = false
    }
    else{
        offline = true
    }
    const town = document.getElementById('town').value;
    const Order = AV.Object.extend('Order');
    const order = Order.createWithoutData("Order",orderid);
    order.set('name',name);
    order.set('email',email);
        order.set('address',address);
            order.set('town',town);
            order.set('offline',offline);
            order.save();
            alert("Modify Order Successfully");
            window.location.href = '/orderList/'+currentUser.id;
                    console.log(123165)
}