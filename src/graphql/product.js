import gql from "graphql-tag";

export const GET_ALL_PRODUCT = gql`
    query getProducts($input: InputPagination) {
        getProducts(input: $input) {
            data {
                code
                id
                description
                image
                price
                um
                category {
                    id
                    description
                }
                inStock
                remark
            }
            pagination {
                current
                count
            }
        }
    }
`

export const GET_PRODUCT_BY_CTG = gql`
    query Query($input: InputPagination) {
        getProductBySelectCTG(input: $input) {
            data {
                id
                code
                description
                image
                price
                um
                inStock
                remark
            }
            pagination {
                current
                count
            }
        }
    }
`

export const ADD_PRODUCT = gql`
    mutation SetProductsMutation($input: ProductInputSet) {
        setProducts(input: $input) {
            id
            code
            description
            image
            price
            um
            category {
                id
                description
            }
            inStock
            remark
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation UpdateProductsMutation($input: ProductInputUpdate) {
        updateProducts(input: $input)
    }
`

export const DELETE_PRODUCT = gql`
    mutation deleteProducts($input: ProductInputDelete) {
        deleteProducts(input: $input)
    }
`

export const GET_ALL_CATEGORY = gql`
    query getCategories($input: InputPagination) {
        getCategories(input: $input) {
            data {
                id
                description
                product
            }
            message
        }
    }
`

export const ADD_CATEGORY = gql`
    mutation SetCategoriesMutation($input: CategoryInputSet) {
        setCategories(input: $input) {
            id
            description
        }
    }
`

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategoriesMutation($input: CategoryInputUpdate) {
        updateCategories(input: $input)
    }
`

export const DELETE_CATEGORY = gql`
    mutation DeleteCategoriesMutation($input: CategoryInputDelete) {
     deleteCategories(input: $input)
    }
`