<template>
  <div>
    <common-card
      title="累计销售额"
      value="￥ 32,039,165"
    >
      <template>
        <div class="compare"></div>
      </template>
      <template v-slot:footer>
        <div>
          <span>昨日销售额</span>
          <span class="money">￥ 30,000,000</span>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from '../../mixins/commonCardMixin'

export default {
  mixins: [commonCardMixin]
}
</script>

<style lang="scss" scoped>
  .compare {
    height: 100%;
  }
  .money {
    color: #333;
    font-weight: 700;
    margin-left: 5px;
  }
</style>
