<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>{{ brand }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-ripple
            clickable
            tag="a"
            href="https://github.com/kennyki/waa"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon name="star"></q-icon>
            </q-item-section>
            <q-item-section>GitHub</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-ajax-bar
        color="primary"
        position="bottom"
        size="10px"
      />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      brand: 'WhatsAppAnyone',
      drawer: false
    }
  }
}
</script>

<style>
</style>
