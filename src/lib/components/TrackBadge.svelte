<script lang="ts">
  interface Props {
    track: 'engineering' | 'business' | 'product';
  }

  let { track }: Props = $props();

  const labels = {
    engineering: 'Engineering',
    business: 'Business',
    product: 'Product'
  };

  const badgeClass = {
    engineering: 'track-badge-engineering',
    business: 'track-badge-business',
    product: 'track-badge-product'
  };
</script>

<span class="track-badge {badgeClass[track]}">
  {labels[track]}
</span>
