import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { mutationCallBackFn, noticeAction } from '../functions/fn'
import { DELETE_SUPPLIER, GET_ALL_SUPPLIER } from '../graphql/supplier'
import { Table } from 'antd'
import { SupplierCol } from '../components/supplier/tableCol/supplierCol'
import AddUpdateSupplier from '../components/supplier/drawer/addUpdateSupplier'
import ViewSupplier from '../components/supplier/modal/viewSupplier'

export default function Supplier() {
    const [getSuppliers, { data: SupplierDb, loading }] = useLazyQuery(GET_ALL_SUPPLIER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })
    const [deleteSuppliers] = useMutation(DELETE_SUPPLIER, mutationCallBackFn(GET_ALL_SUPPLIER, 'getSuppliers'))

    const [updateData, setUpdateData] = useState({})
    const [viewData, setViewData] = useState({})
    
    const [openType, setOpenType] = useState("add")

    const [openAdd, setOpenAdd] = useState(false)
    const [openView, setOpenView] = useState(false)

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getSuppliers({
            variables: {
                input: {
                    current: current,
                    limit: limit,
                    keyword: keyword
                }
            }
        })
    }, [limit, current, keyword, getSuppliers])

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
        deleteSuppliers({
            variables: {
                input: {
                    id: e.id
                }
            },
            update(_, result) {
                noticeAction("success", result?.data?.deleteSuppliers)
            }
        })
    }

    return (
        <div>
            <AddUpdateSupplier open={openAdd} setOpen={setOpenAdd} data={updateData} type={openType} />
            <ViewSupplier open={openView} setOpen={setOpenView} data={viewData} />
            <Table
                {...loading}
                size="small"
                bordered
                columns={SupplierCol({ current, limit, setKeyword, onViewFn, onAddFn, onUpdateFn, onDeleteFn })}
                dataSource={SupplierDb?.getSuppliers?.data}
                sticky
                scroll={{ x: 1500 }}
                rowKey={record => record.id}
                pagination={{
                    showSizeChanger: true,
                    total: SupplierDb?.getSuppliers?.pagination?.count,
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
