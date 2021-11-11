import { Col, Descriptions, Image, Modal, Row } from 'antd'
import React from 'react'

export default function ViewProduct({ open, setOpen, data }) {
    return (
        <Modal
            title={`អត្តលេខ៖ ${data?.id}`}
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={600}
        >
            <Row gutter={16}>
                <Col
                    xs={24}
                    md={10}
                >
                    <Image
                        src={data?.image}
                    />
                    
                </Col>
                <Col
                    xs={24}
                    md={14}
                >
                    <Descriptions bordered size="small">
                        <Descriptions.Item span={3} label="បរិយាយ">{data?.description}</Descriptions.Item>
                        <Descriptions.Item span={3} label="តម្លៃ">{data?.price?.toFixed(2)}$</Descriptions.Item>
                        <Descriptions.Item span={3} label="ខ្នាត">{data?.um}</Descriptions.Item>    
                        <Descriptions.Item span={3} label="ក្នុងស្តុក">{data?.inStock}</Descriptions.Item>   
                        <Descriptions.Item span={3} label="ប្រភេទទំនិញ">{data?.category?.description}</Descriptions.Item>  
                        <Descriptions.Item span={3} label="ចំណាំ">{data?.remark}</Descriptions.Item>   
                    </Descriptions>
                </Col>
            </Row>
        </Modal>
    )
}
