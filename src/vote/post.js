module.exports = async (ctx) => {
    const { id, vote } = ctx.request.body;

    // validate form
    if(typeof id != "string" || id.length != 8 // id must be a 8 char string
       || typeof vote != "number" // vote must be number
       // and should be between 0 and candidate - 1
       || vote < 0 || vote >= parseInt(process.env.CANDIDATE, 10)) {
        ctx.body.status = false;
        ctx.body.error = "form-malformed";
        ctx.throw(400, JSON.stringify(ctx.body));
    }

    const student = await ctx.state.collections.students.findOne({ id });

    // if student does not exist
    if(!student) {
        ctx.body.status = false;
        ctx.body.error = "nonexistent-id";
        ctx.throw(400, JSON.stringify(ctx.body));
    }

    // if student already voted
    if(student.vote != -1) {
        ctx.body.status = false;
        ctx.body.error = "already-voted";
        ctx.throw(400, JSON.stringify(ctx.body), { expose: true });
    }

    await ctx.state.collections.students.findOneAndUpdate({ id }, { $set: { vote }});

    ctx.body.status = "success";
};
