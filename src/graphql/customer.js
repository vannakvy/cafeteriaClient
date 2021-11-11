import gql from "graphql-tag";

export const GET_ALL_CUSTOMER = gql`
    query getCustomers($input: InputPagination) {
    getCustomers(input: $input) {
        data {
            id
            lname
            fname
            tel
            email
            image
            address
            geolocation {
                lat
                long
            }
            uid
            token
            createAt
        }
        message
        pagination {
            current
            count
        }
    }
    }
`

export const ADD_CUSTOMER = gql`
    mutation SetCustomersMutation($input: CustomerInputSet) {
        setCustomers(input: $input) {
            id
            lname
            fname
            tel
            email
            image
            address
            geolocation {
                lat
                long
            }
            uid
            token
        }
    }
`

export const UPDATE_CUSTOMER = gql`
    mutation UpdateCustomersMutation($input: CustomerInputUpdate) {
        updateCustomers(input: $input)
    }
`

export const DELETE_CUSTOMER = gql`
    mutation deleteCustomers($input: CustomerInputDelete) {
        deleteCustomers(input: $input)
    }
`