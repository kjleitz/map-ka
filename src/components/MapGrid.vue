<template>
  <div class="map-grid" :style="gridStyle">
    <div
      v-for="(row, y) in cells"
      :key="`row-${y}`"
      :style="rowStyle"
      class="row"
    >
      <div
        v-for="(column, x) in cells[y]"
        :key="`row-${y}-col-${x}`"
        :style="columnStyle"
        class="column"
      >
        <MapCell
          :size="cellSize"
          :cell="cellAt({ x, y })"
          :active="cellIsActive({ x, y })"
          @mousedown="cellMouseDown({ x, y })"
          @mouseenter="cellMouseEntered($event, { x, y })"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'underscore';
import Vue, { PropType } from 'vue';
import MapCell from '@/components/MapCell.vue';
import Cell from '@/concerns/models/Cell';

type CellCoords = Pick<Cell, 'x'|'y'>;

export default Vue.extend({
  components: {
    MapCell,
  },

  props: {
    rowCount: {
      type: Number,
      default: 16,
    },

    colCount: {
      type: Number,
      default: 16,
    },

    cellSize: {
      type: Number,
      default: 20,
    },

    activeCells: {
      type: Array as PropType<Cell[]>,
      default: () => [],
    },
  },

  computed: {
    gridStyle(): Record<string, any> {
      return {
        width: `${this.colCount * this.cellSize + 2}px`,
        height: `${this.rowCount * this.cellSize + 2}px`,
      };
    },

    rowStyle(): Record<string, any> {
      return {
        height: `${this.cellSize}px`,
      };
    },

    columnStyle(): Record<string, any> {
      return {
        width: `${this.cellSize}px`,
      };
    },
  },

  data() {
    return {
      cells: _.range(this.rowCount).map(y => _.range(this.colCount).map(x => new Cell(x, y))),
    };
  },

  methods: {
    cellAt({ x, y }: CellCoords): Cell {
      return this.cells[y][x];
    },

    cellIsActive({ x, y }: CellCoords): boolean {
      return this.activeCells.some(cell => cell.x === x && cell.y === y);
    },

    cellMouseDown({ x, y }: CellCoords): void {
      this.$emit('cells-selected', [this.cellAt({ x, y })]);
    },

    cellMouseEntered(event: MouseEvent, { x, y }: CellCoords): void {
      // checking whether the primary mouse button (normal left click) is being
      // clicked while the cursor enters the cell
      if (event.buttons !== 1) return;

      // if it's already active, don't worry about it
      if (this.cellIsActive({ x, y })) return;

      this.$emit('cells-selected', [...this.activeCells, this.cellAt({ x, y })]);
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
  cursor: crosshair
  .row
    display: flex
    flex-direction: row
    align-items: center
</style>
