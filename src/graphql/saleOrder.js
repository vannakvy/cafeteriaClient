import gql from "graphql-tag";

export const GET_ALL_SALEORDER = gql`
    query getSaleOrders($input: InputPagination) {
        getSaleOrders(input: $input) {
            data {
                id
                customer {
                    id {
                        lname
                        fname
                    }
                    tel
                    geolocation {
                        lat
                        long
                    }
                    remark
                }
                date
                remark
                productCount
                subTotal
                tax
                offer
                grandTotal
                status {
                    isPrepared
                    isDelivered
                    isCooked
                    deliveryTime
                    isPaid
                    isCanceled
                }
                rate {
                    rate
                    comment
                }
                feedback
                delivery
            }
            pagination {
                current
                count
            }
        }
    }
`

export const SUB_ALL_SALEORDER = gql`
    subscription newSaleOrder {
        newSaleOrder {
            id
            customer {
                id {
                    lname
                    fname
                }
                tel
                geolocation {
                    lat
                    long
                }
                remark
            }
            date
            remark
            productCount
            subTotal
            tax
            offer
            grandTotal
            status {
                isPrepared
                isDelivered
                isCooked
                deliveryTime
                isPaid
                isCanceled
            }
            rate {
                rate
                comment
            }
            feedback
            delivery
        }
    }
`

export const ADD_SALEORDER = gql`
    mutation setSaleOrders($input: SaleOrderInputSet) {
        setSaleOrders(input: $input) {
            id
            customer {
                id {
                    lname
                    fname
                }
                tel
                geolocation {
                    lat
                    long
                }
                remark
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
            delivery
            payment
        }
    }
`

export const VIEW_SALEORDER_BY_ID = gql`
    query getSaleOrderById($input: InputId) {
        getSaleOrderById(input: $input) {
            id
            customer {
                id {
                    id
                    lname
                    fname
                }
                tel
                geolocation {
                    lat
                    long
                }
                remark
            }
            deliver {
                id{
                    id
                    lname
                    fname
                }
                tel
                geolocation {
                    lat
                    long
                }
                remark
            }
            tel
            date
            remark
            products {
                product {
                    description
                    image
                    um
                    inStock
                }
                price
                qty
                total
                remark
                id
            }
            subTotal
            tax
            offer
            grandTotal
            delivery
            payment
            geolocation {
                lat
                long
            }
            status{
                isPrepared
                isCooked
                isDelivered
                isPaid
                isCanceled
                deliveryTime
            }
            rate {
                rate
                comment
            }
            feedback
        }
    }
`

export const UPDATE_SALEORDER = gql`
    mutation updateSaleOrders($input: SaleOrderInputUpdate) {
        updateSaleOrders(input: $input)
    }
`

export const DELETE_SALEORDER = gql`
    mutation deleteSaleOrders($input: SaleOrderInputDelete) {
        deleteSaleOrders(input: $input)
    }
`

export const ADD_SUB_SALEORDER = gql`
    mutation setSubSaleOrders($input: SaleOrderInputSubAdd) {
        setSubSaleOrders(input: $input)
    }
`

export const UPDATE_SUB_SALEORDER = gql`
    mutation updateSubSaleOrders($input: SaleOrderInputSubUpdate) {
        updateSubSaleOrders(input: $input)
    }
`

export const DELETE_SUB_SALEORDER = gql`
    mutation deleteSubSaleOrders($input: SaleOrderInputDelete) {
        deleteSubSaleOrders(input: $input)
    }
`

export const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($input: InputStatusWithId) {
        updateOrderStatus(input: $input) {
            isPrepared
            isCooked
            isDelivered
            deliveryTime
            isPaid
        }
    }
`