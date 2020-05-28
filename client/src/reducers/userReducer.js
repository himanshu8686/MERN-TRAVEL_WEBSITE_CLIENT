import { USER_SIGNUP,USER_LOGIN, USER_LOGOUT, GET_PRODUCTS} from '../actions/userActionsTypes';

const initialState={
    userDetails:{},
    isAuthenticated:false,
    currentUserDetails:{},
    userLoginDetails:{},
    userLogoutDetails:{},
    products:[]

}
export default function(state=
    initialState ,action){
    switch (action.type) {
        case USER_SIGNUP:
            return {
                ...state,
               userDetails:action.payload
            } ;

            case USER_LOGIN:
            return {
                ...state,
                isAuthenticated:true,
               userLoginDetails:action.payload,
                currentUserDetails:action.currentUser
            } ;
            
            case USER_LOGOUT:
            return{
                ...state,
                userLoginDetails:{},
                isAuthenticated:false,
                userLogoutDetails:{
                    "message":'Logged out successfully'
                },
                currentUserDetails:{}
            };

            case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        default:
            return state;
    }
}