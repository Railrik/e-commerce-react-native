import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const users = await prisma.user.findMany()
  // console.log(users)

  // await prisma.course.create({
  //     data: {
  //       title: "Formation JavaScript Moderne",
  //       description: "Une formation complète pour maîtriser les principes et les dernières avancées du JavaScript moderne. Explorez des concepts tels que les fonctions fléchées, les promesses, l'asynchrone, les classes, et bien plus encore. Que vous soyez débutant ou expérimenté, cette formation vous permettra de devenir un développeur JavaScript compétent et de créer des applications web dynamiques et interactives.",
  //       image:"https://cdn.pixabay.com/photo/2019/07/16/18/18/frontend-4342425_640.png",
  //       price:99.99,
  //       selected:false,
  //       instructorId:1
  //     },
  //   })
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