import gql from "graphql-tag";

export const CREATE_GENERATE_INVENTORY = gql`
    mutation generateInventory($input: generateInvInput) {
        generateInventory(input: $input)
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
    query PhsicalInventory {
        phsicalInventory {
            id
            code
            products {
                closing {
                    qty
                    price
                    total
                }
                variance {
                    qty
                    price
                    total
                }
                physical {
                    qty
                    price
                    total
                }
                stockOut {
                    qty
                    price
                    total
                }
                stockIn {
                    qty
                    price
                    total
                }
                openning {
                    qty
                    price
                    total
                }
                id
            }
            date
            remark
        }
    }
`