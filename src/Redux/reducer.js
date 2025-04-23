var nodeConfigBar = true;
var clickedNodeType = "global"; // default value "global"
var clickedNodeId = null;

const initialState = {
  nodeConfigBar: nodeConfigBar,
  clickedNodeType: clickedNodeType,
  clickedNodeId: clickedNodeId,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NODE_CONFIG_BAR":
      return {
        ...state,
        nodeConfigBar: action.payload,
      };
    case "SET_CLICKED_NODE_TYPE":
      return {
        ...state,
        clickedNodeType: action.payload,
      };
    case "SET_CLICKED_NODE_ID":
      return {
        ...state,
        clickedNodeId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
