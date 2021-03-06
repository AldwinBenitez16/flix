import * as actionTypes from './actionTypes';
import axios, { apiKey } from '../../shared/Axios/axios';
import authAxios from '../../shared/Axios/authAxios';

const fetchTokenStart = () => {
    return {
        type: actionTypes.FETCH_TOKEN
    };
}; 

const fetchTokenSuccess = (data) => {
    return {
        type: actionTypes.FETCH_TOKEN_SUCCESS,
        data
    };
}; 

const fetchTokenFail = (error) => {
    return {
        type: actionTypes.FETCH_TOKEN_FAIL,
        error
    };
}; 

export const fetchToken = () => {
    return dispatch => {
        dispatch(fetchTokenStart());
        axios.get(`/authentication/token/new?api_key=${apiKey}`)
            .then(res => {
                dispatch(fetchTokenSuccess({
                    expires_at: res.data.expires_at, 
                    request_token: res.data.request_token
                }));
            })
            .catch(err => {
                dispatch(fetchTokenFail(err));
            });
    }
};

const fetchSessionIdStart = () => {
    return {
        type: actionTypes.FETCH_SESSION_ID
    };
};

const fetchSessionIdSuccess = (data) => {
    return {
        type: actionTypes.FETCH_SESSION_ID_SUCCESS,
        data
    };
};

const fetchSessionIdFail = (error) => {
    return {
        type: actionTypes.FETCH_SESSION_ID_FAIL,
        error
    };
};

export const fetchSessionIdFinal = (token, username) => {
    return dispatch => {
        dispatch(fetchSessionIdStart)
        axios({
            url: `/authentication/session/new?api_key=${apiKey}`, 
            method: 'post',
            data: {
                request_token: token
            }
        })
            .then(res => {
                const data = {
                    session_id: res.data.session_id,
                    username
                };
                dispatch(fetchSessionIdSuccess(data));
            })
            .catch(error => {
                dispatch(fetchSessionIdFail(error));
            });
    };
};

export const fetchSessionId = (token, username, password) => {
    return dispatch => {
        const loginData = {
            username,
            password,
            request_token: token
        };
        authAxios({
            url: `/authentication/token/validate_with_login?api_key=${apiKey}`, 
            method: 'post',
            data: loginData
        })
            .then(res => {
                dispatch(fetchSessionIdFinal(token, username));
            })
            .catch(error => {
                dispatch(fetchSessionIdFail(error));
            });
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};

const fetchGuestSessionIDStart = () => {
    return {
        type: actionTypes.FETCH_GUEST_SESSION_ID
    };
};

const fetchGuestSessionIDSuccess = (data) => {
    return {
        type: actionTypes.FETCH_GUEST_SESSION_ID_SUCCESS,
        data
    };
};

const fetchGuestSessionIDFail = (error) => {
    return {
        type: actionTypes.FETCH_GUEST_SESSION_ID_FAIL,
        error
    };
};

export const fetchGuestSessionID = () => {
    return dispatch => {
        dispatch(fetchGuestSessionIDStart());
        axios.get(`/authentication/guest_session/new?api_key=${apiKey}`)
            .then(res => {
                console.log();
                let data = {
                    guest_session_id: res.data.guest_session_id,
                    expires_at: res.data.expires_at
                };
                dispatch(fetchGuestSessionIDSuccess(data));
            })
            .catch(err => {
                dispatch(fetchGuestSessionIDFail(err));
            });
    };
};


