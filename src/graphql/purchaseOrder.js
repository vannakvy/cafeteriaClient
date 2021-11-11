import gql from "graphql-tag";


export const ADD_PURCHASEORDER = gql`
    mutation setPurchaseOrders($input: PurchaseOrderInputSet) {
        setPurchaseOrders(input: $input) {
            id
            supplier {
                id
                companyName
            }
            tel
            date
            remark
            products {
                product {
                    description
                }
                qty
                price
                total
            }
            subTotal
            tax
            offer
            grandTotal
            payment
        }
    }
`