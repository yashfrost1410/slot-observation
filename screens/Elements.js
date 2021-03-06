import React from "react";
import { ScrollView, StyleSheet, Dimensions, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
// Galio components
import { Block, Text, Button, Input, theme } from "galio-framework";

import { Container, Header, Icon, Content, Card, Form, Label, Item, CardItem, Body, Picker, TextField, DatePicker } from 'native-base';
import { FooterTabs } from '../components/footer';


const { width } = Dimensions.get("screen");

class Elements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      classL: '',
      Pfaculty: '',
      strength: '',
      other: '',
      chosenDate: new Date(),
      disabled: false,
      slotDate: '',
      token: "",
      loading: true
    };

  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
      disabled: true
    });
  }
  async componentDidMount() {
    this.setState({ token: "Bearer " + await AsyncStorage.getItem('Token') });
  }
  submitHandler = async () => {

    await fetch("https://slot-observation.herokuapp.com/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
      body: JSON.stringify({
        className: this.state.classL,
        faculty: this.state.Pfaculty,
        students: this.state.strength,
        action: this.state.other
      }
      )
    }).then((response) => response.json())
      .then((res) => {

        alert(res.message);

      }).catch((err) => {
        console.log('Error: ', err);
      });
  }



  render() {
    let { Pfaculty, slotDate, classL, chosenDate, strength, Afaculty, other, disabled } = this.state;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <View style={styles1.screen}>
                  <DatePicker
                    disabled={this.state.disabled}
                    defaultDate={new Date(2020, 4, 4)}
                    minimumDate={new Date(2020, 1, 1)}
                    maximumDate={new Date(2020, 12, 31)}
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
                        value={slotDate}
                        onChangeText={(data) => this.setState({ slotDate: data })}
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
                    placeholder="yash"
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
                onPress={this.submitHandler}>
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
  { value: '10' },
  { value: '20' },
  { value: '30' },
  { value: '40' },
  { value: '50' },
  { value: '60' },
  { value: '70' },
  { value: '80' },
  { value: '90' },
  { value: '100' },
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