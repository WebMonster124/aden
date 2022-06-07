// MyGoogleMaps.js
import React, { Component, useEffect, useContext, useState } from 'react';

import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import Marker from './Marker';
import {UserContext} from './index.js'
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const MyGoogleMap =(()=> {

    const [geoCoder,setGeoCoder]=useState();
    const [center,setCenter]=useState([]);
    const [address,setAddress]=useState();
    const [draggable,setDraggable]=useState(true);
    const [lat,setLat]=useState();
    const [zoom,setZoom]=useState();
    const [mapApiLoaded,setMapapitLoaded] = useState(false)
    const [lng,setLng]=useState();
  
    useEffect(()=>{
        setCurrentLocation();
        console.log(mapApi)
    },[])

    const onMarkerInteraction = (childKey, childProps, mouse) => {
        setLat(mouse.lat);
        setLng(mouse.lng);
        setDraggable(false)
    }
    const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        setState({ draggable: true });
        _generateAddress();
    }

    const _onChange = ({ center, zoom }) => {
        setCenter(center);
        setZoom(zoom);

    }

    const _onClick = (value) => {
        setLat(value.lat)
        setLng(value.lng)
    }
    useEffect(()=>{
        console.log('##############',mapApi)
    },[mapApi])
    const apiHasLoaded = (map, maps) => {
        console.log('@@@@@@@@@@@@@@@@@@',maps  )
        setMapapitLoaded(true)
        setMapApi(maps)
        setMapInstance(map)
        _generateAddress();
    };

    const addPlace = (place) => {
        
        setPlaces([place]);
        setLat(place.geometry.location.lat())
        setLng(setMapInstance)
        _generateAddress()
    };

    const _generateAddress=(()=> {
        console.log(mapApi)
        if (mapApi)
        {const geocoder = new mapApi.Geocoder;

            geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
                console.log(results)
                if (status === 'OK') {
                    if (results[0]) {
                        setZoom(12);
                        setAddress(results[0].formatted_address );
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }

            });
        }
    })

    // Get Current Location Coordinates
    const setCurrentLocation = (()=>{
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.longitude)
                setCenter([position.coords.latitude, position.coords.longitude])
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
            });
        }
    })
        console.log(lat)
        console.log(lng)
        return (
            <Wrapper>
                {mapApi
                ?<div>
                    <AutoComplete map={mapInstance} mapApi={mapApi} addplace={addPlace} />
                </div>
                :''}
                <GoogleMapReact
                    center={center? center:[0,0]}
                    zoom={zoom?zoom:12}
                    draggable={true}
                    onChange={_onChange}
                    onChildMouseDown={onMarkerInteraction}
                    onChildMouseUp={onMarkerInteractionMouseUp}
                    onChildMouseMove={onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={_onClick}
                    bootstrapURLKeys={{
                        key: 'AIzaSyAygoWDQ-IvoehtL-nJ0qVcHnUkVLsN6Ps',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                >

                    


                </GoogleMapReact>

            </Wrapper >
        );
    }
)

export default MyGoogleMap;