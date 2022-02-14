import { ApplyOptions } from "@sapphire/decorators";
import type { ApplicationCommandRegistry } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { Command } from "../lib/commands/Command";

@ApplyOptions<Command.Options>({
    description: "🖊🍍🍎🖊"
})
export class PPAPCommand extends Command {
    public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand(this.defaultChatInputCommand);
    }

    public override chatInputRun(interaction: CommandInteraction) {
        return interaction.reply({
            embeds: [
                new MessageEmbed({
                    color: "YELLOW",
                    title: this.description,
                    description: "[Pen Pineapple Apple Pen](https://www.youtube.com/watch?v=Ct6BUPvE2sM)",
                    image: {
                        url: "https://c.tenor.com/U5jXEmtm8aIAAAAC/ppap-dance.gif"
                    },
                    footer: {
                        text: "What did you expect?"
                    }
                })
            ],
            ephemeral: true
        });
    }
}