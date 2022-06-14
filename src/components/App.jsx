import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import style from './App.module.css';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

const CONTACTS_LIST = 'contactList';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return localStorage.getItem(CONTACTS_LIST)
      ? JSON.parse(localStorage.getItem(CONTACTS_LIST))
      : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log(contacts);
    localStorage.setItem(CONTACTS_LIST, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const nameNormalized = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === nameNormalized)
    ) {
      alert(name + ' is already in the contacts.');
    } else {
      setContacts(prevState => {
        const id = nanoid();
        return [...prevState, { id, name, number }];
      });
    }
  };

  const deleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <>
          <Filter value={filter} onChange={setFilter} />
          <ContactList
            contacts={contacts}
            filter={filter.toLowerCase()}
            onDeleteItem={deleteContact}
          />
        </>
      )}
    </div>
  );
};

export default App;
