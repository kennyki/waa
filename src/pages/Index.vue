<template>
  <q-page class="flex flex-center q-py-lg q-px-sm">
    <q-form
      class="q-gutter-md"
      style="min-width: 300px"
      @submit='onSubmit'
    >
      <h1 class="text-h6">
        Send WhatsApp messages to anyone.
        <br />
        <span class="text-body1">
          Including people not in your contact list
          <br />
          and without saving the numbers.
        </span>
      </h1>
      <q-select
        v-model="code"
        label="Phone code"
        filled
        use-input
        input-debounce="0"
        :options="codesFiltered"
        option-value="code"
        emit-value
        lazy-rules
        :rules="[val => !!val || 'Select a phone code']"
        @filter="filterFn"
        @input="$refs.inputNumber.focus()"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input
        ref='inputNumber'
        v-model="number"
        label="Phone number"
        filled
        lazy-rules
        :rules="[validateNumber]"
      />
      <div class="flex justify-center">
        <q-btn
          type="submit"
          color="secondary"
          icon-right="send"
          label="Message"
        />
      </div>
      <p class="text-center">
        <router-link to="/help">Help</router-link>
      </p>
    </q-form>
  </q-page>
</template>

<style>
</style>

<script>
import { openURL } from 'quasar'
import phoneCodes from 'assets/phone-codes.json'

export default {
  name: 'PageIndex',
  props: ['phone'],
  data () {
    return {
      codes: [],
      codesFiltered: [],
      // TODO: store user selection in local storage
      code: null,
      number: null
    }
  },
  created () {
    this.codes = phoneCodes.content.list

    if (this.phone) {
      // it starts with either '%2B' or '%20' (result of pasting number directly in the browser)
      const hasPlus = this.phone.indexOf('+') === 0 ||
        this.phone.indexOf(' ') === 0

      this.code = `+${this.phone.substring(hasPlus ? 1 : 0, hasPlus ? 3 : 2)}`
      this.number = this.phone.substring(hasPlus ? 3 : 2)
    }
  },
  methods: {
    filterFn (val, update) {
      if (!val) {
        update(() => {
          this.codesFiltered = this.codes
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.codesFiltered = this.codes.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      const code = this.code.replace('+', '')
      const phone = `${code}${this.number}`
      const url = this.$q.platform.is.mobile
        ? `https://api.whatsapp.com/send?phone=${phone}`
        : `https://web.whatsapp.com/send?phone=${phone}`

      openURL(url)
    },
    validateNumber (val) {
      if (!val) {
        return 'Enter a phone number'
      }

      return /^[0-9]+$/.test(val) || 'Enter numbers only'
    }
  }
}
</script>
