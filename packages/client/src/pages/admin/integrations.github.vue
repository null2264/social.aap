<template>
	<FormSuspense :p="init">
		<div class="_formRoot">
			<FormSwitch v-model="enableGithubIntegration" class="_formBlock">
				<template #label>{{ i18n.ts.enable }}</template>
			</FormSwitch>

			<template v-if="enableGithubIntegration">
				<FormInfo class="_formBlock"
					>Callback URL: {{ `${uri}/api/gh/cb` }}</FormInfo
				>

				<FormInput v-model="githubClientId" class="_formBlock">
					<template #prefix
						><i class="ph-key ph-bold ph-lg"></i
					></template>
					<template #label>Client ID</template>
				</FormInput>

				<FormInput v-model="githubClientSecret" class="_formBlock">
					<template #prefix
						><i class="ph-key ph-bold ph-lg"></i
					></template>
					<template #label>Client Secret</template>
				</FormInput>
			</template>

			<FormButton primary class="_formBlock" @click="save"
				><i class="ph-floppy-disk-back ph-bold ph-lg"></i>
				{{ i18n.ts.save }}</FormButton
			>
		</div>
	</FormSuspense>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import {} from "vue";
import FormSwitch from "@/components/form/switch.vue";
import FormInput from "@/components/form/input.vue";
import FormButton from "@/components/MkButton.vue";
import FormInfo from "@/components/MkInfo.vue";
import FormSuspense from "@/components/form/suspense.vue";
import * as os from "@/os";
import { fetchInstance } from "@/instance";
import { i18n } from "@/i18n";

let uri: string = ref("");
let enableGithubIntegration: boolean = ref(false);
let githubClientId: string | null = ref(null);
let githubClientSecret: string | null = ref(null);

async function init() {
	const meta = await os.api("admin/meta");
	uri.value = meta.uri;
	enableGithubIntegration.value = meta.enableGithubIntegration;
	githubClientId.value = meta.githubClientId;
	githubClientSecret.value = meta.githubClientSecret;
}

function save() {
	os.apiWithDialog("admin/update-meta", {
		enableGithubIntegration: enableGithubIntegration.value,
		githubClientId: githubClientId.value,
		githubClientSecret: githubClientSecret.value,
	}).then(() => {
		fetchInstance();
	});
}
</script>
