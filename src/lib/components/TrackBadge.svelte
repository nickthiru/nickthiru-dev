<script lang="ts">
  interface Props {
    track: 'technical' | 'operator';
  }

  let { track }: Props = $props();

  const labels = {
    technical: 'Engineering',
    operator: 'Operating'
  };
</script>

<span class="track-badge {track === 'technical' ? 'track-badge-technical' : 'track-badge-operator'}">
  {labels[track]}
</span>
