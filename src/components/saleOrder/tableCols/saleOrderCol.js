import { DeleteOutlined, EyeOutlined, FileSyncOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Input, Popconfirm, Tooltip, Tag } from "antd"
import moment from "moment"
import { SyncOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom"
import { theme } from "../../../static/theme"

export const SaleOrderCol = ({ current, limit, setKeyword, onSetStatusFn, onAddFn, onDeleteFn }) => {

    const array = [
        {
            title: () => <div>
                <Input
                    prefix={<SearchOutlined />}
                    onChange={e => setKeyword(e.target.value)}
                />
            </div>,
            children: [
                {
                    title: 'ល.រ',
                    dataIndex: 'createAt',
                    key: 'createAt',
                    width: 80,
                    align: "center",
                    // sorter: (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime(),
                    render: (value, row, index) => {
                        let page = ((current - 1) * limit) + index
                        return <span>
                            {page += 1}
                        </span>
                    },
                },
                {
                    title: 'លេខវិក័យបត្រ',
                    dataIndex: 'id',
                    key: 'age',
                    width: 100,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={value}>
                            {value}
                        </Tooltip>
                    },
                },
                {
                    title: 'កាលបរិច្ឆេទ',
                    dataIndex: 'date',
                    key: 'date',
                    align: "center",
                    width: 150,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={moment(row.date).format("DD-MMM-YYYY")}>
                            {moment(row.date).format("DD-MMM-YYYY")}
                        </Tooltip>
                    },
                },
                {
                    title: 'ទូរស័ព្ទ',
                    dataIndex: 'tel',
                    key: 'tel',
                    width: 150,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.customer.tel}`}>
                            +855(0){row.customer.tel}
                        </Tooltip>
                    },
                },
                {
                    title: 'ឈ្មោះអតិថិជន',
                    dataIndex: 'name',
                    key: 'name',
                    width: 200,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.customer.id.lname} ${row.customer.id.fname}`}>
                            {row.customer.id.lname} {row.customer.id.fname}
                        </Tooltip>
                    },
                },
                {
                    title: 'តម្លៃសរុប',
                    dataIndex: 'subTotal',
                    key: 'subTotal',
                    width: 100,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        // console.log(row)
                        return <Tooltip title={`${row.subTotal}$`}>
                            {`${row.subTotal}$`}
                        </Tooltip>
                    },
                },
                {
                    title: 'បញ្ចុះតម្លៃ',
                    dataIndex: 'offer',
                    key: 'offer',
                    width: 100,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        // console.log(row)
                        return <Tooltip title={`${row.offer}$`}>
                            {`${row.offer}$`}
                        </Tooltip>
                    },
                },
                {
                    title: 'កាត់ពន្ធ',
                    dataIndex: 'tax',
                    key: 'tax',
                    width: 100,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        // console.log(row)
                        return <Tooltip title={`${row.tax}$`}>
                            {`${row.tax}$`}
                        </Tooltip>
                    },
                },
                {
                    title: 'តម្លៃដឹកជញ្ជូន',
                    dataIndex: 'delivery',
                    key: 'delivery',
                    width: 100,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        // console.log(row)
                        return <Tooltip title={`${row.delivery}$`}>
                            {`${row.delivery}$`}
                        </Tooltip>
                    },
                },
                {
                    title: 'តម្លៃសរុបចុងក្រោយ',
                    dataIndex: 'grandTotal',
                    key: 'grandTotal',
                    width: 100,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        // console.log(row)
                        return <Tooltip title={`${row.grandTotal}$`}>
                            {`${row.grandTotal}$`}
                        </Tooltip>
                    },
                },
                {
                    title: 'ស្ថានភាព',
                    dataIndex: 'status',
                    key: 'status',
                    width: 300,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        return row.status.isCanceled ? (
                            <Tag
                                color="error"
                            >
                                Cancel
                            </Tag>
                        ) : <div>
                            <Tag
                                color={row.status.isPrepared ? "success" : "processing"}
                                icon={!row.status.isPrepared && <SyncOutlined spin />}
                            >
                                Prepared
                            </Tag>
                            <Tag
                                color={row.status.isCooked ? "success" : "processing"}
                                icon={!row.status.isCooked && <SyncOutlined spin />}
                            >
                                Cooked
                            </Tag><br />
                            <Tag
                                color={row.status.isDelivered ? "success" : "processing"}
                                icon={!row.status.isDelivered && <SyncOutlined spin />}
                            >
                                Delivered
                            </Tag>
                            <Tag
                                color={row.status.isPaid ? "success" : "processing"}
                                icon={!row.status.isPaid && <SyncOutlined spin />}
                            >
                                Paid
                            </Tag>
                            <Tag
                                color="warning"
                            >
                                {row.status.deliveryTime}min
                            </Tag>

                        </div>
                    },
                },
                {
                    title: 'ទំនិញ',
                    dataIndex: 'productCount',
                    key: 'productCount',
                    width: 100,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        // console.log(row)
                        return <Tooltip title={`${row.productCount} ទំនិញ`}>
                            {`${row.productCount} ទំនិញ`}
                        </Tooltip>
                    },
                },
                {
                    title: 'ចំណាំ',
                    dataIndex: 'remark',
                    key: 'remark',
                    width: 300,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.remark === null ? "" : row.remark}`}>
                            {`${row.remark === null ? "" : row.remark}`}
                        </Tooltip>
                    },
                },
            ],
        },
        {
            title: () => <div>
                <Button
                    style={{
                        width: "100%"
                    }}
                    size={theme.btnSize}
                    onClick={() => onAddFn()}
                >
                    បញ្ជូលថ្មី
                </Button>
            </div>,
            children: [
                {
                    title: () => <MoreOutlined />,
                    dataIndex: 'more',
                    key: 'more',
                    width: 150,
                    fixed: 'right',
                    align: "center",
                    render: (value, row, index) => {
                        return <div>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => onSetStatusFn(row)}
                            >
                                <FileSyncOutlined />
                            </Button>
                            <Link
                                className="go-linkBtn"
                                // type="link"
                                size="small"
                                to={`/viewsaleorder/${row.id}`}
                                // onClick={() => onViewFn(row)}
                            >
                                <EyeOutlined />
                            </Link>
                            <Popconfirm
                                title="តើអ្នកចង់លុបមែនទេ?"
                                okText="ចង់"
                                cancelText="មិនចង់"
                                okType="danger"
                                placement="left"
                                onConfirm={() => onDeleteFn(row)}
                            >
                                <Button
                                    type="link"
                                    danger
                                    size="small"
                                >
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>
                        </div>
                    },
                }
            ],
        }
    ]

    return array
}