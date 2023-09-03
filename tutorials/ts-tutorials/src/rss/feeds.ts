import { Client } from '@notionhq/client'
import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import ogp from 'ogp-parser'
import dotenv from 'dotenv'
dotenv.config()

export const addFeedItems = async (
  newFeedItems: {
    [key: string]: TODO
  }[]
) => {
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const databaseId = process.env.NOTION_READER_DATABASE_ID || ''

  newFeedItems.forEach(async (item) => {
    const { title, link, enclosure, pubDate } = item
    const domain = link?.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)

    const properties: TODO = {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      URL: {
        url: link,
      },
      Domain: {
        select: {
          name: domain ? domain[1] : null,
        },
      },
      'Created At': {
        rich_text: [
          {
            text: {
              content: pubDate,
            },
          },
        ],
      },
    }

    const ogpImage = link
      ? await ogp(link).then((data) => {
          const imageList = data.ogp['og:image']
          return imageList ? imageList[0] : null
        })
      : ''

    const children: CreatePageParameters['children'] = enclosure
      ? [
          {
            type: 'image',
            image: {
              type: 'external',
              external: {
                url: enclosure?.url,
              },
            },
          },
        ]
      : ogpImage
      ? [
          {
            type: 'image',
            image: {
              type: 'external',
              external: {
                url: ogpImage,
              },
            },
          },
        ]
      : []

    try {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties,
        children,
      })
    } catch (error) {
      console.error(error)
    }
  })
}


export const getNotionFeedUrlList = async () => {
import { notion } from '@/lib/notion-api';
    const notionCLient = new Client({ auth: 
        process.env.NOTION_KEY });
    const databaseId = process.env.NOTION_FEEDER_DATABASE_ID
    const response = await notion.databases.query({
        database_id: databaseId,
    })
    const feedUrlList = response.results.filter(
        (result: any) => result.properties.Enable.checkbox
    )
    return feedUrlList.map((result: any) => result.properties.Link.url as string)
}

type TODO = any

export const getFeedUrlList = async () => {
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const databaseId = process.env.NOTION_FEEDER_DATABASE_ID || ''

  const response = await notion.databases.query({
    database_id: databaseId,
  })

  const feedUrlList = response.results.filter(
    (result: TODO) => result.properties.Enable.checkbox
  )

  return feedUrlList.map((result: TODO) => result.properties.Link.url as string)
}


async function index() {
    const feedUrlList = await getFeedUrlList()
    feedUrlList.forEach(async (feedUrl: string) => {
      if (feedUrl) {
        try {
          const newFeedItems = await getNewFeedItems(feedUrl)
          await addFeedItems(newFeedItems)
        } catch (error) {
          // TODO: Provide some kind of notification to the user.
          console.error(error)
        }
      }
    })
  }