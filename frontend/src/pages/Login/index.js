import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input, LoginBox, LoginWrapper, Content, RegisterWrapper, Register } from './style';
import { actionCreators } from './store/index';

class Login extends Component {
    render(){
        const { loginStatus } = this.props;
        var storage=window.localStorage;
        var Islogin = storage.getItem("Islogin");

        if (Islogin === "Notlogin") {
            return(
                <LoginWrapper>
                    <LoginBox>
                        <Content className="Title">Blendz Login</Content>
                        <Input placeholder="Email" ref={(input) => {this.email = input}}/>
                        <Input placeholder="Password" type='password' ref={(input) => {this.password = input}}/>
                        <Button onClick={() => this.props.login(this.email, this.password)}>Login</Button>
                        <RegisterWrapper><Register href="/register">Register</Register></RegisterWrapper>
                        <RegisterWrapper><Register href="/resetpassword">Forgot password?</Register></RegisterWrapper>
                    </LoginBox>
                </LoginWrapper>
            )
        }else{
            return <Redirect to='/'/>
        }
    }
    componentDidMount(){
        var storage=window.localStorage;
        storage.setItem("Islogin", "Notlogin");
        storage.setItem("UID", "null");
    }
}

const mapState = (state) => ({
    loginStatus: state.get('login').get('login')
});

const mapDispatch = (dispatch) => ({
    login(emailElem, passwordELEM){
        dispatch(actionCreators.log_in(emailElem.value, passwordELEM.value));
    }
});

export default connect(mapState, mapDispatch)(Login);