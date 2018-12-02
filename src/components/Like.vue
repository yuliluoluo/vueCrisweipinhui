<template>
	<div id="neworder">
		<!-- header start -->
        <van-row gutter="" class="row-1">
          <van-col span="3" class="cols">
            <van-icon name="arrow-left"  class="back" @click="$router.go(-1)"/>
          </van-col>
          <van-col span="19" class="cols">
          <div>
            <h2>我的喜欢</h2>          
          </div>
          </van-col>
          <van-col span="2" class="cols">
            <van-icon name="wap-home"  class="back" @click="$router.push('/home')"/>
          </van-col>
        </van-row>
      <!-- header end -->
      	<div class="myorders">
      		<ul>
      			<li v-for="(item,index) in $store.state.community.likes" @click="$router.push('/detail?goodsId='+item.id)">
      				<span>{{item.des}}</span>
      			</li>
      		</ul>
      	</div>
	</div>
</template>
<style lang="less" scoped="">
	#neworder{
		width: 100%;
		height:100%;
		background-color: #fff;
		position:relative;
		.myorders{
			width: 100%;
			ul{
				list-style: none;
				padding:.5rem;
				li{
					padding:.5rem;
					width: 100%;
					box-sizing: border-box;
					font-size: .5rem;
					display: flex;
					justify-content: space-between;
					border-bottom:.5px solid rgba(255,125,125,.5);
					span{
						display: block;
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
        line-height: 35px;
        margin: 0;
      }
      .row-1{
        text-align: center;
        overflow:hidden;
          height: 35px;
        //margin-top: 8px;
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
			return{
				sum:0,
				chosenAddressId: '1',
			      list: [],
			}
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