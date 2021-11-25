import { Button, Col, Row } from 'antd'
import React from 'react'

export default function Dashboard() {

  return (
    <Row gutter={6}>
      <Col
        xs={24}
        md={18}
      >

      </Col>
      <Col
        md={6}
      >
        <Row gutter={[10, 10]}>
          <Col
            xs={24}
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
            xs={24}
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
    </Row>
  )
}
