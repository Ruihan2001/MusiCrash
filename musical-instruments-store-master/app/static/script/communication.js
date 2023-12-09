AV.init({
  appId: "pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI",
  appKey: "pShwYQQ4JVfSStc56MvkHNrr",
});

const c_user = AV.User.current();
const user_name = AV.User.current().get('username');

var idArray = window.location.href.split("/");
var conversation_id = idArray[4];
console.log(conversation_id);
        let ungroup = {};
$(document).ready(

    function () {

    var list = document.getElementById('communication');


    realtime.createIMClient(c_user).then(async function (user) {
        var query = user.getQuery();
        //query.containedIn('m', [c_user.id]);

        function test(){
             query.find().then(function (conversations) {
            for (conversation in conversations) {
                console.log(conversations[conversation].id);
                var li = document.createElement("li");
                li.className = 'clearfix'
                var a = document.createElement("a");
                var img = document.createElement("img");
                var div1 = document.createElement("div");
                var div2 = document.createElement("div");
                var div3 = document.createElement("div");
                var i = document.createElement("i");
                div1.className = "about"
                div2.className = "name"
                div3.className = "status"
                i.className = "fa fa-circle online"
                    // if(ungroup[conversations[conversation].id.toString()] >=1 ) {
                    //     console.log(1233);
                    //     i.style.color = 'red';
                    //     i.innerText = ungroup[conversations[conversation].id];
                    // }
                ungroup[conversations[conversation].id.toString()]=i

                a.href = "/conversation/" + conversations[conversation].id
                // img.src = "../../static/chat-widget/img/t1.png"
                img.src="../static/img/login-user.png"
                img.height=50
                img.alt = "avatar"
                div2.innerText = conversations[conversation].name
                list.appendChild(li);
                li.appendChild(a);
                a.appendChild(img);
                a.appendChild(div1);
                div1.appendChild(div2);
                div1.appendChild(div3);
                div3.appendChild(i);

            }
        }).catch(console.error.bind(console));
        }

        test()

        user.on(Event.UNREAD_MESSAGES_COUNT_UPDATE, function(Conversations) {
              for(let conv of Conversations) {
                  // ungroup[conv.id] = conv.unreadMessagesCount;
                  let i=ungroup[conv.id]
                  console.log(conv.unreadMessagesCount)
                  if (conv.unreadMessagesCount>0){
                      i.style.color = 'red';
                      i.innerText = conv.unreadMessagesCount;
                  }else{
                      i.style.color = '';
                      i.innerText = '';
                  }

                 }

});


        if(conversation_id!=='1'){
            console.log(conversation_id);
            var chat = document.getElementById("chat");
            //var { MessageQueryDirection } = require('leancloud-realtime');
            user.getConversation(conversation_id).then(function(conversation) {
                console.log(conversation.id);
                conversation.queryMessages({
                    //direction: MessageQueryDirection.OLD_TO_NEW,
                    limit: 30, // limit 取值范围 1~100，默认 20
                }).then(function(messages) {
                    for(var i = 0;i<messages.length;i++){
                        console.log(messages[i].from);
                        var li = document.createElement("li");
                        var div1 = document.createElement("div");
                        var span1 = document.createElement("span");
                        var span2 = document.createElement("span");
                        var ii = document.createElement("i");
                        var div2 = document.createElement("div");
                        if(messages[i].from==c_user.id){
                            li.className = "clearfix";
                            div1.className= "message-data align-right";
                            span1.className = "message-data-time";
                            span2.className = "message-data-name";
                            ii.className = "fa fa-circle me"
                            div2.className = "message other-message float-right";
                            span1.innerText = messages[i]._timestamp+" ";
                            if(c_user.id!='622431dd6f77474716d8351c'){
                                span2.innerText = conversation.name+" ";
                            }
                            else{
                                span2.innerText = "Staff ";
                            }
                            span2.appendChild(ii);
                        }
                        else{
                            div1.className = "message-data";
                            span1.className = "message-data-name";
                            span2.className = "message-data-time";
                            ii.className = "fa fa-circle online"
                            div2.className = "message my-message";
                            span1.appendChild(ii)
                            if(c_user.id!='622431dd6f77474716d8351c'){
                                span1.append(" Staff")
                            }
                            else{
                                span1.append(" "+conversation.name);
                            }
                            //span1.innerText =
                            span2.innerText = messages[i]._timestamp;

                        }
                        div2.innerText = messages[i].content['_lctext'];
                        chat.appendChild(li);
                        li.appendChild(div1);
                        div1.appendChild(span1);
                        div1.appendChild(span2);
                        li.appendChild(div2);
                    }
                console.log(messages)
                // 最新的十条消息，按时间增序排列
                }).catch(console.error.bind(console));
            }).catch(console.error.bind(console));
        }

    }).catch(console.error);

    }
)




/*user.createConversation({ // tom 是一个 IMClient 实例
  // 指定对话的成员除了当前用户 Tom（SDK 会默认把当前用户当做对话成员）之外，还有 Jerry
  members: ['lv'],
  // 对话名称
  name: 'lvjunyi & lv',
  unique: true
}).then(console.log("create"));

var { TextMessage } = require('leancloud-realtime');
let message  = '今天几号？';
conversation.send(new TextMessage(message)).then(function(message) {
  console.log('lv & lvjunyi', '发送成功！');
}).catch(console.error);*/

