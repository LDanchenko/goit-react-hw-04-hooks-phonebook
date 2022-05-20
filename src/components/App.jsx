import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './App.module.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (name, number) => {
    this.setState(prevState => {
      const id = nanoid();
      return {
        contacts: [...prevState.contacts, { id, name, number }],
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterNormalized = filter.toLowerCase();
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
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
