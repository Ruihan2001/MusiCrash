$(document).ready(
    add_traffic()
    );
function add_traffic(){
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    add_traffic_mobile();
   console.log(1);
} else {
        add_traffic_desk();
        console.log(2);
}
}
function add_traffic_mobile(){
        var time = getTime(10);
        console.log(time);
        const query = new AV.Query('Traffic');
        query.equalTo('Date', time);
        query.find().then((visit) => {
            if(visit.length != 0){
                console.log(visit[0].get('Mobile'));
                visit[0].increment('Mobile', 1);
                console.log(visit[0].get('Mobile'));
                visit[0].save();
            }
            else{
                const Traffic = AV.Object.extend('Traffic');
                const traffic = new Traffic();
                traffic.set('Date', time);
                traffic.set('Mobile', 1);
                traffic.set('Desktop', 0);
                traffic.save().then((todo) => {
                    // 成功保存之后，执行其他逻辑
                    console.log(`保存成功`);
                    }, (error) => {
                    // 异常处理
                });
            }

        }, (error) => {
             console.log("error")
        });
}



function add_traffic_desk(){
        var time = getTime(10);
        console.log(time);
        const query = new AV.Query('Traffic');
        query.equalTo('Date', time);
        query.find().then((visit) => {
            if(visit.length != 0){
                console.log(visit[0].get('Desktop'));
                visit[0].increment('Desktop', 1);
                console.log(visit[0].get('Desktop'));
                visit[0].save();
            }
            else{
                const Traffic = AV.Object.extend('Traffic');
                const traffic = new Traffic();
                traffic.set('Date', time);
                traffic.set('Desktop', 1);
                traffic.set('Mobile', 0);
                traffic.save().then((todo) => {
                    // 成功保存之后，执行其他逻辑
                    console.log(`保存成功`);
                    }, (error) => {
                    // 异常处理
                });
            }

        }, (error) => {
             console.log("error")
        });
}

function getTime(n){
    var myDate = new Date((new Date).getTime() + (n-10)*24*60*60*1000);
    var t1 = myDate.toJSON().split('T').join(' ').substr(0,10);
    return t1;
}