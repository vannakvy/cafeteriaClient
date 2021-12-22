import { Image, notification } from "antd";
import moment from "moment";
import { dayKh, monthKh } from "../asset/data/formatKhDate";


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
                            {load.cost}$ /{load.um}
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

export const BarName = () => {
    let array = []

    for (var i = 1; i <= 31; i++) {
        array.push(i.toString())
    }

    return array
}

export const addDateForBarChart = (e) => {
    if (e) {
        let array = [...e]
        let newArray = []
        let result = []

        for (var i = 1; i <= 31; i++) {
            newArray.push({
                __typename: 'DataRecord',
                date: i,
                count: 0,
                total: 0
            })
        }

        newArray.map(load => {
            const index = array.findIndex(ele => ele.date === load.date)

            if (index === -1) {
                result.push(load.total)
            } else {
                result.push(array[index].total)
            }

            return null
        })

        return result
    }
}

export const addMonthForBarChart = (e) => {
    if (e) {
        let array = [...e]
        let expense = []
        let income = []

        for (let i = 1; i <= 12; i++) {
            let index = array.findIndex(ele => ele.month === i)

            if (index !== -1) {
                expense.push(array[index].expense)
                income.push(array[index].income)
            } else {
                expense.push(0)
                income.push(0)
            }
        }

        return {
            expense,
            income
        }
    }
}

export const reportCombineResAndProduct = (result, product) => {
    let newArr = []

    product?.map(load => {
        let index = result.findIndex(ele => ele._id === load.id)

        if(index === -1){
            newArr.push({
                _id: load.id,
                description: load.description,
                stockIn: 0,
                stockOut: 0,
                totalStock: 0,
                openning: 0
            })
        } else {
            newArr.push({
                _id: result[index]._id,
                description: result[index].description,
                stockIn: result[index].stockIn,
                stockOut: result[index].stockOut,
                totalStock: result[index].totalStock,
                openning: result[index].openning
            })
        }

        return null
    })

    return newArr.sort((a,b) => (b.totalStock - a.totalStock))
}

export const addIndex = (e) => {
    let newArr = []
    e.map((load, index) => newArr.push({
        ...load,
        index: index+1
    }))

    return newArr
}

export const convertDateToKh = (e) => {
    let day = moment(e).format("DD")
    let month = moment(e).month()
    let year = moment(e).format("YYYY")

    let newDay = dayKh[parseInt(day[0])] + dayKh[parseInt(day[1])]
    let newMonth = monthKh[parseInt(month)]
    let newYear = dayKh[parseInt(year[0])] + dayKh[parseInt(year[1])] + dayKh[parseInt(year[2])] + dayKh[parseInt(year[3])]

    let date = `ថ្ងៃទី${newDay} ខែ${newMonth} ឆ្នាំ${newYear}`

    return date
}

export function numberWithCommas(num, scale) {

    if (Math.round(num) !== num) {
        if (Math.pow(0.1, scale) > num) {
          return 0;
        }
        var sign = Math.sign(num);
        var arr = ("" + Math.abs(num)).split(".");
        if (arr.length > 1) {
          if (arr[1].length > scale) {
            var integ = +arr[0] * Math.pow(10, scale);
            var dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
            var proc = +arr[1].slice(scale, scale + 1)
            if (proc >= 5) {
              dec = dec + 1;
            }
            dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
            return dec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        }
      }
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}