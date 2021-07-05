import axios from "axios";
import { useDispatch } from "react-redux";
import IPart from "../models/IPart";
import { LOAD_PARTS } from "../dataStore/PartsReducer";
import { LOAD_PART_TYPES } from "../dataStore/PartTypesReducer";
import { WAITING } from "../dataStore/WaitingReducer";


// all access to the server are made by this hook function
const useService = () => {

  // base url
  const url = "http://localhost:8081";

  const dispatch = useDispatch();


  // load 'parts' from server into redux Store
  const loadParts = () => {
    dispatch({ type: WAITING, payload: true });

    axios.get(`${url}/store/parts`).then(response => {
      dispatch({
        type: LOAD_PARTS,
        payload: response.data
      });
      dispatch({ type: WAITING, payload: false });
      loadPartTypes();
    })
  };


  // load 'part types' from server into redux Store
  const loadPartTypes = () => {
    dispatch({ type: WAITING, payload: true });

    axios.get(`${url}/store/part-types`).then(response => {
      dispatch({
        type: LOAD_PART_TYPES,
        payload: response.data
      });
      dispatch({ type: WAITING, payload: false });
    })
  };


  // this function refines results from the server response.
  // the server will return results from any property, inclusive key values.
  // e.g. for query 'price', all parts will be returned
  const filterResults = (array: Array<IPart>, query: string) => {
    return array.filter(item =>
      item.name.toLowerCase().indexOf(query) >= 0)
  };


  // search 'parts' in server and put the data in redux Store
  const queryParts = (query: string, type: string) => {
    // return all parts
    if (query === "" && type === "All") {
      loadParts();

    // query by name and type
    } else if (type !== "All") {
      dispatch({ type: WAITING, payload: true });

      axios.get(`${url}/store/parts/?query=${query}&&type=${type}`).then(response => {
        console.log(response);
        dispatch({
          type: LOAD_PARTS,
          payload: filterResults(response.data, query)
        });
        dispatch({ type: WAITING, payload: false });
      })

    // query only by name
    } else {
      dispatch({ type: WAITING, payload: true });

      axios.get(`${url}/store/parts/?query=${query}`).then(response => {
        console.log(response);
        dispatch({
          type: LOAD_PARTS,
          payload: filterResults(response.data, query)
        });
        dispatch({ type: WAITING, payload: false });
      })
    }
  };


  return { loadParts, loadPartTypes, queryParts }
};
export default useService;
