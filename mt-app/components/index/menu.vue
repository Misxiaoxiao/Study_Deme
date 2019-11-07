<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in menu"
        :key="index"
        @mouseenter="enter"
      >
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div
      v-if="kind && currentDetail"
      class="detail"
      @mousemove="sover"
      @mouseleave="sout"
    >
      <template v-for="(item, index) in currentDetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜点', '饮品', '火锅', '自助餐', '小吃快餐']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              child: ['美团外卖']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店星级',
              child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentDetail () {
      return this.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave () {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    enter (e) {
      this.kind = e.target.querySelector('i').className
    },
    sover () {
      clearTimeout(this._timer)
    },
    sout () {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss">
</style>
