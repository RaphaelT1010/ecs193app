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
    //handleTimeoutAck,
    sendEnableSignal,
    sendDisableSignal,
    handleXYInput,
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

    handleXYInput(xAxis, yAxis);
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

  /*useEffect(() => {
    const interval = setInterval(() => {
      handleTimeoutAck();
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);*/

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
          <Text style={styles.TitleText}>Tractor Squad App</Text>
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
        style={styles.connectButton}
      >
        <Text style={styles.enableButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openEnableRobotModal} style={styles.enableRobotButton}>
        {robotToggle ? (
          <>
          <TouchableOpacity onPress={toggleRobot} style={styles.disableRobotButton}>
          <Text style={styles.enableButtonText}>Enabled</Text>
          </TouchableOpacity></>
        ) : (
          <Text style={styles.enableButtonText}>Disabled</Text>
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
    position: "relative", // Set position to relative for positioning children

  },
  TitleWrapper: {
    position: "absolute", // Position the title absolutely
    top: 40, // Adjust as needed to move the title up
    left: 0, // Align title to the left edge
    right: 0, // Align title to the right edge
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
    position: "absolute", // Position the input container absolutely
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    bottom: 150, // Adjust as needed to position parallel to arrows container
    left: 90, // Adjust as needed to position parallel to arrows container
    width: 275
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
    position: "absolute",
    bottom: 40,
    right: 40 // Adjust as needed
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
    width: 90,
    height: 90,
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
    width: 100,
    alignSelf: "center", // Align the button horizontally
    position: "absolute", // Position the button absolutely
    bottom: 20, // Adjust as needed to position it below the input container
    left: "30%", // Center the button horizontally
    marginLeft: -50, // Adjust to center the button
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
  enableButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 28.25, // Adjust the bottom margin to shift text down
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  enableRobotButton: {
    backgroundColor: "#B53737", // Red
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    top: 100, // Shift the button down by 60 units
    marginBottom: 10,
    borderRadius: 8,
    width: 125, // Set width to a specific value
    position: "absolute", // Position the button absolutely
    left: -62.5, // Shift the button half of its width to the left
    transform: [{ rotate: "-90deg" }], // Rotate the button text
  },
  disableRobotButton: {
    backgroundColor: "#0F9D58", //green
  justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 10,
    borderRadius: 8,
    width: 125, // Set width to a specific value
    position: "absolute", // Position the button absolutely
  },
  connectButton: {
    backgroundColor: "#3065ba",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    top: 250, // Shift the button down by 60 units
    marginBottom: 10,
    borderRadius: 8,
    width: 125, // Set width to a specific value
    position: "absolute", // Position the button absolutely
    left: -62.5, // Shift the button half of its width to the left
    transform: [{ rotate: "-90deg" }], // Rotate the button text
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
