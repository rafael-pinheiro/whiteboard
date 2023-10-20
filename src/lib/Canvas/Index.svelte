<script lang="ts">
	import { onMount } from "svelte";
	import { Mediator } from "./Mediator";
	import { activeToolType } from "./ToolManager";
	import Toolbar from "./UIOverlay/Toolbar.svelte";

  let mediator: Mediator;

  const createMediator = (wrapper: HTMLDivElement) => {
    mediator = new Mediator(wrapper);
    
    return {
      destroy: mediator.destroy
    };
  }
  
  
</script>
<div
  class={`relative h-full w-full`}
  use:createMediator
>
  <canvas id="main" class="relative -z-50" />
  <canvas id="ui" class="absolute top-0 left-0 -z-40"/>
  <canvas id="cursor" class="absolute top-0 left-0 -z-30"/>
</div>
{#if mediator}
  <Toolbar mediator={mediator} />
  
{/if}