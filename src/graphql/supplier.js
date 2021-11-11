import gql from "graphql-tag";


export const GET_ALL_SUPPLIER = gql`
    query getSuppliers($input: InputPagination) {
        getSuppliers(input: $input) {
            data {
                id
                companyName
                lname
                fname
                tel
                email
                image
                address
                geolocation {
                    lat
                    long
                    placename
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

export const ADD_SUPPLIER = gql`
    mutation setSuppliers($input: SupplierInputSet) {
        setSuppliers(input: $input) {
            id
            companyName
            lname
            fname
            tel
            email
            image
            address
            geolocation {
                lat
                long
                placename
            }
            uid
            token
        }
    }
`

export const UPDATE_SUPPLIER = gql`
    mutation updateSuppliers($input: SupplierInputUpdate) {
        updateSuppliers(input: $input)
    }
`

export const DELETE_SUPPLIER = gql`
    mutation deleteSuppliers($input: SupplierInputDelete) {
        deleteSuppliers(input: $input)
    }
`