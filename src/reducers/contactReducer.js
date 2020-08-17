// contactReducer.js
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pending: false,
    contacts: [],
    error: null
}


export default (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_CONTACTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                pending: false,
                contacts: action.contacts
            }
        case actionTypes.FETCH_CONTACTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        // .....
        case actionTypes.POST_CONTACT_PENDING:
            return {
                ...state,
                postPending: true
            }
        case actionTypes.POST_CONTACT_SUCCESS:
            return {
                ...state,
                postPending: false,
                contact: action.contact
            }
        case actionTypes.POST_CONTACT_ERROR:
            return {
                ...state,
                postPending: false,
                postError: action.error
            }

        // .....
        case actionTypes.POST_DELETE_CONTACT_PENDING:
            return {
                ...state,
                postDeletePending: true
            }
        case actionTypes.POST_DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                postDeletePending: false,
                deletedContactId: action.contactId
            }
        case actionTypes.POST_DELETE_CONTACT_ERROR:
            return {
                ...state,
                postDeletePending: false,
                postError: action.error
            }

        default:
            return state
    }
};
export const getContacts = state => state.contacts;
export const getContactsPending = state => state.pending;
export const getContactsError = state => state.error;
// .....
export const postContact = state => state.contact;
export const postContactPending = state => state.postPending;
export const postContactError = state => state.postError;
// .....
export const postDeleteContact = state => state.contactId;
export const postDeleteContactPending = state => state.postDeletePending;
export const postDeleteContactError = state => state.postDeleteError;