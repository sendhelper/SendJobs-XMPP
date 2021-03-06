import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'

class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    props.screenProps.xmpp.xmppObject.on('login',this.onLogin.bind(this))

  }

  onLogin(user){
    this.props.login(user)
  }

  componentDidMount() {
    this.props.screenProps.xmpp.login(
      'f.dev', //jid // zibon
      'qweqwe' // password
      // '27b46098-fc0f-4de2-8f97-e0ef36b22eca',
      // 'e7741903-acec-4232-b6e0-348ece09b392'

    )
  }


  handleSubmit() {
    let {xmpp} = this.props
    //console.log('yay', this.props)
    xmpp.login(this.state.username, this.state.password)
  }

  componentWillReceiveProps(nextProps) {

    if(this.props.chat.user !== nextProps.chat.user) {
      console.log('changing screen route')
      // this.props.navigation.navigate('JobList',{name:'job list'})
      //this.props.navigation.navigate('Messenger',{title:'chatting with',user: {publicKey: 'b2bea690-65d0-4b4a-93b9-d9bbec9cd6c2'}})
      this.props.navigation.navigate('Messenger',{title:'chatting with',user: {publicKey: 'z.dev'}})
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#FFF"
              style={styles.input}
              onChangeText={t => this.setState({username:t})}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              placeholderTextColor="#FFF"
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              onChangeText={p => this.setState({password:p})}
            />
          </View>
          <TouchableOpacity onPress={this.handleSubmit} activeOpacity={.5}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableOpacity>

          <View>
            <Text>
              f.dev || qweqwe
            </Text>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});

const mapStateToProps = (store,ownProps) => {
  return {
    chat: store.chat
  }
}

const mapDispatchToProps= (dispatch,ownProps) => {
  return {
    login: (user) => dispatch({type:'LOGIN_SUCCESS',payload: user.username})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
