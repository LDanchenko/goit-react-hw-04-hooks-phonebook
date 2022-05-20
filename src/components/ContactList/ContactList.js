import style from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, filter, onDeleteItem }) => {
  return (
    <ul className={style.list}>
      {contacts
        .filter(contact => contact.name.toLowerCase().includes(filter))
        .map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={style.button}
              onClick={() => onDeleteItem(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export { ContactList };

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};
