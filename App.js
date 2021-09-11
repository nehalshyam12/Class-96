import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#0008ff'}
          centerComponent={{
            text: '𝓖𝓞𝓞𝓖𝓛𝓔 𝓒𝓞𝓝𝓣𝓐𝓒𝓣',
            style: { color: '#fff', fontSize: 19 },
          }}
        />

        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fwww.apkmirror.com%2Fwp-content%2Fuploads%2F2017%2F05%2F5914b36635e63.png&w=96&h=96&q=100',
          }}
        />

        
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db[word]?(
            this.setState({ chunks: db[word].chunks }),
            this.setState({ phonicSounds: db[word].phones })
            ):
            alert("The no. does not exist in our database");
          }}>
           <Text style={styles.buttonText}>𝒩𝒜𝑀𝐸 - </Text><TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text });
          }}
         
          value={this.state.text}
        />
          <Text style={styles.buttonText}>𝒮𝐸𝑅𝒜𝒞𝐻 </Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3366cc',
  },
  inputBox: {
    marginTop: 5,
    width: '150%',
    alignSelf: 'center',
    height: '100',
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '60%',
    height: 105,
    alignSelf: 'center',
    padding: 10,
    margin: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 180,
    height: 200,
    marginLeft: 70,
  }
});