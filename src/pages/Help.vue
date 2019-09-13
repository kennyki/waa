<template>
  <q-page class="q-py-lg q-px-sm">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        default-opened
        label="What it does?"
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
