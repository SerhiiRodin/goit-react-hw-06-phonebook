import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

import storage from 'redux-persist/lib/storage';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setStatusFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setStatusFilter } =
  contactsSlice.actions;

const contactsReducer = contactsSlice.reducer;

// Для сохранения в локалСтор.
const persistConfig = {
  key: 'items',
  storage,
  // Сохраняем в стор только contacts, filter нет
  whitelist: ['contacts'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducer
);

////Без Slice когда нет Immer использование мутабельных операций
// export const addContact = createAction('contacts/addContact');
// export const deleteContact = createAction('contacts/deleteContact');
// export const setStatusFilter = createAction('contacts/setStatusFilter');

// const myReduser = createReducer(initialStat, {
//   [addContact]: (state, action) => {
//     return { ...state, contacts: [...state.contacts, action.payload] };
//   },
//   [deleteContact]: (state, action) => {
//     return {
//       ...state,
//       contacts: state.contacts.filter(contact => contact.id !== action.payload),
//     };
//   },
//   [setStatusFilter]: (state, action) => {
//     return {
//       ...state,
//       filter: action.payload,
//     };
//   },
// });
