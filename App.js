/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TakePhoto = () => {
  const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어주고
  const [img, setImage] = useState(null);
  const takePhoto = async () => {
    console.log('cameraRef', cameraRef);
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      console.log('😻 data', data);
      setImage(data.uri);
    }
  };

  return (
    <>
      <RNCamera
        ref={cameraRef}
        style={{
          width: 300,
          height: 300,
        }}
        captureAudio={false}
      />
      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#4f83cc',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 100,
            shadowOpacity: 1,
            shadowRadius: 1,
            shadowColor: '#414685',
            shadowOffset: {
              width: 1,
              height: 5.5,
            },
            elevation: 6,
          }}
          onPress={takePhoto}>
          <Text>hello World</Text>
        </TouchableOpacity>
      </View>
      <>
        {img ? (
          <Image
            style={{width: 300, height: 300}}
            source={{uri: img}}
            alt={'이미지 없음'}
          />
        ) : (
          <Text>이미지 없음</Text>
        )}
      </>
    </>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TakePhoto />
    </SafeAreaView>
  );
};

export default App;
