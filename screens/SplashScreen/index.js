import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import logos from '../../assets/image/1.png';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ImageBackground
      source={{
        uri: 'https://ichef.bbci.co.uk/news/507/cpsprodpb/AA0E/production/_119543534_animedua.jpg',
      }}
      style={styles.backgroundImage}
      blurRadius={9}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={logos}
            //   source={{
            //     uri:
            //       'https://ichef.bbci.co.uk/news/507/cpsprodpb/AA0E/production/_119543534_animedua.jpg',
            //   }}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text
          // style={[
          //   styles.title,
          //   {
          //     color: colors.text,
          //   },
          // ]}
          >
            OSISdev.COM
          </Text>
        </View>
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
          animation="fadeInUpBig">
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}>
            OSISdev.COM
          </Text>
          <Text style={styles.text}>
            Kalo Mau Login, Tinggal Klik Tombol Di bawah Egee....
          </Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
              <LinearGradient colors={['grey', 'grey']} style={styles.signIn}>
                <Text style={styles.textSign}>Go To Login</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 150,
    paddingHorizontal: 30,
  },
  logo: {
    borderRadius: 100,
    height: 200,
    width: 200,
    // width: height_logo,
    // height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 50,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 10,
    marginBottom: 50,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
