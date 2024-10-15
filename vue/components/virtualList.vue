<template>
    <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent()">

        <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>

        <div class="infinite-list" :style="{ transform: getTransform }">
            <div class="infinite-list-item" v-for="item in visibleData" :key="item.id"
                :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }">
                {{ item.value }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
const props = defineProps({
    listData: [],
    // 每个item的高度
    itemSize: {
        type: Number,
        default: 50
    }
})

const state = reactive({
    screenHeight: 0,   // 可视区域的高度
    startOffset: 0,    // 偏移量
    start: 0,          // 起始数据下标
    end: 0             // 结束数据下标
})

// 可视区域显示的数据条数
const visibleCount = computed(() => {
    return state.screenHeight / props.itemSize
})

// 可视区域显示的真实数据
const visibleData = computed(() => {
    return props.listData.slice(state.start, Math.min(props.listData.length, state.end))
})

// 当前列表总高度
const listHeight = computed(() => {
    return props.listData.length * props.itemSize
})

// list跟着父容器移动了，现在列表要移回来
const getTransform = computed(() => {
    return `translateY(${state.startOffset}px)`
})


// 获取可视区域的高度
const listRef = ref(null)
onMounted(() => {
    state.screenHeight = listRef.value.clientHeight
    state.end = state.start + visibleCount.value
})


const scrollEvent = () => {
    let scrollTop = listRef.value.scrollTop
    state.start = Math.floor(scrollTop / props.itemSize)
    state.end = state.start + visibleCount.value
    state.startOffset = scrollTop - (scrollTop % props.itemSize)
}

</script>

<style lang="css" scoped>
.infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    /* 启用触摸滚动 */
}

.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
    /* 置于背景层 **/
}

.infinite-list {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    text-align: center;
}

.infinite-list-item {
    border-bottom: 1px, solid, #000;
    box-sizing: border-box;
}
</style>
