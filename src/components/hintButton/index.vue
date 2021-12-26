<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="title"
    placement="top-start"
    :enterable="false"
  >
     <el-button v-bind="$attrs" v-on="$listeners" size="mini"></el-button>
  </el-tooltip>
</template>

<script>
export default {
    props:['title']
};
</script>