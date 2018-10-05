// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#shipmentNav').addClass('active'); 
}

calcCharges = () => {
  let sid = $("#shipment_id").val();
  let rate = parseFloat($("#tariff-rate").val()).toFixed(2);
  let min = parseFloat($("#tariff-min").val()).toFixed(2);
  let max = parseFloat($("#tariff-max").val()).toFixed(2);
  let qty = parseFloat($("#shipment_item_count").val()).toFixed(2);
  let stopCount = $("#shipment_stop_info").children().length - 1;
  //get charges, determine if 'freight' charge exists
  //if freight charge exists then update with new rates based on piece count
  //same for invoices, costs and charges tables
  $.get(`/shipments/${sid}/shipment_invoices.json`, (charges) => {
    let freightCharges = charges.filter(charge => charge.charge_type === 'freight')
    let invoiceQuantity = 1;
    let invoiceRevenue = 0;
    if (qty * rate < min) {
      invoiceRevenue = min;
    } else if (qty * rate > max) {
      invoiceRevenue = max;
    } else {
      invoiceQuantity = qty;
      invoiceRevenue = parseFloat(qty * rate).toFixed(2);
    }
    let invoiceData = {
      shipment_invoice: {
        shipment_id: sid,
        charge_type: 'freight',
        quantity: invoiceQuantity,
        revenue: invoiceRevenue,
      }
    }
    if (freightCharges.length === 0){
      //no freight charges, need to POST
      $.post(`/shipment_invoices.json`, invoiceData, function(shipmentInvoice){
        let newRow = `<tr><td>${shipmentInvoice.charge_type}</td><td><input type="text" value="${shipmentInvoice.quantity}" class="form-control form-control-sm col-md-6"></td><td><input type="text" value="${shipmentInvoice.revenue}" class="form-control form-control-sm"></td><td></td></tr>`
        $("#shipment-invoice-table").append(newRow);
      })
    } else {
      //already have freight charges, need to PATCH
      $.ajax({
        type: 'PATCH',
        url: `/shipment_invoices/${charges[0].id}.json`,
        data: invoiceData
      }).then(resp => {
        $(`#invoice-${resp.id}`).children().children()[0].value = resp.quantity
        $(`#invoice-${resp.id}`).children().children()[1].value = resp.revenue
      })
    }
  })
  //get charges/costs associated with driver and stop
  $.get(`/shipments/${sid}/shipment_charges.json`, (charges) => {
    let invoiceRevenue = 0;
    if (qty * rate < min) {
        invoiceRevenue = min;
      } else if (qty * rate > max) {
        invoiceRevenue = max;
      } else {
        invoiceRevenue = parseFloat(qty * rate).toFixed(2);
      }
    let freightCharges = charges.filter(charge => charge.charge_type === 'freight')
    let chargeAmount = invoiceRevenue / stopCount;
    let charged = 0;
    let costAmount = (invoiceRevenue / stopCount) * 0.7;
    let paid = 0;
    for (let stopCounter = 2; stopCounter <= stopCount + 1; stopCounter++){
      let found = freightCharges.find(function(charge){
        return charge.stop_number === stopCounter;
      })
      if (found){
        //already have freight charges, need to PATCH
        let chargeId = freightCharges.find(charge => charge.stop_number === stopCounter).id
        let driverId = null;
        if($(`#driver-stop-${stopCounter}`).children(":selected").attr("id")){
          driverId = $(`#driver-stop-${stopCounter}`).children(":selected").attr("id").split('-')[1];
        }
        let chargeDate = $(`#date-start-stop-${stopCounter}`).val();
        let chargeData = {
          shipment_charge: {
            shipment_id: sid,
            driver_id: driverId,
            amount: chargeAmount,
            charge_date: chargeDate,
            cost: costAmount,
            charge_type: 'freight',
            stop_number: stopCounter,
          }
        }
        $.ajax({
          type: 'PATCH',
          url: `/shipment_charges/${chargeId}.json`,
          data: chargeData
        }).then(resp => {
          $(`#charge-${resp.id}`).children().children()[0].value = resp.amount
          $(`#charge-${resp.id}`).children().children()[1].value = resp.cost
          $(`#charge-${resp.id}`).children().children()[2].value = resp.driver.name
        })
      } else{
        //no freight charges, need to POST
        let driverId = null
        if ($(`#driver-stop-${stopCounter}`).children(":selected").attr("id")){
          driverId = $(`#driver-stop-${stopCounter}`).children(":selected").attr("id").split('-')[1];
        }
        let chargeDate = $(`#date-start-stop-${stopCounter}`).val();
        let chargeData = {
          shipment_charge: {
            shipment_id: sid,
            driver_id: driverId,
            amount: chargeAmount,
            cost: costAmount,
            charge_date: chargeDate,
            charge_type: 'freight',
            stop_number: stopCounter,
          }
        }
        $.post(`/shipment_charges.json`, chargeData, (shipmentCharge) => {
          let driverList = $(`#driver-stop-${shipmentCharge.stop_number}`).children();
          let newRow = `<tr id="charge-${shipmentCharge.id}"><td>${shipmentCharge.charge_type}</td><td><input type="text" value="${shipmentCharge.amount}" class="form-control form-control-sm"></td><td><input type="text" value="${shipmentCharge.cost}" class="form-control form-control-sm"></td><td><select class="form-control form-control-sm"><option></option>`
          for (let i = 1; i < driverList.length; i++){
            if (shipmentCharge.driver && (shipmentCharge.driver.id == driverList[i].id.split("-")[1])){
              newRow += `<option id="${driverList[i].id.split("-")[1]}" selected>${driverList[i].innerHTML}</option>`
            } else {
              newRow += `<option id="${driverList[i].id.split("-")[1]}">${driverList[i].innerHTML}</option>`
            }
          }
          newRow += "</select></td><td></td></tr>"
          $("#shipment-charge-table").append(newRow);
        })
      }
      charged += chargeAmount;
      paid += costAmount;
      if (stopCounter === stopCount){
        chargeAmount = invoiceRevenue - charged;
        costAmount = (invoiceRevenue * .7) - paid;
      }
    }
  })
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
    let tariffId = null
    if($("#shipment_tariff").children(":selected").attr("id")){
      tariffId = $("#shipment_tariff").children(":selected").attr("id").split('-')[1]
    }
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
    if($("#shipment_tariff").children(":selected").attr("id")){
      $.get(`/tariffs/${tariffId}.json`, (tariff) => {
        $("#tariff-rate").val(tariff.rate)
        $("#tariff-min").val(tariff.min)
        $("#tariff-max").val(tariff.max)
      })
    } else {
      $("#tariff-rate").val(0)
        $("#tariff-min").val(0)
        $("#tariff-max").val(0)
    }
    

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

    //stop notes change listener
    $(`#notes-stop-${this.stopNum}`).on('change', () => {
      let val = $(`#notes-stop-${this.stopNum}`).val()
      let stopData = {
        shipment_stop: {
          stop_notes: val,
        }
      }
      $.ajax({
        type: 'PATCH',
        url: `/shipment_stops/${this.stopId}.json`,
        data: stopData
      })
    })
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
      let itemCount = parseInt($(`#add-item-quantity-stop-${this.stopNum}`).val());
      let totalItems = parseInt($("#shipment_item_count").val());
      totalItems += itemCount
      $("#shipment_item_count").val(totalItems);
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
        let newRow = `<tr><td>${item.item_type}</td><td>${item.quantity ? item.quantity : 0}</td><td>${item.weight ? item.weight : 0}</td><td>${item.description}</td><td><button type='button' class='btn btn-danger btn-sm' id='remove-item-${item.id}'>Remove Item</button></td></tr>`
        $(`#items-stop-${item.shipment_stop_id}`).append(newRow);
        if ($("#tariff-rate").val()) {calcCharges();}
        $(`#remove-item-${item.id}`).on('click', (ele) => {
          $.ajax({
            type: 'DELETE',
            url: `/shipment_stop_items/${ele.target.id.split("-")[2]}`,
          })
          let itemLost = parseInt(ele.target.parentElement.parentElement.children[1].innerHTML);
          if (itemLost){
            let totalItems = parseInt($("#shipment_item_count").val());
            totalItems -= itemLost;
            $("#shipment_item_count").val(totalItems);
          }
          ele.target.parentNode.parentNode.remove();
          if ($("#tariff-rate").val()) {calcCharges();}
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
      let itemLost = parseInt(ele.target.parentElement.parentElement.children[1].innerHTML);
      if (itemLost){
        let totalItems = parseInt($("#shipment_item_count").val());
        totalItems -= itemLost;
        $("#shipment_item_count").val(totalItems);
      }
      ele.target.parentNode.parentNode.remove()
      if ($("#tariff-rate").val()) {calcCharges();}
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
    window.location.href = '/shipments'
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

$(function() {
  reClass();
  addListeners();
})