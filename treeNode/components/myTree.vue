<template>
  <div>
    <tree-dialog v-bind="$attrs" v-on="$listeners" ref="treeDialog">
      <template #treeDialogContent>
        <slot></slot>
      </template>
    </tree-dialog>
    <div>
      <el-input
        class="tree_input"
        v-if="isInputShow && !clearTreeOps"
        :placeholder="inputPlaceholder"
        v-model="filterText"
      >
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div
        :class="['all_text',activeAllTitle ? 'active':'']"
        @click.stop="handelAllText"
        v-if="!clearTreeOps"
      >
        <span>
          {{allText}}
          <span class="num_style">{{!allNum ? "": allNum}}</span>
        </span>
        <el-popover placement="bottom" trigger="manual" v-model="visible">
          <div class="handle_btn">
            <el-button
              type="text"
              icon="el-icon-circle-plus-outline"
              @click="()=>{append(false)}"
            >添加</el-button>
            <!-- <el-button type="text" icon="el-icon-edit" @click="edit">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" @click="remove">删除</el-button>-->
          </div>
          <i
            class="el-icon-circle-plus-outline handle_icon"
            slot="reference"
            @click.stop="visibleHandel"
          ></i>
        </el-popover>
      </div>
    </div>
    <div class="tree_content">
      <el-tree
        v-if="limitTree"
        :data="treeData"
        :accordion="isAccordion"
        :filter-node-method="filterNode"
        :show-checkbox="isTreeCheckbox"
        @node-click="handelNodeClick"
        @check="handelCheck"
        node-key="groupName"
        ref="tree"
      >
        <template slot-scope="{ node, data }">
          <span
            class="custom-tree-node"
            draggable
            @dragstart="handleDragStart(node,data)"
            @dragend="handleDragEnd(node,data)"
            style="line-height: 30px;"
          >
            <span>{{ data.groupName }}</span>
            <span style="margin-right:10px" v-if="!clearTreeOps">
              <span class="part_num" v-if="data.outLineDeviceCount">{{data.outLineDeviceCount}}/</span>
              <span class="all_num" v-if="data.allDeviceCount">{{data.allDeviceCount}}</span>
            </span>
            <el-popover placement="bottom" trigger="manual" :value="showPopoverId == node.id">
              <div class="handle_btn">
                <el-button
                  v-if="data.groupName && data.level!==limitTree"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="() => append(data)"
                >添加</el-button>
                <el-button
                  v-if="data.groupName && data.level!==limitTree"
                  type="text"
                  icon="el-icon-edit"
                  @click="() => edit(data)"
                >编辑</el-button>
                <el-button
                  v-if="!data.children"
                  type="text"
                  icon="el-icon-delete"
                  @click="() => remove(node, data)"
                >删除</el-button>
              </div>
              <i
                v-if="!clearTreeOps"
                style="line-height: 30px;"
                class="el-icon-circle-plus-outline handle_icon"
                slot="reference"
                :data-id="node.id"
                @click.stop="($event)=>{showPopover($event,node,data)}"
              ></i>
            </el-popover>
          </span>
        </template>
      </el-tree>
      <el-tree
        v-if="infiniteTree && !limitTree"
        :data="treeData"
        :accordion="isAccordion"
        :filter-node-method="filterNode"
        node-key="groupName"
        @node-click="handelNodeClick"
        @check="handelCheck"
        :show-checkbox="isTreeCheckbox"
        ref="tree"
      >
        <template slot-scope="{ node, data }">
          <span
            class="custom-tree-node"
            draggable
            @dragstart="handleDragStart(node,data)"
            @dragend="handleDragEnd(node,data)"
            style="line-height: 30px;"
          >
            <span>{{ data.groupName }}</span>
            <span style="margin-right:10px" v-if="!clearTreeOps">
              <span class="part_num" v-if="data.partNum">{{data.partNum}}/</span>
              <span class="all_num">{{data.allNum}}</span>
            </span>
            <!-- <el-popover placement="bottom" trigger="manual" :value="showPopoverId == node.id">
              <div class="handle_btn">
                <el-button
                  v-if="(data.handelShow === undefined ? data.handelShow = ['add','edit','remove']:data.handelShow) && findMode(data.handelShow,'add')"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="() => append(data)"
                >添加</el-button>
                <el-button
                  v-if="(data.handelShow === undefined ? data.handelShow = ['add','edit','remove']:data.handelShow) && findMode(data.handelShow,'edit')"
                  type="text"
                  icon="el-icon-edit"
                  @click="() => edit(data)"
                >编辑</el-button>
                <el-button
                  v-if="(data.handelShow === undefined ? data.handelShow = ['add','edit','remove']:data.handelShow) && findMode(data.handelShow,'remove')"
                  type="text"
                  icon="el-icon-delete"
                  @click="() => remove(node, data)"
                >删除</el-button>
              </div>
              <i
                v-if="data.children"
                class="el-icon-circle-plus-outline handle_icon"
                slot="reference"
                :data-id="node.id"
                @click.stop="($event)=>{showPopover($event,node,data)}"
              ></i>
            </el-popover>-->
            <el-popover placement="bottom" trigger="manual" :value="showPopoverId == node.id">
              <div class="handle_btn">
                <el-button
                  v-if="data.groupName"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="() => append(data)"
                >添加</el-button>
                <el-button
                  v-if="data.groupName"
                  type="text"
                  icon="el-icon-edit"
                  @click="() => edit(data)"
                >编辑</el-button>
                <el-button
                  v-if="!data.children"
                  type="text"
                  icon="el-icon-delete"
                  @click="() => remove(node, data)"
                >删除</el-button>
              </div>
              <i
                v-if="data.groupName && !clearTreeOps"
                style="line-height: 30px;"
                class="el-icon-circle-plus-outline handle_icon"
                slot="reference"
                :data-id="node.id"
                @click.stop="($event)=>{showPopover($event,node,data)}"
              ></i>
            </el-popover>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import treeDialog from './treeDialog'
import handelClick from '../mixins/handelClick'
export default {
  components: {
    treeDialog
  },
  mixins: [handelClick],
  props: {
    // 全部层级文字
    allText: {
      type: String,
      default: '全部设备'
    },
    // 全部层级数字
    allNum: {
      type: [String, Number],
      default: 0
    },
    // input 是否显示
    isInputShow: {
      type: Boolean,
      default: false
    },
    // input placeholder文字
    inputPlaceholder: {
      type: String,
      default: '请输入'
    },
    // 清空树组件文字、数字、操作按钮等配置
    clearTreeOps: {
      type: Boolean,
      default: false
    },
    // 是否展示树的多选框
    isTreeCheckbox: {
      type: Boolean,
      default: false
    },
    // 无限层级树
    infiniteTree: {
      type: Boolean,
      default: true
    },
    // 限定层级树
    limitTree: {
      type: [Number, Boolean],
      default: false
    },
    // 树组件源数据
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否一次只打开一层
    isAccordion: {
      type: Boolean,
      default: true
    },
    // 树组件拖拽
    idDraggable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterText: ''
    }
  },
  methods: {
    // 操作栏按钮区域展示
    visibleHandel() {
      this.visible = !this.visible
    },
    handelAllText() {
      this.activeAllTitle = true
      this.showPopoverId && (this.showPopoverId = '')
      this.$emit('handelAllTitle', '点击了全部')
    },
    // 树组件拖拽
    // 拖拽开始
    handleDragStart(node, data, ev) {
      this.$emit('dragStart', { node, data })
      console.log('drag start', node)
    },
    // 拖拽结束
    handleDragEnd(node, data, ev) {
      this.$emit('dragEnd', { node, data })
    },

    // 不需要拖拽移动节点功能
    allowDrop() {
      return false
    },
    // 树过滤
    filterNode(value, data) {
      if (!value) return true
      return data.groupName.indexOf(value) !== -1
    },
    // 操作栏图标是否展示
    findMode(val, mode) {
      return val.find(v => v === mode)
    },
    // popover展示
    showPopover(e, node, data) {
      console.log(e.target.dataset.id)
      if (this.showPopoverId === e.target.dataset.id) {
        this.showPopoverId = ''
        return
      }
      this.showPopoverId = e.target.dataset.id
    },

    append(data) {
      this.$refs.treeDialog.append(data)
    },
    edit(data) {
      this.$refs.treeDialog.edit(data)
    },
    remove(node, data) {
      this.$refs.treeDialog.remove(node, data)
    },
    // 树节点点击
    handelNodeClick(data, node, tree) {
      this.$emit('treeClick', { node, data })
      this.activeAllTitle && (this.activeAllTitle = false)
      this.visible && (this.visible = false)
      this.showPopoverId && (this.showPopoverId = '')
    },
    // 点击复选框事件
    handelCheck(node, data) {
      this.$emit('treeCheck', { node, data })
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>
