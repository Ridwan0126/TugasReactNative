import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {
  Alert,
  // Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {ListItem, Button} from 'react-native-elements';

const Item = ({first_name, phone_number, email, onPress, onDelete, image}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.desc}>
        <Text style={styles.descfirst_name}>{first_name}</Text>
        <Text style={styles.descphone_number}>{phone_number}</Text>
        <Text style={styles.descemail}>{email}</Text>
      </View>
      {/* <TouchableOpacity onPress={onPress}>
        <Text>Edit</Text> */}
      {/* <Image
          style={styles.avatar}
          // source={{
          //   uri: 'https://scontent-cgk1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/72480005_524343174784290_8100841044144773174_n.jpg?_nc_ht=scontent-cgk1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=01DUJRJX62UAX9lpRP5&edm=AP_V10EBAAAA&ccb=7-4&oh=5958936f481a55f09561619ea921fc34&oe=611A04B8&_nc_sid=4f375e',
          // }}
          source={image}
        /> */}
      {/* </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const LocalAPI = () => {
  const [first_name, setfirst_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState([]);
  const [button, setButton] = useState('ADD');
  const [selectedContact, setselectedContact] = useState({});
  const [refresh] = useState(false);

  useEffect(() => {
    getData();
    // refresh(true);
  }, []);

  const submit = () => {
    const data = {
      first_name,
      phone_number,
      email,
    };
    if (first_name == 0 || phone_number == 0 || email == 0) {
      Alert.alert(
        'Wrong Input!!',
        'Data Yang Anda Masukkan Salah, Atau Kosong',
        [{text: 'Oke Bos'}],
      );
      return;
    }
    if (button === 'ADD') {
      console.log('Data ===>', data);
      axios.post('http://192.168.43.33:3000/contact/', data).then(res => {
        console.log('res ==>', res);
        setfirst_name('');
        setPhone_number('');
        setemail('');
        getData();
      });
    } else if (button === 'Edit') {
      axios
        .patch(`http://192.168.43.33:3000/contact/${selectedContact.id}`, data)
        .then(res => {
          console.log('res update', res);
          setfirst_name('');
          setPhone_number('');
          setemail('');
          getData();
          setButton('ADD');
        });
    } else if (button === 'Edit' && button === 'ADD') {
      refresh(true);
    }
  };

  const getData = () => {
    axios.get(`http://192.168.43.33:3000/contact/`).then(res => {
      console.log('res ==>', res);
      setcontact(res.data);
    });
  };

  const selectItem = item => {
    console.log('selectItem', item);
    setselectedContact(item);
    setfirst_name(item.first_name);
    setPhone_number(item.phone_number);
    setemail(item.email);
    setButton('Edit');
  };

  const deleteItem = item => {
    console.log('Delete', item);
    axios.delete(`http://192.168.43.33:3000/contact/${item.id}`).then(res => {
      console.log('Delete', res);
      getData();
    });
  };

  return (
    <ScrollView>
      <View style={styles.containe}>
        <Text style={styles.testTitle}> Contact List </Text>
        {/* <Text>Masukkan Anggota</Text> */}
        <TextInput
          style={styles.input}
          value={first_name}
          onChangeText={value => setfirst_name(value)}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={phone_number}
          onChangeText={value => setPhone_number(value)}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={value => setemail(value)}
          placeholder="E-mail"
        />
        <Button title={button} onPress={submit} />
        <View style={styles.line} />
        {contact.map(user => {
          return (
            <View>
              <ListItem.Swipeable
                leftContent={
                  <Button
                    onPress={() => selectItem(user)}
                    title="Edit"
                    icon={{name: 'info', color: 'white'}}
                    buttonStyle={{minHeight: '100%'}}
                  />
                }
                rightContent={
                  <Button
                    onPress={() =>
                      Alert.alert('Warning!', 'Are You Sure to DELETE User?', [
                        {text: 'No', onPress: () => console.log('BTN NO')},
                        {text: 'Yes', onPress: () => deleteItem(user)},
                      ])
                    }
                    title="Delete"
                    icon={{name: 'delete', color: 'white'}}
                    buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
                  />
                }
                bottomDivider={true}>
                <Avatar
                  titleStyle={{color: 'black'}}
                  size="medium"
                  // containerStyle={{backgroundColor: 'grey'}}
                  // title="A"
                  rounded
                  title={user.first_name[0]}
                  source={{uri: user.image}}
                />
                <Item
                  key={user.id}
                  image={user.image}
                  first_name={user.first_name}
                  phone_number={user.phone_number}
                  email={user.email}
                  onPress={() => selectItem(user)}
                  onDelete={() =>
                    Alert.alert('Warning!', 'Are You Sure to DELETE User?', [
                      {text: 'No', onPress: () => console.log('BTN NO')},
                      {text: 'Yes', onPress: () => deleteItem(user)},
                    ])
                  }
                />
              </ListItem.Swipeable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LocalAPI;

const styles = StyleSheet.create({
  containe: {padding: 20},
  testTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: 'blue',
  },
  line: {height: 2, backgroundColor: 'black', marginVertical: 20},
  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 25,
    paddingHorizontal: 18,
  },
  avatar: {width: 80, height: 80, borderRadius: 80},
  itemContainer: {flexDirection: 'row', marginBottom: 20},
  desc: {marginLeft: 18, flex: 1},
  descfirst_name: {fontSize: 20, fontWeight: 'bold'},
  descphone_number: {fontSize: 16},
  descemail: {fontSize: 12, marginTop: 8},
  delete: {fontSize: 25, fontWeight: 'bold', color: 'red'},
});
