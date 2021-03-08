import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Alert,
	TextInput,
	Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CheckBox } from "react-native-elements";
import { Button } from "react-native-elements";
import { Divider } from "react-native-elements";
import {
	createSwitchNavigator,
	createAppContainer,
	NavigationActions,
	ScrollView
} from "react-navigation";
import { Colors } from "../../Helpers/Colors";
import {
	getProfileData,
	getUserData,
	storeProfileData,
	storeUserData
} from "../../Helpers/Utils";

const Colors = {
	PRIMARY: "#1abc9c",
	WHITE: "#ffffff",
	GREEN: "#0da935",
	LIGHTGRAY: "#C7C7C7",
	DARKGRAY: "#5E5E5E",
	CGRAY: "#33393c",
	PURPLE: "#6659b6",
	BLUE: "#25a8df",
	LIGHTERGRAY: "#dbdbdb",
	ALMOSTWHITE: "#f0f0f0",
	ERROR: "#f21818"
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		backgroundColor: Colors.WHITE,
		paddingLeft: 0,
		paddingRight: 0
	},
	formContainer: {
		paddingLeft: 20,
		paddingRight: 20,
		flex: 1
	},
	inputStyle: {
		paddingBottom: 16
	},
	innerContaner: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "stretch",
		backgroundColor: Colors.WHITE,
		maxHeight: "80%"
	},
	bottomView: {
		flex: 1,
		justifyContent: "flex-end",
		height: "20%",
		alignContent: "center",
		marginBottom: 20
	},
	bottomButton: {
		alignSelf: "center"
	},
	welcome: {
		textAlign: "center"
	},
	header: {
		backgroundColor: Colors.LIGHTERGRAY,
		height: 80,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		flex: 1,
		maxHeight: 80
	},
	headerText: {
		fontFamily: "OpenSans-SemiBold",
		fontSize: 18
	},
	lightText: {
		fontSize: 16,
		fontFamily: "OpenSans-Light",
		color: Colors.DARKGRAY,
		top: 20,
		textAlign: "center",
		width: "90%",
		alignSelf: "center",
		paddingBottom: 60
	},
	value: {
		fontFamily: "OpenSans-Light",
		paddingTop: 5
	},
	hyperlink: {
		color: "blue",
		fontFamily: "OpenSans-Light",
		fontSize: 15,
		textDecorationLine: "underline"
	},
	checkboxContainer: {
		flex: 1,
		flexDirection: "row",
		maxWidth: "80%",
		marginBottom: 20,
		justifyContent: "flex-start"
	},
	checkboxInnerContainer: {
		justifyContent: "flex-start",
		paddingTop: 0
	},
	buttonContainer: {
		marginTop: 20,
		marginBottom: 40,

		height: 64
	},
	buttonStyle: {
		height: 64,
		backgroundColor: Colors.PURPLE,
		paddingTop: 16,
		paddingBottom: 16
	},
	divider: {
		height: 20,
		flex: 1
	}
});

class Register extends Component {
  state = {
		show: false,
		usernameValue: "",
		usernameErrorDisplay: false,
		usernameError: "",
    addressValue: "",
		addressErrorDisplay: false,
		addressError: "",
		mobileValue: "",
		mobileErrorDisplay: false,
		mobileError: "",
		emailValue: "",
		emailErrorDisplay: false,
		emailError: "",
		termsCheckValue: false,
		gdpaValue: false,
		receiveNewsValue: false,
		buttonDisabled: true,
		gpdaColor: Colors.PURPLE,
		termsColor: Colors.PURPLE,
		type: "registration"
  }

  componentDidMount() {
    const { navigation } = this.props;
		this.setState({ type: navigation.getParam("type", "registration") });

		getProfileData()
			.then(value => {
				if (value === null) {
					// do nothing //
				} else {
					let parsedProfileData = JSON.parse(value);

					this.setState({
						usernameValue: parsedProfileData.info.username,
            addressValue: parsedProfileData.info.Address,
						mobileValue: parsedProfileData.info.telephone,
						emailValue: parsedProfileData.info.email
					});
				}
			})
			.catch(error => {
				console.log("error: ", error);
			});
  }

  show =  mode => {
    this.setState({
      show: true,
      mode
    });
  };

  makeAPICall = () => {
		console.log("send data");
		let result = this._validateFields();
		if (result === true) {
			if (this.state.type === "registration") {
				let _data = {};
				console.log("make api call...");
			} else {
			}
		}
	};

  _validateFields() {
    let result = true;
    this._resetForm();
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var regAddress = /^[a-zA-Z]+ [a-zA-Z]+$/;
		var reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var mobile = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;

    if (regname.test(this.state.usernameValue) === false) {
      result = false;
      this.setState({ nameError: Lang.Register.usernameError});
    }

    if (regAddress.test(this.state.addressValue) === false) {
      result = false;
      this.setState({ addressError: Lang.Register.addressError})
    }

    if (reMail.test(this.state.emailValue) === false) {
			result = false;
			this.setState({ emailError: Lang.RegisterForm.emailError });
		}

		if (mobile.test(this.state.mobileValue) === false) {
			result = false;
			this.setState({ mobileError: Lang.RegisterForm.mobileError });
		}

    if (
			this.state.termsCheckValue === false &&
			this.state.type !== "edit"
		) {
			this.setState({ termsColor: Colors.ERROR });
			result = false;
		}

		if (this.state.gdpaValue === false && this.state.type !== "edit") {
			this.setState({ gpdaColor: Colors.ERROR });
			result = false;
		}

    return result;
  }



  _resetForm(){
    this.setState({
      usernameError: " ",
      addressError: " ",
      emailError: " ",
      termsColor: Colors.PURPLE,
			gpdaColor: Colors.PURPLE
    });
  }

  _getTitle() {
		if (this.state.type === "edit") {
			return Lang.RegisterForm.headerTitleEdit;
		} else {
			return Lang.RegisterForm.headerTitle;
		}
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.header}>
						<Text style={styles.headerText}>
							{this._getTitle()}
						</Text>
					</View>
          <Text style={styles.lightText}>
						{Lang.RegisterForm.lightText}
					</Text>
          <View style={styles.formContainer}>
          <Input
							containerStyle={styles.inputStyle}
							placeholder={Lang.RegisterForm.username}
							errorMessage={this.state.usernameError}
							displayError={this.state.usernameErrorDisplay}
							onChangeText={text =>
								this.setState({ usernameValue: text })
							}
							value={this.state.usernameValue}
						/>
            <Input
							containerStyle={styles.inputStyle}
							placeholder={Lang.RegisterForm.Address}
							errorMessage={this.state.addressError}
							displayError={this.state.addressErrorDisplay}
							onChangeText={text =>
								this.setState({ nameValue: text })
							}
							value={this.state.addressValue}
						/>
            <Input
							containerStyle={styles.inputStyle}
							placeholder={Lang.RegisterForm.mobile}
							errorMessage={this.state.mobileError}
							displayError={this.state.nameErrorDisplay}
							onChangeText={text =>
								this.state.setState({ mobileValue: text })
							}
							value={this.state.mobileValue}
						/>
           <Input
							containerStyle={styles.inputStyle}
							placeholder={Lang.RegisterForm.email}
							errorMessage={this.state.emailError}
							displayError={this.state.nameErrorDisplay}
							onChangeText={text =>
								this.state.setState({ emailValue: text })
							}
							value={this.state.emailValue}
						/>
            <View style={styles.divider} />
            {this.state.type !== "edit" && (
							<View style={styles.checkboxContainer}>
								<CheckBox
									iconType="material"
									uncheckedIcon={"check-box-outline-blank"}
									checkedIcon={"check-box"}
									checkedColor={Colors.PURPLE}
									uncheckedColor={this.state.termsColor}
									containerStyle={
										styles.checkboxInnerContainer
									}
									checked={this.state.termsCheckValue}
									onPress={() =>
										this.setState({
											termsCheckValue: !this.state
												.termsCheckValue
										})
									}
								/>
								<Text
									style={[styles.value, styles.hyperlink]}
									onPress={this._navigateToTerms}
								>
									{Lang.RegisterForm.terms}
								</Text>
							</View>
						)}
						{this.state.type !== "edit" && (
							<View style={styles.checkboxContainer}>
								<CheckBox
									iconType="material"
									uncheckedIcon={"check-box-outline-blank"}
									checkedIcon={"check-box"}
									checkedColor={Colors.PURPLE}
									uncheckedColor={this.state.gpdaColor}
									containerStyle={
										styles.checkboxInnerContainer
									}
									checked={this.state.gdpaValue}
									onPress={() =>
										this.setState({
											gdpaValue: !this.state.gdpaValue
										})
									}
								/>
								<Text
									style={[styles.value, styles.hyperlink]}
									onPress={this._navigateToTerms}
								>
									{Lang.RegisterForm.GDPA}
								</Text>
							</View>
						)}
						{this.state.type !== "edit" && (
							<View style={styles.checkboxContainer}>
								<CheckBox
									iconType="material"
									uncheckedIcon={"check-box-outline-blank"}
									checkedIcon={"check-box"}
									containerStyle={
										styles.checkboxInnerContainer
									}
									checkedColor={Colors.PURPLE}
									uncheckedColor={Colors.PURPLE}
									checked={this.state.receiveNewsValue}
									onPress={() =>
										this.setState({
											receiveNewsValue: !this.state
												.receiveNewsValue
										})
									}
								/>
								<Text
									style={[styles.value, styles.hyperlink]}
									onPress={this._navigateToTerms}
								>
									{Lang.RegisterForm.receiveNews}
								</Text>
							</View>
						)}
            <Button
							buttonStyle={styles.buttonStyle}
							containerStyle={styles.buttonContainer}
							title={Lang.RegisterForm.send}
							onPress={this.makeAPICall}
						/>
          </View>
      </ScrollView>
    )
  }
}

export default Register;