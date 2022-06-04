import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './App.module.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

const CONTACTS_LIST = 'contactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS_LIST, JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem(CONTACTS_LIST);
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  addContact = (name, number) => {
    const nameNormalized = name.toLowerCase();
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === nameNormalized
      )
    ) {
      alert(name + ' is already in the contacts.');
    } else {
      this.setState(prevState => {
        const id = nanoid();
        return {
          contacts: [...prevState.contacts, { id, name, number }],
        };
      });
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filterNormalized = filter.toLowerCase();
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <>
            <Filter
              value={this.state.filter}
              onChange={this.handleInputChange}
            />
            <ContactList
              contacts={contacts}
              filter={filterNormalized}
              onDeleteItem={this.deleteContact}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
