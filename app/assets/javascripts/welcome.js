// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(function() {
  $(".navbar-brand").on('click', function(e) {
    e.preventDefault();
    console.log('good')
  })
  $(".navigating").on('click', function(e){
    e.preventDefault();
    console.log('success')
    $(this).parent().parent().children().removeClass("active");
    $(this).closest('li').addClass('active'); 
  });
})