import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useState} from 'react';
import pin from '../../assets/pin.png';
import CustomCalloutView from './components/Callout';

MapboxGL.setAccessToken('YOUR_TOKEN_GOES_HERE');

const isAndroid = Platform.OS === 'android';
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  mapPinLayer: {
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
    iconSize: 1.0,
    iconImage: pin,
  },
});

export default function Map() {
  const [coordinates] = useState([78.9629, 20.5937]);

  // useEffect(() => {
  //   const getPermission = async () => {
  //     if (isAndroid) {
  //       const isGrant = await MapboxGL.requestAndroidLocationPermissions();
  //     }
  //   };
  // }, []);

  const [selectedFeature, setSelectedFeature] = useState();

  const onPinPress = e => {
    console.log('clicked');

    if (selectedFeature) {
      setSelectedFeature(undefined);
      return;
    }

    const feature = e?.features[0];
    setSelectedFeature(feature);
  };

  console.log(selectedFeature);

  return (
    <MapboxGL.MapView style={styles.map}>
      <MapboxGL.Camera zoomLevel={4} centerCoordinate={coordinates} />

      <MapboxGL.ShapeSource
        id="mapPinsSource"
        shape={featureCollections}
        onPress={onPinPress}>
        <MapboxGL.SymbolLayer id="mapPinsLayer" style={styles.mapPinLayer} />
      </MapboxGL.ShapeSource>

      {selectedFeature && (
        <MapboxGL.MarkerView
          id="selectedFeatureMarkerView"
          anchor={{x: 0.5, y: 0}}
          coordinate={selectedFeature.geometry.coordinates}>
          <CustomCalloutView
            onClose={onPinPress}
            message={selectedFeature?.properties?.message}
          />
        </MapboxGL.MarkerView>
      )}
    </MapboxGL.MapView>
  );
}

const featureCollections = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '1',
      properties: {
        icon: 'example',
        message: 'Hello! This is a live server example.',
      },
      geometry: {
        type: 'Point',
        coordinates: [78.9629, 20.5937],
      },
    },
    {
      type: 'Feature',
      id: '2',
      properties: {
        icon: 'example',
        message: 'Hello! This is a live server example.',
      },
      geometry: {
        type: 'Point',
        coordinates: [84.9629, 21.5937],
      },
    },
  ],
};
