import { Col, Image, Row } from 'antd';
import moment from 'moment';
import Qrcode from 'qrcode.react';
import React, { PureComponent } from 'react';
import Logo from '../../../asset/img/logo.png'

class PrintComponent extends PureComponent {
    render() {

        let data = this.props?.data

        console.log(data)

        return (
            <div
                style={{
                    padding: 40
                }}
            >
                <Row>
                    <Col
                        xs={24}
                        style={{
                            paddingBottom: 20
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 20
                            }}
                        >
                            <Image
                                src={Logo}
                                preview={false}
                                width={80}
                            />
                        </div>
                        <center>
                            <span
                                className="go-headerFont"
                                style={{
                                    fontSize: 14
                                }}
                            >
                                ព្រះរាជាណាចក្រកម្ពុជា<br />
                                ជាតិ&emsp;សាសនា&emsp;ព្រះមហាក្សត្រ
                            </span><br />
                            <span
                                className="go-symbolFont"
                                style={{
                                    fontSize: 48
                                }}
                            >
                                3
                            </span>
                        </center>
                    </Col>
                    <Col
                        xs={24}
                    >
                        <table
                            className="go-tblHeader"
                            width="100%"
                            style={{
                                textAlign: "left"
                            }}
                        >
                            <tr>
                                <th>លេខវិក័យបត្រ៖ </th>
                                <td>{data?.id}</td>
                                <th>អ្នកផ្គត់ផ្គង់៖ </th>
                                <td>{data?.supplier?.companyName}</td>
                            </tr>
                            <tr>
                                <th>កាលបរិច្ឆេទ៖ </th>
                                <td>{moment(data?.date).format("DD-MMM-YYYY")}</td>
                                <th>ទូរស័ព្ទ៖ </th>
                                <td>{data?.tel}</td>
                            </tr>
                        </table>
                    </Col>
                    <Col
                        xs={24}
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <table
                            // border="1"
                            className={"go-tblProduct"}
                            width="100%"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            <thead>
                                <tr>
                                    <th width={200}>បរិយាយ</th>
                                    <th width={50}>ចំនួន</th>
                                    <th width={100}>តម្លៃរាយ</th>
                                    <th width={100}>តម្លៃសរុប</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.products?.map(load => (
                                    <tr key={load.product.id}>
                                        <td>{load.product.description}</td>
                                        <td>{load.qty}</td>
                                        <td>{load.price}$</td>
                                        <td>{load.total}$</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr key="remark">
                                    <td
                                        rowSpan="7"
                                        colSpan="2"
                                        style={{
                                            textAlign: "left",
                                            verticalAlign: "top",
                                        }}
                                    >
                                        <b><i>ចំណាំ៖</i></b> {data?.remark}
                                    </td>
                                    <th
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃសរុប
                                    </th>
                                    <td>{data?.subTotal}$</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        កាត់ពន្ធ
                                    </td>
                                    <td>{data?.tax}$</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        បញ្ចុះតម្លៃ
                                    </td>
                                    <td>{data?.offer}$</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃដឹកជញ្ជូន
                                    </td>
                                    <td>{data?.delivery}$</td>
                                </tr>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃសរុបចុងក្រោយ
                                    </th>
                                    <td>{data?.grandTotal}$</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        ការទូរទាត់
                                    </td>
                                    <td>{data?.payment}$</td>
                                </tr>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃមិនទាន់ទូទាត់
                                    </th>
                                    <td>{data?.grandTotal - data?.payment}$</td>
                                </tr>
                            </tfoot>
                        </table>
                    </Col>
                    <Col
                        xs={24}
                        style={{
                            paddingTop: 20
                        }}
                    >
                        <center>
                            <b>
                                Thank for your support.
                            </b><br /><br />
                            <Qrcode 
                                size={100}
                                value={data?.id} 
                                renderAs="svg"
                            />
                        </center>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PrintComponent