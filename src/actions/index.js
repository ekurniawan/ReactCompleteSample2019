import streams from '../apis/streams';
import {
    SIGN_IN,SIGN_OUT,CREATE_STREAM,FETCH_STREAMS,
    FETCH_STREAM,DELETE_STREAM,EDIT_STREAM} from './types';
import history from '../history';

export const signIn = (userId)=>{
    return {
        type:SIGN_IN,
        payload:userId
    };
};

export const signOut = ()=>{
    return {
        type:SIGN_OUT
    }
};

export const createStream = formValues => async (dispatch,getState) => {
    const {userId} = getState().auth;
    const response = await streams.post('/api/streams',{...formValues,userId});
    dispatch({type:CREATE_STREAM,payload:response.data});
    history.push('/');
};


export const fetchStreams = () => async dispatch =>{
    const response = await streams.get('/api/streams');
    dispatch({type:FETCH_STREAMS,payload:response.data});
};

export const fetchStream = (id) => async dispatch=>{
    const response = await streams.get(`/api/streams/${id}`);
    dispatch({type:FETCH_STREAM,payload:response.data});
};

export const editStream = (id,formValue) => async dispatch => {
    const response = await streams.put(`/api/streams/${id}`,formValue);
    dispatch({type:EDIT_STREAM,payload:response.data});
    history.push('/');
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/api/streams/${id}`);
    dispatch({type:DELETE_STREAM,payload:id});
    history.push('/');
};