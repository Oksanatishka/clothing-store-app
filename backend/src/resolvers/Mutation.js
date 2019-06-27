const Mutations = {
    async createItem(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        // ctx.db.mutation.createItem   - that actually returns a promise,
        const item = await ctx.db.mutation.createItem(
            {
                data: {
                    ...args
                }
            },
            info
        );

        return item;
    },
    // createDog(parent, args, ctx, info) {
    //     global.dogs = global.dogs || [];
    //     // create dog
    //     const newDog = { name: args.name };
    //     global.dogs.push(newDog);
    //     return newDog;
    //     // console.log(args);
    // }
    updateItem(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args };
        // remove the ID from the updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id
                }
            },
            info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        // 1. find the item
        const item = await ctx.db.query.item({ where }, `{id title}`);
        // 2. check if they own that item, or have the permissions
        // TODO
        // 3. delete it!
        return ctx.db.mutation.deleteItem({ where }, info);
    }
};

module.exports = Mutations;
