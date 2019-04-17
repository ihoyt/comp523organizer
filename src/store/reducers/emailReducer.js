const initState = {}

const emailReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_EMAIL_TEMPLATE':
      console.log("Template updated", action.templateChange);
      return state;
    case 'CHANGE_EMAIL_TEMPLATE_ERROR':
      console.log("Update template error", action.err);
      return state;
    case 'CREATE_EMAIL_TEMPLATE':
      console.log("Template created", action.templateChange);
      return state;
    case 'CREATE_EMAIL_TEMPLATE_ERROR':
      console.log("Create template error", action.err);
      return state;
    default:
      return state;
  }
};

export default emailReducer;
