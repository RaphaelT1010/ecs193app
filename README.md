# Getting Started

We are using React Native Expo and not React Native CLI. We will be prebuilding to make BLE work with Expo using CLI functions.
Follow the steps carefully - I recommend creating a whole new React Expo project and pasting source code only instead of importing all of the project files in.

## Initial EnvironmentSet Up
1. Make an empty folder somewhere preferably titled "RoboticDummyApp"
2. cd into that directory and type: "npx create-expo-app -t expo-template-blank-typescript RoboticDummyApp"
3. Do "cd RoboticDummyApp". This will be referred to as the "RoboticDummyApp/RoboticDummyApp" directory
4. Once you are in that directory, you will need to type a series of more commands starting with: "npx expo install react-native-ble-plx"
5. Then type: "npx expo install expo-device react-native-base64"
6. Just to make things work with the source code, type: "npx expo install @shopify/react-native-skia"
7. Once this is done, you will need to do a few more setups for the Android File and Gradle

## Setting up the Android File and Gradle
1. Type into the same terminal and directory as before: "npx npm install eas-cli"
2. Then type: "npx expo prebuild" which should make an "android" folder in the project directory.
3. Then type: "npx expo install expo-dev-client"
4. Type "code ." in the terminal to open up visual studio code or use whichever IDE you use for react expo
5. Once in the IDE, navigate to the "android" file if it is there. Open to "android->app->src->gradle.properties"
6. At the bottom of "gradle.properties", write "org.gradle.java.home=C:/Program Files/Java/jdk-17.0.9" at the bottom of the file. The jdk path is dependent on where your path is located, so it will vary.
7. In the same directory (android->app->src), create a file called "local.properties"
8. In "local.properties", fill the line with your Android SDK path which can look similar to this: "sdk.dir=C:\\Users\\Docto\\AppData\\Local\\Android\\Sdk"
9. Once that is done, you can edit the source code in the "RoboticDummyApp/RoboticDummyApp" directory

## "RoboticDummyApp/RoboticDummyApp" directory
In this directory, you can theoretically just paste in all of the source code and folders found in my branch. However, I would only paste in code/files for the following to
avoid running into too many errors:
- app.json
- App.tsx
- DeviceConnectionModal.tsx
- eas.json
- index.js
- package-lock.json
- package.json
- PulseIndicator.tsx
- useBLE.ts
- and (maybe) tsconfig.json

## More imports
In the same "RoboticDummyApp/RoboticDummyApp" directory, you should just run these imports:
- npm i --save-dev @types/react-native-base64
- npm i react-native-permissions@3.6.1
- npm install react-native-device-info
- npm install react-native-reanimated
- npm install react-native-quick-base64

After this, make sure there are no other errors in the project. If there are let me know and I may know how to help. You should be able to connect/load up your Android Studio emulator
or use a physical devices as your Android connection. Then you can type in "npx expo run:android" to run it

# Issues/Errors
There can be a lot of issues and dependencies. To make sure you have the correct dependency versions, I would suggest looking at package.json for the version types. Ideally, running all of the terminal commands
written before should do the trick, but you may encounter installing the wrong version. An example of installing version specific dependencies is found in the "More Imports" section with the terminal line:
"npm i react-native-permissions@3.6.1". You can follow that format to install dependencies with correct versions if need be.

Another thing to note, your Java version specified in gradle.properties SHOULD be JDK17. Anything lower won't work and anything higher will be too new. So just use that installation version. As well,
your gradle version may not need to be a specific version, but I am unsure. I am using the current gradle version at this time and I was fine. Let me know if you have any errors.
