import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
export default class FooterTabs extends Component {
  constructor(props){
	super(props);
	this.state={
		Slots:2,
		
	}
  }
  render() {
	  const {Slots}=this.props;
    return (
      <Container>
        <Header />
        <Content />
        <Footer>
          <FooterTab>
            <Button badge vertical onPress={()=>{this.props.navigation.navigate('Home')}}>
              <Badge><Text>{this.state.Slots}</Text></Badge>
              <Icon name="clipboard-list" />
              <Text>Slots</Text>
            </Button>
            <Button vertical onPress={()=>{this.props.navigation.navigate('Elements')}}>
              <Icon name="square-edit-outline" />
              <Text>Add</Text>
            </Button>
            <Button badge vertical onPress={()=>{this.props.navigation.navigate('Profile')}}>
              <Badge ><Text>3</Text></Badge>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}