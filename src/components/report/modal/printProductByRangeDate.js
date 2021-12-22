import React, { useRef } from 'react'
import { Button, Modal } from 'antd'
import ReactToPrint from 'react-to-print';
import { theme } from '../../../static/theme';
import { CSVLink } from "react-csv";
import { reportProductRange } from '../../../asset/column/report';
import { addIndex } from '../../../functions/fn';
import PrintProductRangeDate from '../comp/printProductRangeDate';

export default function PrintProductByRangeDate({ open, setOpen, data, date }) {
    const componentRef = useRef()

    const csvReport = {
        data: addIndex(data),
        headers: reportProductRange,
        filename: 'ការគ្រប់គ្រង់ស្តុកទំនិញចូល_និងចេញ.xls'
    };

    return (
        <Modal
            title="បោះពុម្ភ"
            visible={open}
            width={1000}
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
            <PrintProductRangeDate ref={componentRef} data={data} date={date} />
        </Modal>
    )
}
