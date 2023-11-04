import { Composer } from 'grammy';
import { createConversation } from 'grammy_conversations';

import { GrammyContext, GrammyConversation } from '$grammy/context.ts';
import { handleErrorMessage } from '$grammy/helpers/mod.ts';
import { getProfileLink } from '$utils/grammy.ts';

async function tryQuiz(convo: GrammyConversation, ctx: GrammyContext) {
   
    let answer = ''

    try {
        await ctx.replyWithChatAction('typing');

        await ctx.reply(`Today is which day of the week?`)


        do {

            answer = await convo.form.text((c) =>
                c.reply(`You are required to enter the day in letters`)
            );

            const day = new Date().toLocaleTimeString('en', { weekday: 'long' }).split(' ')[0]

            if (answer.toLowerCase() === day.toLowerCase()) {
                await ctx.reply(`*Celebrating* Yay, you rock!`)
                answer=''

                break;
            }

            await ctx.reply(`*Dissapointed* Gosh, try harder!`)

        } while (true);

        await ctx.reply(`We are in which month of the year?`)


        do {

            answer = await convo.form.text((c) =>
                c.reply(`You are required to enter the month in letters`)
            );

            const month = new Date().toLocaleTimeString('en', { weekday: 'long', month: 'long' }).split(' ')[0]

            if (answer.toLowerCase() === month.toLowerCase()) {
                await ctx.reply(`*Celebrating* Yay, you rock!`)
                answer=''

                break;
            }

            await ctx.reply(`*Dissapointed* Gosh, try harder!`)

        } while (true);

        await ctx.reply(`Last one.\n\nWhich year are we in?`)


        do {

            const ans = await convo.form.number((c) =>
                c.reply(`You are required to enter the year in numbers`)
            );
            answer = ans.toString()

            const year = new Date().toLocaleTimeString('en', {year: 'numeric'}).split(',')[0]

            if (answer === year) {
                answer=''
                break;
            }

            await ctx.reply(`*Dissapointed* Gosh, try harder!`)

        } while (true);





        await ctx.replyWithChatAction('typing');

        await ctx.reply(
            `You did great *happy_smile*`,
        );
    } catch (e) {
        const msg = handleErrorMessage(e);
        await ctx.reply(msg);
    }
    return;
}

const feedbackConversation = new Composer<GrammyContext>();

feedbackConversation.use(createConversation(tryQuiz, 'quiz'));

export default feedbackConversation;