import { GrammyContext } from '$grammy/context.ts';
import { Menu } from 'grammy_menu';

export const magicMenu = new Menu<GrammyContext>('magic-menu').text(
	`Markdown Image`,
	async (ctx) => {
		// an example on how to display an image through markdown
		await ctx.editMessageText(`[​​​​​​​​​​​](https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/200px-Stack_Overflow_logo.svg.png) Some text here\\.`,{
			disable_web_page_preview: false,
            parse_mode: "MarkdownV2"
		})
        ctx.menu.close()
	},
).row()
.text('Hide', async ctx => {
    ctx.menu.close();
    await ctx.reply('Menu removed')
})