import moment from "moment/moment";


export const BASE_URL = process.env.REACT_APP_API_URL ?? ""

export const today = moment().format("yyyy-MM-DD")