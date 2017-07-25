import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const ADD_USER_GROUP = 'ADD_USER_GROUP';
export const ADD_USER_GROUP_SUCCESS = 'ADD_USER_GROUP_SUCCESS';
export const ADD_USER_GROUP_FAILURE = 'ADD_USER_GROUP_FAILURE';
export const ADD_REVIEW = 'ADD_REVIEW';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE';


// const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
const ROOT_URL = '/api';

export function loginUser(user) {
  return {
    type: USER_LOGIN,
    payload: { user: user, isAuth: true }
  }
}

// NOTE: Not a pure function -- removes JWT
export function logoutUser() {
  localStorage.removeItem('jwtToken');
  return {
    type: USER_LOGOUT,
    payload: {user: null, token: null, isAuth: false}
  }
}

export function meFromToken(tokenFromStorage) {
  //check if the token is still valid, if so, get me from the server
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/users/me/from/token?token=${tokenFromStorage}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ME_FROM_TOKEN,
    payload: request
  };
}

export function meFromTokenSuccess(currentUser, token) {
  localStorage.setItem('jwtToken', token)
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  localStorage.removeItem('jwtToken');
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}
export function updateUser(updates, id) {
  const token = localStorage.getItem('jwtToken');

  const request = axios({
    method: 'put',
    url: `${ROOT_URL}/users/${id}?token=${token}`,
    data: updates,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: UPDATE_USER,
    payload: request
  };
}

export function updateUserSuccess(user) {
  console.log('USER update success', user);
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user
  };
}

export function updateUserFailure(error) {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error
  };
}

export function addUserGroup(group, id) {
  const token = localStorage.getItem('jwtToken');
  //check if the token is still valid, if so, get me from the server
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}/users/${id}/groups`,
    data: group,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: ADD_USER_GROUP,
    payload: request
  };
}

export function addUserGroupSuccess(group) {
  return {
    type: ADD_USER_GROUP_SUCCESS,
    payload: group
  };
}

export function addUserGroupFailure(error) {
  return {
    type: ADD_USER_GROUP_FAILURE,
    payload: error
  };
}

export function addReview(review, id) {
  const token = localStorage.getItem('jwtToken');
  //check if the token is still valid, if so, get me from the server
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}/reviews/${id}`,
    data: review,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: ADD_REVIEW,
    payload: request
  };
}

export function addReviewSuccess(review) {
  return {
    type: ADD_REVIEW_SUCCESS,
    payload: review
  };
}

export function addReviewFailure(error) {
  return {
    type: ADD_REVIEW_FAILURE,
    payload: error
  };
}
