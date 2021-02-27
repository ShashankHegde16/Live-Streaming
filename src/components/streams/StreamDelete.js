import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Model from '../model';
import history from '../../history';

class StreamDelete extends Component {


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchStream(id);
    }

    onDismiss = () => {
        history.push('/')
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id);
    }

    renderActions() {
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={this.onDelete} >Delete</button>
                <Link className="ui button" to="/">Cancel</Link>
            </React.Fragment>);
    }
    renderContent() {
        if (!this.props.stream)
            return "Are you want to delete this stream?";
        return `Are you want to delete the stream with title: ${this.props.stream.title}`;
    }
    render() {

        return (
            <Model
                title="Delete Stream"
                content={this.renderContent()}
                action={this.renderActions()}
                onDismiss={this.onDismiss}
            />
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);