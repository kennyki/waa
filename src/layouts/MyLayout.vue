<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{ brand }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
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
      brand: 'WhatsAppAnyone'
    }
  }
}
</script>

<style>
</style>
