reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#dispatchNav').addClass('active'); 
}

$(function() {
  reClass();
  addListeners();
})