<script lang="ts">
  import Icon from '@iconify/svelte';
	import type { Mediator } from "../Mediator";
  import type { Tool } from '../ToolManager';
  import { activeToolType } from "../ToolManager";
	import Pen from "./Pen.svelte";

	export let mediator: Mediator;
  
  const activate = (tool: Tool) => () => {
    mediator.toolManager.activate(tool);
  };
</script>

<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 bg-white border-2 border-zinc-500 p-2 rounded-xl">
  <button
    class={$activeToolType === 'select' ? 'selected' : ''}
    on:click|stopPropagation={activate('select')}
  >
    <Icon icon="lucide:mouse-pointer" width=30 />
  </button>
  <button
    class={$activeToolType === 'pen' ? 'selected' : ''}
    on:click|stopPropagation={activate('pen')}
  >
    <Icon icon="lucide:pen" width=30 />
  </button>
</div>

<Pen />

<style>
  .selected {
    border: 2px solid grey;
  }
</style>