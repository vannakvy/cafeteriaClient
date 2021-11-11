import { Col, Descriptions, Image, Modal, Row } from 'antd'
import React from 'react'

export default function ViewDeliver({ open, setOpen, data }) {
    return (
        <Modal
            title={data?.id}
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={800}
        >
            <Row gutter={16}>
                <Col
                    xs={24}
                    md={8}
                >
                    <Image
                        width={"100%"}
                        src={data?.image ? data?.image : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                    />
                </Col>
                <Col
                    xs={24}
                    md={16}
                >
                    <Descriptions
                        bordered
                    >
                        <Descriptions.Item span={3} label="ឈ្មោះ">{data?.lname} {data?.fname}</Descriptions.Item>
                        <Descriptions.Item span={3} label="លេខទូរស័ព្ទ">+855(0){data?.tel}</Descriptions.Item>
                        <Descriptions.Item span={3} label="អ៊ីមែល">{data?.email}</Descriptions.Item>
                        <Descriptions.Item span={3} label="អាស័យដ្ឋាន">{data?.address}</Descriptions.Item>
                        <Descriptions.Item span={3} label="ចំណាយ">{data?.totalAmount}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Modal>
    )
}
