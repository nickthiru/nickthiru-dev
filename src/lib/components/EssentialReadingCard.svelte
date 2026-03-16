<script lang="ts">
  import type { PostMeta } from '$lib/utils/posts';

  interface Props {
    post: PostMeta;
  }

  let { post }: Props = $props();
</script>

<article class="h-full">
  <a href="/writing/{post.slug}" class="flex flex-col h-full group p-5 rounded-lg border bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-700/40 hover:border-sky-300 dark:hover:border-sky-600/50 transition-colors">
    <h3 class="text-h4 text-primary dark:text-[#FAFAFA] group-hover:text-accent transition-colors mb-2">
      {post.title}
    </h3>
    <p class="text-base text-secondary dark:text-[#D4D4D4] line-clamp-2">
      {post.description}
    </p>
  </a>
</article>
