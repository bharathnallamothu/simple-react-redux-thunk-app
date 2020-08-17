import React, { Component } from 'react';
import { Table, Button, Icon, Image, Modal, Form, Input, TextArea, Loader, Segment } from 'semantic-ui-react';
import equal from 'fast-deep-equal';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import fetchContacts from '../actions/fetchContacts';
import { getContactsError, getContacts, getContactsPending } from '../reducers/contactReducer';


const initialState = {
    _id: '',
    firstName: '',
    lastName: '',
    address: '',
    imageUrl: ''
};
class ContactList extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
        this.state = {
            modelStatus: false
        }
    }

    async componentDidMount() {
        await this.props.fetchContacts();
    }

    shouldComponentRender() {
        const { pending } = this.props;
        if (this.pending === false) return false;
        return true;
    }
    state = initialState;


    handleSubmit = async (event) => {
        event.preventDefault();
        await this.props.postContact(this.state);
        this.setState(initialState);
        this.changeModelStatus(false);
        await this.props.fetchContacts();
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    };
    handleRemoveClick = async (contactId) => {

        await this.props.deleteContact(contactId)
        await this.props.fetchContacts();
    };
    handleEditClick = async (contactId) => {
        let contactsArray = this.props.contacts.contacts;
        this.setState(contactsArray.find(contact => contact._id == contactId))
        this.changeModelStatus(true);

    };
    changeModelStatus = (flag) => {
        this.setState({ modelStatus: flag })
    }
    render() {
        const { contacts, error, pending } = this.props;
        const { firstName, lastName, address, imageUrl } = this.state;
        if (!this.shouldComponentRender()) return (
            <Segment>
                <Loader active />
            </Segment>
        )
        return (
            <React.Fragment>

                <Table celled compact definition>
                    <Table.Header fullWidth>
                        <Table.Row>
                            {/* <Table.HeaderCell /> */}
                            <Table.HeaderCell>My Contact Book</Table.HeaderCell>
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell>
                                <Modal
                                    closeIcon
                                    size={'mini'}
                                    onClose={() => this.changeModelStatus(false)}
                                    onOpen={() => this.changeModelStatus(true)}
                                    open={this.state.modelStatus}
                                    trigger={<Button>Show Modal</Button>}
                                >
                                    <Modal.Header>Add Contact</Modal.Header>
                                    <Modal.Content >
                                        <Form onSubmit={this.handleSubmit}>
                                            {/* <Form.Group widths='equal'> */}
                                            <Form.Field
                                                name='firstName'
                                                value={this.state.firstName}
                                                onChange={this.handleChange}
                                                control={Input}
                                                label='First name'
                                                placeholder='First name'
                                            />
                                            <Form.Field
                                                name='lastName'
                                                value={this.state.lastName}
                                                onChange={this.handleChange}
                                                control={Input}
                                                label='Last name'
                                                placeholder='Last name'
                                            />
                                            {/* </Form.Group> */}
                                            <Form.Field
                                                name='address'
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                control={TextArea}
                                                label='Address'
                                                placeholder='Enter your address'
                                            />
                                            <Form.Field>
                                                <label>Image</label>
                                                <Input name='imageUrl' onChange={this.handleChange} type={'file'} icon='file' />
                                            </Form.Field>
                                            <Button primary type='submit'>Save</Button>
                                        </Form>
                                    </Modal.Content>
                                </Modal>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>#</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {contacts.contacts.map((contact, index) => {
                            return (
                                <Table.Row key={contact._id}>
                                    <Table.Cell><Image size={'tiny'} avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' /></Table.Cell>
                                    <Table.Cell>{contact.firstName}</Table.Cell>
                                    <Table.Cell>{contact.lastName}</Table.Cell>
                                    <Table.Cell>{contact.address}</Table.Cell>
                                    <Table.Cell> <Button basic color='blue' onClick={() => this.handleEditClick(contact._id)}
                                        data-contact-id={contact.id}>
                                        <Icon name='external alternate' />
                                    </Button></Table.Cell>
                                    <Table.Cell> <Button basic color='red' onClick={() => this.handleRemoveClick(contact._id)}
                                        data-contact-id={contact.id}>
                                        <Icon name='x' />
                                    </Button></Table.Cell>

                                </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
            </React.Fragment>
        );

    }
}

const mapStateToProps = state => ({
    error: getContactsError(state),
    contacts: getContacts(state),
    pending: getContactsPending(state)
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchContacts: fetchContacts.fetchContactsAction,
    postContact: contact => fetchContacts.PostContactsAction(contact),
    deleteContact: contactId => fetchContacts.deleteContactAction(contactId)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);