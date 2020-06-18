<template>
  <div class="tree_node_content" :style="{width:treeWidth+'px'}">
    <tree-header v-bind="$attrs" v-on="$listeners"></tree-header>
    <slot name="fixed"></slot>
    <my-tree v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </my-tree>
  </div>
</template>
<script>
import treeHeader from './components/treeHeader'
import myTree from './components/myTree'
export default {
  components: { treeHeader, myTree },
  props: {
    // content 宽度
    treeWidth: {
      type: Number,
      default: 312
    }
  },
  data() {
    return {}
  },
  methods: {
    count(data) {
      return (
        data.count ||
        data.children.reduce((acc, cur) => (acc += cur.deviceCount), 0)
      )
    }
  }
}
</script>
<style lang="scss">
@import "~@/components/treeNode/css/treeNode.scss";
</style>
