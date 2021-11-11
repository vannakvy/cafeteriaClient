import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Input, Popconfirm, Space, Tooltip, Image } from "antd"

export const ProductCol = ({ current, limit, setKeyword, dataDb, onViewFn, onAddFn, onUpdateFn, onDeleteFn }) => {

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
                    title: 'រូបភាព',
                    dataIndex: 'image',
                    width: 100,
                    align: "center",
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Image
                            width={20}
                            height={20}
                            src={row.image}
                            preview={false}
                        />
                    },
                },
                {
                    title: 'អត្ថលេខ',
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
                    title: 'បរិយាយ',
                    dataIndex: 'description',
                    width: 250,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.description}`}>
                            {row.description}
                        </Tooltip>
                    },
                },
                {
                    title: 'តម្លៃឯកតា',
                    dataIndex: 'price',
                    key: 'price',
                    width: 100,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.price}`}>
                            {`${row.price.toFixed(2)}$`}
                        </Tooltip>
                    },
                },
                {
                    title: 'ខ្នាត',
                    dataIndex: 'um',
                    key: 'um',
                    width: 50,
                    ellipsis: true,
                },
                {
                    title: 'ក្នុងឃ្លាំង',
                    dataIndex: 'inStock',
                    key: 'inStock',
                    width: 100,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.inStock}}`}>
                            {`${row.inStock}`}
                        </Tooltip>
                    },
                },
                {
                    title: 'ប្រភេទទំនិញ',
                    dataIndex: 'category.descriptioon',
                    key: 'category.descriptioon',
                    width: 100,
                    ellipsis: true,
                    // filters: tableFilter(dataDb, "category", "description"),
                    render: (value, row, index) => {
                        // console.log(row)
                        return <Tooltip title={`${row.category.description}`}>
                            {`${row.category.description}`}
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