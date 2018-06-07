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
            <draggable
              v-for="(folder, idx) in folders"
              v-model="tempArray"
              class="dragArea"
              :options="{group:'transfer'}"
              @change="moveToFolder(folder.name, $event)"
              :key="idx"
            >
              <a
                href="#"
                class="item"
                :class="{ active: isActive(folder.name) }"
                @click="changeFolder(folder.name)"
                slot="footer"
              >
                <span class="icon ">
                  <i :class="folder.icon"></i>
                </span>
                <span class="name">{{ folder.name }}</span>
              </a>
            </draggable>
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
          <draggable v-model="filteredBookmarks" :options="{group:'transfer'}">
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
          </draggable>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { getDomain } from "../helpers/helpers";

const defaultFavicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4T2NkoBAwIuuPiIhwwGHegxUrVjzAJodhwIoVKw6gG/r///8fjIyML7AZQpQBL168OCEuLm6AzRCiDAC5ysHBgQObIUQZgO53ZG8SNABdMyigRw0Y/mFATObEmQ6I0YyuBgB6/3gRnZbduwAAAABJRU5ErkJggg==";

const saveBookmarks = bookmarks => {
  chrome.storage.local.set({ bookmarks });
}

export default {
  name: 'app',

  components: { draggable },

  created() {
    chrome.storage.local.get(["bookmarks"], ({ bookmarks = {} }) => {
      this.bookmarks = bookmarks;
    });
  },

  computed: {
    filteredBookmarks: {
      get() {
        return Object.values(this.bookmarks)
          .filter(bookmark => bookmark.folder === this.activeFolder);
      },
      set(newValue) {} // exists to keep vuedraggable happy
    },
  },

  data () {
    return {
      bookmarks: {},
      activeFolder: 'inbox',
      folders: [
        { name: 'inbox', icon: 'fa fa-inbox' },
        { name: 'articles', icon: 'fa fa-file' },
        { name: 'tutorials', icon: 'fa fa-book' }
      ],
      defaultFavicon,
      tempArray: [] // exists to keep vuedraggable happy
    }
  },

  methods: {
    moveToFolder(targetFolder, { added }) {
      added.element.folder = targetFolder;
      // this.tempArray = [];
      saveBookmarks(this.bookmarks);
    },
    changeFolder(folderName) {
      this.activeFolder = folderName;
    },
    getDomain(value) {
      return getDomain(value);
    },
    isActive(folder) {
      return this.activeFolder === folder;
    }
  }
}
</script>

<style>
  .card-content-modified {
    padding: 2px 15px;
  }
  .msg-subject img {
    vertical-align: middle;
    margin-right: 2px;
  }
  .dragArea {
    min-height: 10px;
  }
  .dragArea .card {
    display: none;
  }
  .item .name {
    text-transform: capitalize;
  }
</style>