<script lang="ts">
	import { activeToolType, style } from "../ToolManager";

  const setColor = (color: string) => () => {
    style.set(color)
  }
</script>
<div class={`absolute right-5 top-5 z-10 ${$activeToolType !== 'pen' ? 'hidden' : ''}`}>
  <button
    class={`bg-black w-6 h-6 rounded-full ${$style === '#000' ? 'border-zinc-400' : ''} border-2`}
    on:click|stopPropagation={setColor('#000')}
  />
  <button
    class={`bg-green-500 w-6 h-6 rounded-full ${$style === '#22c55e' ? 'border-zinc-400' : ''} border-2`}
    on:click|stopPropagation={setColor('#22c55e')}
  />
</div>