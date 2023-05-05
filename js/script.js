var pname = document.getElementById('productName');
var pcategory = document.getElementById('productCategory');
var pPrice = document.getElementById('productPrice');
var pDesc = document.getElementById('productDesc');
var searchPro = document.getElementById('SearchInput');
var addBtn =document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn') ;

indexUpdate = 0 ;

if (localStorage.getItem('All product')== null){
 
  var productContainer = [];
   
}else {

   productContainer = JSON.parse( localStorage.getItem('All product'));
   displayProducts() ;

}

function AddProduct() {

  var product = {
    proName: pname.value,
    proCategory: pcategory.value,
    proPrice: pPrice.value,
    proDesc: pDesc.value,
  }

  productContainer.push(product);
  localStorage.setItem('All product' , JSON.stringify(productContainer))
  displayProducts();
  clearForm();

}

function displayProducts() {

  var cartoona = "";

  for (i = 0; i < productContainer.length; i++) {

    cartoona += '<tr>' +
      '<td>' + (i + 1) + '</td>' +
      '<td>' + productContainer[i].proName + '</td>' +
      '<td>' + productContainer[i].proCategory + '</td>' +
      '<td>' + productContainer[i].proPrice + '</td>' +
      '<td>' + productContainer[i].proDesc + '</td>' +
      '<td><button onclick="SetFormForUpdate ('+i+')" class="btn btn-warning">Edit</button></td>' +
      '<td><button onclick="Delete('+i+')" class="btn btn-danger">Delete</button></td>' +
      '</tr>';
  }

  document.getElementById('tableBody').innerHTML = cartoona;
}

function clearForm() {
  pname.value = "";
  pcategory.value = "";
  pPrice.value = "";
  pDesc.value = "";

}

function Delete (i) {
   productContainer.splice(i, 1);
   console.log(productContainer) ;
   localStorage.setItem('All product', JSON.stringify(productContainer)); 
   displayProducts () ;
}


function searchProduct() {

  console.log(searchPro.value) ;
  var cartoona=`` ;
  for (i = 0; i < productContainer.length; i++) {

    if (productContainer[i].proName.includes(searchPro.value)){
        cartoona += '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + productContainer[i].proName + '</td>' +
        '<td>' + productContainer[i].proCategory + '</td>' +
        '<td>' + productContainer[i].proPrice + '</td>' +
        '<td>' + productContainer[i].proDesc + '</td>' +
        '<td><button onclick="SetFormForUpdate ()" class="btn btn-warning">Edit</button></td>' +
        '<td><button onclick="Delete('+i+')" class="btn btn-danger">Delete</button></td>' +
        '</tr>';
    }

  }
  document.getElementById('tableBody').innerHTML = cartoona;

}

function SetFormForUpdate (i) {

     indexUpdate = i ;   

     addBtn.classList.replace('d-block' , 'd-none') ;
     updateBtn.classList.replace('d-none' , 'd-block');

     pname.value  =productContainer[i].proName ;
  pcategory.value =productContainer[i].proCategory;
     pPrice.value =productContainer[i].proPrice ;    
     pDesc.value  =productContainer[i].proDesc ;

}  


updateBtn.onclick=function () {

  updateData () ;

}

function updateData () {

    var product = {
    proName: pname.value,
    proCategory: pcategory.value,
    proPrice: pPrice.value,
    proDesc: pDesc.value,
   }

   productContainer.splice(indexUpdate , 1 , product ) ;
   displayProducts() ;

     updateBtn.classList.replace(  'd-block' , 'd-none');
     addBtn.classList.replace(  'd-none' , 'd-block')  ;
}

function pNameValidation () {
  var nameRegix = /^[A-Z][a-zA-Z0-9'\s]+$/ ;
  var prodName =pname.value ;
  if(nameRegix.test(prodName)==true) {
    return true ;
  }else{
    return false ;
  }
}

addBtn.onclick = function () {
  if (pNameValidation() == true){
    AddProduct () ;
  }else {
    alert ('Enter a valid data : start with a capital letter') ;
  }
}

