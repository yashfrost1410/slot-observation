import React, { Component } from "react";
import { StyleSheet, Dimensions, ScrollView,style } from 'react-native';
import { Block, theme } from 'galio-framework';

//import { Card } from '../components';
import articles from '../constants/articles';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import {Backdrop} from 'react-native-backdrop';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import { TextField } from 'react-native-material-textfield';
import {FooterTabs} from '../components/footer';

import { Card, CardItem,Container, List,Label,Header, Button, Content, ActionSheet, Text,ListItem, Left, Body, Right, Thumbnail, } from "native-base";

const { width } = Dimensions.get('screen');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
		subject:'CRNS',
		strength: '50-60',
		Afaculty:'mishar',
    Pfaculty: 'Dr. Parth Shah',
    slot: this.props.navigation.getParam('slot','None'),
    classL: '708',
    disabled:"false",
		Afaculty:'Mishar',
		other:'Description',
		//basic: true,
	    //listViewData: this.Data,
	};
	
  }
   
  
  
  render() {
	const {subject,strength,Pfaculty,slot,classL,Afaculty,others}=this.props;  
    return (
      <Container>
		  <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: '../assets/profile-img.jpg'}} />
                <Body>
                  <Text>Sanket Suthar</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
          <Icon  name="location" />
					<Text>{this.state.classL}</Text>
          <Icon  name="user-tie"  />
					<Text>{this.state.Afaculty}</Text>
				  <Icon  name="user-check"  />
					<Text>{this.state.Pfaculty}</Text>
				  <Icon  name="class"  />
					<Text>{this.state.subject}</Text>
				  <Icon  name="time-slot"/>
					<Text>{this.state.slot}</Text>
			    <Icon  name="people" />
					<Text>{this.state.strength}</Text>
				  <Icon  name="error" />
					<Text>{this.state.other}</Text>			
				</Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="people" family="MaterialIcons"/>
                  <Text>1,926 Views</Text>
				  <Right>
					<Text>11h ago</Text>
				  </Right>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


