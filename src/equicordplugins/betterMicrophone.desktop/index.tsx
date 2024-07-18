/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

import { addSettingsPanelButton, Emitter, MicrophoneSettingsIcon, removeSettingsPanelButton } from "../philsPluginLibrary.desktop";
import { PluginInfo } from "./constants";
import { openMicrophoneSettingsModal } from "./modals";
import { MicrophonePatcher } from "./patchers";
import { initMicrophoneStore } from "./stores";

var microphonePatcher;

// const settings = definePluginSettings({
//     openSettings: {
//         description: "",
//         type: OptionType.COMPONENT,
//         component: (() => {
//             return (
//                 <Button onClick={() => openMicrophoneSettingsModal()}>Open Settings</Button>
//             );
//         })
//     }
// });

export default definePlugin({
    name: "PhilsBetterMicrophone",
    description: "This plugin allows you to further customize your microphone.",
    authors: [Devs.philhk],
    dependencies: ["PhilsPluginLibrary"],

    start() {
        initMicrophoneStore();
        microphonePatcher = new MicrophonePatcher().patch();
        addSettingsPanelButton({ name: PluginInfo.PLUGIN_NAME, icon: MicrophoneSettingsIcon, tooltipText: "Microphone Settings", onClick: openMicrophoneSettingsModal });
    },

    stop() {
        microphonePatcher?.unpatch();
        Emitter.removeAllListeners(PluginInfo.PLUGIN_NAME);
        removeSettingsPanelButton(PluginInfo.PLUGIN_NAME);
    },

    // settings,
});

export { microphonePatcher };
