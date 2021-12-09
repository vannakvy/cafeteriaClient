import gql from "graphql-tag";

export const CREATE_GENERATE_INVENTORY = gql`
    mutation generateInventory($input: generateInvInput) {
        generateInventory(input: $input)
    }
`

export const CREATE_GENERATE_ACCOUNTING = gql`
    mutation generateAccounting($input: GenerateAccInput) {
        generateAccounting(input: $input)
    }
`

export const GET_LIST_RECON = gql`
    query phsicalInventory {
        phsicalInventory {
            id
            code
            remark
            date
        }
    }
`

export const GET_ALL_RECON = gql`
    query getInventory($input: InputPagination) {
    getInventory(input: $input) {
            id
            code
            date
            remark
            accounting {
                openning {
                    paid
                    nonPaid
                }
                income {
                    paid
                    nonPaid
                }
                expense {
                    paid
                    nonPaid
                }
                closing {
                    paid
                    nonPaid
                }
            }
        }
    }
`

