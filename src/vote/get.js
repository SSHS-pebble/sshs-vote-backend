module.exports = async ctx => {
    ctx.body.data = await ctx.state.collections.students.find({}).map(({ vote }) => vote).toArray();

    ctx.body.status = "success";
};
