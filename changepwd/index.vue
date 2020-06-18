<!--
 * @Date: 2020-05-28 10:51:23
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-17 19:06:16
 * @FilePath: \senseIDC-fe\src\components\changepwd\index.vue
-->
<template>

  <el-dialog title="修改密码" :close-on-click-modal="false" :show-close="false" :visible.sync="visible"
    :destroy-on-close="true">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="原密码">
        <el-input v-model="form.originalPassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="repeat">
        <el-input v-model="form.repeat" type="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="beforeClose">取 消</el-button>
      <el-button type="primary" @click="up">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isBoolean } from 'lodash'
  export default {
    props: {
      uuid: {
        type: String,
        require: true
      }
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.originalPassword !== '') {
            this.$refs.ruleForm.validateField('repeat')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          repeat: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        form: {
          repeat: '',
          originalPassword: '',
          password: ''
        }
      }
    },
    computed: {
      visible() {
        return !!this.uuid
      }
    },
    methods: {
      beforeClose() {
        this.form = {
          repeat: '',
          originalPassword: '',
          password: ''
        }
        this.$emit('update:uuid', '')
      },
      async up() {
        await this.$refs.ruleForm.validate()
        const form = {
          originalPassword: this.form.originalPassword,
          password: this.form.password
        }
      !isBoolean(this.uuid) && (form.uuid = this.uuid)
        await this.$api.SYS_USER_UPDATEUSERPWD(form)
        this.beforeClose()
      }

    }
  }
</script>
