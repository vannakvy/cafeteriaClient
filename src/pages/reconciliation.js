import { useQuery } from '@apollo/client'
import { Col, Row, List, Divider } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import Accounting from '../components/reconciliation/modal/accounting'
import Generate from '../components/reconciliation/modal/generate'
import { GET_ALL_RECON } from '../graphql/reconciliation'
import { DollarOutlined } from '@ant-design/icons'
// import Physical from '../components/reconciliation/modal/physical'

export default function Reconciliation() {

    const { data: InventoryDB, loading } = useQuery(GET_ALL_RECON, {
        onError: (err) => {
            console.log(err)
        },
    })

    console.log(InventoryDB)

    const [openGenerate, setOpenGenerate] = useState(false)
    // const [openPhysical, setOpenPhysical] = useState(false)
    const [openGenAcc, setOpenGenAcc] = useState(false)
    // const [openStockOut, setOpenStockOut] = useState(false)
    // const [openAdjustment, setOpenAdjustment] = useState(false)
    // const [openReconciliation, setOpenReconciliation] = useState(false)

    return (
        <div>
            <Generate open={openGenerate} setOpen={setOpenGenerate} />
            {/* <Physical open={openPhysical} setOpen={setOpenPhysical} /> */}
            <Accounting open={openGenAcc} setOpen={setOpenGenAcc} />
            <Row gutter={[16, 16]}>
                <Col
                    xs={24}
                    md={18}
                >
                    <Row gutter={[16, 16]}>
                        <Col
                            xs={6}
                            md={6}
                        >
                            <div
                                className="go-generateBtn"
                                onClick={() => setOpenGenerate(!openGenerate)}
                            >
                                GENERATE<br />
                                INVENTORY
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={6}
                        >
                            <div
                                className="go-generateBtn"
                                onClick={() => setOpenGenAcc(!openGenAcc)}
                            >
                                GENERATE<br />
                                ACCOUNTING
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col
                    xs={24}
                    md={6}
                >
                    <Divider orientation="left">ទិន្នន័យដំណើរការរួច</Divider>
                    <List
                        {...loading}
                        itemLayout="horizontal"
                        dataSource={InventoryDB?.getInventory}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<span>{item.code}</span>}
                                    description={moment(item.date).format("DD-MMM-YYYY HH:MM A")}
                                />
                                <DollarOutlined
                                    style={{ 
                                        color: item.accounting ? "#08c" : null
                                    }}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>

        </div>
    )
}
