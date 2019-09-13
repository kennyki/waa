<template>
  <q-page class="q-py-lg q-px-sm">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        default-opened
        group="default"
        expand-separator
        header-class="text-primary"
        label="How it works?"
      >
        <q-separator />
        <q-card>
          <q-card-section>
            This opens your installed WhatsApp application with the entered phone number. Nothing else.
            <br /><br />
            You can do it manually with the URL scheme below:
            <br />
            <code>https://api.whatsapp.com/send?phone=&lt;code&gt;&lt;number&gt;</code>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        group="default"
        expand-separator
        header-class="text-primary"
        label="[Shortcut] Prefill phone number"
      >
        <q-separator />
        <q-card>
          <q-card-section>
            You can prefill with the URL scheme below:
            <br />
            <code>https://whatsapp-anyone.web.app?phone=&lt;code&gt;&lt;number&gt;</code>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHelp'
}
</script>
