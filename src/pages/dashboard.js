import { Button, Col, Row } from 'antd'
import React from 'react'

export default function Dashboard() {

  return (
    <Row gutter={6}>
      <Col
        md={18}
      >
        <Row gutter={10}>
          <Col
            xs={4}
          >
            <Button
              type="dashed"
              size="large"
              style={{
                width: "100%"
              }}
            >
              ប្រតិបត្តិការចូល
            </Button>
          </Col>
          <Col
            xs={4}
          >
            <Button
              type="dashed"
              size="large"
              style={{
                width: "100%"
              }}
            >
              ប្រតិបត្តិការចេញ
            </Button>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
          >
            
          </Col>
        </Row>
      </Col>
      <Col
        md={6}
      >

      </Col>
    </Row>
  )
}
