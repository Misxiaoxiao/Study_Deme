<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'

export default defineComponent({
  components: {
    ValidateForm,
  },
  setup() {
    const onFormSubmit = (result: boolean) => {
      console.log(result)
    }

    return {
      onFormSubmit,
    }
  },
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
