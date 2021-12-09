import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { DELETE_USER, GET_ALL_USER } from '../graphql/user'
import { mutationCallBackFn, noticeAction } from '../functions/fn'
import { useLazyQuery, useMutation } from '@apollo/client'
import { UserCol } from '../components/user/tableCols/userCol'
import AddUpdateUser from '../components/user/modal/addUpdateUser'
import ConfigContent from '../components/user/modal/configContent'
import { theme } from '../static/theme'

export default function User() {

    const [getUsers, { data: UsersDb, loading }] = useLazyQuery(GET_ALL_USER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })
    
    const [deleteUser] = useMutation(DELETE_USER, mutationCallBackFn(GET_ALL_USER, 'getUsers'))

    const [configCSelected, setconfigCSelected] = useState([])
    
    const [updateData, setUpdateData] = useState({})

    const [openType, setOpenType] = useState("add")

    const [openAdd, setOpenAdd] = useState(false)
    const [openConfigContent, setOpenConfigContent] = useState(false)

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getUsers({
            variables: {
                input: {
                    current: current,
                    limit: limit,
                    keyword: keyword
                }
            }
        })
    }, [limit, current, keyword, getUsers])

    const onAddFn = (e) => {
        setOpenType("add")
        setOpenAdd(true)
    }

    const onUpdateFn = (e) => {
        setOpenType("update")
        setUpdateData(e)
        setOpenAdd(true)
    }

    const onConfigFn = (e) => {
        // console.log(e)
        setconfigCSelected(e)
        setOpenConfigContent(true)
    }

    const onDeleteFn = (e) => {
        deleteUser({
            variables: {
                input: {
                    id: e.id
                }
            },
            update(_, result) {
                noticeAction("success", result?.data?.deleteUser)
            }
        })
    }

    return (
        <div>
             {/* <AddUpdateSupplier open={openAdd} setOpen={setOpenAdd} data={updateData} type={openType} />
            <ViewSupplier open={openView} setOpen={setOpenView} data={viewData} /> */}
            <AddUpdateUser open={openAdd} setOpen={setOpenAdd} data={updateData} type={openType} />
            <ConfigContent open={openConfigContent} setOpen={setOpenConfigContent} data={configCSelected} />
            <Table
                {...loading}
                size={theme.tableSize}
                bordered
                columns={UserCol({ current, limit, setKeyword, onConfigFn, onAddFn, onUpdateFn, onDeleteFn })}
                dataSource={UsersDb?.getUsers?.data}
                sticky
                scroll={{ x: 1500 }}
                rowKey={record => record.id}
                pagination={{
                    showSizeChanger: true,
                    total: UsersDb?.getUsers?.pagination?.count,
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
