import React, { useRef } from 'react'
import { Button, Modal } from 'antd'
import ReactToPrint from 'react-to-print';
import PrintComponent from '../comp/printComponent';

export default function PrintSaleOrder({ open, data, clearDataFn }) {
    const componentRef = useRef()
    return (
        <Modal
            title="បោះពុម្ភ"
            visible={open}
            width={600}
            onCancel={() => clearDataFn()}
            footer={[
                <Button
                    type="link"
                    danger
                    key="cancel"
                    href="/saleorder"
                >
                    ចាក់ចេញ
                </Button>,
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <Button
                            type="default"
                        >
                            បោះពុម្ភ
                        </Button>;
                    }}
                    content={() => componentRef.current}
                />
            ]}
        >
            <PrintComponent ref={componentRef} data={data} />
        </Modal>
    )
}
