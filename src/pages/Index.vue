<template>
  <q-page class="flex flex-center">
    <q-form
      class="q-gutter-md"
      style="min-width: 300px"
      @submit='onSubmit'
    >
      <h1 class="text-h6 text-justify">
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
        :loading="loading"
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
    </q-form>
  </q-page>
</template>

<style>
</style>

<script>
import { openURL } from 'quasar'

export default {
  name: 'PageIndex',
  data () {
    return {
      codes: [],
      codesFiltered: [],
      code: null,
      loading: false,
      number: null
    }
  },
  async created () {
    try {
      this.loading = true
      const { data } = await this.$axios.get('https://api.nimblebin.com/b/phone-codes')

      this.codes = data.content.list
    } catch (error) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: error.message || 'An unexpected error occurred when retrieving phone codes'
      })
    } finally {
      this.loading = false
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
