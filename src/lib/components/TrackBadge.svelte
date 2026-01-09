<script lang="ts">
  interface Props {
    track: 'technical' | 'business';
  }

  let { track }: Props = $props();

  const labels = {
    technical: 'Engineering',
    business: 'Business'
  };
</script>

<span class="track-badge {track === 'technical' ? 'track-badge-technical' : 'track-badge-business'}">
  {labels[track]}
</span>
