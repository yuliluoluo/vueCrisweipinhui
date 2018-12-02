<template>
	<!-- header -->
	<div class="catogry">
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
		<div class="menu">
			<div class="left-menu">
				<ul>
					<li v-for="(item,index) in leftList" :key="index" @click="changeIndex(index)" :class="{'isActive':isActive===index}">
						{{item.name}}
					</li>
				</ul>
			</div>
			<div class="right-menu">
				<div class="small-banner" v-show="rightList.image"><img :src="rightList.image" alt=""></div>
				<div class="right-list" v-for="(item,index) in rightList.children" >
					<div class="title">{{item.name}}</div>
					<div class="small-list">
						<ul>
							<li v-for="(i,key) in item.children" @click="$router.push('/goods?title='+i.name)">
								<img :src="i.image" alt="">
								<p>{{i.name}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.catogry{
		.menu{
			width: 100%;
			overflow: hidden;
			.right-menu{
				width: 7rem;
				float: right;
				height: 18rem;
				overflow: hidden;
				overflow-y: auto;
				padding-top: .5rem;
				.small-banner{
					img{
					margin: 0 auto;
					width: 6.5rem;
					height: 3rem;
					}
				}
				.title{
					font-size: .3rem;
					font-weight: 600;
					text-align: left;
				}
				.small-list{
					height: 100%;
					overflow:hidden;
					ul{
						height: 100%;
						list-style: none;
						li{
							float:left;
							width: 1.8rem;
							height: 1.8rem;
							padding: .2rem;
							font-size: .4rem;
							img{
								width: 70%;
								height: 70%;
							}
							p{
								margin: 0;
								padding: 0;
							}
						}
					}
				}
			}
			.left-menu{
				width: 2.3rem;
				float:left;
				height: 18rem;
				overflow: hidden;
				ul{
					width: 2.8rem;
					height: 100%;
					overflow-y: auto;
					list-style: none;
					li{
						//border-left: 15px solid transparent;
						font-size: .4rem;
						padding: 10px 0;
						text-align: center;
						width: 2.3rem;
						//margin-left: -.3rem;
						box-sizing: border-box;
						background-color: rgba(200,200,200,.2);
					}
					.isActive{
						//border-left-color: pink;
						background-color: #fff;
						color:#e55;
					}
				}
			}
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
        		border:none;
        		font-size: .4rem;
        		padding: .1rem .2rem;
        	}
        }
	}
</style>
<script>
	export default{
		/*注意，created的时候可以加载数据，但是dom还没有渲染好的*/
		created(){
			this.axios.get('./static/leftCatogry.json').then((res)=>{
	          	if( res.status == 200 ) {
	            	    this.leftList = res.data.data.cate_lv1;
	               // this.broadcast = data.broadcast;
	              //  console.log(res.data.home.active,this.days,this.activeTitle)
	           	}
         	});
         	
		},
		mounted(){
			console.log(this.$route.params.id,"mounted");
         	//this.changeIndex(this.$route.params.id);
         	let temp=parseInt(this.$route.params.id);
         	this.changeIndex(temp);
         },
	data(){
		return {
			type:[true,false],
			leftList:[],
			rightList:{},
			isActive:0
		}
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
		changeIndex(index){
			this.isActive=index;
			console.log(this.isActive,"isActive");
			let rightJson="right"+index%3;
			this.axios.get('./static/'+rightJson+'.json').then((res)=>{
	          	if( res.status == 200 ) {
	            	    this.rightList = res.data.data.current_node;
	               // this.broadcast = data.broadcast;
	              //  console.log(res.data.home.active,this.days,this.activeTitle)
	           	}
         	});
		}
	}
}
</script>