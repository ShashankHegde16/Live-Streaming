import history from '../history';

import streams from "../apis/streams";
export const signIn = (userId) => {
    return {
        type: 'SIGN_IN',
        payload: userId
    };
}


export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
}

export const createStream = (formObject) => async (dispatch, getState) => {
    console.log('called')
    const { userId } = getState().authReducer;
    const response = await streams.post('/streams', { ...formObject, userId });
    dispatch({ type: 'CREATE_STREAM', payload: response.data });
    history.push('/')
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({ type: 'FETCH_STREAMS', payload: response.data });
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: 'FETCH_STREAM', payload: response.data });
}


export const editStream = (id, formObject) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formObject);
    dispatch({ type: 'EDIT_STREAM', payload: response.data });
    history.push('/');
}

export const deleteStream = (id) => async dispatch => {
    const response = await streams.delete(`/streams/${id}`);
    dispatch({ type: 'DELETE_STREAM', payload: id });
    history.push('/');
}