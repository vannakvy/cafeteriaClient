import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_SALEORDER, GET_ALL_SALEORDER, SUB_ALL_SALEORDER } from '../graphql/saleOrder'
import { mutationCallBackFn, noticeAction } from '../functions/fn'
import { SaleOrderCol } from '../components/saleOrder/tableCols/saleOrderCol'
import SetStatusOrder from '../components/saleOrder/modal/setStatusOrder'
import { useHistory } from 'react-router-dom'
import { msgTitle } from '../asset/data/msgTitle'

export default function SaleOrder() {
    let history = useHistory()

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const { subscribeToMore, data: SaleOrderDb, loading } = useQuery(GET_ALL_SALEORDER, {
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

    const [deleteSaleOrders] = useMutation(DELETE_SALEORDER, mutationCallBackFn(GET_ALL_SALEORDER, 'getSaleOrders'))

    const [updateData, setUpdateData] = useState({})

    const [openStatus, setOpenStatus] = useState(false)

    useEffect(() => {
        subscribeToMore({
            document: SUB_ALL_SALEORDER,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newSaleOrder = subscriptionData.data.newSaleOrder;
                console.log(newSaleOrder)
                return Object.assign({}, prev, {
                    getSaleOrders: {
                        ...prev.getSaleOrders,
                        data: [newSaleOrder, ...prev.getSaleOrders.data].length > 10 ? [newSaleOrder, ...prev.getSaleOrders.data].slice(0, -1) : [newSaleOrder, ...prev.getSaleOrders.data]
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
        history.push("/addsaleorder")
    }

    const onDeleteFn = (e) => {
        deleteSaleOrders({
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

    return (
        <div>
            <SetStatusOrder open={openStatus} setOpen={setOpenStatus} updateData={updateData} />
            <Table
                {...loading}
                size="small"
                bordered
                columns={SaleOrderCol({ current, limit, setKeyword, onSetStatusFn, onAddFn, onDeleteFn })}
                dataSource={SaleOrderDb?.getSaleOrders?.data}
                sticky
                scroll={{ x: 1500 }}
                rowKey={record => record.id}
                pagination={{
                    showSizeChanger: true,
                    total: SaleOrderDb?.getSaleOrders?.pagination?.count,
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
