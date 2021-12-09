
import { BarChartOutlined, CreditCardOutlined, FileSearchOutlined, PieChartOutlined, ShoppingCartOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import Dashboard from "../pages/dashboard";
import Product from "../pages/product";
import SaleOrder from "../pages/saleOrder";
import PurchaseOrder from "../pages/purchaseOrder";
import Reconciliation from "../pages/reconciliation";
import Customer from "../pages/customer";
import Supplier from "../pages/supplier";
import Deliver from "../pages/deliver";
import User from "../pages/user";
import AddSaleOrder from "../components/saleOrder/addSaleOrder";
import ViewSaleOrder from '../components/saleOrder/viewSaleOrder'
import AddPurchaseOrder from '../components/purchaseOrder/addPurchaseOrder'
import ViewPurchaseOrder from '../components/purchaseOrder/viewPurchaseOrder'
import { theme } from '../static/theme';
import Report from '../pages/report';

export function keyMenu(e) {
    const myArr = e.split("/");
    let x = ""

    if (myArr[1] === 'product' || myArr[1] === 'subProduct') {
        x = "/product"
    } else if (myArr[1] === 'category' || myArr[1] === 'subCategory') {
        x = "/category"
    } else if (myArr[1] === 'purchaseorder' || myArr[1] === 'subpurchaseorder') {
        x = "/purchaseorder"
    } else if (myArr[1] === 'saleorder' || myArr[1] === 'addsaleorder' || myArr[1] === 'viewsaleorder') {
        x = "/saleorder"
    } else if (myArr[1] === 'purchaseorder' || myArr[1] === 'addpurchaseorder' || myArr[1] === 'viewpurchaseorder') {
        x = "/purchaseorder"
    } else if (myArr[1] === 'reconciliation' || myArr[1] === 'subreconciliation') {
        x = "/reconciliation"
    } else if (myArr[1] === 'report') {
        x = "/report"
    } else if (myArr[1] === 'customer' || myArr[1] === 'subcustomer') {
        x = "/customer"
    } else if (myArr[1] === 'supplier' || myArr[1] === 'subsupplier') {
        x = "/supplier"
    } else if (myArr[1] === 'deliver' || myArr[1] === 'subdeliver') {
        x = "/deliver"
    } else if (myArr[1] === 'user' || myArr[1] === 'adddeliver') {
        x = "/user"
    }

    else {
        x = "/"
    }

    return x
}

export const iconMenu = (e) => {
    if (e === "/") {
        return <BarChartOutlined
            style={{
                fontSize: theme.MenuFontSize
            }}
        />
    } else if (e === "/product") {
        return <ShoppingCartOutlined
            style={{
                fontSize: theme.MenuFontSize
            }}
        />
    } else if (e === "/saleorder") {
        return <PieChartOutlined
            style={{
                fontSize: theme.MenuFontSize
            }}
        />
    } else if (e === "/purchaseorder") {
        return <CreditCardOutlined
            style={{
                fontSize: theme.MenuFontSize
            }}
        />
    } else if (e === "/reconciliation") {
        return <SyncOutlined
            style={{
                fontSize: theme.MenuFontSize
            }}
        />
    } else if (e === "/report") {
        return <FileSearchOutlined
            style={{
                fontSize: theme.MenuFontSize
            }}
        />
    } else if (e === "/adminstator") {
        return <UserOutlined style={{
            fontSize: theme.MenuFontSize
        }}

        />
    }
}

export const combineMenu = (e) => {
    // console.log(e)
    var newArray1 = []
    var newArray2 = []

    e?.map(load => {
        if (load.sub === "" || load.sub === null || load.sub === undefined) {
            newArray1.push(load)
        } else {
            newArray2.push(load)
        }

        return null;
    })

    newArray1?.map((load, index) => {
        var array = []
        return newArray2?.map(load1 => {
            if (load._id + "" === load1.sub + "") {
                if (load1.menu) {
                    array.push(load1)
                    return newArray1[index] = {
                        ...newArray1[index],
                        subContent: array
                    }
                }
            }
            return null;
        })
    })

    newArray1?.map((load, index) => {
        if (load.subContent === undefined) {
            newArray1[index] = { ...newArray1[index], subContent: [] }
        }
        return null;
    })

    return newArray1
}

export const contentRouter = (e) => {
    // console.log(e)
    if (e === "/") {
        return <Dashboard />
    } else if (e === "/product") {
        return <Product />
    } else if (e === "/saleorder") {
        return <SaleOrder />
    } else if (e === "/addsaleorder") {
        return <AddSaleOrder />
    } else if (e === "/viewsaleorder/:slug") {
        return <ViewSaleOrder />
    } else if (e === "/purchaseorder") {
        return <PurchaseOrder />
    } else if (e === "/addpurchaseorder") {
        return <AddPurchaseOrder />
    } else if (e === "/viewpurchaseorder/:slug") {
        return <ViewPurchaseOrder />
    } else if (e === "/reconciliation") {
        return <Reconciliation />
    } else if (e === "/report") {
        return <Report />
    } else if (e === "/customer") {
        return <Customer />
    } else if (e === "/supplier") {
        return <Supplier />
    } else if (e === "/deliver") {
        return <Deliver />
    } else if (e === "/user") {
        return <User />
    }
}