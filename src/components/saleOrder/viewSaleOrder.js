import { DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Button, Col, Descriptions, Divider, InputNumber, Popconfirm, Rate, Row, Steps, Table, Typography } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { msgTitle } from '../../asset/data/msgTitle'
import { isHex, mutationCallBackFn, noticeAction } from '../../functions/fn'
import { GET_ALL_PRODUCT } from '../../graphql/product'
import { ADD_SUB_SALEORDER, DELETE_SALEORDER, DELETE_SUB_SALEORDER, UPDATE_SALEORDER, VIEW_SALEORDER_BY_ID } from '../../graphql/saleOrder'
import { theme } from '../../static/theme'
import MapViewOrder from './comp/mapViewOrder'
import PrintSaleOrder from './modal/printSaleOrder'
import UpdateCustomer from './modal/updateCustomer'
import UpdateDeliver from './modal/updateDeliver'
import UpdateLocation from './modal/updateLocation'
import UpdatetStatus from './modal/updateStatus'
import UpdateViewSubOrder from './modal/updateViewSubOrder'
import { CartViewCol } from './tableCols/cartViewCol'

export default function ViewSaleOrder() {
    let history = useHistory()
    let { slug } = useParams()

    const [getProducts, { data: ProductSearchDb }] = useLazyQuery(GET_ALL_PRODUCT, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const { data: SaleOrderDb } = useQuery(VIEW_SALEORDER_BY_ID, {
        variables: {
            input: {
                id: slug
            }
        },
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [updateSaleOrders] = useMutation(UPDATE_SALEORDER, mutationCallBackFn(VIEW_SALEORDER_BY_ID, 'getSaleOrderById'))

    let data = SaleOrderDb?.getSaleOrderById
    let customerData = {
        orderId: data?.id,
        id: data?.customer?.id?.id,
        tel: data?.customer?.tel,
        remark: data?.customer?.remark,
        geolocation: {
            lat: data?.customer?.geolocation?.lat,
            long: data?.customer?.geolocation?.long,
            placename: data?.customer?.geolocation?.placename
        },
        date: moment(data?.date)
    }
    // let customerLocationData = {
    //     orderId: data?.id,
    //     geolocation: data?.customer?.geolocation
    // }
    let deliverData = {
        orderId: data?.id,
        id: data?.deliver?.id?.id,
        tel: data?.deliver?.tel,
        remark: data?.deliver?.remark,
        geolocation: {
            lat: data?.deliver?.geolocation?.lat,
            long: data?.deliver?.geolocation?.long,
        },
    }

    const [deleteSaleOrders] = useMutation(DELETE_SALEORDER)
    const [setSubSaleOrders] = useMutation(ADD_SUB_SALEORDER, mutationCallBackFn(VIEW_SALEORDER_BY_ID, 'getSaleOrderById'))
    const [deleteSubSaleOrders] = useMutation(DELETE_SUB_SALEORDER, mutationCallBackFn(VIEW_SALEORDER_BY_ID, 'getSaleOrderById'))

    let customerMap = {
        lat: data?.customer?.geolocation?.lat === undefined ? 13.363175493211273 : data?.customer?.geolocation?.lat,
        lng: data?.customer?.geolocation?.long === undefined ? 103.85653437154804 : data?.customer?.geolocation?.long
    }

    let deliverMap = {
        lat: data?.deliver?.geolocation?.lat === undefined ? 13.363175493211273 : data?.deliver?.geolocation?.lat,
        lng: data?.deliver?.geolocation?.long === undefined ? 103.85653437154804 : data?.deliver?.geolocation?.long
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
    const [status, setStatus] = useState(0)
    const [status2, setStatus2] = useState(null)

    const [addTax, setAddTax] = useState(false)
    const [addOffer, setAddOffer] = useState(false)
    const [addDelivery, setAddDelivery] = useState(false)
    const [addPayment, setAddPayment] = useState(false)

    const [openPrint, setOpenPrint] = useState(false)
    const [openProductDetail, setOpenProductDetail] = useState(false)
    const [openUpdateCustomer, setOpenUpdateCustomer] = useState(false)
    const [openUpdateLocation, setOpenUpdateLocation] = useState(false)
    const [openUpdateDeliver, setOpenUpdateDeliver] = useState(false)
    const [openUpdateStatus, setOpenUpdateStatus] = useState(false)

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
        if (data) {
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
                    keyword: searchKeyword,
                    sort: {
                        name: "",
                        value: "",
                    },
                    filter: {
                        name: "",
                        value: "",
                    }
                }
            }
        })
    }, [searchKeyword, getProducts])

    useEffect(() => {
        if (data) {
            if (!data?.status?.isPrepared && !data?.status?.isCooked && !data?.status?.isDelivered && !data?.status?.isPaid && !data?.status?.canceled) {
                setStatus(null)
                setStatus2(null)
            } else if (data?.status?.isPrepared && !data?.status?.isCooked && !data?.status?.isDelivered && !data?.status?.isPaid && !data?.status?.isCanceled) {
                setStatus(0)
                setStatus2(null)
            } else if (data?.status?.isPrepared && data?.status?.isCooked && !data?.status?.isDelivered && !data?.status?.isPaid && !data?.status?.isCanceled) {
                setStatus(1)
                setStatus2(null)
            } else if (data?.status?.isPrepared && data?.status?.isCooked && data?.status?.isDelivered && !data?.status?.isPaid && !data?.status?.isCanceled) {
                setStatus(2)
                setStatus2(null)
            } else if (data?.status?.isPrepared && data?.status?.isCooked && data?.status?.isDelivered && data?.status?.isPaid && !data?.status?.isCanceled) {
                setStatus(2)
                setStatus2(0)
            } else if (data?.status?.isPrepared && data?.status?.isCooked && data?.status?.isDelivered && data?.status?.isPaid && data?.status?.isCanceled) {
                setStatus(2)
                setStatus2(1)
            } else {
                setStatus(null)
                setStatus2(null)
            }
        }
    }, [data])

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

                setSubSaleOrders({
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

            setSubSaleOrders({
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
        updateSaleOrders({
            variables: {
                input: e
            },
            update(_, result) {
                noticeAction("success", msgTitle.UPDATE)
            }
        })
    }

    const onDeleteFn = (e) => {
        deleteSubSaleOrders({
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
        deleteSaleOrders({
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
            <PrintSaleOrder open={openPrint} setOpen={setOpenPrint} data={data} clearDataFn={clearDataFn} />
            <UpdateCustomer open={openUpdateCustomer} setOpen={setOpenUpdateCustomer} data={customerData} />
            <UpdateLocation open={openUpdateLocation} setOpen={setOpenUpdateLocation} data={customerData} />
            <UpdateDeliver open={openUpdateDeliver} setOpen={setOpenUpdateDeliver} data={deliverData} />
            <UpdatetStatus open={openUpdateStatus} setOpen={setOpenUpdateStatus} updateData={data} />
            <Row gutter={16}>
                <Col
                    xs={24}
                    md={10}
                >
                    <Typography.Title level={4}>វិក័យបត្រ៖ {data?.id}</Typography.Title>
                    <Typography.Text strong>កាលបរិច្ឆេទ៖ {moment(data?.date).format("DD-MMM-YYYY")}</Typography.Text>
                    <Divider orientation="left">អតិថិជន</Divider>
                    <Descriptions bordered size="small">
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ឈ្មោះ៖" span={3}>
                            {data?.customer?.id?.lname} {data?.customer?.id?.fname}
                            <Button
                                size="small"
                                type="link"
                                onClick={() => setOpenUpdateCustomer(true)}
                            >
                                <EditOutlined />
                            </Button>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ទូរស័ព្ទ៖" span={3}>+855(0){data?.customer?.tel}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ចំណាំ៖" span={3}>{data?.customer?.remark}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ទីតាំង៖" span={3}>
                            ({data?.customer?.geolocation?.lat}, {data?.customer?.geolocation?.long})
                            <Button
                                size="small"
                                type="link"
                                onClick={() => setOpenUpdateLocation(true)}
                            >
                                <EditOutlined />
                            </Button>
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left">អ្នកដឹកជញ្ជូន</Divider>
                    <Descriptions bordered size="small">
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ឈ្មោះ៖" span={3}>
                            {data?.deliver?.id?.lname} {data?.deliver?.id?.fname}
                            <Button
                                size="small"
                                type="link"
                                onClick={() => setOpenUpdateDeliver(true)}
                            >
                                <EditOutlined />
                            </Button>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ទូរស័ព្ទ៖" span={3}>+855(0){data?.deliver?.tel}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ចំណាំ៖" span={3}>{data?.customer?.remark}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{ fontWeight: "bolder", width: "30%" }} label="ទីតាំង៖" span={3}>
                            ({data?.deliver?.geolocation?.lat}, {data?.deliver?.geolocation?.long})
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left">ទីតាំង</Divider>
                    <div style={{ height: '400px', width: '100%' }}>
                        {data?.geolocation?.lat !== 0 ? <MapViewOrder customerMap={customerMap} deliverMap={deliverMap} /> :
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
                            rowKey={record => record.id}
                            pagination={false}
                            size={theme.tableSize}
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
                                <Divider orientation="left" level={5}>Rate</Divider>
                                <Descriptions>
                                    <Descriptions.Item span={3}><Rate
                                        disabled
                                        defaultValue={data?.rate?.rate}
                                    />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Comments" span={3}>{data?.rate?.comment}</Descriptions.Item>
                                    <Descriptions.Item label="Feedback" span={3}>{data?.feedback}</Descriptions.Item>
                                </Descriptions>
                                <Typography.Text>
                                    Status: {data?.status?.deliveryTime}min
                                    <Button
                                        size="small"
                                        type="link"
                                        onClick={() => setOpenUpdateStatus(true)}
                                    >
                                        <EditOutlined />
                                    </Button>
                                </Typography.Text>
                                <Steps current={status} size="small" progressDot={true}>
                                    <Steps.Step title="IsPrepared" />
                                    <Steps.Step title="IsCooked" />
                                    <Steps.Step title="IsDelivered" />
                                </Steps>
                                <Steps current={status2} size="small" progressDot={true}>
                                    <Steps.Step title="IsPaid" />
                                    <Steps.Step title="IsCancel" status={'error'} />
                                </Steps>

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
                                                onBlur={e => {
                                                    onUpdateTotalBL({
                                                        id: data?.id,
                                                        offer: parseFloat(e.target.value)
                                                    })
                                                    setAddOffer(!addOffer)
                                                }}
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
                                                onBlur={e => {
                                                    onUpdateTotalBL({
                                                        id: data?.id,
                                                        delivery: parseFloat(e.target.value)
                                                    })
                                                    setAddDelivery(!addDelivery)
                                                }}
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
                                                onBlur={e => {
                                                    onUpdateTotalBL({
                                                        id: data?.id,
                                                        payment: parseFloat(e.target.value)
                                                    })
                                                    setAddPayment(!addPayment)
                                                }}
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
                                    size={theme.btnSize}
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
                                        size={theme.btnSize}
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
