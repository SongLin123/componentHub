<!--
 * @Date: 2020-05-26 16:01:36
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-01 13:44:14
 * @FilePath: \d2-admin\src\components\imagecard\index.vue
-->
<template>
  <el-upload class="avatar-uploader" action="/" :auto-upload="true" :show-file-list="false" ref="el"
    :http-request="handleUpload" :before-upload="beforeAvatarUpload">
    <img v-if="value" :src="src" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
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
    },
    data() {
      return {
        file: null
      }
    },
    mounted() {
      // fix 无标题的仍然有左边距
      this.$refs.el.$el.parentNode.style.marginLeft = '0'
    },
    methods: {
      async handleUpload(par) {
        const formData = new FormData()
        formData.append('file', par.file)
        // 上传文件
        const res = await this.$api.UTILITY_FILE_UPLOADPIC(formData)
        this.$emit('input', res.data)
      },
      beforeAvatarUpload(file) {
        const isJPGPNG = (file.type === 'image/jpeg' || 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPGPNG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPGPNG && isLt2M
      }
    }
  }
</script>
<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
