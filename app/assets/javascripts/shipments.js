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
    $(`#date-start-time-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-start-time-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_start_time: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
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
    $(`#date-end-time-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-end-time-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_end_time: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //location id change listener - shipment_stop controller
    $(`#location-stop-${this.stopNum}`).on('change', () => {
      let locationId = null
      if ($(`#location-stop-${this.stopNum}`).children(":selected").attr("id")){
        locationId = $(`#location-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      }
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
        $(`#address1-stop-${this.stopNum}`).val(locationDetails.address1)
        $(`#address2-stop-${this.stopNum}`).val(locationDetails.address2)
        $(`#city-stop-${this.stopNum}`).val(locationDetails.city)
        $(`#state-stop-${this.stopNum}`).val(locationDetails.state)
        $(`#zip-stop-${this.stopNum}`).val(locationDetails.zip)
      })
    })
    //location address1 change listener - location controller

    //location address2 change listener - location controller

    //location city change listener - location controller

    //location state change listener - location controller

    //location zip change listener - location controller

    //contact id change listener - shipment_stop controller
    $(`#contact-stop-${this.stopNum}`).on('change', () => {
      let contactId = null;
      if($(`#contact-stop-${this.stopNum}`).children(":selected").attr("id")){
        let contactId = $(`#contact-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      }
      let stopData = {
        shipment_stop: {
          contact_id: contactId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })

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
    $(`#date-arrival-time-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-arrival-time-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_arrival_time: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
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
    // departure time change listener - shipment_stop controller
    $(`#date-departure-time-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#date-departure-time-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_departure_time: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //driver change listener - shipment_stop controller
    $(`#driver-stop-${this.stopNum}`).on('change', () => {
      let driverId = null;
      if($(`#driver-stop-${this.stopNum}`).children(":selected").attr("id")){
        let driverId = $(`#driver-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      }
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
      let vehicleId = null
      if($(`#vehicle-stop-${this.stopNum}`).children(":selected").attr("id")) {
        vehicleId = $(`#vehicle-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      }
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
      let trailerId = null
      if($(`#trailer-stop-${this.stopNum}`).children(":selected").attr("id")){
        trailerId = $(`#trailer-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      }
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
    //add item button
    $(`#add-item-stop-${this.stopNum}`).on('click', () => {
      let itemData = {
        shipment_stop_item: {
          shipment_stop_id: this.stopId,
          item_type: $(`#add-item-type-stop-${this.stopNum}`).val(),
          quantity: $(`#add-item-quantity-stop-${this.stopNum}`).val(),
          weight: $(`#add-item-weight-stop-${this.stopNum}`).val(),
          description: $(`#add-item-description-stop-${this.stopNum}`).val(),
        }
      }
      $.post("/shipment_stop_items", itemData, function(item) {
        let newRow = `<tr><td>${item.item_type}</td><td>${item.quantity}</td><td>${item.weight}</td><td>${item.description}</td><td><button type='button' class='btn btn-danger btn-sm' id='remove-item-${item.id}'>Remove Item</button></td></tr>`
        $(`#items-stop-${item.shipment_stop_id}`).append(newRow);
        $(`#remove-item-${item.id}`).on('click', (ele) => {
          $.ajax({
            type: 'DELETE',
            url: `/shipment_stop_items/${ele.target.id.split("-")[2]}`,
          })
          ele.target.parentNode.parentNode.remove()
        })
      })
    })
    //remove item buttom
    $("td > button").unbind().click((ele) => {
      ele.preventDefault();
      let id = ele.target.id.split("-")[2]
      $.ajax({
        type: 'DELETE',
        url: `/shipment_stop_items/${id}`,
      })
      ele.target.parentNode.parentNode.remove()
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
    // let stopNum = $("#shipment_stop_info").children().last().children().first().first().children().first()[0].firstElementChild.firstElementChild.lastElementChild.innerHTML;
    // let stopId = $("#shipment_stop_info").children().last().children().first().first().children().first()[0].firstElementChild.lastElementChild.value;
    // let shipStop = new ShipmentStop(stopNum, stopId);
    // shipStop.assignListeners();
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