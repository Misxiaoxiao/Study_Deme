<template>
  <div class="home">
    <Loading class="loading-text" v-if="loading">
      数据大屏加载中...
    </Loading>
    <container :options="{ width: 3840, height: 2180 }" v-else>
      <div class="header">
        <top-header />
      </div>
      <div class="separator">2222</div>
      <div class="center">
        <div class="left">
          <div class="left1">
            <total-user
              :todayUser="todayUser"
              :growthLastDay="growthLastDay"
              :growthLastMonth="growthLastMonth"
            />
          </div>
          <div class="left2">
            <average-age
              :data="ageData"
              :avgAge="averageAge"
            />
          </div>
          <div class="left3">
            <total-device
              :data="deviceData"
            />
          </div>
          <div class="left4">
            <total-gender
              :data="genderData"
            />
          </div>
          <div class="left5">
            <total-rider
              :data="riderData"
            />
          </div>
          <div class="left6">
            <hot-category :data="hotCategoryData" />
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            <center-header :data="headerData" />
          </div>
          <div class="right-top2">
            <transform-category :data="['all', '北京', '上海', '深圳', '杭州', '南京', '武汉']" />
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                <jiangsu-map-warning />
              </div>
              <div class="right-left2">
                <transform-category :data="['订单量', '销售额', '用户数', '退单量']" :color="['rgb(178, 209, 126)', 'rgb(116, 116, 49)']" />
              </div>
              <div class="right-left3"></div>
              <div class="right-left4"></div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                <sales-list :data="salesListData" />
              </div>
              <div class="right-right2"></div>
            </div>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import useScreenData from '../hooks/useScreenData'
import TopHeader from '../components/TopHeader'
import TotalUser from '../components/TotalUser'
import AverageAge from '../components/AverageAge'
import TotalDevice from '../components/TotalDevice'
import TotalGender from '../components/TotalGender'
import TotalRider from '../components/TotalRider'
import HotCategory from '../components/HotCategory'
import CenterHeader from '../components/CenterHeader'
import TransformCategory from '../components/TransformCategory'
import SalesList from '../components/SalesList'
import JiangsuMapWarning from '../components/JiangsuMapWarning'

export default {
  name: 'Home',
  components: { TopHeader, TotalUser, AverageAge, TotalDevice, TotalGender, TotalRider, HotCategory, CenterHeader, TransformCategory, SalesList, JiangsuMapWarning },
  setup () {
    const loading = ref(true)

    onMounted(() => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })

    const screenData = useScreenData()

    return {
      loading,
      ...screenData
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgb(29, 29, 29);
  color: #fff;
  font-size: 48px;
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .header {
      width: 100%;
      height: 167px;
    }
    .separator {
      width: 100%;
      height: 10px;
      background: rgb(92, 88, 89);
    }
    .center {
      width: 100%;
      flex: 1;
      display: flex;
      .left {
        flex: 0 0 860px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 860px;
        height: 100%;
        padding-bottom: 20px;
        box-sizing: border-box;
        .left1 {
          height: 300px;
        }
        .left2 {
          height: 320px;
        }
        .left3 {
          height: 280px;
        }
        .left4 {
          height: 230px;
        }
        .left5 {
          height: 360px;
        }
        .left6 {
          height: 360px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .right-top1 {
          width: 100%;
          height: 206px;
        }
        .right-top2 {
          width: 100%;
          height: 48;
          margin: 10px 0;
        }
        .right-bottom {
          flex: 1;
          display: flex;
          padding-bottom: 20px;
          .right-left {
            flex: 0 0 1917px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 1917px;
            .right-left1 {
              height: 999px;
            }
            .right-left2 {
              height: 80px;
            }
            .right-left3 {
              height: 350px;
            }
            .right-left4 {
              height: 220px;
            }
          }
          .right-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
            margin-right: 10px;
            .right-right1 {
              width: 100%;
              height: 999px;
            }
            .right-right2 {
              margin-top: 20px;
              width: 100%;
              height: 650px;
            }
          }
        }
      }
    }
  }
}
.loading-content {
  font-size: 20px;
}
</style>
