import { Col, Divider, Row } from 'antd'
import React from 'react'

export default function Report() {
    return (
        <div>
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
                            >
                                ទំនិញចេញចូល
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
                        <Col
                            xs={24}
                            md={8}
                        >
                            <div
                                className="go-generateBtn"
                            >
                                ទំនិញចេញចូល​រយៈពេលមួយខែ
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
