<template>
   <!-- 我的 组件 -->
  <div id="my">
    <van-row gutter="" class="row-1">
          <van-col span="3" class="cols">
            <van-icon name="arrow-left"  class="back" @click="$router.go(-1)"/>
          </van-col>
          <van-col span="19" class="cols">
          <div>
            <h2>我的</h2>          
          </div>
          </van-col>
          <van-col span="2" class="cols">
            <van-icon name="wap-home"  class="back" @click="$router.push('/home')"/>
          </van-col>
        </van-row>
      <!-- header end -->
  <van-row class="col-me">
                  
                      <!-- 列表区 -->
                      <van-col span="24" class="headerList" v-for="v in menu" :key="v.id">

                         <div class="me-img-ts" @click.stop="listCover(v)">
                             <span @click="linkto(v)">{{v}}</span>  
                         </div>

                         <div class="me-img-ps">
                             <h4>{{'>'}}</h4>  
                         </div>

                     </van-col>

                      <van-col span="24" class="headerList">

                         <div class="me-img-ts">
                             <span>{{'安全模式'}}</span>  
                         </div>

                         <div class="me-img-ps">
                            <van-switch :value="checked" size="22px" @input="onInput" class="btns"/>
                         </div>

                     </van-col>

                    <!-- 弹出层 -->
                     <van-popup v-model="shows" position="bottom" :overlay="true">
                      <van-col span='24' class="title" style="width:100%;height:100%;paddingBottom:20px;">
                      <!-- 物流信息 -->
                         <div v-if="wuliu">
                          <h4>{{menu[1]}}</h4>  

                          <van-steps 
                            :active="active"
                            icon="logistics"
                            title=""
                            description=""
                          >
                           <van-step>买家下单</van-step>
                            <van-step>商家发货</van-step>
                            <van-step>交易完成</van-step>
                          </van-steps>

                          <van-steps direction="vertical" :active="0" active-color="#06bf04">
                            <van-step>
                              <h3>【长春市】快件已到菜鸟驿站请带好证件来取件</h3>
                              <p>{{new Date().toLocaleDateString()}}</p>
                            </van-step>
                            <van-step>
                              <h3>【北京市】已到北京集散中心正准备发往下一站</h3>
                              <p>{{new Date().toLocaleDateString()}}</p>
                            </van-step>
                            <van-step>
                              <h3>快件已发货</h3>
                              <p>{{new Date().toLocaleDateString()}}</p>
                            </van-step>
                          </van-steps>

                        </div>
                      <!-- 联系人 -->
                         <div v-if="contact" style="height:300px;">
                          <h4>{{menu[2]}}</h4>
                          <van-address-list
                            v-model="chosenAddressId"
                            :list="$store.state.community.addresses"
                            @add="onAdd"
                            @edit="onEdit"
                            @select="onSelect"
                          />  
                            </div>
                            <div v-if="showList">
                               <van-address-edit
                                :area-list="areaList"
                                :address-info="addressInfo"
                                show-postal
                                show-set-default
                                @save="onSave"
                                
                                />
                            </div>
                               

                        
                      </van-col>
                    </van-popup>
<!--        
                          联系人卡片
                              <van-contact-card
                                :type="cardType"
                                :name="currentContact.name"
                                :tel="currentContact.tel"
                                @click="showList = true"
                              />
                              
                              联系人列表
                              <van-popup v-model="showList" position="bottom">
                                <van-contact-list
                                  v-model="chosenContactId"
                                  :list="list"
                                  @add="onAdd"
                                  @edit="onEdit"
                                  @select="onSelect"
                                />
                              </van-popup>

                              联系人编辑
                              <van-popup v-model="showEdit" position="bottom">
                                <van-contact-edit
                                  :contact-info="editingContact"
                                  :is-edit="isEdit"
                                  @save="onSave"
                                  @delete="onDelete"
                                />
                              </van-popup>  -->
                       
                    
       </van-row>

   
    <!-- tabBar -->
      <van-tabbar v-model="tabarActive">
        <van-tabbar-item  icon="wap-home" @click="redirects('/')">首页</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" :info="$store.state.community.info" @click="redirects('/shoppingCart')">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" @click="redirects('/me')">我的</van-tabbar-item>
      </van-tabbar>

    </div>

</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Toast } from 'vant';
import { Dialog } from'vant';
import Area from './area.js';

export default {
  name: 'Me',
  components:{
  
  },
  data() {
    return {
        addressInfo:{},
        areaList:Area,
        chosenAddressId:null,
        tabarActive:3,
        img:'http://img3.duitang.com/uploads/item/201511/14/20151114125146_LXHzE.jpeg',
        menu:['我的订单','物流信息','地址管理','我的喜欢','我的收藏'],
        currentRate: 0,
        checked: true,
        shows: false,
        xinyong:false,
        wuliu:false,
        contact:false,
        pass:false,
        value: 5,
        active: 3,
        chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      }],
       value: '',
      showKeyboard: true
    }
  },
  computed: {
    ...mapState({
      src : state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show,
    }),
    ...mapGetters(['bc_notshow','search_show']),
     text() {
      return this.currentRate.toFixed(0) + '分'
    },
     cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
  },
  methods: {
    ...mapActions([
      'searchA','infoAction'
    ]),
     redirects(url) {
      this.$router.push(url);
    },
     onInput(checked) {
        if(this.checked){
      Dialog.confirm({
        title: '提醒',
        message: '关闭安全模式可能给您带来风险，是否确认关闭'
      }).then(() => {
        this.checked = checked;
      });
     }else{
         Toast('亲，现在很安全哦')
         this.checked = true;
     }
    },
    listCover(v) {
       this.shows = true;
    
      switch(v) {
        case '物流信息' :
           this.contact = false;
           this.pass = false;
           this.xinyong = false;
           this.wuliu = true;
          break;
        case '地址管理' :
           this.pass = false;
           this.xinyong = false;
           this.wuliu = false;
          this.contact = true;
          break;
        default:
          this.shows = false;
          break;
      }
    },
       // 添加联系人
    onAdd() {
      /*this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;*/
      this.isEdit=false;
      this.showList=true;
      this.contact=false;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit=true;
      this.showList=true;
      this.contact=false;
      this.addressInfo=item;
     // this.contact=false;
      /*this.isEdit = true;      
      this.showEdit = true;
      this.editingContact = item;*/
    },

    // 选中联系人
    onSelect(item,index) {
      this.chosenAddressId=item.id;
      this.$store.state.community.defaultSelect=index;
      this.showList = false;
      this.contact=false;
      this.shows=false;
      Toast("选择默认地址成功");
    },

    // 保存联系人
    onSave(info) {
      /*this.showEdit = false;
      this.showList = false;
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;*/
      if(info.isDefault==true){
        this.chosenAddressId=info.id;
        this.$store.state.community.defaultSelect=info.id;
      }
      this.showEdit=false;
      this.showList=false;
      if(this.isEdit){
        
        this.$store.state.community.addresses.map(item=>{
          console.log(item.name==info.name);
          //console.log(item.id,info.id);
          if(item.name==info.name)
              {return info}
           else {return item}         
        })
        console.log(this.$store.state.community.addresses);
      }else{
          this.$store.state.community.addresses.push(info);
        }
      Toast("恭喜亲，地址保存成功");
        this.shows=false;
      },

    /*// 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },*/

    linkto(to){
      console.log(to)
      if(to=='我的订单'){
        this.$router.push('/neworder')
        return;
      }
      if(to=="我的喜欢"){
        this.$router.push('/like');
        return;
      }
      if(to=='我的收藏'){
        this.$router.push('/star');
        return;
      }
    },

    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
  },
  watch: {

  },
  directives: {

  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
          if( res.status == 200 ) {
              const data = res.data.goods;
              
           } else {
             this.imageList = this.src;
            // this.broadcast = "暂无消息~~QAQ~"
           }
            },(err)=>{
            this.imageList = this.src;
           // this.broadcast = "暂无消息~~QAQ~"
    })

  },
}
</script>

<style lang="less" scoped>
@import url('../assets/css/home.less');
#my{
  height: 100%;
  width: 100%;
  background-color: #fff;
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
        //padding-top: 8px;
        margin-bottom: 1rem;
        }
        .cols div{
          padding: 0 20px;
          button{
            border:none;
            font-size: .4rem;
            padding: .1rem .2rem;
          }
        }
</style>

