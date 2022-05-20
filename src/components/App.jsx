import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  handleInputChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(prevState => {
      const id = nanoid();
      return {
        contacts: [...prevState.contacts, { id, name: this.state.name }],
      };
    });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    const { contacts, name } = this.state;

    return (
      <div className={style.container}>
        <h2>Phonebook</h2>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="name">
            Name{' '}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            className={style.input}
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
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
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
