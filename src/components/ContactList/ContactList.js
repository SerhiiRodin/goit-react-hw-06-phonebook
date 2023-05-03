import { VscCircleSmallFilled } from 'react-icons/vsc';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export function ContactList() {
  const { contacts, filter } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const filterByName = () => {
    const arr = contacts.filter(el =>
      el.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
    return arr;
  };

  let currentContacts = [];

  if (filter === '') {
    currentContacts = contacts;
  } else currentContacts = filterByName();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={css['list-wraper']}>
      {currentContacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={css['list-item']}>
            <VscCircleSmallFilled />
            <p>
              {name}: {number}
            </p>
            <button
              type="button"
              className={css['list-button']}
              onClick={() => handleDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
