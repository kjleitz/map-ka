<template>
  <div
    :style="{ ...genericCellStyle, ...cellStyle }"
    :class="{ active }"
    class="map-cell"
    tabindex="0"
    v-on="$listeners"
  >
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Cell from '@/concerns/models/Cell';

export default Vue.extend({
  props: {
    size: {
      type: Number,
      default: 20,
    },

    active: {
      type: Boolean,
      default: false,
    },

    cell: {
      required: true,
      type: Object as PropType<Cell>,
    },
  },

  computed: {
    genericCellStyle(): Record<string, any> {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },

    cellStyle(): Record<string, any> {
      const { background } = this.cell.content;
      const backgroundImage = background.image ? `url('${encodeURI(background.image.replace(/^url\(['"]/, '').replace(/\)$/, ''))}')` : '';
      const backgroundColor = background.color ? background.color.replace(/^#*/, '#') : '';
      const backgroundStyle = !background ? {} : {
        backgroundImage,
        backgroundColor,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
      return {
        ...backgroundStyle,
      };
    },
  },
});
</script>

<style lang="sass" scoped>
.map-cell
  border: 1px solid rgba(0, 0, 0, 0.125)
  outline: none
  user-select: none
  &:hover
    border: 2px solid rgba(0, 100, 255, 0.25)
    transform: scale(1.1)
  &.active, &.active:hover
    border: 2px solid rgba(0, 100, 0, 0.5)
    transform: scale(1.1)
</style>
