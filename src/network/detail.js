import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid: iid
    }
  })
}

// 请求商品推荐数据展示
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}


//商品基本信息 面向对象封装
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice; //真实价格
  }
}

/*商家类 商家基本信息*/
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

/*商品参数*/
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

// export class GoodsInfo {
//   constructor()
// }

//类似Java构造器
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
//
// const p =new Person('biu',18)
