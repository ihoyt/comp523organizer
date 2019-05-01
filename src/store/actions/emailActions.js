export const changeEmailTemplate = (templateChange) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to
    const firestore = getFirestore();

    // Accesses the firestore database in order to update a template,
    // and then dispatches the redux action
    if (typeof templateChange.id !== 'undefined') {
      firestore.collection('emails').doc(templateChange.id).set({
        ...templateChange
      }).then(() => {
          dispatch({ type: 'CHANGE_EMAIL_TEMPLATE', templateChange });
      }).catch((err) => {
          dispatch({ type: 'CHANGE_EMAIL_TEMPLATE_ERROR', err});
      });
    } else {
      delete templateChange.id;
      // Accesses the firestore database in order to update a template,
      // and then dispatches the redux action
      firestore.collection('emails').add({
        ...templateChange
      }).then(() => {
          dispatch({ type: 'CREATE_EMAIL_TEMPLATE', templateChange });
      }).catch((err) => {
          dispatch({ type: 'CREATE_EMAIL_TEMPLATE_ERROR', err});
      });
    }
  }
}
