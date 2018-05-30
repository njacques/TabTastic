<template>
  <div>
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="../">
            TabKommander
          </a>

          <div class="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navMenu" class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item has-dropdown ">
              <a class="navbar-link">
                Account
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  Dashboard
                </a>
                <a class="navbar-item">
                  Profile
                </a>
                <a class="navbar-item">
                  Settings
                </a>
                <hr class="navbar-divider">
                <div class="navbar-item">
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="columns" id="mail-app">
      <aside class="column is-2 aside hero is-fullheight">
        <div>
          <div class="main">
            <a href="#" class="item" :class="{ active: isActive('inbox') }" @click="category = 'inbox'">
              <span class="icon">
                <i class="fa fa-inbox"></i>
              </span>
              <span class="name">Inbox</span>
            </a>
            <a href="#" class="item" :class="{ active: isActive('articles') }" @click="category = 'articles'">
              <span class="icon">
                <i class="fa fa-file"></i>
              </span>
              <span class=" name ">Articles</span>
            </a>
            <a href="# " class="item droppable" :class="{ active: isActive('tutorials') }" @click="category = 'tutorials'">
              <span class="icon ">
                <i class="fa fa-book "></i>
              </span>
              <span class="name ">Tutorials</span>
            </a>
          </div>
        </div>
      </aside>
      <div class="column is-10 messages hero is-fullheight " id="message-feed ">
        <div class="action-buttons ">
          <div class="control is-grouped ">
            <a class="button is-small ">
              <i class="fa fa-chevron-down "></i>
            </a>
            <a class="button is-small ">
              <i class="fa fa-refresh "></i>
            </a>
          </div>
          <div class="control is-grouped ">
            <a class="button is-small ">
              <i class="fa fa-inbox "></i>
            </a>
            <a class="button is-small ">
              <i class="fa fa-exclamation-circle "></i>
            </a>
            <a class="button is-small ">
              <i class="fa fa-trash-o "></i>
            </a>
          </div>
          <div class="control is-grouped ">
            <a class="button is-small ">
              <i class="fa fa-folder "></i>
            </a>
            <a class="button is-small ">
              <i class="fa fa-tag "></i>
            </a>
          </div>
        </div>

        <div class="inbox-messages" id="inbox-messages">
          <div class="card" v-for="bookmark in filteredBookmarks">
            <div class="card-content-modified">
              <div class="msg-subject ">
                <span class="msg-subject ">
                  <img :src="bookmark.favIconUrl ||
                    defaultFavicon" height="16" width="16" />
                  {{bookmark.title}} ({{getDomain(bookmark.url)}})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDomain } from "../helpers/helpers";

export default {
  name: 'app',
  created() {
    chrome.storage.local.get(["bookmarks"], ({ bookmarks = [] }) => {
      this.bookmarks = Object.values(bookmarks);
    });
  },

  computed: {
    filteredBookmarks() {
      return this.bookmarks.filter(bookmark => bookmark.folder === this.category);
    }
  },

  data () {
    return {
      bookmarks: [],
      category: 'inbox',
      msg: 'Welcome to Your Vue.js App'
    }
  },

  methods: {
    getDomain(value) {
      return getDomain(value);
    },
    isActive(category) {
      return this.category === category;
    }
  }
}
</script>