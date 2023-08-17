import define from "../define.js";
import { redisClient } from "@/db/redis.js";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export const meta = {
	tags: ["meta"],
	description: "Get Firefish patrons",

	requireCredential: false,
	requireCredentialPrivateMode: false,
} as const;

export const paramDef = {
	type: "object",
	properties: {
		forceUpdate: { type: "boolean", default: false },
	},
	required: [],
} as const;

export default define(meta, paramDef, async (ps) => {
	const patrons = JSON.parse(
		fs.readFileSync(`${_dirname}/../../../../../../patrons.json`, "utf-8"),
	);

	return {
		patrons: patrons["patrons"],
		sponsors: patrons["sponsors"],
	};
});
