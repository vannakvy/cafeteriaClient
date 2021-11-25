import gql from "graphql-tag";

export const GET_ALL_PURCHASEORDER = gql`
    query getPurchaseOrders($input: InputPagination) {
        getPurchaseOrders(input: $input) {
            data {
                id
                supplier {
                    id
                    companyName
                    tel
                }
                date
                remark
                productCount
                subTotal
                tax
                offer
                delivery
                grandTotal
                payment
            }
            pagination {
                current
                count
            }
        }
    }
`

export const SUB_ALL_PURCHASEORDER = gql`
    subscription newPurchaseOrder {
        newPurchaseOrder {  
            id
            supplier {
                id
                companyName
            }
            date
            remark
            productCount
            subTotal
            tax
            offer
            grandTotal
            payment
        }
    }
`

export const VIEW_PURCHASEORDER_BY_ID = gql`
    query GetPurchaseOrderById($input: InputId) {
        getPurchaseOrderById(input: $input) {
            id
            code
            supplier {
                companyName
                tel
                id
                geolocation {
                    lat
                    long
                }
            }
            tel
            date
            remark
            products {
                product {
                    id
                    code
                    description
                    image
                    um
                    price
                }
                price
                qty
                total
                id
            }
            productCount
            subTotal
            tax
            offer
            delivery
            grandTotal
            payment
        }
    }
`

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

export const UPDATE_PURCHASEORDER = gql`
    mutation updatePurchaseOrders($input: PurchaseOrderInputUpdate) {
        updatePurchaseOrders(input: $input)
    }
`

export const DELETE_PURCHASEORDER = gql`
    mutation deletePurchaseOrders($input: PurchaseOrderInputDelete) {
        deletePurchaseOrders(input: $input)
    }
`

export const ADD_SUB_PURCHASEORDER = gql`
    mutation setSubPurchaseOrders($input: PurchaseOrderInputSubAdd) {
        setSubPurchaseOrders(input: $input)
    }
`

export const UPDATE_SUB_PURCHASEORDER = gql`
    mutation updateSubPurchaseOrders($input: PurchaseOrderInputSubUpdate) {
        updateSubPurchaseOrders(input: $input)
    }
`

export const DELETE_SUB_PURCHASEORDER = gql`
    mutation deleteSubPurchaseOrders($input: PurchaseOrderInputDelete) {
        deleteSubPurchaseOrders(input: $input)
    }
`