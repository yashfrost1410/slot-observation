import React, { Component } from "react";
import { StyleSheet, Dimensions, ScrollView, style, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Accordion } from "galio-framework";

import articles from '../constants/articles';
import FAB from 'react-native-fab';

import { FooterTabs } from '../components/footer';

import { Card, CardItem, Container, Grid, Title, Col, List, Label, Header, Subtitle, Button, Content, ActionSheet, ListView, Text, ListItem, Left, Body, Right, Thumbnail, View, Icon } from "native-base";

const { width } = Dimensions.get('screen');
var Display = [];
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],
      isLoading: true,
      error: null,
    };


  }
  intervalID;

  getData = async () => {
    fetch("https://slot-observation.herokuapp.com/products", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('Token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log('getting data from fetch', responseJson)
        //let data_source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          Data: responseJson.data
        })
      })
      .catch(error => console.log(error))
      .finally(this.setState({ isLoading: false }))
  }

  componentDidMount() {
    this.getData();
    this.intervalID = setTimeout(this.getData.bind(this), 5000);
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component. Notice we are calling
      'clearTimeout()` here rather than `clearInterval()` as
      in the previous example.
    */
    clearTimeout(this.intervalID);
  }

  FlatListSeparator = () => {
    return (
      <View style={{
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      />
    );
  }






  render() {

    return (
      <Container>
        <Content>

          <View>
            {this.state.isLoading ? (
              <Text>Loading..</Text>
            ) :
              <FlatList
                data={this.state.Data}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item }) =>
                  <Card>
                    <CardItem bordered>
                      <Left>
                        <Thumbnail source={{ uri: '../assets/imgs/mishar.jpg' }} />
                        <Body>
                          <Text>Jalpesh Vasa</Text>
                          <Text note>GeekyAnts</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem header>
                      <Text> Software Engineering </Text>
                    </CardItem>

                    <CardItem cardBody>
                      <ListItem icon>
                        <Left>
                          <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active type="FontAwesome" name="user" style={{ fontSize: 20, color: 'blue' }} />
                          </Button>
                        </Left>
                      </ListItem>
                      <Body>
                        <Text>Proffesor</Text>
                      </Body>
                      <Right>
                        <Text>{item.faculty}</Text>
                        <Icon active name="arrow-forward" />
                      </Right>
                    </CardItem>
                    <CardItem cardBody>
                      <ListItem icon>
                        <Left>
                          <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active type="FontAwesome" name="user" style={{ fontSize: 20, color: 'blue' }} />
                          </Button>
                        </Left>
                      </ListItem>
                      <Body>
                        <Text>Students: </Text>
                      </Body>
                      <Right>
                        <Text>{item.students}</Text>
                        <Icon active name="arrow-forward" />
                      </Right>


                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent>
                          <Icon active name="thumbs-up" style={{ fontSize: 20, color: 'blue' }} />
                          <Text>12 Views</Text>
                        </Button>
                      </Left>
                      <Body>
                        <Button transparent>
                          <Icon active name="chatbubbles" style={{ fontSize: 20, color: 'blue' }} />
                          <Text>4 Comments</Text>
                        </Button>
                      </Body>
                      <Right>
                        <Text>11h ago</Text>
                      </Right>
                    </CardItem>
                  </Card>
                }
                keyExtractor={(item) => item._id}
              />
            }
            {this.state.error !== null && (
              <Text>{this.state.error}</Text>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}
