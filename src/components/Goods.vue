<template>
  <div id="goods">
      <!-- header start -->
       <van-row gutter="" class="row-1">
          <van-col span="3" class="cols">
            <van-icon name="arrow-left"  class="back" @click="$router.go(-1)"/>
          </van-col>
          <van-col span="19" class="cols">
          <div>
            <h2>{{$route.query.title}}</h2>          
          </div>
          </van-col>
          <van-col span="2" class="cols">
            <van-icon name="wap-home"  class="back" @click="$router.push('/home')"/>
          </van-col>
      </van-row>
      <!-- header end -->
      <!-- list start -->
      <div class="lists">
        <ul>
          <li v-for="(item,index) in Lists" @click="$router.push('/detail?goodsId='+item.product_id)">
            <img :src="item.small_image" alt="">
            <p class="title">{{item.brand_store_name}} | {{item.product_name}}</p>
            <p class="sub"><span><i>￥{{item.vipshop_price}}</i><i>￥{{item.market_price}}</i></span><span>{{item.discount}}</span></p>
          </li>
        </ul>
      </div>
  </div>
</template>
<style lang="less" scoped>
#goods{
  .lists{
    width: 100%;
    ul{
      list-style: none;
      width: 100%;
      li{
        display: inline-block;
        width: 50%;
        padding: .2rem;
        box-sizing: border-box;
        font-size: .5rem;
        img{
          width: 100%;
          height: auto;
        }
        p{
          margin: 0;
          padding: 0;
          &.title{
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            display: -webkit-box;
          }
          &.sub{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .3rem;
            i{
              font-style:normal;
              &:first-child{
                color: #e55;
              }
              &:last-child{
                color:#666;
                text-decoration: line-through;
              }
            }
            span:last-child{
              background-color: #000;
              color:#fff;
              padding: 0 .1rem;
            }
          }
        }
      }
    }
  }
.back{
          font-size: 20px;
          line-height: 35px;
        
      }
      h2{
        font-size: .5rem;
      }
      .row-1{
          height: 35px;
      padding-top: 8px;
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

<script>
  export default{
    data(){
      return {
        Lists:[]
      }
    },
    created(){
      this.axios.get('./static/goods.json').then((res)=>{
              if( res.status == 200 ) {
                    this.Lists = res.data[0].result.products;
                 // this.broadcast = data.broadcast;
                //  console.log(res.data.home.active,this.days,this.activeTitle)
              }
          });
    }
  }
</script>