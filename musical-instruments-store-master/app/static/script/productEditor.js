
AV.init({
  appId: "pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI",
  appKey: "pShwYQQ4JVfSStc56MvkHNrr",
});

var currentProduct=null;

const E = window.wangEditor;
const editor = new E('#editor');
editor.config.lang = 'en';
// 引入 i18next 插件


editor.i18next = window.i18next;



var title={ch:"",en:""}
var description={ch:"",en:""}
var detail={ch:"",en:""}
var price={ch:0,en:0}


editor.config.customUploadImg = function (resultFiles, insertImgFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
    const file = new AV.File(resultFiles[0].name, resultFiles[0]);
    file.save().then((file) => {
        insertImgFn(file.get("url"))
    }, (error) => {
        // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
    });
    };

editor.config.customUploadVideo = function (resultFiles, insertVideoFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertVideoFn 是获取视频 url 后，插入到编辑器的方法

    // 上传视频，返回结果，将视频地址插入到编辑器中
        const file = new AV.File(resultFiles[0].name, resultFiles[0]);
    console.log("start upload")
        file.save({
  onprogress: (progress) => {
    console.log(progress);
    // {
    //   loaded:  1024,
    //   total:   2048,
    //   percent: 50
    // }
      }
    }).then((file) => {
      // 保存后的操作
                insertVideoFn(file.get("url"))
    }, (error) => {
            console.log("video error")
            // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
    });
}

editor.create();

function loadProduct(product){
    document.getElementById('title').value=product.get('title').get('english')
    document.getElementById('description').value=product.get('description').get('english')
    try{
    document.getElementById('cover').src=product.get('cover').url()
    }catch (e) {
        
    }
    document.getElementById('price').value=product.get('price').get('dollar')
    editor.txt.html(product.get('detail').get('englishHTML'))
    currentProduct=product
    getCategoryByProduct(product.id,function (maps) {
        console.log(maps)
        maps.forEach(function (scm, i, a) {
            const id = scm.get('category').id;
            document.getElementById(id).classList.add('choose')
        });
    })
}


function saveCurrent(lang){
    if (currentProduct!==null) {
        let _lang;
        let _price;
        if (lang === "chinese") {
            _lang = "english"
            _price = "dollar"
        } else {
            _lang = "chinese"
            _price = "CNY"
        }
        currentProduct.get('title').set(_lang, document.getElementById('title').value)
        currentProduct.get('description').set(_lang, document.getElementById('description').value)
        currentProduct.get('detail').set(_lang + 'HTML', editor.txt.html())
        currentProduct.get('price').set(_price, Number(document.getElementById('price').value))
        setProductCover(currentProduct)
    }
}

function changeLanguage(lang){
    if (currentProduct!==null){
                let _lang;
        let _price;
        if (lang === "chinese") {
            _price = "CNY"

        } else {
                        _price = "dollar"
            _lang = "chinese"

        }
        saveCurrent(lang)

        document.getElementById('title').value=currentProduct.get('title').get(lang)
        document.getElementById('description').value=currentProduct.get('description').get(lang)
        document.getElementById('price').value=currentProduct.get('price').get(_price)
        if (!currentProduct.get('detail').get(lang+'HTML')){
            currentProduct.get('detail').set(lang+'HTML',"")
        }
        editor.txt.html(currentProduct.get('detail').get(lang+'HTML'))
    }
}


async function submit() {
    //2022年3月24号14:20金深远开始玩原神

    var transLangBtn = document.getElementById("transLangBtn");
                console.log(transLangBtn.innerHTML)
                if(transLangBtn.innerHTML==="chinese")    {
                    saveCurrent("english")
                }
                else{
                    saveCurrent("chinese")
                }

    if (currentProduct) {
        // updateEnglishProduct(currentProduct, $('#title').val(), $('#description').val(), editor.txt.html());
        await currentProduct.save()
        const buttons = $('.cLabel.choose');
        // console.log($('.cLabel.choose').size())
        // for(i in buttons){
        //     console.log(i)
        // }
        // console.log(buttons)
        const l = [];
        buttons.each(function (a, b) {
            // console.log(b)
            l.push(b.id);

        });
        await setProductCategory(currentProduct.id, l);
        // if (document.getElementById('fileField').files.length !== 0) {
        //     setProductCover(currentProduct, document.getElementById('fileField').files)
        // }

        alert('Successfully submit the change!');
    } else {
        const Product=AV.Object.extend('Product');
        currentProduct=new Product()
        currentProduct=await currentProduct.save()
        console.log(currentProduct)

        if (currentProduct) {
        // updateEnglishProduct(currentProduct, $('#title').val(), $('#description').val(), editor.txt.html());
        const buttons = $('.cLabel.choose');
        // console.log($('.cLabel.choose').size())
        // for(i in buttons){
        //     console.log(i)
        // }
        // console.log(buttons)
        const l = [];
        buttons.each(function (a, b) {
            // console.log(b)
            l.push(b.id);

        });
        setProductCategory(currentProduct.id, l);
        // if (document.getElementById('fileField').files.length !== 0) {
        //     setProductCover(currentProduct, document.getElementById('fileField').files)
        // }
        alert('Successfully submit the change!');
        window.location.href+="/"+currentProduct.id
    }
    }
}