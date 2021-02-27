import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';



class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                scope: 'email'
            }).then((success) => {

                this.auth = window.gapi.auth2.getAuthInstance();
                this.authState(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.authState);

            })
        });
    }

    authState = (isSignedIn) => {
        if (isSignedIn)
            this.props.signIn(this.auth.currentUser.get().getId());
        else
            this.props.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderButton() {
        if (this.props.isSignedIn == null)
            return null;
        else if (this.props.isSignedIn) {
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
        return <div>{this.renderButton()}</div>;
    }


}

const mapStateToProps = state => {
    return {
        isSignedIn: state.authReducer.isSignedIn
    };

};


export default connect(mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);