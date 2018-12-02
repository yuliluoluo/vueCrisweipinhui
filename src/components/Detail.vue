<template>
	<div id="detail">
		<!-- swiper start -->
		<div class="swiper">
			<!-- backbtn -->
			<van-swipe class="s">
				<van-swipe-item>
					<img :src="detail.small_image" alt="">
				</van-swipe-item>
  				<van-swipe-item>
  					<img src="../../static/images/detail1.jpg" alt="">
  				</van-swipe-item>
  				<van-swipe-item>
  					<img src="../../static/images/detail2.jpg" alt="">
  				</van-swipe-item>
  				<van-swipe-item>
  					<img src="../../static/images/detail3.jpg" alt="">
  				</van-swipe-item>
  				<van-swipe-item>
  					<img src="../../static/images/detail4.jpg" alt="">
  				</van-swipe-item>
			</van-swipe>
			<van-icon name="arrow-left" class="back" @click="$router.go(-1)"/>
		</div>
		<!-- swiper end -->
		<!-- info start -->
		<div class="info">
			<p>
				<span>
					<i>￥{{detail.vipshop_price}}</i>
					<i>￥{{detail.market_price}}</i>
					<i>{{detail.vip_discount}}</i>
				</span>
				<span>
					<van-icon name="like-o" class="like" @click="like" :style="likeClick?'color:#f55':'color:#333'"></van-icon>
					<van-icon name="share" class="share"></van-icon>					
				</span>
			</p>
			<p class="special" v-show="detail.special_price">
				<span>{{detail.price_icon_msg}}</span>
				<span>￥{{detail.special_price}}</span>
			</p>
			<p class="pinfo">{{detail.product_name}}</p>
		</div>
		<!-- info end -->
		<!-- 优惠券单元格 -->
		<van-coupon-cell
		  :coupons="coupons"
		  :chosen-coupon="chosenCoupon"
		  @click="showList = true"
		/>

		<!-- 优惠券列表 -->
		<van-popup v-model="showList" position="bottom">
		  <van-coupon-list
		    :coupons="coupons"
		    :chosen-coupon="chosenCoupon"
		    :disabled-coupons="disabledCoupons"
		    @change="onChange"
		    @exchange="onExchange"
		  />
		</van-popup>
		<!-- 颜色尺码start -->
		<div class="colors">
			<div class="title">
				颜色
			</div>
			<div class="btns">
				<span @click="isActive=true;" :class="{active:isActive}">洋红<van-icon class="passed" v-show="isActive" name="success" />
				</span>
				<span @click="isActive=false" :class="{active:!isActive}">驼色<van-icon class="passed" v-show="!isActive" name="success" />
				</span>
			</div>
		</div>
		<div class="rulers">
			<div class="title">
				尺码
			</div>
			<div class="btns">
				<span v-for="(item,index) in rulers" :key="index" @click="isRulers=index" :class="{active:isRulers==index}">
					{{item}}
					<van-icon class="passed" v-show="isRulers==index" name="success" />
				</span>
			</div>
		</div>
		<!-- 颜色尺码end -->
		<div class="address">
			<div class="title">
				配送至
			</div>
			<div class="choose">
				{{address}}<van-icon name="aim" class="aim"/>
			</div>
		</div>
		<!-- address end -->
		<div class="text">
			<van-icon name="passed" class="pass"/><span>唯品会发货</span>
			<van-icon name="passed" class="pass"/><span>7天包退</span>
			<van-icon name="passed" class="pass"/><span>退货返运费</span>
		</div>
		<!-- text end -->
		<div class="store">
			<img :src="detail.brand_logo" alt="">
			<div class="texts">
				<p>{{detail.brand_store_name}}</p>
				<p>{{detail.brand_name}}</p>
			</div>
			<van-icon :name="starClick?'star':'star-o'" class="star"  @click="star"/>
		</div>
		<!-- store end -->
		<img src="../../static/images/icon/ad.png" alt="" class="ad">
		<!-- ad end -->
		<div class="block">
			
		</div>
		<div class="footer">
			<div class="left" @click="$router.push('/shoppingCart')"><van-icon name="cart"/><span v-show="$store.state.community.info" class="bage">{{$store.state.community.info}}</span></div>
			<div class="right" @click="addCart">加入购物车</div>
		</div>
	</div>
</template>
<style lang="less" scoped="">
	#detail{
		width: 100%;
		height: 100%;
		background-color:#fff;
		.block{
			height: 1.5rem;
		}
		.footer{
			position: fixed;
			left: .5rem;
			bottom:0rem;
			right:.5rem;
			height: 1.5rem;
			display: flex;
			align-items:center;
			background-color:#fff;
			.left,.right{
				height: 80%;
				line-height: 1.5rem;
				font-size: .8rem;
				text-align: center;
			}
			.left{
				width: 2rem;
				position:relative;
				.bage{
					width: .8rem;
					height: .8rem;
					position:absolute;
					right: .1rem;
					top:.1rem;
					text-align: center;
					line-height: .8rem;
					border-radius:50%;
					color: #fff;
					z-index: 10;
					font-size: .5rem;
					background-color:#e00;
				}
			}
			.right{
				flex:1;
				background-color:#dd3d97;
				color: #fff;
				font-size: .6rem;
				border-radius:.1rem;
			}
		}
		.ad{
			width: 100%;
			height: auto;
		}
		.store{
			display: flex;
			width: 100%;
			align-items:center;
			padding:.5rem;
			box-sizing:border-box;
			img{
				width: 1.5rem;
				height: auto;
			}
			.texts{
				flex:1;
				p{
					margin: 0;
					padding: 0;
					text-align: left;
					margin-left: .5rem;
					&:first-child{
						font-size: .5rem;
						color: #000;
					}
					&:last-child{
						font-size: .3rem;
						color: #666;
					}
				}
			}
			.star{
				font-size: .6rem;
			}
		}
		.text{
			.pass{
				font-size: .3rem;
				color:#f55;
				margin: .2rem;
			}
			span{
				font-size: .3rem;
				color: #666;
				margin: .2rem;
			}
		}
		.address{
			padding:.3rem .5rem;
			border-top: .5px solid #ccc;
			text-align: left;
			.title{
				font-size: .6rem;
			}
			.choose{
				font-size: .5rem;
				padding:.1rem;
				.aim{
					margin-left: .1rem;
					color:#f55;
				}
			}
		}
		.colors,.rulers{
			padding: .5rem;
			text-align: left;
			.title{
				font-size: .6rem;
			}
			.btns{
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				font-size: .5rem;
				span{
					display: inline-block;
					width: 30%;
					text-align: center;
					margin-top: .2rem;
					padding: .1rem .2rem;
					border: .5px solid #666;
					box-sizing: border-box;
					position: relative;
					.passed{
						position: absolute;
						right: 0;
						bottom: 0;
						font-size: .5rem;
						color: #f55;
						//color: #fff;
					}
					&.active{
						border-color: #f55;
					}
				}
			}
		}
		.swiper{
			width: 100%;
			height: 10rem;
			position: relative;
			.back{
				position: absolute;
				left: .5rem;
				top: .5rem;
				font-size: .5rem;
				line-height: 1rem;
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
				background-color: rgba(80,80,80,.5);
				text-align: center;
				color: #fff;
				}
			.s{
				width: 100%;
				height: 100%;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.info{
			width: 100%;
			padding: .5rem;
			box-sizing: border-box;
			p{
				margin: 0;
				padding: 0;
				&.pinfo{
					color:#000;
					text-align: left;
					font-size: .4rem;
					margin: .3rem 0;
					-webkit-box-orient: vertical;
            		-webkit-line-clamp: 2;
            		overflow: hidden;
            		text-overflow: ellipsis;
            		white-space: normal;
            		display: -webkit-box;
				}
				&.special{
					text-align: left;
					span:first-child{
						font-size: .4rem;
						color: #fff;
						padding: .2rem;
						font-style: italic;
						background: linear-gradient(90deg,#fb4588,#ff6948);
					}
					span:last-child{
						margin-left: -.3rem;
						font-size: .4rem;
						color:#f55;
						padding: .15rem;
						border: .5px solid #f55;
					}
				}
				&:first-child{
					display: flex;
					justify-content: space-between;
					i{
						font-style: normal;
					}
					span:first-child{
						i:first-child{
							font-size: .7rem;
							font-weight: 600;
						}
						i:nth-child(2){
							font-size: .3rem;
							color: #666;
							text-decoration: line-through;
						}
						i:last-child{
							font-size: .4rem;
							color: #fff;
							background-color: #000;
							padding: 0 .2rem;
						}
					}
					.like,.share{
						font-size:.6rem;
					}
				}
			}
		}
	} 	
</style>
<script>
	import { Toast } from 'vant';
	const coupon = {
	  available: 1,
	  discount: 0,
	  denominations: 150,
	  originCondition: 0,
	  reason: '',
	  value: 150,
	  name: '优惠券',
	  startAt: 1489104000,
	  endAt: 1514592000
	};
	export default{
		data(){
			return{
				likeClick:false,
				starClick:false,
				rulers:["XS","S","M","L","XL","XXL"],
				showList:false,
				detail:{},
				chosenCoupon: -1,
      			coupons: [coupon],
      			disabledCoupons: [coupon],
      			isActive:true,
      			isRulers:-1,
      			address:"请选择地址"
			}
		},
		beforeCreate(){
			this.axios.get('./static/goods.json').then((res)=>{
              if( res.status == 200 ) {
                    let Lists = res.data[0].result.products;
                    let path=this.$route.query.goodsId;
                    this.detail=Lists[0];
                    for(var i=0;i<Lists.length;i++){
                    	console.log("product_id",Lists[i].product_id,"path",path);
                    	if(Lists[i].product_id==path){
                    		let de=Object.assign(this.detail,Lists[i]);
                    		this.detail=de;
                    		break;
                    		}
                    	}
                	}
            	});
            },
		 methods: {
		    onChange(index) {
		      this.showList = false;
		      this.chosenCoupon = index;
		    },
		    onExchange(code) {
		      this.coupons.push(coupon);
		    },
		    //设置喜欢的商品存储到store中
		    like(){
		    	let like={
		    		"id":this.detail.product_id,
		    		"des":this.detail.product_name
		    	}
		    	this.$store.state.community.likes.push(like);
		    	this.likeClick=true;
		    },

		    star(){
		    	let star={
		    		"logo":this.detail.brand_logo,
		    		"name":this.detail.brand_store_name
		    	}
		    	this.$store.state.community.stars.push(star);
		    	this.starClick=true;
		    },

		    addCart(){
		    	if(this.isRulers==-1){
		    		Toast('请选择尺码哦亲');
		    	}else{
		    		this.$store.state.community.info+=1;
		    		if(!this.$store.state.community.details[this.detail.sku_id])
		    		{
		    			this.$store.state.community.details[this.detail.sku_id]=[];
		    		}
		    		console.log(this.detail,"detail");
		    		this.$store.state.community.details[this.detail.sku_id].push(this.detail);
		    		console.log(this.$store.state.community.details[this.detail.sku_id],"details");
		    		//this.$router.push("/shoppingCart");
		    	}
		    }
		  }
		}


		
</script>