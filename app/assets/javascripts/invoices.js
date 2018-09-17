reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#invoiceNav').addClass('active'); 
}

addListeners = () => {
  
}

$(function() {
  reClass();
  addListeners();
})