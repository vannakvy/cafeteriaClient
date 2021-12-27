import { Col, Image, Row } from 'antd';
import Qrcode from 'qrcode.react';
import React, { PureComponent } from 'react';
import Logo from '../../../asset/img/logo.png'
import { convertDateToKh, numberWithCommas } from '../../../functions/fn';

class PrintSaleOrderRangeDate extends PureComponent {
    render() {

        let data = this.props?.data
        let startDate = this.props?.date[0]
        let endDate = this.props?.date[1]
        let dataFooter = this.props?.dataFooter

        // console.log(data)
        // console.log(date)

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
                                 ការគ្រប់គ្រង់ការលក់ចេញ
                             </span><br />
                             <span
                                className="go-headerFont1 "
                                style={{
                                    color: "blue"
                                }}
                             >
                                 សម្រាប់ ហ្គោគ្លូប៊ល ម៉ាត
                             </span>
                             <br/>
                             <br/>
                             <span
                                className="go-headerFont1"
                                style={{
                                    color: "blue"
                                }}
                            >
                                {convertDateToKh(startDate)} - {convertDateToKh(endDate)}
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
                                    <th
                                        style={{
                                            width: "120px"
                                        }}
                                    >
                                        លេខវិក័យបត្រ
                                    </th>
                                    <th
                                        style={{
                                            width: "200px"
                                        }}
                                    >
                                        កាលបរិច្ឆេទ
                                    </th>
                                    <th
                                        style={{
                                            width: "200px"
                                        }}
                                    >
                                        ឈ្មោះអតិថិជន
                                    </th>
                                    <th
                                        style={{
                                            width: "150px"
                                        }}
                                    >
                                        ទូរស័ព្ទ
                                    </th>
                                    <th
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                    >
                                        តម្លៃសរុប
                                    </th>
                                    <th
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                    >
                                        បញ្ចុះតម្លៃ
                                    </th>
                                    <th
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                    >
                                        កាត់ពន្ធ
                                    </th>
                                    <th
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                    >
                                        តម្លៃដឹក
                                    </th>
                                    <th
                                        // style={{
                                        //     width: "100px"
                                        // }}
                                    >
                                        តម្លៃសរុបចុងក្រោយ
                                    </th>
                                    <th
                                        // style={{
                                        //     width: "50px"
                                        // }}
                                    >
                                        ទំនិញ
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
                                                    {/* {load.id} */}
                                                    <Qrcode
                                                        size={50}
                                                        value={load?.id} 
                                                        renderAs="svg"
                                                    />
                                                </td>
                                                <td>
                                                    {convertDateToKh(load.date)}
                                                </td>
                                                <td>
                                                    {load.customer.id.lname} {load.customer.id.fname}
                                                </td>
                                                <td>
                                                    {load.customer.tel}
                                                </td>
                                                <td>
                                                    {numberWithCommas(parseFloat(load.subTotal), 2)}$
                                                </td>
                                                <td>
                                                    {numberWithCommas(parseFloat(load.offer), 2)}$
                                                </td>
                                                <td>
                                                    {numberWithCommas(parseFloat(load.tax), 2)}$
                                                </td>
                                                <td>
                                                    {numberWithCommas(parseFloat(load.delivery), 2)}$
                                                </td>
                                                <td>
                                                    {numberWithCommas(parseFloat(load.grandTotal), 2)}$
                                                </td>
                                                <td>
                                                    {numberWithCommas(parseFloat(load.productCount), 2)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Col>
                    <Col
                        xs={{ span: 9, offset: 15 }}
                    >
                        <table
                            // className={"go-tblProduct"}
                            width="100%"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            <tbody>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃសរុប
                                    </th>
                                    <td
                                        style={{
                                            width: "150px"
                                        }}
                                    >
                                        {/* {numberWithCommas(dataFooter?.subTotal)}$ */}
                                        {numberWithCommas(parseFloat(dataFooter?.subTotal), 2)}$
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        កាត់ពន្ធ
                                    </td>
                                    <td>{numberWithCommas(dataFooter?.tax, 2)}$</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        បញ្ចុះតម្លៃ
                                    </td>
                                    <td>{numberWithCommas(dataFooter?.offer, 2)}$</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃដឹកជញ្ជូន
                                    </td>
                                    <td>{numberWithCommas(dataFooter?.delivery, 2)}$</td>
                                </tr>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃសរុបចុងក្រោយ
                                    </th>
                                    <td>{numberWithCommas(dataFooter?.grandTotal, 2)}$</td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        ការទូរទាត់
                                    </td>
                                    <td>{numberWithCommas   (dataFooter?.payment, 2)}$</td>
                                </tr>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >
                                        តម្លៃមិនទាន់ទូទាត់
                                    </th>
                                    <td
                                    >
                                        {numberWithCommas(dataFooter?.grandTotal - dataFooter?.payment, 2)}$
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PrintSaleOrderRangeDate