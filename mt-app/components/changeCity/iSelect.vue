<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="province in provinces"
        :key="province.value"
        :label="province.label"
        :value="province.value"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!citys.length"
      placeholder="省份"
    >
      <el-option
        v-for="city in citys"
        :key="city.value"
        :label="city.label"
        :value="city.value"
      />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      provinces: [],
      pvalue: '',
      citys: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pvalue (newPvalue) {
      const {
        status,
        data: {
          city
        }
      } = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.citys = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  async mounted() {
    const {
      status,
      data: {
        province
      }
    } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.provinces = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async (query, cb) => {
      if (this.cities.length) {
        cb(this.cities.filter(item => item.value.includes(query)))
      } else {
        const {
          status,
          data: {
            city
          }
        } = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          cb(this.cities.filter(item => item.value.includes(query)))
        } else {
          const cities = []
          cb(cities)
        }
      }
    }),
    handleSelect (item) {
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
