import { useMutation } from '@apollo/client'
import { Modal, Input, Button, Alert, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { ADD_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORY, UPDATE_CATEGORY } from '../../../graphql/product'

export default function AddEditCategory({ open, setOpen, type, data }) {
    const [setCategories] = useMutation(ADD_CATEGORY, mutationCallBackFn(GET_ALL_CATEGORY, 'getCategories'))

    const [updateCategories] = useMutation(UPDATE_CATEGORY, mutationCallBackFn(GET_ALL_CATEGORY, 'getCategories'))

    const [deleteCategories] = useMutation(DELETE_CATEGORY, mutationCallBackFn(GET_ALL_CATEGORY, 'getCategories'))

    const [dsp, setDsp] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        if (data !== {}) {
            setDsp(data?.description)
        }
    }, [data])

    const onAddNewFn = () => {
        if (!dsp) {
            setErrorMsg("សូមបញ្ចូលបរិយាយ")
        } else {
            setCategories({
                variables: {
                    input: {
                        description: dsp
                    }
                },
                update(_, result) {
                    console.log(result)
                    noticeAction("success", "ការបញ្ចូលបានជោគជ័យ")

                    setOpen(false)
                }
            })
        }
    }

    const onUpdateFn = () => {
        if (!dsp) {
            setErrorMsg("សូមបញ្ចូលបរិយាយ")
        } else {
            updateCategories({
                variables: {
                    input: {
                        id: data?.id,
                        description: dsp
                    }
                },
                update(_, result) {
                    console.log(result)
                    noticeAction("success", "ការបញ្ចូលបានជោគជ័យ")

                    setOpen(false)
                }
            })
        }
    }

    const onDeleteFn = () => {
        deleteCategories({
            variables: {
                input: {
                    id: data?.id
                }
            },
            update(_, result) {
                console.log(result)
                noticeAction("success", "ការបញ្ចូលបានជោគជ័យ")

                setOpen(false)
            }
        })
    }

    return (
        <Modal
            title="ប្រភេទទំនិញ"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={[
                type !== "add" &&
                <Popconfirm
                    key="delete"
                    title="តើអ្នកចង់លុបមែនទេ?"
                    okText="ចង់"
                    cancelText="មិនចង់"
                    okType="danger"
                    placement="bottom"
                    onConfirm={() => onDeleteFn()}
                >
                    <Button
                        danger
                        style={{
                            float: "left"
                        }}
                    >
                        លុប
                    </Button>
                </Popconfirm>,
                type === "add" ? <Button
                    key="submit"
                    type="primary"
                    onClick={() => onAddNewFn()}
                >
                    បញ្ចូលថ្មី
                </Button> : <Button
                    key="update"
                    type="primary"
                    onClick={() => onUpdateFn()}
                >
                    កែប្រែ
                </Button>
            ]}
        >
            <label>បរិយាយ</label>
            <Input
                value={dsp}
                onChange={e => {
                    setDsp(e.target.value)
                    setErrorMsg("")
                }}
            />
            {errorMsg && (
                <Alert
                    style={{
                        marginTop: 10
                    }}
                    message={errorMsg}
                    type="error"
                />
            )}
        </Modal>
    )
}
