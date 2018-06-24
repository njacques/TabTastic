<template>
  <nav class="navbar is-primary">
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

    <div id="navMenuColorprimary-example" class="navbar-menu">

      <div class="navbar-end">
        <div class="navbar-item">

          <div class="control has-icons-right">
            <input
              class="input is-rounded"
              type="text" placeholder="Search bookmarks"
              @input="$emit('search', $event.target.value)"
            >
            <span class="icon is-small is-right">
              <i class="fas fa-search"></i>
            </span>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar"
};
</script>
