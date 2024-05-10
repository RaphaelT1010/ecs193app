import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import DeviceConnectionModal from "./DeviceConnectionModal";
import EnableRobotModal from "./EnableRobotModal";
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
    handleTimeoutAck,
    sendEnableSignal,
    sendDisableSignal,
  } = useBLE();
  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState<boolean>(
    false
  );
  const [isEnableRobotModalVisible, setIsEnableRobotModalVisible] = useState<boolean>(
    false
  );
  const [robotToggle, setRobotToggle] = useState<boolean>(false);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  const GPS_Input = () => {
    console.log("X-Axis is: ", xAxis);
    console.log("Y-Axis is: ", yAxis);
  };

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideDeviceModal = () => {
    setIsDeviceModalVisible(false);
  };

  const hideEnableRobotModal = () => {
    setIsEnableRobotModalVisible(false);
  };

  const openDeviceModal = async () => {
    scanForDevices();
    setIsDeviceModalVisible(true);
  };

  const openEnableRobotModal = () => {
    setIsEnableRobotModalVisible(true);
  };

  const toggleRobot = () => {
    setRobotToggle((prev) => !prev);
    if(robotToggle) {
      sendDisableSignal();
    }
    else {
      sendEnableSignal();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleTimeoutAck();
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TitleWrapper}>
        {connectedDevice ? (
          <>
            <Text style={styles.TitleText}>
              Please Select GPS or Manual Input
            </Text>
          </>
        ) : (
          <Text style={styles.TitleText}>Please Connect to the Robot</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setXAxis}
          value={xAxis}
          placeholder="X-Axis"
        />
        <TextInput
          style={styles.input}
          onChangeText={setYAxis}
          value={yAxis}
          placeholder="Y-Axis"
        />
      </View>
      <TouchableOpacity onPress={GPS_Input} style={styles.gpsButton}>
        <Text style={styles.gpsButtonText}>Submit</Text>
      </TouchableOpacity>
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
            style={styles.arrowButton}
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
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openDeviceModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openEnableRobotModal} style={styles.enableRobotButton}>
        {robotToggle ? (
          <>
          <TouchableOpacity onPress={toggleRobot} style={styles.disableRobotButton}>
          <Text style={styles.ctaButtonText}>Disable Robot</Text>
          </TouchableOpacity></>
        ) : (
          <Text style={styles.ctaButtonText}>Enable Robot</Text>
        )}
        
      </TouchableOpacity>
      <DeviceConnectionModal
        closeModal={hideDeviceModal}
        visible={isDeviceModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      >
        <TouchableOpacity onPress={hideDeviceModal}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </DeviceConnectionModal>
      <EnableRobotModal
        closeModal={hideEnableRobotModal}
        visible={isEnableRobotModalVisible}
        toggleOn={toggleRobot}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  TitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
    width: 275, // set a specific width
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    width: 30, // set a specific width
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
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 10,
    width: 75,
    height: 75,
  },
  arrowText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  gpsButton: {
    backgroundColor: "#3065ba",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    width: 100, // Set width to a specific value
  },
  gpsButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  ctaButton: {
    backgroundColor: "#3065ba",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    width: 150, // Set width to a specific value
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  enableRobotButton: {
    backgroundColor: "#3065ba",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    width: 150, // Set width to a specific value
  },
  disableRobotButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#3065ba",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  disableButtonText: {
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
