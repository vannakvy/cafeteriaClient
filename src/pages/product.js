import { useLazyQuery, useMutation } from '@apollo/client';
import { deleteObject, ref } from '@firebase/storage';
import { Col, Divider, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { storage } from '../api/config';
import { msgTitle } from '../asset/data/msgTitle';
import Category from '../components/product/category';
import AddEditProduct from '../components/product/modal/addEditProduct';
import ViewProduct from '../components/product/modal/viewProduct';
import { ProductCol } from '../components/product/tableColds/productCol';
import { mutationCallBackFn, noticeAction } from '../functions/fn';
import { DELETE_PRODUCT, GET_ALL_PRODUCT } from '../graphql/product';

export default function Product() {
    const [getProducts, { data: dataDb, loading }] = useLazyQuery(GET_ALL_PRODUCT, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [deleteProducts] = useMutation(DELETE_PRODUCT, mutationCallBackFn(GET_ALL_PRODUCT, 'getProducts'))

    const [updateData, setUpdateData] = useState({})
    const [viewData, setViewData] = useState({})

    const [openType, setOpenType] = useState("add")

    const [openAddUpdate, setOpenAddUpdate] = useState(false)
    const [openView, setOpenView] = useState(false)

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getProducts({
            variables: {
                input: {
                    current: current,
                    limit: limit,
                    keyword: keyword
                }
            }
        })
    }, [limit, current, keyword, getProducts])

    const onAddFn = (e) => {
        setOpenType("add")
        setOpenAddUpdate(true)
    }

    const onUpdateFn = (e) => {
        setOpenType("update")
        setUpdateData(e)
        setOpenAddUpdate(true)
    }

    const onViewFn = (e) => {
        setViewData(e)
        setOpenView(true)
    }

    const onDeleteFn = (e) => {
        deleteProducts({
            variables: {
                input: {
                    id: e.id
                }
            },
            async update(_, result) {
                if(e.image){
                    const desertRef = ref(storage, `${e.image}`);
                    // Delete the file
                    await deleteObject(desertRef).then(() => {
                        // File deleted successfully
                        noticeAction("success", msgTitle.DELETE)
                    }).catch((error) => {
                        // Uh-oh, an error occurred!
                    noticeAction("error", error)
                    });
                }
            }
        })
    }

    

    return (
        <Row gutter={50}>
            <AddEditProduct open={openAddUpdate} setOpen={setOpenAddUpdate} type={openType} updateData={updateData} />
            <ViewProduct open={openView} setOpen={setOpenView} data={viewData} />
            <Col
                xs={18}
            >
                <Divider orientation="left">
                    ទំនិញ
                </Divider>
                <Table
                    {...loading}
                    size="small"
                    bordered
                    columns={ProductCol({ current, limit, setKeyword, dataDb, onViewFn, onAddFn, onUpdateFn, onDeleteFn })}
                    dataSource={dataDb?.getProducts?.data}
                    sticky
                    scroll={{ x: 500 }}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: true,
                        total: dataDb?.getProducts?.pagination?.count,
                        pageSize: limit,
                        current: current,
                        onChange: (page, pageSize) => {
                            setCurrent(page)
                            setLimit(pageSize)
                        }
                    }}
                />
            </Col>
            <Category />
        </Row>
    )
}
