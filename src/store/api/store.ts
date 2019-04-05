import axios from 'axios'
import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import store from '@/store/'; // デコレータでstoreを指定するためimportする必要あり

const API = 'http://localhost:9999/storeDetail'

type IupdateStoreDetail = {
  storeName: string
  description: string
}

// state's interface
export interface IStoreDetailState {
  storeDetail: any;
}
@Module({ dynamic: true, store, name: 'Store', namespaced: true })
class Store extends VuexModule implements IStoreDetailState {
  // state
  public storeDetail: any = {};

  // mutation
  @Mutation
  public SET_STORE_DETAIL(data: any) {
    this.storeDetail = data;
  }

  // actions
  @Action({})
  public async fetchStoreDetail() {
    try {
      const res = await axios.get(API)
      console.log(res.data)
      this.SET_STORE_DETAIL(res.data);
      return Promise.resolve(res.data)
    } catch (e) {
      throw e
    }
  }
  @Action({})
  public async updateStoreDetail({storeName, description}: IupdateStoreDetail) {
    try {
      const res = await axios.put(API, {
        storeName,
        description,
      })
      console.log(res)
      await this.fetchStoreDetail();
      return Promise.resolve(res.data)
    } catch (e) {
      throw e
    }
  }
}

export const storeModule = getModule(Store);
