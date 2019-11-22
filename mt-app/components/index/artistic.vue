<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        v-for="tab in tabs"
        :key="tab.tab"
        :class="{active: kind === tab.tab}"
        :kind="tab.tab"
        :keyword="tab.tab"
      >
        {{ tab.text }}
      </dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never"
        >
          <img :src="item.imgUrl" class="image">
          <ul class="cbody">
            <li class="title">
              {{ item.title }}
            </li>
            <li class="pos">
              <span
                v-for="(tag, i) in item.tags"
                v-show="i < 4"
                :key="i"
              >{{ tag.tag }}</span>
            </li>
            <li class="price">
              ￥<em>{{ item.currentPrice }}</em><span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      kind: 'all',
      tabs: [],
      cur: [],
      list: {
      }
    }
  },
  // computed: {
  //   cur () {
  //     return this.list[this.kind]
  //   }
  // },
  async mounted () {
    const {
      status,
      data: {
        data
      }
    } = await this.$axios.get('/search/getScenesList', {
      params: {
        tab: 'all'
      }
    })

    if (status === 200) {
      this.tabs = data.tabs
      this.cur = data.data
    }
  },
  methods: {
    async over (e) {
      const dom = e.target
      const tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        const keyword = dom.getAttribute('keyword')
        const {
          status,
          data: {
            data
          }
        } = await this.$axios.get('/search/getScenesList', {
          params: {
            tab: keyword
          }
        })
        if (status === 200 && data.data.length > 0) {
          this.tabs = data.tabs
          this.cur = data.data
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/artistic.scss";
</style>
