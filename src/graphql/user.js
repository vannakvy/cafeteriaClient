import gql from "graphql-tag";

export const GET_ALL_USER = gql`
    query getUsers {
        getUsers {
            data {
                id
                uid
                token
                displayName
                email
                contentRole {
                    view
                    create
                    update
                    delete
                    content {
                        title
                        path
                        id
                        menu
                    }
                    sub
                }
            }
            pagination {
                current
                count
            }
        }
    }
`

export const GET_USER_CONTENT_BY_UID = gql`
   query getContentById($input: InputId) {
    # getContentById(input: $input)
        getContentById(input: $input) {
            profile {
                id
                uid
                token
                displayName
                email
                contentRole {
                    content {
                        path
                    }
                    view
                    create
                    update
                    delete
                }
            }
            content {
                _id
                title
                path
                contentId
                # view
                # create
                # update
                # delete
                sub
                menu
            }

        }
    }
`

export const ADD_USER = gql`
    mutation addUser($input: AddUserInput) {
        addUser(input: $input) {
            uid
            token
            displayName
            email
            contentRole {
                view
                create
                update
                delete
            }
        }
    }
`

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput) {
        updateUser(input: $input)
    }
`

export const DELETE_USER = gql`
    mutation deleteUser($input: InputId) {
       deleteUser(input: $input)
    }
`

export const UPDATE_CONTENT = gql`
    mutation updateContent($input: UpdateContentInput) {
        updateContent(input: $input)
    }
`