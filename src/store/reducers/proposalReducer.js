const initState = {
  proposals:  []
}

const proposalReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROPOSAL':
      console.log("Proposal submitted", action.proposal);
      return state;
    case 'CREATE_PROPOSAL_ERROR':
      console.log("Submit proposal error", action.err);
      return state;
    case 'CHANGE_PROPOSAL_CATEGORY':
      console.log("Category changed", action.categoryChange);
      return state;
    case 'CHANGE_PROPOSAL_CATEGORY_ERROR':
      console.log("Submit proposal error", action.err);
      return state;
    default:
      return state;
  }
};

export default proposalReducer;
