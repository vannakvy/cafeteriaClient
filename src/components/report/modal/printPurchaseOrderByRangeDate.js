import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'antd'
import ReactToPrint from 'react-to-print';
import { theme } from '../../../static/theme';
import { CSVLink } from "react-csv";
import { reportProductRange } from '../../../asset/column/report';
import { addIndex } from '../../../functions/fn';
import PrintPurchaseOrderRangeDate from '../comp/printPurchaseRangeDate';

export default function PrintPurchaseOrderByRangeDate({ open, setOpen, data, date }) {
    const componentRef = useRef()

    const [dataFooter, setDataFooter] = useState({})

    useEffect(() => {
        if(data.length !== 0){
            let subTotal = data.reduce((a, curr) => a + parseFloat(curr.subTotal),0)
            let tax = data.reduce((a, curr) => a + parseFloat(curr.tax),0)
            let offer = data.reduce((a, curr) => a + parseFloat(curr.offer),0)
            let delivery = data.reduce((a, curr) => a + parseFloat(curr.delivery),0)
            let grandTotal = data.reduce((a, curr) => a + parseFloat(curr.grandTotal),0)
            let payment = data.reduce((a, curr) => a + parseFloat(curr.payment),0)

            setDataFooter({
                subTotal,
                tax,
                offer,
                delivery,
                grandTotal,
                payment 
            })
        }
    }, [data])

    const csvReport = {
        data: addIndex(data),
        headers: reportProductRange,
        filename: 'ការគ្រប់គ្រង់ស្តុកទំនិញចូល_និងចេញ.xls'
    };

    return (
        <Modal
            title="បោះពុម្ភ"
            visible={open}
            width={1500}
            onCancel={() => setOpen(!open)}
            footer={[
                <CSVLink
                    className='go-toCSV'
                    {...csvReport}
                    key="excel"
                    style={{
                        float: "left"
                    }}
                >
                    Export to CSV
                </CSVLink>,
                <Button
                    danger
                    key="cancel"
                    size={theme.btnSize}
                    onClick={() => setOpen(!open)}
                >
                    ចាក់ចេញ
                </Button>,
                <ReactToPrint
                    key="post"
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <Button
                            type="default"
                            size={theme.btnSize}
                        >
                            បោះពុម្ភ
                        </Button>;
                    }}
                    content={() => componentRef.current}
                />
            ]}
        >
            <PrintPurchaseOrderRangeDate ref={componentRef} data={data} date={date} dataFooter={dataFooter} />
        </Modal>
    )
}
