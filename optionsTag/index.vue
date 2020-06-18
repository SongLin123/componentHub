<!--
 * @Date: 2020-05-27 16:32:32
 * @LastEditors: songlin
 * @LastEditTime: 2020-05-28 18:19:02
 * @FilePath: \d2-admin\src\views\staff\allPeople\components\optionsTag.vue
-->
<template>
  <div>
    <el-tag type="success" >{{ text }}</el-tag>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number],
        require: true
      },
      options: {
        type: Array
      }
    },
    computed: {
      text() {
        // eslint-disable-next-line
        return (this.options.find(item => item.value == this.value)||{label:''}).label
      }
    }

  }
</script>
