export const APP_SET_CITIES = 'APP_SET_CITIES';
export const APP_SET_DATA = 'APP_SET_DATA';

export const setCities = () => ({
    type: APP_SET_CITIES,
});

export const setData = (payload) => ({
    type: APP_SET_DATA,
    payload,
})
