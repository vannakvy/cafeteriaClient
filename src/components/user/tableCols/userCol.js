import { CheckOutlined, DeleteOutlined, EditOutlined, FileSearchOutlined, FileSyncOutlined, MoreOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Input, Popconfirm, Space, Tooltip } from "antd"

export const UserCol = ({ current, limit, setKeyword, onConfigFn, onAddFn, onUpdateFn, onDeleteFn }) => {

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
                    dataIndex: 'displayName',
                    width: 300,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.displayName}`}>
                            {row.displayName}
                        </Tooltip>
                    },
                },
                {
                    title: 'អ៊ីមែល',
                    dataIndex: 'email',
                    width: 300,
                    ellipsis: true,
                    render: (value, row, index) => {
                        return <Tooltip title={`${row.email}`}>
                            {row.email}
                        </Tooltip>
                    },
                },
                {
                    title: 'មាតិកា',
                    dataIndex: 'status',
                    key: 'content',
                    width: 300,
                    ellipsis: true,
                    align: "center",
                    render: (value, row, index) => {
                        return <Tooltip placement="left" title={<span>
                            {
                                row?.contentRole?.map((load, i) => (
                                    <span key={i}>
                                        {`- ${load?.content?.title}`} &emsp;
                                        {load.view && load.create && load.update && load.delete ? (
                                            <>
                                                <CheckOutlined />
                                            </>
                                        ) : (
                                            <>
                                            {load.view && <FileSearchOutlined />}
                                            {load.create && <PlusCircleOutlined />}
                                            {load.update && <EditOutlined />}
                                            {load.delete && <DeleteOutlined />}
                                            </>
                                        )}
                                        <br/>
                                    </span>
                                ))
                            }
                        </span>}>
                            {row?.contentRole?.length} មាតិកា
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
                                onClick={() => onConfigFn(row)}
                                disabled={row.id === "619c7142b3e75dd62a7dcabe" ? true : false}
                            >
                                <FileSyncOutlined />
                            </Button>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => onUpdateFn(row)}
                                disabled={row.id === "619c7142b3e75dd62a7dcabe" ? true : false}
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
                                disabled={row.id === "619c7142b3e75dd62a7dcabe" ? true : false}
                            >
                                <Button
                                    type="link"
                                    danger
                                    size="small"
                                    disabled={row.id === "619c7142b3e75dd62a7dcabe" ? true : false}
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