import gql from "graphql-tag";

export const GET_REPORT_PRODUCT_BY_DATE = gql`
    mutation GetReportProductByDate($input: InputDate) {
        getReportProductByDate(input: $input) {
            _id
            description
            stockIn
            stockOut
            totalStock
            openning
        }
    }
`

export const GET_REPORT_PRODUCT_RANGE_DATE = gql`
    mutation GetReportProductByDate($input: InputRangeDate) {
        getReportProductByRangeDate(input: $input) {
            _id
            description
            stockIn
            stockOut
            totalStock
            openning
        }
    }
`

export const GET_REPORT_CATEGORY_BY_DATE = gql`
    mutation GetReportCategoryByDate($input: InputRangeDate) {
        getReportCategoryByDate(input: $input) {
            _id
            description
            stockIn
            stockOut
            totalStock
        }
    }
`

export const GET_REPORT_SALEORDER_RANGE_DATE = gql`
    mutation GetReportSaleOrderByRangeDate($input: InputRangeDate) {
        getReportSaleOrderByRangeDate(input: $input) {
            id
            date
            productCount
            subTotal
            tax
            offer
            grandTotal
            delivery
            payment
        }
    }
`

export const GET_REPORT_PO_BY_DATE = gql`
    mutation GetReportPurchaseOrderByRangeDate($input: InputRangeDate) {
        getReportPurchaseOrderByRangeDate(input: $input) {
            id
            date
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