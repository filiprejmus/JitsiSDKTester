/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';
import JitsiMeeting from 'jitsi-meet-react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, onChangeText] = useState('MyTestRoom456');
  const [flagprops, setFlagprops] = useState({});
  const [showJitsi, setShowJitsi] = useState(false);
  const jitsiMeeting = useRef(null);

  function onReadyToClose() {
    setShowJitsi(false);
  }

  function onParticipantJoined(participant) {
    const {displayName} = participant;
    console.log('HE JOINED ' + displayName);
  }

  const meetingOptions = {
    domain: 'https://meet.jit.si',
    roomName: text,
    onReadyToClose: onReadyToClose,
    onParticipantJoined: onParticipantJoined,
    settings: {
      startWithAudioMuted: false,
      startWithVideoMuted: true,
      startAudioOnly: false,
    },
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        {!showJitsi ? (
          <>
            <TextInput
              style={{color: 'black'}}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter Room here"
            />
            <Button
              title="JOIN"
              onPress={() => {
                setShowJitsi(true);
              }}
            />
          </>
        ) : (
          <>
            <Button
              title="Close Meeting"
              color={'red'}
              onPress={() => jitsiMeeting.current.close()}
            />
            <Button
              title="Mute"
              color={'blue'}
              onPress={() => jitsiMeeting.current.setAudioMuted(true)}
            />
            <JitsiMeeting
              flags={[]}
              meetingOptions={meetingOptions}
              style={{width: 390, height: 444}}
              ref={jitsiMeeting}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
