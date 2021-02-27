import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';


class StreamView extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }
    componentDidUpdate() {
        this.buildPlayer();
    }
    componentWillUnmount() {
        this.flvPlayer.destroy();
    }
    buildPlayer() {
        if (this.flvPlayer || !this.props.stream) {
            return;
        }
        const { id } = this.props.match.params

        this.flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();

    }
    renderContent() {

        if (!this.props.stream)
            return <div>Loading.....</div>
        return (
            <div>
                <video
                    ref={this.videoRef}
                    style={{ width: "100%" }}
                    controls
                ></video>
                <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5>
            </div>
        )
    }

    render() {

        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, { fetchStream })(StreamView);