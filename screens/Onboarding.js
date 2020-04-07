import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { StackNavigator } from "react-navigation";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { axios } from "axios";
const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    token: "",
    message: "",
    loading: true,
  };
  async componentDidMount() {
    var value = await AsyncStorage.getItem('Token');
    if (value !== null) {
      this.props.navigation.navigate('Home')
    }
  }
  submitHandler = async () => {
    const values = {
      email: this.state.email,
      password: this.state.password
    };
    await fetch("http://192.168.232.2:3000/user/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }, getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      }) // body data type must match "Content-Type" header
    }).then((respone) => respone.json())
      .then((res) => {
        if (res.success == true) {
          AsyncStorage.setItem('Token', res.data.token)
          alert(res.data.token)
        }
        else {
          alert(res.message);
        }
      }).done();

  }

  render() {
    const { email, password, loading, redirect } = this.state;
    return (
      <Block flex middle>

        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={20}>
                    Sign In
                    </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email Default:yash@gmail.com"
                        onChangeText={(email) => this.setState({ email })}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Password Default:12345"
                        onChange={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        iconContent={
                          <Icon
                            size={16}
                            col or={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" onPress={this.submitHandler} style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          SIGN IN
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with (under development)
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>

            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;
