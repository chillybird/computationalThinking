<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  color: #2c3e50;
}
*{
    font-family: Microsoft YaHei;
}
body{
  padding: 0px;
  margin: 0px;
}
ul,li,p{
    padding: 0;
    margin: 0;
}
.main{
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
