import moment from "moment"

export const initState = {
    logined: true,
    urlPath: ""
}

export const generalCustomer = {
    customer: {
        id: "61adad4bf423b5edd9da0914",
        tel: "",
        geolocation: {
            lat: 13.351400748454818,
            long: 103.8501936294368
        },
        remark: "",
    },
    deliver: {
        id: "61adad29f423b5edd9da0907",
        tel: "",
        remark: "",
        geolocation: {
            lat: 13.351400748454818,
            long: 103.8501936294368
        }
    },
    date: moment()
}