<!--
 * @Date: 2020-05-27 17:53:35
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-04 14:00:25
 * @FilePath: \d2-admin\src\components\imagecell\index.vue
-->
<template>

  <el-image :src="src" style="width: 100px; height: 100px" fit="contain" :preview-src-list="[src]"></el-image>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        require: true
      }
    },
   computed: {
     src() {
       return process.env.VUE_APP_IMAGE + this.value
     }
   }
  }
</script>
