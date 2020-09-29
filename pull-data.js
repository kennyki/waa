const fs = require('fs')
const axios = require('axios')

const sources = [
  {
    url: 'https://datahub.io/core/country-codes/r/country-codes.json',
    preprocess (item) {
      item.name = item['official_name_en'] || item['UNTERM English Short'] || item['CLDR display name']
    },
    bins: [
      {
        name: 'phone-codes',
        description: 'List of phone codes with name, ITU code, and label',
        format (item) {
          return {
            code: `+${item.Dial}`,
            name: item.name,
            label: `${item.name} (+${item.Dial})`
          }
        }
      }
    ]
  }
]

const run = async () => {
  console.log('Pulling data from datahub.io...')

  sources.forEach(async (source) => {
    console.log(`Requesting from ${source.url}...`)

    const {data} = await axios.get(source.url)

    console.log(`Got ${data.length} results`)

    data.forEach((item) => {
      if (source.preprocess) {
        source.preprocess(item)
      }

      source.bins.forEach((bin) => {
        bin.list = bin.list || []
        bin.list.push(bin.format(item))
      })
    })

    console.log('Creating the bins...')

    source.bins.forEach((bin) => {
      const list = bin.list

      // cleanup or it will keep append to the same list
      bin.list = null

      const json = {
        content: {
          count: list.length,
          list: list.sort((a, b) => a.name.localeCompare(b.name))
        },
        description: bin.description,
        name: bin.name
      }

      fs.writeFile('./src/assets/phone-codes.json', JSON.stringify(json, null, 2), 'utf8')

      console.log('DONE creating the bins')
    })
  })
}

run()
