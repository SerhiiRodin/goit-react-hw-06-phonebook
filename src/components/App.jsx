import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  setStatusFilter,
} from './redux/contactsSlice';

import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import css from './Container/Container.module.css';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const { contacts, filter } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleAddContact = contact => {
    if (contacts.find(cont => cont.name === contact.name)) {
      return alert(`${contact.name} is already in contacts.`);
    }

    contact['id'] = nanoid();

    dispatch(addContact(contact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const updateFilter = date => {
    dispatch(setStatusFilter(date));
  };

  const filterByName = () => {
    const arr = contacts.filter(el =>
      el.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
    return arr;
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />

      <h2>Contacts</h2>

      <Filter state={filter} updateFilter={updateFilter} />

      {filter === '' ? (
        <ContactList contacts={contacts} deleteContact={handleDeleteContact} />
      ) : (
        <ContactList
          contacts={filterByName()}
          deleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
};
