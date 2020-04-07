import React from "react";
import { ScrollView, StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
// Galio components
import { Block, Text, Button, Input, theme } from "galio-framework";
// Argon themed components
//import { argonTheme, tabs } from "../constants/";
//import { Button, Select, Icon, Input, Header, Switch } from "../components/";
//import React, { Component } from 'react';
//import Icon from 'react-native-vector-icons';
import { Container, Header, Icon, Content, Card, Form, Label, Item, CardItem, Body, Picker, TextField, DatePicker } from 'native-base';
import { FooterTabs } from '../components/footer';


const { width } = Dimensions.get("screen");

class Elements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: 'CRNS',
      strength: '50-60',
      Afaculty: 'mishar',
      Pfaculty: 'Dr. Parth Shah',
      slot: '12:10-1:10',
      classL: '708',
      other: 'Issue',
      chosenDate: new Date(),
      disabled: false,
    };

  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
      disabled: true
    });
  }



  render() {
    let { subject, Pfaculty, slot, classL, chosenDate, strength, Afaculty, other, disabled } = this.state;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <View style={styles1.screen}>
                  <DatePicker
                    disabled={this.state.disabled}
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "black" }}
                    placeHolderTextStyle={{ color: "#000000" }}
                    onDateChange={(Data) => this.setState({ chosenDate: Data })}
                    disabled={false}
                  />
                  <Text>
                    Date: {this.state.chosenDate.toString().substr(0, 12)}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Dropdown
                        //ref={this.slotRef}
                        value={slot}
                        onChangeText={(data) => this.setState({ slot: data })}
                        label='slot'
                        data={SlotData}
                      />

                    </View>

                    <View style={{ width: 96, marginLeft: 8 }}>
                      <Dropdown
                        //ref={this.classRef}
                        value={classL}
                        onChangeText={(data) => this.setState({ classL: data })}
                        label='Class/Lab'
                        data={classData}
                      //propsExtractor={({ props }, index) => props}
                      />

                    </View>
                  </View>
                  <Input
                    placeholder={this.state.Afaculty}
                    right
                    disabled
                    icon="person"
                    family="Fontisto"
                    iconSize={14}
                    iconColor="#172B4D"
                  />

                  <Dropdown
                    //ref={this.classRef}
                    value={Pfaculty}
                    onChangeText={(data) => this.setState({ Pfaculty: data })}
                    label='Class/Lab'
                    data={PfacultyData}
                    propsExtractor={({ props }, index) => props}
                  />


                  <Input
                    placeholder="Subject:"
                    right
                    icon="collections-bookmark"
                    family="MaterialIcons"
                    iconSize={14}
                    iconColor="black"
                    onChangeText={(data) => this.setState({ subject: data })}
                  />

                  <Dropdown
                    value={this.state.strength}
                    onChangeText={(data) => this.setState({ strength: data })}
                    label='Strength OF Class'
                    data={strengthData}
                    propsExtractor={({ props }, index) => props}
                  />

                  <Input
                    placeholder="Issue:"
                    right
                    icon="error"
                    family="MaterialIcons"
                    iconSize={14}
                    iconColor="#172B4D"
                    onChangeText={(data) => this.setState({ other: data })}
                  />


                </View>
              </Body>
            </CardItem>
            <CardItem footer>
              <Button block
                onPress={() => this.props.navigation.navigate('Home', {
                  slot: this.state.slot,
                  classL: this.state.classL,
                  Pfaculty: this.state.Pfaculty,
                  subject: this.state.subject,
                  strength: this.state.strength,
                  other: this.state.other,
                })}>
                <Text style={{ color: "white" }}>Send</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>

      </Container>
    );
  }
}
const PfacultyData = [
  { value: 'Sanket Suthar' },
  { value: 'Dr. Parth Shah' },
  { value: 'Amit Thakkar' },
  { value: 'Sandip Patel' },
  { value: 'Pritesh Prajapati' },
  { value: 'Amit Parmar' },
  { value: 'Sagar patel' },
];

const SlotData = [
  { value: '9:10-10:10' },
  { value: '10:10-11:10' },
  { value: '12:10-1:10' },
  { value: '1:10-2:10' },
  { value: '2:20-3:20' },
  { value: '3:20-4:20' },

];

const strengthData = [
  { value: '00-10' },
  { value: '10-20' },
  { value: '20-30' },
  { value: '30-40' },
  { value: '40-50' },
  { value: '50-60' },
  { value: '60-70' },
  { value: '70-80' },
  { value: '80-90' },
  { value: '90-100' },
];


const classData = [
  { value: '707' },
  { value: '708' },
  { value: '709' },
  { value: '710' },
  { value: '711' },
  { value: '713A', props: { disabled: true } },
  { value: '713B', props: { disabled: true } },
  { value: '713C', props: { disabled: true } },
  { value: '713D', props: { disabled: true } },
];

const styles1 = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 56,
    width: "97%",
    backgroundColor: '#FFFFFF',
  },
});

export default Elements;