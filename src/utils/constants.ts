import moment from "moment/moment";


export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL ?? ""

export const today = moment().format("yyyy-MM-DD")