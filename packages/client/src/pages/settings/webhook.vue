<template>
	<div class="_formRoot">
		<FormSection>
			<FormLink :to="`/settings/webhook/new`"> Create webhook </FormLink>
		</FormSection>

		<FormSection>
			<MkPagination :pagination="pagination">
				<template #default="{ items }">
					<FormLink
						v-for="webhook in items"
						:key="webhook.id"
						:to="`/settings/webhook/edit/${webhook.id}`"
						class="_formBlock"
					>
						<template #icon>
							<i
								v-if="webhook.active === false"
								class="ph-pause-circle ph-bold ph-lg"
							></i>
							<i
								v-else-if="webhook.latestStatus === null"
								class="ph-circle ph-fill"
							></i>
							<i
								v-else-if="
									[200, 201, 204].includes(
										webhook.latestStatus,
									)
								"
								class="ph-check ph-bold ph-lg"
								:style="{ color: 'var(--success)' }"
							></i>
							<i
								v-else
								class="ph-warning ph-bold ph-lg"
								:style="{ color: 'var(--error)' }"
							></i>
						</template>
						{{ webhook.name || webhook.url }}
						<template #suffix>
							<MkTime
								v-if="webhook.latestSentAt"
								:time="webhook.latestSentAt"
							></MkTime>
						</template>
					</FormLink>
				</template>
			</MkPagination>
		</FormSection>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import {} from "vue";
import MkPagination from "@/components/MkPagination.vue";
import FormSection from "@/components/form/section.vue";
import FormLink from "@/components/form/link.vue";
import { userPage } from "@/filters/user";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";

const pagination = {
	endpoint: "i/webhooks/list" as const,
	limit: 10,
};

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePageMetadata({
	title: "Webhook",
	icon: "ph-webhooks-logo ph-bold ph-lg",
});
</script>
