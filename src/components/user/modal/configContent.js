import { useMutation, useQuery } from '@apollo/client'
import { Modal, Row, Col, List, Spin, Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import { mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { GET_ALL_CONTENT } from '../../../graphql/content'
import { GET_ALL_USER, UPDATE_CONTENT } from '../../../graphql/user'

export default function ConfigContent({ open, setOpen, data }) {
    // console.log(data)

    const { data: ContentDb, loading } = useQuery(GET_ALL_CONTENT, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [updateContent] = useMutation(UPDATE_CONTENT, mutationCallBackFn(GET_ALL_USER, 'getUsers'))

    let getContents = ContentDb?.getContent

    const [newData, setNewData] = useState([])

    useEffect(() => {
        let newArray = []
        getContents?.map(load => {
            const array = data?.contentRole?.find(ele => ele.content.path === load.path)
            if (load.menu) {
                if (array) {
                    newArray.push({ ...load, view: array.view, create: array.create, update: array.update, delete: array.delete })
                } else {
                    newArray.push(load)
                }
            }
            return null;
        })

        setNewData(newArray)
    }, [data, getContents])

    function onChange(checkedValues, type, dataV) {
        let newArray = [...newData]
        const index = newArray.findIndex(ele => ele.path === dataV.path)

        newArray[index] = { ...newArray[index], [type]: checkedValues.target.checked }

        setNewData(newArray)

        let arrayDb = []
        newArray.map(load => {
            if (load.view || load.create || load.update || load.delete) {
                arrayDb.push({
                    content: load.id,
                    view: load.view !== undefined ? load.view : false,
                    create: load.create !== undefined ? load.create : false,
                    update: load.update !== undefined ? load.update : false,
                    delete: load.delete !== undefined ? load.delete : false
                })
            }
            return null;
        })

        updateContent({
            variables: {
                input: {
                    id: data.id,
                    contentRole: arrayDb
                }
            },
            update(_, result){
                console.log(result)
            }
        })
    }

    return (
        <Modal
            title="មាតិកា"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={800}
        >
            <Row gutter={16}>
                <Col
                    xs={24}
                    md={24}
                >
                    <List
                        itemLayout="horizontal"
                    >
                        {
                            loading ? <center>
                                <Spin />
                            </center> :
                                newData?.map(load =>
                                    load.menu && (
                                        <List.Item
                                            key={load.path}
                                            actions={[
                                                // <Checkbox.Group key={load.content.id} defaultValue={testFn(load)} options={plainOptions} onChange={e => onChange(e, load)} />
                                                <Checkbox
                                                    key="view"
                                                    checked={load.view}
                                                    onChange={e => onChange(e, "view", load)}
                                                >
                                                    View
                                                </Checkbox>,
                                                <Checkbox
                                                    key="create"
                                                    checked={load.create}
                                                    onChange={e => onChange(e, "create", load)}
                                                >
                                                    Create
                                                </Checkbox>,
                                                <Checkbox
                                                    key="update"
                                                    checked={load.update}
                                                    onChange={e => onChange(e, "update", load)}
                                                >
                                                    Update
                                                </Checkbox>,
                                                <Checkbox
                                                    key="delete"
                                                    checked={load.delete}
                                                    onChange={e => onChange(e, "delete", load)}
                                                >
                                                    Delete
                                                </Checkbox>,

                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={load.title}
                                                description={load.path}
                                            />
                                        </List.Item>
                                    )
                                )
                        }
                    </List>
                </Col>
            </Row>
        </Modal>
    )
}
