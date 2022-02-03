<template>
<div>
  <button id="menu-toggle" @click="menu = !menu" class="round white-shadow">
    Menu
  </button>
  <router-link :to="backAction" v-if="backAction" tag="button" id="back-button" class="round white-shadow">
    Back
  </router-link>
  <nav :class="{ active: menu }">
    <div class="wrapper">
      <div><img src="/logo_orange.png" id="logo" /></div>
      <div class="nav-items">
        <router-link to="/articles">
          {{ $t("navigation:articles") }}
        </router-link>
        <router-link to="/teams">
          {{ $t("navigation:teams") }}
        </router-link>
        <router-link to="/admins" v-if="user.type === 'ADMIN' && (user.roleIds.includes('2zg3BSH5gT5XZXXErzH4') || user.roleIds.includes('6tMiEdemlWcRUA7oImbl'))">
          {{ $t("navigation:admins") }}
        </router-link>
        <router-link to="/mediaLibrary/launch">
          {{ $t("navigation:mediaLibrary") }}
        </router-link>
      </div>
      <div class="nav-auth">
        <div v-if="user" class="nav-auth-details">
          <span>{{ `${user.firstName} ${user.lastName}` }}</span>
          <div @click="changePassword" class="link">
              {{ $t("user:changePassword") }}
          </div>
          <button @click="signOut">
            {{ $t("user:logout") }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    };
  },
  methods: {
    async signOut() {
      this.$store.dispatch("signOut");
      this.$router.push({
        path: "/login"
      });
    },
    async changePassword() {
      this.$router.push({
        path: "/admins/changePassword"
      });
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    backAction() {
      return this.$route.meta ? this.$route.meta.back : null;
    }
  },
  watch: {
    $route(to) {
      this.menu = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/vars";


#logo {
  flex: 0 0;
  width: 150px;
  margin: @h1 auto @h2 @h2;
}

button#back-button {
  position: fixed;
  left: @h6;
  top: @h1;
  font-size: 10px;
  z-index: 10;
}

#menu-toggle {
  position: fixed;
  z-index: 105;
  left: @h1;
  top: @h1;
  width: @h4;
  height: @h4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;
}

nav {
  position: fixed;
  top: 0;
  right: auto;
  border-right: 1px solid @colGreyDark;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: @colBlack;
  z-index: 100;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: @h2 @h1;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 0;
  }

  a {
    font-size: 1em;
    font-weight: bolder;
    text-decoration: none;
    display: block;
    padding: 0 @h2 0 @h3;
    height: @h5;
    display: flex;
    align-items: center;
    color: inherit;
    position: relative;
    opacity: 0.5;
    color: @colOrange;

    &:hover {
      opacity: 0.6;

      &:after {
        opacity: 1;
        transition-duration: 0.2s;
      }
    }

    &.router-link-active {
      opacity: 1;

      &:after {
        opacity: 1;
      }
    }
  }
}

.nav-auth {
  margin: auto 0 0 0;
  padding: @h1 @h1 0 @h1;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  border-top: 1px solid fade(@colBlack, 10%);
  color: @colWhite;

  button {
    appearance: none;
    border: none;
    font: inherit;
    background-color: @colOrange;
    color: @colWhite;
    border-radius: @hh;
    padding: 0 @h1;
    position: relative;
    cursor: pointer;
    color: @colBlack;
  }

  span {
    font-weight: bold;
  }

  .link {
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: @h2;
    opacity: 0.3
  }

  .nav-auth-details {
    display: flex;
    flex-direction: column;
  }
}

@media @smallonly {
  #logo {
    position: absolute;
    top: 0;
    right: @h1;
  }

  nav {
    padding-top: @h1;
    transition: all 0.2s ease-out;
  }

  nav:not(.active) {
    transform: translateX(-100%);
  }
}

@media @medium {
  #menu-toggle {
    display: none;
  }

  button#back-button {
    left: @menuWidth - @h2;
    top: @h1;
    z-index: 105;
  }

  nav {
    width: @menuWidth;
  }
}
</style>
