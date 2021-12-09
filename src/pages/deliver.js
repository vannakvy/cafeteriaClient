import { useLazyQuery, useMutation } from '@apollo/client'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AddUpdateDeliver from '../components/deliver/drawer/addUpdateDeliver'
import ViewDeliver from '../components/deliver/modal/viewDeliver'
import { DeliverCol } from '../components/deliver/tableCol/deliverCol'
import { mutationCallBackFn, noticeAction } from '../functions/fn'
import { DELETE_DELIVER, GET_ALL_DELIVER } from '../graphql/deliver'
import { theme } from '../static/theme'

export default function Deliver() {
    const [getDelivers, { data: DeliverDb, loading }] = useLazyQuery(GET_ALL_DELIVER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })
    const [deleteDelivers] = useMutation(DELETE_DELIVER, mutationCallBackFn(GET_ALL_DELIVER, 'getDelivers'))

    const [updateData, setUpdateData] = useState({})
    const [viewData, setViewData] = useState({})
    
    const [openType, setOpenType] = useState("add")

    const [openAdd, setOpenAdd] = useState(false)
    const [openView, setOpenView] = useState(false)

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getDelivers({
            variables: {
                input: {
                    current: current,
                    limit: limit,
                    keyword: keyword
                }
            }
        })
    }, [limit, current, keyword, getDelivers])

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
        deleteDelivers({
            variables: {
                input: {
                    id: e.id
                }
            },
            update(_, result) {
                noticeAction("success", result?.data?.deleteDelivers)
            }
        })
    }

    return (
        <div>
            <AddUpdateDeliver open={openAdd} setOpen={setOpenAdd} data={updateData} type={openType} />
            <ViewDeliver open={openView} setOpen={setOpenView} data={viewData} />
            <Table
                {...loading}
                size={theme.tableSize}
                bordered
                columns={DeliverCol({ current, limit, setKeyword, onViewFn, onAddFn, onUpdateFn, onDeleteFn })}
                dataSource={DeliverDb?.getDelivers?.data}
                sticky
                scroll={{ x: 1500 }}
                rowKey={record => record.id}
                pagination={{
                    showSizeChanger: true,
                    total: DeliverDb?.getDelivers?.pagination?.count,
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
