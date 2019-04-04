<template>
  <div class="Counter">
    <div>{{'Counter'}}</div>
    <div>incrementCounter: {{incrementCounter}}</div>
    <div>decrementCounter: {{decrementCounter}}</div>

    <button @click="increment">increment</button>
    <button @click="increment100">increment100</button>
    <button @click="decrement">decrement</button>
    <button @click="decrement100">decrement100</button>
    <button @click="resetCounter">resetCounter</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { counterModule } from "@/store/page/Counter"; // モジュールクラスをインポート

import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  get incrementCounter() {
    return counterModule.incrementCounter; // インテリセンスが効く
  }
  get decrementCounter() {
    return counterModule.decrementCounter; // インテリセンスが
  }
  increment() {
    counterModule.SET_INCREMENT_COUNTER(counterModule.incrementCounter + 1); // 型チェックが効く
  }
  decrement() {
    counterModule.SET_DECREMENT_COUNTER(counterModule.decrementCounter - 1); // 型チェック
  }
  increment100() {
    counterModule.increment100(); // インテリセンスが効く
  }
  decrement100() {
    counterModule.decrement100(); // インテリセンスが
  }
  resetCounter() {
    counterModule.resetCounter();
  }
}
</script>
