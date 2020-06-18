<!--
 * @Date: 2020-05-27 16:32:32
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-02 18:45:51
 * @FilePath: \d2-admin\src\components\tagGroup\index.vue
-->
<template>
  <div>
    <el-tag
    class="d2-mr"
    @click="clickcb(item,scope.row)"
    style="cursor: pointer;" v-for="item in value" :key="item" type="success">{{options? find(item):item }}</el-tag>
  </div>
</template>

<script>
  export default {

    props: {
      value: {
        type: Array,
        require: true
      },
      options: {
        type: Array
      },
      scope: {
        default: null
      },
      clickcb: {
        type: Function
      }

    },
    methods: {
      find(value) {
        const finder = this.options.find(item => item.value === value) || { label: value }
        return finder.label
      }
    }

  }
</script>
