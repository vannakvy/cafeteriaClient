import gql from "graphql-tag";


export const GET_ALL_DELIVER = gql`
    query getDelivers($input: InputPagination) {
        getDelivers(input: $input) {
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
                updateAt
            }
            pagination {
                current
                count
            }
        }
    }
`

export const ADD_DELIVER = gql`
    mutation setDelivers($input: DeliverInputSet) {
        setDelivers(input: $input) {
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

export const UPDATE_DELIVER = gql`
    mutation UpdateDelivers($input: DeliverInputUpdate) {
        updateDelivers(input: $input)
    }
`

export const DELETE_DELIVER = gql`
    mutation UpdateDelivers($input: DeliverInputDelete) {
        deleteDelivers(input: $input)
    }
`