<template>
  <div class="map-grid" :style="gridStyle">
    <div
      v-for="y in rows"
      :key="`row-${y}`"
      :style="rowStyle"
      class="row"
    >
      <div
        v-for="x in columns"
        :key="`row-${y}-col-${x}`"
        :style="columnStyle"
        class="column"
      >
        <div
          :style="boxStyle"
          :class="{ active: x === currentBox.x && y === currentBox.y }"
          class="box"
          tabindex="0"
          @click="onBoxClick({ x, y })"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    rows: {
      type: Number,
      default: 16,
    },

    columns: {
      type: Number,
      default: 16,
    },

    boxSize: {
      type: Number,
      default: 20,
    },
  },

  computed: {
    gridStyle(): Record<string, any> {
      return {
        width: `${this.columns * this.boxSize + 2}px`,
        height: `${this.rows * this.boxSize + 2}px`,
      };
    },

    rowStyle(): Record<string, any> {
      return {
        height: `${this.boxSize}px`,
      };
    },

    columnStyle(): Record<string, any> {
      return {
        width: `${this.boxSize}px`,
      };
    },

    boxStyle(): Record<string, any> {
      return {
        width: `${this.boxSize}px`,
        height: `${this.boxSize}px`,
      };
    },
  },

  data() {
    return {
      currentBox: { x: -1, y: -1 },
    };
  },

  methods: { // x is colNum, y is rowNum
    onBoxClick({ x, y }: { x: number; y: number }): void {
      this.currentBox = { x, y };
    },
  },
});
</script>

<style lang="sass" scoped>
.map-grid
  position: relative
  border: 1px solid rgba(0, 0, 0, 0.125)
  display: flex
  flex-direction: column
  align-items: center
  margin: 0 auto
  cursor: crosshair
  .row
    display: flex
    flex-direction: row
    align-items: center
    .column
      .box
        border: 1px solid rgba(0, 0, 0, 0.125)
        outline: none
        &:hover
          border: 2px solid rgba(0, 100, 255, 0.25)
          transform: scale(1.1)
        &.active, &.active:hover
          border: 2px solid rgba(0, 100, 0, 0.5)
          transform: scale(1.1)
</style>
