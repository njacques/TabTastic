<template>
  <div>
    <navbar @search="filterBookmarks"/>
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
        <div class="inbox-messages" id="inbox-messages">

          <draggable v-model="filteredBookmarks" :options="{group:'transfer'}">
            <bookmark
              v-for="(bookmark, index) in filteredBookmarks"
              :key="index"
              :title="bookmark.title"
              :url="bookmark.url"
              :favicon="bookmark.favIconUrl"
              @delete="deleteBookmark(bookmark)" />
          </draggable>

        </div>

      </div>
    </div>

    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close" @click="showModal = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input">
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import navbar from "./Navbar.vue";
import bookmark from "./Bookmark.vue";

const saveBookmarks = bookmarks => {
  chrome.storage.local.set({ bookmarks });
};

export default {
  name: "app",

  components: { draggable, navbar, bookmark },

  created() {
    chrome.storage.local.get(["bookmarks"], ({ bookmarks = {} }) => {
      this.bookmarks = bookmarks;
    });
  },

  computed: {
    filteredBookmarks: {
      get() {
        const bookmarksInFolder = Object.values(this.bookmarks).filter(
          bookmark => bookmark.folder === this.activeFolder
        );

        if (this.searchTerms) {
          return bookmarksInFolder.filter(bookmark =>
            bookmark.title.toLowerCase().includes(this.searchTerms)
          );
        }

        return bookmarksInFolder;
      },
      set(newValue) {} // exists to keep vuedraggable happy
    }
  },

  data() {
    return {
      bookmarks: {},
      activeFolder: "inbox",
      folders: [
        { name: "inbox", icon: "fa fa-inbox" },
        { name: "articles", icon: "fa fa-file" },
        { name: "tutorials", icon: "fa fa-book" }
      ],
      searchTerms: "",
      showModal: false,
      tempArray: [] // exists to keep vuedraggable happy
    };
  },

  methods: {
    deleteBookmark(bookmark) {
      this.$delete(this.bookmarks, bookmark.url);
      saveBookmarks(this.bookmarks);
    },
    filterBookmarks(terms) {
      this.searchTerms = terms;
    },
    moveToFolder(targetFolder, { added }) {
      added.element.folder = targetFolder;
      // this.tempArray = [];
      saveBookmarks(this.bookmarks);
    },
    changeFolder(folderName) {
      this.activeFolder = folderName;
    },
    isActive(folder) {
      return this.activeFolder === folder;
    }
  }
};
</script>

<style>
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
