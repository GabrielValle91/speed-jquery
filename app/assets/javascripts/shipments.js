// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var stopCount = 0;
reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#shipmentNav').addClass('active'); 
}

shipmentInfoListeners = () => {
  //update shipment client on change
  $("#shipment_client_id").on('change', () => {
    let clientId = $("#shipment_client_id").val()
    let sId = $("#shipment_id").val()
    let authToken = $(".edit_shipment").children("input[name='authenticity_token']").val();
    clientId === "" ? clientId=null : clientId=clientId
    let shipmentData = {
      authenticity_token: authToken,
      shipment: {
        client_id: clientId,
        tariff_id: null,
      }
    }
    $.ajax({
      type: 'PATCH',
      url: `/shipments/${sId}.json`,
      data: shipmentData
    })
    //retrieve list of tariffs and append to tariff dropdown
    if (clientId) {
      $.get(`/clients/${clientId}.json`, (client) => {
        let newOptions = "<option></option>"
        client.tariffs.forEach(function(tariff){
          newOptions += `<option id='tariff-${tariff.id}'>${tariff.name}</option>`
        })
        $("#shipment_tariff").empty()
        $("#shipment_tariff").append(newOptions)
      })
    }
  })
  //update shipment reference on change
  $("#shipment_reference").on('change', () => {
    let val = $("#shipment_reference").val()
    let sId = $("#shipment_id").val()
    let authToken = $(".edit_shipment").children("input[name='authenticity_token']").val();
    let shipmentData = {
      authenticity_token: authToken,
      shipment: {
        reference: val,
      }
    }
    $.ajax({
      type: 'PATCH',
      url: `/shipments/${sId}.json`,
      data: shipmentData
    })
  })
  //update shipment tariff on change
  $("#shipment_tariff").on('change', () => {
    let tariffId = $("#shipment_tariff").children(":selected").attr("id").split('-')[1]
    let sId = $("#shipment_id").val()
    let authToken = $(".edit_shipment").children("input[name='authenticity_token']").val();
    let shipmentData = {
      authenticity_token: authToken,
      shipment: {
        tariff_id: tariffId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipments/${sId}.json`,
        data: shipmentData
      })
      //retrieve tariff rate, min, max and update rate, min, max fields
      $.get(`/tariffs/${tariffId}.json`, (tariff) => {
        $("#tariff-rate").val(tariff.rate)
        $("#tariff-min").val(tariff.min)
        $("#tariff-max").val(tariff.max)
      })
  })
  //update shipment status on change
  $("#shipment_shipment_status").on('change', () => {
    let val = $("#shipment_shipment_status").val()
    let sId = $("#shipment_id").val()
    let authToken = $(".edit_shipment").children("input[name='authenticity_token']").val();
    let shipmentData = {
      authenticity_token: authToken,
      shipment: {
        shipment_status: val,
      }
    }
    $.ajax({
      type: 'PATCH',
      url: `/shipments/${sId}.json`,
      data: shipmentData
    })
  })
  //update shipment invoice date on change
  $("#shipment_invoice_date").on('change', () => {
    let val = $("#shipment_invoice_date").val()
    let sId = $("#shipment_id").val()
    let authToken = $(".edit_shipment").children("input[name='authenticity_token']").val();
    let shipmentData = {
      authenticity_token: authToken,
      shipment: {
        invoice_date: val,
      }
    }
    $.ajax({
      type: 'PATCH',
      url: `/shipments/${sId}.json`,
      data: shipmentData
    })
  })
  //update shipment office on change
  $("#shipment_office_id").on('change', () => {
    let officeId = $("#shipment_office_id").children(":selected").val()
    let sId = $("#shipment_id").val()
    let authToken = $(".edit_shipment").children("input[name='authenticity_token']").val();
    let shipmentData = {
      authenticity_token: authToken,
      shipment: {
        office_id: officeId,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipments/${sId}.json`,
        data: shipmentData
      })
  })
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
    //start date change listener
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
    //start time change listener
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
    //end date change listener
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
    //end time change listener
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
    //location id change listener
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
    //location address1 change listener

    //location address2 change listener

    //location city change listener

    //location state change listener

    //location zip change listener

    //contact id change listener
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

    //contact phone change listener

    //contact email change listener

    //stop status change listener
    $(`#status-stop-${this.stopNum}`).on('change', () => {
      let status = $(`#status-stop-${this.stopNum}`).val();
      let stop_arrival_time = null;
      let stop_departure_time = null;
      if (status === "Completed"){
        //if stop is completed then prompt user for times
        stop_arrival_time = prompt("Enter driver arrival time (hhhh format)", '');
        stop_departure_time = prompt("Enter driver departure time (hhhh format)", '');
        // convert times to correct format
        if (stop_arrival_time.length == 3){
          stop_arrival_time = 0 + stop_arrival_time
        }
        if (stop_departure_time.length == 3){
          stop_departure_time = 0 + stop_departure_time
        }
        if (stop_arrival_time.length == 4){
          stop_arrival_time = stop_arrival_time.substring(0,2) + ":" + stop_arrival_time.substring(2)
        }
        if (stop_departure_time.length == 4){
          stop_departure_time = stop_departure_time.substring(0,2) + ":" + stop_departure_time.substring(2)
        }
        //if no times provided then revert status to dispatched
        if (!stop_arrival_time || !stop_departure_time){
          status = "Dispatched"
          $(`#status-stop-${this.stopNum}`).val(status);
        }
      }
      //update page with stop arrival and departure times
      $(`#date-arrival-time-stop-${this.stopNum}`).val(stop_arrival_time)
      $(`#date-departure-time-stop-${this.stopNum}`).val(stop_departure_time)
      let stopData = {
        shipment_stop: {
          stop_status: status,
          stop_arrival_time: stop_arrival_time,
          stop_departure_time: stop_departure_time,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //arrial date change listener
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
    //arrival time change listener
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
    //departure date change listener
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
    // departure time change listener
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
    //driver change listener
    $(`#driver-stop-${this.stopNum}`).on('change', () => {
      let driverId = null;
      let stopStatus = $(`#status-stop-${this.stopNum}`).val();
      if($(`#driver-stop-${this.stopNum}`).children(":selected").attr("id")){
        driverId = $(`#driver-stop-${this.stopNum}`).children(":selected").attr("id").split('-')[1]
      }
      if (driverId && stopStatus === "Open"){
        stopStatus = "Dispatched"
        $(`#status-stop-${this.stopNum}`).val(stopStatus);
      }
      if (!driverId){
        stopStatus = "Open"
        $(`#status-stop-${this.stopNum}`).val(stopStatus);
      }
      let stopData = {
        shipment_stop: {
          driver_id: driverId,
          stop_status: stopStatus,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
    //vehicle change listener
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
    //trailer change listener
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
  shipmentInfoListeners();
}

stopCount = () => {
  stopCount = $("#shipment_stop_info > div").length
  
}

$(function() {
  reClass();
  addListeners();
  stopCount();
})