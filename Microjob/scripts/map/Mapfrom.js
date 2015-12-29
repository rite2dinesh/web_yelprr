var map;
var maps;
var markersArray = [];
var count = 0;
 
google.maps.event.addDomListener(window, 'load', pageLoad);
function pageLoad() {
    //alert("Hello");
    var input = (document.getElementById('FromLocation'));
    var searchBox = new google.maps.places.SearchBox((input));

    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        if (map != null) {
            for (var i = 0, marker; marker = markersArray[i]; i++) {
                marker.setMap(null);
            }
        }
        // For each place, get the icon, place name, and location.
        markersArray = [];
        var bounds = new google.maps.LatLngBounds();
        $('#txtResults').empty();
        // console.log(places);
        for (var i = 0, place; place = places[i]; i++) {
            //            var image = {
            //                url: place.icon,
            //                size: new google.maps.Size(71, 71),
            //                origin: new google.maps.Point(0, 0),
            //                anchor: new google.maps.Point(17, 34),
            //                scaledSize: new google.maps.Size(25, 25)
            //            };

            if (i == 0) {
                var myOptions = {
                    center: place.geometry.location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    maxZoom: 13,
                    minZoom: 2
                }
                //map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            }
            if (i == 0) {
                PopulatedAddress(place.geometry.location.lat(), place.geometry.location.lng());
                //alert(place.geometry.location.lat());
            }
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                title: place.name + " " + place.formatted_address,
                position: place.geometry.location

            });
            //            var inputRadio = "<input name='rad' id='adradio" + i + "' style='margin-bottom:8px;' type='radio' onclick='radioClick(this)' ><span id=sp" + i + ">" + place.formatted_address + "<input type='hidden' value='" + place.geometry.location.lat() + "," + place.geometry.location.lng() + "' id='hd" + i + "' /> </span><br/>";
            //            document.getElementById("txtResults").innerHTML += inputRadio;
            markersArray.push(marker);
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
    });

      
    google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}
function PopulatedAddress(lat, log) {
    //alert(lat);
    //alert(log);

    //getLocationDetails(lat, log);
    var temp = lat + "," + log;
    GetAddressPopulated(temp);

}

function PopulatedAddress2(lat, log) {
    //alert(lat);
    //alert(log);

    //getLocationDetails(lat, log);
    var temp = lat + "," + log;
    GetAddressPopulated2(temp);

}

function GetAddressPopulated(latlong) {
   
    if (latlong != "") {
        
        var _split = latlong.split(',');
        var lat = $.trim(_split[0]);
        var lng = $.trim(_split[1]);
       
        $("#hdlat").val(lat);
        $("#hdlong").val(lng);

        var latlng = new google.maps.LatLng(lat, lng);

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
           
            if (status == google.maps.GeocoderStatus.OK) {

                if (results[0]) {


                    for (var i = 0; i < results[0].address_components.length; i++) {
                        var addressType = results[0].address_components[i].types[0];
                        
                        if (componentForm[addressType]) {
                            var val = results[0].address_components[i][componentForm[addressType]];
                            
                            if (addressType == "locality") {
                                //alert("fromCity="+val);
                                $('#ftxtCity').val(val);
                            }

                            else if (addressType == "country") {

                               
                                var fc = results[0].address_components[i].short_name;
                                $("#fhdnCountry").val(fc);
                                //alert("fromCountry=" + val);
                                if (val == "United States" || val == "united states" || val == "usa" || val == "USA") {
                                    //alert("CON " + val);
                                    val = "United States";
                                }
                                var toloccountry = $("#tohdnCountry").val();
                                var fromloccountry = $("#fhdnCountry").val()
                                if (toloccountry != "" && fromloccountry != "") {

                                    if (fromloccountry == toloccountry) {
                                        $("#LB").val("LB");
                                        document.getElementById("LB").disabled = false;
                                    }
                                    else {
                                        $("#LB").val("KG");
                                        document.getElementById("LB").disabled = true;

                                    }
                                }

                            }
                            else if (addressType == "administrative_area_level_1") {
                                
                                $("#ftxtstate").val(val);
                                //alert("fromState=" + val);
                                var fsc = results[0].address_components[i].short_name;
                                $("#ftxtstatecode").val(fsc);
                                //alert("fromsCode=" + fsc);
                                //administrative_area_level_1
                            }
                            

                            else if (addressType == "postal_code") {
                                //alert("fromposcode=" + val);
                                $('#ftxtPostalCode').val(val);
                            }

                        }
                        
                    }

                }


                ///////////
                var p_code = 0;
                for (var m = 0; m < results.length; m++) {
                    for (var j = 0; j < results[m].address_components.length; j++) {

                        var oaddressType = results[m].address_components[j].types[0];
                        if (componentForm[oaddressType]) {
                            var oval = results[m].address_components[j][componentForm[oaddressType]];
                            if (oaddressType == "postal_code" && p_code == 0) {
                                p_code = 1;
                                $('#ftxtPostalCode').val(oval)
                            }
                        }

                    }

                }
                /////

            }

            else {
                alert("Geocoder failed due to: " + status);
            }
        });


    }


}

function GetAddressPopulated2(latlong) {
   
    if (latlong != "") {

        var _split = latlong.split(',');
        var lat = $.trim(_split[0]);
        var lng = $.trim(_split[1]);
        $("#hdlat").val(lat);
        $("#hdlong").val(lng);
       
        var latlng = new google.maps.LatLng(lat, lng);

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'latLng': latlng }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                if (results[0]) {

                    
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        var addressType = results[0].address_components[i].types[0];
                        console.log("addressType" + addressType);
                        console.log("Val" + results[0].address_components[i][componentForm[addressType]]);
                        if (componentForm[addressType]) {
                            var val = results[0].address_components[i][componentForm[addressType]];
                            
                            if (addressType == "locality") {
                                //alert("tocity"+val);
                                $('#totxtCity').val(val);
                            }

                            else if (addressType == "country") {


                                var tc = results[0].address_components[i].short_name;
                                //alert("tocountry" + tc);
                                $("#tohdnCountry").val(tc);

                                if (val == "United States" || val == "united states" || val == "usa" || val == "USA") {
                                    //alert("CON " + val);
                                    val = "United States";
                                }


                                var toloccountry = $("#tohdnCountry").val();
                                var fromloccountry = $("#fhdnCountry").val()
                                if (toloccountry != "" && fromloccountry != "")
                                {

                                    if (fromloccountry == toloccountry) {
                                        $("#LB").val("LB");
                                        document.getElementById("LB").disabled = false;
                                    }
                                    else {
                                        $("#LB").val("KG");
                                        document.getElementById("LB").disabled = true;

                                    }
                                }
                               




                            }
                            else if (addressType == "administrative_area_level_1") {

                                $("#totxtstate").val(val);
                                //alert("tostate" + val);
                                var tsc = results[0].address_components[i].short_name;
                                $("#totxtstatecode").val(tsc);
                                //alert("tostatecode" + tsc);
                                //administrative_area_level_1
                            }


                            else if (addressType == "postal_code") {
                                //alert("toposcode" + val);
                                $('#totxtPostalCode').val(val);
                            }

                        }

                    }

                }


                ///////////
                var p_code = 0;
                for (var m = 0; m < results.length; m++) {
                    for (var j = 0; j < results[m].address_components.length; j++) {

                        var oaddressType = results[m].address_components[j].types[0];
                        if (componentForm[oaddressType]) {
                            var oval = results[m].address_components[j][componentForm[oaddressType]];
                            if (oaddressType == "postal_code" && p_code == 0) {
                                p_code = 1;
                                $('#totxtPostalCode').val(oval)
                            }
                        }

                    }

                }
                /////

            }

            else {
                alert("Geocoder failed due to: " + status);
            }
        });


    }


}

var componentForm = {
    locality: 'long_name', //city
    administrative_area_level_1: 'long_name', //state
    
    country: 'long_name',
    postal_code: 'short_name'
};

