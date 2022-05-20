import style from './ContactList.module.css';

const ContactList = ({ contacts, filter }) => {
  return (
    <ul className={style.list}>
      {contacts
        .filter(contact => contact.name.toLowerCase().includes(filter))
        .map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
          </li>
        ))}
    </ul>
  );
};

export { ContactList };
