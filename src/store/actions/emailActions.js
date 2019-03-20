export const changeEmailTemplate = (templateChange) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to
    const firestore = getFirestore();

    firestore.collection('emails').doc(templateChange.id).set({
      ...templateChange.email
    }).then(() => {
        dispatch({ type: 'CHANGE_EMAIL_TEMPLATE', templateChange });
    }).catch((err) => {
        dispatch({ type: 'CHANGE_EMAIL_TEMPLATE_ERROR', err});
    });
  }
}
