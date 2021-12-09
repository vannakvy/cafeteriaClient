import { useLazyQuery } from '@apollo/client'
import { Col, Badge, Divider, Tag, List, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { colorBadge } from '../../asset/data/colorBadge'
import { GET_ALL_CATEGORY } from '../../graphql/product'
import AddEditCategory from './modal/addEditCategory';

export default function Category({ getRole }) {

    // console.log(getRole)
    const [getCategories, { data: CategoryDb }] = useLazyQuery(GET_ALL_CATEGORY, {
        onError: (err) => {
            console.log(err)
        },
    })

    const [updateData, setUpdateData] = useState({})
    const [sortData, setSortData] = useState(false)
    const [data, setData] = useState([])

    const [typeBtn, setTypeBtn] = useState("add")

    const [openAddEdit, setOpenAddEdit] = useState(false)

    useEffect(() => {
        getCategories({
            variables: {
                input: {
                    keyword: ""
                }
            }
        })
    }, [getCategories])

    useEffect(() => {
        setData(CategoryDb)
    }, [CategoryDb])

    const openAddEditFn = (type, e) => {
        if (type === "add") {
            setUpdateData({})
        } else {
            setUpdateData(e)
        }
        setTypeBtn(type)
        setOpenAddEdit(true)
    }

    const onSortFn = () => {

        if (sortData) {
            let newArray = [...data?.getCategories?.data]
            let array = newArray.sort(function (a, b) {
                return parseInt(a.product) - parseInt(b.product);
            })

            setData({
                getCategories: {
                    data: array
                }
            })
        } else {
            let newArray = [...data?.getCategories?.data]
            let array = newArray.sort(function (a, b) {
                return parseInt(b.product) - parseInt(a.product);
            })

            setData({
                getCategories: {
                    data: array
                }
            })
        }

        setSortData(e => !e)
    }

    return (
        <Col
            xs={6}
        >
            <AddEditCategory open={openAddEdit} setOpen={setOpenAddEdit} type={typeBtn} data={updateData} getRole={getRole} />
            <Divider orientation="left">
                ប្រភេទទំនិញ
                <Button
                    type="link"
                    size="small"
                    onClick={() => onSortFn()}
                >
                    {sortData ?
                        <SortDescendingOutlined />
                        : <SortAscendingOutlined />}
                </Button>
            </Divider>
            <List
                itemLayout="horizontal"
                dataSource={data?.getCategories?.data}
                renderItem={load => (
                    <List.Item>
                        <List.Item.Meta
                            onClick={() => openAddEditFn("update", load)}
                            title={<span><Badge color={colorBadge[parseInt(Math.random() * 10)]} text={load.description} className="click-cursor" /></span>}
                        />
                        <span
                            style={{
                                // color: colorBadge[parseInt(Math.random() * 10)]
                            }}
                        >
                            {load.product} ទំនិញ
                        </span>
                    </List.Item>
                )}
            />
            {/* {CategoryDb?.getCategories?.data?.map((load) => (
                <div
                    key={load.id}
                    onClick={() => openAddEditFn("update", load)}
                    style={{
                        width: "100%",
                        marginBottom: 5
                    }}
                >
                    <Space>
                        <Badge color={colorBadge[parseInt(Math.random() * 10)]} text={load.description} className="click-cursor" />
                        <span
                            style={{
                                // color: colorBadge[parseInt(Math.random() * 10)]
                            }}
                        >
                            {load.product} ទំនិញ
                        </span>
                    </Space>
                </div>
            ))} */}
            <br />
            {getRole?.create &&
                <Tag color="blue" className="site-tag-plus" onClick={() => openAddEditFn("add")} size="large">
                    <PlusOutlined /> បន្ថែមថ្មី
                </Tag>
            }
        </Col>
    )
}
