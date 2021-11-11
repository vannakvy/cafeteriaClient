import gql from "graphql-tag";


export const GET_NOTIFICATION = gql`
    subscription Subscription {
        newNotice {
            id
            action
            title
            content
            user
            createAt
        }
    }
`