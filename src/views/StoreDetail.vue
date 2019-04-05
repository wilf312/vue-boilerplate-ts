<template>
  <div class="Counter">
    <h1>店舗情報 編集</h1>
    <p>店舗名 </p>
    <p v-if="storeNameValid">エラー {{storeNameValid}}</p>
    <div><input :value="storeName" @input="updateStoreName"></div>

    <p>店舗紹介</p>
    <p v-if="descriptionValid">エラー {{descriptionValid}}</p>
    <div><input :value="description" @input="updateDescription"></div>

    <button :disabled="storeNameValid || descriptionValid" @click="submit">送信</button>
    <p>{{storeDetail}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { storeModule } from '@/store/api/store' // モジュールクラスをインポート
import { storeDetailModule } from '@/store/page/StoreDetail' // モジュールクラスをインポート

console.log(storeDetailModule)
@Component({})
export default class StoreDetail extends Vue {
  get storeName() {
    return storeDetailModule.edit.storeName;
  }
  get description() {
    return storeDetailModule.edit.description;
  }
  get storeNameValid() {
    return storeDetailModule.storeNameValid;
  }
  get descriptionValid() {
    return storeDetailModule.descriptionValid;
  }

  get storeDetail() {
    return storeDetailModule.origin;
  }

  mounted() {
    storeDetailModule.pageInit()
  }

  private updateStoreName(e: any) {
    storeDetailModule.SET_STORE_NAME(e.target.value)
  }
  private updateDescription(e: any) {
    storeDetailModule.SET_DESCRIPTION(e.target.value)
  }

  private submit() {
    console.log('submit')
    storeDetailModule.updateStoreDetail()
  }
}
</script>


<style>

input {
  width: 100%;
}

</style>
