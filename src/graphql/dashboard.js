import gql from "graphql-tag";

export const GET_ALL_DASHBOARD = gql`
    query getDashboard {
        getDashboard {
            top {
                newCustomer
                newDeliver
                newSupplier
                deliver
                supplier
                customer
            }
            expData {
                paid
                nonPaid
            }
            incData {
                paid
                nonPaid
            }
            total {
                expense
                income
            }
            topExp {
                # _id
                date
                count
                total
            }
            topInc {
                # _id
                date
                count
                total
            }
            dataYearRecord {
                _id
                code
                month
                income
                expense
            }
        }
    }
`