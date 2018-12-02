
export default {
    state:{
        tab:{
            title:['','动态','热门','发现'],
        },
        share:{
            title:['转发','发送给好友','取消分享'],
        },
        // 记录加入购物车的个数
        info:0,
        // 记录加入购物车的数据信息
        details:{},
        //记录每条订单的价格和日期
        orders:[],
        //记录订单名称标识
        num:1,
        //记录喜欢的商品信息，因为可以跳转具体的商品详情，所以此处需要product_id
        likes:[],
        //记录收藏的店铺信息
        stars:[],
        //记录地址信息
        addresses:[]
    },
    mutations: {
       
    },
    actions: {
      
    },
    getters: {
       
    }
}