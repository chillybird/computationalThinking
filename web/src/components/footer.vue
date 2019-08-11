<template>
<div id="footer">
    <p>{{ msg }}</p>
</div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            msg: '仅供参考'
        }
    }
}
</script>

<style>
    #footer{
        margin-top: 30px;
    }
</style>