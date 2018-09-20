// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#trailerNav').addClass('active'); 
}

rentalSubmit = () => {
  $("#new_trailer_rental").on('submit', function(e){
    e.preventDefault();
    let trailerId = $("#trailer_id").val();
    let officeId = $("#trailer_rental_office_id").val();
    let authToken = $("#new_trailer_rental").children("input[name='authenticity_token']").val();
    let rentalData = {
      'authenticity_token': authToken,
      'trailer_rental': {
        'trailer_id': trailerId,
        'office_id': officeId,
        'start_date': $("#trailer_rental_start_date").val(),
        'end_date': $("#trailer_rental_end_date").val(),
      }
    }
    let url = this.action + ".json";
    $.post(url, rentalData, function(rental){
      let newLi = `<li class="list-group-item" id="Rental-${rental.id}">${rental.office_name} - ${rental.start_date} - ${rental.end_date}</li>`
      $("#rental-list").append(newLi)
    })
  })
}

addListeners = () => {
  rentalSubmit();
}

$(function() {
  reClass();
  addListeners();
})