import test from "node:test";
import assert from "node:assert/strict";
import {
    buildDefaultAnswers,
    parseInitArgs
} from "../src/commands/init.js";
import { parseReleaseType } from "../src/commands/release.js";
import {
    getAssetName,
    getReleaseTag,
    parsePublishOptions,
    pushReleaseRefs
} from "../src/commands/publish.js";

test("parseInitArgs reconhece modo não interativo", () => {
    assert.deepEqual(parseInitArgs(["--yes"]), { yes: true });
    assert.deepEqual(parseInitArgs(["-y"]), { yes: true });
});

test("buildDefaultAnswers usa o nome da pasta", () => {
    const answers = buildDefaultAnswers("D:\\DEV\\Tampermonkey\\teste de script");

    assert.equal(answers.name, "teste de script");
    assert.equal(answers.version, "1.0.0");
    assert.deepEqual(answers.match, ["*://*/*"]);
});

test("parseReleaseType aceita apenas semver bumps", () => {
    assert.equal(parseReleaseType([]), "patch");
    assert.equal(parseReleaseType(["minor"]), "minor");
});

test("parsePublishOptions valida combinações inválidas", () => {
    assert.throws(
        () => parsePublishOptions(["--publish-draft", "--draft"]),
        /Use apenas --publish-draft sozinho/
    );
});

test("getReleaseTag e getAssetName formatam corretamente", () => {
    assert.equal(getReleaseTag("1.2.3"), "v1.2.3");
    assert.equal(getAssetName("dist/meu-script.user.js"), "meu-script.user.js");
});

test("pushReleaseRefs envia branch sempre e tag apenas quando ausente no remoto", async () => {
    let pushedBranch = false;
    let pushedTag = false;

    const branchPush = async () => {
        pushedBranch = true;
    };

    const tagPush = async () => {
        pushedTag = true;
    };

    const remoteTagExists = async () => true;

    await pushReleaseRefs({
        remoteName: "origin",
        branchName: "main",
        releaseTag: "v1.0.0",
        pushBranchImpl: branchPush,
        pushTagImpl: tagPush,
        remoteTagExistsImpl: remoteTagExists
    });

    assert.equal(pushedBranch, true);
    assert.equal(pushedTag, false);
});
