<script lang="ts">
  interface Props {
    track: 'technical' | 'business' | 'product';
  }

  let { track }: Props = $props();

  const labels = {
    technical: 'Engineering',
    business: 'Business',
    product: 'Product'
  };

  const badgeClass = {
    technical: 'track-badge-technical',
    business: 'track-badge-business',
    product: 'track-badge-product'
  };
</script>

<span class="track-badge {badgeClass[track]}">
  {labels[track]}
</span>
