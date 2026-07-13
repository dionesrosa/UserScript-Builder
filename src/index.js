import { APP_NAME, VERSION } from "./constants.js";
import init from "./commands/init.js";
import build from "./commands/build.js";

export async function run(args) {

    console.log(`🔨 ${APP_NAME} v${VERSION}`);
    console.log("");

    try {

        const command = args[0];

        switch (command) {

            case "init":
                await init(args.slice(1));
                break;

            case "build":
                await build();
                break;

            default:
                console.log("Comandos:");
                console.log("  build");
                console.log("  init");
                console.log("    --yes, -y");
        }

    } catch (error) {
        
        console.error(`❌ ${error.message}`);
        
    }

}
