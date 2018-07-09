<template>
  <div>
    <navbar class="is-fixed-top" @search="filterBookmarks"/>
    <div class="columns" id="mail-app">
      <aside class="column is-2 aside hero is-fullheight">
        <div class="sticky">
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
              @edit="editBookmark(bookmark)"
              @delete="deleteBookmark(bookmark)" />
          </draggable>

        </div>

      </div>
    </div>

    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit bookmark</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" v-model="selectedBookmark.title">
            </div>
          </div>
          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <multiselect
                v-model="selectedBookmark.tags"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                :options="tagOptions"
                :multiple="true"
                :taggable="true"
                @tag="addTag">
              </multiselect>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="onModalSave">Save changes</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-multiselect/dist/vue-multiselect.min.css";
import Multiselect from "vue-multiselect";
import Draggable from "vuedraggable";
import Navbar from "./Navbar.vue";
import Bookmark from "./Bookmark.vue";

const saveBookmarks = bookmarks => {
  chrome.storage.local.set({ bookmarks });
};

export default {
  name: "app",

  components: { Draggable, Navbar, Bookmark, Multiselect },

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
            bookmark.title
              .toLowerCase()
              .includes(this.searchTerms.toLowerCase())
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
      selectedBookmark: {},
      showModal: false,
      tempArray: [], // exists to keep vuedraggable happy
      tagValue: [],
      tagOptions: ["Node.js", "React", "Angular"]
    };
  },

  methods: {
    addTag(newTag) {
      this.tagOptions.push(newTag);
      this.tagValue.push(newTag);
    },
    deleteBookmark(bookmark) {
      this.$delete(this.bookmarks, bookmark.url);
      saveBookmarks(this.bookmarks);
    },
    editBookmark(bookmark) {
      console.log(this.selectedBookmark, bookmark);
      Object.assign(this.selectedBookmark, bookmark);
      this.showModal = true;
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
    },
    closeModal() {
      this.selectedBookmark = {};
      this.tagValue = [];

      this.showModal = false;
    },
    onModalSave() {
      const bookmark = this.bookmarks[this.selectedBookmark.url];
      Object.assign(bookmark, {
        title: this.selectedBookmark.title,
        tags: this.tagValue
      });
      saveBookmarks(this.bookmarks);

      this.closeModal();
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
.sticky {
  position: sticky;
  top: 50px;
}
</style>
