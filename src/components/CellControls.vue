<template>
  <div class="cell-controls">
    <div class="desc-row">
      <em v-if="singleCell">
        row #{{ firstCell.y + 1 }}, column #{{ firstCell.x + 1 }}
      </em>
      <em v-else>
        [multiple cells selected]
      </em>
      <button
        class="deselect-cells-button"
        @click="$emit('cells-deselected')"
      >
        deselect cell{{ singleCell ? '' : 's' }}
      </button>
    </div>
    <label>
      background color:
      <input v-model="backgroundColor" type="color">
    </label>
    <br>
    <label>
      background image URL:
      <input v-model="backgroundImageUrl" type="text">
    </label>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Cell from '@/concerns/models/Cell';

export default Vue.extend({
  props: {
    cells: {
      required: true,
      type: Array as PropType<Cell[]>,
    },
  },

  data() {
    return {
      backgroundColor: this.cells.length === 1 ? this.cells[0].content.background.color : '',
      backgroundImageUrl: this.cells.length === 1 ? this.cells[0].content.background.image : '',
    };
  },

  computed: {
    singleCell(): boolean {
      return this.cells.length === 1;
    },

    multiCell(): boolean {
      return this.cells.length > 1;
    },

    firstCell(): Cell {
      return this.cells[0];
    },
  },

  watch: {
    backgroundColor(newVal, oldVal): void {
      if (newVal === oldVal) return;
      this.cells.forEach((cell) => { cell.content.background.color = newVal; }); // eslint-disable-line no-param-reassign
    },

    backgroundImageUrl(newVal, oldVal): void {
      if (newVal === oldVal) return;
      this.cells.forEach((cell) => { cell.content.background.image = newVal; }); // eslint-disable-line no-param-reassign
    },
  },
});
</script>

<style lang="sass" scoped>
.cell-controls
  .desc-row
    padding-bottom: 1em
    .deselect-cells-button
      margin-left: 2em
</style>
