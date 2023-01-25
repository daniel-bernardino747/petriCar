import { prisma } from '../src/prisma/prisma.client'
import { products } from '../src/prisma/data'

const main = async () => {
  await prisma.product.createMany({
    data: products,
  })
  console.log('Created fake products 🌱')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
