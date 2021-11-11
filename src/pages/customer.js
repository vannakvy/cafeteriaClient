import { useLazyQuery, useMutation } from '@apollo/client'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AddUpdateCustomer from '../components/customer/drawer/addUpdateCustomer'
import ViewCustomer from '../components/customer/modal/viewCustomer'
import { CustomerCol } from '../components/customer/tableCol/customerCol'
import { mutationCallBackFn, noticeAction } from '../functions/fn'
import { DELETE_CUSTOMER, GET_ALL_CUSTOMER } from '../graphql/customer'

export default function Customer() {
    const [getCustomers, { data: CustomerDb, loading }] = useLazyQuery(GET_ALL_CUSTOMER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })
    const [deleteCustomers] = useMutation(DELETE_CUSTOMER, mutationCallBackFn(GET_ALL_CUSTOMER, 'getCustomers'))

    const [updateData, setUpdateData] = useState({})
    const [viewData, setViewData] = useState({})
    
    const [openType, setOpenType] = useState("add")

    const [openAdd, setOpenAdd] = useState(false)
    const [openView, setOpenView] = useState(false)

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getCustomers({
            variables: {
                input: {
                    current: current,
                    limit: limit,
                    keyword: keyword
                }
            }
        })
    }, [limit, current, keyword, getCustomers])

    const onAddFn = (e) => {
        setOpenType("add")
        setOpenAdd(true)
    }

    const onUpdateFn = (e) => {
        setOpenType("update")
        setUpdateData(e)
        setOpenAdd(true)
    }

    const onViewFn = (e) => {
        setViewData(e)
        setOpenView(true)
    }

    const onDeleteFn = (e) => {
        deleteCustomers({
            variables: {
                input: {
                    id: e.id
                }
            },
            update(_, result) {
                noticeAction("success", result?.data?.deleteCustomers)
            }
        })
    }

    return (
        <div>
            <AddUpdateCustomer open={openAdd} setOpen={setOpenAdd} data={updateData} type={openType} />
            <ViewCustomer open={openView} setOpen={setOpenView} data={viewData} />
            <Table
                {...loading}
                size="small"
                bordered
                columns={CustomerCol({ current, limit, setKeyword, onViewFn, onAddFn, onUpdateFn, onDeleteFn })}
                dataSource={CustomerDb?.getCustomers?.data}
                sticky
                scroll={{ x: 1500 }}
                rowKey={record => record.id}
                pagination={{
                    showSizeChanger: true,
                    total: CustomerDb?.getCustomers?.pagination?.count,
                    pageSize: limit,
                    current: current,
                    onChange: (page, pageSize) => {
                        setCurrent(page)
                        setLimit(pageSize)
                    }
                }}
            />
        </div>
    )
}
