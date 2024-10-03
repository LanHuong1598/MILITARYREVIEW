// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})
/*eslint-disable */
const formatNumber = (num = "", split = ",") =>
  num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, split) : ""

const formatNumberFloat = (num = "", df = "", split = ",") => {
  try {
    let [inter = 0, float = 0] = `${num}`.split(".")
    return (
      inter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, split) + "." + float
    )
  } catch (error) {
    return df
  }
}

const getLoanLimit = loan_limit => {
  let c = 0

  try {
    const {
      Amount_Credit = 0,
      Amount_Debit = 0,
      Amount_Release = 0
    } = loan_limit
    if (Amount_Credit) c += Amount_Credit
    if (Amount_Debit) c += Amount_Debit
    if (Amount_Release) c += Amount_Release
  } catch (error) {}
  return c
}

const moneyToNumber = (num = "", split = ",") =>
  num ? num.split(split).join("") : ""

const toDateString = date => {
  let today = new Date(date)
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0")
  let yyyy = today.getFullYear()

  return dd + "/" + mm + "/" + yyyy
}
const toDateTimeString = date => {
  let today = new Date(date)
  let hh = String(today.getHours()).padStart(2, "0")
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0")
  let yyyy = today.getFullYear()

  return hh + "h " + dd + "/" + mm + "/" + yyyy
}
const toDateTimeStringEnglish = date => {
  var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var D = new Date(date.replace(/-/g, "/"));
  var lang = 'en',
   year = D.toLocaleString(lang, {year:'numeric'}),
    month = D.toLocaleString(lang, {month:'short'}),
    day = D.toLocaleString(lang, {day:'numeric'}),
    dayName = D.toLocaleString(lang, {weekday:'long'});
  return month + " " + day + ", " +year
  // return M[D.getMonth()] + " " + D.getDate() + ", " + D.getFullYear()
}
const compareDateTimeEx = date => {
  let end = new Date(date)
  let start = new Date()
  //convert to hour remain
  let hourRemain = (end.getTime() - start.getTime()) / 3600000
  // ** if true: warning 
  if (hourRemain <= 12 && hourRemain >=0) {
    return true
  }
  return false
}
const moneyToText = so => {
  var mangso = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín"
  ]
  const dochangchuc = (so, daydu) => {
    var chuoi = ""
    var chuc = Math.floor(so / 10)
    var donvi = so % 10
    if (chuc > 1) {
      chuoi = " " + mangso[chuc] + " mươi"
      if (donvi == 1) {
        chuoi += " mốt"
      }
    } else if (chuc == 1) {
      chuoi = " mười"
      if (donvi == 1) {
        chuoi += " một"
      }
    } else if (daydu && donvi > 0) {
      chuoi = " lẻ"
    }
    if (donvi == 5 && chuc > 1) {
      chuoi += " lăm"
    } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
      chuoi += " " + mangso[donvi]
    }
    return chuoi
  }
  const docblock = (so, daydu) => {
    var chuoi = ""
    var tram = Math.floor(so / 100)
    so = so % 100
    if (daydu || tram > 0) {
      chuoi = " " + mangso[tram] + " trăm"
      chuoi += dochangchuc(so, true)
    } else {
      chuoi = dochangchuc(so, false)
    }
    return chuoi
  }
  const dochangtrieu = (so, daydu) => {
    var chuoi = ""
    var trieu = Math.floor(so / 1000000)
    so = so % 1000000
    if (trieu > 0) {
      chuoi = docblock(trieu, daydu) + " triệu"
      daydu = true
    }
    var nghin = Math.floor(so / 1000)
    so = so % 1000
    if (nghin > 0) {
      chuoi += docblock(nghin, daydu) + " nghìn"
      daydu = true
    }
    if (so > 0) {
      chuoi += docblock(so, daydu)
    }
    return chuoi
  }
  if (so == 0) return mangso[0]
  var chuoi = "",
    hauto = ""
  do {
    var ty = so % 1000000000
    so = Math.floor(so / 1000000000)
    if (so > 0) {
      chuoi = dochangtrieu(ty, true) + hauto + chuoi
    } else {
      chuoi = dochangtrieu(ty, false) + hauto + chuoi
    }
    hauto = " tỷ"
  } while (so > 0)
  chuoi = chuoi.trim()
  if (chuoi.length > 0) chuoi = chuoi[0].toUpperCase() + chuoi.substr(1)
  return chuoi.trim() + " đồng"
}
const getLoanContractStatus = status => {
  switch (status) {
    case 1:
      return {
        text: "Đang chờ giải ngân",
        color: colors.primary1
      }
    case 2:
      return {
        text: "Đã giải ngân",
        color: colors.primary3
      }
    case 3:
      return {
        text: "Đã tất toán",
        color: colors.primary4
      }
    case 4:
      return {
        text: "Đã huỷ",
        color: colors.primary5
      }
  }
  return {
    text: "",
    color: colors.primary
  }
}

const getMainLoanContractStatus = status => {
  switch (status) {
    case 1:
      return {
        text: "Đang chờ giải ngân",
        color: colors.primary1
      }
    case 2:
      return {
        text: "Đã giải ngân",
        color: colors.primary2
      }
    case 3:
      return {
        text: "Đã giải ngân",
        color: colors.primary3
      }
    case 4:
      return {
        text: "Đã đã tất toán",
        color: colors.primary4
      }
    case 5:
      return {
        text: "Đã huỷ",
        color: colors.primary5
      }
  }
  return {
    text: "",
    color: colors.primary
  }
}

const getAutoInvestContractStatus = status => {
  switch (status) {
    case 1:
      return {
        text: "Đang chờ giới thiệu khoản vay",
        color: colors.primary1
      }
    case 2:
      return {
        text: "Đang chờ nhà đầu tư chọn khoản vay",
        color: colors.primary1
      }
    case 3:
      return {
        text: "Đã chọn khoản vay",
        color: colors.primary2
      }
    case 4:
      return {
        text: "Đang giải ngân",
        color: colors.primary3
      }
    case 5:
      return {
        text: "Đã tất toán",
        color: colors.primary4
      }
    case 6:
      return {
        text: "Đã huỷ",
        color: colors.primary5
      }
  }
  return {
    text: "",
    color: colors.primary
  }
}
const capitalize = text => {
  return text[0].toUpperCase() + text.slice(1);
}
/*eslint-enable */
export {
  formatNumber,
  toDateString,
  moneyToNumber,
  moneyToText,
  formatNumberFloat,
  toDateTimeString,
  compareDateTimeEx,
  getLoanContractStatus,
  getLoanLimit,
  getMainLoanContractStatus,
  getAutoInvestContractStatus,
  toDateTimeStringEnglish,
  capitalize
}

