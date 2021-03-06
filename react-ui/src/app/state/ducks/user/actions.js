import axios from 'axios'
import _ from 'lodash'
import * as types from './types'
import { getAllUsers, getUserById } from './selectors'
// const validateStatus = (status) => status >= 200 && status < 300; // default

const ROOT_URL = '/api/users';

export function fetchUser(id) {
  return (dispatch, getState) => {
    const currState = getState();
    if (shouldUpdateUser(currState, id)) {
      dispatch({type: types.GET_USER});
      axios.get(`${ROOT_URL}/${id}`)
      .then(
        ({ data }) => {
          const list = getState().user.userList;
          const user = addLastUpdated(data);
          console.log("DATA", data);
          console.log("USER", user);
          const newList = insertItemInList(list, user);
          dispatch({ type: types.GET_USER_SUCCESS, payload: { list: newList, user }})
        },
        ({ response, message }) => dispatch({
          type: types.GET_USER_FAILURE,
          payload: (response) ? response.data : message
        })
      )
    // } else if (!currState.user.user || (currState.user.user._id !== id)) {
    //     const currUser = getUserById(currState, id);
    //     dispatch({ type: types.SET_CURR_USER, payload: addLastUpdated(currUser) })
    }
  }
}

export function fetchUserList() {
  return (dispatch, getState) => {
    if (shouldUpdateUserList(getState())) {
      dispatch({type: types.GET_USER_LIST})
      axios.get(ROOT_URL)
      .then(
        ({ data }) => dispatch({ type: types.GET_USER_LIST_SUCCESS, payload: {userList:addLastUpdatedList(data), lastUpdated: new Date().getTime()} }),
        ({ response, message }) =>
          dispatch({
            type: types.GET_USER_LIST_FAILURE,
            payload: (response) ? response.data : message
          })
      );
    }
  }
}

export function updateUser(user) {
  return (dispatch, getState) => {
    dispatch({type: types.UPDATE_USER})
    const token = localStorage.getItem('jwtToken');
    axios({
      method: 'put',
      url: `${ROOT_URL}/${user._id}`,
      data: user,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(
      ({ data }) => {
        const list = getState().user.userList;
        const user = addLastUpdated(data);
        const newList = insertItemInList(list, user);
        dispatch({ type: types.UPDATE_USER_SUCCESS, payload: { list: newList, user }})
      },
      ({ response, message }) =>
        dispatch({
          type: types.UPDATE_USER_FAILURE,
          payload: (response) ? response.data : message
        })
      );
    }
  }

export function addUser(user) {
  return dispatch => {
    dispatch({type: types.ADD_USER})
    const token = localStorage.getItem('jwtToken');

    axios({
      method: 'post',
      url: ROOT_URL,
      data: user,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(
        ({ data }) => dispatch({ type: types.ADD_USER_SUCCESS, payload: addLastUpdated(data)}),
        ({ response, message }) =>
          dispatch({
            type: types.ADD_USER_FAILURE,
            payload: (response) ? response.data : message
          })
      );
  }
}

export function addUserGroup(user, id) {
  return dispatch => {
    dispatch({type: types.ADD_USER_GROUP})
    const token = localStorage.getItem('jwtToken');

    axios({
      method: 'post',
      url: `${ROOT_URL}/${id}/groups`,
      data: user,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(
        ({ data }) => {
          console.log("new group added", data);
          dispatch({ type: types.ADD_USER_GROUP_SUCCESS, payload: addLastUpdated(data) })
        },
        ({ response, message }) =>
          dispatch({
            type: types.ADD_USER_GROUP_FAILURE,
            payload: (response) ? response.data : message
          })
      );
  }
}
export function addUserReview(review) {
  return (dispatch, getState) => {
    const state = getState();
    const reviewMeta = { author: state.auth.id, subject: state.user.user._id}
    const newReview = { ...review, ...reviewMeta };

    dispatch({type: types.ADD_USER_REVIEW})
    const token = localStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: `/api/reviews/users/`,
      data: newReview,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(
        ({ data }) => dispatch({ type: types.ADD_USER_REVIEW_SUCCESS, payload: addLastUpdated(data) }),
        ({ response, message }) =>
          dispatch({
            type: types.ADD_USER_REVIEW_FAILURE,
            payload: (response) ? response.data : message
          })
      );
  }
}

// Add option to manually refresh items
const shouldUpdateUser = (state, id) => {
  const user = getUserById(state, id);
  if (!user || isStale(user.lastUpdated))
    return true

  if (!state.user.user || (state.user.user._id !== id))
    return true

  if (state.user.loading)
    return false
  // return users.didInvalidate
  return false;
}

const shouldUpdateUserList = (state, id) => {
  const list = getAllUsers(state);
  if (!list || !state.user.lastUpdated || !isStale(list.lastUpdated))
    return true

  return false;
}

  // if (state.user.loading) return false
  // return users.didInvalidate

// Check if last updated was more than 5 minutes ago
const isStale = (lastUpdated) => {
  var timeDiff = Math.abs(lastUpdated - new Date().getTime());
  return timeDiff > 300000;
}

const addLastUpdated = (item) => {
  return {...item, lastUpdated: new Date().getTime()};
}
// We want to add last updated to each field AND to the userList itself
const addLastUpdatedList = (list) => {
  return list.map( (item) => addLastUpdated(item));
}

const insertItemInList = (list, item) => {
  let newList = (list) ? list.slice() : [];
  const newItem = {...item};
  const index = _.findIndex(newList, ['_id', newItem._id]);
  if (index !== -1 ) {
    newList = newList.splice(index, 1, newItem);
  } else {
    newList.push(newItem);
  }
  return newList;
}
