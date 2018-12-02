<template>
   <!-- 购物车组件 -->
  <div id="cart">
     <!-- header start -->
       <van-row gutter="" class="row-1">
          <van-col span="3" class="cols">
            <van-icon name="arrow-left"  class="back" @click="$router.go(-1)"/>
          </van-col>
          <van-col span="19" class="cols">
          <div>
            <h2>购物车</h2>          
          </div>
          </van-col>
          <van-col span="2" class="cols">
            <van-icon name="wap-home"  class="back" @click="$router.push('/home')"/>
          </van-col>
      </van-row>
      <!-- header end -->
     <!--  <div class="edit">编辑</div> -->
     <!-- 暂时不写编辑的功能和选择的功能了 -->
    <div v-for="(value,key,index) in $store.state.community.details" :key="key" class="shop-cart">
        <!-- shop name -->
        <div>
          <p>{{value[0].brand_store_name}}</p>
          <van-card
              :title="value[0].brand_store_name"
              :desc="value[0].product_name"
              :num="value.length"
              :price="value[0].vipshop_price"
              :thumb="value[0].small_image"    
          />
        </div>
    </div>
    <div class="btns" v-show="sum">
      <p >总价:￥<span>{{sum}}</span></p>
      <div class="btn" @click="fun_buy">购买</div>
    </div>
    <!-- 当购物车为空时的展示页面 -->
    <div class="empty" v-show="!sum">
      <h3>亲，你的购物车还是空的哦</h3>
    </div>
    <!-- tabBar -->
      <!-- <van-tabbar v-model="tabarActive">
        <van-tabbar-item  icon="wap-home" @click="redirects('/')">首页</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" :info="$store.state.community.info" @click="redirects('/shoppingCart')">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" @click="redirects('/me')">我的</van-tabbar-item>
      </van-tabbar> -->
    </div>

</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';

const coupon = {
  available: 1,
  discount: 0,
  denominations: 10000,
  origin_condition: 0,
  reason: '',
  value: 150,
  name: '满498减100',
  start_at: 1489104000,
  end_at: 1514592000
};

export default {
  name: 'shoppingCart',
  components:{
  
  },
  data() {
    return {
        sum:0,
        tabarActive:1,
        value:null,
        active:0,
        path:'../../static/images/',
        imageList:[],
        activeTitle:null,
        days:null,
        disabled:false,
        broadcast:null,
        show:true,
        count: 0,
        isLoading: false,
        checked: [false,false,false,false],
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        showList:null,
        imageUrl:[],
        goodsTitle:[],
        goodsDescription:[],
        prices:[],
        shops:[],
    }
  },
  computed: {
    ...mapState({
      title: state => state.community.tab.title,
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      actives: state => state.active.home.title,
      src : state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show,
    }),
    ...mapGetters(['bc_notshow','search_show']),
  },
  methods: {
    ...mapActions([
      'searchA','infoAction'
    ]),
    // search() {
    //   this.$router.push('/search');
    // },
    // onRefresh() {
    //   setTimeout(() => {
    //     this.$toast('刷新成功');
    //     this.isLoading = false;
    //     for (let i = 0; i < 3; i++) {
    //         this.imageUrl.push(this.imageUrl[i]);
    //         this.goodsTitle.push(this.goodsTitle[i]);
    //         this.goodsDescription.push(this.goodsDescription[i]);
    //         this.shops.push(this.shops[i]);
    //         this.prices.push(this.prices[i]);
    //     }

    //     this.infoAction();
    //     const infos = document.querySelector('.van-icon__info');
    //     infos.innerText = this.shop_info;

    //   }, 500);
    // },
     //优惠券
     onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
     redirects(url) {
      this.$router.push(url);
    },
    fun_buy(){
      let order={
        name:"订单"+this.$store.state.community.num++,
        sum:this.sum,
        date:new Date()
      }
      this.$store.state.community.orders.push(order);
      this.$store.state.community.info=0;
      this.$store.state.community.details={};
      this.$router.push('/neworder')
    }
  },
  watch: {

  },
  directives: {
    tab:{
      inserted(el) {
        //绑定tab样式
        const tabs = el.childNodes[0].childNodes[0].children[0];
        tabs.style.backgroundColor = '#d34ba8';
      }
    },
    //tabBar 消息通知指令
    infos:{
      inserted(el,obj) {
         console.log(obj.value);
         const info = el.childNodes[0].childNodes[1];
         info.innerText = obj.value;
      }
    }

  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
          if( res.status == 200 ) {
              const data = res.data.goods;
              const preImg = data.id_0.imgList[0];
              const title = data.id_0.title[0];
              const price = data.id_0.limit_price[0];
              const description = data.id_0.description; 
              const shops = data.id_0.shops;

              this.imageUrl = preImg;
              this.goodsTitle = title;
              this.prices = price;
              this.goodsDescription = description;
              this.shops = shops;              
              
           } else {
             this.imageList = this.src;
             //this.broadcast = "暂无消息~~QAQ~"
           }
            },(err)=>{
            this.imageList = this.src;
            //this.broadcast = "暂无消息~~QAQ~"
    })

  },
  created(){
    let lists=this.$store.state.community.details;
    for (var key in lists){
      lists[key].forEach(value=>{
        console.log(lists[key]);
        this.sum+=parseFloat(value.vipshop_price);
      })
    }
  }
}
</script>

<style lang="less" scoped>
//@import url('../assets/css/home.less');
#cart{
  width:100%;
  height: 100%;
  background-color:#fff;
  text-align: left;
  position: relative;
  .empty{
    position:absolute;
    left:50%;
    top:50%;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 10;
    transform:translate(-50%);
    h3{
      color: #dd3d97;
    }
  }
  .btns{
    text-align: center;
    position: fixed;
    left:.5rem;
    right:.5rem;
    bottom:0;
    p{
      font-size: .6rem;
    }
    .btn{
      color: #fff;
      font-size: .6rem;
      line-height: 1rem;
      background-color:#dd3d97;
      border-radius: 5px;
    }
  }
  .edit{
    font-size: .6rem;
    text-align: right;
    padding-right: .5rem;
  }
  .shop-cart{
    p{
      text-align: left;
      font-size: .5rem;
      padding:0;
      padding-left: .8rem;
    }
  }
.back{
          font-size: 20px;
          line-height: 35px;
        
      }
      h2{
        font-size: .5rem;
        line-height: 35px;
        margin: 0;
      }
      .row-1{
        text-align: center;
        overflow:hidden;
          height: 35px;
        margin-top: 8px;
        }
        .cols div{
          padding: 0 20px;
          button{
            border:none;
            font-size: .4rem;
            padding: .1rem .2rem;
          }
        }
}
</style>

