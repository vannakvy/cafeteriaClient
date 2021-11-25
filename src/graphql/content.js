import gql from "graphql-tag";

export const GET_ALL_CONTENT = gql`
    query GetContent {
        getContent {
            id
            title
            path
            sub
            menu
        }
    }
`