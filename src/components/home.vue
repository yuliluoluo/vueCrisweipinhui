<template>
   <!-- 首页组件 -->
  <div id="app">
     <!-- 搜索区 -->
     <van-row gutter="" class="row-1">
        <van-col span="3" class="cols">
          <a href="#">登录</a>
        </van-col>
        <van-col span="19" class="cols">
          <form action="/">
            <van-search
              class="search" 
              v-model="value"
              style="background:white;height:35px;border-radius:22px;border: .5px solid rgba(205,205,205,.5);margin:0 10px"
              placeholder="搜索品牌或商品"
              @click.stop="search"
            />
          </form>
        </van-col>
        <van-col span="2" class="cols">
          <img  src="../../static/images/icon/catogry.png" width="30px" height="30px" class="classfic" @click="$router.push('/catogry/0')"/>
        </van-col>
    </van-row>

    <!-- 标签区域 -->
    <van-row>
      <van-col span="24">
        <van-tabs v-model="active" swipeable>
          <van-tab v-for="index in 7" 
          :title="title[index]" 
          :key="index.id" 
          class="tab"
          >
          <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          
             </van-pull-refresh>   -->
            <!-- 今日推荐版块 -->
            <div v-if="title[index]== '今日推荐'" class="contain">
               <!-- 轮播 -->
                <swiper class="swiper" :tabs="title[index]" />
                <!-- 菜单栏 -->
                <van-row class="col-2">
                  <van-col class="row-2" span="6" v-for="(v,index) in icon" :key='v.id'>
                    <router-link :to="'/catogry/'+ids[index]">
                      <img :src="path+'icon/'+icon[index]+'.png'"/>
                      <span>{{bageTitle[index]}}</span>
                    </router-link>
                  </van-col>
                    <!-- 通知 -->
                <van-col span="24" style="margin-top:20px;" v-show="bc_notshow">
                   <van-notice-bar
                       mode="link"
                       left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
                    >
                     每一天都是崭新的一天，唯你最美
                     对酒当歌，人生几何
                   </van-notice-bar>
                </van-col>
              </van-row>
              <!-- 活动版块 -->
                <active :tabs="title[index]" />
            </div>

            <!-- 时尚版块 -->
            <div v-if="title[index]== '时尚'" class="contain">
              <active :tabs="title[index]" />
            </div>

            <!-- 美妆版块 -->
            <div v-if="title[index]== '美妆'" class="contain">
              <swiper class="swiper" :tabs="title[index]" />
              <active :tabs="title[index]" />
            </div>

            <!-- 家电版块 -->
            <div v-if="title[index]== '家电'" class="contain">
              <swiper class="swiper" :tabs="title[index]" />
              <active :tabs="title[index]" />
            </div>

            <!-- 家居版块 -->
            <div v-if="title[index]== '家居'" class="contain">
              <swiper class="swiper" :tabs="title[index]" />
              <active :tabs="title[index]" />
            </div>

            <!-- 国际版块 -->
            <div v-if="title[index]== '国际'" class="contain">
              <swiper class="swiper" :tabs="title[index]" />
              <active :tabs="title[index]" />
            </div>

            <!-- 生活版块 -->
            <div v-if="title[index]== '生活'" class="contain">
              <swiper class="swiper" :tabs="title[index]" />
              <active :tabs="title[index]" />
            </div>
       
          </van-tab>
        </van-tabs>
      </van-col>
    </van-row>

    <!-- tabBar -->
      <van-tabbar v-model="tabarActive">
        <van-tabbar-item  icon="wap-home" @click="redirects('/')">首页</van-tabbar-item>
        <!-- <van-tabbar-item icon="pending-evaluate" dot @click="redirects('/community')">社区</van-tabbar-item> -->
        <van-tabbar-item icon="shopping-cart" :info="$store.state.community.info"  @click="redirects('/shoppingCart')">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" @click="redirects('/me')">我的</van-tabbar-item>
      </van-tabbar>
    </div>

</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Waterfall } from 'vant';
import Swiper from './swiper';
import Active from './active';
import { Toast } from 'vant';

export default {
  name: 'home',
  components:{
    Swiper,
    Active,
  },
  data() {
    return {
        tabarActive:0,
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
        isLoading: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.home.tab.title,
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      ids:state=>state.home.badge.index,
      actives: state => state.active.home.title,
      src : state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      //broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show,
    }),
    ...mapGetters(['bc_notshow','search_show']),
  },
  methods: {
    ...mapActions([
      'searchA'
    ]),
    search() {
      this.$router.push('/search');
    },
   /* onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },*/
     // 瀑布流方法
     loadMore() {
      this.disabled = true;
       setTimeout(() => {
         for (let i = 0; i < 5; i++) {
            this.imageList.push(this.imageList[i]);
            this.activeTitle.push(this.activeTitle[i]);
            this.days.push(this.days[i]); 
        }
        this.disabled = false;
       }, 200);
    },
    redirects(url) {
      this.$router.push(url);
    },
    /*tip() {
      Toast('网络错误o(╥﹏╥)o 请稍后再试~');
    }*/
  },
  watch: {

  },
  directives: {
    //瀑布流
    //WaterfallLower: Waterfall('lower'),
   /* tab:{
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
    }*/

  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
          if( res.status == 200 ) {
                const data = res.data.home;
               // this.broadcast = data.broadcast;
              //  console.log(res.data.home.active,this.days,this.activeTitle)
           } else {
             this.imageList = this.src;
            // this.broadcast = "暂无消息~~QAQ~"
           }
            },(err)=>{
            this.imageList = this.src;
            //this.broadcast = "暂无消息~~QAQ~"
    })

  },
  created() {
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/home.less');
.van-cell{
        background-color: #ccc!important;
    }
</style>

