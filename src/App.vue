<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
		var rootHtml=  document.documentElement;
		var deviceWidth = rootHtml.clientWidth;       
		if(deviceWidth > 640){          
			deviceWidth = 640;        
		}        
		rootHtml.style.fontSize = deviceWidth / 10 + "px";
	}
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
