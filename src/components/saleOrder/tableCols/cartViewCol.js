import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Tooltip, Image, Input, AutoComplete } from "antd"
import { searchOptions } from "../../../functions/fn"

export const CartViewCol = ({ ProductSearchDb, searchKeyword, handleSearch, onSelect, onUpdateFn, onDeleteFn }) => {

    const array = [
        {
            title: () => <div>
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
                        placeholder="ស្វែងរកនិងបញ្ចូល..."
                    />
                </AutoComplete>
            </div>,
            children: [
                {
                    title: 'ល.រ',
                    dataIndex: 'createAt',
                    key: 'createAt',
                    width: 80,
                    align: "center",
                    render: (value, row, index) => {
                        return <span>
                            {index += 1}
                        </span>
                    },
                },
                {
                    title: 'រូបភាព',
                    dataIndex: 'image',
                    key: 'image',
                    width: 100,
                    align: "center",
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Image
                            src={row.product.image}
                            preview={false}
                            width={30}
                        />
                    },
                },
                {
                    title: 'បរិយាយ',
                    dataIndex: 'description',
                    key: 'description',
                    width: 200,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={row.description}>
                            {row.product.description}
                        </Tooltip>
                    },
                },
                {
                    title: 'ចំនួន',
                    dataIndex: 'qty',
                    key: 'qty',
                    width: 100,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.qty} ${row.product.um}`}>
                            {row.qty} {row.product.um}
                        </Tooltip>
                    },
                },
                {
                    title: 'តម្លៃ',
                    dataIndex: 'price',
                    key: 'price',
                    width: 100,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.price}`}>
                            {row.price}$
                        </Tooltip>
                    },
                },
                {
                    title: 'តម្លៃសរុប',
                    dataIndex: 'total',
                    key: 'total',
                    width: 100,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.total}`}>
                            {row.total}$
                        </Tooltip>
                    },
                },
                {
                    title: 'ចំណាំ',
                    dataIndex: 'remark',
                    key: 'remark',
                    width: 200,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.remark}`}>
                            {row.remark}
                        </Tooltip>
                    },
                }
            ]
        },
        {
            children: [
                {
                    title: () => <MoreOutlined />,
                    dataIndex: 'more',
                    key: 'more',
                    width: 120,
                    fixed: 'right',
                    align: "center",
                    render: (value, row, index) => {
                        return <div>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => { onUpdateFn(row) }}
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
                        </div>
                    },
                }
            ]
        }
    ]

    return array
}