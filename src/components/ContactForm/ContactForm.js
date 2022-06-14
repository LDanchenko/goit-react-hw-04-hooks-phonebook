import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ContactForm.module.css';
import React from 'react';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit && onSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label} htmlFor="nameInput">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="nameInput"
        value={name}
        className={style.input}
        onChange={e => setName(e.target.value)}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={style.label} htmlFor="numberInput">
        Number
      </label>
      <input
        type="tel"
        name="number"
        value={number}
        id="numberInput"
        className={style.input}
        onChange={e => setNumber(e.target.value)}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={style.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export { ContactForm };

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
