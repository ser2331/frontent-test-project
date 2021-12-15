import { app as appActions } from '../actions';
import * as cities from '../../classes/cities.json';
import moment from "moment";

const initialState = {
    cities: [],
    data:[],
    lastDate: '',
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case appActions.APP_SET_CITIES:
            return {
                ...state,
                cities: cities.default,
            };

        case appActions.APP_SET_DATA:
            const today = moment().format('D MMMM YYYY, h:mm:ss');

            return {
                ...state,
                data: action.payload,
                lastDate: today,
            };
    default:
        return state;
    }
};

export default app;
