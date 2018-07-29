<template>
  <div class="card bookmark">
    <div class="card-content-modified">
      <div class="columns">
        <div class="column">
          <!-- <a class="button"><i class="fas fa-bars"></i></a> -->
          <div class="bookmark-desc">
            <img :src="favicon || defaultFavicon" height="16" width="16" />
            {{title}} ({{getDomain(url)}})
          </div>
        </div>
        <div class="column is-one-quarter has-text-right">
          <a class="button" :href="url" target="_blank">
            <span class="icon has-text-grey-light"><i class="fas fa-external-link-alt"></i></span>
          </a>
          <a class="button">
            <span class="icon has-text-grey-light"><i class="fas fa-edit"></i></span>
          </a>
          <a class="button" @click="$emit('delete')">
            <span class="icon has-text-grey-light"><i class="fas fa-trash"></i></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDomain } from "../helpers/helpers";

const defaultFavicon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4T2NkoBAwIuuPiIhwwGHegxUrVjzAJodhwIoVKw6gG/r///8fjIyML7AZQpQBL168OCEuLm6AzRCiDAC5ysHBgQObIUQZgO53ZG8SNABdMyigRw0Y/mFATObEmQ6I0YyuBgB6/3gRnZbduwAAAABJRU5ErkJggg==";

export default {
  name: "bookmark",

  props: ["title", "url", "favicon"],

  data: () => ({
    defaultFavicon
  }),

  methods: {
    getDomain(value) {
      return getDomain(value);
    }
  }
};
</script>

<style>
.bookmark:hover {
  cursor: -webkit-grab;
}
.card-content-modified {
  padding: 10px 15px;
}
.msg-subject img {
  vertical-align: middle;
  margin-right: 2px;
}
.bookmark-desc {
  display: inline-block;
  padding: 0.3em;
}
.bookmark-desc img {
  vertical-align: middle;
  margin-right: 0.5em;
}
</style>
