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

const queryP = new AV.Query('Product');
let qp = queryP.greaterThan('visit_count',5);
qp.include('title');
qp.descending('visit_count');
qp.limit(7);
qp.find().then((products)=>{
    for(let a = 0;a<7;a++){
        let title = products[a].get('title').get('english');
        let visit = products[a].get('visit_count');
            console.log(products[a].get('title').get('english'));
            const product = new AV.Object.createWithoutData('Product', products[a].id)
            $('#mostVisit').append('<tr><td>'+title+'<a href="/productInfo/'+ products[a].id+'" class="ms-1" aria-label="Open website">' +
                 '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
                 '<path stroke="none" d="M0 0h24v24H0z" fill="none"/>' +
                 '<path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />' +
                 '<path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" /></svg>' +
                 '                          </a></td>' +
                 '<td class="text-muted">'+visit+'</td>' +
                 '<td class="text-end w-1">' +
                 '                        <div class="chart-sparkline chart-sparkline-sm" id="sparkline-bounce-rate-2" style="min-height: 24px" ></div>' +
                 '</td>'+'</tr>');

    }
});
function toPercent(point,x){
    var str=Number(point*100).toFixed(x);
    str+="%";
    return str;
}

let deliverNum = 0;
let receiveNum = 0;
let waitingNum= 0;
let totalNum = 0;
const queryOrder = new AV.Query('Order');
queryOrder.equalTo('status','delivering');
queryOrder.count().then((count1) => {
    deliverNum = count1;
  console.log(`${count1} 个 deliver 已完成。`);
  queryOrder.equalTo('status','received');
queryOrder.count().then((count2) => {
    receiveNum = count2;
  console.log(`${count2} 个 receive 已完成。`);


    queryOrder.equalTo('status','waiting to be delivered');
queryOrder.count().then((count3) => {
    waitingNum = count3;
  console.log(`${count3} 个 wait 已完成。`);
  totalNum = deliverNum+receiveNum+waitingNum;
  let orderrate = toPercent(receiveNum/totalNum,0);
  $('#orderRate').text(orderrate);
  $('#rateoderBar').css('width',orderrate);
  if(ch){
              $('#totalSales').text(totalNum-waitingNum+' 完成订单数');
  $('#waitingSales').text(waitingNum+' 等待传送订单');
  $('#totalOrders').text(totalNum +' 总订单');
  $('#deliverOrders').text(deliverNum+' 正在运送');
  }else{
        $('#totalSales').text(totalNum-waitingNum+' Sales');
  $('#waitingSales').text(waitingNum+' waiting payments');
  $('#totalOrders').text(totalNum +' Orders');
  $('#deliverOrders').text(deliverNum+' Delivering');
  }

});
});
});

let collectionNum = 0;
let communicationNum = 0;
const queryCollection  = new AV.Query('CollectionMap');
queryCollection.equalTo('status',true);
queryCollection.count().then((collections)=>{
    if(ch){
         $('#totalcollection').text(collections +' 收藏');
    $('#collectionToday').text(collections-5 + ' 今日收藏');
    }else{
        $('#totalcollection').text(collections +' Collections');
    $('#collectionToday').text(collections-5 + ' Today');
    }

    collectionNum = collections;
});
const queryCommunication  = new AV.Query('_Conversation');
queryCommunication.equalTo('tr',false);
queryCommunication.count().then((communications)=>{
        if(ch){
    $('#TotalCommunications').text(communications +' 对话总数');
    $('#TodayCommunications').text(communications-5 + ' 今日会话');
    }else{
    $('#TotalCommunications').text(communications +' Communications');
    $('#TodayCommunications').text(communications-5 + ' Today');
    }

    communicationNum = communications;
});


function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

function getTime(n){
    var myDate = new Date((new Date).getTime() + (n-10)*24*60*60*1000);
      var t1 = myDate.toJSON().split('T').join(' ').substr(0,10);
      return t1;
      }


function simple_report(){
    let name = $('#reportName').val();
    let Username = $('#userName').val();
    let addInfo = $('#additionalInfo').val();


    let info = "Report name: "+name+ '\n';
    info += "User Name: "+Username+'\n';

    info += "Date:  "+ getTime(10)+'\n';
    info += "Total Sales: "+totalNum+ "\n";
    info += "Total Collection: " + collectionNum+'\n';
    info += "Toay Collection: " + collectionNum/2+'\n';
    info += "Total Delivery: " + deliverNum+'\n';
    info += "Receiving Delivery: " + receiveNum+'\n';
    info += "Waiting Delivery: " + waitingNum+'\n';
    info += "Communication: " + communicationNum +'\n';
    info += "Today Communication: " + communicationNum-5 +'\n';
    info += 'Additional Information:  '+'\n'+"     "+addInfo;


    download(name+" "+getTime(10)+"  simple_report",info);
}

function advanced_report(){

}
