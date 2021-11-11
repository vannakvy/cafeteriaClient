import { useLazyQuery } from '@apollo/client'
import { Col, Badge, Divider, Tag, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { colorBadge } from '../../asset/data/colorBadge'
import { GET_ALL_CATEGORY } from '../../graphql/product'
import AddEditCategory from './modal/addEditCategory';

export default function Category() {
    const [getCategories, { data: CategoryDb }] = useLazyQuery(GET_ALL_CATEGORY, {
        onError: (err) => {
            console.log(err)
        },
    })

    const [updateData, setUpdateData] = useState({})

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

    const openAddEditFn = (type, e) => {
        if (type === "add") {
            setUpdateData({})
        } else {
            setUpdateData(e)
        }
        setTypeBtn(type)
        setOpenAddEdit(true)
    }

    return (
        <Col
            xs={6}
        >
            <AddEditCategory open={openAddEdit} setOpen={setOpenAddEdit} type={typeBtn} data={updateData} />
            <Divider orientation="left">
                ប្រភេទទំនិញ
            </Divider>
            {CategoryDb?.getCategories?.data?.map((load) => (
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
            ))}
            <br />
            <Tag color="blue" className="site-tag-plus" onClick={() => openAddEditFn("add")}>
                <PlusOutlined /> បន្ថែមថ្មី
            </Tag>
        </Col>
    )
}
