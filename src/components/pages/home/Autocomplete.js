// Autocomplete.js
import React, { Component,useRef } from 'react';
import styled from 'styled-components';
import { MyVerticallyCenteredModal } from './modal';
import { EditModal } from './modal';
const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  text-align:center;
`;
var markers={}
markers.stop=[];
var bounds=[];
var pickupLatLng = {}
var dropoffLatLng = {}
var stopLatLng =[]
var directionsDisplay
class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            editModalshow:false,
            location:{},
            modaldata:{}
          };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this)
        this.hideEditModal = this.hideEditModal.bind(this)
        this.addMarker = this.addMarker.bind(this)

    }
    showModal = () => {
        this.setState({ modalShow: true });
    };
    address_return = (data) => {
        this.setState({editModalshow:false})
        console.log(data)
        const address = data.street+", "+data.city+", "+data.state+", "+data.country;
        this.searchInput.value=address;
        
        this.searchInput.focus();
        console.log(this.searchInput)
        console.log(this.searchInput.focus())
    }
    showEditModal = () => {
        this.setState({editModalshow:true})
    }
    hideModal = (props) => {
        
        this.setState({modaldata:props})
        this.setState({ modalShow: false });
    };
    hideEditModal = () => {
        this.setState({editModalshow:false})
    }
    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            // restrict your search to a specific type of result
            types: ['address'],
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };console.log(mapApi)
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        
        console.log(this.searchInput)
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }
    addMarker(position, map,i) {
        return new google.maps.Marker({
          // @see http://stackoverflow.com/questions/2436484/how-can-i-create-numbered-map-markers-in-google-maps-v3 for numbered icons
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + i + '|FF0000|000000',
          position: position,
          map: map
        })
      }
    onPlaceChanged = ({ map, addplace,mapApi,value,setValue,type,id } = this.props) => {
        const place = this.autoComplete.getPlace();
        if (!place.geometry) return;
        if (place.geometry.viewport) {
            
            // map.fitBounds(place.geometry.viewport);
            this.setState({modalShow:true})
            
            
            this.setState({
               location:{
                   postcode:place.address_components.find(c => c.types.includes('postal_code')) || {},
                   street:place.address_components.find(c => c.types.includes('route')) || {},
                   city:place.address_components.find(c => c.types.includes('locality')) || {},
                   country:place.address_components.find(c => c.types.includes('country')) || {},
                   state:place.address_components.find(c => c.types.includes('administrative_area_level_1')) || {},
               }
           })
           
            if (type == "pickup"){
                setValue(place.formatted_address)
                if (markers.pickup)
                    {
                        console.log(markers)
                        const result = markers.pickup.setMap(null);
                        console.log(result)
                    }
                    pickupLatLng={lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}     
            }
            else if (type == 'dropoff' ){
                setValue(place.formatted_address)
                if (markers.dropoff)
                    markers.dropoff.setMap(null);
                dropoffLatLng={lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}               
            }
            else {
                    debugger
                    value.push(place.formatted_address);

                    setValue(value)
                    stopLatLng[id]={lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}
            }
            console.log(pickupLatLng.lat)
            bounds = new google.maps.LatLngBounds();
            const directionsService = new google.maps.DirectionsService();
            let waypoints=[];
            stopLatLng.map((val)=>{
                waypoints.push({location:val,stopover:true,})
            })
            
            if (pickupLatLng.lat & dropoffLatLng.lat)
            directionsService.route(
                {
                origin: {lat:pickupLatLng.lat,lng:pickupLatLng.lng},
                destination: {lat:dropoffLatLng.lat,lng:dropoffLatLng.lng},
                waypoints:waypoints,
                travelMode: "DRIVING",
                },
                (response, status) => {
                if (status === "OK") {
                    console.log(status)
                    
                    if(directionsDisplay != null) {
                        directionsDisplay.setMap(null);
                        directionsDisplay = null;
                    }
                    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers : true});
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    var route = response.routes[0];
                    var markerCounter=0;
                    // start marker
                    this.addMarker(route.legs[0].start_location,map, markerCounter++);
                    // the rest
                    for (var i = 0; i < route.legs.length; i++) {
                        this.addMarker(route.legs[i].end_location,map, markerCounter++);
                        } 
                    }
                    else {
                        console.log(status)
                        window.alert("Directions request failed due to " + status);
                }
                }
            );
            if (pickupLatLng.lat)
                    {  
                        
                        if (markers.pickup)
                        markers.pickup.setMap(null);
                        bounds.extend(new google.maps.LatLng(pickupLatLng.lat,pickupLatLng.lng))
                        markers.pickup= new google.maps.Marker({
                            map:map,
                            position:{lat:pickupLatLng.lat,lng:pickupLatLng.lng},
                            icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                        })
                        
                }
            if (dropoffLatLng.lat)
                {   
                    if (markers.dropoff)
                        markers.dropoff.setMap(null);
                    bounds.extend(new google.maps.LatLng(dropoffLatLng.lat,dropoffLatLng.lng))
                    var marker = new google.maps.Marker({
                        map:map,
                        position:{lat:dropoffLatLng.lat,lng:dropoffLatLng.lng},
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    })
                    markers.dropoff=marker;
                }
            if (stopLatLng.length > 0)
                {
                    stopLatLng.map((val,index)=>{
                        if (val)
                            {    bounds.extend(new google.maps.LatLng(val.lat,val.lng))
                                if (markers.stop[index])
                                    markers.stop[index].setMap(null);
                                var marker = new google.maps.Marker({
                                    map:map,
                                    position:{lat:val.lat,lng:val.lng},
                                    icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                                })
                                markers.stop[index]=marker;
                            }
                    })
                }
                    console.log(bounds)
                    map.fitBounds(bounds)

            

        } 
        else {
            // map.setCenter(place.geometry.location);
            // map.setMarker({})
            map.setZoom(17);
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
        }
        addplace(place);
        this.searchInput.blur();
        };
    
   

        render() {
            return (
                <>
                    <MyVerticallyCenteredModal
                            show={this.state.modalShow}
                            confirm = {this.hideModal}
                            location={this.state.location}
                            showeditmodal = {this.showEditModal}
                            hideEditModal = {this.hideEditModal}
                            onHide={this.hideModal}

                        />
                    <EditModal show={this.state.editModalshow} data={this.state.modaldata} address_return={this.address_return} onHide={this.hideEditModal} />
                        
                    <Wrapper>
                        <input
                            className="search-input"
                            ref={(ref) => {
                                this.searchInput = ref;
                            }}
                            type="text"
                            placeholder="Enter a location"
                            autoFocus
                        />
                    </Wrapper>
                </>
            );
        }
}

export default AutoComplete;