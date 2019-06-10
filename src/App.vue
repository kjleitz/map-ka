<template>
  <div id="app">
    <MapGrid
      :row-count="rowCount"
      :col-count="colCount"
      :cell-size="20"
      :active-cells="activeCells"
      class="map-grid"
      @cells-selected="activeCells = $event"
    />
    <CellControls
      v-if="showCellControls"
      :cells="activeCells"
      class="cell-controls"
      @cells-deselected="cellsDeselected"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MapGrid from '@/components/MapGrid.vue';
import CellControls from '@/components/CellControls.vue';
import Cell from '@/concerns/models/Cell';

// const between = (val: number, [left, right]: [number, number], rightSideExclusive = true) => {
//   return left <= val && (rightSideExclusive ? val < right : val <= right);
// };

export default Vue.extend({
  name: 'app',

  components: {
    MapGrid,
    CellControls,
  },

  data() {
    return {
      rowCount: 16,
      colCount: 16,
      activeCells: [] as Cell[],
    };
  },

  computed: {
    showCellControls(): boolean {
      return !!this.activeCells.length;
    },
  },

  methods: {
    cellsDeselected(): void {
      this.activeCells = [];
    },
  },
});
</script>

<style lang="sass">
#app, #app *
  box-sizing: border-box

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin: 60px 0 0 60px
  .map-grid
  .cell-controls
    margin-top: 20px
</style>
