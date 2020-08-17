// contactAction.js

import * as actionTypes from './actionTypes';
// ............

export const fetchContactsPending = () => {
  return {
    type: actionTypes.FETCH_CONTACTS_PENDING
  }
}

export const fetchContactsSuccess = (contacts) => {
  return {
    type: actionTypes.FETCH_CONTACTS_SUCCESS,
    contacts: contacts
  }
}

export const fetchContactsError = (error) => {
  return {
    type: actionTypes.FETCH_CONTACTS_ERROR,
    error: error
  }
}
// ....
export const postContactPending = () => {
  return {
    type: actionTypes.POST_CONTACT_PENDING
  }
}
export const postContactSuccess = (contact) => {
  return {
    type: actionTypes.POST_CONTACT_SUCCESS,
    contact: contact
  }
}
export const postContactError = (error) => {
  return {
    type: actionTypes.POST_CONTACT_ERROR,
    error: error
  }
}
// ....
export const postDeleteContactPending = () => {
  return {
    type: actionTypes.POST_DELETE_CONTACT_PENDING
  }
}
export const postDeleteContactSuccess = (contactId) => {
  return {
    type: actionTypes.POST_DELETE_CONTACT_SUCCESS,
    contactId: contactId
  }
}
export const postDeleteContactError = (error) => {
  return {
    type: actionTypes.POST_DELETE_CONTACT_ERROR,
    error: error
  }
}