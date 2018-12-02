<template>
	<div class="brand">
		<van-row gutter="" class="row-1">
	        <van-col span="3" class="cols">
	          <van-icon name="arrow-left"  class="back" @click="$router.go(-1)"/>
	        </van-col>
	        <van-col span="19" class="cols">
	        	<div>
					<button @click="changeBtn(0)" :style="type[0]?'background-color:#585c64;color:#fff':'background-color:#fff;color:#585c64;'">分类</button>
	         		<button  @click="changeBtn(1)" :style="type[1]?'background-color:#585c64;color:#fff':'background-color:#fff;color:#585c64'">品牌</button>
				</div>
	        </van-col>
	        <van-col span="2" class="cols">
	          <van-icon name="wap-home"  class="back" @click="$router.push('/home')"/>
	        </van-col>
	    </van-row>
	    <van-tabs swipeable class="tabs">
  			<van-tab v-for="(item,index) in titleList" :title="item">
    			
  			</van-tab>
  			<div class="sub-title">
  				<div class="left">猜你喜欢</div>
  				<div class="right" @click="changeSub"><span>换一换</span><span></span></div>
  			</div>
  			<div class="sub-list">
  				<ul>
  					<li v-for="(item,index) in subList" :key="index">
  						<transition tag="div" name="ani">
  						<img class="subimg" :src="item.data.brandStoreLogoPic" alt="">
  						</transition>
  						<p class="subp">{{item.data.productName}}</p>
  					</li>
  				</ul>
  			</div>
		</van-tabs>
	</div>
</template>
<style lang="less">
	.brand{
		width: 100%;
		height: 100%;
		background-color: #fff;
		.ani-enter,.ani-leave-to{
			transform: translateY(-100%);
			/* .subp,.subimg{
				transform: translateY(-100%);
			} */
		}
		.ani-enter-to,.ani-leave{
			transform: translateY(0);
			/* .subp,.subimg{
				transform: translateY(0);
			} */
		}
		.ani-enter-active,.ani-leave-active{
			transition: all 1s;
		}
		.sub-list{
			box-sizing: border-box;
			padding: 0 .4rem;
			width: 100%;
			ul{
				width: 100%;
				list-style: none;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				li{
					width: 32%;
					height: 2.8rem;
					margin-bottom: .3rem;
					img{
						padding-top: .3rem;
						width: 50%;
						height: 50%;
					}
					background-color: rgba(200, 200, 200, .3);
					p{
						margin: 0;
						padding: 0;
						font-size: .3rem;
					}

				}
			}
		}
		.sub-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .5rem;
			.left,.right{
				font-size: .3rem;

			}
			.right span:first-child{
				line-height: .6rem;
			}
			.right span:last-child{
				display: inline-block;
				 width: .6rem;
				 height: .6rem;
				position: relative;
				top:.2rem;
				left:.2rem;
				background: url("https://h2.vipstatic.com/h5.vipstatic.com/img/icon_refreshbrands_small.93950989.png") no-repeat;
				background-size: .6rem;
			}
		}
		.tabs{
			margin-top: .5rem;
		}
		.back{
        	font-size: 20px;
        	line-height: 35px;
        
    	}
    	.row-1{
        	height: 35px;
			padding-top: 8px;
        }
        .cols div{
        	padding: 0 20px;
        	button{
        		border:.5px solid #ccc;
        		font-size: .4rem;
        		padding: .1rem .2rem;
        		box-sizing: border-box;
        	}
        }
	}
</style>
<script>
	export default{
		data(){
			return{
				type:[false,true],
				titleList:["猜你喜欢","女装","鞋靴","美妆","母婴","男装","精品","运动户外","内衣","家居家纺","家电数码"],
				subList:[],
				all:[],
				num:0
			}
		},
		created(){
			this.axios.get('./static/brand.json').then((res)=>{
	          	if( res.status == 200 ) {
	          		this.all=res.data.data.operation_list;
	          		console.log(res.data.data.operation_list[20908][0].child);
	            	    this.subList = res.data.data.operation_list[20908][0].child;
	               // this.broadcast = data.broadcast;
	              //  console.log(res.data.home.active,this.days,this.activeTitle)
	           	}
         	});
		},
		methods:{
			changeBtn(index){
				let temp=[false,false];
				temp[index]=true;
				this.type=temp;
				console.log(this.type);
				if(!index){
					this.$router.push('/catogry/0');
				}else{
					this.$router.push('/brand');
				}
			},
			changeSub(){
				let arr=[48520,21005,21062,20973,21007,20908,44687,21114,21089];
				this.subList=this.all[arr[this.num++%9]][0].child;
			}

		}
	}
</script>