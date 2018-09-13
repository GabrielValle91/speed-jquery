reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#invoiceNav').addClass('active'); 
}

$(function() {
  reClass();
  addListeners();
})