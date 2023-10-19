import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/schema.js';
import { PrismaClient } from '@prisma/client'
import moment from 'moment';
const prisma = new PrismaClient();

const serverPort = process.argv.includes('--p') ? process.argv[process.argv.indexOf('--p') + 1] : 4000;
const graphqlPath = '/graphql';

const resolvers = {
    Query: {
        //utilisateurs
        async users() {
            return prisma.User.findMany();
        },

        //utilisateur (id)
        async user(_, args) {
            const { id } = args;
            return prisma.User.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
        },

        //cours proposés
        async courses() {
            return prisma.Course.findMany({
                orderBy: {
                    createdAt: 'asc'
                }
            });
        },

        //cours proposé (id)
        async course(_, args) {
            const { id } = args;
            return prisma.Course.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
        },

        // //cours achetés
        // async purchasedCourses() {
        //     const userCourses = await prisma.UserCourse.findMany();

        //     // Formatez la date au format souhaité en utilisant Moment.js
        //     const serializedUserCourses = userCourses.map((userCourse) => ({
        //         ...userCourse,
        //         purchaseDate: moment(userCourse.purchaseDate).format('DD MM YYYY HH:mm'),
        //     }));

        //     return serializedUserCourses;
        // },

        //cours acheté (id)
        // async purchasedCourse(_, args) {
        //     const { id } = args;
        //     const userCourse = await prisma.UserCourse.findUnique({
        //         where: {
        //             id: parseInt(id)
        //         }
        //     });
        //     if (userCourse) {
        //         // Formatez la date au format souhaité en utilisant Moment.js
        //         const serializedUserCourse = {
        //             ...userCourse,
        //             purchaseDate: moment(userCourse.purchaseDate).format('DD MM YYYY HH:mm'),
        //         };
        //         return serializedUserCourse;
        //     }
        //     return null;
        // }

        // //paniers
        // async carts() {
        //     return prisma.Cart.findMany();
        // },
        // //panier (id)
        // async cart(_, args) {
        //     const { id } = args;
        //     return prisma.Cart.findUnique({
        //         where: {
        //             id: parseInt(id)
        //         }
        //     });
        // },

        // //contenu paniers
        // async cartItems() {
        //     return prisma.cartItem.findMany();
        // },

        // //contenu panier (id)
        // async cartItem(_, args) {
        //     const { id } = args;
        //     return prisma.cartItem.findUnique({
        //         where: {
        //             id: parseInt(id)
        //         }
        //     });
        // },

    },

    // Récupère tous les cours en vente d'un utilisateur
    User: {
        async coursesForSell(parent) {
            return prisma.Course.findMany({
                where: {
                    instructorId: parseInt(parent.id)
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
        },
        async cart(parent) {
            return prisma.Cart.findUnique({
                where: {
                    userId: parseInt(parent.id)
                },
            });
        },
        async purchasedCourses(parent) {
            const userCourses = await prisma.UserCourse.findMany({
                where: {
                    userId: parseInt(parent.id)
                },
            });

            return userCourses.map(userCourse => {
                // Formatez la date au format souhaité en utilisant Moment.js
                return {
                    ...userCourse,
                    purchaseDate: moment(userCourse.purchaseDate).format('DD/MM/YYYY HH:mm'),
                };
            });
        }
    },

    // Récupère l'instructeur d'un cours
    Course: {
        async instructor(parent) {
            return prisma.User.findUnique({
                where: {
                    id: parseInt(parent.instructorId)
                }
            });
        }
    },

    // Récupère le panier d'un utilisateur
    Cart: {
        //recupere le detail du panier de l'utilisateur
        async cartItems(parent) {
            return prisma.cartItem.findMany({
                where: {
                    cartId: parseInt(parent.id)
                },
                include: {
                    course: true,  // Inclure les détails des cours achetés
                },
            });
        }
    },

    PurchasedCourse: {
        async courses(parent) {
            return prisma.Course.findMany({
                where: {
                    id: parent.courseId,  // Recherchez le cours par l'ID du parent (PurchasedCourse)
                }
            });
        }
    },

    Mutation: {
        addToCart: async (_, args) => {
            const { userId, cartItems } = args.input;

            let newCart;

            //vérification si panier existant pour l'utilisateur
            const existingCart = await prisma.cart.findUnique({
                where: {
                    userId,
                },
            });

            if (existingCart) {
                newCart = existingCart;
            } else {
                // Si aucun panier exisant création d' un nouveau panier
                newCart = await prisma.cart.create({
                    data: {
                        userId,
                    },
                });
            }

            // Création des items à ajouter au panier
            await Promise.all(
                cartItems.map(async (cartItem) => {
                    const { courseId, quantity, coursePrice } = cartItem;
                    return prisma.cartItem.create({
                        data: {
                            course: { connect: { id: courseId } },
                            quantity,
                            cart: { connect: { id: newCart.id } },
                            coursePrice,
                            createdAt: new Date(),
                        },
                    });
                })
            );

            return newCart;
        },
        removeFromCart: async (_, args) => {
            const { userId, cartItems } = args.input;

            // verification  si un panier existe pour l'utilisateur
            const existingCart = await prisma.cart.findUnique({
                where: {
                    userId,
                },
            });
            if (!existingCart) {
                throw new Error('Aucun panier trouvé pour l\' utilisateur');
            }

            // suppresion de l'item cité
            await Promise.all(
                cartItems.map(async (cartItem) => {
                    const { courseId, quantity } = cartItem;

                    // Assurez-vous que l'utilisateur a ces cartItems dans son panier
                    const existingCartItem = await prisma.cartItem.findFirst({
                        where: {
                            courseId: courseId,
                            cartId: existingCart.id
                        },
                    });
                    if (!existingCartItem) {
                        throw new Error(`Aucun cartItem trouvé pour le cours ${courseId} dans le panier de l'utilisateur.`);
                    }

                    if (existingCartItem.quantity < quantity) {
                        throw new Error(`La quantité spécifiée dépasse la quantité du cartItem.`);
                    }
                    if (existingCartItem.quantity === quantity) {

                        // Si la quantité spécifiée est égale à la quantité du cartItem, supprimez le cartItem
                        await prisma.cartItem.delete({
                            where: {
                                id: existingCartItem.id,
                            },
                        });
                    } else {
                        // Si la quantité spécifiée est inférieure à la quantité du cartItem, mettez à jour la quantité
                        await prisma.cartItem.update({
                            where: {
                                id: existingCartItem.id,
                            },
                            data: {
                                quantity: existingCartItem.quantity - quantity,
                            },
                        });
                    }
                })
            );
            return existingCart;
        },

        addCartItemsToUserCourse: async (_, args) => {
            const { userId, cartId } = args.input;
            const cartItems = await prisma.CartItem.findMany({
                where: {
                    cartId: cartId,
                }
            });

            if (!cartItems || cartItems.length < 1) {
                throw new Error(`Aucun cartItem trouvé`);
            }

            await Promise.all(
                cartItems.map(async (cartItem) => {
                    await prisma.userCourse.create({
                        data: {
                            user: { connect: { id: userId } },
                            course: { connect: { id: cartItem.courseId } },
                            price: cartItem.coursePrice,
                            purchaseDate: new Date(),
                        }
                    });

                    await prisma.cartItem.delete({
                        where: {
                            id: cartItem.id,
                        },
                    });
                })
            );

            return { success: true, message: "Le contenu du panier a été ajouté à UserCourse." };
        },

        deleteCourse: async (_, args) => {
            const { userId, courseId } = args.input;

            const existingCourse = await prisma.Course.findUnique({
                where: {
                    id: parseInt(courseId),
                },
            });

            if (!existingCourse) {
                throw new Error(`Le cours avec l'ID ${courseId} n'a pas été trouvé.`);
            }

            const existingCart = await prisma.Cart.findUnique({
                where: {
                    userId: parseInt(userId),
                },
            });
            try {
                // Mise à jour du cours passage selected de false en true
                await prisma.Course.update({
                    data: {
                        selected: true
                    },
                    where: {
                        id: parseInt(courseId),
                        instructorId: parseInt(userId)
                    },
                });

            } catch (error) {
                throw new Error(`Une erreur est survenue, combo Utilisateur/cours non valide : ${error.message}`);
            }

            if (existingCart) {
                try {
                    const existingItems = await prisma.CartItem.findMany({
                        where: {
                            cartId: parseInt(existingCart.id),
                        },
                    });
                    if (existingItems) {
                        try {
                            const itemIdsToDelete = existingItems
                                .filter(existingItem => existingItem.courseId === parseInt(courseId))
                                .map(existingItem => existingItem.courseId);
                            if (itemIdsToDelete.length > 0) {
                                await prisma.cartItem.deleteMany({
                                    where: {
                                        courseId: { in: itemIdsToDelete },
                                    },
                                });
                            }
                        } catch (error) {
                            throw new Error(`Une erreur est survenue lors de la suppression d'articles du panier : ${error.message}`);
                        }
                    }

                } catch (error) {
                    throw new Error(`Une erreur est survenue : ${error.message}`);
                }
            }
            return { success: true, message: "Suppression du cours avec succès" };
        }
    }

}

//server setup 
const server = new ApolloServer({
    typeDefs,
    resolvers,

    subscriptions: {
        path: `ws://localhost:${serverPort}${graphqlPath}`,
    },
    context: ({ req, res }) => {

    },
    playground: true,
    introspection: true,
    path: graphqlPath,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: serverPort, path: graphqlPath },
})

console.log(`server listen to url : ${url}`);