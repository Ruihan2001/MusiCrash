

function getProductById(id,onSuccess){
    const query = new AV.Query('Product');
    query.include('title');
    query.include('description');
    query.include('detail');
    query.include('price');
    query.get(id).then((product) => {
        onSuccess(product)
    });
}



async function createProduct(detail, title, description, price) {
    if (detail !== '') {
        // document.getElementById('right').innerHTML=detail;

        const Title = AV.Object.extend('Strings');
        const c_title = new Title();
        c_title.set('english', title);
        /*    c_title.save().then((t) => {
          console.log('保存成功c。objectId：'+t.getObjectId());
        }, (error) => {
              console.log("error");
        });*/
        const Price = AV.Object.extend('Price');
        const c_price = new Price();
        c_price.set('dollar', price);
        c_price.set('CNY', price * 6);
        /*    c_price.save().then((p) => {
          console.log('保存成功p。objectId：'+p.getObjectId());
        }, (error) => {
              console.log("error");
        });*/
        const DES = AV.Object.extend('Strings');
        const des = new DES();
        des.set('english', description);
        /*    des.save().then((d) => {
          console.log('保存成功d。objectId：'+d.getObjectId());
        }, (error) => {
              console.log("error");
        });*/
        const HTMLs = AV.Object.extend('HTMLs');
        const html = new HTMLs();
        html.set('englishHTML', detail.toString());
        /*   html.save().then((html) => {
          console.log('保存成功htmll。objectId：'+html.getObjectId());
        }, (error) => {
              console.log("error");
          // 异常处理
        });*/
        const Product = AV.Object.extend('Product');
        const product = new Product();
        product.set('price', c_price);
        product.set('title', c_title);
        product.set('detail', html);
        product.set('description', des);
        return await product.save()
//     product.save().then((pro) => {
//   console.log('保存成功pro。objectId：'+pro.getObjectId());
//   return pro
// }, (error) => {
//       console.log("error");
//   // 异常处理
// });
    } else {
        console.log("enter your page");
    }
}

// createProduct('<p>s</p>','ab','sa',15);





function updateProduct(id,detail,title,description,price){
      //  id = $('#id').val();
    const Product = AV.Object.extend('Product');
    const product = Product.createWithoutData(id);
    product.set('title',title);
    product.set('price',price);
    product.set('detail',detail);
    product.set('description',description);
    product.save();

}

function updateEnglishProduct(product,title,description,detail){
    product.get('title').set('english',title);
    product.get('description').set('english',description);
    product.get('detail').set('englishHTML',detail);
    product.save();
}



function updateChineseProduct(product,title,description,detail){
    product.get('title').set('chinese',title);
    product.get('description').set('chinese',description);
    product.get('detail').set('chineseHTML',detail);
    product.save();
}

function setProductCover(product){
    if (document.getElementById('fileField').files.length !== 0) {
        const file = new AV.File(document.getElementById('fileField').files[0].name, document.getElementById('fileField').files[0]);
        product.set('cover', file)
    }
    // file.save().then((file) => {
    //     // insertImgFn(file.get("url"))
    //     const product=new AV.Object.createWithoutData('Product',product_id)
    //     console.log('emmmm')
    //     product.set('cover',file)
    //     product.save().then(()=>{
    //         console.log('success!!!')
    //     })
    // }, (error) => {
    //     // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
    // });
}

function setProductCategory(product_id,categories){
    getCategoryByProduct(product_id,function (maps) {
        AV.Object.destroyAll(maps).then(
          function (deletedObjects) {
              const l=[]
              categories.forEach(function (c,i,a) {
                    const map=new AV.Object("ProductCategoryMap")
                    const product = AV.Object.createWithoutData('Product', product_id);
                    const category = AV.Object.createWithoutData('ProductCategory', c);
                    map.set("category",category)
                    map.set("product",product)
                  l.push(map)
              })
              AV.Object.saveAll(l).then(
                  function (savedObjects) {
                    // 成功保存所有对象时进入此 resolve 函数，savedObjects 是包含所有 AV.Object 的数组
                      console.log("success!!")
                  },
                  function (error) {
                    // 只要有一个对象保存错误就会进入此 reject 函数
                  }
                );

          },
          function (error) {
            // 只要有一个对象删除错误就会进入此 reject 函数
          }
    );
    })

}


function getCategoryByProduct(product_id,onSuccess){
    const product = AV.Object.createWithoutData('Product', product_id);

    // 构建 StudentCourseMap 的查询
    const query = new AV.Query('ProductCategoryMap');

    // 查询所有选择了线性代数的学生
    query.equalTo('product', product);

    // 执行查询
    query.find().then(function (maps) {
        // studentCourseMaps 是所有 course 等于线性代数的选课对象
        // 然后遍历过程中可以访问每一个选课对象的 student,course,duration,platform 等属性
        // maps.forEach(function (scm, i, a) {
        //     const student = scm.get('student');
        //     const duration = scm.get('duration');
        //     const platform = scm.get('platform');
        // });
        onSuccess(maps)
    });
}


function getProductByVisitCount( onSuccess,skip=0, limit=10) {


    const query = new AV.Query('Product')
    query.descending('visit_count')
    query.include('title')
    query.include('description')
    query.include('price')
    query.limit(limit)
    query.skip(skip)
    query.find().then((products)=>{
        onSuccess(products)
    })
}