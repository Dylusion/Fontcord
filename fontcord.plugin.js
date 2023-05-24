/**
 * @name Fontcord
 * @version 1.0.6
 * @source "https://github.com/Dylusion/Fontcord"
*/
const request = require("request");
const fs = require("fs");
const path = require("path");

const config = {
    info: {
        name: "Fontcord",
        authors: [
            {
                name: "Dylusion",
                discord_id: "646854807608623104",
                github_username: "Dylusion"
            }
        ],
    github_raw:
      "https://raw.githubusercontent.com/Dylusion/Fontcord/master/fontcord.plugin.js",
    version: "1.0.6",
    description:
      "Adds easy to use custom font configuration with Google Fonts integration",
	},
  changelog: [
    {
      "title": "Update",
      "type": "update",
      "items": [
        "",
        "",
      ]
    }
  ],
  defaultConfig: [
    {
      type: "switch",
      name: "Enable Fontcord",
      note: "Enable flashbang effect while on Do Not Disturb",
      id: "enableFonts",
      value: true,
    },
    {
      type: "textbox",
      name: "test",
      note: "test",
      id: "test1",
      value: "test",
    },
    {
      type: "colorpicker",
      name: "test",
      note: "test",
      id: "test2",
      value: "",
    }
  ]
  };

module.exports = !global.ZeresPluginLibrary
  ? class {
      constructor() {
        this._config = config;
      }

      load() {
        BdApi.showConfirmationModal(
          "Library plugin is needed",
          `The library plugin needed for Fontcord is missing. Please click Download Now to install it.`,
          {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
              request.get(
                "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
                (error, response, body) => {
                  if (error)
                    return electron.shell.openExternal(
                      "https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
                    );

                  fs.writeFileSync(
                    path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
                    body
                  );
                }
              );
            },
          }
        );
      }

      start() {}

      stop() {}
    }
  : (([Plugin, Library]) => {
      const {
        DiscordModules,
        WebpackModules,
        Patcher,
      } = Library;

      const {
        Dispatcher,
        UserStore,
        UserStatusStore,
      } = DiscordModules;
      const { Webpack } = BdApi;

      class plugin extends Plugin {
        constructor() {
          super();

          this.getSettingsPanel = () => {
            return this.buildSettingsPanel().getElement();
          };
        }

        onStart() {
          this.initUI();
        }
        
        initUI() {
            const fonts_UI = document.createElement("div")
            fonts_UI.textContent = "Fonts"
            fonts_UI.className = "item-2GWPIy themed-qqoYp3"
            fonts_UI.role = "tab"
            fonts_UI.ariaSelected = "false"
            fonts_UI.ariaDisabled = "false"
            fonts_UI.tabIndex = "-1"

            const header = document.querySelector("#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div:nth-child(2) > div > div.sidebarRegion-1VBisG > div > nav > div")

            header.append(fonts_UI)
        }

        /*
        checkSettings(message, channel) {
          let shouldNotify = true;
          const ignoredUsers = this.settings.ignoredUsers.trim().split(",");
          const ignoredServers = this.settings.ignoredServers.trim().split(",");
          const ignoredChannels = this.settings.ignoredChannels
            .trim()
            .split(",");
          const ignoreDMs = this.settings.ignoreDMs;
          const ignoreDMGroups = this.settings.ignoreDMGroups;

          const dontDisableOnDnd = this.settings.disableOnDnd;
	    // fix later
          const isDnd =
            UserStatusStore.getStatus(UserStore.getCurrentUser().id) === "dnd";

          //
          if (dontDisableOnDnd) {
            shouldNotify = isDnd;
          }
          //

          if (ignoreDMs) {
            if (channel.type === ChannelTypes["DM"]) shouldNotify = false;
          }

          if (ignoreDMGroups) {
            if (channel.type === ChannelTypes["GROUP_DM"]) shouldNotify = false;
          }

          if (ignoredUsers.includes(message.author.id)) shouldNotify = false;
          if (ignoredServers.includes(channel.guild_id)) shouldNotify = false;
          if (ignoredChannels.includes(channel.id)) shouldNotify = false;

          return shouldNotify;
        }
        */

        /*
        fetchFontList() {

        }

        onStop() {

        }
        */
      }

      return plugin;
    })(global.ZeresPluginLibrary.buildPlugin(config));