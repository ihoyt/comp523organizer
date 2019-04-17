export const changeEmailTemplate = (templateChange) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to
    const firestore = getFirestore();
    if (typeof templateChange.id !== 'undefined') {
      firestore.collection('emails').doc(templateChange.id).set({
        ...templateChange
      }).then(() => {
          dispatch({ type: 'CHANGE_EMAIL_TEMPLATE', templateChange });
      }).catch((err) => {
          dispatch({ type: 'CHANGE_EMAIL_TEMPLATE_ERROR', err});
      });
    } else {
      templateChange.id = null;
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
