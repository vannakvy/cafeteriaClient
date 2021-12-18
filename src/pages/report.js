import { useQuery } from '@apollo/client'
import { Col, Divider, Row } from 'antd'
import React, { useState } from 'react'
import GetProductByDate from '../components/report/modal/getProductByDate'
import GetProductByRangeDate from '../components/report/modal/getProductByRangeDate'
import { noticeAction } from '../functions/fn'
import { GET_ALL_PRODUCT_NO_PAGE } from '../graphql/product'

export default function Report() {
    const { data: productDB } = useQuery(GET_ALL_PRODUCT_NO_PAGE, {
        fetchPolicy: "network-only",
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [openProductByDate, setOpenProductByDate] = useState(false)
    const [openProductByRangeDate, setOpenProductByRangeDate] = useState(false)

    return (
        <div>
            <GetProductByDate open={openProductByDate} setOpen={setOpenProductByDate} productDB={productDB} />
            <GetProductByRangeDate open={openProductByRangeDate} setOpen={setOpenProductByRangeDate} productDB={productDB} />
            <Row gutter={[16, 16]}>
                <Col
                    xs={24}
                    md={24}
                >
                    <Divider orientation="left">របាយការណ៍ទំនិញ</Divider>
                    <Row gutter={[16, 16]}>
                        <Col
                            xs={24}
                            md={8}
                        >
                            <div
                                className="go-generateBtn"
                                onClick={() => setOpenProductByDate(!openProductByDate)}
                            >
                                ទំនិញចេញចូលដោយកាលបរិច្ឆេទ
                            </div>
                        </Col>
                        <Col
                            xs={24}
                            md={8}
                        >
                            <div
                                className="go-generateBtn"
                                onClick={() => setOpenProductByRangeDate(!openProductByRangeDate)}
                            >
                                ទំនិញចេញចូលរវាងកាលបរិច្ឆេទ
                            </div>
                        </Col>
                        <Col
                            xs={24}
                            md={8}
                        >
                            <div
                                className="go-generateBtn"
                            >
                                ប្រភេទទំនិញចេញចូល
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col
                    xs={24}
                    md={24}
                >
                    <Divider orientation="left">របាយការណ៍ការលក់</Divider>
                    <Row gutter={[16, 16]}>
                        <Col
                            xs={24}
                            md={8}
                        >
                            <div
                                className="go-generateBtn"
                            >
                                ការលក់តាមកាលបរិច្ឆេទ
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col
                    xs={24}
                    md={24}
                >
                    <Divider orientation="left">របាយការណ៍ការទិញ</Divider>
                    <Row gutter={[16, 16]}>
                        <Col
                            xs={24}
                            md={8}
                        >
                            <div
                                className="go-generateBtn"
                            >
                                ការទិញតាមកាលបរិច្ឆេទ
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
