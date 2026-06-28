<script lang="ts">
  interface Props {
    track: 'engineering' | 'technical' | 'business' | 'product';
  }

  let { track }: Props = $props();

  const labels = {
    engineering: 'Technical',
    technical: 'Technical',
    business: 'Business',
    product: 'Product'
  };

  const badgeClass = {
    engineering: 'track-badge-technical',
    technical: 'track-badge-technical',
    business: 'track-badge-business',
    product: 'track-badge-product'
  };
</script>

<span class="track-badge {badgeClass[track]}">
  {labels[track]}
</span>
