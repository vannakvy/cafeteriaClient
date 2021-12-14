import { Col, Image, Row } from 'antd';
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
                                width={100}
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
                                KINGDOM OF CAMBODIA<br />
                                ជាតិ&emsp;សាសនា&emsp;ព្រះមហាក្សត្រ<br />
                                NATIONAL&emsp;RELIGION&emsp;KING
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
                        style={{
                            paddingBottom: 20
                        }}
                    >
                         <center>
                             <span
                                className="go-headerFont"
                                style={{
                                    fontSize: 14,
                                    color: "blue"
                                }}
                             >
                                 ការគ្រប់គ្រង់ស្តុកទំនិញចូល និងចេញ
                             </span><br />
                             <span
                                className="go-headerFont1 "
                                style={{
                                    color: "blue"
                                }}
                             >
                                 សម្រាប់ ហ្គោគ្លូប៊ល ម៉ាត
                             </span>
                         </center>
                    </Col>
                    <Col
                        xs={24}
                        style={{
                            paddingBottom: 20
                        }}
                    >
                        <table
                            border="1"
                            className="go-tblHeader1"
                            width="100%"
                        >
                            <tbody>
                                <tr>
                                    <th
                                        style={{
                                            width: "50px"
                                        }}
                                    >
                                        ល.រ
                                    </th>
                                    <th>
                                        បរិយាយ
                                    </th>
                                    <th
                                        style={{
                                            width: "100px"
                                        }}
                                    >
                                        ដើមគ្រា
                                    </th>
                                    <th
                                        style={{
                                            width: "100px"
                                        }}
                                    >
                                        ទិញចូល
                                    </th>
                                    <th
                                        style={{
                                            width: "100px"
                                        }}
                                    >
                                        លក់ចេញ
                                    </th>
                                    <th
                                        style={{
                                            width: "100px"
                                        }}
                                    >
                                        ចុងគ្រា
                                    </th>
                                </tr>
                                {
                                    data.map((load, index) => {
                                        return (
                                            <tr key={index + 1}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {load.description}
                                                </td>
                                                <td>
                                                    {load.openning}
                                                </td>
                                                <td>
                                                    {load.stockIn === null ? 0 : load.stockIn}
                                                </td>
                                                <td>
                                                    {load.stockOut === null ? 0 : load.stockOut}
                                                </td>
                                                <td>
                                                    {load.totalStock}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PrintComponent