AV.init({
  appId: "pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI",
  appKey: "pShwYQQ4JVfSStc56MvkHNrr",

});

const query = new AV.Query('Cov19');
            query.equalTo('kind','cov19');
            query.find().then((status) => {
                if(status[0].get('status')==true){
                    console.log(1);
                    //document.getElementById('offline').disabled = true;
                 document.getElementById('selectEx').options[1]=null;
                 var txt =document.createTextNode("Sorry, the current Cov-19 situation prevents Offline Experience");
                 document.getElementById('selectEx1').appendChild(txt);
                   // document.getElementsByClassName('selectpicker').options.remove(1)
                }else{
                    console.log(2);
                    //document.getElementById('offline').disabled =false;
                }
            });