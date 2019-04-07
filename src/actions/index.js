import { GET_PROJECTS } from './action-types';
import Axios from 'axios';

const BASE_URL = 'http://localhost:3040';

// export function getAllProjects() {
//   return function(dispatch) {
//     Axios.get(`${BASE_URL}/projects`)
//       .then(response => {
//         dispatch({
//           type: GET_PROJECTS,
//           payload: response.data
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// }
