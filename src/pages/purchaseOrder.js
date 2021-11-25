import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { mutationCallBackFn, noticeAction } from '../functions/fn'
import SetStatusOrder from '../components/saleOrder/modal/setStatusOrder'
import { useHistory } from 'react-router-dom'
import { msgTitle } from '../asset/data/msgTitle'
import { DELETE_PURCHASEORDER, GET_ALL_PURCHASEORDER, SUB_ALL_PURCHASEORDER } from '../graphql/purchaseOrder'
import { PurchaseOrderCol } from '../components/purchaseOrder/tableCols/purchaseCol'

export default function PurchaseOrder() {
    let history = useHistory()

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const { subscribeToMore, data: PurchaseOrderDb, loading } = useQuery(GET_ALL_PURCHASEORDER, {
        variables: {
            input: {
                current: current,
                limit: limit,
                keyword: keyword
            }
        },
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [deletePurchaseOrders] = useMutation(DELETE_PURCHASEORDER, mutationCallBackFn(GET_ALL_PURCHASEORDER, 'getPurchaseOrders'))

    const [updateData, setUpdateData] = useState({})

    const [openStatus, setOpenStatus] = useState(false)

    useEffect(() => {
        subscribeToMore({
            document: SUB_ALL_PURCHASEORDER,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newSaleOrder = subscriptionData.data.newSaleOrder;
                console.log(newSaleOrder)
                return Object.assign({}, prev, {
                    getSaleOrders: {
                        ...prev.getPurchaseOrders,
                        data: [newSaleOrder, ...prev.getPurchaseOrders.data].length > 10 ? [newSaleOrder, ...prev.getPurchaseOrders.data].slice(0, -1) : [newSaleOrder, ...prev.getPurchaseOrders.data]
                    }
                })
            }
        })

    }, [subscribeToMore])


    const onSetStatusFn = (e) => {
        setUpdateData(e)
        setOpenStatus(true)
    }

    const onAddFn = () => {
        history.push("/addpurchaseorder")
    }

    const onDeleteFn = (e) => {
        deletePurchaseOrders({
            variables: {
                input: {
                    id: e.id
                }
            },
            update(_, result) {
                noticeAction("success", msgTitle.DELETE)
            }
        })
    }

    // console.log(SaleOrderDb?.getSaleOrders?.data)
    // console.log(PurchaseOrderDb)

    return (
        <div>
            <SetStatusOrder open={openStatus} setOpen={setOpenStatus} updateData={updateData} />
            <Table
                {...loading}
                size="small"
                bordered
                columns={PurchaseOrderCol({ current, limit, setKeyword, onSetStatusFn, onAddFn, onDeleteFn })}
                dataSource={PurchaseOrderDb?.getPurchaseOrders?.data}
                sticky
                scroll={{ x: 1500 }}
                rowKey={record => record.id}
                pagination={{
                    showSizeChanger: true,
                    total: PurchaseOrderDb?.getPurchaseOrders?.pagination?.count,
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
