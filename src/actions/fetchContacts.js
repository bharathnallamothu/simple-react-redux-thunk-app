import {
    fetchContactsPending, fetchContactsSuccess, fetchContactsError,
    postContactPending, postContactSuccess, postContactError,
    postDeleteContactPending, postDeleteContactSuccess, postDeleteContactError
} from './contactAction';
export default {
    fetchContactsAction: () => {
        return dispatch => {
            dispatch(fetchContactsPending());
            fetch('http://localhost:3001/contacts')
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        throw (res.error);
                    }
                    dispatch(fetchContactsSuccess(res));
                    return res;
                })
                .catch(error => {
                    dispatch(fetchContactsError(error));
                })
        }
    },
    PostContactsAction: (contact) => {
        return dispatch => {
            dispatch(postContactPending());
            fetch('http://localhost:3001/contacts', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        throw (res.error);
                    }
                    dispatch(postContactSuccess(res));
                    return res;
                })
                .catch(error => {
                    dispatch(postContactError(error));
                    return error;
                })
        }
    },
    deleteContactAction: (contactId) => {
        return dispatch => {
            dispatch(postDeleteContactPending());
            fetch('http://localhost:3001/contacts/' + contactId, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        throw (res.error);
                    }
                    dispatch(postDeleteContactSuccess(res));
                    return res;
                })
                .catch(error => {
                    dispatch(postDeleteContactError(error));
                    return error;
                })
        }
    }

}
