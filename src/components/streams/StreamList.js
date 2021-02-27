import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';


class StreamList extends Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/stream/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/stream/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div >
            );
        }
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to='/stream/create' className="ui button primary">Create Stream</Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map((streams) => {
            return (<div className="item" key={streams.id}>
                {this.renderAdmin(streams)}

                <i className="large middle aligned icon camera"></i>
                <div className="content">
                    <Link to={`/stream/${streams.id}`} className='header'>
                        {streams.title}
                    </Link>
                    <div className="description">{streams.description}</div>

                </div>
            </div>);
        })
    }

    render() {
        return (<div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {this.renderList()}

            </div>
            {this.renderCreate()}
        </div>);
    }

}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.authReducer.userId,
        isSignedIn: state.authReducer.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);