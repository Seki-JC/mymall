<template>
    <div class="BackTop">
        <img src="~assets/img/backtop/up.jpg">
    </div>
</template>

<script>
export default {
    name: 'BackTop',
}
</script>

<style>
    .BackTop {
        position: fixed;
        right: 3vw;
        bottom: 58px;
    }
    .BackTop img {
        padding: 1vw;
        background-color: #eee;
        width: 13vw;
        border-radius: 50%;
    }
</style>