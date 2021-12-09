import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Input, Popconfirm, Space, Tooltip } from "antd"
import { theme } from "../../../static/theme"

export const CustomerCol = ({ current, limit, setKeyword, onViewFn, onAddFn, onUpdateFn, onDeleteFn }) => {

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
                    title: 'អត្ថលេខ',
                    dataIndex: 'id',
                    key: 'age',
                    width: 300,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={value}>
                            {value}
                        </Tooltip>
                    },
                },
                {
                    title: 'ឈ្មោះ',
                    dataIndex: 'name',
                    width: 300,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.lname} ${row.fname}`}>
                            {row.lname} {row.fname}
                        </Tooltip>
                    },
                },
                {
                    title: 'លេខទូរស័ព្ទ',
                    dataIndex: 'tel',
                    key: 'tel',
                    width: 300,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`+855(0)${row.tel}`}>
                            {`+855(0)${row.tel}`}
                        </Tooltip>
                    },
                },
                // {
                //     title: 'ការចំណាយ',
                //     dataIndex: 'totalAmount',
                //     key: 'totalAmount',
                //     width: 300,
                //     ellipsis: true,
                //     sorter: (a, b) => a.totalAmount - b.totalAmount,
                // }
            ],
        },
        {
            title: () => <div>
                <Button
                    style={{
                        width: "100%"
                    }}
                    onClick={() => onAddFn()}
                    size={theme.btnSize}
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
                        return <Space>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => onViewFn(row)}
                            >
                                <EyeOutlined />
                            </Button>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => onUpdateFn(row)}
                            >
                                <EditOutlined />
                            </Button>
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
                        </Space>
                    },
                }
            ],
        }
    ]

    return array
}