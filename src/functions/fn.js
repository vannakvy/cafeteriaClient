import { Image, notification } from "antd";


export const convertTel = (e) => {
    let tel = e

    if (e) {
        if (tel.charAt(0) === "0") {
            tel = tel.substring(1)
        }
    }

    return tel
}

export const convertUpdateData = (type, e) => {
    let array = []
    let keys = Object.keys(e)

    if (type === "add") {
        keys?.map(load => {
            return array.push({
                name: load,
                value: ""
            })
        })
    } else {
        keys?.map(load => {
            return array.push({
                name: load,
                value: e[load]
            })
        })
    }

    return array
}

export function convertQueryDate(date) {
    let hour = new Date(date).getHours()
    let minute = new Date(date).getMinutes()
    let second = new Date(date).getSeconds()

    return new Date(new Date(new Date(new Date(date).setHours(hour)).setMinutes(minute)).setSeconds(second))
}

export const convertMask = (e) => {
    let array = []

    for (let i = 0; i < e.length; i++) {
        // console.log(e.charAt(i))
        if (e.charAt(i) === '%' || e.charAt(i) === '/' || e.charAt(i) === '*' || e.charAt(i) === '+' || e.charAt(i) === '-' || e.charAt(i) === ' ') {
            array.push(`${e.charAt(i)}`)
        } else {
            array.push(`/\\d\\`)
        }
    }

    return array
}

export const noticeAction = (type, msg) => {
    notification[type]({
        message: msg,
        placement: "bottomLeft"
    })
}

export const mutationCallBackFn = (gqlFn, gqlFnName) => {
    return {
        refetchQueries: [
            gqlFn, // DocumentNode object parsed with gql
            gqlFnName
        ],
        onError: (err) => {
            console.log(err?.graphQLErrors[0]?.message)

            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        }
    }
}

export const tableFilter = (data, filter1, filter2) => {
    let array = data?.getProducts?.data
    let newArray = []

    array?.map(load => {
        return newArray.push({
            text: !filter2 ? load[filter1] : load[filter1][filter2],
            value: !filter2 ? load[filter1] : load[filter1][filter2]
        })
    })

    var result = [];
    newArray.map(load => {
        if (result.findIndex(ele => ele.text === load.text) < 0) {
            return result.push({
                text: load.text,
                value: load.value
            });
        }

        return null
    });

    // console.log(result)

    return result
}

export const searchOptions = (e) => {
    let array = []
    e?.map(load => {
        return array.push({
            label: (
                <div
                    style={{
                        display: "flex",
                        // justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Image
                        width={50}
                        src={load.image}
                        preview={false}
                    />
                    <div>
                        <span
                            style={{
                                marginLeft: 20,
                                fontWeight: "bolder"
                            }}
                        >
                            {load.description}
                        </span><br />
                        <span
                            style={{
                                marginLeft: 20,
                                fontSize: 11
                            }}
                        >
                            {load.price}$ /{load.um}
                        </span>
                    </div>
                </div>
            ),
            value: load.id
        })
    })

    return array
}

export const isHex = (num) => {
    return Boolean(num.match(/^[0-9a-fA-F]{24}$/))
}

export function convertEditData(e) {
    var array = []
    for (let [key, value] of Object.entries(e)) {
        array.push(
            {
                "name": [
                    key
                ],
                "value": value
            }
        )
    }
    return array
}

export const convertProduct = (e) => {
    let newArray = []
    e?.map(load => newArray.push({
        product: load.id,
        price: load.price,
        qty: load.qty,
        total: load.total,
        remark: load.remark
    }))

    return newArray
}