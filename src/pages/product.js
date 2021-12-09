import { FilterOutlined } from '@ant-design/icons';
import { useLazyQuery, useMutation } from '@apollo/client';
import { deleteObject, ref } from '@firebase/storage';
import { Button, Col, Divider, Row, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { storage } from '../api/config';
import { msgTitle } from '../asset/data/msgTitle';
import Category from '../components/product/category';
import AddEditProduct from '../components/product/modal/addEditProduct';
import SortFilterProduct from '../components/product/modal/sortFilterProduct';
import ViewProduct from '../components/product/modal/viewProduct';
import { ProductCol } from '../components/product/tableColds/productCol';
import { DataController } from '../context/dataProvider';
import { mutationCallBackFn, noticeAction } from '../functions/fn';
import { DELETE_PRODUCT, GET_ALL_PRODUCT } from '../graphql/product';
import { theme } from '../static/theme';

export default function Product() {
    const { content, urlPath} = useContext(DataController)

    let role = content?.getContentById?.profile?.contentRole

    const [getProducts, { data: dataDb, loading }] = useLazyQuery(GET_ALL_PRODUCT, {
        fetchPolicy: "network-only",
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [deleteProducts] = useMutation(DELETE_PRODUCT, mutationCallBackFn(GET_ALL_PRODUCT, 'getProducts'))

    const [getRole, setGetRole] = useState({})

    const [updateData, setUpdateData] = useState({})
    const [viewData, setViewData] = useState({})

    const [openType, setOpenType] = useState("add")

    const [openAddUpdate, setOpenAddUpdate] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [openSortFilter, setOpenSortFilter] = useState(false)

    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(100)
    const [keyword, setKeyword] = useState("")
    const [sort, setSort] = useState({
        name: "",
        value: "",
    })
    const [filter, setFilter] = useState({
        name: "",
        value: "",
    })

    useEffect(() => {
        getProducts({
            variables: {
                input: {
                    current: current,
                    limit: limit,
                    keyword: keyword,
                    sort: sort,
                    filter: filter
                }
            }
        })
    }, [limit, current, keyword, sort, filter, getProducts])

    useEffect(() => {
        setGetRole(role?.find(ele => ele.content.path === urlPath))
    }, [urlPath, role])

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
            <SortFilterProduct open={openSortFilter} setOpen={setOpenSortFilter} setSortData={setSort} setFilterData={setFilter} />
            <AddEditProduct open={openAddUpdate} setOpen={setOpenAddUpdate} type={openType} updateData={updateData} />
            <ViewProduct open={openView} setOpen={setOpenView} data={viewData} />
            <Col
                xs={18}
            >
                <Divider orientation="left">
                    ទំនិញ
                    <Button
                        type="link"
                        size="small"
                        onClick={() => setOpenSortFilter(true)}
                    >
                        <FilterOutlined />
                    </Button>
                </Divider>
                <Table
                    {...loading}
                    size={theme.tableSize}
                    bordered
                    columns={ProductCol({ getRole, current, limit, setKeyword, dataDb, onViewFn, onAddFn, onUpdateFn, onDeleteFn })}
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
            <Category getRole={getRole} />
        </Row>
    )
}
