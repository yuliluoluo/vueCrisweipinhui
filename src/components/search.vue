<template>
  <div id="sech">
     <!-- 搜索区 -->
      <van-row gutter="" class="row-1">
        <van-col span="3" class="cols">
          <van-icon name="arrow-left"  class="back" @click="$router.go(-1)"/>
        </van-col>
        <van-col span="19" class="cols">
          <form action="/">
            <van-search
              class="search" 
              v-model="value"
              style="background:white;height:35px;border-radius:22px;border: .5px solid rgba(205,205,205,.5);margin:0 10px"
              placeholder="搜索品牌或商品"
              autofocus="autofocus" 
              @click.stop="search"
            />
          </form>
        </van-col>
        <van-col span="2" class="cols">
          <img  src="../../static/images/icon/catogry.png" width="30px" height="30px" class="classfic" @click="$router.push('/catogry/0')" />
        </van-col>
    </van-row>

    <!-- 搜索区域 -->
    <div class="prevshow">
        <div v-show="show">
            <van-row class="row-2">
                <van-col span="5">热门搜索</van-col>
            </van-row>
            <van-row class="row-2 row-content">
                <van-col span="4" offset="2" class="bord" >
                  <div @click="$router.push('/goods?title=女包')">女包</div>
                </van-col>
                <van-col span="4" offset="1" class="bord" @click="$router.push('/goods?title=围巾')">
                  <div @click="$router.push('/goods?title=围巾')">围巾</div>
                </van-col>
                <van-col span="4" offset="1" class="bord" @click="$router.push('/goods?title=面膜')">
                  <div @click="$router.push('/goods?title=面膜')">面膜</div>
                </van-col>
                <van-col span="4" offset="1" class="bord" @click="$router.push('/goods?title=护肤')">
                  <div @click="$router.push('/goods?title=护肤')">护肤</div>
                </van-col>
            </van-row>

            <van-row class="row-2 row-content">
                <van-col span="4" offset="2" class="bord" @click="$router.push('/goods?title=大衣')">
                  <div @click="$router.push('/goods?title=大衣')">大衣</div>
                </van-col>
                <van-col span="4" offset="1" class="bord" @click="$router.push('/goods?title=女靴')">
                  <div @click="$router.push('/goods?title=女靴')">女靴</div>
                </van-col>
                <van-col span="4" offset="1" class="bord" @click="$router.push('/goods?title=口红')">
                  <div @click="$router.push('/goods?title=口红')">口红</div>
                </van-col>
            </van-row>
        </div>

        <div v-show="sshow">
            <div class="val"><span>{{value}} <van-icon name="search" class="icons"/></span></div>
        </div>
    </div>



  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';

export default {
  name: 'search',
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
        sshow:false,
    }
  },
  computed: {
    ...mapState({
      title: state => state.home.tab.title,
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
      sshow: state => state.home.sshow,
    }),
    ...mapGetters(['bc_notshow']),
  },
  methods: {
     search() {
       console.log(this.value)
     },
     search_shows(){
         this.$router.back(-1);
     },
     keyboradWatch(){
         this.value == '' || this.value == null ?  this.show = true : this.show = false;
         this.value == '' || this.value == null ?  this.sshow = false : this.sshow = true;
     },
     ...mapActions([
      'searchA'
    ]),
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
  },
  watch: {

  },
  directives: {

  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
          if( res.status == 200 ) {
                const data = res.data.home;
                this.broadcast = data.broadcast;
              //  console.log(res.data.home.active,this.days,this.activeTitle)
           } else {
             this.imageList = this.src;
             this.broadcast = "暂无消息~~QAQ~"
           }
            },(err)=>{
            this.imageList = this.src;
            this.broadcast = "暂无消息~~QAQ~"
    })

  },
  created() {
     console.log(this.show,this.search_show);
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/search.less');
</style>

