const initState = {
  proposals:  [
    {id: '1', title: 'this is the first object', content: 'blah blah blah blah'},
    {id: '2', title: 'this is the second object', content: 'blah blah blah blah'},
    {id: '3', title: 'this is the third object', content: 'blah blah blah blah'}
  ]
}

const proposalReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROPOSAL':
      console.log("Proposal submitted", action.proposal);
      return state;
    case 'CREATE_PROPOSAL_ERROR':
      console.log("Submit proposal error", action.err);
      return state;
    default:
      return state;
  }
};

export default proposalReducer;
