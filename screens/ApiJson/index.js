import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
// import {Value} from 'react-native-reanimated';

const Item = ({name, email, bidang}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://robohash.org/exercitationematcommodi.png',
        }}
      />
      <View style={styles.desc}>
        <Text style={styles.descname}>{name}</Text>
        <Text style={styles.descEmail}>{email}</Text>
        <Text style={styles.descBidang}>{bidang}</Text>
      </View>
      <Text style={styles.delete}>X</Text>
    </View>
  );
};

const LocalAPI = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bidang, setBidang] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const submit = () => {
    const data = {
      name,
      email,
      bidang,
    };
    console.log('Data ===>', data);
    axios.post('http://192.168.43.33:3004/users/', data).then(res => {
      console.log('res ==>', res);
      setName('');
      setEmail('');
      setBidang('');
      getData();
    });
  };

  const getData = () => {
    axios.get('http://192.168.43.33:3004/users/').then(res => {
      console.log('res ==>', res);
      setUsers(res.data);
    });
  };

  return (
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
      <Button title="Simpan" onPress={submit} />
      <View style={styles.line} />
      {users.map(user => {
        return (
          <Item
            key={user.id}
            name={user.name}
            email={user.email}
            bidang={user.bidang}
          />
        );
      })}
    </View>
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
