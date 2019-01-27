import querystring from "querystring";
import dateformat from "dateformat";

import {
  smallBox,
  bigBox,
  SmartMessageBox,
} from "../components/common/message_actions";

const LINK = {
  LOGIN: "dang-nhap",
  ACCOUNT: "tai-khoan",
  PRODUCT: "san-pham",
  ADD_CUSTOMER: "them-khach-hang",
  DETAIL_CUSTOMER: "chi-tiet-khach-hang",
  DASHBOARD: "dashboard",
  CATEGORY: "danh-muc",
  CAMPAIGN: "chien-dich-khuyen-mai",
  WIDGET: "widget",
  INVOICE: "don-hang",
  VENDOR: "nha-cung-cap",
  DELIVERY: "don-vi-van-chuyen",
  PAYMENT_METHOD: "phuong-thuc-thanh-toan",
  PRINT: "print",
  PRODUCT_PENDING: "product-pending",

  ADD_CUSTOMER_PAGE: "add-customer-page",
  STORE: "store"
};

const BIGBOX = {
  SUCESS: {
    color: "#739E73",
    icon: "fa fa-check",
  },
  WARNING: {
    color: "#C79121",
    icon: "fa fa-shield fadeInLeft animated",
  },
  ERROR: {
    color: "#C46A69",
    icon: "fa fa-warning shake animated",
  },
  INFO: {
    color: "#3276B1",
    icon: "fa fa-bell swing animated",
  },
};

export { LINK, BIGBOX };

export default class {
  static link(type, slug = "", query = null) {
    let prefix = "";
    let suffix = "";
    switch (type) {
      case "dang-nhap":
        prefix = "/dang-nhap/";
        break;
      case "san-pham":
        prefix = "/san-pham/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          let title = query.title;
          if (title) {
            qs["t"] = title;
          }
          let productId = query.id;
          if (productId) {
            qs["id"] = productId;
          }
          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "them-khach-hang":
        prefix = "/them-khach-hang/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          let title = query.title;
          if (title) {
            qs["t"] = title;
          }
          let productId = query.id;
          if (productId) {
            qs["id"] = productId;
          }
          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "tai-khoan":
        prefix = "/tai-khoan/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "danh-muc":
        prefix = "/danh-muc/";
        break;
      case "chien-dich-khuyen-mai":
        prefix = "/van-hanh/van-hanh/chien-dich-khuyen-mai/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          let title = query.title;
          if (title) {
            qs["t"] = title;
          }

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "chi-tiet-khach-hang":
        prefix = "/tra-cuu/chi-tiet-khach-hang/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          let title = query.title;
          if (title) {
            qs["t"] = title;
          }

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "product-pending":
        prefix = "/pending/product";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          let title = query.title;
          if (title) {
            qs["t"] = title;
          }

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "widget":
        prefix = "/noi-dung/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          let title = query.title;
          if (title) {
            qs["t"] = title;
          }

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "don-hang":
        prefix = "/tra-cuu/don-hang/";
        break;
      case "nha-cung-cap":
        prefix = "/nha-cung-cap/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          // let title = query.title;
          // if (title) {
          //     qs['t'] = title;
          // }
          let isActive = query.isActive;
          qs["isActive"] = isActive;

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "print":
        prefix = "/print/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          let title = query.title;
          if (title) {
            qs["t"] = title;
          }

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "don-vi-van-chuyen":
        prefix = "/don-vi-van-chuyen/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          // let title = query.title;
          // if (title) {
          //     qs['t'] = title;
          // }
          let title = query.title;
          qs["title"] = title;

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;
      case "phuong-thuc-thanh-toan":
        prefix = "/phuong-thuc-thanh-toan/";
        if (query) {
          let qs = {};
          let page = query.page;
          if (page) {
            qs["p"] = page;
          }
          // let title = query.title;
          // if (title) {
          //     qs['t'] = title;
          // }
          let title = query.title;
          qs["title"] = title;

          let limit = query.limit;
          if (limit) {
            qs["l"] = limit;
          }
          suffix += "?" + querystring.stringify(qs);
        }
        break;

      case "dashboard":
        prefix = "/";
        break;
      case "add-customer-page":
        prefix = "/add-customer-page/";
        break;
      case "store":
      prefix = "/store/";
      break;
    }

    return prefix + slug + suffix;
  }

  static formatDate(date, type = "full") {
    // console.log(date);
    switch (type) {
      case "full":
        return dateformat(date, "dd/mm/yyyy HH:MM:ss");
      case "date":
        return dateformat(date, "dd/mm/yyyy");
      case "time":
        return dateformat(date, "HH:MM");
    }
  }

  static formatPrice(price) {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  }

  static getTime(time) {
    var maxDate = new Date(time * 1000);
    var maxDateFormatted =
      this.pad(maxDate.getMonth() + 1, 2, "0") +
      "/" +
      this.pad(maxDate.getDate(), 2, "0") +
      "/" +
      +maxDate.getFullYear();
    return maxDateFormatted;
  }

  static pad(s, width, character) {
    return new Array(width - s.toString().length + 1).join(character) + s;
  }

  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}
