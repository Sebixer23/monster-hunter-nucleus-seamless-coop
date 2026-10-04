Hub.Handler.Version = 7; // Released at https://hub.splitscreen.me/ on Fri Nov 15 2024 00:45:57 GMT+0000 (Coordinated Universal Time).
Hub.Handler.Id = "ZjcE29q2NSiqtsKuH";
Hub.Maintainer.Name = "Talos91";
Hub.Maintainer.Id = "eeL7HAz8zJovChWw4";

var answers1 = ["No", "Yes"];
var answers2 = ["No", "Yes"];
var answers3 = ["No", "very low", "low", "medium", "high", "ultra"];
var answers4 = ["No", "very low", "low", "medium", "high"];
var answers5 = ["No", "30", "60", "90", "120"];
var answers6 = ["No", "low", "medium", "high"];
Game.AddOption("Lazy Aspect Fix by Maceyaface?", "Experimental, matches aspect ratio to window res, read the handler notes before using.", "Lazy", answers1);
Game.AddOption("Resizing Fix?", "ONLY use if the instances are not resizing correctly for you or not seeing your custom resolutions.", "Resize", answers2);
Game.AddOption("Change graphics settings?", "Set the quality of the in-game graphics.", "preset", answers3);
Game.AddOption(
  "Change texture quality? ",
  "Reduces the use of vram by the gpu, if you exceed your gpu vram the game will stutter a lot (choose low for 3-4 players if your gpu has 8gb or less of vram).",
  "texture",
  answers4
);
Game.AddOption("Limit the frame rate (fps)?", "Increase performance at the cost of responsiveness, for 3-4 players 30 is recommended.", "fps", answers5);
Game.AddOption("Change the resolution render quality?", "Can increase performance at the cost of visual clarity.", "renderquality", answers6);

Game.ExecutableContext = ["chunk"];
Game.KillMutex = ["sMhMain"];
Game.DirSymlinkExclusions = ["settings", "steam_settings"];

// xinput9_1_0.dll is intentionally NOT excluded here: it is the loader of the MHW Seamless Co-op mod
// (Nexus mod 8805), so it has to be symlinked from the game folder into every instance.
Game.FileSymlinkExclusions = ["steamclient_loader.exe", "ColdClientLoader.ini", "steam_appid.txt", "local_save.txt", "dinput8.dll", "lazy.ini"];
Game.FileSymlinkCopyInstead = ["steam_api64.dll", "config.ini", "graphics_option.ini", "graphics_option_preset.ini", "amd_ags_x64.dll", "nvngx_dlisp.dll", "nvngx_dlss.dll"];
Game.GameName = "Monster Hunter: World";
Game.HandlerInterval = 100;
Game.SymlinkExe = false;
Game.SymlinkGame = true;
Game.SymlinkFolders = true;
Game.ExecutableName = "MonsterHunterWorld.exe";
Game.SteamID = "582010";
Game.GUID = "Monster Hunter World";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.UseGoldberg = true;
Game.GoldbergNoLocalSave = true;
Game.GoldbergExperimentalSteamClient = true;
Game.SteamlessPatch = ["false", "--quiet --keepbind", "6000"];
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "MONSTER HUNTER: WORLD(421810)";
Game.HasDynamicWindowTitle = true;
Game.SendFakeFocusMsg = true;
Game.ResetWindows = true;
Game.SetWindowHook = true;
Game.Hook.DInputEnabled = false;
Game.UseDInputBlocker = false;
Game.Hook.XInputEnabled = true;
Game.Hook.XInputReroute = false;

// XInputPlus must NOT use the name xinput9_1_0.dll: that name is the loader of the MHW Seamless Co-op mod.
// The mod's loader supports chaining through xinput9_1_0.chain.dll, so XInputPlus (per-instance controller
// assignment) is given that name and the mod's loader stays xinput9_1_0.dll.
Game.XInputPlusDll = ["xinput9_1_0.chain.dll"];

Game.Hook.CustomDllEnabled = false;
Game.UserProfileSavePath = "AppData\\Roaming\\Goldberg SteamEmu Saves\\582010";
Game.UserProfileSavePathNoCopy = true;
Game.Description =
  "Install the MHW Seamless Co-op mod (Nexus Mods, mod 8805) into the real game folder first, next to MonsterHunterWorld.exe, keeping its folder structure. Every player needs the same game and mod version. CLOSE Steam completely before running this. If you want the instances to resize correctly and avoid stretching you need to create custom resolutions in your AMD/Nvidia/Intel panel (for example if you are using a 1920x1080 monitor add resolutions like: 960x1080, 960x540, 1920x540 etc.) so the game can see and use them. If you use keyboards and mice after the instances open press the END key to lock the input for all instances to have their own cursor. Press the END key again to unlock the input when you finish playing. You can also use CTRL+Q to close Nucleus and all its instances. Alt-tab between the instances to use the keyboard for names and such with the input unlocked. Connect the instances via quests not via SOS flare after the tutorial. Run your game outside of Nucleus and set the desired graphics settings, reduce graphic settings to improve performance. If you use the Lazy Fix UI option get past the title screen and wait in the main menu for the lazy fix to apply, if it worked the black bars will get removed.";
Game.KeepSymLinkOnExit = false;
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 12;
Game.PauseBetweenStarts = 35;

Game.SupportsMultipleKeyboardsAndMice = true;

Game.HookSetCursorPos = true;
Game.HookGetCursorPos = true;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = true;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = true;
Game.SendNormalKeyboardInput = true;
Game.SendScrollWheel = true;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;
Game.LockInputAtStart = false;
Game.LockInputToggleKey = 0x23;

Game.Play = function() {
  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option_preset.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("GraphicsOption_0", "ScreenMode", "Windowed"),
    new Nucleus.IniSaveInfo("GraphicsOption_0", "Resolution", Context.Width + "x" + Context.Height)
  ]);

  if (Context.AspectRatioDecimal > 1.8) {
    var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("GraphicsOption", "Aspect Ratio", "On"),
      new Nucleus.IniSaveInfo("GraphicsOption", "Ultrawide Mode UI Layout", 0)
    ]);
  } else if (Context.AspectRatioDecimal < 1.2) {
  } else {
  }

  if (Context.HasKeyboardPlayer == true) {
    Game.FakeFocus = true;
    Game.FakeFocusInterval = 40000;
    Game.HookFocus = true;
  } else {
    Game.FakeFocus = false;
    Game.HookFocus = false;
    Game.SupportsMultipleKeyboardsAndMice = false;
    Game.SetForegroundWindowElsewhere = true;
  }

  var filePath = (Context.filePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings");
  System.IO.Directory.CreateDirectory(filePath);

  var nolay = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\disable_overlay.txt";
  var lines = [""];
  Context.WriteTextFile(nolay, lines);

  var dlc = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\steam_settings\\DLC.txt";
  var lines = [
    "601100=Monster Hunter World: - Origin Armor Set",
    "743980=Monster Hunter World: - Fair Wind Charm",
    "759450=Monster Hunter World: - Samurai Set",
    "759451=Monster Hunter World: - Gesture: Zen",
    "759452=Monster Hunter World: - Gesture: Ninja Star",
    "759453=Monster Hunter World: - Gesture: Sumo Slap",
    "759454=Monster Hunter World: - Gesture: Passionate",
    "759455=Monster Hunter World: - Gesture: Spin-O-Rama",
    "761590=Monster Hunter World: - Gesture: Air Splits",
    "761591=Monster Hunter World: - Gesture: Feverish Dance",
    "761592=Monster Hunter World: - Gesture: Gallivanting Dance",
    "761593=Monster Hunter World: - Gesture: Interpretive Dance",
    "761594=Monster Hunter World: - Gesture: Play Possum",
    "761595=Monster Hunter World: - Gesture: Kowtow",
    "761596=Monster Hunter World: - Gesture: Sleep",
    "761597=Monster Hunter World: - Gesture: Kneel",
    "761598=Monster Hunter World: - Classic Gesture: Dance",
    "761599=Monster Hunter World: - Classic Gesture: Prance",
    "762170=Monster Hunter World: - Classic Gesture: Rant",
    "762171=Monster Hunter World: - Classic Gesture: Clap",
    "762174=Monster Hunter World: - Gesture: Devil May Cry Dual Guns",
    "762176=Monster Hunter World: - Gesture: Spirit Fingers",
    "762177=Monster Hunter World: - Gesture: Windmill Whirlwind",
    "762178=Monster Hunter World: - Gesture: Disco Fever",
    "762179=Monster Hunter World: - Gesture: Squat Day",
    "762910=Monster Hunter World: - Sticker Set: MH All-Stars Set",
    "762911=Monster Hunter World: - Sticker Set: Sir Loin Set",
    "762912=Monster Hunter World: - Sticker Set: Poogie Set",
    "762913=Monster Hunter World: - Sticker Set: Guild Lasses Set",
    "762914=Monster Hunter World: - Sticker Set: Endemic Life Set",
    "762915=Monster Hunter World: - Sticker Set: Classic Monsters Set",
    "762916=Monster Hunter World: - Sticker Set: Research Commission Set",
    "762918=Monster Hunter World: - Sticker Set: Devil May Cry Set",
    "762919=Monster Hunter World: - Sticker Set: Mega Man Set",
    "763690=Monster Hunter World: - Face Paint: Wyvern",
    "763691=Monster Hunter World: - Face Paint: Shade Pattern",
    "763692=Monster Hunter World: - Face Paint: Heart Shape",
    "763693=Monster Hunter World: - Face Paint: Eye Shadow",
    "763694=Monster Hunter World: - Hairstyle: Topknot",
    "763695=Monster Hunter World: - Hairstyle: Provisions Manager",
    "763696=Monster Hunter World: - Hairstyle: Field Team Leader",
    "763697=Monster Hunter World: - Hairstyle: The Handler",
    "763698=Monster Hunter World: - Hairstyle: The Admiral",
    "763699=Monster Hunter World: - The Handler's Guildmarm Costume",
    "770970=Monster Hunter World: - The Handler's Astera 3 Star Chef Coat",
    "770972=Monster Hunter World: - The Handler's Busy Bee Dress",
    "770973=Monster Hunter World: - The Handler's Sunshine Pareo",
    "770974=Monster Hunter World: - The Handler's Mischievous Dress",
    "770975=Monster Hunter World: - The Handler's Winter Spirit Coat",
    "770976=Monster Hunter World: - The Handler's Friendly Felyne Costume",
    "770977=Monster Hunter World: - Free Character Edit Voucher",
    "861870=Monster Hunter World: - Character Edit Voucher: Single Voucher",
    "861871=Monster Hunter World: - Character Edit Voucher: Two-Voucher Pack",
    "861872=Monster Hunter World: - Character Edit Voucher: Three-Voucher Pack",
    "891730=Monster Hunter World: - Deluxe Kit",
    "896580=Monster Hunter World: - Additional Gesture Bundle 1",
    "974300=Monster Hunter World: - Gesture: Hip Hop Dance",
    "974301=Monster Hunter World: - Gesture: Cool Dance",
    "974302=Monster Hunter World: - Free Sticker Set: Mingle Hunter",
    "996720=Monster Hunter World: - Gesture: Pop Star Dance",
    "996721=Monster Hunter World: - Gesture: Step Dance",
    "996740=Monster Hunter World: - Free Gesture: Happy Hunting!",
    "996741=Monster Hunter World: - Sticker Set: Celestial Pursuit Girls",
    "996742=Monster Hunter World: - Sticker Set: Monsters of the New World",
    "1118010=Monster Hunter World: Iceborne",
    "1118012=Monster Hunter World: Iceborne Deluxe Kit",
    "1118013=Monster Hunter World: Palico Edit Voucher: Single Voucher",
    "1118014=Monster Hunter World: Palico Edit Voucher: Two-Voucher Pack",
    "1118015=Monster Hunter World: Palico Edit Voucher: Three-Voucher Pack",
    "1118017=Monster Hunter World: Character & Palico Edit Voucher: Single Voucher",
    "1118018=Monster Hunter World: Character & Palico Edit Voucher: Two-Voucher Pack",
    "1118019=Monster Hunter World: Character & Palico Edit Voucher: Three-Voucher Pack",
    "1118021=Monster Hunter World: Iceborne - Yukumo Layered Armor Set",
    "1118022=Monster Hunter World: Sticker Set: Hunter Items Set",
    "1118023=Monster Hunter World: Sticker Set: Monster Statuses Set",
    "1118024=Monster Hunter World: Pose Set: Crouching",
    "1118025=Monster Hunter World: Pose Set: Unique",
    "1118026=Monster Hunter World: The Handler's Kokoto Gal's Costume",
    "1118029=Monster Hunter World: Iceborne - MHW:I Sticker Set: Iceborne Monsters Set",
    "1211170=Monster Hunter World: Iceborne - MHW:I Room Decor: Cute Decor Set",
    "1211171=Monster Hunter World: Iceborne - MHW:I Room Decor: Giant Stuffed Doll Set",
    "1211172=Monster Hunter World: Iceborne - MHW:I Monster Figure: Great Jagras",
    "1211173=Monster Hunter World: Iceborne - MHW:I Music Player: Additional BGM Set Vol. 1",
    "1211174=Monster Hunter World: The Handler's Tyrant Costume",
    "1211175=Monster Hunter World: Sticker Set: Raccoon City Set",
    "1211176=Monster Hunter World: Iceborne - MHW:I Monster Figure: Nergigante",
    "1211177=Monster Hunter World: Iceborne - MHW:I Monster Figure: Kushala Daora",
    "1211178=Monster Hunter World: Iceborne - MHW:I Monster Figure: Dodogama",
    "1211179=Monster Hunter World: Iceborne - MHW:I Monster Figure: Rathalos",
    "1211200=Monster Hunter World: Iceborne - MHW:I Monster Figure: Anjanath",
    "1211201=Monster Hunter World: Iceborne - MHW:I Monster Figure: Tobi-Kadachi",
    "1211202=Monster Hunter World: Iceborne - MHW:I Monster Figure: Barioth",
    "1211203=Monster Hunter World: Iceborne - MHW:I Monster Figure: Banbaro",
    "1211204=Monster Hunter World: Iceborne - MHW:I Monster Figure: Boaboa",
    "1211205=Monster Hunter World: Iceborne - MHW:I Music Player: Raccoon City Collaboration - Black Impact",
    "1211206=Monster Hunter World: The Handler's Graceful Short Dress",
    "1211207=Monster Hunter World: The Handler's Techno Handler Costume",
    "1211208=Monster Hunter World: Iceborne - Hairstyle: Wild Pompadour",
    "1211209=Monster Hunter World: Iceborne - Hairstyle: Mysterious Samurai",
    "1241260=Monster Hunter World: Iceborne - Hairstyle: Artful Buzz",
    "1241261=Monster Hunter World: Iceborne - Hairstyle: Hime Cut",
    "1241262=Monster Hunter World: Iceborne - Hairstyle: Light & Wavy",
    "1241263=Monster Hunter World: Iceborne - Hairstyle: Semi-long Up",
    "1241264=Monster Hunter World: Iceborne - Hairstyle: Great Mohawk",
    "1241265=Monster Hunter World: Iceborne - Hairstyle: Pleasant Ponytail",
    "1241266=Monster Hunter World: Iceborne - Hairstyle: Short Bob",
    "1241267=Monster Hunter World: Iceborne - Hairstyle: Long & Wavy",
    "1241268=Monster Hunter World: MHW:I Gesture Pack: Swag Dance Set",
    "1241269=Monster Hunter World: MHW:I Gesture Pack: Clean Dance Set",
    "1241270=Monster Hunter World: MHW:I Gesture Pack: Hype Up Set",
    "1241271=Monster Hunter World: Pose Set: Weapon Pose (3)",
    "1241272=Monster Hunter World: Sticker Set: Lynian Set",
    "1241273=Monster Hunter World: Iceborne - Pendant: Stuffed Felyne Teddy",
    "1241274=Monster Hunter World: Iceborne - Pendant: Stuffed Melynx Teddy",
    "1241275=Monster Hunter World: Iceborne - Pendant: White Felyne Teddy",
    "1241276=Monster Hunter World: Iceborne - Pendant: Pink Felyne Teddy",
    "1241277=Monster Hunter World: Iceborne - Pendant: Grape Felyne Teddy",
    "1241278=Monster Hunter World: Iceborne - Pendant: Mint Felyne Teddy",
    "1241279=Monster Hunter World: Iceborne - Pendant: Orange Felyne Teddy",
    "1241280=Monster Hunter World: Iceborne - Pendant: Moly Pendant - Luck",
    "1241281=Monster Hunter World: Iceborne - Pendant: Moly Pendant - Health",
    "1241282=Monster Hunter World: Iceborne - Pendant: Moly Pendant - Safety",
    "1241283=Monster Hunter World: Iceborne - Pendant: Moly Pendant - Love",
    "1241284=Monster Hunter World: Iceborne - Pendant: Moly Pendant - Protection",
    "1241285=Monster Hunter World: Iceborne - Pendant: Moly Pendant - Passion",
    "1241286=Monster Hunter World: Iceborne - Pendant: Moly Pendant - Peace",
    "1241287=Monster Hunter World: Iceborne - MHW:I Room Decor: Intimate Decor Set",
    "1241288=Monster Hunter World: Iceborne - MHW: I Room Decor: Lighting Set",
    "1241289=Monster Hunter World: Iceborne - MHW:I Special Monster Figure: Grand Appreciation Fest",
    "1241290=Monster Hunter World: Iceborne - MHW:I Monster Figure: Velkhana",
    "1241291=Monster Hunter World: Iceborne - MHW:I Monster Figure: Legiana",
    "1241292=Monster Hunter World: Iceborne - MHW:I Monster Figure: Beotodus",
    "1241293=Monster Hunter World: Iceborne - MHW:I Monster Figure: Nargacuga",
    "1241294=Monster Hunter World: Iceborne - MHW:I Monster Figure: Pukei-Pukei",
    "1241295=Monster Hunter World: Iceborne - MHW:I Monster Figure: Grimalkyne",
    "1241296=Monster Hunter World: Iceborne - MHW:I Monster Figure: Glavenus",
    "1241297=Monster Hunter World: Iceborne - MHW:I Monster Figure: Rathian",
    "1241298=Monster Hunter World: Iceborne - MHW:I Monster Figure: Kulu-Ya-Ku",
    "1241299=Monster Hunter World: Iceborne - MHW:I Music Player: Additional BGM Set Vol. 2",
    "1241300=Monster Hunter World: Iceborne - MHW:I Music Player: Additional BGM Set Vol. 3",
    "1242740=Monster Hunter World: The Handler's Rose Vestido",
    "1242741=Monster Hunter World: Iceborne - Hairstyle: Commander",
    "1242742=Monster Hunter World: Iceborne - Hairstyle: Excitable A-Lister",
    "1242743=Monster Hunter World: Iceborne - Hairstyle: Analytics Director",
    "1242744=Monster Hunter World: Iceborne - Hairstyle: The Seeker",
    "1242745=Monster Hunter World: Iceborne - Hairstyle: Serious Handler",
    "1242746=Monster Hunter World: Iceborne - Hairstyle: Third Fleet Master",
    "1242747=Monster Hunter World: Iceborne - Hairstyle: The Tracker",
    "1242748=Monster Hunter World: Sticker Set: Friendly Greetings Set",
    "1242749=Monster Hunter World: Iceborne - Pendant: Pukei Strap",
    "1242750=Monster Hunter World: Iceborne - Pendant: Coral Pukei Strap",
    "1242751=Monster Hunter World: Iceborne - Pendant: Swinging Rajang",
    "1242752=Monster Hunter World: Iceborne - Pendant: Swinging Furious Rajang",
    "1242753=Monster Hunter World: Iceborne - Pendant: Strollin' Paolumu",
    "1242754=Monster Hunter World: Iceborne - Pendant: Strollin' Nightshade",
    "1242755=Monster Hunter World: Iceborne - Pendant: Flying Meduso",
    "1242756=Monster Hunter World: Iceborne - Pendant: Flying Meduso Colony",
    "1242757=Monster Hunter World: Iceborne - Pendant: Red Balloon",
    "1242758=Monster Hunter World: Iceborne - Pendant: Red & White Balloons",
    "1242759=Monster Hunter World: Iceborne - Pendant: Rainbow Balloons",
    "1242760=Monster Hunter World: Iceborne - MHW:I Room Decor: Splendid Decor Set",
    "1242761=Monster Hunter World: Iceborne - MHW:I Room Decor: Lil' Bit of Glamour Decor Set",
    "1242762=Monster Hunter World: Iceborne - MHW:I Room Decor: Mini Model Set",
    "1242763=Monster Hunter World: Iceborne - MHW:I Monster Figure: Zinogre",
    "1242764=Monster Hunter World: Iceborne - MHW:I Monster Figure: Yian Garuga",
    "1242765=Monster Hunter World: Iceborne - MHW:I Monster Figure: Girros & Great Girros",
    "1242766=Monster Hunter World: Iceborne - MHW:I Monster Figure: Namielle",
    "1242767=Monster Hunter World: Iceborne - MHW:I Monster Figure: Paolumu",
    "1242768=Monster Hunter World: Iceborne - MHW:I Monster Figure: Tzitzi-Ya-Ku",
    "1242769=Monster Hunter World: Iceborne - MHW:I Monster Figure: Jyuratodus",
    "1242770=Monster Hunter World: Iceborne - MHW:I Monster Figure: Barroth",
    "1242771=Monster Hunter World: Iceborne - MHW:I Monster Figure: Diablos",
    "1242772=Monster Hunter World: Iceborne - MHW:I Monster Figure: Safi'jiiva",
    "1242773=Monster Hunter World: Iceborne - MHW:I Monster Figure: Xeno'jiiva",
    "1242774=Monster Hunter World: Iceborne - MHW:I Monster Figure: Wulg",
    "1242775=Monster Hunter World: Iceborne - MHW:I Music Player: Additional BGM Set Vol. 4",
    "1242776=Monster Hunter World: Iceborne - MHW:I Music Player: Additional BGM Set Vol. 5",
    "1242777=Monster Hunter World: Iceborne - Hairstyle: Half Ponytail",
    "1242778=Monster Hunter World: Iceborne - Hairstyle: Fluffy Mop",
    "1242779=Monster Hunter World: Iceborne - Hairstyle: Rath-a-like",
    "1265470=Monster Hunter World: Iceborne - Hairstyle: Wandering Samurai",
    "1265471=Monster Hunter World: Iceborne - Pendant: Emerald Kulve Heart",
    "1265472=Monster Hunter World: Iceborne - Pendant: Ruby Kulve Heart",
    "1265473=Monster Hunter World: Iceborne - Pendant: Crystal Kulve Heart",
    "1265474=Monster Hunter World: Iceborne - Pendant: Topaz Kulve Heart",
    "1265475=Monster Hunter World: Iceborne - Pendant: Sapphire Kulve Heart",
    "1265476=Monster Hunter World: Iceborne - Pendant: Rosegem Kulve Heart",
    "1287051=Monster Hunter World: Iceborne - Pendant: Gold Heavenly Dragon",
    "1287052=Monster Hunter World: Iceborne - Pendant: Silver Heavenly Dragon",
    "1287053=Monster Hunter World: Iceborne - Pendant: Ruby Crystal Knife",
    "1287054=Monster Hunter World: Iceborne - Pendant: Amber Crystal Knife",
    "1287055=Monster Hunter World: Iceborne - Pendant: Azure Crystal Knife",
    "1287056=Monster Hunter World: Iceborne - Pendant: Phantom Azure Butterflies",
    "1287057=Monster Hunter World: Iceborne - Pendant: Phantom Jade Butterflies",
    "1287058=Monster Hunter World: Iceborne - Pendant: Phantom Magenta Butterflies",
    "1287059=Monster Hunter World: Iceborne - Pendant: Fulgurbugs",
    "1287060=Monster Hunter World: Iceborne - Pendant: Dracophage Bugs",
    "1287062=Monster Hunter World: Iceborne - MHW:I Room Decor: Poogie Set",
    "1287063=Monster Hunter World: Iceborne - MHW:I Room Decor: Felyne Set",
    "1287064=Monster Hunter World: Iceborne - MHW:I Room Decor: Pukei-Pukei Set",
    "1287065=Monster Hunter World: Iceborne - MHW:I Room Decor: Boaboa Set",
    "1287066=Monster Hunter World: Iceborne - MHW:I Monster Figure: Tigrex",
    "1287067=Monster Hunter World: Iceborne - MHW:I Monster Figure: Odogaron",
    "1287068=Monster Hunter World: Iceborne - MHW:I Monster Figure: Radobaan",
    "1287069=Monster Hunter World: Iceborne - MHW:I Monster Figure: Rajang",
    "1287070=Monster Hunter World: Iceborne - MHW:I Monster Figure: Kirin",
    "1287071=Monster Hunter World: Iceborne - MHW:I Monster Figure: Vaal Hazak",
    "1287072=Monster Hunter World: Iceborne - MHW:I Monster Figure: Teostra",
    "1287073=Monster Hunter World: Iceborne - MHW:I Monster Figure: Gajalakas & King Gajalaka",
    "1287074=Monster Hunter World: Iceborne - MHW:I Monster Figure: Brachydios",
    "1287075=Monster Hunter World: Iceborne - MHW:I Monster Figure: Lavasioth",
    "1287076=Monster Hunter World: Iceborne - MHW:I Monster Figure: Downy Crakes & Aptonoths",
    "1287081=Monster Hunter World: Iceborne - MHW:I Music Player: Additional BGM Set Vol. 6",
    "1287082=Monster Hunter World: Iceborne - MHW:I Music Player: Additional BGM Set Vol. 7",
    "1287083=Monster Hunter: World - Gesture: Hadoken!",
    "1351860=Monster Hunter: World - Gesture: Shoryuken!",
    "1351861=Monster Hunter: World - Sticker Set: Street Fighter V",
    "1371400=Monster Hunter: World - The Handler's Cute Demoness Costume",
    "1371401=Monster Hunter World: Iceborne - Pendant: Mechanical Gold Watch",
    "1371402=Monster Hunter World: Iceborne - Pendant: Mechanical Silver Watch",
    "1371403=Monster Hunter World: Iceborne - Pendant: Blazing Glavenus Candle",
    "1371404=Monster Hunter World: Iceborne - Pendant: Shocked Kulu-Ya-Ku",
    "1371405=Monster Hunter World: Iceborne - Pendant: Super-8 Mini (Player 1)",
    "1371406=Monster Hunter World: Iceborne - Pendant: Super-8 Mini (Player 2)",
    "1371407=Monster Hunter World: Iceborne - Pendant: Heavenly Hog",
    "1371408=Monster Hunter World: Iceborne - Pendant: Beelzeboar",
    "1371409=Monster Hunter World: Iceborne - Pendant: Meowscular Gains Chain",
    "1371420=Monster Hunter World: Iceborne - MHW:I Room Decor: Beotodus Skull",
    "1371421=Monster Hunter World: Iceborne - MHW:I Monster Figure: Kulve Taroth",
    "1371422=Monster Hunter World: Iceborne - MHW:I Monster Figure: Bazelgeuse",
    "1371423=Monster Hunter World: Iceborne - MHW:I Monster Figure: Deviljho",
    "1371424=Monster Hunter World: Iceborne - MHW:I Monster Figure: Shara Ishvalda 1",
    "1371425=Monster Hunter World: Iceborne - MHW:I Monster Figure: Shara Ishvalda 2",
    "1371426=Monster Hunter World: Iceborne - MHW:I Monster Figure: Alatreon",
    "1371427=Monster Hunter World: Iceborne - MHW:I Monster Figure: Fatalis",
    "1371428=Monster Hunter World: Iceborne - MHW:I Monster Figure: Lunastra",
    "1371429=Monster Hunter World: Iceborne - MHW:I Monster Figure: Uragaan",
    "1377530=Monster Hunter: World - The Handler's Chun-Li Costume",
    "1390430=Monster Hunter World: Iceborne - Pendant: MH Riders - Kirin",
    "1472030=MHW:I - Free Content Collection Pack"
  ];
  Context.WriteTextFile(dlc, lines);

  var lazy = Context.Options["Lazy"];
  var resize = Context.Options["Resize"];
  var fps = Context.Options["fps"];
  var preset = Context.Options["preset"];
  var texture = Context.Options["texture"];
  var renderquality = Context.Options["renderquality"];

  if (resize == "Yes") {
  }

  if (resize == "No") {
    Context.DPIHandling = Nucleus.DPIHandling.InvScaled;
  }

  var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
  Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("GraphicsOption", "ScreenMode", "Windowed"),
    new Nucleus.IniSaveInfo("GraphicsOption", "Resolution", Context.Width + "x" + Context.Height),
    new Nucleus.IniSaveInfo("GraphicsOption", "Aspect Ratio", "Off")
  ]);

  if (lazy == "Yes") {
    Game.PauseBetweenStarts = 47;
    Game.KillProcessesOnClose = ["Lazy_Aspect_Fix_CRAPCOM_Can't_Ini_Edition"];

    var savePath = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Lazy_Aspect_Fix_CRAPCOM_Can't_Ini_Edition.exe");
    var savePkgOrigin = System.IO.Path.Combine(Game.Folder, "Lazy_Aspect_Fix_CRAPCOM_Can't_Ini_Edition.exe");
    System.IO.File.Copy(savePkgOrigin, savePath, true);

    var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\lazy.ini");
    Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
      new Nucleus.IniSaveInfo("Version", "IniVersion", "2"),
      new Nucleus.IniSaveInfo("Resolution", "resX", Context.Width),
      new Nucleus.IniSaveInfo("Resolution", "resY", Context.Height),
      new Nucleus.IniSaveInfo("Settings", "closeOnPatch", true),
      new Nucleus.IniSaveInfo("Settings", "executableName", "MonsterHunterWorld"),
      new Nucleus.IniSaveInfo("Settings", ";In the unlikley event of a game update breaking the mod, check the Steam/Nexus page for details/new address ranges", ""),
      new Nucleus.IniSaveInfo("Settings", "addressRangeStart", "0"),
      new Nucleus.IniSaveInfo("Settings", "addressRangeEnd", "0"),
      new Nucleus.IniSaveInfo("Settings", "hudAddressRangeStart", "0"),
      new Nucleus.IniSaveInfo("Settings", "hudAddressRangeEnd", "0"),
      new Nucleus.IniSaveInfo("Settings", "graphicsOptionsIniLocation", Context.RootFolder + "\\graphics_option.ini"),
      new Nucleus.IniSaveInfo("Settings", ";Options not yet enabled", ""),
      new Nucleus.IniSaveInfo("Experimental", "openGameOnPatch", false)
    ]);

    if (Context.AspectRatioDecimal < 1.2 || Context.AspectRatioDecimal > 1.8) {
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        new Nucleus.IniSaveInfo("GraphicsOption", "Aspect Ratio", "On"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Ultrawide Mode UI Layout", 0)
      ]);

      Context.RunAdditionalFiles(["all|" + Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\Lazy_Aspect_Fix_CRAPCOM_Can't_Ini_Edition.exe"], false, "", 1, false, true, false, false);
    }
  }

  if (lazy == "No") {
  }

  switch (preset) {
    case "No":
      break;
    case "very low":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        //new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "AmbientOcclusion", "low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "VolumeRenderingQuality", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ShadowQuality", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anti-Aliasing", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "LODBias", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MaxLODLevel", "-1"),
        new Nucleus.IniSaveInfo("GraphicsOption", "FoliageSway", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SubSurfaceScattering", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ScreenSpaceReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anisotropic_Filtering", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "WaterReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SHDiffuse", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MotionBlur", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Depth of Field", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Z-Prepass", "On"),
        new Nucleus.IniSaveInfo("GraphicsOption", "CapsuleAO", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ContactShadow", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SnowQuality", "Low")
      ]);
      break;
    case "low":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        //new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "AmbientOcclusion", "low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "VolumeRenderingQuality", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ShadowQuality", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anti-Aliasing", "FXAA"),
        new Nucleus.IniSaveInfo("GraphicsOption", "LODBias", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MaxLODLevel", "-1"),
        new Nucleus.IniSaveInfo("GraphicsOption", "FoliageSway", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SubSurfaceScattering", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ScreenSpaceReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anisotropic_Filtering", "mid"),
        new Nucleus.IniSaveInfo("GraphicsOption", "WaterReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SHDiffuse", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MotionBlur", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Depth of Field", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Z-Prepass", "On"),
        new Nucleus.IniSaveInfo("GraphicsOption", "CapsuleAO", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ContactShadow", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SnowQuality", "Low")
      ]);

      break;
    case "medium":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        //new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "AmbientOcclusion", "Mid"),
        new Nucleus.IniSaveInfo("GraphicsOption", "VolumeRenderingQuality", "low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ShadowQuality", "Mid"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anti-Aliasing", "TAA"),
        new Nucleus.IniSaveInfo("GraphicsOption", "LODBias", "Mid"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MaxLODLevel", "No Limit"),
        new Nucleus.IniSaveInfo("GraphicsOption", "FoliageSway", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SubSurfaceScattering", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ScreenSpaceReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anisotropic_Filtering", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "WaterReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SHDiffuse", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MotionBlur", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Depth of Field", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Z-Prepass", "On"),
        new Nucleus.IniSaveInfo("GraphicsOption", "CapsuleAO", "On"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ContactShadow", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SnowQuality", "Mid")
      ]);
      break;
    case "high":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        //new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "AmbientOcclusion", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "VolumeRenderingQuality", "mid"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ShadowQuality", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anti-Aliasing", "TAA+FXAA"),
        new Nucleus.IniSaveInfo("GraphicsOption", "LODBias", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MaxLODLevel", "No Limit"),
        new Nucleus.IniSaveInfo("GraphicsOption", "FoliageSway", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SubSurfaceScattering", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ScreenSpaceReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anisotropic_Filtering", "highest"),
        new Nucleus.IniSaveInfo("GraphicsOption", "WaterReflection", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SHDiffuse", "low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MotionBlur", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Depth of Field", "Off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Z-Prepass", "On"),
        new Nucleus.IniSaveInfo("GraphicsOption", "CapsuleAO", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ContactShadow", "off"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SnowQuality", "high")
      ]);

      break;
    case "ultra":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [
        //new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "Low"),
        new Nucleus.IniSaveInfo("GraphicsOption", "AmbientOcclusion", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "VolumeRenderingQuality", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ShadowQuality", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anti-Aliasing", "TAA+FXAA"),
        new Nucleus.IniSaveInfo("GraphicsOption", "LODBias", "high"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MaxLODLevel", "No Limit"),
        new Nucleus.IniSaveInfo("GraphicsOption", "FoliageSway", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SubSurfaceScattering", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ScreenSpaceReflection", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Anisotropic_Filtering", "highest"),
        new Nucleus.IniSaveInfo("GraphicsOption", "WaterReflection", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SHDiffuse", "mid"),
        new Nucleus.IniSaveInfo("GraphicsOption", "MotionBlur", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Depth of Field", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "Z-Prepass", "On"),
        new Nucleus.IniSaveInfo("GraphicsOption", "CapsuleAO", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "ContactShadow", "on"),
        new Nucleus.IniSaveInfo("GraphicsOption", "SnowQuality", "highest")
      ]);
      break;
  }

  switch (fps) {
    case "No":
      break;
    case "30":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "FrameRate", "30")]);
      break;
    case "60":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "FrameRate", "60")]);
      break;
    case "90":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "FrameRate", "90")]);
      break;
    case "120":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "FrameRate", "120")]);
      break;
  }

  switch (texture) {
    case "No":
      break;
    case "very low":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "TextureQuality", "256")]);
      break;
    case "low":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "TextureQuality", "512")]);
      break;
    case "medium":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "TextureQuality", "1024")]);
      break;
    case "high":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "TextureQuality", "full")]);
      break;
  }

  switch (renderquality) {
    case "No":
      break;
    case "low":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "low")]);
      break;
    case "medium":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "Mid")]);
      break;
    case "high":
      var videoconfig = (Context.SavePath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\graphics_option.ini");
      Context.ModifySaveFile(videoconfig, videoconfig, Nucleus.SaveType.INI, [new Nucleus.IniSaveInfo("GraphicsOption", "ResolutionScaling", "high")]);
      break;
  }
};
