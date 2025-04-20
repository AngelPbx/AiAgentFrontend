var nodeConfigBar = true;
var clickedNodeType = "global"; // default value "global"

const initialState = {
  nodeConfigBar: nodeConfigBar,
  clickedNodeType: clickedNodeType,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NODE_CONFIG_BAR":
      return {
        ...state,
        nodeConfigBar: action.payload,
      };
    case "SET_CLICKED_NODE_TYPE":
      console.log("curr val: ", action.payload);
      return {
        ...state,
        clickedNodeType: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
