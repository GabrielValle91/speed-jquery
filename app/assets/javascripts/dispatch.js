reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#dispatchNav').addClass('active'); 
}

addListeners = () => {
  
}

$(function() {
  reClass();
  addListeners();
})