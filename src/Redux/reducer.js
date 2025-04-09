var nodeConfigBar = true;

const initialState = {
  nodeConfigBar: nodeConfigBar,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NODE_CONFIG_BAR":
      return {
        ...state,
        nodeConfigBar: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
