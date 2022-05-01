import { ApplyOptions } from "@sapphire/decorators";
import type { ApplicationCommandRegistry } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { randomInt } from "node:crypto";
import { Command } from "../lib/commands/Command";

@ApplyOptions<Command.Options>({
	description: "Earn money by working"
})
export class WorkCommand extends Command {
	private readonly senarios = new Set([
		"You worked hard and earned... {{amount}}. Wow, that must really have been worth it!",
		"You worked hard and earned... {{amount}}. You're a hard worker!",
		"You work for Pixel Pizza and earn {{amount}}. Good job!!",
		"You worked hard as a farmer and earned {{amount}}",
		"You gave good scuba diving lessons, you earned {{amount}}",
		"Wow, you spent some time working... here's {{amount}} for your hard work",
		"You are lazy, but you still get paid. Here's {{amount}}...",
		"Alright I am out of ideas here's {{amount}} and don't tell anyone",
		"You deserved this money for saying 1 word. you got {{amount}}!",
		"Alright here's {{amount}} that you totally didn't steal",
		"You found bugs in a program and earned {{amount}}",
		"Someone walked up to you, gave you {{amount}} and then ran away",
		"You work in a pizza factory, you were given {{amount}} for your good work",
		"You beat {{user}} in battle, you win {{amount}}",
		"You made a pizza, you earned {{amount}}",
		"You made a website for a pizza company, you earned {{amount}}",
		"You pitched an idea to {{user}}, your idea got bought for {{amount}}"
	]);

	private readonly names = new Set([
		"Bob",
		"John",
		"Jane",
		"Mary",
		"Sara",
		"Tom",
		"Sam",
		"Alex",
		"Mike",
		"Linda",
		"Sue",
		"Julie",
		"Lisa",
		"Karen",
		"Sally",
		"Betty",
		"Patty",
		"Jill",
		"Diane",
		"Samantha",
		"Rick",
		"Hank",
		"Dirt",
		"Jaron",
		"Jeb",
		"Jaden",
		"Jasmine"
	]);

	private randomItem(iterable: Iterable<string>): string {
		const array = Array.from(iterable);
		return array[Math.floor(Math.random() * array.length)];
	}

	private generateSenario(amount: number) {
		const senario = this.randomItem(this.senarios);
		return {
			senario: senario
				.replace(
					"{{amount}}",
					`${
						this.container.client.emojis.cache.get(this.container.env.string("ECO_EMOJI"))?.toString() ?? ""
					} ${amount}`
				)
				.replace("{{user}}", this.randomItem(this.names)),
			index: [...this.senarios].indexOf(senario)
		};
	}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(this.defaultChatInputCommand, {
			idHints: ["970335390538039296"]
		});
	}

	public override async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ ephemeral: true });

		const amount = randomInt(50, 200);

		const user = await this.container.findOrCreateUser(interaction.user.id);
		await this.container.prisma.user.update({
			where: { id: user.id },
			data: { balance: user.balance + amount }
		});

		const senario = this.generateSenario(amount);

		return interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setColor("BLUE")
					.setTitle("Work done!")
					.setDescription(senario.senario)
					.setFooter({ text: `Senario ${senario.index + 1}/${this.senarios.size}` })
			]
		});
	}
}
