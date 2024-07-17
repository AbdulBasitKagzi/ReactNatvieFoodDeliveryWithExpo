import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const LocationSearch = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    setLocation(location.coords);
    moveToLocation(location.coords.latitude, location.coords.longitude);

    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const moveToLocation = async (latitude: number, longitude: number) => {
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      2000
    );
  };

  return (
    <View style={[styles.container]}>
      <MapView
        ref={mapRef}
        style={[styles.map]}
        // onRegionChange={(region) => console.log("region", region)}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
      >
        {location && (
          <Marker
            draggable
            coordinate={{
              latitude: location?.latitude as number,
              longitude: location?.longitude as number,
            }}
            onDragEnd={(event) => {
              setLocation(event.nativeEvent.coordinate);
            }}
          />
        )}
      </MapView>
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    zIndex: 1,
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8,
  },
});
