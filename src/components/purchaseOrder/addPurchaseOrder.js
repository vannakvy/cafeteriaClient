import React, { useEffect, useState } from 'react'
import { Row, Col, AutoComplete, Input, Divider, Button, Empty, Image, Typography, Pagination, Table, Descriptions, InputNumber, Timeline } from 'antd'
import { GET_ALL_CATEGORY, GET_ALL_PRODUCT, GET_PRODUCT_BY_CTG } from '../../graphql/product'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { isHex, noticeAction, searchOptions, convertProduct } from '../../functions/fn'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import { CartCol } from './tableCols/cartCol'
import UpdateCart from './modal/updateCart'
import AddSupplierToPO from './modal/addSupplierToPO'
import { msgTitle } from '../../asset/data/msgTitle'
import { ADD_PURCHASEORDER } from '../../graphql/purchaseOrder'
import PrintPurchaseOrder from './modal/printPurchaseOrder'

export default function AddPurchaseOrder() {
    const { data: CategoryDb } = useQuery(GET_ALL_CATEGORY, {
        onError: (err) => {
            console.log(err)
        },
    })

    const [getProducts, { data: ProductSearchDb }] = useLazyQuery(GET_ALL_PRODUCT, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [getProductBySelectCTG, { data: ProductDb }] = useLazyQuery(GET_PRODUCT_BY_CTG, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [setPurchaseOrders] = useMutation(ADD_PURCHASEORDER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        }
    })

    const [cartData, setCartData] = useState([])
    const [selectValue, setSelectValue] = useState({})
    const [totalQty, setTotalQty] = useState(0)
    const [totalBL, setTotalBL] = useState({
        subTotal: 0,
        tax: 0,
        offer: 0,
        delivery: 0,
        grandTotal: 0,
        payment: 0,
        noPaid: 0
    })
    const [supplierData, setSupplierData] = useState({
        date: moment()
    })
    const [printData, setPrintData] = useState({})

    const [addTax, setAddTax] = useState(false)
    const [addOffer, setAddOffer] = useState(false)
    const [addDelivery, setAddDelivery] = useState(false)
    const [addPayment, setAddPayment] = useState(false)
    const [activeCategory, setActiveCategory] = useState("all")

    const [openProductDetail, setOpenProductDetail] = useState(false)
    const [openAddSupplier, setOpenAddSupplier] = useState(false)
    // const [openAddLocation, setOpenAddLocation] = useState(false)
    // const [openAddDeliver, setOpenAddDeliver] = useState(false)
    const [openPrint, setOpenPrint] = useState(false)

    const [searchKeyword, setSearchKeyword] = useState("")
    const [current, setCurrent] = useState(1)
    const [limit, setLimit] = useState(8)

    useEffect(() => {
        getProducts({
            variables: {
                input: {
                    current: 1,
                    limit: 5,
                    keyword: searchKeyword
                }
            }
        })
    }, [searchKeyword, getProducts])

    useEffect(() => {
        getProductBySelectCTG({
            variables: {
                input: {
                    id: activeCategory,
                    current: current,
                    limit: limit,
                }
            },
        })
    }, [getProductBySelectCTG, activeCategory, current, limit])

    useEffect(() => {
        let subTotal = 0
        let sumQty = 0
        cartData?.map(load => subTotal += load.total)
        cartData?.map(load => sumQty += load.qty)

        setTotalQty(e => sumQty)

        setTotalBL(e => ({
            subTotal: subTotal,
            tax: e.tax,
            offer: e.offer,
            delivery: e.delivery,
            payment: e.payment,
            grandTotal: subTotal + e.tax - e.offer + e.delivery,
            noPaid: (subTotal + e.tax - e.offer + e.delivery) - e.payment
        }))
    }, [cartData, addTax, addOffer, addDelivery, addPayment])

    const selectCategoryFn = (e) => {
        setActiveCategory(e.id)
    }

    const handleSearch = (value) => {
        setSearchKeyword(value)

        if (isHex(value)) {
            pushToCart(value)
            setSearchKeyword("")
        }
    };


    const onSelect = (value) => {
        pushToCart(value)
    };

    const pushToCart = (e) => {
        let findData = ProductSearchDb?.getProducts?.data.find(ele => ele.id === e)

        let newArray = [...cartData]
        let index = cartData?.findIndex(ele => ele.product === findData.id)

        if (index === -1) {
            newArray.push({
                ...findData,
                product: findData?.id,
                qty: 1,
                price: findData.price,
                total: 1 * findData.price,
                remark: ""
            })
        } else {
            newArray[index].qty = newArray[index].qty + 1
            newArray[index].price = findData.price
            newArray[index].total = (newArray[index].qty) * findData.price
        }

        setCartData(newArray)
        setSearchKeyword("")
    }


    const onSelectCard = (value) => {
        let newArray = [...cartData]
        let index = cartData?.findIndex(ele => ele.product === value.id)

        if (index === -1) {
            newArray.push({
                ...value,
                product: value?.id,
                qty: 1,
                price: value.price,
                total: 1 * value.price,
                remark: ""
            })
        } else {
            newArray[index].qty = newArray[index].qty + 1
            newArray[index].price = value.price
            newArray[index].total = (newArray[index].qty) * value.price
        }

        setCartData(newArray)

    };


    const onShowSizeChange = (current, pageSize) => {
        setCurrent(current)
        setLimit(pageSize)
        getProductBySelectCTG({
            variables: {
                input: {
                    id: activeCategory,
                    current: current,
                    limit: pageSize,
                }
            },
        })
    }

    const onUpdateFn = (e) => {
        setSelectValue(e)
        setOpenProductDetail(true)
    }

    const onDeleteFn = (e) => {
        let array = [...cartData]
        array.splice(e, 1)
        setCartData(array)
    }

    const onSubmitFn = () => {
        let newArray = {
            supplier: supplierData?.supplier,
            tel: supplierData?.tel,
            remark: supplierData?.remark,
            date: supplierData?.date,
            products: convertProduct(cartData),
            subTotal: totalBL?.subTotal,
            tax: totalBL?.tax,
            offer: totalBL?.offer,
            delivery: totalBL?.delivery,
            grandTotal: totalBL?.grandTotal,
            payment: totalBL?.payment,
        }

        // console.log(newArray)

        setPurchaseOrders({
            variables: {
                input: newArray
            },
            update(_, result) {
                // console.log(result)
                noticeAction("success", msgTitle.CREATE)
                // history.push("/saleorder")
                // history.goBack()
                setPrintData(result?.data?.setPurchaseOrders)
                setOpenPrint(true)
            }
        })
    }

    const clearDataFn = () => {
        setOpenPrint(false)
        setCartData([])
        setSelectValue({})
        setTotalQty(0)
        setTotalBL({
            subTotal: 0,
            tax: 0,
            offer: 0,
            delivery: 0,
            grandTotal: 0,
            payment: 0,
            noPaid: 0
        })
        setSupplierData({
            date: moment()
        })
        setPrintData({})
    }

    return (
        <div>
            <UpdateCart open={openProductDetail} setOpen={setOpenProductDetail} selectData={selectValue} cartData={cartData} setCartData={setCartData} />
            <AddSupplierToPO open={openAddSupplier} setOpen={setOpenAddSupplier} data={supplierData} setData={setSupplierData} />
            <PrintPurchaseOrder open={openPrint} setOpen={setOpenPrint} data={printData} clearDataFn={clearDataFn} />
            <Row gutter={16}>
                <Col
                    xs={24}
                    md={10}
                >
                    <Row gutter={[16, 16]}>
                        <Col
                            xs={24}
                        >
                            <Row gutter={16}>
                                <Col
                                    xs={24}
                                >
                                    <AutoComplete
                                        dropdownMatchSelectWidth={252}
                                        style={{
                                            width: "100%",
                                        }}
                                        options={searchOptions(ProductSearchDb?.getProducts?.data)}
                                        onSelect={onSelect}
                                        onSearch={handleSearch}
                                        value={searchKeyword}
                                    >
                                        <Input
                                            prefix={<SearchOutlined />}
                                            placeholder="ស្វែងរក..."
                                        />
                                    </AutoComplete>
                                </Col>
                                <Col
                                    xs={24}
                                >
                                    <Divider orientation="left">ប្រភេទទំនិញ៖</Divider>
                                </Col>
                                <Col
                                    xs={12}
                                    md={6}
                                    key={"all"}
                                >
                                    <Button
                                        type={activeCategory === "all" ? "primary" : "dashed"}
                                        style={{
                                            width: "100%"
                                        }}
                                        onClick={() => selectCategoryFn({
                                            id: "all"
                                        })}
                                    >
                                        ទាំងអស់
                                    </Button>
                                </Col>
                                {
                                    CategoryDb?.getCategories?.data?.map(load => (
                                        <Col
                                            xs={12}
                                            md={6}
                                            key={load.id}
                                        >
                                            <Button
                                                type={activeCategory === load.id ? "primary" : "dashed"}
                                                style={{
                                                    width: "100%"
                                                }}
                                                onClick={() => selectCategoryFn(load)}
                                            >
                                                {load.description}
                                            </Button>
                                        </Col>
                                    ))
                                }
                                <Col
                                    xs={24}
                                    style={{
                                        paddingTop: 20
                                    }}
                                >
                                    <Row
                                        gutter={16}
                                    >
                                        <Col
                                            xs={24}
                                        >
                                            <Divider orientation="left">ទំនិញ៖</Divider>
                                        </Col>
                                        {
                                            !ProductDb || ProductDb?.getProductBySelectCTG?.data?.length === 0 ? (
                                                <Col
                                                    xs={24}
                                                >
                                                    <Empty />
                                                </Col>
                                            ) : (
                                                ProductDb?.getProductBySelectCTG?.data?.map(load => (
                                                    <Col
                                                        xs={12}
                                                        md={6}
                                                        key={load.id}
                                                    >
                                                        <div
                                                            className="go-card"
                                                            onClick={() => onSelectCard(load)}
                                                        >
                                                            <Image
                                                                src={load.image}
                                                                preview={false}
                                                            />
                                                            <Typography.Title level={5}>
                                                                {load.description}
                                                            </Typography.Title>
                                                            <Typography.Text mark>
                                                                តម្លៃ៖ {load.price}$ /{load.um}
                                                            </Typography.Text><br />
                                                            <Typography.Text ellipsis={true}>
                                                                {load.id}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                ))
                                            )
                                        }
                                        <Col
                                            xs={24}
                                            style={{
                                                paddingTop: 20,
                                            }}
                                        >
                                            <Pagination
                                                showSizeChanger
                                                pageSizeOptions={[8, 16, 32]}
                                                onChange={onShowSizeChange}
                                                pageSize={limit}
                                                current={current}
                                                total={ProductDb?.getProductBySelectCTG?.pagination?.count}
                                                style={{
                                                    float: "right"
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col
                    xs={24}
                    md={14}
                >
                    <Col
                        xs={24}
                    >
                        <Table
                            bordered
                            columns={CartCol({ onUpdateFn, onDeleteFn })}
                            dataSource={cartData}
                            sticky
                            scroll={{ x: 500, y: 200 }}
                            rowKey={record => record.product}
                            pagination={false}
                            size="small"
                        />
                        <div
                            style={{
                                paddingTop: 10,
                                textAlign: "right"
                            }}
                        >
                            <Typography.Text
                                mark
                            >
                                ({cartData?.length} មុខ និង {totalQty} ទំនិញ)
                            </Typography.Text>
                        </div>
                        {/* </div> */}
                    </Col>
                    <Col
                        xs={24}
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <Row gutter={16}>
                            <Col
                                xs={24}
                                md={12}
                            >
                                <Timeline>
                                    <Timeline.Item color={supplierData.companyName ? "green" : "red"}>
                                        <p>
                                            អ្នកផ្គត់ផ្គង់៖ {supplierData.companyName}
                                            <Button
                                                size="small"
                                                type="link"
                                                onClick={() => setOpenAddSupplier(!openAddSupplier)}
                                            >
                                                <PlusCircleOutlined />
                                            </Button>
                                        </p>
                                        <p>លេខទូរស័ព្ទ៖ {supplierData.tel}</p>
                                        <p>កាលបរិច្ឆេទ៖ {moment(supplierData.date).format("DD-MMM-YYYY")}</p>
                                        <p>ចំណាំ៖ {supplierData.remark}</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Col>
                            <Col
                                xs={24}
                                md={12}
                            >
                                <Descriptions
                                    bordered
                                    size="small"
                                >
                                    <Descriptions.Item
                                        labelStyle={{
                                            fontWeight: "bolder"
                                        }}
                                        contentStyle={{
                                            textAlign: "right"
                                        }}
                                        label="តម្លៃសរុប"
                                        span={3}
                                    >
                                        {totalBL.subTotal}$
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span>
                                            កាត់ពន្ធ
                                            <Button
                                                size="small"
                                                type="link"
                                                onClick={() => setAddTax(!addTax)}
                                            >
                                                <PlusCircleOutlined />
                                            </Button>
                                        </span>}
                                        span={3}
                                        contentStyle={{
                                            textAlign: "right"
                                        }}
                                    >
                                        {addTax ? (
                                            <InputNumber
                                                style={{
                                                    width: 100,
                                                    textAlign: "right"
                                                }}
                                                value={totalBL.tax}
                                                onChange={e => {
                                                    setTotalBL(ele => ({
                                                        ...ele,
                                                        tax: e
                                                    }))
                                                }
                                                }
                                                onBlur={e => setAddTax(!addTax)}
                                            />
                                        ) :
                                            totalBL.tax + "$"
                                        }

                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span>
                                            បញ្ចុះតម្លៃ
                                            <Button
                                                size="small"
                                                type="link"
                                                onClick={() => setAddOffer(!addOffer)}
                                            >
                                                <PlusCircleOutlined />
                                            </Button>
                                        </span>}
                                        span={3}
                                        contentStyle={{
                                            textAlign: "right"
                                        }}
                                    >
                                        {addOffer ? (
                                            <InputNumber
                                                style={{
                                                    width: 100,
                                                    textAlign: "right"
                                                }}
                                                value={totalBL.offer}
                                                onChange={e => {
                                                    setTotalBL(ele => ({
                                                        ...ele,
                                                        offer: e
                                                    }))
                                                }
                                                }
                                                onBlur={e => setAddOffer(!addOffer)}
                                            />
                                        ) :
                                            totalBL.offer + "$"
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span>
                                            តម្លៃដឹកជញ្ជូន
                                            <Button
                                                size="small"
                                                type="link"
                                                onClick={() => setAddDelivery(!addDelivery)}
                                            >
                                                <PlusCircleOutlined />
                                            </Button>
                                        </span>}
                                        span={3}
                                        contentStyle={{
                                            textAlign: "right"
                                        }}
                                    >
                                        {addDelivery ? (
                                            <InputNumber
                                                style={{
                                                    width: 100,
                                                    textAlign: "right"
                                                }}
                                                value={totalBL.delivery}
                                                onChange={e => {
                                                    setTotalBL(ele => ({
                                                        ...ele,
                                                        delivery: e
                                                    }))
                                                }
                                                }
                                                onBlur={e => setAddDelivery(!addDelivery)}
                                            />
                                        ) :
                                            totalBL.delivery + "$"
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        labelStyle={{
                                            fontWeight: "bolder"
                                        }}
                                        label="តម្លៃសរុបចុងក្រោយ"
                                        span={3}
                                        contentStyle={{
                                            textAlign: "right"
                                        }}
                                    >
                                        {totalBL.grandTotal}$
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span>
                                            ការទូរទាត់៖
                                            <Button
                                                size="small"
                                                type="link"
                                                onClick={() => setAddPayment(!addPayment)}
                                            >
                                                <PlusCircleOutlined />
                                            </Button>
                                        </span>}
                                        span={3}
                                        contentStyle={{
                                            textAlign: "right"
                                        }}
                                    >
                                        {addPayment ? (
                                            <InputNumber
                                                style={{
                                                    width: 100,
                                                    textAlign: "right"
                                                }}
                                                value={totalBL.payment}
                                                onChange={e => {
                                                    setTotalBL(ele => ({
                                                        ...ele,
                                                        payment: e
                                                    }))
                                                }
                                                }
                                                onBlur={e => setAddPayment(!addPayment)}
                                            />
                                        ) :
                                            totalBL.payment + "$"
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        labelStyle={{
                                            fontWeight: "bolder"
                                        }}
                                        label="តម្លៃមិនទាន់ទូទាត់"
                                        span={3}
                                        contentStyle={{
                                            textAlign: "right"
                                        }}
                                    >
                                        {totalBL.noPaid}$
                                    </Descriptions.Item>
                                </Descriptions>
                                <Button
                                    type="primary"
                                    style={{
                                        marginTop: 20,
                                        width: "100%"
                                    }}
                                    disabled={supplierData?.companyName && cartData.length !== 0 ? false : true}
                                    onClick={() => onSubmitFn()}
                                >
                                    បង្កើត
                                </Button>
                            </Col>

                        </Row>
                    </Col>

                </Col>
            </Row>
        </div>
    )
}
