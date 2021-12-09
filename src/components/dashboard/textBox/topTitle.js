import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { theme } from '../../../static/theme'

export const TopTitle = ({ href, header, body, newBody, type }) => {
    return (
        <Link
            to={href}
        >
            <div
                className="go-TopTitle"
                // style={{
                //     backgroundImage: `url(${
                //         type === "customer" ? 'https://image.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899134.jpg' :
                //         type === "delivery" ? 'https://image.freepik.com/free-vector/express-courier-scooter-shipping-order_74855-6447.jpg' :
                //         'https://image.freepik.com/free-vector/distribution-hemp-products-abstract-concept-vector-illustration-retail-cannabis-business-marijuana-sales-market-order-online-hemp-extract-food-supplement-wholesale-abstract-metaphor_335657-1443.jpg'
                //     })`,
                //     backgroundSize: "contain",
                //     backgroundPosition: "right",
                //     backgroundRepeat: "no-repeat"
                // }}
            >
                <Typography.Title
                    className="go-DashboardBox"
                    style={{
                        color: theme.blackColor,
                        textShadow: "1px 1px 1px #b5b5b5"
                    }}
                >
                    {header}
                </Typography.Title>
                <Typography.Title
                    className="go-DashboardBox1"
                    style={{
                        color: theme.pinkColor,
                        lineHeight: 1,
                        textShadow: "1px 1px 1px #0B0B0B"
                    }}
                >
                    {newBody}
                </Typography.Title>
                <Typography.Title
                    className="go-DashboardBox3"
                    style={{
                        color: theme.pinkColor,
                        lineHeight: 0,
                        textShadow: "1px 1px 1px #0B0B0B"
                    }}
                >
                    សរុប៖ {body}
                </Typography.Title>
            </div>
        </Link>
    )
}