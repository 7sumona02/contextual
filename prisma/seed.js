const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.article.createMany({
    data: [
      // Amazon articles
      {
        title: 'Amazon’s New AI Initiatives',
        content: 'Amazon has announced a range of new AI-powered tools for logistics, cloud computing, and retail personalization.',
        imageUrl: 'https://via.placeholder.com/300?text=Amazon+AI',
        tenantId: 'amazon'
      },
      {
        title: 'How Amazon Manages Global Supply Chains',
        content: 'A deep dive into the strategies and technologies Amazon uses to maintain its fast and efficient delivery system worldwide.',
        imageUrl: 'https://via.placeholder.com/300?text=Amazon+Supply+Chain',
        tenantId: 'amazon'
      },

      // eBay articles
      {
        title: 'eBay Expands Authentication Services',
        content: 'eBay is expanding its luxury goods authentication service to include sneakers, watches, and handbags in more markets.',
        imageUrl: 'https://via.placeholder.com/300?text=eBay+Authentication',
        tenantId: 'ebay'
      },
      {
        title: 'The Evolution of Online Auctions on eBay',
        content: 'From collectibles to cars, explore how eBay’s auction platform has evolved over the past two decades.',
        imageUrl: 'https://via.placeholder.com/300?text=eBay+Auctions',
        tenantId: 'ebay'
      }
    ],
    skipDuplicates: true // prevents inserting the same seed multiple times
  })

  console.log('✅ Amazon and eBay articles seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
