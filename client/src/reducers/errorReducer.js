import { GET_ERRORS} from '../actions/userActionsTypes';

export default function(state={},action){
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}