    AV.init({
  appId: "pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI",
  appKey: "pShwYQQ4JVfSStc56MvkHNrr",
});

    const idArray = window.location.href.split("/");
    const tf = idArray[idArray.length-2];
let ch = false;
if(tf=="ch"){
    ch = true;
}
const query = new AV.Query('Cov19');
            query.equalTo('kind','cov19');
            query.find().then((status) => {
                if(status[0].get('status')){
                    if(ch){
                                         document.getElementById('covid').innerText = "疫情状态开启";
                    }else{
                                         document.getElementById('covid').innerText = "COVID-ALARM-ON";
                    }

                }else{
                                        if(ch){
                                         document.getElementById('covid').innerText = "疫情状态关闭";
                    }else{
                                            document.getElementById('covid').innerText = "COVID-ALARM-OFF";
                    }

                }
            });



function Cov19(){
    const COV = AV.Object.extend('Cov19');
    const cov  = new COV();
           // let id = obj.getAttribute("id");
            const query = new AV.Query('Cov19');
            query.equalTo('kind','cov19');
            query.find().then((status) => {
                if(status[0].get('status')){
                 status[0].set('status',false);
                    if(ch){
                                         document.getElementById('covid').innerText = "疫情状态关闭";
                    }else{
                                            document.getElementById('covid').innerText = "COVID-ALARM-OFF";
                    }
                }else{
                    status[0].set('status',true);
                     if(ch){
                                         document.getElementById('covid').innerText = "疫情状态开启";
                    }else{
                                         document.getElementById('covid').innerText = "COVID-ALARM-ON";
                    }
                }
               status[0].save().then((order) => {
                    console.log('保存成功。objectId：'+order.getObjectId());
                }, (error) => {
                    console.log("error");
    // 异常处理
                });
            });
}

function search(page){
    const state = document.getElementById('state').value;
    window.location.href = '/allOrderList?page='+ page + '&state=' + state;
}

function search_ch(page){
    const state = document.getElementById('state').value;
    window.location.href = '/ch/allOrderList?page='+ page + '&state=' + state;
}

function clear(){
    window.location.href = '/allOrderList';
}

function clear_ch(){
    window.location.href = '/ch/allOrderList';
}

function changeSort(sort){
    const str = window.location.href;
    const reg = RegExp(/'?'/)
    const reg2 = RegExp(/order/)
    console.log(str.match(reg))
    console.log(str.match("order")!=null)
    if (str.includes('?')){
        if(str.match("order")!=null){
            const ar = str.split("order")
            window.location.href = ar[0] + 'order=' + sort
        }
        else{
            window.location.href = str + '&order=' + sort
        }
    }
    else{
        window.location.href = str + '?order=' + sort
    }

}