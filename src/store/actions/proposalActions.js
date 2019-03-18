export const createProposal = (proposal) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to
    const firestore = getFirestore();

    // Determine semester info
    let date_obj = new Date();
    let date = date_obj.getMonth() < 7 ? "Spring " : "Fall ";
    date += (date_obj.getFullYear() + "").substring(2);

    firestore.collection('proposals').add({
      ...proposal,
      semeseter: date
    }).then(() => {
        dispatch({ type: 'CREATE_PROPOSAL', proposal });
    }).catch((err) => {
        dispatch({ type: 'CREATE_PROPOSAL_ERROR', err});
    });
  }
}
