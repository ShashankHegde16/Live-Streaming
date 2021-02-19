import React, { Component } from 'react';
import google from '../assets/google.svg';



class GoogleAuth extends Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                scope: 'email'
            }).then((success) => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.auth.isSignedIn.listen(this.authState);

            })
        });
    }

    authState = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderButton() {
        if (this.state.isSignedIn === null)
            return null;
        else if (this.state.isSignedIn) {
            return (
                <button className='ui red google button' onClick={this.onSignOutClick}>
                    <i className="google icon"></i>
                    Sign Out</button>);
        }
        else {
            return (
                <button className='ui green google button' onClick={this.onSignInClick}>
                    <i className="google icon"></i>
                    Sign In</button>)
        }
    }

    render() {
        return (
            <div>

                {this.renderButton()}
            </div>);
    }


}


export default GoogleAuth;