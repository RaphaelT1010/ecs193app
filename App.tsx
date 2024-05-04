import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "./DeviceConnectionModal";
import { PulseIndicator } from "./PulseIndicator";
import useBLE from "./useBLE";

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    handleArrowPress,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
          <Text style={styles.heartRateTitleText}>
            Please connect to the Robot
          </Text>
      </View>
      <View style={styles.arrowsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPressIn={() => handleArrowPress("up")}
              onPressOut={() => handleArrowPress("stop")}
              style={styles.arrowButton}
            >
              <Text style={styles.arrowText}>↑</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPressIn={() => handleArrowPress("left")}
              onPressOut={() => handleArrowPress("stop")}
              style={[styles.arrowButton]}
            >
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPressIn={() => handleArrowPress("down")}
              onPressOut={() => handleArrowPress("stop")}
              style={styles.arrowButton}
            >
              <Text style={styles.arrowText}>↓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPressIn={() => handleArrowPress("right")}
              onPressOut={() => handleArrowPress("stop")}
              style={[styles.arrowButton]}
            >
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      >
        <TouchableOpacity onPress={hideModal}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </DeviceModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  arrowsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowButton: {
    backgroundColor: 'gray',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 10,
    width: 100, // Set the width to the desired size
    height: 100, // Set the height to the desired size
  },
  arrowText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: "#4287f5",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginTop: 10,
  },
});

export default App;
