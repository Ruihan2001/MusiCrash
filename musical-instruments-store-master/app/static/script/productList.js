AV.init({
  appId: "pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI",
  appKey: "pShwYQQ4JVfSStc56MvkHNrr",
});

function deleteProduct(id) {
    const Product = AV.Object.extend('Product')
    const product = Product.createWithoutData('Product', id);
    product.destroy();
    console.log(112);
}