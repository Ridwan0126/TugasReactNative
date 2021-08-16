import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const Item = ({name, email, bidang, onPress, onDelete, image}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.avatar}
          // source={{
          //   uri: 'https://scontent-cgk1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/72480005_524343174784290_8100841044144773174_n.jpg?_nc_ht=scontent-cgk1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=01DUJRJX62UAX9lpRP5&edm=AP_V10EBAAAA&ccb=7-4&oh=5958936f481a55f09561619ea921fc34&oe=611A04B8&_nc_sid=4f375e',
          // }}
          source={image}
        />
      </TouchableOpacity>
      <View style={styles.desc}>
        <Text style={styles.descname}>{name}</Text>
        <Text style={styles.descEmail}>{email}</Text>
        <Text style={styles.descBidang}>{bidang}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const LocalAPI = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bidang, setBidang] = useState('');
  const [users, setUsers] = useState([]);
  const [button, setButton] = useState('Simpan');
  const [selectedUser, setselectedUser] = useState({});
  const [image] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const submit = () => {
    const data = {
      name,
      email,
      bidang,
      image,
    };
    if (name == 0 || email == 0 || bidang == 0) {
      Alert.alert(
        'Wrong Input!!',
        'Data Yang Anda Masukkan Salah, Atau Kosong',
        [{text: 'Oke Bos'}],
      );
      return;
    }
    if (button === 'Simpan') {
      console.log('Data ===>', data);
      axios.post('http://192.168.43.33:3004/users/', data).then(res => {
        console.log('res ==>', res);
        setName('');
        setEmail('');
        setBidang('');
        getData();
      });
    } else if (button === 'Edit') {
      axios
        .patch(`http://192.168.43.33:3004/users/${selectedUser.id}`, data)
        .then(res => {
          console.log('res update', res);
          setName('');
          setEmail('');
          setBidang('');
          getData();
          setButton('Simpan');
        });
    }
  };

  const getData = () => {
    axios.get('http://192.168.43.33:3004/users/').then(res => {
      console.log('res ==>', res);
      setUsers(res.data);
    });
  };

  const selectItem = item => {
    console.log('selectItem', item);
    setselectedUser(item);
    setName(item.name);
    setEmail(item.email);
    setBidang(item.bidang);
    setButton('Edit');
  };

  const deleteItem = item => {
    console.log('Delete', item);
    axios.delete(`http://192.168.43.33:3004/users/${item.id}`).then(res => {
      console.log('Delete', res);
      getData();
    });
  };

  return (
    <ScrollView>
      <View style={styles.containe}>
        <Text style={styles.testTitle}> textInComponent </Text>
        <Text>Masukkan Anggota</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={value => setName(value)}
          placeholder="name"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={value => setEmail(value)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={bidang}
          onChangeText={value => setBidang(value)}
          placeholder="Bidang"
        />
        <Button title={button} onPress={submit} />
        <View style={styles.line} />
        {users.map(user => {
          return (
            <Item
              key={user.id}
              image={user.image}
              name={user.first_name}
              email={user.email}
              bidang={user.bidang}
              onPress={() => selectItem(user)}
              onDelete={() =>
                Alert.alert('Warning!', 'Are You Sure to DELETE User?', [
                  {text: 'No', onPress: () => console.log('BTN NO')},
                  {text: 'Yes', onPress: () => deleteItem(user)},
                ])
              }
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LocalAPI;

const styles = StyleSheet.create({
  containe: {padding: 20},
  testTitle: {textAlign: 'center', marginTop: 20},
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
  descname: {fontSize: 20, fontWeight: 'bold'},
  descEmail: {fontSize: 16},
  descBidang: {fontSize: 12, marginTop: 8},
  delete: {fontSize: 25, fontWeight: 'bold', color: 'red'},
});
