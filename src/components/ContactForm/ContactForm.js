import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = {
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
    this.props.onSubmit &&
      this.props.onSubmit(this.state.name, this.state.number);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
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
    );
  }
}

export { ContactForm };
