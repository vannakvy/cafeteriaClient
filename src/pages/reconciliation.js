import { Col, Row } from 'antd'
import React, { useState } from 'react'
import Generate from '../components/reconciliation/modal/generate'
import Physical from '../components/reconciliation/modal/physical'

export default function Reconciliation() {

    const [openGenerate, setOpenGenerate] = useState(false)
    const [openPhysical, setOpenPhysical] = useState(false)
    // const [openStockIn, setOpenStockIn] = useState(false)
    // const [openStockOut, setOpenStockOut] = useState(false)
    // const [openAdjustment, setOpenAdjustment] = useState(false)
    // const [openReconciliation, setOpenReconciliation] = useState(false)

    return (
        <div>
            <Generate open={openGenerate} setOpen={setOpenGenerate} />
            <Physical open={openPhysical} setOpen={setOpenPhysical} />
            <Row gutter={[16,16]}>
                <Col
                    xs={6}
                    md={3}
                >
                    <div
                        className="go-generateBtn"
                        onClick={() => setOpenGenerate(!openGenerate)}
                    >
                        GENERATE<br/>
                        INVENTORY
                    </div>
                </Col>
                <Col
                    xs={6}
                    md={3}
                >
                    <div
                        className="go-generateBtn"
                        onClick={() => setOpenPhysical(!openPhysical)}
                    >
                        PHYSICAL<br/>
                        INVENTORY
                    </div>
                </Col>
                {/* <Col
                    xs={6}
                    md={3}
                >
                    <div
                        className="go-generateBtn"
                        onClick={() => setOpenStockOut(!openStockOut)}
                    >
                        GENERATE<br/>
                        STOCK-OUT
                    </div>
                </Col>
                <Col
                    xs={6}
                    md={3}
                >
                    <div
                        className="go-generateBtn"
                        onClick={() => setOpenAdjustment(!openAdjustment)}
                    >
                        GENERATE<br/>
                        ADJUSTMENT
                    </div>
                </Col>
                <Col
                    xs={6}
                    md={3}
                >
                    <div
                        className="go-generateBtn"
                        onClick={() => setOpenReconciliation(!openReconciliation)}
                    >
                        RECONCILIATION<br/>
                        INVENTORY
                    </div>
                </Col> */}
            </Row>
        </div>
    )
}
