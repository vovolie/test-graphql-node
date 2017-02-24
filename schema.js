import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} from 'graphql';
import Db from './db';

const Category = new GraphQLObjectType({
    name: 'Category',
    description: 'This represents a category',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(category) {
                    return category.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(category) {
                    return category.name;
                }
            },
            description: {
                type: GraphQLString,
                resolve(category) {
                    return category.description;
                }
            },
            materials: {
                type: new GraphQLList(Material),
                resolve(category) {
                    return category.getMaterials();
                }
            }
        }
    }
});

const Material = new GraphQLObjectType({
    name: 'Material',
    description: 'This is a material',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(category) {
                    return category.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(material) {
                    return material.name;
                }
            },
            cover: {
                type: GraphQLString,
                resolve(material) {
                    return material.cover;
                }
            },
            url: {
                type: GraphQLString,
                resolve(material) {
                    return material.url;
                }
            },
            category: {
                type: Category,
                resolve(material) {
                    return material.getCategory()
                }
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            allCategory: {
                type: new GraphQLList(Category),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    name: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.category.findAll({where: args});
                }
            },
            allMaterial: {
                type: new GraphQLList(Material),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    name: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Db.models.material.findAll({where: args})
                }
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Functions to create category',
    fields() {
        return {
            addCategory: {
                type: Category,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return Db.models.category.create({
                        name: args.name,
                        description: args.description
                    })
                }
            },
            addMaterial: {
                type: Material,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    cover: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    url: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    categoryId: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, args) {
                    return Db.models.material.create({
                        name: args.name,
                        cover: args.cover,
                        url: args.url,
                        categoryId: args.categoryId
                    })
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;
