// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(function() {
  $(".nav-link").on('click', function(e){
    e.preventDefault();
    $(this).parent().parent().children().removeClass("active");
    $(this).closest('li').addClass('active'); 
    $.get(`${e.target.href}`, function(response){
      $('#contentDisplay').empty();
      $('#contentDisplay').append(response);
      // debugger
      // window.history.push({"html":response.html},"", e.target.url);
    })
    // window.location.replace(e.target.href)
  });
})