// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#driverNav').addClass('active'); 
}

$(function() {
  reClass();
  addListeners();
})