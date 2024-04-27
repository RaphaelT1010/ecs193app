import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "./DeviceConnectionModal";
import useBLE from "./useBLE";

import { NativeModules, TextInput, Button} from 'react-native';



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

  const [xAxis, setInput1] = useState("");
  const [yAxis, setInput2] = useState("");

  const GPS_Input = () => {
    console.log('X-Axis is: ', xAxis);
    console.log('Y-Axis is: ', yAxis);
  };

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
      <View style={styles.TitleWrapper}>
        {connectedDevice ? (
          <>
            <Text style={styles.TitleText}>
            Please Select GPS or Manual Input
          </Text>
          </>
        ) : (
          <Text style={styles.TitleText}>
          Please Connect to the Robot
        </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInput1}
          value={xAxis}
          placeholder="X-Axis"
        />
        <TextInput
          style={styles.input}
          onChangeText={setInput2}
          value={yAxis}
          placeholder="Y-Axis"
        />
        <Button title="Submit" onPress={GPS_Input} />
      </View>
      <View style={styles.arrowsContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => handleArrowPress("up")}
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>↑</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => handleArrowPress("left")}
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleArrowPress("down")}
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleArrowPress("right")}
            style={styles.arrowButton}
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
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
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
    width: 75,
    height: 75,
  },
  arrowText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: "#3065ba",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
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
