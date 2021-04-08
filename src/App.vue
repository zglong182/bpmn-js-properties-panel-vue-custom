<template>
  <div id="app">
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/viewer">viewer</router-link> |-->
<!--    <router-link to="/modeler">modeler</router-link> |-->
<!--    <router-link to="/panel">panel</router-link> |-->
<!--    <router-link to="/custom">custom</router-link> |-->
<!--    <router-link to="/example">example</router-link>-->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #2c3e50;
}
</style>
