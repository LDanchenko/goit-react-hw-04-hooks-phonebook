import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './App.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  numberId = nanoid();
  nameId = nanoid();

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(prevState => {
      const id = nanoid();
      return {
        contacts: [
          ...prevState.contacts,
          { id, name: this.state.name, number: this.state.number },
        ],
      };
    });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { contacts, name, number } = this.state;

    return (
      <div className={style.container}>
        <h2>Phonebook</h2>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor={this.nameId}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id={this.nameId}
            value={name}
            className={style.input}
            onChange={this.handleInputChange('name')}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label className={style.label} htmlFor={this.numberId}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            value={number}
            id={this.numberId}
            className={style.input}
            onChange={this.handleInputChange('number')}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button className={style.button} type="submit">
            Add contact
          </button>
        </form>
        <h2>Contacts</h2>
        {contacts.length > 0 && (
          <ul className={style.list}>
            {contacts.map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
