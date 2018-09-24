reClass = () => {
  $('.navbar-nav li').removeClass("active");
  $('#dispatchNav').addClass('active'); 
}

function getFormattedTime(time){
  return time.substring(11,16);
}

function getFormattedDate(date) {
  var d = new Date(date);
  var year = d.getFullYear();
  var month = (1 + d.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = d.getDate() + 1;
  day = day.toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}

function getDashedDate(date){
  var d = new Date(date);
  var year = d.getFullYear();
  var month = (1 + d.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = d.getDate() + 1;
  day = day.toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '-' + day + '-' + year;
}

function highlightUnassignedShipments(id){
  $('#unassigned-shipment-list tr').removeClass("selected-shipment");
  $("#USId-" + id).toggleClass('selected-shipment');
}

function populateUnassignedDetails(id){
  $("#unassigned-shipment-details").empty();
  $.get("/shipments/" + id + ".json", function (shipmentData){
    let newEle = `<h5 class='col-md-12'>Shipment ${shipmentData.id} Details <a href='/shipments/${shipmentData.id}/edit' target='_blank'>Edit</a></h5>`
    newEle += `<div class="row col-md-12"><div class="col-md-6">Reference: ${shipmentData.reference ? shipmentData.reference : ''}</div><div class="col-md-6">Status: ${shipmentData.shipment_status}</div></div>`
    newEle += `<div class="row col-md-12"><div class="col-md-6">Client: ${shipmentData.client ? shipmentData.client.name : ''}</div><div class="col-md-6">Invoice Date: ${getFormattedDate(shipmentData.invoice_date)}</div></div>`
    shipmentData.shipment_stops.forEach(function(shipment_stop){
      newEle += '<div class="col-md-12 border border-dark">'
      newEle += `<div class="row col-md-12"><div class="col-md-3">Stop: ${shipment_stop.stop_number}</div><div class="col-md-6">Action Office: ${shipment_stop.office.name}</div></div>`
      newEle += `<div class="row col-md-12"><div class="col-md-5">Date: ${getFormattedDate(shipment_stop.stop_start)}</div><div class="col-md-7">Times: ${shipment_stop.stop_start_time ? getFormattedTime(shipment_stop.stop_start_time) : ''} - ${shipment_stop.stop_end_time ? getFormattedTime(shipment_stop.stop_end_time) : ''}</div></div>`
      newEle += "<br>"
      newEle += `<div class="row col-md-12"><div class='col-md-12'>Location: ${shipment_stop.location ? shipment_stop.location.company_name : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-12'>${shipment_stop.location ? shipment_stop.location.address1 : ''} ${shipment_stop.location ? shipment_stop.location.address2 : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-12'>${shipment_stop.location ? shipment_stop.location.city : ''} ${shipment_stop.location ? shipment_stop.location.state : ''} ${shipment_stop.location ? shipment_stop.location.zip : ''}</div></div>`
      newEle += "<br>"
      newEle += `<div class="row col-md-12"><div class='col-md-12'>Driver: ${shipment_stop.driver ? shipment_stop.driver.name : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-6'>Vehicle: ${shipment_stop.vehicle ? shipment_stop.vehicle.vehicle_number : ''}</div><div class='col-md-6'>Trailer: ${shipment_stop.trailer ? shipment_stop.trailer.trailer_number : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-6'>Status: ${shipment_stop.stop_status}</div><div class='col-md-6'>Times: ${shipment_stop.stop_arrival_time ? getFormattedTime(shipment_stop.stop_arrival_time) : ''} - ${shipment_stop.stop_departure_time ? getFormattedTime(shipment_stop.stop_departure_time) : ''}</div></div>`
      newEle += '</div>'
    })
    $("#unassigned-shipment-details").append(newEle);
  });
}

function unassignedShipmentListener(id){
  highlightUnassignedShipments(id);
  populateUnassignedDetails(id);
}

class UnassignedShipment{
  constructor(id, client_name, reference, stop_start){
    this.id = id;
    this.clientName = client_name;
    this.reference = reference;
    this.stopStart = stop_start;
  }

   displayDetails() {
    let newRow = `<tr id="USId-${this.id}"><td>${this.id}</td><td>${this.clientName}</td><td>${this.reference ? this.reference : ''}</td><td>${getFormattedDate(this.stopStart)}</td></tr>`
    $("#unassigned-shipment-list").append(newRow);
    $("#USId-" + this.id).on('click', () => unassignedShipmentListener(this.id));
  }
}

function populateUnassignedList(){
  $("#unassigned-shipment-list").empty();
  $.get("/dispatch/unassignedshipments", function (shipmentData){
    shipmentData.forEach(function(shipment){
      // debugger
      let stopStart = null
      let stopCounter = 0
      while (stopStart === null && stopCounter <= shipment.shipment_stops.length){
        // debugger
        if (shipment.shipment_stops[stopCounter] && !shipment.shipment_stops[stopCounter].driver) {
          stopStart = shipment.shipment_stops[stopCounter].stop_start
        }
        stopCounter++;
      }
      let newShipment = new UnassignedShipment(shipment.id, shipment.client.name, shipment.reference, stopStart);
      newShipment.displayDetails();
    });
  });
}

function highlightAssignedShipments(id){
  $('#assigned-shipment-list tr').removeClass("selected-shipment");
  $("#ASId-" + id).toggleClass('selected-shipment');
}

function populateAssignedDetails(id){
  $("#assigned-shipment-details").empty();
  $.get("/shipments/" + id + ".json", function (shipmentData){
    let newEle = `<h5 class='col-md-12'>Shipment ${shipmentData.id} Details <a href='/shipments/${shipmentData.id}/edit' target='_blank'>Edit</a></h5>`
    newEle += `<div class="row col-md-12"><div class="col-md-6">Reference: ${shipmentData.reference ? shipmentData.reference : ''}</div><div class="col-md-6">Status: ${shipmentData.shipment_status}</div></div>`
    newEle += `<div class="row col-md-12"><div class="col-md-6">Client: ${shipmentData.client ? shipmentData.client.name : ''}</div><div class="col-md-6">Invoice Date: ${getFormattedDate(shipmentData.invoice_date)}</div></div>`
    shipmentData.shipment_stops.forEach(function(shipment_stop){
      newEle += '<div class="col-md-12 border border-dark">'
      newEle += `<div class="row col-md-12"><div class="col-md-3">Stop: ${shipment_stop.stop_number}</div><div class="col-md-6">Action Office: ${shipment_stop.office.name}</div></div>`
      newEle += `<div class="row col-md-12"><div class="col-md-5">Date: ${getFormattedDate(shipment_stop.stop_start)}</div><div class="col-md-7">Times: ${shipment_stop.stop_start_time ? getFormattedTime(shipment_stop.stop_start_time) : ''} - ${shipment_stop.stop_end_time ? getFormattedTime(shipment_stop.stop_end_time) : ''}</div></div>`
      newEle += "<br>"
      newEle += `<div class="row col-md-12"><div class='col-md-12'>Location: ${shipment_stop.location ? shipment_stop.location.company_name : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-12'>${shipment_stop.location ? shipment_stop.location.address1 : ''} ${shipment_stop.location ? shipment_stop.location.address2 : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-12'>${shipment_stop.location ? shipment_stop.location.city : ''} ${shipment_stop.location ? shipment_stop.location.state : ''} ${shipment_stop.location ? shipment_stop.location.zip : ''}</div></div>`
      newEle += "<br>"
      newEle += `<div class="row col-md-12"><div class='col-md-12'>Driver: ${shipment_stop.driver ? shipment_stop.driver.name : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-6'>Vehicle: ${shipment_stop.vehicle ? shipment_stop.vehicle.vehicle_number : ''}</div><div class='col-md-6'>Trailer: ${shipment_stop.trailer ? shipment_stop.trailer.trailer_number : ''}</div></div>`
      newEle += `<div class="row col-md-12"><div class='col-md-6'>Status: ${shipment_stop.stop_status}</div><div class='col-md-6'>Times: ${shipment_stop.stop_arrival_time ? getFormattedTime(shipment_stop.stop_arrival_time) : ''} - ${shipment_stop.stop_departure_time ? getFormattedTime(shipment_stop.stop_departure_time) : ''}</div></div>`
      newEle += '</div>'
    })
    $("#assigned-shipment-details").append(newEle);
  });
}

function assignedShipmentListener(id){
  highlightAssignedShipments(id);
  populateAssignedDetails(id);
}

class AssignedShipment{
  constructor(id, reference, client_name, status){
    this.id = id;
    this.reference = reference;
    this.clientName = client_name;
    this.status = status;
  }

   displayDetails() {
    let newRow = `<tr id="ASId-${this.id}"><td>${this.id}</td><td>${this.clientName}</td><td>${this.reference ? this.reference : ''}</td><td>${this.status}</td></tr>`
    $("#assigned-shipment-list").append(newRow);
    $("#ASId-" + this.id).on('click', () => assignedShipmentListener(this.id));
  }
}

function populateAssignedList(driver){
  $("#assigned-shipment-list").empty();
  let dateFilter = getDashedDate($("#date-filter-value").val());
  $.get("/dispatch/assignedshipments/" + dateFilter, function (shipmentData){
    if (!driver && shipmentData && shipmentData.length) {
      shipmentData.forEach(function(shipment){
        let newShipment = new AssignedShipment(shipment.id, shipment.reference, shipment.client.name, shipment.shipment_status);
        newShipment.displayDetails();
      });
    } else if(shipmentData && shipmentData.length) {
      shipmentData.forEach(function(shipment){
        if (shipment.drivers.some(detail => detail.id == driver)){
          let newShipment = new AssignedShipment(shipment.id, shipment.reference, shipment.client.name, shipment.shipment_status);
          newShipment.displayDetails();
        }
      });
    }
  });
}

function refreshShipmentLists(){
  populateUnassignedList();
  populateAssignedList(0);
  $('#drivers tbody tr td').removeClass("selected-driver");
  $("#assigned-shipment-details").empty();
  $("#unassigned-shipment-details").empty();
}

function dateFilterListener(){
  $("#date-filter").on('click', () => {
    refreshShipmentLists()});
}

function driverRowListeners(){
  $('#drivers tbody tr td').on('click', function(){
    $('#drivers tbody tr td').removeClass("selected-driver");
    $(this).toggleClass('selected-driver');
    $("#assigned-shipment-details").empty();
    let driverId = $(this).attr("id");
    populateAssignedList(driverId);
  });
}

addListeners = () => {
  dateFilterListener();
  driverRowListeners();
}

$(function() {
  reClass();
  refreshShipmentLists();
  addListeners();
})