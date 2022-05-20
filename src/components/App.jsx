import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './App.module.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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
            <ContactList contacts={contacts} filter={filterNormalized} />
          </>
        )}
      </div>
    );
  }
}

export default App;
