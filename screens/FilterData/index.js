import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // contact: [],
      contact: [],
      refresh: false,
      limit: 15,
      page: 1,
    };
  }

  getData = (page = 1) => {
    console.log('page:', page);
    this.setState({
      refresh: true,
    });
    const {limit} = this.state;
    fetch(`http://192.168.43.33:3000/contact?_limit=${limit}&_page=${page}`)
      // fetch(
      //   `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${page}`,
      // )
      // fetch(
      //   `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`,
      // )
      // fetch(`http://localhost:3000/contact`)
      .then(response => response.json())
      .then(contact => {
        let newData = [];
        if (page === 1) newData = contact;
        else newData = [...this.state.contact, ...contact];

        this.setState({
          contact: newData,
          page,
          refresh: false,
        });
      });
  };

  img = ({item}) => {
    return (
      <Image
        style={{width: 100, height: 100}}
        source={{uri: item.thumbnailUrl}}
      />
    );
  };

  renderData = ({item}) => {
    return (
      <ListItem
      // leftContent={
      //   <Button
      //     onPress={() => Alert.alert('Edit')}
      //     title="Edit"
      //     icon={{name: 'info', color: 'white'}}
      //     buttonStyle={{minHeight: '100%'}}
      //   />
      // }
      // rightContent={
      //   <Button
      //     onPress={() => Alert.alert('Delete')}
      //     title="Delete"
      //     icon={{name: 'delete', color: 'white'}}
      //     Style={{minHeight: '100%', backgroundColor: 'red'}}
      //   />
      // }
      // bottomDivider={true}
      >
        <Avatar
          titleStyle={{color: 'black'}}
          size="medium"
          rounded
          title={item.first_name[0]}
          source={{uri: item.image}}
        />
        <ListItem.Content>
          <ListItem.Title>{item.first_name}</ListItem.Title>
          <ListItem.Subtitle>{item.phone_number}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ImageBackground
        source={{
          uri: 'https://ichef.bbci.co.uk/news/507/cpsprodpb/AA0E/production/_119543534_animedua.jpg',
        }}
        style={styles.backgroundImage}
        blurRadius={9}>
        <View style={styles.container}>
          <FlatList
            data={this.state.contact}
            keyExtractor={(item, idx) => idx}
            renderItem={this.renderData}
            onRefresh={() => this.getData(1)}
            refreshing={this.state.refresh}
            onEndReached={() => this.getData(this.state.page + 1)}
            onEndReachedThreshold={0.1}
          />
        </View>
      </ImageBackground>
    );
  }
}
const deleteItem = item => {
  console.log(item);
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
  },
});

export default Home;
