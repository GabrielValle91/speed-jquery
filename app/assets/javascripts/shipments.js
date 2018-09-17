// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var stopCount = 0;
reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#shipmentNav').addClass('active'); 
}

class ShipmentStop{
  constructor(stopNum, stopId){
    this.stopNum = stopNum;
    this.stopId = stopId;
  }

  assignListeners(){
    //office change listener
    $(`#office-stop-${this.stopNum}`).on('change', () => {
      let officeId = $(`#office-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      let stopData = {
        shipment_stop: {
          office_id: officeId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //start date change listener - shipment_stop controller
    $(`#date-start-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-start-stop-${this.stopNum}`).val();
      let stopData = {
        shipment_stop: {
          stop_start: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //start time change listener - shipment_stop controller

    //end date change listener - shipment_stop controller
    $(`#date-end-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-end-stop-${this.stopNum}`).val();
      let stopData = {
        shipment_stop: {
          stop_end: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //end time change listener - shipment_stop controller

    //location id change listener - shipment_stop controller
    $(`#location-stop-${this.stopNum}`).on('change', () => {
      let locationId = $(`#location-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      let stopData = {
        shipment_stop: {
          location_id: locationId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
      $.get(`/locations/${locationId}.json`, (locationDetails) => {
        $(`#address1-stop-${this.stopId}`).val(locationDetails.address1)
        $(`#address2-stop-${this.stopId}`).val(locationDetails.address2)
        $(`#city-stop-${this.stopId}`).val(locationDetails.city)
        $(`#state-stop-${this.stopId}`).val(locationDetails.state)
        $(`#zip-stop-${this.stopId}`).val(locationDetails.zip)
      })
    })
    //location address1 change listener - location controller

    //location address2 change listener - location controller

    //location city change listener - location controller

    //location state change listener - location controller

    //location zip change listener - location controller

    //contact id change listener - shipment_stop controller

    //contact phone change listener - contact controller

    //contact email change listener - contact controller

    //stop status change listener - shipment_stop controller
    $(`#status-stop-${this.stopNum}`).on('change', () => {
      let status = $(`#status-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_status: status,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //arrial date change listener - shipment_stop controller
    $(`#date-arrival-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-arrival-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_arrival: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })

    //arrival time change listener - shipment_stop controller

    //departure date change listener - shipment_stop controller
    $(`#date-departure-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-departure-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_departure: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })

    //departure time change listener - shipment_stop controller

    //driver change listener - shipment_stop controller
    $(`#driver-stop-${this.stopNum}`).on('change', () => {
      let driverId = $(`#driver-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      let stopData = {
        shipment_stop: {
          driver_id: driverId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })

    //vehicle change listener - shipment_stop controller
    $(`#vehicle-stop-${this.stopNum}`).on('change', () => {
      let vehicleId = $(`#vehicle-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      let stopData = {
        shipment_stop: {
          vehicle_id: vehicleId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //trailer change listener - shipment_stop controller
    $(`#trailer-stop-${this.stopNum}`).on('change', () => {
      let trailerId = $(`#trailer-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      let stopData = {
        shipment_stop: {
          trailer_id: trailerId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
  }
}

stopListeners = () => {
  var counter = 0;
  var stops = $("#shipment_stop_info").children()
  jQuery.each(stops,function(){
    let stopNum = $(this).children().first().first().children().first()[0].firstElementChild.firstElementChild.lastElementChild.innerHTML;
    let stopId = $(this).children().first().first().children().first()[0].firstElementChild.lastElementChild.value;
    let shipStop = new ShipmentStop(stopNum, stopId);
    shipStop.assignListeners();
  })
  
}

newStopButton = () => {
  $("#new_stop").on('click', function(e){
    e.preventDefault();
    // setTimeout(function(){}, 0)
    let stopNum = $("#shipment_stop_info").children().last().children().first().first().children().first()[0].firstElementChild.firstElementChild.lastElementChild.innerHTML;
    let stopId = $("#shipment_stop_info").children().last().children().first().first().children().first()[0].firstElementChild.lastElementChild.value;
    let shipStop = new ShipmentStop(stopNum, stopId);
    shipStop.assignListeners();
  })
}

submitForm = () => {
  $("#commit_changes").on('click', function(e){
    e.preventDefault();
    alert("success")
  })
}

stopSubmit = () => {
  $(".edit_shipment").on('submit', function(e){
    e.preventDefault();
  })
}

addListeners = () => {
  stopSubmit();
  submitForm();
  newStopButton();
  stopListeners();
}

stopCount = () => {
  stopCount = $("#shipment_stop_info > div").length
  
}

$(function() {
  reClass();
  addListeners();
  stopCount();
})