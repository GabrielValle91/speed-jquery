// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#clientNav').addClass('active'); 
}

tariffSubmit = () => {
  $("#new_tariff").on('submit', function(e){
    e.preventDefault();
    let clientId = $("#client_id").val();
    let authToken = $("#new_tariff").children("input[name='authenticity_token']").val();
    let tariffData = {
      'authenticity_token': authToken,
      'tariff': {
        'client_id': clientId,
        'name': $("#tariff_name").val(),
        'rate': $("#tariff_rate").val(),
        'min': $("#tariff_min").val(),
        'max': $("#tariff_max").val()
      }
    }
    let url = this.action + ".json";
    $.post(url, tariffData, function(tariff){
      let newLi = `<li class="list-group-item" id="Tariff-${tariff.id}">${tariff.name} - ${tariff.rate} - ${tariff.min} - ${tariff.max}</li>`
      $("#tariff-list").append(newLi)
    })
  })
}

addListeners = () => {
  tariffSubmit();
}

$(function() {
  reClass();
  addListeners();
})