import { DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Button, Col, Descriptions, Divider, InputNumber, Popconfirm, Row, Table, Typography } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { msgTitle } from '../../asset/data/msgTitle'
import { isHex, mutationCallBackFn, noticeAction } from '../../functions/fn'
import { GET_ALL_PRODUCT } from '../../graphql/product'
import { UPDATE_PURCHASEORDER, VIEW_PURCHASEORDER_BY_ID, DELETE_PURCHASEORDER, ADD_SUB_PURCHASEORDER, DELETE_SUB_PURCHASEORDER } from '../../graphql/purchaseOrder'
import MapViewOrder from './comp/mapViewOrder'
import PrintPurchaseOrder from './modal/printPurchaseOrder'
import UpdateSupplier from './modal/updateCustomer'
// import UpdateCustomer from './modal/updateCustomer'
// import UpdateDeliver from './modal/updateDeliver'
// import UpdateLocation from './modal/updateLocation'
// import UpdatetStatus from './modal/updateStatus'
import UpdateViewSubOrder from './modal/updateViewSubOrder'
import { CartViewCol } from './tableCols/cartViewCol'

export default function ViewPurchaseOrder() {
    let history = useHistory()
    let { slug } = useParams()

    const [getProducts, { data: ProductSearchDb }] = useLazyQuery(GET_ALL_PRODUCT, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const { data: PurchaseOrderDb } = useQuery(VIEW_PURCHASEORDER_BY_ID, {
        variables: {
            input: {
                id: slug
            }
        },
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [updatePurchaseOrders] = useMutation(UPDATE_PURCHASEORDER, mutationCallBackFn(VIEW_PURCHASEORDER_BY_ID, 'getPurchaseOrderById'))

    const [deletePurchaseOrders] = useMutation(DELETE_PURCHASEORDER)
    const [setSubPurchaseOrders] = useMutation(ADD_SUB_PURCHASEORDER, mutationCallBackFn(VIEW_PURCHASEORDER_BY_ID, 'getPurchaseOrderById'))
    const [deleteSubPurchaseOrders] = useMutation(DELETE_SUB_PURCHASEORDER, mutationCallBackFn(VIEW_PURCHASEORDER_BY_ID, 'getPurchaseOrderById'))

    let data = PurchaseOrderDb?.getPurchaseOrderById
    
    let supplierData = {
        orderId: data?.id,
        supplier: data?.supplier?.id,
        tel: data?.tel,
        remark: data?.remark,
        date: moment(data?.date)
    }

    let supplierMap = {
        lat: data?.supplier?.geolocation?.lat === null || data?.supplier?.geolocation?.lat === undefined ? 13.363175493211273 : data?.supplier?.geolocation?.lat,
        lng: data?.supplier?.geolocation?.long === null|| data?.supplier?.geolocation?.long === undefined ? 103.85653437154804 : data?.supplier?.geolocation?.long
    }

    const [totalBL, setTotalBL] = useState({
        subTotal: 0,
        tax: 0,
        offer: 0,
        delivery: 0,
        grandTotal: 0,
        payment: 0,
        noPaid: 0
    })
    const [totalQty, setTotalQty] = useState(0)
    const [selectValue, setSelectValue] = useState({})

    const [addTax, setAddTax] = useState(false)
    const [addOffer, setAddOffer] = useState(false)
    const [addDelivery, setAddDelivery] = useState(false)
    const [addPayment, setAddPayment] = useState(false)

    const [openPrint, setOpenPrint] = useState(false)
    const [openProductDetail, setOpenProductDetail] = useState(false)
    const [openUpdateSupplier, setOpenUpdateSupplier] = useState(false)

    const [searchKeyword, setSearchKeyword] = useState("")

    useEffect(() => {
        let subTotal = 0
        let sumQty = 0
        data?.products?.map(load => subTotal += load.total)
        data?.products?.map(load => sumQty += load.qty)

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
    }, [data?.products])

    useEffect(() => {
        if(data){
            setTotalBL({
                subTotal: data?.subTotal,
                tax: data?.tax,
                offer: data?.offer,
                delivery: data?.delivery,
                payment: data?.payment,
                grandTotal: data?.subTotal + data?.tax - data?.offer + data?.delivery,
                noPaid: (data?.subTotal + data?.tax - data?.offer + data?.delivery) - data?.payment
            })
        }
    }, [data])

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

    // console.log(data)

    const handleSearch = (value) => {
        setSearchKeyword(value)

        if (isHex(value)) {
            // pushToCart(value)
            let array = ProductSearchDb?.getProducts?.data?.find(ele => ele.id === value)

            if (array > -1) {
                let newArray = {
                    orderId: data?.id,
                    id: array.id,
                    qty: 1,
                    price: array.price,
                    total: array.price,
                    remark: ""
                }

                setSubPurchaseOrders({
                    variables: {
                        input: newArray
                    },
                    update(_, result) {
                        noticeAction("success", msgTitle.CREATE)
                    }
                })
            }

            setSearchKeyword("")
        }
    };


    const onSelect = (value) => {
        // pushToCart(value)
        // console.log(value)

        let array = ProductSearchDb?.getProducts?.data?.find(ele => ele.id === value)

        if (array) {
            let newArray = {
                orderId: data?.id,
                id: array.id,
                qty: 1,
                price: array.price,
                total: array.price,
                remark: ""
            }

            setSubPurchaseOrders({
                variables: {
                    input: newArray
                },
                update(_, result) {
                    noticeAction("success", msgTitle.CREATE)
                }
            })
        }
    };

    const onUpdateFn = (e) => {
        let newArray = {
            orderId: data?.id,
            id: e.id,
            image: e.product.image,
            description: e.product.description,
            um: e.product.um,
            qty: e.qty,
            price: e.price,
            total: e.total,
            remark: e.remark
        }

        setSelectValue(newArray)
        setOpenProductDetail(true)
    }

    const onUpdateTotalBL = (e) => {
        updatePurchaseOrders({
            variables: {
                input: e
            },
            update(_, result) {
                noticeAction("success", msgTitle.UPDATE)
            }
        })
    }

    const onDeleteFn = (e) => {
        deleteSubPurchaseOrders({
            variables: {
                input: {
                    id: e.id
                }
            },
            update(_, result) {
                // console.log(result)
                noticeAction("success", msgTitle.UPDATE)
            }
        })
    }

    const onDeleteRecieptFn = () => {
        deletePurchaseOrders({
            variables: {
                input: {
                    id: data?.id
                }
            },
            update(_, result) {
                history.push("/saleorder")
                noticeAction("success", msgTitle.DELETE)
            }
        })
    }

    const clearDataFn = () => {
        setOpenPrint(false)
    }

    console.log(data)

    return (
        <div>
            <UpdateViewSubOrder open={openProductDetail} setOpen={setOpenProductDetail} selectData={selectValue} />
            <PrintPurchaseOrder open={openPrint} setOpen={setOpenPrint} data={data} clearDataFn={clearDataFn} />
            <UpdateSupplier open={openUpdateSupplier} setOpen={setOpenUpdateSupplier} data={supplierData} />
            {/* <UpdateLocation open={openUpdateLocation} setOpen={setOpenUpdateLocation} data={customerData} />
            <UpdateDeliver open={openUpdateDeliver} setOpen={setOpenUpdateDeliver} data={deliverData} /> */}
            {/* <UpdatetStatus open={openUpdateStatus} setOpen={setOpenUpdateStatus} updateData={data} /> */}
            <Row gutter={16}>
                <Col
                    xs={24}
                    md={10}
                >
                    <Typography.Title level={4}>វិក័យបត្រ៖ {data?.id}</Typography.Title>
                    <Typography.Text strong>កាលបរិច្ឆេទ៖ {moment(data?.date).format("DD-MMM-YYYY")}</Typography.Text>
                    <Divider orientation="left">អ្នកផ្គត់ផ្គង់</Divider>
                    <Descriptions bordered size="small">
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ក្រុមហ៊ុនឈ្មោះ៖" span={3}>
                            {data?.supplier?.companyName}
                            <Button
                                size="small"
                                type="link"
                                onClick={() => setOpenUpdateSupplier(true)}
                            >
                                <EditOutlined />
                            </Button>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ទូរស័ព្ទ៖" span={3}>+855(0){data?.tel}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ចំណាំ៖" span={3}>{data?.remark}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ទីតាំង៖" span={3}>
                            ({data?.supplier?.geolocation?.lat ? data?.supplier?.geolocation?.lat : 0}, {data?.supplier?.geolocation?.long ? data?.supplier?.geolocation?.long : 0})
                        </Descriptions.Item>
                    </Descriptions>
                    
                    <Divider orientation="left">ទីតាំង</Divider>
                    <div style={{ height: '400px', width: '100%' }}>
                        {data?.supplier?.geolocation?.lat !== 0 ? <MapViewOrder supplierMap={supplierMap} /> :
                            <Typography.Text mark>មិនមានទីតាំង</Typography.Text>
                        }
                    </div>
                </Col>
                <Col
                    xs={24}
                    md={14}
                >
                    <Col
                        xs={24}
                    >
                        <Divider orientation="left">ទំនិញ</Divider>
                        <Table
                            bordered
                            columns={CartViewCol({ ProductSearchDb, searchKeyword, handleSearch, onSelect, onUpdateFn, onDeleteFn })}
                            dataSource={data?.products}
                            sticky
                            scroll={{ x: 500, y: 200 }}
                            rowKey={record => record.product.id}
                            pagination={false}
                            size="small"
                        />
                    </Col>
                    <Col
                        xs={24}
                    >
                        <Row gutter={16}>
                            <Col
                                xs={24}
                                md={{ offset: 12, span: 12 }}
                            >
                                <div
                                    style={{
                                        paddingTop: 10,
                                        textAlign: "right"
                                    }}
                                >
                                    <Typography.Text
                                        mark
                                    >
                                        ({data?.products?.length} មុខ និង {totalQty} ទំនិញ)
                                    </Typography.Text>
                                </div>
                            </Col>
                        </Row>
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
                                                <EditOutlined />
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
                                                onBlur={e => {
                                                    setAddTax(!addTax)  
                                                    onUpdateTotalBL({
                                                        id: data?.id,
                                                        tax: parseFloat(e.target.value)
                                                    })
                                                }}
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
                                                <EditOutlined />
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
                                                onBlur={e => onUpdateTotalBL({
                                                    id: data?.id,
                                                    offer: parseFloat(e.target.value)
                                                })}
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
                                                <EditOutlined />
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
                                                onBlur={e => onUpdateTotalBL({
                                                    id: data?.id,
                                                    delivery: parseFloat(e.target.value)
                                                })}
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
                                                <EditOutlined />
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
                                                onBlur={e => onUpdateTotalBL({
                                                    id: data?.id,
                                                    payment: parseFloat(e.target.value)
                                                })}
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
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        xs={24}
                        style={{
                            marginTop: 20
                        }}
                    >
                        <Row
                            gutter={[16, 16]}
                        >
                            <Col
                                xs={12}
                            >
                                <Button
                                    style={{
                                        width: "100%"
                                    }}
                                    icon={<PrinterOutlined />}
                                    type="primary"
                                    onClick={() => setOpenPrint(true)}
                                >
                                    បោះពុម្ព
                                </Button>
                            </Col>
                            <Col
                                xs={12}
                            >
                                <Popconfirm
                                    title="តើអ្នកចង់លុបមែនទេ?"
                                    okText="ចង់"
                                    cancelText="មិនចង់"
                                    okType="danger"
                                    onConfirm={() => onDeleteRecieptFn()}
                                >
                                    <Button
                                        type="primary"
                                        danger
                                        icon={<DeleteOutlined />}
                                        style={{
                                            width: "100%"
                                        }}
                                    >
                                        លុបវិក័យបត្រ
                                    </Button>
                                </Popconfirm>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}
